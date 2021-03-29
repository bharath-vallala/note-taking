import React, { useEffect, useState } from 'react'
import './NotesList.style.css'
import { useSelector, useDispatch } from 'react-redux'
import Fuse from 'fuse.js'
import DayPicker from 'react-day-picker'
import Filter from '../Filters/Filter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import 'react-day-picker/lib/style.css'
import { useHistory } from 'react-router-dom'
import { addNote ,setIsfilterOpen} from '../../redux/actions'

export default function NotesListComp() {

  let notes = useSelector((state) => state.notes)
  let filteredNotes = useSelector((state) => state.filteredNotes)
  let isFilter = useSelector((state) => state.isfilterOpen)

  let history = useHistory()
  let dispatch = useDispatch()

  console.log(isFilter)

  const [currentNotes, setcurrentNotes] = useState(notes)
  const [isSortByNew, setisSortByNew] = useState(true)

  let newtoOld = [...notes].sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date)
  })

  let oldtoNew = [...notes].sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date) - new Date(b.date)
  })

  useEffect(() => {
    console.log(filteredNotes)

    setcurrentNotes(filteredNotes)
    if (!isFilter && isSortByNew) {
      console.log(newtoOld)
      setcurrentNotes(newtoOld)
    }else if(!isFilter && !isSortByNew){
      console.log(oldtoNew)
      setcurrentNotes(oldtoNew)
    }
  }, [filteredNotes, notes,isSortByNew])

  // console.log(newtoOld)
  // console.log(notes)
  let term = useSelector((state) => {
    return state.searchTerm
  })
  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ['title', 'note', 'date'],
  }

  const fuse = new Fuse(notes, options)

  const result = fuse.search(term)

  let deleteNote = (element) => {
    let index = notes.findIndex((e) => {
      return e.id === element.id
    })

    let temp = [...notes]
    temp.splice(index, 1)
    console.log(temp)
    dispatch(addNote(temp))
  }

  let card = (element) => {
    
    return (
      <div className='card mart2 grid-item box' key={element.id}>
        <div className='flexcol alb' style={{ width: '100%' }}>
          <p className='dimheading'> {element.date} </p>
          <p className='bigheading'>{element.title}</p>
          <p className='subheadingm'> {`${element.note.slice(0, 60)}...`}</p>
        </div>

        <div className='flexrow mart1' style={{justifyContent:"space-between",width:"80%"}}>
          <div
            className='secondaryButton mar1'
            onClick={() => {
              history.push({ 
                pathname: '/addnotes', 
                state: {editNote:element} 
            })
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
          </div>
          <div
            className='secondaryButton'
            onClick={() => {
              deleteNote(element)
            }}
          >
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </div>
        </div>
      </div>
    )
  }

  let cardsRender = () => {
    if (term === '') {
      return currentNotes.map((element) => {
        return card(element)
      })
    } else if (result.length > 0) {
      console.log(result)
      return result.map((element) => {
        return card(element.item)
      })
    } else {
      return <p className='dangertext'>nothing found</p>
    }
  }


  return (
    <div className='flexcol'>
      <Filter></Filter>
      <div className="attachedtoggle">
        <div className={isSortByNew ? "toggle activetoggle" : "toggle"} onClick={()=>{
          setisSortByNew(true)
          dispatch(setIsfilterOpen(false))
        }}>
          <p>Sort by new</p>

        </div>
        <div className={isSortByNew ? "toggle" : "toggle activetoggle"} onClick={()=>{
          setisSortByNew(false)
          dispatch(setIsfilterOpen(false))
        }}>
        <p>Sort by old</p>
        </div>
        
      </div>
      
      
      <div className='grid-container'>
        <div
          className='card mart2 grid-item addCard'
          onClick={() => {
            history.push('addnotes')
          }}
        >
          <p>Add new notes</p>
        </div>
        {cardsRender()}
      </div>
    </div>
  )
}
