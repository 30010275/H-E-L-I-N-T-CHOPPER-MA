const express = require('express');
const router = express.Router();
const MaintenanceLog = require('../models/MaintenanceLog');
const authMiddleware = require('../middleware/auth');

// GET all logs
router.get('/', async (req, res) => {
  try {
    const logs = await MaintenanceLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET log by ID
router.get('/:id', async (req, res) => {
  try {
    const log = await MaintenanceLog.findById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create log
router.post('/', authMiddleware, async (req, res) => {
  const { registration, date, technician, description, hours } = req.body;
  if (!registration || !date || !technician || !description || typeof hours !== 'number') {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const log = new MaintenanceLog({
      ...req.body,
      createdBy: req.body.createdBy || 'system',
      updatedBy: req.body.createdBy || 'system'
    });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update log
router.put('/:id', authMiddleware, async (req, res) => {
  const { registration, date, technician, description, hours } = req.body;
  if (!registration || !date || !technician || !description || typeof hours !== 'number') {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const log = await MaintenanceLog.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.body.updatedBy || 'system' },
      { new: true }
    );
    if (!log) return res.status(404).json({ error: 'Not found' });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST add comment to log
router.post('/:id/comment', authMiddleware, async (req, res) => {
  try {
    const log = await MaintenanceLog.findById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Not found' });
    log.comments.push({
      text: req.body.text,
      author: req.body.author || 'system',
      createdAt: new Date()
    });
    await log.save();
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE log
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const log = await MaintenanceLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
