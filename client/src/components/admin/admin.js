import React, { Component } from "react";
import axios from "axios";
import Navba from './Navba';
import bstyles from './blog.module.css';
import cup from './cup.jpg';

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
                  <div>
                  Ego autem existimo, si honestum esse aliquid ostendero, quod sit ipsum vi sua propter seque expetendum, iacere vestra omnia. Et summatim quidem haec erant de corpore animoque dicenda, quibus quasi informatum est quid hominis natura postulet. Quod autem satis est, eo quicquid accessit, nimium est. An ea, quae per vinitorem antea consequebatur, per se ipsa curabit? Restincta enim sitis stabilitatem voluptatis habet, inquit, illa autem voluptas ipsius restinctionis in motu est. Tum ille timide vel potius verecunde.
<br />
<blockquote>Expressa vero in iis aetatibus, quae iam confirmatae sunt. Tum Piso, Atqui, Cicero, inquit, ista studia, si ad imitandos summos viros spectant, ingeniosorum sunt.</blockquote> 
<br />
Quibus autem in rebus tanta obscuratio non fit, fieri tamen potest, ut id ipsum, quod interest, non sit magnum.

Ita fit ut, quanta differentia est in principiis naturalibus, tanta sit in finibus bonorum malorumque dissimilitudo. Ut proverbia non nulla veriora sint quam vestra dogmata. Commentarios quosdam, inqua.

A man in a white shirt opening a book with yellow pages
Photo by NordWood Themes / Unsplash

Aristotelios, quos hic sciebam esse, veni ut auferrem, quos legerem, dum essem otiosus.At enim, qua in vita est aliquid mali, ea beata esse non potest. Zenonis est, inquam, hoc Stoici. Miserum hominem! Si dolor summum malum est, dici aliter non potest. Videamus igitur sententias eorum, tum ad verba redeamus. Vide, ne etiam menses! nisi forte eum dicis, qui, simul atque arripuit, interficit. Atque his de rebus et splendida est eorum et illustris oratio.
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
