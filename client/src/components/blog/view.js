import React, { Component } from "react";
import axios from "axios";
import Navba from './Navba';
import bstyles from './blog.module.css';
import cup from './cup.jpg';
import renderHTML from 'react-render-html';

class view extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    btypes: ["","is-one-third"],
    posts: ["Hello",2,3,4,5,6,7,8,9,10,"This is last post"],
    dual : "help"
  };
}

componentDidMount() {
  window.scrollTo(0, 0)
}

  render() {
    const { data } = this.props.location
    return (
      <div className={bstyles.blog} style={{overflow: 'Hidden'}}>
         <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&display=swap" rel="stylesheet"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <Navba></Navba>
        <div style={{height: '100%'}}>
          <section className={`hero is-fullheight`}  >
            <div className="columns is-desktop" >
              <div className="column" >
                <img src={'https://images.unsplash.com/photo-1571217668979-f46db8864f75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'} className={bstyles.head1} />
              </div>
              <div className="column ">
              <h1 className={bstyles.title1}>{'I cannot look at modern buildings without thinking'}</h1>
              </div>
            </div>
            <div className={`column ${bstyles.postbox}`}>
                <div className="container">
                  <div style={{backgroundColor: "#00000000"}}>
                 {renderHTML(`<p><span style="color: rgb(255,255,255);background-color: rgba(34,34,39,0.604);font-size: 18.69;font-family: Noto Sans", sans-serif;">A year ago September, September of 2017, I started work on a proposal for a new book. I had started reading again, more than just my perfunctory fifteen minutes before sleep. Hearing different voices and other people’s thoughts in my head, I started to notice the way they excited me, energized me, made me want to do my own work. So, starting in September of that year, I devoted one of my workdays each week to a new book, a new project. I was embarrassed to tell people that it was another memoir. How mortifying!, how presumptuous!, working on a third memoir and I was only 39. My life has been very ordinary and continues to be: I’m a white woman who comes from and lives with privilege. I try to keep this in my sights, because it’s more important now than ever. I also try to put my head down and shut up and do the work, because the work, the act of writing, is worth it, and I am very lucky to do it. It took eight months, but in May, the proposal was ready, and I was elated to see it land at</span> <a href="https://www.abramsbooks.com/imprints/abramspress/" target="_blank"><span style="color: rgb(50,115,220);background-color: rgba(34,34,39,0.604);font-size: 18.69;font-family: Noto Sans", sans-serif;">Abrams Press</span></a><span style="color: rgb(255,255,255);background-color: rgba(34,34,39,0.604);font-size: 18.69;font-family: Noto Sans", sans-serif;">, where it will be published in 2020. As soon as I finish writing it.<br><br></span><span style="color: rgb(255,255,255);background-color: rgba(34,34,39,0.604);font-size: 60px;font-family: Noto Sans", sans-serif;"><strong><em><ins>This book is not about food!:<br></ins></em></strong></span><span style="font-size: 11px;"><br></span></p>
<img src="https://cdn-ak.f.st-hatena.com/images/fotolife/S/SugiuraAyano/20170117/20170117013049.gif" alt="undefined" style="height: auto;width: auto"/>
<p><span style="color: rgb(255,255,255);background-color: rgba(34,34,39,0.604);font-size: 18.69;font-family: Noto Sans", sans-serif;"><br>People tell me this is risky? If this is what danger looks like, I am now someone who lives for it. This book is a story about sexuality, identity, and the many ways we make the thing we call family. I don’t think I’ve ever wanted so much to write any single thing, not the way I want to write this book. I am having to learn how to write it as I go along, without the handy crutch that food and recipes had become for me. Sitting at my desk, on a good day at least, I can almost feel the neurons stretch and zing and ping, reach across a synapse, build a new bridge, connect places that weren’t connected.<br><br></span><span style="color: rgb(255,255,255);background-color: rgba(34,34,39,0.604);font-size: 18.69;font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;">People tell me this is risky? If this is what danger looks like, I am now someone who lives for it. This book is a story about sexuality, identity, and the many ways we make the thing we call family. I don’t think I’ve ever wanted so much to write any single thing, not the way I want to write this book. I am having to learn how to write it as I go along, without the handy crutch that food and recipes had become for me. Sitting at my desk, on a good day at least, I can almost feel the neurons stretch and zing and ping, reach across a synapse, build a new bridge, connect places that weren’t connected.<br><br></span><span style="color: rgb(0,0,0);background-color: rgba(34,34,39,0.604);font-size: 18.69;font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;"><code>print("hello world");<br></code></span><span style="color: rgb(255,255,255);background-color: rgba(34,34,39,0.604);font-size: 18.69;font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;">ew bri asd lksdbv sldvcjhnsd</span></p>
<p></p>
<p style="text-align:center;"><span style="color: rgb(255,255,255);background-color: rgba(34,34,39,0.604);font-size: 18.69;font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;">----------- The END -----------</span></p>
`)}
                  </div>
                </div>
            </div>
          </section>  
        </div>
        <footer className="footer" style={{backgroundColor: '#152636',color: '#ffffff', padding: '3%'}}>
        <div className="columns">
        <div className="column has-text-centered">
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



export default view;
