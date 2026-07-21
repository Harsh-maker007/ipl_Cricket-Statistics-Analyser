import pickle
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="IPL Statistics Analyzer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
try:
    with open("pipe.pkl", "rb") as f:
        pipe = pickle.load(f)
except Exception as e:
    pipe = None

class PredictRequest(BaseModel):
    batting_team: str
    bowling_team: str
    city: str
    runs_left: int
    balls_left: int
    wickets: int
    total_runs_x: int
    crr: float
    rrr: float

@app.get("/")
def read_root():
    return {"message": "Welcome to the IPL Statistics Analyzer API!", "model_loaded": pipe is not None}

@app.post("/predict")
def predict_win(req: PredictRequest):
    if pipe is None:
        return {"error": "Model not loaded. Ensure pipe.pkl exists."}
    
    input_df = pd.DataFrame([{
        'batting_team': req.batting_team,
        'bowling_team': req.bowling_team,
        'city': req.city,
        'runs_left': req.runs_left,
        'balls_left': req.balls_left,
        'wickets': req.wickets,
        'total_runs_x': req.total_runs_x,
        'crr': req.crr,
        'rrr': req.rrr
    }])
    
    # predict_proba returns [[prob_loss, prob_win]]
    result = pipe.predict_proba(input_df)
    loss_prob = result[0][0]
    win_prob = result[0][1]
    
    return {
        "batting_team": req.batting_team,
        "bowling_team": req.bowling_team,
        "win_probability": round(win_prob * 100, 2),
        "loss_probability": round(loss_prob * 100, 2)
    }
