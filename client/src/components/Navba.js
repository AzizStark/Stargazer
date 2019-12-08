import React, { Component } from "react";
import Polygon from "./Polygon.svg";

class Navba extends Component {
  render() {
    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src={Polygon} width="112" height="28" alt="logo"/>
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div
            className="navbar-end"
            style={{ fontFamily: "Nunito", fontWeight: "bold" }}
          >
            <a className="navbar-item" href="/">HOME</a>

            <a className="navbar-item"  href="/">ABOUT</a>

            <a className="navbar-item"  href="/">PORTFOLIO</a>

            <a className="navbar-item"  href="/">BLOG</a>

            <a className="navbar-item"  href="/">CONTACT</a>

          </div>
        </div>
      </nav>
    );
  }
}

export default Navba;
