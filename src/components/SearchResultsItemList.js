import '../styles/SearchResultsItemList.scss';

import React from 'react';
import SearchResultsItem from './SearchResultsItem';

const SearchResultsItemList = ({ searchResults }) => {
    const renderSearchResultsItemList = () => {
        if (!searchResults) return;
        return searchResults.map((searchResult) => {
            return (
                <SearchResultsItem
                    key={searchResult.data.id}
                    searchResult={searchResult}
                />
            );
        });
    };

    return (
        <div className="search-results-item-list">{renderSearchResultsItemList()}</div>
    );
};

export default SearchResultsItemList;
