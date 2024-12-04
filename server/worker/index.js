import { startWorker } from './core/worker.js';

// Start the worker process
startWorker().catch(console.error);