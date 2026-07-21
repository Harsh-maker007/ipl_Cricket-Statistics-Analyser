import { useState, useEffect } from 'react'
import './App.css'

const teamsList = [
  'Chennai Super Kings',
  'Delhi Capitals',
  'Kings XI Punjab',
  'Kolkata Knight Riders',
  'Mumbai Indians',
  'Rajasthan Royals',
  'Royal Challengers Bangalore',
  'Sunrisers Hyderabad'
]

const citiesList = [
  'Abu Dhabi', 'Ahmedabad', 'Bangalore', 'Bengaluru', 'Bloemfontein', 'Cape Town', 
  'Centurion', 'Chandigarh', 'Chennai', 'Cuttack', 'Delhi', 'Dharamsala', 'Durban', 
  'East London', 'Hyderabad', 'Indore', 'Jaipur', 'Johannesburg', 'Kimberley', 
  'Kolkata', 'Mohali', 'Mumbai', 'Nagpur', 'Port Elizabeth', 'Pune', 'Raipur', 
  'Ranchi', 'Sharjah', 'Visakhapatnam'
]

// ... (features, mlModels, techStack, stats stay the same)
const features = [
  { icon: '📊', color: 'rgba(59, 130, 246, 0.15)', iconBg: 'rgba(59, 130, 246, 0.2)', title: 'Player Statistics', desc: 'Deep-dive into batting averages, strike rates, economy rates, and career milestones for every IPL player.' },
  { icon: '🏆', color: 'rgba(245, 158, 11, 0.15)', iconBg: 'rgba(245, 158, 11, 0.2)', title: 'Team Performance', desc: 'Analyze team win rates, head-to-head records, and historical performance across all IPL seasons.' },
  { icon: '🔮', color: 'rgba(139, 92, 246, 0.15)', iconBg: 'rgba(139, 92, 246, 0.2)', title: 'Win Probability', desc: 'Real-time win probability predictions powered by LightGBM and XGBoost based on current match situation.' },
  { icon: '🏟️', color: 'rgba(6, 182, 212, 0.15)', iconBg: 'rgba(6, 182, 212, 0.2)', title: 'Venue Analysis', desc: 'Understand how pitch conditions and venue history affect match outcomes and team strategies.' },
  { icon: '⚡', color: 'rgba(249, 115, 22, 0.15)', iconBg: 'rgba(249, 115, 22, 0.2)', title: 'Match Predictor', desc: 'Pre-match predictions using Random Forest & XGBoost with venue, toss, and team strength as inputs.' },
  { icon: '🧬', color: 'rgba(16, 185, 129, 0.15)', iconBg: 'rgba(16, 185, 129, 0.2)', title: 'Player Similarity', desc: 'Discover similar players using K-Means clustering, PCA dimensionality reduction, and cosine similarity.' },
  { icon: '🎯', color: 'rgba(239, 68, 68, 0.15)', iconBg: 'rgba(239, 68, 68, 0.2)', title: 'Best XI Builder', desc: 'ML-powered Best XI recommendation based on opposition, venue, and historical player performance.' },
  { icon: '📈', color: 'rgba(168, 85, 247, 0.15)', iconBg: 'rgba(168, 85, 247, 0.2)', title: 'Interactive Charts', desc: 'Beautiful real-time visualizations powered by Plotly and Chart.js with drill-down capabilities.' }
]

const mlModels = [
  { title: 'Win Probability Predictor', desc: 'Live in-match predictions using current score, overs, wickets, and match context.', tags: ['Logistic Regression', 'XGBoost'] },
  { title: 'Match Outcome Predictor', desc: 'Pre-match predictions based on teams, venue, toss, and historical matchups.', tags: ['Random Forest', 'CatBoost'] },
  { title: 'Batsman Performance', desc: 'Predict runs, strike rate, and probability of scoring 50+ or 100 for a batsman.', tags: ['XGBoost Regressor'] },
  { title: 'Bowler Performance', desc: 'Forecast wickets, economy rate, and dot ball percentage for any bowler.', tags: ['Gradient Boosting'] },
  { title: 'Player Similarity Engine', desc: 'Find statistically similar players for comparisons and talent scouting.', tags: ['K-Means', 'PCA'] },
  { title: 'Best XI Recommendation', desc: 'Optimal playing eleven recommendation based on conditions and opposition.', tags: ['Clustering', 'ML Ensemble'] }
]

