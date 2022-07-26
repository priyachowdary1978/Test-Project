import React from "react";
const Suggestions = ({ suggestions, suggestionIndex, handleClick }) => {
  return (
    <ul className="suggestions">
      {suggestions.map((suggestion, index) => {
        return (
          <li
            className={index === suggestionIndex ? "active cursor" : ""}
            key={index}
            onClick={handleClick}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  );
};

export default Suggestions;
