import React, { useState, useEffect } from 'react';

const initialForm = {
    song:"",
    artist:""
}


function SongForm({setsearchFormInputs}) {
    const [form,setForm] = useState(initialForm)    


    const handleSubmit = (e) => {
        e.preventDefault()
        setsearchFormInputs(form)
        handleReset(e)

    }

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleReset = (e) => {
        setForm(initialForm)
    }
    
    
    return ( <div>
        <h1>Formulario</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name='artist' placeholder='Type the artist' value={form.artist} onChange={handleChange} required/>
            <input type="text" name='song' placeholder='Type the song' value={form.song} onChange={handleChange} required/>
            <input type='submit' value="Ok"/>
        </form>
    </div> );
}

export default SongForm;