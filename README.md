# 🚀 NexaCloud — SaaS Software Company Platform

A production-grade, full-stack SaaS company website with REST API backend, React frontend, Docker DevOps pipeline, and GitHub Actions CI/CD.

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express.js REST API |
| Database | MongoDB (Dockerized) |
| Cache | Redis (Dockerized) |
| Analytics | Python 3 FastAPI Microservice |
| DevOps | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Reverse Proxy | Nginx |

## 🗂️ Project Structure

```
nexacloud/
├── frontend/          # React + Vite SPA
├── backend/           # Node.js + Express API
├── python-service/    # Python FastAPI analytics
├── nginx/             # Reverse proxy config
├── docker/            # Dockerfiles
├── .github/workflows/ # CI/CD pipelines
├── docker-compose.yml # Full stack orchestration
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker Desktop
- Python 3.11+
- Git

### 1. Clone & Setup
```bash
git clone https://github.com/YOUR_USERNAME/nexacloud.git
cd nexacloud
cp .env.example .env
```

### 2. Run with Docker (Recommended)
```bash
docker-compose up --build
```

Visit:
- **Website:** http://localhost:3000
- **API:** http://localhost:5000/api
- **Python Analytics:** http://localhost:8000/docs

### 3. Run Locally (Development)

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Python Service:**
```bash
cd python-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| POST | /api/contact | Submit contact form |
| GET | /api/pricing | Get pricing plans |
| POST | /api/newsletter | Subscribe to newsletter |
| GET | /api/testimonials | Get testimonials |
| GET | /api/analytics/stats | Site analytics (Python) |

## 🔧 Environment Variables

See `.env.example` for all required variables.

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild specific service
docker-compose up --build backend
```

## 🚀 Deploy to GitHub

See [DEPLOYMENT.md](DEPLOYMENT.md) for full step-by-step GitHub deployment guide.

## 📄 License

MIT License — feel free to use this project as a portfolio piece or starter template.
