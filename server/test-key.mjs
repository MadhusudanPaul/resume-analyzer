import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const key = process.env.GEMINI_API_KEY;
console.log('Key found:', !!key);
console.log('Key length:', key?.length);
console.log('Key preview:', key?.substring(0, 10) + '...');

// Direct API test - list models
const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
const data = await res.json();
console.log('\nAPI Status:', res.status, res.statusText);

if (res.ok) {
  console.log('✅ API KEY IS VALID!');
  console.log('Available models:', data.models?.map(m => m.name).join(', '));
} else {
  console.log('❌ API KEY IS INVALID');
  console.log('Error:', JSON.stringify(data.error, null, 2));
}
