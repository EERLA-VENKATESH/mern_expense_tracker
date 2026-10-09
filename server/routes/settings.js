const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// GET /api/settings/budget
router.get('/budget', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: 'monthlyBudget' });
    res.json({ monthlyBudget: setting?.value || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings/budget
router.put('/budget', async (req, res) => {
  try {
    const { monthlyBudget } = req.body;
    const setting = await Setting.findOneAndUpdate(
      { key: 'monthlyBudget' },
      { value: Number(monthlyBudget) || 0 },
      { new: true, upsert: true }
    );
    res.json({ monthlyBudget: setting.value });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;