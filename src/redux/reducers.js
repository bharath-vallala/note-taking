
import {combineReducers} from "redux"


let increment=(state=0,action)=>{
    switch(action.type){
        case "increment":
           return action.payload
        case "decrement":
           return action.payload
        default :
        return state
    }

}

let searchTerm=(term="",action)=>{
    if(action.type==="ADDSEARCHTERM"){
       
        return action.payload
    }else{
        return term
    }
}

let isFilterOpen=(bool=false,action)=>{
    if(action.type==="FILTER"){
       
        return action.payload
    }else{
        return bool
    }
}

let initialSTate=[    
    {id:"2bc5b76d-49ca-4327-8440-5a4d5fa9c777",date:"2021-01-25",title:"sample note",note:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {id:"fe9961c1-d569-42bf-bf4a-a8525b74eac5",date:"2021-03-25",title:"wassuppp",note:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {id:"3c3e946a-f510-498d-b699-309193fc8eac",date:"2021-02-25",title:"ok why anothe note",note:"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham"},
    {id:"d98815d4-079e-486b-bede-cc51617d35b8",date:"2021-01-25",title:"im a random note",note:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {id:"ccb3e5e0-59de-4003-bb89-dbb917f55340",date:"2020-01-22",title:"2021 note3",note:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}

]

let notes=(state=initialSTate,action)=>{
    switch(action.type){
        case "ADDNOTE":
            return action.payload
        case "DELETENOTE":
            return action.payload
        case "EDITENOTE":
            return action.payload
        default :
           return state
    }

}

let filteredNotes=(state=[],action)=>{
    switch(action.type){
        case "ADDFILTERNOTES":
            return action.payload
        default :
           return state
    }

}


let rootReducer=combineReducers({
    counter:increment,
    searchTerm:searchTerm,
    notes:notes,
    filteredNotes:filteredNotes,
    isfilterOpen:isFilterOpen
})

export default rootReducer