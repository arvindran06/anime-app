import { Box, Grid, colors } from '@mui/material';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import backgroundVid from '../assets/backgroundVid.mp4'
import SigninForm from '../components/SignInForm';
import SignupForm from '../components/SignUpForm';
import { getDoc, doc } from 'firebase/firestore'

export const ScreenMode = {
    SIGN_IN: "SIGN_IN",
    SIGN_UP: "SIGN_UP"
};

const SigninPage = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState("unset");
    const [width, setWidth] = useState(0);
    const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);
    const [, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                console.log('User is logged in:', user);

                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log('User data:', userData);
                } else {
                    console.log('No user data found');
                }
            } else {
                setUser(null);
                console.log('No user is logged in');
            }
        });

        return () => unsubscribe();
    }, [setUser]);

    const onSwitchMode = (mode) => {
        setWidth(100);

        const timeout1 = setTimeout(() => {
            setCurrMode(mode);
        }, 1100);

        const timeout2 = setTimeout(() => {
            setLeft("unset");
            setRight(0);
            setWidth(0);
        }, 1200);

        const timeout3 = setTimeout(() => {
            setRight("unset");
            setLeft(0);
        }, 2500);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    };

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid item xs={4} sx={{ position: "relative", padding: 3, backgroundColor: "black" }}>
                {
                    currMode === ScreenMode.SIGN_IN ? (
                        <SigninForm onSwitchMode={onSwitchMode} />
                    ) : (
                        <SignupForm onSwitchMode={onSwitchMode} />
                    )
                }
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: left,
                    right: right,
                    width: `${width}%`,
                    height: "100%",
                    bgcolor: colors.grey[800],
                    transition: "all 1s ease-in-out"
                }} />
            </Grid>
            <Grid item xs={8} sx={{
                position: "relative",
                overflow: "hidden"
            }}>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "100%",
                        height: "100vh",
                        zIndex: -1,
                        transform: "translate(-50%, -50%)",
                        objectFit: "cover"
                    }}
                >
                    <source src={backgroundVid} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: left,
                    right: right,
                    width: `${width}%`,
                    height: "100%",
                    bgcolor: colors.common.black,
                    transition: "all 1s ease-in-out"
                }} />
            </Grid>
        </Grid>
    );
};

export default SigninPage;
