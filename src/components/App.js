import '../styles/App.scss';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import PostList from './PostList';

const stateContext = React.createContext();

const App = () => {
    const [posts, setPosts] = useState([]);
    const [settings, setSettings] = useState({ orderBy: 'hot' });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(
                `https://cors-anywhere.herokuapp.com/https://reddit.com/${settings.orderBy}.json?g=GLOBAL`
                // `https://cors-anywhere.herokuapp.com/https://reddit.com/search.json?q=gifs`
            );
            console.log(response);
            console.log(response.data.data.children);
            setPosts(response.data.data.children);
        };
        fetchData();
    }, []);

    return (
        <stateContext.Provider value={posts}>
            <div className="container">
                <PostList posts={posts} />
            </div>
        </stateContext.Provider>
    );
};

export default App;
