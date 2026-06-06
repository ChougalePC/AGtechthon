import { db } from '../config/firebase';
import { collection, doc, setDoc, getDocs, getDoc, query, orderBy, limit, addDoc } from 'firebase/firestore';

export const saveDiseaseReport = async (uid, reportData) => {
  if (!uid) return;
  const colRef = collection(db, `users/${uid}/disease_history`);
  await addDoc(colRef, {
    ...reportData,
    createdAt: new Date().toISOString()
  });
};

export const getDiseaseHistory = async (uid) => {
  if (!uid) return [];
  const q = query(collection(db, `users/${uid}/disease_history`), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveCropRecommendation = async (uid, crops) => {
  if (!uid) return;
  const colRef = collection(db, `users/${uid}/crop_history`);
  await addDoc(colRef, {
    crops,
    createdAt: new Date().toISOString()
  });
};

export const getLatestCropRecommendations = async (uid) => {
  if (!uid) return null;
  const q = query(collection(db, `users/${uid}/crop_history`), orderBy('createdAt', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return snapshot.docs[0].data();
};

export const saveIrrigationSchedule = async (uid, schedule) => {
  if (!uid) return;
  const colRef = collection(db, `users/${uid}/irrigation_logs`);
  await addDoc(colRef, {
    schedule,
    createdAt: new Date().toISOString()
  });
};

export const getLatestIrrigationSchedule = async (uid) => {
  if (!uid) return null;
  const q = query(collection(db, `users/${uid}/irrigation_logs`), orderBy('createdAt', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return snapshot.docs[0].data();
};

export const initializeFinancialsIfEmpty = async (uid) => {
  if (!uid) return;
  const docRef = doc(db, `users/${uid}/financials`, 'base');
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    // Scaffold base financials for new users so the Analytics chart has something to render
    const initialData = {
      revenueData: [
        { name: 'Kharif 21', rev: 1.2 },
        { name: 'Rabi 21', rev: 1.5 },
        { name: 'Kharif 22', rev: 1.4 },
        { name: 'Rabi 22', rev: 1.8 },
        { name: 'Kharif 23', rev: 1.9 },
        { name: 'Rabi 23', rev: 2.2 },
      ],
      yieldData: [
        { name: 'Plot A', target: 80, actual: 95 },
        { name: 'Plot B', target: 120, actual: 110 },
        { name: 'Plot C', target: 60, actual: 65 },
      ]
    };
    await setDoc(docRef, initialData);
    return initialData;
  }
  return docSnap.data();
};

export const getFinancials = async (uid) => {
  if (!uid) return null;
  const docRef = doc(db, `users/${uid}/financials`, 'base');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return await initializeFinancialsIfEmpty(uid);
};

export const getAlerts = async (uid) => {
  if (!uid) return [];
  const q = query(collection(db, `users/${uid}/alerts`), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveAlert = async (uid, alertData) => {
  if (!uid) return;
  const colRef = collection(db, `users/${uid}/alerts`);
  await addDoc(colRef, {
    ...alertData,
    createdAt: new Date().toISOString()
  });
};
