import { useEffect, useState } from "react";
import { getAnime } from "../services/anime.service.js"; // Ensure this service works for fetching movies
import Pagination from "../components/Pagination.jsx";
import MyNavbar from "../components/NavBar.jsx";
import { Link } from "react-router-dom";
import '../components/styling/homepage.css';

const AnimeMoviesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const apiConfig = {
        baseURL: "https://api.jikan.moe/v4/top/anime?type=movie",
        limit: 24,
    };

    useEffect(() => {
        fetchAnimeData(currentPage);
    }, [currentPage]);

    const fetchAnimeData = async (page) => {
        setLoading(true);
        try {
            const { data, totalPages } = await getAnime(page, apiConfig);
            setAnime(data);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Failed to fetch anime data:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0);
        }
    };

    const loadNextPage = () => {
        if (currentPage < totalPages) {
            loadPage(currentPage + 1);
        }
    };

    const loadPrevPage = () => {
        if (currentPage > 1) {
            loadPage(currentPage - 1);
        }
    };

    return (
        <>
            <MyNavbar />
            <div style={{ backgroundColor: '#000000', minHeight: '100vh', padding: 0 }}>
                {loading ? (
                    <p style={{ color: '#FFFFFF' }}>Loading...</p>
                ) : (
                    <>
                        <div className="container mt-4" style={{ padding: 0 }}>
                            <h2 style={{ color: '#FFFFFF', margin: '5px' }}>Anime Movies</h2>
                            <div className="row" style={{ margin: 0 }}>
                                {anime.map((item) => (
                                    <div key={item.mal_id} className="col-md-2 mb-4">
                                        <Link to={`/anime/${item.mal_id}`} style={{ textDecoration: 'none' }}>
                                            <div className="card"
                                                style={{
                                                    backgroundColor: '#1a1a1a',
                                                    color: '#FFFFFF',
                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'scale(1.05)';
                                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.5)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'scale(1)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                <img src={item.images.jpg.large_image_url} alt={item.title} className="card-img-top" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="card-text" style={{ fontSize: '11px' }}>{item.title_japanese}</p>
                                                    <div className="genres-box">
                                                        {item.genres.map((genre) => (
                                                            <span key={genre.mal_id} className="genre">{genre.name}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            loadPrevPage={loadPrevPage}
                            loadNextPage={loadNextPage}
                            loadPage={loadPage}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default AnimeMoviesPage;
