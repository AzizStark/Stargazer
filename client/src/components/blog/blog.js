import React, { Component } from "react";
import axios from "axios";
import Navba from './Navba';
import bstyles from './blog.module.css';
import cup from './cup.jpg';

class Blog extends Component {

  showIt = (elementId) => {
    var el = document.getElementById(elementId);
    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  render() {
    return (
      <div className={bstyles.blog} style={{overflow: 'Hidden'}}>
        <head>
         <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&display=swap" rel="stylesheet"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </head>
        <Navba></Navba>
        <body style={{height: '100%'}}>
          <section  id="portfolio" className={`hero is-fullheight`} >
          <div class="columns">
            <div class="column" >
              <img src={cup} className={bstyles.head1} />
            </div>
            <div class="column" style={{padding: 0}}>
              <h1 className={bstyles.title1}>Hello there, I'm Aziz, Welcome to my blog.</h1>
            </div>
          </div>
          </section>  
        </body>
        <footer className="footer" style={{backgroundColor: '#152636',color: '#ffffff', padding: '3%'}}>
        <div className="columns">
        <div class="column has-text-centered">
          <p style={{fontFamily: 'Nunito', fontWeight: 400, fontSize: "calc(12px + 0.4vh)" }}>
            Content & Graphics © 2020 Aziz Stark
          </p>
        </div>
        </div>
        </footer>
      </div>
    );
  }
}

export default Blog;
