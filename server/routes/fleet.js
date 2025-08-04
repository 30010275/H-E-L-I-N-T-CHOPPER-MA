const express = require('express');
const router = express.Router();
const Helicopter = require('../models/Helicopter');
const authMiddleware = require('../middleware/auth');

// GET all helicopters
router.get('/', async (req, res) => {
  try {
    const fleet = await Helicopter.find();
    res.json(fleet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET helicopter by ID
router.get('/:id', async (req, res) => {
  try {
    const heli = await Helicopter.findById(req.params.id);
    if (!heli) return res.status(404).json({ error: 'Not found' });
    res.json(heli);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Validate required fields for helicopter
router.post('/', authMiddleware, async (req, res) => {
  const { name, type, capacity, status } = req.body;
  if (!name || !type || typeof capacity !== 'number' || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const heli = new Helicopter(req.body);
    await heli.save();
    res.status(201).json(heli);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update helicopter
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, type, capacity, status } = req.body;
  if (!name || !type || typeof capacity !== 'number' || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const heli = await Helicopter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!heli) return res.status(404).json({ error: 'Not found' });
    res.json(heli);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE helicopter
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const heli = await Helicopter.findByIdAndDelete(req.params.id);
    if (!heli) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
