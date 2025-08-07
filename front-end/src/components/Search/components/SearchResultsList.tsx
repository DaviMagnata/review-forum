import React from "react";
import './SearchResultsList.css';
import Result from './Result.tsx'
const SearchResultsList = ({ results }) => {
    if (!results || results.length === 0) return [];

    return (
        <div className="results-list">
            {results.map((result, id) => (
                <div key={result.id || id} className="result-item">
                    <Result result={result}></Result>
                </div>
            ))}
        </div>
    );
};

export default SearchResultsList;