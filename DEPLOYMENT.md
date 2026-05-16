# 🚀 NexaCloud — Complete Setup & GitHub Deployment Guide

Follow these steps EXACTLY in order. Each step is clear and simple.

---

## STEP 1 — Install Prerequisites

Open your terminal (Git Bash on Windows) and check versions:

```bash
node --version      # Should be 18+
npm --version       # Should be 9+
python --version    # Should be 3.11+
docker --version    # Should be 24+
git --version       # Should be 2+
```

### Install anything missing:

**Node.js 18+** → https://nodejs.org (download LTS)

**Python 3.11+** → https://python.org/downloads

**Docker Desktop** → https://docker.com/products/docker-desktop
- After installing, open Docker Desktop and wait for it to say "Docker Desktop is running"

**Git** → https://git-scm.com/downloads (includes Git Bash)

---

## STEP 2 — Set Up the Project

### 2a. Create a copy of the environment file

In Git Bash, navigate to the project folder and run:

```bash
cd nexacloud
cp .env.example .env
```

The default .env works out of the box for local development. No changes needed.

---

## STEP 3 — Run with Docker (Easiest Way)

Make sure Docker Desktop is open and running, then:

```bash
docker-compose up --build
```

This will:
- Build all 3 app containers (frontend, backend, python)
- Start MongoDB and Redis databases
- Start Nginx reverse proxy
- Seed the database with sample data

Wait ~2-3 minutes for first-time build.

### Visit your running app:

| Service              | URL                              |
|----------------------|----------------------------------|
| 🌐 Website           | http://localhost:3000            |
| ⚙️  API              | http://localhost:5000/api/health |
| 🐍 Python Analytics  | http://localhost:8000/docs       |
| 🔀 Nginx Proxy       | http://localhost:80              |

### Stop the app:
```bash
docker-compose down
```

---

## STEP 4 — Run Locally Without Docker

If you prefer to run each service manually:

### Terminal 1 — Start MongoDB (requires Docker just for DB):
```bash
docker run -d -p 27017:27017 --name mongo \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=nexacloud_secret_2024 \
  mongo:7.0
```

### Terminal 2 — Start Backend:
```bash
cd nexacloud/backend
npm install
npm run dev
```
Backend runs at → http://localhost:5000

### Terminal 3 — Start Frontend:
```bash
cd nexacloud/frontend
npm install
npm run dev
```
Frontend runs at → http://localhost:3000

### Terminal 4 — Start Python Service:
```bash
cd nexacloud/python-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Python API docs at → http://localhost:8000/docs

---

## STEP 5 — Create a GitHub Repository

1. Go to https://github.com
2. Click the **+** button → **New repository**
3. Fill in:
   - Repository name: `nexacloud`
   - Description: `Full-stack SaaS company website with Node.js, React, Python, Docker`
   - Visibility: **Public** (so it shows on your profile)
   - ❌ Do NOT check "Add README" (we already have one)
4. Click **Create repository**
5. Copy the repository URL — it looks like:
   `https://github.com/YOUR_USERNAME/nexacloud.git`

---

## STEP 6 — Push to GitHub (Git Bash)

Open **Git Bash**, navigate to the nexacloud folder, and run these commands ONE BY ONE:

### 6a. Go into the project folder
```bash
cd /path/to/nexacloud
# Example on Windows:  cd /c/Users/YourName/Desktop/nexacloud
# Example on Linux/Mac: cd ~/Desktop/nexacloud
```

### 6b. Initialize git
```bash
git init
```

### 6c. Add all files
```bash
git add .
```

### 6d. Make your first commit
```bash
git commit -m "feat: initial NexaCloud full-stack project

- React + Vite frontend with Tailwind CSS
- Node.js + Express REST API backend
- Python FastAPI analytics microservice
- MongoDB + Redis databases
- Docker + Docker Compose DevOps setup
- Nginx reverse proxy
- GitHub Actions CI/CD pipeline"
```

### 6e. Set branch to main
```bash
git branch -M main
```

### 6f. Connect to your GitHub repo
```bash
git remote add origin https://github.com/YOUR_USERNAME/nexacloud.git
```
⚠️ Replace `YOUR_USERNAME` with your actual GitHub username!

### 6g. Push to GitHub
```bash
git push -u origin main
```

You'll be asked to log in:
- Username: your GitHub username
- Password: use a **Personal Access Token** (NOT your GitHub password)

### Create a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes: check **repo**
4. Generate and copy the token
5. Paste it as the password when Git Bash asks

---

## STEP 7 — Verify on GitHub

1. Go to `https://github.com/YOUR_USERNAME/nexacloud`
2. You should see all your files uploaded
3. Click the **Actions** tab — you'll see the CI/CD pipeline running automatically!

---

## STEP 8 — Update Your README Profile Link

On your GitHub profile, you can now link to this project. To add a description and topics:

1. On your repo page, click the ⚙️ gear icon next to "About"
2. Add description: `Full-stack SaaS platform — React, Node.js, Python, Docker, CI/CD`
3. Add topics: `react`, `nodejs`, `python`, `docker`, `fastapi`, `mongodb`, `devops`, `saas`, `fullstack`
4. Check "Use your README" 
5. Save changes

---

## STEP 9 — Making Future Updates

After making any code changes:

```bash
# 1. See what changed
git status

# 2. Add changed files
git add .

# 3. Commit with a description
git commit -m "feat: add new feature description"

# 4. Push to GitHub
git push
```

---

## Useful Docker Commands

```bash
# View running containers
docker-compose ps

# View logs of a specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs python-service

# Restart a single service
docker-compose restart backend

# Rebuild after code changes
docker-compose up --build backend

# Remove everything including data
docker-compose down -v

# Enter a running container
docker exec -it nexacloud-backend sh
```

---

## Project API Reference

### Backend (Node.js — port 5000)
| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | /api/health                 | Health check             |
| POST   | /api/contact                | Submit contact form      |
| GET    | /api/pricing                | Get pricing plans        |
| POST   | /api/newsletter             | Subscribe to newsletter  |
| GET    | /api/testimonials           | Get testimonials         |
| POST   | /api/analytics/track        | Track analytics event    |
| GET    | /api/analytics/stats        | Get analytics stats      |

### Python Service (port 8000)
| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | /health                     | Health check             |
| GET    | /stats/overview             | Overview metrics         |
| GET    | /stats/traffic              | Daily traffic data       |
| GET    | /stats/top-pages            | Top visited pages        |
| GET    | /stats/devices              | Device breakdown         |
| GET    | /stats/geo                  | Geographic distribution  |
| GET    | /report/generate            | Full analytics report    |
| GET    | /docs                       | Interactive API docs     |

---

## Troubleshooting

**Docker won't start?**
→ Make sure Docker Desktop is open and shows "Docker Desktop is running"

**Port already in use?**
→ Run: `docker-compose down` then try again

**MongoDB connection error?**
→ Wait 30 seconds after starting docker-compose. MongoDB takes time to initialize.

**npm install fails?**
→ Try: `npm install --legacy-peer-deps`

**Git push asks for password?**
→ Use a Personal Access Token (see Step 6g above)

**Frontend shows blank page?**
→ Make sure backend is running. Check browser console for errors.
