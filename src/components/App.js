import '../styles/App.scss';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import StateContext from './StateContext';

// const stateContext = React.createContext();

const App = () => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        before: null,
        after: null
    });
    const [settings, setSettings] = useState({ orderBy: 'hot' });

    useEffect(() => {
        console.log(pagination.pageNumber);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            const response = await axios(
                `https://cors-anywhere.herokuapp.com/https://reddit.com/${
                    settings.orderBy
                }.json?limit=5&before=${
                    pagination.before ? pagination.before : ''
                }&after=${pagination.after ? pagination.after : ''}&g=GLOBAL`
                // `https://cors-anywhere.herokuapp.com/https://reddit.com/search.json?q=gifs`
            );
            console.log(response);
            console.log(response.data.data.children);
            setPosts(response.data.data.children);
            const { before, after } = response.data.data;
            console.log(before, after);
            setPagination(previousPagination => {
                return { ...previousPagination, before, after };
            });
        };
        fetchData();
    }, [pagination.pageNumber]);

    return (
        <StateContext.Provider
            value={{ posts, setPosts, pagination, setPagination, settings, setSettings }}
        >
            <div className="container">
                <PostList />
            </div>
        </StateContext.Provider>
    );
};

export default App;
