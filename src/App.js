import React, { useState } from "react";
import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import "./App.css";
import AutoComplete from "./components/AutoComplete";
function App() {
  let [text, setText] = useState("");
  let [flag, setflag] = useState(true);

  function handleFocusEvent() {
    setflag(false);
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/#">
          <img
            src="/images/hostel.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          <span style={{ marginLeft: "10px" }}>Hostel</span>
        </a>
      </nav>
      <div class="row" id="row">
        <AutoComplete/>
        <div class="col-sm-7" id="col2">
          <img class="img-fluid" src="/images/person.png" />
        </div>
      </div>
    </div>
  );
}

export default App;
