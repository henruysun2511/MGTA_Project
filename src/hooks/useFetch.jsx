import { useEffect, useState } from "react";
import { getData } from "../services/baseService";

const useFetch = (path, query = {}, config = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            try {
                const params = new URLSearchParams();
                for (const key in query) {
                    const value = query[key];
                    if (Array.isArray(value)) {
                        value.forEach(v => params.append(key, v));
                    } else if (value !== undefined && value !== null) {
                        params.append(key, value);
                    }
                }

                const queryString = params.toString();
                // const queryString = new URLSearchParams(query).toString();
                const res = await getData(path, queryString, config);
                setData(res.data);
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        }

        fetchApi();
    }, [path, JSON.stringify(query), JSON.stringify(config)])

    return [data];
}

export default useFetch;