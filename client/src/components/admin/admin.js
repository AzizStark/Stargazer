import React, { Component } from "react";
import axios from "axios";
import './react-draft-wysiwyg.css';
import bstyles from './blog.module.css';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import ImageUploader from 'react-images-upload';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class view extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    stitle: "",
    sdate: "",
    stag: "",
    scontent: "",
    htmlcontent: "",
    uploadedFileCloudinaryUrl: [],
    editorState: EditorState.createEmpty(),
    pictures: [],
    buttonUrl: "Copy URL",
    uploadStatus: 'NotStarted',
    uploadCount: 0,
    test: []
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
    if(this.state.stitle.length && this.state.stag.length && this.state.sdate.length && content.length > 0){
      axios.post('/api/posts',{
          title: this.state.stitle,
          date: this.state.sdate,
          tag: this.state.stag,
          content: content        
      })
        .then(res => {
          if(res.data){
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

handleImageUpload = (index) => {
    this.setState({
      uploadStatus : "Uploading"
    })
    var imag = this.state.pictures[index]
    var bodyFormData = new FormData();
    bodyFormData.append('image', imag); 
    var progress
    const config = {
      headers: {'Content-Type': 'multipart/form-data' },
      onUploadProgress : (progressEvent) => {
      progress = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
      document.getElementById('progress').value = progress;
      }
    };
    axios.post('/api/upload', bodyFormData,config)
    .then((res) => {
      console.log(res.data.data.image)
      if(res.data){
        var response = res.data.data.image;
          {
            this.setState({
              uploadedFileCloudinaryUrl: this.state.uploadedFileCloudinaryUrl.concat(response),
              uploadCount: this.state.uploadCount + 1
            })
          }
        if(this.state.pictures.length !== this.state.uploadCount){
          console.log(this.state.pictures.length +" !== "+ this.state.uploadCount)
          this.handleImageUpload(index + 1)
        }
        else{
          this.setState({
            uploadStatus: 'Finished',
          })
          console.log("Finished")
      }
      }})
    .catch(err => console.log(err))
}

imageStack = (img) => {
  this.setState({
    pictures: img
  });
  //console.log(URL.createObjectURL(img[0].slice()))
}


  render() {
   // const { data } = this.props.location
    const { editorState } = this.state;
   // const { uploading, images } = this.state

    return (
      
      <div className={bstyles.blog} style={{overflow: 'Hidden'}}>
         <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&display=swap" rel="stylesheet"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <div>
          <img style={{width:'100%', height: '100%', objectFit: 'cover'}} src={this.state.test[0]}></img>
          <section className={`hero is-fullheight`}  style={{padding: '20%'}}>
          
          {(this.state.uploadStatus === 'Uploading') &&
          <div>
            <h1>
             Uploading image {this.state.uploadCount+1} of {this.state.pictures.length}
            </h1>
            <progress id="progress" className="progress is-info" value="0" max="100"></progress>
          </div>
          }
          
          { 
          (this.state.uploadStatus === 'NotStarted') &&
            <div style={{backgroundColor: '#ff5566', textAlign: 'center',  borderRadius: 30, paddingBottom: 30}}> 
              <ImageUploader
                    buttonText={`Choose images`}
                    onChange={this.imageStack.bind(this)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    fileTypeError={"Invalid File"}
                    fileSizeError={"File Size is greater than 5 MB"}
                    label={"Max Size: 5 MB"}
                    fileContainerStyle={{background: "#ff5566",  borderRadius: 30, boxShadow: 'none'}}
                    //fileContainerStyle={{height: 30}}
                    withIcon={true}
              />
              <p style={{fontSize: 14}}>Files selected for upload:  {this.state.pictures.length}</p><br />
              <button onClick={() => (this.state.pictures.length > 0) && this.handleImageUpload(0)} className="button is-primary" style={styles.bttn}> Upload </button>
            </div> 
          }

            <br />
            
          {(this.state.uploadStatus === 'Finished') &&
            <div className="columns" style={{flexWrap: 'wrap',justifyContent:'space-around', backgroundColor: '#131313', borderRadius: 30}}>
            {this.state.pictures.map((user,index) =>
              <figure className="column"  className="image is-128x128" style={{padding: 6}} key={index} >
                <div className="imghvr-flip-horiz" style={{border: 2, borderColor: '#423B57', borderStyle: 'solid', height: '100%'}} >
                  <img style={{width:'100%', height: '100%', objectFit: 'cover'}} src={URL.createObjectURL(this.state.pictures[index].slice())}></img>
                  <figcaption style={styles.vcenter}>
                  <CopyToClipboard text={`${this.state.uploadedFileCloudinaryUrl[index]}`}>
                    <button className="button is-primary" onClick={() => {this.setState({ buttonUrl: "Copied"})}} onMouseOut={() => {this.setState({ buttonUrl: "Copy URL"})}} style={styles.bttn}>{this.state.buttonUrl}</button>
                  </CopyToClipboard> 
                  </figcaption> 
                </div>
              </figure>
            )}            
            </div>}

            <form>
            <h1>Header Image</h1>
            <input className="input" type="text" onChange={this.updateTitle} placeholder="Enter URL"/><br /><br />
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
            <button className="button is-primary" onClick={this.putPost}>Submit</button>
            </form>
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

const styles =({

  bttn : {
    fontSize: 14,
    height: 30,
    border: 'none',
    borderRadius: 15,
    color: "#ffffff",
    width: 100,
  },

  vcenter  : {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column"
  }
})

export default view;
