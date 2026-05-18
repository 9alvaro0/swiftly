// src/lib/secret-manager.ts
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

let client: SecretManagerServiceClient | null = null;

// Initialize client only in production or when explicitly needed
function getClient() {
  if (!client) {
    // Use Application Default Credentials in production
    // For local development, you can set GOOGLE_APPLICATION_CREDENTIALS
    client = new SecretManagerServiceClient();
  }
  return client;
}

export async function getSecret(secretName: string): Promise<string> {
  try {
    // In development, fall back to environment variables
    if (process.env.NODE_ENV === 'development') {
      const envValue = process.env[secretName];
      if (envValue) {
        return envValue;
      }
    }

    const projectId = process.env.FIREBASE_PROJECT_ID || 'swiftly-by-warwere';
    const name = `projects/${projectId}/secrets/${secretName}/versions/latest`;
    
    const [version] = await getClient().accessSecretVersion({ name });
    const payload = version.payload?.data?.toString();
    
    if (!payload) {
      throw new Error(`Secret ${secretName} is empty`);
    }
    
    return payload;
  } catch (error) {
    console.error(`Failed to get secret ${secretName}:`, error);
    
    // Fallback to environment variable
    const envValue = process.env[secretName];
    if (envValue) {
      console.warn(`Using fallback environment variable for ${secretName}`);
      return envValue;
    }
    
    throw new Error(`Secret ${secretName} not found in Secret Manager or environment`);
  }
}

// Helper function to get Firebase credentials from secrets or env
export async function getFirebaseCredentials() {
  try {
    const [projectId, clientEmail, privateKey] = await Promise.all([
      getSecret('FIREBASE_PROJECT_ID'),
      getSecret('FIREBASE_CLIENT_EMAIL'),
      getSecret('FIREBASE_PRIVATE_KEY')
    ]);

    return {
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n')
    };
  } catch (error) {
    console.error('Failed to get Firebase credentials:', error);
    throw error;
  }
}