import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailAnime } from "../services/anime.service";
import { Button, Card, Container } from "react-bootstrap";
import MyNavbar from "../components/NavBar";
import ReviewSection from "../components/ReviewSection";
import '../components/styling/detailpage.css';

const AnimeDetailPage = () => {
    const { animeId } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                const data = await getDetailAnime(animeId);
                setAnime(data);
            } catch (error) {
                console.error("Error fetching anime details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeDetails();
    }, [animeId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!anime) {
        return <p>Anime not found</p>;
    }

    const { title, title_japanese, status, synopsis, trailer } = anime;

    const handleWatchlistClick = () => {
        alert('Feature not available yet');
    };

    return (
        <>
            <MyNavbar />
            <Container style={{ marginTop: '20px', color: 'white', backgroundColor: '#000000', padding: '20px', borderRadius: '5px' }}>
                <Card style={{ backgroundColor: '#1a1a1a', border: 'none' }}>
                    <Card.Body>
                        <div className="trailer-container">
                            {trailer && trailer.url ? (
                                <iframe
                                    width="75%"
                                    height="500"
                                    src={trailer.embed_url}
                                    title="Anime Trailer"
                                    allowFullScreen
                                    style={{ border: 'none', borderRadius: '5px' }}
                                ></iframe>
                            ) : (
                                <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                                    <p style={{ color: '#000' }}>Trailer not available</p>
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h1 style={{ color: 'white' }}>{title}</h1>
                                <h3 style={{ color: 'lightgray' }}>{title_japanese}</h3>
                                <p style={{ color: 'white' }}>
                                    <strong>Status:</strong> {status === "Currently Airing" ? "Ongoing" : status === "Not yet aired" ? "Upcoming" : "Finished Airing"}
                                </p>
                                <div className="mt-3">
                                    <h4 style={{ color: 'white' }}>Genres</h4>
                                    <div className="genres-box">
                                        {anime.genres.map((genre) => (
                                            <span key={genre.mal_id} className="genre-box">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="outline-primary"
                                style={{ color: 'white', borderColor: 'white' }}
                                onClick={handleWatchlistClick} // Trigger the alert on click
                            >
                                <i className="bi bi-bookmark"></i> Add to Watchlist
                            </Button>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <h4 style={{ color: 'white' }}>Synopsis</h4>
                            <p style={{ color: 'lightgray' }}>{synopsis}</p>
                        </div>
                        <ReviewSection animeId={animeId} />
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default AnimeDetailPage;
