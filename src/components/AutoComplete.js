import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { Component } from "react";
class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cursor: 0,
      searchItems: [],
    };
  }
  autocomplete = (evt) => {
    let text = evt.target.value;
    this.setState({ name: text });

    if (this.state.name.length > 0) {
      fetch(
        `https://invoiceitems.herokuapp.com/items?name_like=${text}&_limit=6`
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({ searchItems: data });
        });
    }
  };

  hanldeKeyup = (evt) => {
    //escape key event
    if (evt.keyCode === 27) {
      this.setState({ searchItems: [] });
      return false;
    }
  };

  hanldeKeydown = (evt) => {
    let text = evt.target.value;
    const { cursor, searchItems } = this.state;
    // arrow up list element
    if (evt.keyCode === 38 && cursor > 0) {
      this.setState((prevState) => ({
        cursor: prevState.cursor - 1,
      }));
    
    } 
    // arrow down list element
    else if (evt.keyCode === 40 && cursor < searchItems.length - 1) {
      this.setState((prevState) => ({
        cursor: prevState.cursor + 1,
      }));
    }
    //enter 
    if (evt.keyCode === 13) {
      let currentItem = searchItems[cursor];
      if (currentItem !== undefined) {
        const { name } = currentItem;
        this.setState({ name, searchItems: [] });
      }
    }
    //backspace
    if (evt.keyCode === 8) {
      this.setState({ name: text });
      if (this.state.name.length <= 1) {
        this.setState({ searchItems: [] });
        this.setState({ name: "" });
      }
    }
  };

  selectItem = (id) => {
    const { searchItems } = this.state;
    let selectedItem = searchItems.find((item) => item.code === id);
    const { name } = selectedItem;
    this.setState({ name });
    this.setState({ searchItems: [] });
  };


  getLocation = (_) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.showError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  showPosition(position) {
    alert(
      "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude
    );
  }
  showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div class="col-sm-5" id="col1">
          <div id="text-banner">
            <h2>Hostel Informations</h2>
            <span id="keyText">
              <q>
                We provides a easy ways to find Pg and Hostels effective costs
              </q>
            </span>
            <div class="input-group mb-1" id="loc-field">
              <Form.Control
                type="search"
                value={this.state.name}
                onChange={this.autocomplete}
                onKeyUp={this.hanldeKeyup}
                onKeyDown={this.hanldeKeydown}
                placeholder="enter a city"
              />
              <Button id="locBtn" variant="primary" type="submit">
                Search
              </Button>
            </div>
            <div class="row">
              <div class="col-10">
                {this.state.searchItems.length > 0 && (
                  <ul className="list-group">
                    {this.state.searchItems.map((item, idx) => (
                      <li
                        className={
                          this.state.cursor === idx
                            ? "active list-group-item"
                            : "list-group-item"
                        }
                        key={idx}
                        onClick={() => this.selectItem(item.code)}
                        onKeyDown={(evt) =>
                          this.handleListKeydown(evt, item.code)
                        }
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div style={{ marginTop: "25px" }}>
              <span onClick={this.getLocation}>
                <img src="/images/gps.png" width="20px" height="20px" alt="" />
                Use current Location
              </span>
            </div>
          </div>
        </div>

        <div>{<p></p>}</div>
      </React.Fragment>
    );
  }
}

export default AutoComplete;
