import React from "react";

function SearchResultsContainer({ onRowClick, movie }) {
    return (
        <div className="results-rows" onClick={onRowClick}>
            <h3>{movie.title}</h3>
            <p>
                {movie.vote_average +
                    " Rating, " +
                    movie.release_date.split("-", 1)}
            </p>
        </div>
    );
}

export default SearchResultsContainer;