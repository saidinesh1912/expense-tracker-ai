import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7S3iGe7FeN_It6YWSOY0a5PSVM5si0-8",
  authDomain: "expense-tracker-ai-28b34.firebaseapp.com",
  projectId: "expense-tracker-ai-28b34",
  storageBucket: "expense-tracker-ai-28b34.firebasestorage.app",
  messagingSenderId: "1084523310516",
  appId: "1:1084523310516:web:7f26dd6700a99e1b4f56e1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();