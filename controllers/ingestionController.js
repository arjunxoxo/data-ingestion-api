const { v4: uuidv4 } = require('uuid');
const store = require('../models/store');
const queue = require('../utils/priorityQueue');

exports.ingestData = (req, res) => {
  const { ids, priority } = req.body;
  const ingestion_id = uuidv4();
  const timestamp = Date.now();

  const batches = [];
  for (let i = 0; i < ids.length; i += 3) {
    batches.push({
      batch_id: uuidv4(),
      ids: ids.slice(i, i + 3),
      status: 'yet_to_start',
    });
  }

  store.ingestions[ingestion_id] = {
    ingestion_id,
    status: 'yet_to_start',
    created_at: timestamp,
    priority,
    batches,
  };

  batches.forEach(batch => {
    queue.enqueue({
      ingestion_id,
      batch,
      created_at: timestamp,
      priority,
    });
  });

  res.json({ ingestion_id });
};

exports.getStatus = (req, res) => {
  const { ingestion_id } = req.params;
  const record = store.ingestions[ingestion_id];

  if (!record) return res.status(404).json({ error: 'Not found' });

  const batchStatuses = record.batches.map(b => b.status);
  if (batchStatuses.every(s => s === 'yet_to_start')) record.status = 'yet_to_start';
  else if (batchStatuses.every(s => s === 'completed')) record.status = 'completed';
  else record.status = 'triggered';

  res.json({
    ingestion_id,
    status: record.status,
    batches: record.batches,
  });
};