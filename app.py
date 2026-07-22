import streamlit as st
import pickle
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# --- PAGE CONFIG ---
st.set_page_config(page_title="IPL Analytics Hub", page_icon="🏏", layout="wide")

# --- LOAD DATA & MODELS ---
@st.cache_data
def load_data():
    player_df = pd.read_csv('player_stats.csv')
    team_df = pd.read_csv('team_stats.csv')
    return player_df, team_df

try:
    pipe = pickle.load(open('pipe.pkl','rb'))
except:
    pipe = None

try:
    player_df, team_df = load_data()
except:
    player_df, team_df = pd.DataFrame(), pd.DataFrame()

# --- CONSTANTS ---
teams = sorted(['Sunrisers Hyderabad', 'Mumbai Indians', 'Royal Challengers Bangalore',
         'Kolkata Knight Riders', 'Kings XI Punjab', 'Chennai Super Kings',
         'Rajasthan Royals', 'Delhi Capitals'])

cities = sorted(['Hyderabad', 'Bangalore', 'Mumbai', 'Indore', 'Kolkata', 'Delhi',
          'Chandigarh', 'Jaipur', 'Chennai', 'Cape Town', 'Port Elizabeth',
          'Durban', 'Centurion', 'East London', 'Johannesburg', 'Kimberley',
          'Bloemfontein', 'Ahmedabad', 'Cuttack', 'Nagpur', 'Dharamsala',
          'Visakhapatnam', 'Pune', 'Raipur', 'Ranchi', 'Abu Dhabi',
          'Sharjah', 'Mohali', 'Bengaluru'])

# --- SIDEBAR NAVIGATION ---
st.sidebar.title("🏏 IPL Analytics Hub")
st.sidebar.markdown("Navigate through our AI-powered predictions and historical stats.")
page = st.sidebar.radio("Select Module:", ["🔮 Live Win Predictor", "🏏 Player Stats & Comparison", "🏆 Team Performance"])

st.sidebar.markdown("---")
st.sidebar.info("Built with Streamlit, Scikit-learn, and Plotly.")

# ==============================================================================
# PAGE 1: LIVE WIN PREDICTOR
# ==============================================================================
if page == "🔮 Live Win Predictor":
    st.title('🔮 IPL Live Win Predictor')
    st.markdown("Predict the real-time probability of a team winning based on current match scenarios.")

    col1, col2 = st.columns(2)
    with col1:
        batting_team = st.selectbox('Select the batting team', teams)
    with col2:
        bowling_team = st.selectbox('Select the bowling team', teams)

    selected_city = st.selectbox('Select host city', cities)
    target = st.number_input('Target Score', min_value=1, step=1, value=150)

    col3, col4, col5 = st.columns(3)
    with col3:
        score = st.number_input('Current Score', min_value=0, step=1, value=100)
    with col4:
        overs = st.number_input('Overs completed', min_value=0.0, max_value=20.0, step=0.1, value=10.0)
    with col5:
        wickets = st.number_input('Wickets out', min_value=0, max_value=9, step=1, value=2)

    if st.button('Predict Probability', use_container_width=True, type="primary"):
        if batting_team == bowling_team:
            st.error("Batting and Bowling teams must be different!")
        elif score > target:
            st.error("Score cannot be greater than target!")
        elif pipe is None:
            st.error("ML Model not found. Ensure pipe.pkl exists.")
        else:
            runs_left = target - score
            balls_left = 120 - (int(overs) * 6 + (overs % 1) * 10)
            wickets_left = 10 - wickets
            crr = score / overs if overs > 0 else 0
            rrr = (runs_left * 6) / balls_left if balls_left > 0 else 0

            input_df = pd.DataFrame({
                'batting_team':[batting_team], 'bowling_team':[bowling_team],
                'city':[selected_city], 'runs_left':[runs_left],
                'balls_left':[balls_left], 'wickets':[wickets_left],
                'total_runs_x':[target], 'crr':[crr], 'rrr':[rrr]
            })

            result = pipe.predict_proba(input_df)
            loss_prob = round(result[0][0] * 100)
            win_prob = round(result[0][1] * 100)

            st.markdown("---")
            st.subheader("Match Prediction")
            
            # Progress bar visualization using standard st features
            col_res1, col_res2 = st.columns(2)
            with col_res1:
                st.metric(label=batting_team, value=f"{win_prob}%")
            with col_res2:
                st.metric(label=bowling_team, value=f"{loss_prob}%")
            
            st.progress(win_prob / 100.0)

