import React, { Component } from "react";
import Polygon from "./Polygon.png";
import { } from '@fortawesome/free-brands-svg-icons'

 
class Navba extends Component {

  showIt = (elementId) =>{
    var el = document.getElementById(elementId);
    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }


  render() {
    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="#" >
            <img src={Polygon} width="90" height="60" alt="logo" />
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

            <a className="navbar-item"  onClick={() => this.showIt('portfolio')}>PORTFOLIO</a>

            <a className="navbar-item"  href="/blog">BLOG</a>

            <a className="navbar-item" onClick={() => this.showIt('about')}>ABOUT</a>
            
            <a className="navbar-item"  onClick={() => this.showIt('contact')}>CONTACT</a>

          </div>
        </div>
      </nav>
    );
  }
}

export default Navba;
