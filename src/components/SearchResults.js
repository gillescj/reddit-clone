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

    const emptySearchResults = (
        <div className="search-results-empty">
            <header>No Subreddits Found!</header>
            <p>
                We couldn't find any subreddits. Please try searching something different.
            </p>
        </div>
    );

    return (
        <>
            {!searchResults ? null : (
                <div className="search-results">
                    {searchResults.length === 0 ? (
                        emptySearchResults
                    ) : (
                        <>
                            <h1>Subreddit Search Results</h1>
                            <SearchResultsItemList searchResults={searchResults} />
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchResults;
