import * as dotenv from 'dotenv';

dotenv.config();

export default {
	auth_provider_x509_cert_url: process.env._FIREBASE_ADMIN_AUTH_PROVIDER_CERT_URL,
	auth_uri: process.env._FIREBASE_ADMIN_AUTH_URI,
	client_email: process.env._FIREBASE_ADMIN_CLIENT_EMAIL,
	client_id: process.env._FIREBASE_ADMIN_CLIENT_ID,
	client_x509_cert_url: process.env._FIREBASE_ADMIN_CLIENT_CERT_URL,
	private_key: process.env._FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/gi, '\n'),
	private_key_id: process.env._FIREBASE_ADMIN_PRIVATE_KEY_ID,
	project_id: process.env._FIREBASE_PROJECT_ID,
	token_uri: process.env._FIREBASE_ADMIN_TOKEN_URI,
	type: 'service_account',
} as any;
