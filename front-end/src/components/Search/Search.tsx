import styles from './Search.module.css'
import SearchBar from "./components/SearchBar.tsx";
import {useState} from "react";
import SearchResultsList from './components/SearchResultsList.tsx'

function Search(){
    const [results,setResults] = useState([])

    return(
        <div>
            <div className={styles.searchbarcontainer}>
                <div>
                    <SearchBar setResults={setResults}/>
                </div>
                <div>
                    <SearchResultsList results={results}></SearchResultsList>
                </div>
            </div>
        </div>
    )
}

export default Search