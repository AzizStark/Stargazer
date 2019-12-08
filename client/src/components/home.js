import React, { Component } from "react";
import axios from "axios";
import Navba from './Navba';
import './bulma.css';
import './imagehover.min.css';
import './home.css';
import './toggle.js';
import leaf1 from './plato.svg';
import leaf2 from './plate.svg';
import Head from './header.png';
import img1 from './img1.png';



class Home extends Component {
  state = {
    todos: ["asd"]
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    axios
      .get("/api/aziz")
      .then(res => {
        if (res.data) {
          this.setState({
            todos: res.data
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div style={{overflow: 'Hidden'}}>
          <meta charSet="utf-8"></meta>
          <link href="https://fonts.googleapis.com/css?family=Comfortaa:300,400,500,600,700|Nunito:200,300,400,400i,600,700&display=swap" rel="stylesheet"></link>
          <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          
          <section className="hero is-link is-fullheight" style={{backgroundImage: `url(${Head})`, backgroundSize: 'cover'}}>
          <Navba></Navba>
            <div className="hero-body" >
          
              <div className="container"  style={{marginLeft: '3vw'}}>
            
                <p className="title">
                HELLO, <br></br>
                I AM <span className="blue">AZIZ</span>.
                </p>
                <p className="subheading">An aspiring developer and designer.</p>
                <br />
                <button className="button custombtn is-rounded " >EXPLORE</button>
              </div>
              
              <div className="cardss">
                  <img  className="floating" style={{position: 'absolute',  zIndex:2, margin: 0,}} src={leaf1}  />
                  <img  style={{position: 'absolute',  zIndex:1, }} src={leaf2}   />
              </div>
             
            </div>
          </section>
         
          <section className="hero is-link is-fullheight hero2" >
          {herobar('Portfolio')}
            <div className="columns ">
              <div className="column is-half" style={{padding:24}}>
                  <div className="imghvr-blur" style={{display:'block',backgroundColor: "#00000000"}}>
                      <img src={img1} style={{width:'100%'}} title="hover text" />
                      <figcaption>
                        <p className="title" style={{fontSize: "calc(12px + 1vw)", fontWeight: "500"}}>
                           MY FIRST PROJECT 
                        </p><br/>
                        <p className="subheading" style={{fontSize: "calc(12px + 0.5vw)", fontWeight: "500"}}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                      </figcaption>
                  </div>
              </div>

              <div className="column is-half" style={{padding:24}}>
                  <div >
                        <div className="imghvr-blur" style={{width: '49%',marginRight: '1%'}}>
                            <img  src={img1}  />
                            <figcaption>
                                Helo
                            </figcaption>
                        </div>
                        <div className="imghvr-blur" style={{ width: '49%', marginLeft: '1%'}}>
                            <img  src={img1} />
                            <figcaption>
                                Helo
                            </figcaption>
                        </div>
                    </div>
                    <div style={{marginTop:"1%"}}>
                        <div className="imghvr-blur" style={{ marginRight: '1%', width: '49%'}}>
                           <img  src={img1}  />
                           <figcaption>
                                Helo
                            </figcaption>
                        </div>
                        <div className="imghvr-blur" style={{ marginLeft: '1%', width: '49%'}} >
                            <img src={img1} /> 
                            <figcaption>
                                Helo
                            </figcaption>
                        </div>
                  </div>
              </div>
            </div>
         
          </section>
          <section className="hero is-link is-fullheight hero2" >
        
          </section>

      </div>
    );
  }
}

function herobar(head){ 
  return (<section className="hero is-primary">
<div className="hero-body" style={{backgroundColor: '#142332'}}>
  <div className="container">
    <h1 className="subheading" style={{fontSize: 'calc(18px + 2.5vw)'}}>
       {head}
    </h1>
    <h2 className="subtitle">
      My awesome works
    </h2>
  </div>
</div>
</section>)
}


export default Home;
