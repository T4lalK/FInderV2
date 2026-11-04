import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB68GWtZBALDSG6fr1nwaWQ-O-lwbmCA1s',
  authDomain: 'finderv2-tnm040.firebaseapp.com',
  databaseURL: 'https://finderv2-tnm040-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'finderv2-tnm040',
  storageBucket: 'finderv2-tnm040.firebasestorage.app',
  messagingSenderId: '555323353464',
  appId: '1:555323353464:web:9da3c67bef779bd38c408d'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
