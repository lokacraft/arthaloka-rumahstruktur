import {useState, useEffect} from 'react'

import { auth } from './firebase'
import { User as FirebaseUser, signOut as firebaseSignOut, browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'


export async function signIn(email: string, password: string, rememberMe: boolean = false) {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
      return firebaseSignOut(auth);
}

export function useUser() {
      const [user, setUser] = useState<FirebaseUser | null | false>(false);
      useEffect(() => {
            return onAuthStateChanged(auth, (user) => setUser(user));
      }, [])

      return user;
}