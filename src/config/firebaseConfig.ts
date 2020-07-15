import * as dotenv from 'dotenv';

dotenv.config();

export default {
	apiKey: process.env._FIREBASE_API_KEY,
	appId: process.env._FIREBASE_APP_ID,
	authDomain: process.env._FIREBASE_API_KEY,
	databaseURL: process.env._FIREBASE_DATABASE_URL,
	measurementId: process.env._FIREBASE_MEASUREMENT_ID,
	messagingSenderId: process.env._FIREBASE_MESSAGING_SENDER_ID,
	projectId: process.env._FIREBASE_PROJECT_ID,
	storageBucket: process.env._FIREBASE_STORAGE_BUCKET,
};
