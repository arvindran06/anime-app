import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MyNavbar from "../components/NavBar.jsx";
import '../components/styling/homepage.css';
import Pagination from "../components/Pagination.jsx";
import '../components/styling/homepage.css'

const GenreDetailPage = () => {
    const { genreId } = useParams();
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchAnimeByGenre = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity&page=${page}`);
            const data = await response.json();

            setAnime(data.data);
            setTotalPages(data.pagination ? data.pagination.last_visible_page : 1);
        } catch (error) {
            console.error("Failed to fetch anime by genre:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimeByGenre(currentPage);
    }, [currentPage, genreId]);

    const loadPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0);
        }
    };

    return (
        <>
            <MyNavbar />
            <div style={{ backgroundColor: '#000000', minHeight: '100vh', padding: '20px' }}>
                {loading ? (
                    <p style={{ color: '#FFFFFF' }}>Loading...</p>
                ) : (
                    <div className="container">
                        <h2 style={{ color: '#FFFFFF' }}>Anime Genre</h2>
                        <div className="row">
                            {anime.map((item) => (
                                <div key={item.mal_id} className="col-md-2 mb-4">
                                    <Link to={`/anime/${item.mal_id}`} style={{ textDecoration: 'none' }}>
                                        <div className="card" style={{ backgroundColor: '#1a1a1a', color: '#FFFFFF', transition: 'transform 0.2s, box-shadow 0.2s' }}
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
                                                <p className="card-text">{item.title_japanese}</p>
                                                <div className="genres-box">
                                                    {item.genres && item.genres.map((genre) => (
                                                        <span key={genre.mal_id} className="genre">{genre.name}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            loadPage={loadPage}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default GenreDetailPage;