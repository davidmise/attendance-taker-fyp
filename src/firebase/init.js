// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKQXLZA9Hzc6BgQfe4mqhDvU0ESSptgtg',
  authDomain: 'biometric-attendance-52910.firebaseapp.com',
  databaseURL: 'https://biometric-attendance-52910-default-rtdb.firebaseio.com',
  projectId: 'biometric-attendance-52910',
  storageBucket: 'biometric-attendance-52910.appspot.com',
  messagingSenderId: '441862920238',
  appId: '1:441862920238:web:0abc5a9e0839bcbf2ae7bf',
  measurementId: 'G-JSGNLG4K0Q'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const firestore = getFirestore(app)

export { database, firestore }
