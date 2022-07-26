import React from "react";
import ReactDOM from "react-dom";
import data from "/data.json";
import Autocomplete from "./Autocomplete";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHover: -1, products: Object.keys(data) };
  }
  stringData = "";
  eventHandler = (i) => {
    this.setState({ isHover: i });
  };

  eventLeaveHandler = () => {
    this.setState({ isHover: -1 });
  };

  componentDidMount = () => {
    //Converting json data into a string of required format
    //The format is Category:subcategory?products separated by +
    //Each Category is separated by $
    Object.keys(data).forEach((product) => {
      this.stringData += product + ":";
      if (Array.isArray(data[product]) && data[product].length > 0) {
        data[product].forEach((sub) => {
          console.log("sub1", sub);
          typeof sub === "object"
            ? Object.keys(sub).forEach((subproduct) => {
                this.stringData += subproduct + "?" + sub[subproduct].join("+");
              })
            : (this.stringData += sub + "+");
        });
      } else {
        this.stringData += data[product] + "+";
      }
      this.stringData += "$";
      console.log("string", this.stringData);
    });
  };

  //To display data on hover
  display = (i) => {
    return (
      <div className="subcategory">
        {this.state.products
          .filter((p, index) => index === i)
          .map((product, i) => {
            if (Array.isArray(data[product]) && data[product].length > 0) {
              return data[product].map((sub) => {
                return typeof sub === "object" ? (
                  Object.keys(sub).map((subproduct, i) => {
                    return (
                      <>
                        <h4 className="heading cursor" key={i}>
                          {subproduct}
                        </h4>
                        {sub[subproduct].map((subcat) => {
                          return <p className="items cursor">{subcat}</p>;
                        })}
                        <div></div>
                      </>
                    );
                  })
                ) : (
                  <h4 className="heading cursor">{sub}</h4>
                );
              });
            } else {
              return <h4 className="heading cursor">{data[product]}</h4>;
            }
          })}
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        {/* Typeahead search component */}
        <Autocomplete data={this.stringData} />

        <div id="container">
          <div>
            <div onMouseLeave={this.eventLeaveHandler}>
              <div className="mainNav">
                <ul className="nav">
                  {this.state.products.map((product, i) => (
                    <>
                      <li
                        className="navItems"
                        key={i}
                        onMouseEnter={() => this.eventHandler(i)}
                      >
                        {product}
                      </li>
                    </>
                  ))}
                </ul>
                {this.state.isHover !== -1 && this.display(this.state.isHover)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("container"));
