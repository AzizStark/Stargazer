import React, { Component } from "react";
import axios from "axios";
import Navba from './Navba';
import bstyles from './blog.module.css';
import renderHTML from 'react-render-html';

class view extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    title : "",
    date: "",
    tag: "",
    content: "",
    image: ""
  };
}

componentDidMount() {
  window.scrollTo(0, 0)
  this.getPosts()
}

getPosts = () => {
  const path = this.props.location.pathname
  var cid = path.slice(6,path.lastIndexOf('/'))
  axios.get('/api/viewpost',{
    params: {
      title: path.slice(7 + cid.length).replace(/-/g,' '),
      cid: cid
    }
  })
    .then(res => {
      if(res.data){
        this.setState({
          title: res.data.title,
          date: res.data.date,
          tag: res.data.tag,
          content: res.data.content,
          image: res.data.imageurl
        })
        console.log("From View: "+ this.state.image)
      }
    })
    .catch(err => console.log(err))
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
                <img src={`https://res.cloudinary.com/azizcloud/image/upload/t_equla/${(this.state.image).slice(50)}`} className={bstyles.head1} />
              </div>
              <div className="column" style={{maxWidth: '50%'}}>
              <h1 className={bstyles.title1}>{this.state.title}</h1>
              </div>
            </div>
            <div className={`column ${bstyles.postbox}`}>
                <div className="container" style={{minHeight: 400}}>
                  <div className={bstyles.contentArea} style={{backgroundColor: "#00000000"}}>
                    {renderHTML(`${this.state.content}`)}
                  </div>
                </div>
            </div>
          </section>  
        </div>
        <footer className="footer" style={{backgroundColor: '#222227',color: '#ffffff', padding: '3%'}}>
        <div className="columns">
        <div className="column has-text-centered">
          <p style={{fontFamily: 'Noto Sans', fontWeight: 400, fontSize: "calc(12px + 0.4vh)" }}>
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
