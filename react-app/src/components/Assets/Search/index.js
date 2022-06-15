import React from "react";
import { useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from "react-search-autocomplete";


function Search({ members, setMembers }) {
    const users = useSelector(state => state.users)
    const usersArr = Object.values(users)


    const formatResult = (item) => {
        return (
            <div className="search-results-container">
                <img src="" alt=""></img>
                <div>Search Results</div>
            </div>
        );
    };

    return (
        <div>Search Bar
            {/* <ReactSearchAutocomplete
                items={usersArr}
                fuseOptions={{ keys: ["username"] }} // Search on both fields
                resultStringKeyName="username" // String to display in the results
                showIcon={false}
                placeholder={'Find members'}
                onSelect={handleOnSelect}
                styling={{
                    borderRadius: "5px",
                    backgroundColor: "#1a1d21",
                    border: "2px solid #d1d2d3",
                    color: "#d1d2d3",
                    boxShadow: "none",
                    hoverBackgroundColor: "steelblue",
                    clearIconMargin: "3px 8px 0 0",
                    zIndex: 5000,
                    height: "38px",

                }}
            /> */}
        </div>
    );
}

export default Search;
