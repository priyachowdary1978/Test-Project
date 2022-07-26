import React, { useState } from "react";
import Suggestions from "./Suggestions";
import "./styles.css";

const AutoComplete = ({ data }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    data = data.split("$");
    const query = e.target.value.toLowerCase();
    setValue(e.target.value);

    if (query.length > 1) {
      let filterSuggestions = data.filter(
        (suggestion) => suggestion.toLowerCase().indexOf(query) > -1
      );

      let finalSuggestions = [];
      filterSuggestions.forEach((filterSuggestion) => {
        let catSugg = filterSuggestion.split(":");
        let subCatSugg = catSugg[1].split("?");
        let subSugg = subCatSugg[1].split("+");
        let categories = [catSugg[0], subCatSugg[0], ...subSugg];
        for (let i in categories) {
          let suggestion = categories[i];
          if (suggestion.toLowerCase().indexOf(query) > -1) {
            finalSuggestions.push(suggestion);
          }
        }
      });

      setSuggestions(finalSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setSuggestionsActive(false);
  };
  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  return (
    <div className="autocompleteContainer">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for products, brands and more"
        title="Search for products, brands and more"
        className="autocomplete"
      />
      {suggestionsActive && (
        <Suggestions
          suggestions={suggestions}
          suggestionIndex={suggestionIndex}
          handleClick={handleClick}
        />
      )}
    </div>
  );
};

export default AutoComplete;
