import React, { useContext } from 'react';
import StateContext from './StateContext';

const SearchResults = () => {
    const { searchResults } = useContext(StateContext);

    return (
        <>
            <div>SearchResults</div>
            <br />
            <div>
                {searchResults.map((result) => {
                    return <h5 key={result.data.id}>{result.data.title}</h5>;
                })}
            </div>
        </>
    );
};

export default SearchResults;
