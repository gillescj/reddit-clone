import '../styles/Pagination.scss';

import React, { useContext } from 'react';
import StateContext from './StateContext';

const Pagination = () => {
    const { pagination, setPagination } = useContext(StateContext);

    const previousPage = () => {
        if (pagination.pageNumber < 2) return;
        setPagination(previousPagination => {
            return {
                ...previousPagination,
                pageNumber: previousPagination.pageNumber - 1,
                query: `before=${previousPagination.before}`
            };
        });
    };

    const nextPage = () => {
        setPagination(previousPagination => {
            return {
                ...previousPagination,
                pageNumber: previousPagination.pageNumber + 1,
                query: `after=${previousPagination.after}`
            };
        });
    };

    return (
        <div className="pagination">
            <button onClick={previousPage} className="prev">
                previous
            </button>
            <button onClick={nextPage} className="next">
                next
            </button>
        </div>
    );
};

export default Pagination;
