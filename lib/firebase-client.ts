"use client"

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { type Auth, getAuth, connectAuthEmulator } from "firebase/auth"
import { type Firestore, getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { type Storage, getStorage, connectStorageEmulator } from "firebase/storage"

// Singleton pattern for Firebase
class FirebaseClient {
  private static instance: FirebaseClient
  private app: FirebaseApp | null = null
  private _auth: Auth | null = null
  private _firestore: Firestore | null = null
  private _storage: Storage | null = null
  private initialized = false

  private constructor() {
    // Private constructor to enforce singleton
  }

  public static getInstance(): FirebaseClient {
    if (!FirebaseClient.instance) {
      FirebaseClient.instance = new FirebaseClient()
    }
    return FirebaseClient.instance
  }

  public initialize(): void {
    if (typeof window === "undefined") {
      console.warn("Firebase should not be initialized on the server side")
      return
    }

    if (this.initialized) {
      return
    }

    try {
      if (!getApps().length) {
        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        }

        this.app = initializeApp(firebaseConfig)
        console.log("Firebase initialized successfully")
      } else {
        this.app = getApps()[0]
      }

      this.initialized = true
    } catch (error) {
      console.error("Firebase initialization error:", error)
    }
  }

  public get auth(): Auth {
    if (!this.initialized) {
      this.initialize()
    }

    if (!this._auth && this.app) {
      this._auth = getAuth(this.app)

      // Connect to emulator in development
      if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true") {
        connectAuthEmulator(this._auth, "http://localhost:9099")
      }
    }

    if (!this._auth) {
      throw new Error("Firebase Auth is not initialized")
    }

    return this._auth
  }

  public get firestore(): Firestore {
    if (!this.initialized) {
      this.initialize()
    }

    if (!this._firestore && this.app) {
      this._firestore = getFirestore(this.app)

      // Connect to emulator in development
      if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true") {
        connectFirestoreEmulator(this._firestore, "localhost", 8080)
      }
    }

    if (!this._firestore) {
      throw new Error("Firebase Firestore is not initialized")
    }

    return this._firestore
  }

  public get storage(): Storage {
    if (!this.initialized) {
      this.initialize()
    }

    if (!this._storage && this.app) {
      this._storage = getStorage(this.app)

      // Connect to emulator in development
      if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true") {
        connectStorageEmulator(this._storage, "localhost", 9199)
      }
    }

    if (!this._storage) {
      throw new Error("Firebase Storage is not initialized")
    }

    return this._storage
  }
}

// Export a function to get the Firebase client
export function getFirebaseClient(): FirebaseClient {
  return FirebaseClient.getInstance()
}

// Export convenience functions for services
export function getFirebaseAuth(): Auth {
  return getFirebaseClient().auth
}

export function getFirebaseFirestore(): Firestore {
  return getFirebaseClient().firestore
}

export function getFirebaseStorage(): Storage {
  return getFirebaseClient().storage
}
