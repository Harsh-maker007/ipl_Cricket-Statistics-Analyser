import { useState, useEffect } from 'react'
import './App.css'

const features = [
  {
    icon: '📊',
    color: 'rgba(59, 130, 246, 0.15)',
    iconBg: 'rgba(59, 130, 246, 0.2)',
    title: 'Player Statistics',
    desc: 'Deep-dive into batting averages, strike rates, economy rates, and career milestones for every IPL player.'
  },
  {
    icon: '🏆',
    color: 'rgba(245, 158, 11, 0.15)',
    iconBg: 'rgba(245, 158, 11, 0.2)',
    title: 'Team Performance',
    desc: 'Analyze team win rates, head-to-head records, and historical performance across all IPL seasons.'
  },
  {
    icon: '🔮',
    color: 'rgba(139, 92, 246, 0.15)',
    iconBg: 'rgba(139, 92, 246, 0.2)',
    title: 'Win Probability',
    desc: 'Real-time win probability predictions powered by LightGBM and XGBoost based on current match situation.'
  },
  {
    icon: '🏟️',
    color: 'rgba(6, 182, 212, 0.15)',
    iconBg: 'rgba(6, 182, 212, 0.2)',
    title: 'Venue Analysis',
    desc: 'Understand how pitch conditions and venue history affect match outcomes and team strategies.'
  },
  {
    icon: '⚡',
    color: 'rgba(249, 115, 22, 0.15)',
    iconBg: 'rgba(249, 115, 22, 0.2)',
    title: 'Match Predictor',
    desc: 'Pre-match predictions using Random Forest & XGBoost with venue, toss, and team strength as inputs.'
  },
  {
    icon: '🧬',
    color: 'rgba(16, 185, 129, 0.15)',
    iconBg: 'rgba(16, 185, 129, 0.2)',
    title: 'Player Similarity',
    desc: 'Discover similar players using K-Means clustering, PCA dimensionality reduction, and cosine similarity.'
  },
  {
    icon: '🎯',
    color: 'rgba(239, 68, 68, 0.15)',
    iconBg: 'rgba(239, 68, 68, 0.2)',
    title: 'Best XI Builder',
    desc: 'ML-powered Best XI recommendation based on opposition, venue, and historical player performance.'
  },
  {
    icon: '📈',
    color: 'rgba(168, 85, 247, 0.15)',
    iconBg: 'rgba(168, 85, 247, 0.2)',
    title: 'Interactive Charts',
    desc: 'Beautiful real-time visualizations powered by Plotly and Chart.js with drill-down capabilities.'
  }
]

const mlModels = [
  {
    title: 'Win Probability Predictor',
    desc: 'Live in-match predictions using current score, overs, wickets, and match context.',
    tags: ['LightGBM', 'XGBoost', 'Logistic Regression']
  },
  {
    title: 'Match Outcome Predictor',
    desc: 'Pre-match predictions based on teams, venue, toss, and historical matchups.',
    tags: ['Random Forest', 'XGBoost', 'CatBoost']
  },
  {
    title: 'Batsman Performance',
    desc: 'Predict runs, strike rate, and probability of scoring 50+ or 100 for a batsman.',
    tags: ['XGBoost Regressor', 'Random Forest', 'Linear Regression']
  },
  {
    title: 'Bowler Performance',
    desc: 'Forecast wickets, economy rate, and dot ball percentage for any bowler.',
    tags: ['Gradient Boosting', 'Random Forest', 'SVM']
  },
  {
    title: 'Player Similarity Engine',
    desc: 'Find statistically similar players for comparisons and talent scouting.',
    tags: ['K-Means', 'PCA', 'Cosine Similarity']
  },
  {
    title: 'Best XI Recommendation',
    desc: 'Optimal playing eleven recommendation based on conditions and opposition.',
    tags: ['Clustering', 'Scoring Algorithm', 'ML Ensemble']
  }
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
  { value: '900+', label: 'Matches Analysed', color: 'var(--accent-purple)' },
  { value: '8', label: 'ML Models', color: 'var(--accent-gold)' },
]

export default function App() {
  const [apiStatus, setApiStatus] = useState('checking')

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(() => setApiStatus('online'))
      .catch(() => setApiStatus('offline'))
  }, [])

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#" className="nav-brand">
          <div className="nav-logo">🏏</div>
          <span className="nav-title gradient-text">IPL Analyzer</span>
        </a>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#models">ML Models</a></li>
          <li><a href="#tech">Tech Stack</a></li>
          <li>
            <a href="https://github.com/Harsh-maker007/ipl_Cricket-Statistics-Analyser" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </li>
        </ul>
        <div
          id="api-status-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '100px',
            fontSize: '0.78rem',
            fontWeight: 600,
            background: apiStatus === 'online' ? 'rgba(16, 185, 129, 0.1)' : apiStatus === 'offline' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            border: `1px solid ${apiStatus === 'online' ? 'rgba(16, 185, 129, 0.3)' : apiStatus === 'offline' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
            color: apiStatus === 'online' ? '#10b981' : apiStatus === 'offline' ? '#ef4444' : '#f59e0b',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}></span>
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
            <a href="#features" className="btn-primary" id="explore-btn">
              🚀 Explore Features
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

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-header">
          <div className="section-tag">Features</div>
          <h2 className="section-title">
            Everything you need to <span className="gradient-text">analyze IPL</span>
          </h2>
          <p className="section-desc">
            From live win probability to player similarity scoring — built with modern ML and rich visualizations.
          </p>
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
        <div className="models-inner">
          <div className="section-header">
            <div className="section-tag">ML Models</div>
            <h2 className="section-title">
              Six intelligent <span className="gradient-text">prediction engines</span>
            </h2>
            <p className="section-desc">
              Each model is trained on 16+ seasons of IPL data and optimized for high accuracy.
            </p>
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
        <div className="section-header">
          <div className="section-tag">Tech Stack</div>
          <h2 className="section-title">
            Built with <span className="gradient-text">modern tools</span>
          </h2>
          <p className="section-desc">
            A full-stack ML application using best-in-class technologies for performance and scale.
          </p>
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

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-glow"></div>
          <h2 className="cta-title">
            Ready to explore <span className="gradient-text">IPL like never before?</span>
          </h2>
          <p className="cta-desc">
            Star the project on GitHub and follow along as we build each feature — from the ML backend to the interactive dashboard.
          </p>
          <div className="cta-buttons">
            <a
              href="https://github.com/Harsh-maker007/ipl_Cricket-Statistics-Analyser"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              id="cta-github-btn"
            >
              ⭐ Star on GitHub
            </a>
            <a href="#features" className="btn-secondary" id="cta-features-btn">
              View Features →
            </a>
          </div>
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
