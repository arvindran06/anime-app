import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyNavbar from "../components/NavBar";
import '../components/styling/search.css';

const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(false);


    const getData = async () => {
        if (!search) return;
        setLoading(true);

        try {
            const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`);
            const resData = await res.json();
            setAnimeData(resData.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
        getData();
    };

    return (
        <>
            <MyNavbar />
            <div style={{ backgroundColor: '#000000', padding: '20px' }}>
                <h1 style={{ color: 'white' }}>Search Your Anime</h1>
                <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <input
                        type="search"
                        placeholder="Search your anime"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        style={{ width: '100%', padding: '10px' }}
                    />
                    <button type="submit" style={{ padding: '10px', marginLeft: '10px', backgroundColor: '#a0522d', color: 'white', border: 'none' }}>Search</button>
                </form>

                {loading ? (
                    <p style={{ color: 'white' }}>Loading...</p>
                ) : (
                    <div className="container mt-4" style={{ padding: 0 }}>
                        <h2 style={{ color: '#FFFFFF', margin: '5px' }}>Search Results</h2>
                        <div className="row" style={{ margin: 0 }}>
                            {animeData.length > 0 ? (
                                animeData.map((item) => (
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
                                ))
                            ) : (
                                <p style={{ color: 'white' }}>No results found</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchPage;
