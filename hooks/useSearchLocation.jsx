import {
    useState,
} from 'react'


import {GOOGLE_MAP_API_KEY} from "@env"

const useSearchLocation = () => {
    const [results, setResults] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const [failed, setFailed] = useState(false)

    
    const getAutoCompletePlaces = async (text) => {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_MAP_API_KEY}`

        setIsloading(true)

        try{
            const res = await fetch(url)

            console.log("fetched")
    
            if(!res.ok) {
                setIsloading(false)
                setFailed(true)
                return
            }
        
            const data = await res.json()
    
            setResults(data.predictions)
            setIsloading(false)

        }catch(e){
            setFailed(true)
            console.log("error")
        }
    }

    return {results, isLoading, failed, getAutoCompletePlaces }
}

export default useSearchLocation