import React, { Component } from "react";
import axios from "axios";
import Navba from './Navba';
import bstyles from './blog.module.css';
import cup from './cup.jpg';
import { Link } from 'react-router-dom'

class Blog extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    btypes: ["","is-one-third"],
    posts: ["Hello",2,3,4,5,6,7,8,9,10,"This is last post"],
    dual : "help"
  };
}
  showIt = (elementId) => {
    var el = document.getElementById(elementId);
    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  render() {
    return (
      <div className={bstyles.blog} style={{overflow: 'Hidden'}}>
         <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&display=swap" rel="stylesheet"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <Navba></Navba>
        <div style={{height: '100%'}}>
          <section className={`hero is-fullheight`}  >
          <div className="columns is-desktop" >
            <div className="column" >
              <img src={cup} className={bstyles.head1} />
            </div>
            <div className="column">
              <h1 className={bstyles.title1}>Hello there, I'm Aziz, Welcome to my blog.</h1>
            </div>
          </div>
          <div className={`hero`} style={{paddingBottom: 30}}>

          {
            deck(this.state.posts)
          }

          </div>
          </section>  
        </div>
        <footer className="footer" style={{backgroundColor: '#00000000',color: '#ffffff', padding: '1.5%'}}>
        <div className="columns">
        <div className="column has-text-centered">
          <p style={{fontFamily: 'Nunito', fontWeight: 400, fontSize: "calc(12px + 0.4vh)" }}>
            © 2019 Aziz Stark
          </p>
        </div>
        </div>
        </footer>
      </div>
    );
  }
}

function box(wtype,title,date,index){
  return (<div className={`column is-full-touch ${wtype}`} key={index}>
    <Link to={{pathname:`blog/${title}`,data: [title,]}} style={{ color: 'inherit' }}> 
      <div className={bstyles.box} style={{backgroundImage: "linear-gradient(42.51deg, rgba(49, 49, 44, 0.397) -3.51%, rgba(17, 17, 14, 0.452) 97.42%),url('https://images.unsplash.com/photo-1577496549804-8b05f1f67338?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')"}}>
      <h1 className={bstyles.htext}>{title}</h1>
      <h1 className={bstyles.stext}>{date}</h1>
    </div></Link>
  </div>)
}

function deck(nposts){
  var sliced =[]
  var rnum = 2;
  var j = 0;
  for (var i=0; i<(nposts.length); i++){
    sliced[i] = nposts.slice(j, (j+rnum))
    j = j+rnum
    rnum = Math.floor(Math.random() * 2) + 2 ;
  }
  var dual = 0;

  function change(a){
    if(dual === 0){
      dual = dual + 1
    }
    else{
      dual = dual - 1
    }
  }

  return(
    sliced.map((user,index) =>
      <div className={`columns is-desktop ${bstyles.deck}`} key={index}>     
      {sliced[index].map((user,inde) =>
          box(((sliced[index].length === 2 && inde === dual ) ? ("is-one-third") : ("")),`I cannot look at modern buildings without thinking`,'by Janet Robertson 4 years ago',inde)
      )}
      {change(dual)}
    </div>)
  )
}

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

export default Blog;
