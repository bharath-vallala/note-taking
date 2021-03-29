import React,{useState,useEffect} from 'react'
import "./styles/addNotes.styles.css"
import {useSelector,useDispatch} from 'react-redux'
import {addNote} from '../redux/actions'
import { useHistory } from "react-router-dom";
import { uuid } from 'uuidv4';



export default function AddNotes(props) {

 
  


  let allNotes=useSelector((state)=>state.notes)
  let history = useHistory();

  //console.log(props.location.state)

  const [date, setdate] = useState("")
  const [title, settitle] = useState("")
  const [note, setnote] = useState("")
  const [isEdit, setisEdit] = useState(false)
  const [editNote, seteditNote] = useState(null)

  let dispatch=useDispatch()



  useEffect(() => {
   if(props.location.state && props.location.state.editNote){
     setisEdit(true)
     seteditNote(props.location.state.editNote)
     setdate(props.location.state.editNote.date)
     settitle(props.location.state.editNote.title)
     setnote(props.location.state.editNote.note)
   }
  }, [props.location.state])

  

  let updateNotes=()=>{
    if(isEdit && editNote !==null){

      let currentNote={
        id:editNote.id,
        date:date,
        title:title,
        note:note
      }
      let index=allNotes.findIndex((note)=>{
        return note.id===editNote.id
      })
      console.log(index)
      let temp=[...allNotes]
      temp[index]=currentNote
      
      dispatch(addNote(temp))
      history.push("/")


    }else{
    if(date && title && note){
      let currentNote={
        id:uuid(),
        date:date,
        title:title,
        note:note
      }
      let temp=[...allNotes]
      temp.push(currentNote)
      dispatch(addNote(temp))
      history.push("/")
    }
  }
   
  }

    return (
        <div className="flexcol alb ">
          <p className="bigheading" style={{marginTop:"1rem"}}>{isEdit  ? "Edit" : "Add"} a note</p>
          <div className="flexcol box alb">
            
            <input className="datepick"  type="date" value={date} id="date"  onChange={(e)=>{
             setdate(e.target.value)
           //  console.log(date)
            }}></input>
            <input  type="text" className="titleinput" value={title} placeholder="Title" onChange={(e)=>{
             settitle(e.target.value)
         //    console.log(title)
            }}></input>
            
            <textarea className="notebox" value={note} placeholder="type Here"onChange={(e)=>{
             setnote(e.target.value)
           //  console.log(note)
            }}></textarea>
            
          </div>
          <div className="primaryButton" style={{width:"100%"}} onClick={updateNotes}>
              <p>{"SAVE"}</p>
            </div>
          
    
        </div>
    )
}
