import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUsername(userData.name);
                        setEmail(userData.email);
                        setProfilePicture(userData.profilePicture || '');
                    } else {
                        console.log("No user document found");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUsername('');
                setEmail('');
                setProfilePicture('');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("User logged out");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <Container className="text-center mt-5">
            <Button
                variant="primary"
                onClick={handleBack}
                style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}
            >
                ⮜
            </Button>

            <div>
                <img
                    src={profilePicture}
                    alt="Profile"
                    style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <h2 style={{ color: '#FFFFFF' }}>{username}</h2>
                <p style={{ color: '#FFFFFF' }}>{email}</p>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
        </Container>
    );
};

export default ProfilePage;