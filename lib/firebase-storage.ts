"use client"

import { getStorage } from "firebase/storage"
import { firebaseApp } from "./firebase"

export const storage = getStorage(firebaseApp)
