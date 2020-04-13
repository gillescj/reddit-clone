import '../styles/ThemeToggle.scss';

import React, { useState } from 'react';
import { ReactComponent as MoonSVG } from '../assets/svgs/moon.svg';
import { ReactComponent as SunSVG } from '../assets/svgs/sun.svg';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');

    const handleThemeToggleClick = () => {
        setTheme((previousTheme) => {
            return previousTheme === 'light' ? 'dark' : 'light';
        });
    };

    return (
        <div className="theme-toggle">
            <div className="theme-toggle-button" onClick={() => handleThemeToggleClick()}>
                {theme === 'light' ? <MoonSVG /> : <SunSVG />}
            </div>
        </div>
    );
};

export default ThemeToggle;
