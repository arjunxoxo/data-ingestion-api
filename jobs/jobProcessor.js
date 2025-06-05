const queue = require('../utils/priorityQueue');
const store = require('../models/store');

const RATE_LIMIT_MS = 5000;
let isProcessing = false;

function processJob(job) {
  const { ingestion_id, batch } = job;

  const ingestion = store.ingestions[ingestion_id];
  const batchIndex = ingestion.batches.findIndex(b => b.batch_id === batch.batch_id);
  ingestion.batches[batchIndex].status = 'triggered';

  setTimeout(() => {
    ingestion.batches[batchIndex].status = 'completed';
    isProcessing = false;
  }, 2000); // simulate processing
}

setInterval(() => {
  if (isProcessing) return;

  const nextJob = queue.dequeue();
  if (nextJob) {
    isProcessing = true;
    processJob(nextJob);
  }
}, RATE_LIMIT_MS);