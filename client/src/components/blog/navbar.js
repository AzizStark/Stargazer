import React, { Component } from "react";
import bstyles from './blog.module.css';
import polygon from './Polygon.svg'

class Navba extends Component {

  showIt = (elementId,e) =>{
    e.preventDefault()
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
          <a className="navbar-item" href="# " >
            <img src={polygon} width="90" height="60" alt="logo" />
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            href='# '
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
            <a className="navbar-item" id={bstyles.navbarItem} href="/blog">Home</a>

            <a className="navbar-item" id={bstyles.navbarItem} href="/" >About</a>
            
            <a className="navbar-item"  id={bstyles.navbarItem} href="/contact">Contact</a>

          </div>
        </div>
      </nav>
    );
  }
}

export default Navba;
