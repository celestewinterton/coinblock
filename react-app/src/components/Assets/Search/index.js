import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {useHistory} from "react-router-dom"


function Search({coins}) {
    const history = useHistory()

    const formatResult = (item) => {
        return (
            <div className="search-results-container row">
                <div>{item.name}</div>
                <div>{item.symbol.toUpperCase()}</div>
            </div>
        );
    };

    const handleOnSelect = (item) => {
        history.push(`/${item.apiId}`)
    };


    return (
        <div className="padded">
            <ReactSearchAutocomplete
                items={coins}
                fuseOptions={{ keys: ["name", "symbol"] }} // Search on both fields
                resultStringKeyName="name" // String to display in the results
                placeholder={'Search all assets'}
                formatResult={formatResult}
                onSelect={handleOnSelect}
                styling={{
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    border: ".8px solid rgba(91, 97, 110, 0.2)",
                    color: "#d1d2d3",
                    boxShadow: "none",
                    hoverBackgroundColor: "transparent",
                    clearIconMargin: "3px 8px 0 0",
                    height: "38px",
                    maxWidth: "300px",
                    margin: "20px",
                    iconColor: "rgba(91, 97, 110, 0.2)",
                    fontSize: ".8rem",
                }}
            />
        </div>
    );
}

export default Search;
