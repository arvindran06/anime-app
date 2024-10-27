import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SigninPage from './pages/SignInPage';
import SignupForm from './components/SignUpForm';
import Homepage from './pages/HomePage';
import AnimeDetailPage from './pages/AnimeDetailsPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import WatchlistPage from './pages/WatchListPage';
import ProtectedRoute from './auth/ProtectedRoute';
import AnimeMoviesPage from './pages/AnimeMoviesPage';
import GenresPage from './pages/GenresPage';
import GenreDetailPage from './pages/GenreDetailPage';
import PopularAnimesPage from './pages/PopularAnimePage';
import { AuthProvider } from './auth/AuthContext';
import './App.css';

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                    <Route path="/popular-animes" element={<ProtectedRoute><PopularAnimesPage /></ProtectedRoute>} />
                    <Route path="/anime-movies" element={<ProtectedRoute><AnimeMoviesPage /></ProtectedRoute>} />
                    <Route path="/genres" element={<ProtectedRoute><GenresPage /></ProtectedRoute>} />
                    <Route path="/genre/:genreId" element={<ProtectedRoute><GenreDetailPage /></ProtectedRoute>} />
                    <Route path="/anime/:animeId" element={<ProtectedRoute><AnimeDetailPage /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                    <Route path="/watchlist" element={<ProtectedRoute><WatchlistPage /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

