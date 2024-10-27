import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const saveUserData = async (user) => {
        try {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                name: user.name,
                email: user.email,
                profilePicture: user.photoURL,
            }, { merge: true });

            console.log('User data saved successfully');
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                await saveUserData(user);
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