# ==============================================================================
# PAGE 2: PLAYER STATS & COMPARISON
# ==============================================================================
elif page == "🏏 Player Stats & Comparison":
    st.title("🏏 Player Stats & Comparison")
    
    if player_df.empty:
        st.error("Player data not found. Please generate stats first.")
    else:
        players = sorted(player_df['player'].dropna().unique())
        
        tab1, tab2 = st.tabs(["📊 Individual Stats", "⚔️ Head-to-Head Comparison"])
        
        with tab1:
            selected_player = st.selectbox("Select Player", players)
            p_data = player_df[player_df['player'] == selected_player].iloc[0]
            
            col1, col2, col3 = st.columns(3)
            col1.metric("Runs", int(p_data['runs']))
            col2.metric("Batting Avg", p_data['batting_avg'])
            col3.metric("Strike Rate", p_data['strike_rate'])
            
            col4, col5, col6 = st.columns(3)
            col4.metric("Wickets", int(p_data['wickets']))
            col5.metric("Bowling Avg", p_data['bowling_avg'])
            col6.metric("Economy", p_data['economy'])
            
            col7, col8, col9 = st.columns(3)
            col7.metric("Highest Score", int(p_data['highest_score']))
            col8.metric("50s / 100s", f"{int(p_data['fifties'])} / {int(p_data['hundreds'])}")
            col9.metric("Matches Batted/Bowled", f"{int(p_data['innings_batted'])} / {int(p_data['innings_bowled'])}")

        with tab2:
            col1, col2 = st.columns(2)
            with col1:
                p1 = st.selectbox("Player 1", players, index=players.index('V Kohli') if 'V Kohli' in players else 0)
            with col2:
                p2 = st.selectbox("Player 2", players, index=players.index('RG Sharma') if 'RG Sharma' in players else 1)
            
            if p1 and p2:
                d1 = player_df[player_df['player'] == p1].iloc[0]
                d2 = player_df[player_df['player'] == p2].iloc[0]
                
                # Radar Chart for Batting Comparison
                categories = ['Batting Avg', 'Strike Rate', 'Fifties', 'Hundreds']
                
                # Normalize values for radar chart (rough normalization for visual comparison)
                val1 = [d1['batting_avg'], d1['strike_rate']/2, d1['fifties']*2, d1['hundreds']*10]
                val2 = [d2['batting_avg'], d2['strike_rate']/2, d2['fifties']*2, d2['hundreds']*10]
                
                fig = go.Figure()
                fig.add_trace(go.Scatterpolar(r=val1, theta=categories, fill='toself', name=p1))
                fig.add_trace(go.Scatterpolar(r=val2, theta=categories, fill='toself', name=p2))
                fig.update_layout(polar=dict(radialaxis=dict(visible=False)), showlegend=True, title="Batting Comparison (Normalized)")
                st.plotly_chart(fig, use_container_width=True)
                
                # Side by side stats
                st.markdown("### Raw Stats Comparison")
                comp_df = pd.DataFrame({
                    "Metric": ["Runs", "Batting Avg", "Strike Rate", "Highest Score", "Wickets", "Economy"],
                    p1: [d1['runs'], d1['batting_avg'], d1['strike_rate'], d1['highest_score'], d1['wickets'], d1['economy']],
                    p2: [d2['runs'], d2['batting_avg'], d2['strike_rate'], d2['highest_score'], d2['wickets'], d2['economy']]
                })
                st.dataframe(comp_df, hide_index=True, use_container_width=True)

# ==============================================================================
# PAGE 3: TEAM PERFORMANCE
# ==============================================================================
elif page == "🏆 Team Performance":
    st.title("🏆 Historical Team Performance")
    
    if team_df.empty:
        st.error("Team data not found.")
    else:
        # Sort by wins
        t_data = team_df.sort_values(by='wins', ascending=False)
        
        # Bar Chart for Wins
        fig = px.bar(t_data, x='team', y='wins', text='wins', title="Total IPL Matches Won (2008-2024)", color='win_percentage', color_continuous_scale='Viridis')
        fig.update_traces(textposition='outside')
        fig.update_layout(xaxis_title="Team", yaxis_title="Wins", height=500)
        st.plotly_chart(fig, use_container_width=True)
        
        st.markdown("### Detailed Team Stats")
        st.dataframe(
            t_data.rename(columns={'team': 'Team', 'matches_played': 'Matches Played', 'wins': 'Wins', 'win_percentage': 'Win %'}),
            hide_index=True, use_container_width=True
        )