"use client";
import styles from './Search.module.css'
import SearchBar from "./components/SearchBar.tsx";
import { useState, useRef, useEffect } from "react";
import SearchResultsList from './components/SearchResultsList.tsx'
import Go from './components/Go.tsx'

function Search() {
    const [results, setResults] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setResults([]);  // Hide results when clicking outside
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.searchbarcontainer}>
            <div className={styles.searchInputWrapper}>
                <SearchBar setResults={setResults}/>

            </div>
            <SearchResultsList results={results}/>
        </div>
    )
}

export default Search;