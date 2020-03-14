import '../styles/Pagination.scss';

import React, { useContext } from 'react';
import StateContext from './StateContext';

const Pagination = () => {
    const { setPagination } = useContext(StateContext);

    const previousPage = () => {
        setPagination(previousPagination => {
            return {
                ...previousPagination,
                pageNumber:
                    previousPagination.pageNumber === 1
                        ? 1
                        : previousPagination.pageNumber - 1
            };
        });
    };

    const nextPage = () => {
        setPagination(previousPagination => {
            return {
                ...previousPagination,
                pageNumber: previousPagination.pageNumber + 1
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
