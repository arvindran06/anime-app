import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ScreenMode } from '../pages/SignInPage';

const SigninForm = ({ onSwitchMode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in');
            navigate('/home');
        } catch (error) {
            setError(error.message);
            console.error('Sign-in error:', error);
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
                        Welcome back
                    </Typography>
                    <Typography color={colors.common.white}>
                        ready to explore anime??
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
                    </Stack>
                    <Button
                        variant='contained'
                        size='large'
                        onClick={handleSignIn}
                        sx={{
                            bgcolor: colors.grey[800],
                            "&:hover": {
                                bgcolor: colors.grey[600]
                            }
                        }}
                    >
                        Sign in
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Typography color={colors.common.white}>Don&apos;t have an account?</Typography>
                    <Typography
                        color={colors.grey[200]}
                        onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
                        fontWeight={600}
                        sx={{
                            cursor: "pointer",
                            userSelect: "none"
                        }}
                    >
                        Sign up now
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SigninForm;
