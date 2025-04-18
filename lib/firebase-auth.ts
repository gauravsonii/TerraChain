"use client"

import { getAuth } from "firebase/auth"
import { firebaseApp } from "./firebase"

export const auth = getAuth(firebaseApp)
