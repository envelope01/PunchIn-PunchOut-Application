const express = require('express');
const router = express.Router();
const { getAttendanceStatus, punchIn, punchOut } = require('../controllers/attendanceController');

// GET /api/attendance/status
router.get('/status', getAttendanceStatus);

// POST /api/attendance/punch-in
router.post('/punch-in', punchIn);

// --- ADD THIS NEW ROUTE ---
// POST /api/attendance/punch-out
router.post('/punch-out', punchOut);

module.exports = router;