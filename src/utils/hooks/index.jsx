import { useState, useEffect } from 'react';
import getCookie from '../../components/Auth/AuthProvider.jsx'

export default function useFetch(url) {

    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return

        setLoading(true)
        async function fetchData() {
            try {
                let bearer = 'Bearer ' + getCookie('authToken')
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization' : bearer
                    }
                })
                const data = await response.json()
                setData(data)
            } catch (err) {
                console.log(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [url])

    return { isLoading, data, error }
}
