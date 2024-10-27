import { useEffect, useState } from 'react';
import { getReviews, addReview, deleteReview, updateReview } from '../services/review.services';
import { getCurrentUser } from '../services/auth.service';
import { Card } from 'react-bootstrap';

const ReviewSection = ({ animeId }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            const fetchedReviews = await getReviews(animeId);

            if (currentUser) {
                fetchedReviews.sort((a, b) => (a.user_id === currentUser.uid ? -1 : b.user_id === currentUser.uid ? 1 : 0));
            }

            setReviews(fetchedReviews);
        };
        fetchReviews();
    }, [animeId, currentUser]);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            setCurrentUser(user);
        };
        fetchUser();
    }, []);

    const handleStarClick = (star) => {
        setRating(star);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            console.error("User not logged in");
            return;
        }

        const user_name = "anonymous";
        const newReview = {
            anime_id: animeId,
            review_text: reviewText,
            rating,
            user_id: currentUser.uid,
            user_name
        };

        if (isEditing) {
            await updateReview(editingReviewId, newReview);
            setIsEditing(false);
            setEditingReviewId(null);
        } else {
            await addReview(newReview);
        }

        setReviewText('');
        setRating(0);

        const fetchedReviews = await getReviews(animeId);
        fetchedReviews.sort((a, b) => (a.user_id === currentUser.uid ? -1 : (b.user_id === currentUser.uid ? 1 : 0)));
        setReviews(fetchedReviews);
    };

    const handleEdit = (review) => {
        setEditingReviewId(review.review_id);
        setReviewText(review.review_text);
        setRating(review.rating);
        setIsEditing(true);
    };

    const handleDelete = async (reviewId) => {
        await deleteReview(reviewId);
        const fetchedReviews = await getReviews(animeId);
        fetchedReviews.sort((a, b) => (a.user_id === currentUser.uid ? -1 : (b.user_id === currentUser.uid ? 1 : 0)));
        setReviews(fetchedReviews);
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: 'white' }}>Leave a Review</h3>

            <div style={{ display: 'flex', marginBottom: '10px' }}>
                {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={index}
                        onClick={() => handleStarClick(index + 1)}
                        style={{
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: index < rating ? 'gold' : 'lightgray',
                        }}
                    >
                        ★
                    </span>
                ))}
            </div>
            <textarea
                rows="4"
                cols="50"
                placeholder="Tell us why you left that rating"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                style={{ width: '100%', padding: '10px' }}
            />
            <button
                onClick={handleSubmit}
                style={{ marginTop: '10px', padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
            >
                {isEditing ? 'Update Review' : 'Submit Review'}
            </button>


            <div style={{ marginTop: '20px' }}>
                <h4 style={{ color: 'white' }}>Reviews</h4>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Card
                            key={review.review_id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                backgroundColor: 'gray',
                                color: 'white',
                                width: '100%',
                                marginBottom: '10px',
                                padding: '5px',
                                overflow: 'hidden',
                            }}
                        >
                            <Card.Body style={{ padding: '5px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h5 style={{ fontSize: '14px', color: 'white' }}>anonymous</h5>
                                    <div style={{ marginLeft: '50px' }}>
                                        {Array.from({ length: review.rating }, (_, i) => (
                                            <span key={i} style={{ color: 'gold' }}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <Card.Text style={{ fontSize: '12px', color: 'lightgray', marginTop: '5px' }}>
                                    {review.review_text}
                                </Card.Text>
                                {currentUser && currentUser.uid === review.user_id && (
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '5px' }}>
                                        <button
                                            onClick={() => handleEdit(review)}
                                            style={{
                                                backgroundColor: 'blue',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                padding: '5px 10px',
                                                fontSize: '12px',
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review.review_id)}
                                            style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                padding: '5px 10px',
                                                fontSize: '12px',
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p style={{ color: 'lightgray' }}>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
