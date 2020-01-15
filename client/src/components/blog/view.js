import React, { Component } from "react";
import axios from "axios";
import Navba from './Navba';
import bstyles from './blog.module.css';
import renderHTML from 'react-render-html';

class view extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    btypes: ["","is-one-third"],
    posts: ["Hello",2,3,4,5,6,7,8,9,10,"This is last post"],
    dual : "help",
    todos : " ",
    title : "Sample"
  };
}

componentDidMount() {
  window.scrollTo(0, 0)
}

getPosts = () => {
  axios.get('/api/posts')
    .then(res => {
      if(res.data){
        this.setState({
          todos: res.data
        })
        console.log("From View: "+ this.state.todos[1].title)
      }
    })
    .catch(err => console.log(err))
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
                <div className="container" style={{minHeight: 400}}>
                  <div style={{backgroundColor: "#00000000"}}>
                 {renderHTML(`<p> Hrlo </p>`)}
                  </div>
                  <button onClick={this.getPosts}>{window.location.pathname}</button>
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
