import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAnimeGenresList } from "../services/anime.service.js";
import MyNavbar from "../components/NavBar.jsx";
import '../components/styling/homepage.css';

const GenresPage = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getAnimeGenresList(); // Directly use the returned data
                setGenres(data);
            } catch (error) {
                console.error("Failed to fetch genres:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return (
        <>
            <MyNavbar />
            <div style={{ backgroundColor: '#000000', minHeight: '100vh', padding: '20px' }}>
                {loading ? (
                    <p style={{ color: '#FFFFFF' }}>Loading...</p>
                ) : (
                    <div className="container">
                        <h2 style={{ color: '#FFFFFF' }}>Anime Genres</h2>
                        <div className="row">
                            {genres.map((genre) => (
                                <div key={genre.mal_id} className="col-md-3 mb-4">
                                    <Link to={`/genre/${genre.mal_id}`} style={{ textDecoration: 'none' }}>
                                        <div className="card" style={{ backgroundColor: '#1a1a1a', color: '#FFFFFF' }}>
                                            <div className="card-body">
                                                <h5 className="card-title">{genre.name}</h5>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default GenresPage;
