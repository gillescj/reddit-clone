import '../styles/SearchResults.scss';

import React, { useContext, useEffect } from 'react';
import StateContext from './StateContext';
import { useParams } from 'react-router-dom';
import SearchResultsItemList from './SearchResultsItemList';

const SearchResults = () => {
    const { searchResults, searchQuery, setSearchQuery } = useContext(StateContext);
    const { searchString } = useParams();

    useEffect(() => {
        if (!searchQuery) {
            setSearchQuery(searchString);
        }
    }, [searchQuery, searchString, setSearchQuery]);

    return (
        <>
            {!searchResults ? null : (
                <div className="search-results">
                    <h1>Subreddit Search Results</h1>
                    <SearchResultsItemList searchResults={searchResults} />
                </div>
            )}
        </>
    );
};

export default SearchResults;
