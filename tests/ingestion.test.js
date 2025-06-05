const request = require('supertest');
const app = require('../app');

describe('Ingestion API', () => {
  it('should return ingestion_id on POST /ingest', async () => {
    const res = await request(app)
      .post('/ingest')
      .send({ ids: [1, 2, 3, 4], priority: 'HIGH' });

    expect(res.body).toHaveProperty('ingestion_id');
  });

  it('should return status of ingestion on GET /status/:id', async () => {
    const postRes = await request(app)
      .post('/ingest')
      .send({ ids: [1, 2, 3], priority: 'LOW' });

    const ingestion_id = postRes.body.ingestion_id;

    const res = await request(app).get(`/status/${ingestion_id}`);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('batches');
  });
});