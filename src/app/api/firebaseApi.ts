/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/firebaseApi.ts
import { db } from "../../lib/firebase" // pastikan sudah ada firebase config
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"

export async function getAllData(table: string) {
  const colRef = collection(db, table)
  const snapshot = await getDocs(colRef)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export async function createData(table: string, data: any) {
  const colRef = collection(db, table)
  const docRef = await addDoc(colRef, data)
  return { id: docRef.id, ...data }
}

export async function updateData(table: string, id: string, data: any) {
  const docRef = doc(db, table, id)
  await updateDoc(docRef, data)
  return { id, ...data }
}

export async function deleteData(table: string, id: string) {
  const docRef = doc(db, table, id)
  await deleteDoc(docRef)
  return id
}
