import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
const serviceAccount = JSON.parse(fs.readFileSync('./blog-feff1-firebase-adminsdk-fbsvc-581ceb2365.json', 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'blog-feff1'
});

// Get the hosting service
const hosting = admin.hosting();

// Deploy the site
async function deploySite() {
  try {
    // Read the dist directory
    const distPath = path.join(__dirname, 'dist');
    const files = fs.readdirSync(distPath);
    
    // Upload files
    const uploadPromises = files.map(file => {
      const filePath = path.join(distPath, file);
      const fileContent = fs.readFileSync(filePath);
      return hosting.uploadFile(file, fileContent);
    });

    await Promise.all(uploadPromises);
    console.log('Deployment successful!');
  } catch (error) {
    console.error('Deployment failed:', error);
  }
}

deploySite(); 