const getAttendanceStatus = async (req, res) => {
  try {
    const userId = 1; 
    const today = new Date().toISOString().split('T')[0];

    // First, look for an active (not punched-out) session
    const activeSql = "SELECT * FROM attendance WHERE user_id = ? AND work_date = ? AND punch_out_time IS NULL";
    const [activeRows] = await db.query(activeSql, [userId, today]);

    if (activeRows.length > 0) {
      // Found an active session
      return res.json({ status: 'punched_in', details: activeRows[0] });
    }

    // If no active session, look for the latest completed session for today
    const completedSql = "SELECT * FROM attendance WHERE user_id = ? AND work_date = ? AND punch_out_time IS NOT NULL ORDER BY punch_out_time DESC LIMIT 1";
    const [completedRows] = await db.query(completedSql, [userId, today]);

    if (completedRows.length > 0) {
      // Found a completed session for today
      return res.json({ status: 'completed', details: completedRows[0] });
    }

    // If nothing is found for today, they are ready to punch in
    res.json({ status: 'not_punched_in' });
    
  } catch (error) {
    console.error("Error fetching attendance status:", error);
    res.status(500).json({ message: 'Error fetching status from database' });
  }
};
