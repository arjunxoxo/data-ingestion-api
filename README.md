#  Data Ingestion API System

This project implements a RESTful API for ingesting and tracking processing of data IDs in a prioritized, rate-limited, and asynchronous batch system.

---

## 🔧 Features

- Ingest a list of IDs with a priority level (HIGH, MEDIUM, LOW).
- Process max 3 IDs per batch every 5 seconds (rate-limited).
- Priority-based processing queue (HIGH > MEDIUM > LOW).
- Asynchronous job processing.
- Query status of an ingestion request (with batch-wise detail).
- In-memory job state persistence using JavaScript objects.

---

## 📁 Folder Structure


├── controllers/
│   └── ingestionController.js     # Handles request logic
├── jobs/
│   └── jobProcessor.js            # Core batch processor logic
├── models/
│   └── store.js                   # In-memory store for ingestion state
├── routes/
│   └── ingestionRoutes.js         # API route definitions
├── tests/
│   └── ingestion.test.js          # Test suite for endpoint validation
├── utils/
│   └── priorityQueue.js           # Custom priority queue logic
├── app.js                         # Express app setup
├── server.js                      # Entry point and port config
├── package.json


---

## 🚀 Endpoints

### 1. POST /ingest

*Payload:*

json
{
  "ids": [1, 2, 3, 4, 5],
  "priority": "HIGH"
}


*Response:*

json
{
  "ingestion_id": "abc123"
}


---

### 2. GET /status/:ingestion_id

*Response Example:*

json
{
  "ingestion_id": "abc123",
  "status": "triggered",
  "batches": [
    { "batch_id": "uuid1", "ids": [1, 2, 3], "status": "completed" },
    { "batch_id": "uuid2", "ids": [4, 5], "status": "triggered" }
  ]
}


---

## 🛠 How to Run Locally

### 1. Clone the repo

bash
git clone https://github.com/your-username/data-ingestion-api.git
cd data-ingestion-api


### 2. Install dependencies

bash
npm install


### 3. Start the server

bash
npm start


Server should be running at http://localhost:5000/

---

## ✅ Deployment on Railway

1. Push code to GitHub.
2. Connect GitHub repo to [Railway](https://railway.app).
3. Railway auto-builds and deploys it.
4. Make sure your server.js listens on process.env.PORT:
   js
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   
5. In Railway → Settings → Domains → Click *"Generate Domain"* to get the public URL.

---

## 🧪 Running Tests

Use any test runner like Jest or Mocha.

bash
npm test


Your test file: tests/ingestion.test.js

---

## 🧠 Design Decisions

- Rate limiting achieved with setInterval and queues.
- Jobs managed in batches of 3 to simulate an external API delay.
- Batches prioritized using a custom-built priority queue.
- In-memory store for simplicity; no external DB required.

---

## 📷 Screenshots

- ✅ Deployed via Railway
- ✅ POST /ingest returns ingestion_id
- ✅ GET /status/:id shows correct priority-based batches
- ✅ Test cases validate all rate-limit & priority behaviors

---
