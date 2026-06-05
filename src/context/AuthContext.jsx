import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../config/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with Email/Password
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create initial user profile in Firestore
    const profileData = {
      uid: user.uid,
      email: user.email,
      name: name,
      farmSize: "",
      location: "",
      soilType: "",
      primaryCrops: [],
      createdAt: new Date().toISOString()
    };
    
    await setDoc(doc(db, "users", user.uid), profileData);
    setUserProfile(profileData);
    return user;
  };

  // Sign in with Email/Password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if profile exists, if not create one
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      const profileData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "Farmer",
        farmSize: "",
        location: "",
        soilType: "",
        primaryCrops: [],
        createdAt: new Date().toISOString()
      };
      await setDoc(docRef, profileData);
      setUserProfile(profileData);
    } else {
      setUserProfile(docSnap.data());
    }
    
    return user;
  };

  // Log out
  const logout = () => {
    setUserProfile(null);
    return signOut(auth);
  };

  // Listen to Auth State changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setCurrentUser(user);
        
        if (user) {
          // Fetch profile from Firestore
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          } else {
            // Auto-repair: create a missing profile document
            const profileData = {
              uid: user.uid,
              email: user.email,
              name: user.displayName || "Farmer",
              farmSize: "",
              location: "",
              soilType: "",
              primaryCrops: [],
              createdAt: new Date().toISOString()
            };
            await setDoc(docRef, profileData);
            setUserProfile(profileData);
          }
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile in AuthContext:", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    setUserProfile,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-[rgba(180,210,140,0.2)] border-t-accent animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
