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
    posts: [],
    pivot: 0,
  };
}
  showIt = (elementId) => {
    var el = document.getElementById(elementId);
    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  componentDidMount(){
    this.getPosts()
  }

getPosts = () => {
  axios.get('/api/postitles',{
    params: {
      skip: this.state.pivot,
      limit: 3
    }
  })
    .then(res => {
      if(res.data){
        res.data.reverse();
        this.setState({
          posts: this.state.posts.concat(res.data),
          pivot: this.state.pivot + 3
        })
      }
    })
    .catch(err => console.log(err))
}

loadMore = () => {
  this.getPosts()
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
              <img alt="header" src={cup} className={bstyles.head1} />
            </div>
            <div className="column">
              <h1 className={bstyles.title1}>Site Under Construction...</h1>
            </div>
          </div>
          <div className="hero" style={{paddingBottom: 30}}>

          {
            deck(this.state.posts)
          }

          </div>
          </section>  
        </div>
        <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'center',height: 60}} >
          <center ><div title="Load more" className={bstyles.loader} onClick={() => this.loadMore()}></div></center>
        </div>
        <footer className="footer" style={{backgroundColor: '#222227',color: '#ffffff', padding: '1.5%',paddingTop: '10%'}}>
          <div className="columns">
            <div className="column has-text-centered">
              <p style={{fontFamily: 'Noto Sans', fontWeight: 400, fontSize: "calc(12px + 0.4vh)",color: '#969696' }}>
                © 2020 AzizStark
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

function box(wtype,title,cid,date,index,image,tag){
  return (<div className={`column is-full-touch ${bstyles.wrapper} ${wtype}`} key={index}>
    <Link to={{pathname:`blog/${cid}/${title.replace(/ /g,"-")}`}} style={{ color: 'inherit' }}> 
      <div className={bstyles.box} style={{backgroundImage: `linear-gradient(42.51deg, rgba(49, 49, 44, 0.297) -3.51%, rgba(17, 17, 14, 0.452) 97.42%),url(https://res.cloudinary.com/azizcloud/image/upload/t_tiles/${image.slice(50)})`}}>
      <h1 className={bstyles.htext}>{title}</h1>
      <br/>
      <h1 className={bstyles.stext}>{date}</h1>
      <h1 className={bstyles.tag}>{tag}</h1>
    </div></Link>
  </div>)
}

function deck(nposts){
  console.log("duc")
  var sliced =[]
  var rnum = 2;
  var j = 0;
  for (var i=0; i<(nposts.length); i++){
    sliced[i] = nposts.slice(j, (j + rnum))
    j = j + rnum
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
          box(((sliced[index].length === 2 && inde === dual ) ? ("is-one-third") : (sliced[index].length === 2 ? ("is-two-thirds") : (sliced[index].length === 3 ? ("is-one-third") : ("")))),sliced[index][inde].title,sliced[index][inde].cid,sliced[index][inde].date,inde,sliced[index][inde].imageurl, sliced[index][inde].tag)
      )}
      {change(dual)}
    </div>)
  )
}



export default Blog;
