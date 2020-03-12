import React, { useContext } from 'react';

const Pagination = () => {
    // const { posts, settings } = useContext(stateContext);

    const nextPage = () => {};

    const previousPage = () => {};

    return (
        <div className="pagination">
            <button onClick={nextPage()} className="prev">
                previous
            </button>
            <button onClick={previousPage()} className="next">
                next
            </button>
        </div>
    );
};

export default Pagination;
