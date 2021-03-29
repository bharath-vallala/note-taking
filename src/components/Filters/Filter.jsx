import React, { useState, useEffect } from 'react'
import './filter.style.css'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { addFilteredNotes, setIsfilterOpen } from '../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'


export default function Filter() {
  const [isDay, setisDay] = useState(false)
  const [isWeek, setisWeek] = useState(false)
  const [isMonth, setisMonth] = useState(false)
  const [isfound, setisfound] = useState(false)

  let notes = useSelector((state) => state.notes)
  let isFilterOpen=useSelector((state)=>state.isfilterOpen)
  console.log(notes)
  let dispatch = useDispatch()
  let filteredNotes = useSelector((state) => state.filteredNotes)

  console.log(filteredNotes)

  useEffect(() => {
    setisDay(false)
    setisWeek(false)
    setisMonth(false)
    dispatch(addFilteredNotes([]))
    dispatch(setIsfilterOpen(false))
  }, [notes])

  let filterByDays = (day) => {
    console.log(day)
    //console.log(notes[0].date)
    //console.log(new Date(notes[0].date).getFullYear())
    let tempNotes = notes.filter((note) => {
      return new Date(note.date).getFullYear() === day.getFullYear()
    })

    if (tempNotes.length > 0) {
      setisfound(true)
    } else {
      setisfound(false)
    }

    console.log(tempNotes)
    dispatch(addFilteredNotes(tempNotes))
  }

  let filterByweek = (day) => {
    console.log(moment(day).week() - 1)
    let tempNotes = notes.filter((note) => {
      if (
        moment(note.date, 'YYYY-MM-DD').week() - 1 ===
          moment(day, 'YYYY-MM-DD').week() - 1 &&
        moment(note.date, 'YYYY-MM-DD').year() ===
          moment(day, 'YYYY-MM-DD').year()
      ) {
        return note
      }
    })
    if (tempNotes.length > 0) {
      setisfound(true)
    } else {
      setisfound(false)
    }
    dispatch(addFilteredNotes(tempNotes))

    console.log(tempNotes)
  }

  let filterByMonth = (month) => {
    let tempNotes = notes.filter((note) => {
      let date = new Date(note.date)
      if (
        date.getFullYear() === month.getFullYear() &&
        date.getMonth() === month.getMonth()
      ) {
        return note
      }
    })
    if (tempNotes.length > 0) {
      setisfound(true)
    } else {
      setisfound(false)
    }
    dispatch(addFilteredNotes(tempNotes))

    console.log(tempNotes)
  }

  console.log(notes)
  return (
    <div className='flexcol'>
      <div className='flexrow'>
        <div
          className='filterButton ma'
          onClick={() => {
            setisDay(true)
            setisWeek(false)
            setisMonth(false)
            dispatch(setIsfilterOpen(true))
          }}
        >
          <FontAwesomeIcon icon={faFilter} />
        </div>
        <div>
          <div
            className={isDay ? 'filterButton active ma' : 'filterButton ma'}
            onClick={() => {
              setisDay(true)
              setisWeek(false)
              setisMonth(false)
              dispatch(setIsfilterOpen(true))
            }}
          >
            <p>Year</p>
          </div>
        </div>
        <div
          className={isWeek ? 'filterButton active ma' : 'filterButton ma'}
          onClick={() => {
            setisDay(false)
            setisWeek(true)
            setisMonth(false)
            dispatch(setIsfilterOpen(true))
          }}
        >
          <p>Week</p>
        </div>
        <div
          className={isMonth ? 'filterButton active ma' : 'filterButton ma'}
          onClick={() => {
            setisDay(false)
            setisWeek(false)
            setisMonth(true)
            dispatch(setIsfilterOpen(true))
          }}
        >
          <p>Month</p>
        </div>
        <div
          className='closeBUtton ma'
          onClick={() => {
            setisDay(false)
            setisWeek(false)
            setisMonth(false)
            dispatch(addFilteredNotes([]))
            dispatch(setIsfilterOpen(false))
          }}
        >
          <p>X</p>
        </div>
      </div>

      <div className={isDay && isFilterOpen  ? '' : 'displaynone'}>
        <DayPicker
          onDayClick={(day) => {
            filterByDays(day)
          }}
          onMonthChange={(day) => {
            filterByDays(day)
          }}
        ></DayPicker>
        <p className='warningtext'>Please Toggle Years </p>
        <p className={isfound ? 'displaynone' : 'dangertext'}>Nothing Found</p>
      </div>
      <div className={isWeek && isFilterOpen ? '' : 'displaynone'}>
        <DayPicker
        showWeekNumbers
          onWeekClick={(week,days) => {
            //filterByweek(week,days)
            //console.log(days[0])
            filterByweek(days[0])
          }}
          onDayClick={(day) => {
            filterByweek(day)
          }}
        ></DayPicker>
        <p className='warningtext'>Please Select Weeks</p>
        <p className={isfound ? 'displaynone' : 'dangertext'}>Nothing Found</p>
      </div>
      <div className={isMonth && isFilterOpen ? '' : 'displaynone'}>
        <DayPicker
          onDayClick={(day) => {
            filterByMonth(day)
          }}
          onMonthChange={(day) => {
            filterByMonth(day)
          }}
        ></DayPicker>
        <p className='warningtext'>Please Toggle months </p>
        <p className={isfound ? 'displaynone' : 'dangertext'}>Nothing Found</p>
      </div>
    </div>
  )
}
