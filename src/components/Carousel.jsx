import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../components/styling/carousel.css';

const AnimeCarousel = ({ anime }) => {
    return (
        <div className="carousel-container" style={{ backgroundColor: '#000000' }}>
            <Carousel interval={2000} className="custom-carousel">
                {anime.map((item) => (
                    <Carousel.Item key={item.mal_id}>
                        <Link to={`/anime/${item.mal_id}`}>
                            <div className="carousel-item-wrapper">
                                <div className="carousel-left">
                                    <img
                                        src={item.images.jpg.large_image_url}
                                        alt={item.title}
                                        className="carousel-small-image"
                                    />
                                </div>

                                <div className="carousel-right" style={{ backgroundImage: `url(${item.images.jpg.large_image_url})` }}>
                                    <div className="carousel-blur-overlay"></div>
                                </div>

                                <div className="carousel-text">
                                    <h3 className="carousel-title">{item.title}</h3>
                                    <p className="carousel-subtitle">{item.title_japanese}</p>
                                    <div className="genres-box">
                                        {item.genres.map((genre) => (
                                            <span key={genre.mal_id} className="genre-box">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default AnimeCarousel;
