import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAxios = url => {
    const [axiosData, setAxiosData] = useState();
    const [axiosLoading, setAxiosLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // setData(null);
            // setLoading(true);

            const response = await axios(url);
            console.log(response);

            setAxiosData(response.data);
            setAxiosLoading(false);
        };
        fetchData();
    }, [url]);

    console.log(axiosData);
    return { axiosData, axiosLoading };
};
