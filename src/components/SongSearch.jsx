import React, { useState, useEffect } from 'react';
import SongForm from './SongForm';
import SongDetails from './SongDetails';
import MyFetch from '../helpers/fetchHook';
import Loader from './Loader';
function SongSearch() {
    const [Artist,setArtist] = useState(null)
    const [Song,setSong] = useState(null)
    const [searchFormInputs,setsearchFormInputs] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        if (searchFormInputs === null) return;
        //codigo fetch para ejecutar peticiones
        
        const peticionFetch =() => {
            const ArtistFetch = MyFetch().get(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${searchFormInputs.artist.toLowerCase()}`)
            const SongFetch = MyFetch().get(`https://private-anon-93780faed2-lyricsovh.apiary-mock.com/v1/${searchFormInputs.artist.toLowerCase()}/${searchFormInputs.song.toLowerCase()}`)
            
            Promise.all([ArtistFetch,SongFetch])
            .then((response) => {
                setLoading(false)
                let keys_artist = Object.keys(JSON.parse(JSON.stringify(response[0]))).length
                let keys_lyrics = Object.keys(JSON.parse(JSON.stringify(response[1]))).length
                setArtist(keys_artist && response[0].artists[0] || {error:true,message:"The Artist doesn't exist or the server is down, please contact us for more information"});
                setSong(keys_lyrics && response[1].lyrics || {error:true, message:"The song doesn't exist or the server is down, please contact us for more information"})
            })
            
        }
        setLoading(true)
        peticionFetch()

    },[searchFormInputs])

    return ( <>
        <h1>Buscador de canciones</h1>
        <SongForm setsearchFormInputs={setsearchFormInputs}/>
        {loading && <Loader/>}
        {searchFormInputs && !loading && (<SongDetails Artist={Artist} Song={Song} title={searchFormInputs}/>)}
    </> );
}

export default SongSearch;