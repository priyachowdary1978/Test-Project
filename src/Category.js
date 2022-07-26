import React from "react";
import "./styles.css";

const Category = ({ categories, eventHandler, eventLeaveHandler }) => {
  return (
    <div id="container">
      <div>
        <div onMouseLeave={eventLeaveHandler}>
          <div className="mainNav">
            <ul className="nav">
              {categories.map((category, i) => (
                <li
                  className="navItems"
                  key={i}
                  onMouseEnter={() => this.eventHandler(i)}
                >
                  {category}
                </li>
              ))}
            </ul>
            {this.state.isHover !== -1 && this.display(this.state.isHover)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
