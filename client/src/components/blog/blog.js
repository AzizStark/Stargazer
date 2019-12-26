import React, { Component } from "react";
import axios from "axios";
import Navba from './Navba';

class Blog extends Component {


  showIt = (elementId) => {
    var el = document.getElementById(elementId);
    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  render() {
    require("./blog.css"); 
    return (
      <div className="blog" style={{overflow: 'Hidden'}} >
        <head>
         <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&display=swap" rel="stylesheet"/>
        </head>
        <Navba></Navba>
        <body style={{height: '100%'}}>
        <div class="container" style={{width: '100%'}}>
          Under Construction
        </div>
        </body>
        <footer class="footer" style={{backgroundColor: '#152636',color: '#ffffff', padding: '3%'}}>
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




const styles = {
  input: {backgroundColor: '#0B1826', borderColor: '#2EA7FF', color: '#FFFFFF'},
  icon: {padding: 6},
  bcolor: {color: '#2EA7FF'}
}

export default Blog;
