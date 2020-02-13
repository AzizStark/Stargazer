import React, { Component } from "react";
import cstyles from './home.module.css';
 
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
      >
        <div className="navbar-brand">
          <a className="navbar-item" id={cstyles.navbarItem} href="# " >
            <img src={"https://res.cloudinary.com/azizcloud/image/upload/v1581064953/portfolio/x6fzis0xbyyodmd8sq7p.svg"} width="90" height="60" alt="logo" />
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            href="# "
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
            <a className="navbar-item" id={cstyles.navbarItem} href="/">HOME</a>

            <a className="navbar-item" id={cstyles.navbarItem} href="# " onClick={(e) => this.showIt('portfolio',e)}>PORTFOLIO</a>

            <a className="navbar-item" id={cstyles.navbarItem} href="/blog">BLOG</a>

            <a className="navbar-item" id={cstyles.navbarItem} href="# " onClick={(e) => this.showIt('about',e)}>ABOUT</a>
            
            <a className="navbar-item" id={cstyles.navbarItem} href="# " onClick={(e) => this.showIt('contact',e)}>CONTACT</a>

          </div>
        </div>
      </nav>
    );
  }
}

export default Navba;
