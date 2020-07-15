import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import dotenv from 'dotenv';

import config from '../config';

dotenv.config();

const databaseURL = process.env._FIREBASE_DATABASE_URL;
const storageBucket = process.env._FIREBASE_STORAGE_BUCKET;

const { adminConfig, firebaseConfig } = config;

admin.initializeApp({
	credential: admin.credential.cert(adminConfig),
	databaseURL,
	storageBucket,
});

firebase.initializeApp(firebaseConfig);

const fireStorage = admin.storage();

export default {
	admin,
	fireStorage,
	firebase,
};
