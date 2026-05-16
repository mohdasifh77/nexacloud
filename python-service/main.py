"""
NexaCloud Analytics Microservice
Run: python main.py  OR  uvicorn main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime, timedelta
import random
import uvicorn

app = FastAPI(
    title="NexaCloud Analytics API",
    description="Analytics microservice for NexaCloud. Visit /docs for interactive API.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TrackEvent(BaseModel):
    event: str
    page: Optional[str] = None
    element: Optional[str] = None
    session_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

events = []

@app.get("/")
def root():
    return {
        "service": "NexaCloud Analytics",
        "version": "1.0.0",
        "status": "running",
        "docs": "http://localhost:8000/docs",
        "endpoints": ["/health", "/stats/overview", "/stats/traffic",
                      "/stats/top-pages", "/stats/devices", "/stats/geo", "/report/generate"]
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "nexacloud-analytics",
        "timestamp": datetime.utcnow().isoformat(),
        "events_tracked": len(events)
    }

@app.post("/track")
def track(event: TrackEvent):
    record = {
        "id": len(events) + 1,
        "event": event.event,
        "page": event.page,
        "timestamp": datetime.utcnow().isoformat()
    }
    events.append(record)
    return {"success": True, "id": record["id"]}

@app.get("/stats/overview")
def overview():
    return {
        "success": True,
        "data": {
            "period": "last_30_days",
            "generated_at": datetime.utcnow().isoformat(),
            "metrics": {
                "total_visitors":       random.randint(12000, 18000),
                "unique_visitors":      random.randint(8000,  12000),
                "page_views":           random.randint(45000, 65000),
                "avg_session_duration": f"{random.randint(2,5)}m {random.randint(10,59)}s",
                "bounce_rate":          f"{random.uniform(28, 42):.1f}%",
                "conversion_rate":      f"{random.uniform(3.2, 5.8):.1f}%",
                "contact_submissions":  random.randint(45, 120),
                "newsletter_signups":   random.randint(80, 200)
            }
        }
    }

@app.get("/stats/traffic")
def traffic():
    data = []
    base = datetime.utcnow() - timedelta(days=30)
    for i in range(30):
        day = base + timedelta(days=i)
        m = 0.6 if day.weekday() >= 5 else 1.0
        data.append({
            "date":       day.strftime("%Y-%m-%d"),
            "visitors":   int(random.randint(300, 600) * m),
            "page_views": int(random.randint(900, 2000) * m),
            "conversions":int(random.randint(5,  20)   * m)
        })
    return {"success": True, "data": data}

@app.get("/stats/top-pages")
def top_pages():
    pages = [
        {"page": "/",         "title": "Home",     "views": random.randint(8000,15000), "avg_time": "2m 34s"},
        {"page": "/pricing",  "title": "Pricing",  "views": random.randint(4000, 7000), "avg_time": "3m 12s"},
        {"page": "/features", "title": "Features", "views": random.randint(3000, 5000), "avg_time": "4m 01s"},
        {"page": "/about",    "title": "About",    "views": random.randint(1500, 3000), "avg_time": "1m 45s"},
        {"page": "/contact",  "title": "Contact",  "views": random.randint(1000, 2500), "avg_time": "2m 20s"},
    ]
    return {"success": True, "data": sorted(pages, key=lambda x: x["views"], reverse=True)}

@app.get("/stats/devices")
def devices():
    return {
        "success": True,
        "data": [
            {"device": "Desktop", "percentage": 54.2, "sessions": random.randint(5000,8000)},
            {"device": "Mobile",  "percentage": 36.8, "sessions": random.randint(3000,5000)},
            {"device": "Tablet",  "percentage": 9.0,  "sessions": random.randint(800, 1500)},
        ]
    }

@app.get("/stats/geo")
def geo():
    return {
        "success": True,
        "data": [
            {"country": "United States", "code": "US", "visitors": random.randint(3000,5000)},
            {"country": "United Kingdom","code": "GB", "visitors": random.randint(1000,2000)},
            {"country": "India",         "code": "IN", "visitors": random.randint(900, 1800)},
            {"country": "Germany",       "code": "DE", "visitors": random.randint(700, 1200)},
            {"country": "Canada",        "code": "CA", "visitors": random.randint(500,  900)},
        ]
    }

@app.get("/report/generate")
def report():
    return {
        "success": True,
        "report": {
            "generated_at": datetime.utcnow().isoformat(),
            "summary": overview()["data"],
            "top_pages": top_pages()["data"][:3],
            "devices":   devices()["data"]
        }
    }

if __name__ == "__main__":
    print("\n  ╔══════════════════════════════════════════╗")
    print("  ║  🐍  NexaCloud Analytics  is  running   ║")
    print("  ║  http://localhost:8000/docs              ║")
    print("  ╚══════════════════════════════════════════╝\n")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
