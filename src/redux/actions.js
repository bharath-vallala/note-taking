export const incac = (counter) => {
    return {
       type: "increment",
       payload: counter
     }
 }

 export const decac=(counter)=>{
     return {
         type:"decrement",
         payload:counter
     }
 }

 export const addTermAc=(term)=>{
     return {
         type:"ADDSEARCHTERM",
         payload:term
     }
 }

 export const addNote=(note)=>{
    return {
        type:"ADDNOTE",
        payload:note
    }
}

export const addFilteredNotes=(note)=>{
    return {
        type:"ADDFILTERNOTES",
        payload:note
    }
}

export let setIsfilterOpen=(bool)=>{
    return {
        type:"FILTER",
        payload:bool
    }
}



