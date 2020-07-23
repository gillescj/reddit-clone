import { useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue === null) {
            return defaultValue;
        } else {
            return JSON.parse(storedValue);
        }
    });

    const setValueToLocalStorage = (newValue) => {
        setValue((previousValue) => {
            const localStorageValue =
                typeof newValue === 'function' ? newValue(previousValue) : newValue;
            localStorage.setItem(key, JSON.stringify(localStorageValue));
            return localStorageValue;
        });
    };

    return [value, setValueToLocalStorage];
};

export default useLocalStorage;
