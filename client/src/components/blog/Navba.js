import React, { Component } from "react";
import Polygon from "./Polygon.svg";
import { } from '@fortawesome/free-brands-svg-icons'
import bstyles from './blog.module.css';
 
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
        style={{backgroundColor: "#00000000"}}
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
            className="navbar-end" style={{fontWeight: 'bold'}}
          >
            <a className="navbar-item" id={bstyles.navbarItem} href="/">Home</a>

            <a className="navbar-item"  id={bstyles.navbarItem} onClick={() => this.showIt('portfolio')}>Portfolio</a>

            <a className="navbar-item" id={bstyles.navbarItem} href="/">Blog</a>

            <a className="navbar-item" id={bstyles.navbarItem} onClick={() => this.showIt('about')}>About</a>
            
            <a className="navbar-item"  id={bstyles.navbarItem} onClick={() => this.showIt('contact')}>Contact</a>

          </div>
        </div>
      </nav>
    );
  }
}

export default Navba;
