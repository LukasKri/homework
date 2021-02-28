import React, { useState, useEffect } from "react";
import SearchResultsContainer from "./SearchResultsContainer";

function Search() {
    const [query, setQuery] = useState("");
    // State for movies array
    const [movies, setMovies] = useState([]);

    // useEffect hook for search input updates
    useEffect(() => {
        console.log("useEffect ran");

        const url = `https://api.themoviedb.org/3/search/movie?api_key=d1540e749ccc1e07651022b415b80efe&language=en-US&query=${query}&page=1&include_adult=false`;

        const fetchData = () => {
            if (query.length < 3) {
                setMovies([]);
            } else {
                fetch(url)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error - failed to fetch.");
                        }
                        return response.json();
                    })
                    .then((movieData) => {
                        const shownMovies = movieData.results.splice(1, 8);
                        setMovies(shownMovies);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
        fetchData();
    }, [query]);

    // Input event handler (updates the state when input value changes)
    const handleChange = (e) => {
        // console.log(e.target.value);
        const value = e.target.value;
        setQuery(value);
    };

    function returnResults(movie) {
        return (
            <SearchResultsContainer
                movies={movies}
                movie={movie}
                key={movie.id}
                onRowClick={() => setQuery(movie.title)}
            />
        );
    }

    return (
        <div>
            <input
                autoComplete="off"
                type="text"
                name="query" //SITO TIKRAI REIKIA?
                placeholder="Enter movie name"
                value={query}
                onChange={handleChange}
            />
            <button type="submit">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 92 92"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M20.8 39.27c0-11.016 8.808-19.976 19.637-19.976 10.827 0 19.635 8.96 19.635 19.972 0 11.014-8.808 19.976-19.635 19.976-10.83 0-19.64-8.96-19.64-19.976zm55.472 32.037l-15.976-16.25c3.357-4.363 5.376-9.835 5.376-15.788 0-14.16-11.32-25.67-25.232-25.67-13.923 0-25.24 11.51-25.24 25.67s11.32 25.67 25.237 25.67c4.776 0 9.227-1.388 13.04-3.74L69.84 77.85c1.77 1.8 4.664 1.8 6.432 0 1.77-1.8 1.77-4.744 0-6.544z" />
                </svg>
            </button>
            <div className="results-container">{movies.map(returnResults)}</div>
        </div>
    );
}

export default Search;