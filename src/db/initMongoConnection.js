import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

const MONGODB_USER = getEnvVar('MONGODB_USER');
const MONGODB_PASSWORD = getEnvVar('MONGODB_PASSWORD');
const MONGODB_URL = getEnvVar('MONGODB_URL');
const MONGODB_DB = getEnvVar('MONGODB_DB');

const URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

async function initMongoConnection() {
  try {
    await mongoose.connect(URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}
export { initMongoConnection };
