import { FirestoreAdapter } from "@auth/firebase-adapter";
import { QwikAuth$ } from "@auth/qwik";
import Google from "@auth/qwik/providers/google";
import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminInit = () => {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
        clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
      }),
    });
  }
};

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => {
    firebaseAdminInit();
    const firestore = getFirestore();

    return {
      providers: [Google],
      adapter: FirestoreAdapter({
        firestore,
      }),
      pages: {
        signIn: "/a/signin/",
        signOut: "/a/signout/",
        signedOut: "/a/signedout/"
      }
    };
  },
);