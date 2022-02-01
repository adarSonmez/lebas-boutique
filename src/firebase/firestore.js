/**
 * Firebase V9 CRUD operations
 **/

import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

// Get firestore database
const db = getFirestore();

// Add a document to firestore
export const addDocument = (colName, docObject, callback) => {
  const colRef = collection(db, colName);

  addDoc(colRef, {
    ...docObject,
    createdAt: serverTimestamp(),
  })
    .catch((err) => console.log(err.message))
    .then(callback());
};

// Delete a document from firestore
export const deleteDocumentByID = (colName, docID, callback) => {
  const colRef = collection(db, colName);
  const docRef = doc(db, colRef, docID);

  deleteDoc(docRef)
    .catch((err) => console.log(err.message))
    .then(callback());
};

// Update a document in firestore
export const UpdateDocumentByID = (colName, docID, newDoc, callback) => {
  const colRef = collection(db, colName);
  const docRef = doc(db, colRef, docID);

  updateDoc(docRef, newDoc)
    .catch((err) => console.log(err.message))
    .then(callback());
};

// Create a query
export const myQuery = (colName, filterStr, orderIndex, desc, callback) => {
  const colRef = collection(db, colName);

  return query(
    colRef,
    where(filterStr),
    orderBy(orderIndex, desc ? 'desc' : 'asc')
  )
    .then(callback())
    .catch((err) => console.log(err.message));
};

// Use custom query to get data (real time update)
export const getDataByQuery = (q, callback) =>
  onSnapshot(q, (snapshot) => {
    return snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  })
    .then(callback())
    .catch((err) => console.log(err.message));

// Send collection's name and get all documents (real time update)
export const getDataByColName = (colName, callback) => {
  const colRef = collection(db, colName);

  return onSnapshot(colRef, (snapshot) => {
    return snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  })
    .then(callback())
    .catch((err) => console.log(err.message));
};

// Get a single document by ID (real time update)
export const getDocByID = (colName, id, callback) => {
  const docRef = doc(db, colName, id);
  onSnapshot(docRef, (doc, id) => callback(doc, id));
};

/* SPECIFIC TO THIS PROJECT */
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const docRef = doc(db, 'users', userAuth.uid);
  const { displayName, email } = userAuth;

  try {
    await setDoc(docRef, {
      displayName,
      email,
      createdAt: new Date(),
      ...additionalData,
    });
  } catch (error) {
    console.error(error.message);
  }

  getDocByID('users', userAuth.uid, () => {});
};
