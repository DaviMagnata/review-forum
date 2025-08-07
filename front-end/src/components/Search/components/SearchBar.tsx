import React from "react"
import {FaSearch} from "react-icons/fa";
import styles from "../../Header.module.css"
import {useState} from "react";
import {listbyName} from '../../../services/MovieService.ts'
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
        <div className="input-wrapper">

            <input className={styles.searchInput}
                   value={input}
                   placeholder="Search"
            onChange={(e)=>handleChange(e.target.value)}/>

        </div>
    )
}

export default SearchBar