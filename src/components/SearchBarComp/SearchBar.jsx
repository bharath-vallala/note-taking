import React,{useEffect} from 'react'
import "../../universal.css"
import"./searchBar.styles.css"
import {useSelector,useDispatch} from 'react-redux'
import {addTermAc} from "../../redux/actions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar() {





    let dispatch=useDispatch()
    let term=useSelector((state)=>{
        return state.searchTerm
    })

   // console.log(term)
        return (
        <div className="searchContainer alb">
            <FontAwesomeIcon icon={faStickyNote}  size="2x" color="#42bcf5"></FontAwesomeIcon>
            <input type="text" className="searchbox" value={term} placeholder="Search" onChange={(e)=>{
                dispatch(addTermAc(e.target.value))
            }}></input>
            <div className="primaryButton">
                <p>Search</p>
            </div>
            
        </div>
    )
}
