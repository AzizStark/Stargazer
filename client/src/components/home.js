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
import azi from './aziz.png';
import code from './carbon.png';
import ReactCompareImage from 'react-compare-image';
import Design from "./Design.png";

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
          
          <section className="hero is-fullheight svgg" style={{/*backgroundImage: `url(${Head})`*/}}>
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
         




          <section className="hero is-link is-fullheight hero2 " >
          {herobar('PORTFOLIO','My awesome works')}
            <div className="columns " style={{padding: 10}}>
              <div className="column is-half" style={{padding:10,paddingTop:0}}>
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

              <div className="column is-half" style={{padding:10,paddingTop:0}}>
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
          {herobar('What I do?','Code and Design')}
          <section className="hero is-link is-fullheight hero2" >
           
            <div className="columns" style={{padding: '10%', paddingTop: '10vw'}}>
              <div className="column ">
                <h2 style={{fontFamily: 'Nunito', fontWeight: 600, color: '#2EA7FF', fontSize: "calc(12px + 0.5vw)", paddingTop: '14vh' }}>Clean & Optimized Code</h2> <br/>
                <h2 style={{fontFamily: 'Nunito', fontWeight: 300, fontSize: "calc(12px + 0.5vw)" }}>Clean code reads like well-written prose. Clean code never obscures the designer’s intent but rather is full of crisp abstractions and straightforward lines of control.</h2>
              </div>
              <div className="column is-half">
                  <div className="container" style={{width: '100%'}}>
                    <ReactCompareImage leftImage={code} rightImage={Design} handleSize = {60} sliderLineColor={'#D0AE1E'} sliderLineWidth = {4} sliderPositionPercentage={0.94}/>             
                  </div>      
              </div>
              <div className="column ">
              <h2 style={{fontFamily: 'Nunito', fontWeight: 600, color: '#2EA7FF', fontSize: "calc(12px + 0.5vw),", paddingTop: '14vh'}}>Beautiful Design & Interface</h2> <br/>
              <h2 style={{fontFamily: 'Nunito', fontWeight: 300, fontSize: "calc(12px + 0.5vw)" }}>I believe in simplicity, clarity and always loves minimalism. These facts allow me to create designs smoother than a baby’s bottom. </h2>
              </div>
   
            </div>
          </section>



          <section className="hero is-link is-fullheight hero2" >
            <div className="columns" style={{padding: '10%', paddingTop: '10vw'}}>
              <div className="column  has-text-centered">
                <img  src={azi} style={{width: '75%', borderRadius: 6}}/> 
                
                </div>  
              <div className="column is-three-fifths" style={{fontFamily:'nunito', paddingLeft: 0}}>
              <h1 style={{display: 'inline-block',fontSize: '2rem', color:'#2EA7FF', fontWeight: 500 }}>ME</h1><div style={{marginLeft: 15, display: 'inline-block', background: 'linear-gradient(91.18deg, #2EA7FF -16.44%, rgba(46, 167, 255, 0) 107.71%)', borderRadius: 21, width: '80%', height: 6}}></div>
                <div className="content" style={{fontSize: 'calc(12px + 0.65vw)',padding: 30, paddingLeft: 0, paddingRight:0}}>
                  Hello! 👋 I'm Aziz Rahman, I obviously love web and mobile apps development and have developed few websites and projects️, but I'm also passionate about design🎨.I spend my free time by listening to music 🎧, playing videogames and surfing the internet to explore the world.
                </div>
              </div>
            </div>    
          </section>



          <footer class="footer">
            <div class="content has-text-centered">
              <p>
                <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
              </p>
            </div>
          </footer>
      </div>
    );
  }
}

function herobar(head, subhead){ 
  return (<section className="hero is-primary ">
<div className="hero-body" style={{backgroundColor: '#142332'}}>
  <div className="container">
    <h1 className="subheading" style={{fontSize: 'calc(22px + 2.2vw)', fontWeight: 400}}>
       {head}
    </h1>
    <h2 className="subtitle" style={{fontFamily: 'Nunito', fontWeight: 300, color: '#2EA7FF'}}>
      {subhead}
    </h2>
  </div>
</div>
</section>)
}


export default Home;
