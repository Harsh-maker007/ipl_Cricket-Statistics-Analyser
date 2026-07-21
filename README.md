# 🏏 IPL Cricket Statistics Analyzer

> An AI-driven platform for IPL analytics — predicting match outcomes, player performance, win probability, and more with state-of-the-art Machine Learning models.

![Tech Stack](https://img.shields.io/badge/Frontend-React.js-61dafb?style=for-the-badge&logo=react)
![Tech Stack](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Tech Stack](https://img.shields.io/badge/ML-XGBoost%20%7C%20LightGBM-f97316?style=for-the-badge)

---

## 🚀 Features

- 📊 **Player Statistics** — Batting averages, strike rates, economy rates
- 🏆 **Team Performance** — Win rates, head-to-head, historical records
- 🔮 **Win Probability** — Real-time ML predictions (LightGBM/XGBoost)
- ⚡ **Match Predictor** — Pre-match outcome prediction
- 🧬 **Player Similarity** — K-Means + PCA + Cosine Similarity
- 🎯 **Best XI Builder** — ML-powered team recommendation
- 🏟️ **Venue Analysis** — Pitch and ground condition insights
- 📈 **Interactive Charts** — Powered by Plotly & Chart.js

---

## 🏗️ Project Structure

```
ipl_Cricket-Statistics-Analyser/
├── frontend/          # React.js frontend (Vite)
├── backend/           # FastAPI backend (Python)
├── legacy/            # Legacy Streamlit app & notebooks
└── README.md
```

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React.js, Vite, Vanilla CSS         |
| Backend     | FastAPI, Uvicorn, Python            |
| ML Models   | Scikit-learn, XGBoost, LightGBM     |
| Data        | Pandas, NumPy                       |
| Visualization | Plotly, Chart.js, Matplotlib       |
| Database    | MongoDB / MySQL                     |

---

## ⚙️ Getting Started

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🤖 ML Models

1. **Win Probability Predictor** — LightGBM, XGBoost, Logistic Regression
2. **Match Outcome Predictor** — Random Forest, XGBoost, CatBoost
3. **Batsman Performance** — XGBoost Regressor, Random Forest
4. **Bowler Performance** — Gradient Boosting, SVM
5. **Player Similarity Engine** — K-Means, PCA, Cosine Similarity
6. **Best XI Recommendation** — Clustering + ML Ensemble

---

## 📊 Dataset Sources

- [Cricsheet](https://cricsheet.org/) — Ball-by-ball IPL data (2008–present)
- [Kaggle IPL Complete Dataset](https://www.kaggle.com/datasets/patrickb1912/ipl-complete-dataset-20082020)

---

## 👨‍💻 Author

**Harsh** — [GitHub](https://github.com/Harsh-maker007)
