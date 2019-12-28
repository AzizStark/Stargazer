import React, { Component } from "react";
import axios from "axios";
import Navba from './Navba';
import './bulma.css';
import './imagehover.min.css';
import cstyles from './home.module.css';
import './toggle.js';
import leaf1 from './plato.svg';
import leaf2 from './plate.svg';
import img1 from './img1.png';
import azi from './aziz.png';
import code from './carbon.png';
import ReactCompareImage from 'react-compare-image';
import Design from "./Design.png";
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt, faDeviantart, faInstagram, faLinkedinIn, faDribbble, faGgCircle } from '@fortawesome/free-brands-svg-icons'

class Home extends Component {
  state = {
    todos: ["asd"],
    capvalue: null,
    sendinfo: "Send Message",
    butStyle: `${cstyles.custombtn}`
  };

  componentDidMount() {
    this.getTodos();
  }

  onChange = (value) => {
    this.setState({
      capvalue: value,
      sendinfo: "Send Message",
      butStyle: `${cstyles.custombtn}`
    });
    console.log("Captcha value:", this.state.capvalue);
  }

  showIt = (elementId) => {
    var el = document.getElementById(elementId);
    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
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

  sendEmail = (e) => {
    e.preventDefault();
    if(this.state.capvalue != null && this.state.capvalue != "sent"){
      this.setState({
        sendinfo: "Sending Message"
      });
      emailjs.sendForm('gmail', 'contact', e.target, 'user_yYmXLFgei1Nw3P3rJBMaS')
        .then((result) => {
            this.setState({
              sendinfo: "Message Sent Successfully",
              capvalue: "sent",
              butStyle: `${cstyles.custombtnS}`
            });
        }, (error) => {
            console.log(error.text);
            if(this.state.capvalue != "sent"){
              this.setState({
                sendinfo: "Sending Failed!",
                butStyle: `${cstyles.custombtnW}`
              });
          }
        });
    }
    else{
      console.log("captcha not verified")
      if( this.state.capvalue != "sent"){
        this.setState({
          sendinfo: "Please Verify Captcha",
          butStyle: `${cstyles.custombtnW}`
        });
      }
    }
  }


  render() {
    //require("./home.css")
    return (
      <div style={{overflow: 'Hidden'}}>
          <meta charSet="utf-8"></meta>
          <link href="https://fonts.googleapis.com/css?family=Comfortaa:300,400,500,600,700|Nunito:200,300,400,400i,600,700&display=swap" rel="stylesheet"></link>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          
          <section className={`hero is-fullheight ${cstyles.svgg}`}>
          <Navba></Navba>
            <div className="hero-body" >
          
              <div className="container"  style={{marginLeft: '3vw'}}>
            
                <p id={cstyles.title}>
                HELLO, <br></br>
                I AM <span className={cstyles.blue}>AZIZ</span>.
                </p>
                <p className={cstyles.subheading}>An aspiring developer and designer.</p>
                <br />
                <button  onClick={() => this.showIt('explore')}  className="button is-rounded" id={cstyles.custombtn} >Explore</button>
              </div>
              
              <div className={cstyles.cardss}>
                  <img  className={cstyles.floating} style={{position: 'absolute',  zIndex:2, margin: 0,}} src={leaf1}  />
                  <img  style={{position: 'absolute',  zIndex:1, }} src={leaf2}   />
              </div>    
            </div>
          </section>

          {herobar('What I built?','Awesome projects')}
          <section  id="portfolio" className={`hero is-fullheight ${cstyles.svgg}`} >
         
            <div className="columns" style={{padding: 15}}>
              <div className="column is-half" style={{padding:10,}}>
                  <div className="imghvr-blur" style={{display:'block',borderRadius: 30}}>
                      <img src={img1} style={{width:'100%'}} title="hover text" />
                      <figcaption>
                        <p className="title" id={cstyles.title} style={{fontSize: "calc(12px + 1vw)", fontWeight: "500"}}>
                           MY FIRST PROJECT 
                        </p><br/>
                        <p className="subheading" style={{fontSize: "calc(12px + 0.5vw)", fontWeight: "500"}}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                      </figcaption>
                  </div>
              </div>

              <div className="column is-half" style={{padding:10}}>
                  <div >
                        <div className="imghvr-blur" style={{width: '49%',marginRight: '1%',borderRadius: 30}}>
                            <img  src={img1}  />
                            <figcaption>
                                Helo
                            </figcaption>
                        </div>
                        <div className="imghvr-blur" style={{ width: '49%', marginLeft: '1%',borderRadius: 30}}>
                            <img  src={img1} />
                            <figcaption>
                                Helo
                            </figcaption>
                        </div>
                    </div>
                    <div style={{marginTop:"1%"}}>
                        <div className="imghvr-blur" style={{ marginRight: '1%', width: '49%',borderRadius: 30}}>
                           <img  src={img1}  />
                           <figcaption>
                                Helo
                            </figcaption>
                        </div>
                        <div className="imghvr-blur" style={{ marginLeft: '1%', width: '49%',borderRadius: 30}} >
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
          <section id="explore" className={`hero is-fullheight ${cstyles.svgg}`}  >
           
            <div className="columns" style={{padding: '10%', paddingTop: '12vw'}}>
              <div className="column ">
                <p style={styles.ltext}>Clean & Optimized Code</p> <br/>
                <h2 style={{fontFamily: 'Nunito', fontWeight: 300, fontSize: "calc(12px + 0.8vh)", textAlign: 'justify' }}>Clean code reads like well-written prose. Clean code never obscures the designer’s intent but rather is full of crisp abstractions.</h2>
                <br/>
                <h2 style={styles.stext}>JavaScript</h2>
                <progress style = {{height: 5,marginBottom:10}}className="progress is-small is-link" value="94" max="100"></progress>
                <h2 style={styles.stext}>Python</h2>
                <progress style = {{height: 5,marginBottom:10}}className="progress is-small is-link" value="88" max="100"></progress>
                <h2 style={styles.stext}>Java</h2>
                <progress style = {{height: 5}}class="progress is-small is-link" value="82" max="100"></progress>
              </div>
              <div className="column is-half">
                  <div className="container" style={{width: '100%'}}>
                  <ReactCompareImage leftImage={code} rightImage={Design} handle={<FontAwesomeIcon  icon={faArrowsAltH} style={{ backgroundColor: '#2EA7FF', borderRadius: 30, padding: 10, border: 0 }} size="3x"/>} sliderLineColor={'#2EA7FF'} sliderLineWidth = {8} sliderPositionPercentage={0.515}/>      <br />       
                  </div> <div style={{display: 'flex', justifyContent: 'center'}} ><button  onClick={() => this.showIt('explore')} id={cstyles.custombtn} className="button is-rounded " >Download Resume</button>    </div> 
              </div>
              <div className="column">
                <p style={styles.ltext}>Beautiful Design & Interface</p> <br/>
                <h2 style={{fontFamily: 'Nunito', fontWeight: 300, fontSize: "calc(12px + 0.8vh)",textAlign: 'justify'  }}>I believe in simplicity, clarity and always loves minimalism. These facts allow me to create designs smoother than a baby’s bottom. </h2>
              <br/>
                <h2 style={styles.stext}>Figma</h2>
                <progress style = {{height: 5,marginBottom:10}}class="progress is-small is-link" value="96" max="100"></progress>
                <h2 style={styles.stext}>Illustrator</h2>
                <progress style = {{height: 5,marginBottom:10}}class="progress is-small is-link" value="86" max="100"></progress>
                <h2 style={styles.stext}>Photoshop</h2>
                <progress style = {{height: 5}}class="progress is-small is-link" value="92" max="100"></progress>
              </div>
            </div>
          </section>


          {herobar('Who I am?','About me')}
          <section id="about" className={`hero is-fullheight ${cstyles.svgg}`}  style={{display: 'flex',justifyContent: 'center', flexDirection: 'column'}}>
            <div className="columns" style={{padding: '10%'}}>
              <div className="column  has-text-centered">
                <img  src={azi} style={{width: '75%', borderRadius: 30}}/> 
              </div>  
              <div className="column is-three-fifths" style={{fontFamily:'nunito', paddingLeft: 0}}>
                <h1 style={{display: 'inline-block',fontSize: '2rem', color:'#2EA7FF', fontWeight: 500 }}>ME</h1>
                <div style={{marginLeft: 15, display: 'inline-block', background: 'linear-gradient(91.18deg, #2EA7FF -16.44%, rgba(46, 167, 255, 0) 107.71%)', borderRadius: 21, width: 'calc(100% - 4rem)', height: 6}}></div>
                <div className="content" style={{fontSize: "calc(12px + 1vh)",fontWeight: 300,padding: 33, paddingLeft: 0, paddingRight:0, textAlign: 'justify'}}>
                  Hey! 👋 I'm Aziz Rahman, I love web and mobile app development and have developed a few websites and projects️. I'm also passionate about design🎨. I spend my free time listening to music 🎧, playing video games and surfing the internet to explore the world.
                </div> 
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <a style={styles.bcolor} href="mailto:theazizstark@gmail.com?Subject=Hello" target="_top"><FontAwesomeIcon  className={cstyles.iclick} icon={faEnvelope}  size="2x"/></a>
                    <a style={styles.bcolor} href="https://github.com/azizstark" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon  className={cstyles.iclick} icon={faGithubAlt}  size="2x"/></a>
                    <a style={styles.bcolor} href="https://deviantart.com/azizstark" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon  className={cstyles.iclick} icon={faDeviantart}    size="2x"/></a>
                    <a style={styles.bcolor} href="https://dribbble.com/AzizStark" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon  className={cstyles.iclick} icon={faDribbble}    size="2x"/></a>
                    <a style={styles.bcolor} href="https://www.instagram.com/theazizrahman/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon  className={cstyles.iclick} icon={faInstagram}    size="2x"/></a>
                    <a style={styles.bcolor} href="https://www.linkedin.com/in/theazizrahman/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon  className={cstyles.iclick} icon={faLinkedinIn}   size="2x"/></a>
                </div>
              </div>
            </div>    
          </section>

          {herobar('Want to talk?','Contact me')}
          <section  id="contact" className={`hero is-fullheight ${cstyles.svgg}`} style={{display: 'flex',justifyContent: 'center', flexDirection: 'column'}}>
            <div  class="columns">
          <div class="column is-half has-text-left " style={{fontFamily: 'Nunito', fontWeight: 500,margin: 'auto', color: '#ffffff', paddingRight: '10%', paddingLeft: '10%'}}>
          <form className="contact-form" onSubmit={this.sendEmail}>
            <div class="field">
							<label>Name</label>
							<div class="control">
								<input class="input is-medium" name="user_name"  type="text" style={styles.input} required/>
							</div>
						</div>
						<div class="field">
							<label>Email</label>
							<div class="control">
								<input class="input is-medium" type="email" name="user_email" style={styles.input}  required/>
							</div>
						</div>
						<div class="field">
							<label >Message</label>
							<div class="control">
								<textarea class="textarea is-medium" name="message" style={styles.input}  required></textarea>
							</div>
						</div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <ReCAPTCHA
                sitekey="6LcHgMkUAAAAAFJHIMlbY2m2N0wSchYl5Ga2wJXU"
                theme="dark"
                onChange={this.onChange}
              />
            </div><br/>
						<div class="control">
							<button type="submit" value="Send" id={this.state.butStyle} className="button is-rounded is-fullwidth has-text-weight-medium is-medium">{this.state.sendinfo}</button>
						</div>
          </form>
					</div>
          </div>
          </section>

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

function herobar(head, subhead){ 
  return (<section className="hero is-primary">
<div className="hero-body" style={{backgroundColor: '#152636'}}>
  <div className="container">
    <h1 className={cstyles.subheading2} style={{fontSize: 'calc(22px + 2.0vw)', fontWeight: 500}}>
       {head}
    </h1>
    <h2 className={cstyles.subtitle} style={{fontSize: 'calc(12px + 1.2vw)' , fontFamily: 'Nunito', fontWeight: 300, color: '#2EA7FF'}}>
      {subhead}
    </h2>
  </div>
</div>
</section>)
}


const styles = {
  input: {backgroundColor: '#0B1826', borderColor: '#2EA7FF', color: '#FFFFFF'},
  icon: {padding: 6},
  bcolor: {color: '#2EA7FF'},
  stext: {fontFamily: 'Nunito', fontWeight: 400, textAlign: 'justify' },
  ltext: {fontFamily: 'Nunito', fontWeight: 500, color: '#2EA7FF', fontSize: "calc(1.8rem)"}
}

export default Home;