const techStack = [
  { icon: '⚛️', name: 'React.js', color: '#61dafb' },
  { icon: '⚡', name: 'FastAPI', color: '#009688' },
  { icon: '🤖', name: 'Scikit-learn', color: '#f7931e' },
  { icon: '🚀', name: 'XGBoost', color: '#f97316' },
  { icon: '💡', name: 'LightGBM', color: '#8b5cf6' },
  { icon: '🐼', name: 'Pandas', color: '#150458' },
  { icon: '📊', name: 'Plotly', color: '#3b82f6' },
  { icon: '🗄️', name: 'MongoDB', color: '#4db33d' },
]

const stats = [
  { value: '16+', label: 'IPL Seasons', color: 'var(--accent-blue)' },
  { value: '1200+', label: 'Matches Analysed', color: 'var(--accent-purple)' },
  { value: '81%', label: 'Model Accuracy', color: 'var(--accent-gold)' },
]

export default function App() {
  const [apiStatus, setApiStatus] = useState('checking')
  
  // Form State
  const [battingTeam, setBattingTeam] = useState('Mumbai Indians')
  const [bowlingTeam, setBowlingTeam] = useState('Chennai Super Kings')
  const [city, setCity] = useState('Mumbai')
  const [target, setTarget] = useState(180)
  const [score, setScore] = useState(120)
  const [overs, setOvers] = useState(15)
  const [wickets, setWickets] = useState(3)

  // Predictor Result State
  const [isPredicting, setIsPredicting] = useState(false)
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(() => setApiStatus('online'))
      .catch(() => setApiStatus('offline'))
  }, [])

  const handlePredict = async (e) => {
    e.preventDefault()
    
    if (battingTeam === bowlingTeam) {
      setErrorMsg("Batting and Bowling teams must be different!")
      return
    }

    if (score > target) {
      setErrorMsg("Score cannot be greater than target!")
      return
    }

    if (overs >= 20 || overs <= 0) {
      setErrorMsg("Overs must be between 0.1 and 19.5")
      return
    }

    setIsPredicting(true)
    setErrorMsg(null)
    setResult(null)

    // Calculate derived features like legacy app
    const runs_left = target - score
    const balls_left = 120 - (overs * 6)
    const wickets_left = 10 - wickets
    const crr = score / overs
    const rrr = (runs_left * 6) / Math.max(balls_left, 1)

    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batting_team: battingTeam,
          bowling_team: bowlingTeam,
          city: city,
          runs_left: runs_left,
          balls_left: balls_left,
          wickets: wickets_left,
          total_runs_x: target,
          crr: crr,
          rrr: rrr
        })
      })

      const data = await res.json()
      
      if (data.error) {
        setErrorMsg(data.error)
      } else {
        setResult(data)
      }
    } catch (err) {
      setErrorMsg("Failed to reach the API. Is FastAPI running on port 8000?")
    } finally {
      setIsPredicting(false)
    }
  }

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#" className="nav-brand">
          <div className="nav-logo">🏏</div>
          <span className="nav-title gradient-text">IPL Analyzer</span>
        </a>
        <ul className="nav-links">
          <li><a href="#predictor">Live Predictor</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#models">ML Models</a></li>
          <li>
            <a href="https://github.com/Harsh-maker007/ipl_Cricket-Statistics-Analyser" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </li>
        </ul>
        <div className="api-badge" data-status={apiStatus}>
          <span className="api-dot"></span>
          API {apiStatus === 'online' ? 'Online' : apiStatus === 'offline' ? 'Offline' : 'Checking…'}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Powered by Machine Learning & Real IPL Data
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">IPL Cricket</span>
            <br />
            Statistics Analyzer
          </h1>
          <p className="hero-subtitle">
            The ultimate AI-driven platform for IPL analytics — predicting match outcomes,
            player performance, win probability, and more with state-of-the-art ML models.
          </p>
          <div className="hero-cta">
            <a href="#predictor" className="btn-primary" id="explore-btn">
              ⚡ Try Live Predictor
            </a>
            <a
              href="https://github.com/Harsh-maker007/ipl_Cricket-Statistics-Analyser"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              id="github-btn"
            >
              ⭐ View on GitHub
            </a>
          </div>
          <div className="hero-stats">
            {stats.map((s, i) => (
              <div key={i} className="hero-stat glass-card" id={`stat-${i}`}>
                <div className="hero-stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-indicator-line"></div>
        </div>
      </section>

      {/* MATCH PREDICTOR UI */}
      <section className="predictor-section" id="predictor">
        <div className="section-header">
          <div className="section-tag">Machine Learning</div>
          <h2 className="section-title">
            Live <span className="gradient-text">Win Predictor</span>
          </h2>
          <p className="section-desc">
            Test our Logistic Regression model trained on over 1,200 IPL matches.
          </p>
        </div>

        <div className="predictor-container">
          <form className="predictor-form glass-card" onSubmit={handlePredict}>
            <div className="form-row">
              <div className="form-group">
                <label>Batting Team</label>
                <select value={battingTeam} onChange={(e) => setBattingTeam(e.target.value)}>
                  {teamsList.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Bowling Team</label>
                <select value={bowlingTeam} onChange={(e) => setBowlingTeam(e.target.value)}>
                  {teamsList.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Host City</label>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                {citiesList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-row triple">
              <div className="form-group">
                <label>Target</label>
                <input type="number" min="1" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Current Score</label>
                <input type="number" min="0" value={score} onChange={(e) => setScore(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Overs (e.g. 15.5)</label>
                <input type="number" step="0.1" min="0.1" max="19.5" value={overs} onChange={(e) => setOvers(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Wickets Down</label>
                <input type="number" min="0" max="9" value={wickets} onChange={(e) => setWickets(Number(e.target.value))} />
              </div>
            </div>

            <button type="submit" className="btn-primary predict-btn" disabled={isPredicting}>
              {isPredicting ? 'Analyzing...' : 'Predict Probability'}
            </button>
            
            {errorMsg && <div className="error-msg">{errorMsg}</div>}
          </form>

          {/* RESULTS VISUALIZER */}
          {result && (
            <div className="results-container animate-fade-up glass-card">
              <h3 className="results-title">Match Prediction</h3>
              
              <div className="probability-display">
                <div className="prob-team">
                  <span className="team-name">{result.batting_team}</span>
                  <span className="team-score" style={{ color: 'var(--accent-blue)' }}>{result.win_probability}%</span>
                </div>
                
                <div className="prob-bar-container">
                  <div 
                    className="prob-bar-fill" 
                    style={{ width: `${result.win_probability}%` }}
                  ></div>
                  <div className="prob-bar-marker"></div>
                </div>
                
                <div className="prob-team right">
                  <span className="team-name">{result.bowling_team}</span>
                  <span className="team-score" style={{ color: 'var(--accent-orange)' }}>{result.loss_probability}%</span>
                </div>
              </div>

              <div className="results-insight">
                {result.win_probability > 50 
                  ? `${result.batting_team} is in a strong position to win.`
                  : `${result.bowling_team} is dominating the match.`}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        {/* ... (Existing features section) ... */}
        <div className="section-header">
          <div className="section-tag">Features</div>
          <h2 className="section-title">
            Everything you need to <span className="gradient-text">analyze IPL</span>
          </h2>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card glass-card" id={`feature-${i}`}>
              <div className="feature-icon-wrap" style={{ background: f.iconBg }}>
                {f.icon}
              </div>
              <h3 className="feature-card-title">{f.title}</h3>
              <p className="feature-card-desc">{f.desc}</p>
              <span className="feature-arrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      {/* ML MODELS */}
      <section className="models" id="models">
        {/* ... (Existing models section) ... */}
        <div className="models-inner">
          <div className="section-header">
            <div className="section-tag">ML Models</div>
            <h2 className="section-title">
              Six intelligent <span className="gradient-text">prediction engines</span>
            </h2>
          </div>
          <div className="models-grid">
            {mlModels.map((m, i) => (
              <div key={i} className="model-card glass-card" id={`model-${i}`}>
                <div className="model-number">{String(i + 1).padStart(2, '0')}</div>
                <div className="model-info">
                  <h3 className="model-title">{m.title}</h3>
                  <p className="model-desc">{m.desc}</p>
                  <div className="model-tags">
                    {m.tags.map((t, j) => (
                      <span key={j} className="model-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="tech" id="tech">
        {/* ... (Existing tech section) ... */}
        <div className="section-header">
          <div className="section-tag">Tech Stack</div>
          <h2 className="section-title">
            Built with <span className="gradient-text">modern tools</span>
          </h2>
        </div>
        <div className="tech-grid">
          {techStack.map((t, i) => (
            <div key={i} className="tech-badge glass-card" id={`tech-${i}`}>
              <span className="tech-badge-icon">{t.icon}</span>
              <span style={{ fontWeight: 600 }}>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="footer-copy">
          © 2024 IPL Statistics Analyzer • Built by Harsh
        </span>
        <div className="footer-links">
          <a href="https://github.com/Harsh-maker007/ipl_Cricket-Statistics-Analyser" target="_blank" rel="noreferrer">GitHub</a>
          <a href="#features">Features</a>
          <a href="#models">ML Models</a>
        </div>
      </footer>
    </div>
  )
}
