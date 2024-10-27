import '../components/styling/homepage.css';

const Pagination = ({ currentPage, totalPages, loadPage }) => {
    const handlePageClick = (page) => {
        loadPage(page);
    };

    const pageNumbers = [];
    const maxVisiblePages = 5; // Adjust this number as needed

    // Calculate the range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
    }

    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(currentPage - 1)}>
                        Previous
                    </button>
                </li>
                {pageNumbers.map((number, index) => (
                    <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        {number === '...' ? (
                            <span className="page-link">{number}</span>
                        ) : (
                            <button className="page-link" onClick={() => handlePageClick(number)}>
                                {number}
                            </button>
                        )}
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(currentPage + 1)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
