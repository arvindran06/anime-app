import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const getCurrentUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const token = await user.getIdToken();


            return {
                uid: user.uid,
                name: userData.name || 'User',
                photoURL: userData.profilePicture || '',
                token,
            };
        }
    }
    return null;
};
