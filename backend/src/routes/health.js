const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// GET /api/health
router.get('/', async (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStates = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV,
    services: {
      database: {
        status: dbStates[dbStatus] || 'unknown',
        healthy: dbStatus === 1
      },
      api: {
        status: 'running',
        healthy: true
      }
    },
    memory: {
      used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`
    }
  };

  const statusCode = health.services.database.healthy ? 200 : 503;
  res.status(statusCode).json(health);
});

module.exports = router;
