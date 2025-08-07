"use client";
import React from "react"
import styles2 from '../Search.module.css'
import styles from "../../Header.module.css"
import {useState} from "react";
import {listbyName} from '../../../services/MovieService.ts'
import Go from './Go.tsx'
export const SearchBar = ({setResults}) =>{
    const [input,setInput] = useState("")
    const fetchData = (value) => {
        const query = value.trim()
        if (query.length == 0) {
            setResults([])
        } else {

            const response = listbyName(value).then(
                (response) => {
                    console.log(response)
                    setResults(response)
                }
            )
        }
    }


    const handleChange = (value)=>{
        setInput(value)
        fetchData(value)
    }

    return(
        <div className={styles.searchInputWrapper}>
            <input className={styles.searchInput}
                   value={input}
                   placeholder="Search"
            onChange={(e)=>handleChange(e.target.value)}/>
            <Go texto={input}></Go>
        </div>
    )
}

export default SearchBar