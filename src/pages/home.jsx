import React from 'react'
import SearchBar from "../components/SearchBarComp/SearchBar"
import Cards from  "../components/NotesList/NotesListComp"
export default function home() {
    return (
        <div className="flexcol" style={{width:"100%"}}>
            <SearchBar></SearchBar>
            <Cards></Cards>
        </div>
    )
}
