import '../styles/SearchResultsItem.scss';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import globeSVG from '../assets/svgs/globe.svg';
import showdown from 'showdown';
import ReactHtmlParser from 'react-html-parser';
import numeral from 'numeral';
import StateContext from './StateContext';

const SearchResultsItem = ({ searchResult }) => {
    const { setPagination } = useContext(StateContext);
    const converter = new showdown.Converter();

    const formatNumber = (number) => {
        return Math.abs(number) > 999 ? numeral(number).format('0.0a') : number;
    };

    const resetPagination = () => {
        setPagination((previousPagination) => {
            return {
                ...previousPagination,
                pageNumber: 1,
                query: '',
            };
        });
    };

    const onImageError = (event) => {
        event.target.src = globeSVG;
    };

    const renderIcon = () => {
        if (searchResult.data.icon_img) {
            return (
                <img
                    src={searchResult.data.icon_img}
                    alt={searchResult.data.display_name_prefixed}
                    onError={(event) => onImageError(event)}
                />
            );
        } else {
            return (
                <img
                    src={globeSVG}
                    alt={searchResult.data.display_name_prefixed}
                    onError={(event) => onImageError(event)}
                />
            );
        }
    };

    return (
        <div className="search-results-item">
            <Link
                to={{
                    pathname: `/r/${searchResult.data.display_name}`.toLowerCase(),
                }}
                className="search-item-subreddit-link"
                onClick={() => resetPagination()}
            >
                <div className="search-item-top">
                    {renderIcon()}
                    <div class="search-item-top-right">
                        <div className="search-item-display-name-prefixed">
                            {searchResult.data.display_name_prefixed.toLowerCase()}
                        </div>
                        <div className="search-item-title">
                            {ReactHtmlParser(converter.makeHtml(searchResult.data.title))}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="search-item-middle">
                <div className="search-item-information">
                    <div className="search-item-public-description">
                        {ReactHtmlParser(
                            converter.makeHtml(searchResult.data.public_description)
                        )}
                    </div>
                </div>
            </div>
            <div className="search-item-bottom">
                <div class="search-item-members">
                    {formatNumber(searchResult.data.subscribers)} Members
                </div>
            </div>
        </div>
    );
};

export default SearchResultsItem;
