import React,{Component} from 'react';
import bstyles from './blog.module.css';
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from 'emailjs-com';
import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import mount from './mount.jpg'


class contact extends Component{    
    
constructor(props) {
    super(props);
    this.state = {
      capvalue: null,
      sendinfo: "Send",
    };
  }
    
onChange = (value) => {
    this.setState({
      capvalue: value,
      sendinfo: "Send",
      // butStyle: `${cstyles.custombtn}`
    });
    console.log("Captcha value:", this.state.capvalue);
  }
  
  
  sendEmail = (e) => {
    e.preventDefault();
    if(this.state.capvalue !== null && this.state.capvalue !== "sent"){
      this.setState({
        sendinfo: "Sending"
      });
      emailjs.sendForm('gmail', 'contact', e.target, 'user_yYmXLFgei1Nw3P3rJBMaS')
        .then((result) => {
            this.setState({
              sendinfo: "Message Sent",
              capvalue: "sent",
            });
        }, (error) => {
            console.log(error.text);
            if(this.state.capvalue !== "sent"){
              this.setState({
                sendinfo: "Sending Failed!",
              });
          }
        });
    }
    else{
      console.log("captcha not verified")
      if( this.state.capvalue !== "sent"){
        this.setState({
          sendinfo: "Please Verify Captcha",
        });
      }
    }
  }

    render(){
        return(
            <div>
                <div className="columns is-desktop">
                    <div className="column" >
                        <img className={bstyles.sideimg} style={{width: '50%', height: '100vh',position: 'fixed', objectFit: 'cover'}} src={mount}/>
                    </div>
                    <div className="column" style={{paddingTop: 18}}>
                    <a className='title' style={{color: 'white', fontSize: 18, margin:20, fontWeight: 700,  letterSpacing: '0.08em'}} href="/blog" ><FontAwesomeIcon style={{color: '#888888', paddingTop: 15}} icon={faChevronLeft}  size="2x"/>Back to blog</a>
                        <div className={`container ${bstyles.holder}`}>
                            <form onSubmit={this.sendEmail}>                                
                                <h1 className='title' style={{fontSize: 50,color: 'white', textAlign: 'center', fontWeight: 700, letterSpacing: '0.1em',margin: 20}} > Contact </h1>
                                <h1 className='title' style={{color: 'white', textAlign: 'center', fontSize: 22, padding: 12, fontWeight: 700,  letterSpacing: '0.08em'}} >Let's talk!</h1>
                                <input className={bstyles.inputarea} name="user_name" placeholder="Your name" type='text' required /><br/><br/>
                                <input className={bstyles.inputarea} name="user_email" placeholder="Your email address" type='email' required /><br/><br/>
                                <textarea className={bstyles.textarea} name="message" placeholder="Your message" type='textarea' required /><br/>
                                <br/><center><ReCAPTCHA
                                sitekey="6LcHgMkUAAAAAFJHIMlbY2m2N0wSchYl5Ga2wJXU"
                                theme="dark"
                                onChange={this.onChange}
                                /></center><br/>
                                <center><input className={bstyles.nbutton} type='submit' value={this.state.sendinfo}/></center>
                            </form>
                        </div>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        )
    }
}

export default contact;