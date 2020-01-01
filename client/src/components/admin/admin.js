import React, { Component } from "react";
import axios from "axios";
import './react-draft-wysiwyg.css';
import bstyles from './blog.module.css';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class view extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    stitle: "",
    sdate: "",
    stag: "",
    scontent: "",
    posts: ["Hello",2,3,4,5,6,7,8,9,10,"This is last post"],
    htmlcontent: "",
    editorState: EditorState.createEmpty()
  }
}

onEditorStateChange: Function = (editorState) => {
  this.setState({
    editorState
  });
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
};

componentDidMount() {
  this.getPosts()
  window.scrollTo(0, 0)
}

putPost = () => {
  console.log(this.state.stitle)
  const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    if(title.length && content.length > 0){
      axios.post('/api/posts',{
          title: this.state.stitle,
          date: this.state.sdate,
          tag: this.state.stag,
          content: content        
      })
        .then(res => {
          if(res.data){
            //this.setState({action: ""})
            console.log(res.data+"postputted")
          }
        })
        .catch(err => console.log(err))
    }else {
      console.log('input field required')
    }
}

getPosts = () => {
  axios.get('/api/posts')
    .then(res => {
      if(res.data){
        this.setState({
          htmlcontent: res.data,
          editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(res.data[0].content)
            )
          )
        })
        console.log(this.state.htmlcontent[0].content)
      }
    })
    .catch(err => console.log(err))
}

updateTitle = (e) => {
  this.setState({
      stitle: e.target.value
  })
}

updateDate = (e) => {
  this.setState({
      sdate: e.target.value
  })
}

updateTag = (e) => {
  this.setState({
      stag: e.target.value
  })
}

  render() {
    const { data } = this.props.location
    const { editorState } = this.state;
    return (
      <div className={bstyles.blog} style={{overflow: 'Hidden'}}>
         <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&display=swap" rel="stylesheet"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          
        <div>
          <section className={`hero is-fullheight`}  style={{padding: '20%'}}>
            <h1>Title</h1>
            <input className="input" type="text" onChange={this.updateTitle} placeholder="Text input"/><br /><br />
            <h1>Date</h1>
            <input className="input" type="text" onChange={this.updateDate} placeholder="Text input"/><br /><br />
            <h1>Tag</h1>
            <input className="input" type="text" onChange={this.updateTag} placeholder="Text input"/><br/><br />
            <h1>Content</h1>
            <div style={{border: 10, borderColor: '#6D6D6D', borderStyle: 'solid'}}>
              <article className="panel is-primary" >
                <p className="panel-heading">
                  Primary
                </p>
                <div>
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                  />
                  <textarea
                    disabled
                    style={{width: '100%',minHeight: '200px'}}
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                  />
                </div>
              </article> 
            </div><br />
            <button class="button is-primary" onClick={this.putPost}>Submit</button>
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
