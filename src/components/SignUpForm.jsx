import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import { useState } from 'react';
import { auth, db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ScreenMode } from '../pages/SignInPage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onSwitchMode }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            let profilePicUrl = "";

            if (profilePicture) {
                const storageRef = ref(storage, `profilePictures/${user.uid}`);
                await uploadBytes(storageRef, profilePicture);
                profilePicUrl = await getDownloadURL(storageRef);
            }


            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                profilePicture: profilePicUrl
            });

            console.log('User signed up and data saved to Firestore');


            navigate('/home');

        } catch (error) {
            setError(error.message);
            console.error('Signup error:', error);
        }
    };

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
                height: "100%",
                color: colors.grey[800]
            }}
        >
            <Stack spacing={5} sx={{
                width: "100%",
                maxWidth: "500px"
            }}>
                <Stack>
                    <Typography variant='h4' fontWeight={600} color={colors.common.white}>
                        Create an account
                    </Typography>
                    <Typography color={colors.common.white}>
                        ready to become a fulltime weeb?
                    </Typography>
                </Stack>

                {error && (
                    <Typography color="red">
                        {error}
                    </Typography>
                )}

                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <Stack spacing={1}>
                            <Typography color={colors.common.white}>Name</Typography>
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                sx={{ input: { color: 'white' } }}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography color={colors.common.white}>Email</Typography>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                                sx={{ input: { color: 'white' } }}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography color={colors.common.white}>Password</Typography>
                            <TextField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                required
                                sx={{ input: { color: 'white' } }}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography color={colors.common.white}>Profile Picture</Typography>
                            <input
                                type="file"
                                onChange={(e) => setProfilePicture(e.target.files[0])}
                                accept="image/*"
                            />
                        </Stack>
                    </Stack>
                    <Button
                        variant='contained'
                        size='large'
                        onClick={handleSignUp}
                        sx={{
                            bgcolor: colors.grey[800],
                            "&:hover": {
                                bgcolor: colors.grey[600]
                            }
                        }}
                    >
                        Sign up
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Typography color={colors.common.white}>Already have an account?</Typography>
                    <Typography
                        color={colors.common.white}
                        onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
                        fontWeight={600}
                        sx={{
                            cursor: "pointer",
                            userSelect: "none"
                        }}
                    >
                        Sign in
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SignupForm;
