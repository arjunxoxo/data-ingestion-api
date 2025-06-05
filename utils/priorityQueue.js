const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
const queue = [];

exports.enqueue = job => {
  queue.push(job);
  queue.sort((a, b) => {
    if (priorityOrder[a.priority] === priorityOrder[b.priority]) {
      return a.created_at - b.created_at;
    }
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

exports.dequeue = () => queue.shift();