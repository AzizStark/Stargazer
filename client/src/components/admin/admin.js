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
    pictures: []
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

handleImageUpload = (filee) => {
  var url = `https://api.cloudinary.com/v1_1/azizcloud/upload`;
  var fd = new FormData();
  fd.append("upload_preset", 'everibadi');
  fd.append("file", filee);
  const config = {
    headers: { "X-Requested-With": "XMLHttpRequest" },
  };
  axios.post(url, fd, config)
  .then((res) => {
    console.log('res', res)
    // File uploaded successfully
    var response = res.data;
    // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
    //var url = response.secure_url;
    // Create a thumbnail of the uploaded image, with 150px width
    //var tokens = url.split('/');
    //tokens.splice(-2, 0, 'w_150,c_scale');
    //var img = new Image(); // HTML5 Constructor
    //img.src = tokens.join('/');
    //img.alt = response.public_id;
    //document.getElementById('gallery').appendChild(img);
    {this.setState({
      uploadedFileCloudinaryUrl: this.state.uploadedFileCloudinaryUrl.concat(response.secure_url)
    });}
    console.log(this.state.uploadedFileCloudinaryUrl);
  })
  .catch(err => console.log(err))
}


onImageUpload = () => {
  for(var i = 0; i < this.state.pictures.length; i++)
  {
    this.handleImageUpload(this.state.pictures[i]);
  }
}

imageStack = (img) => {
  //console.log(img)
  this.setState({
    pictures: img
  });
  console.log(this.state.pictures)
}

  render() {
    const { data } = this.props.location
    const { editorState } = this.state;
    const { uploading, images } = this.state
    return (
      
      <div className={bstyles.blog} style={{overflow: 'Hidden'}}>
         <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&display=swap" rel="stylesheet"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <div>
          <section className={`hero is-fullheight`}  style={{padding: '20%'}}>
            <div style={{backgroundColor: '#ff5566', textAlign: 'center'}}>
              <ImageUploader
                    buttonText='Choose images'
                    onChange={this.imageStack.bind(this)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    fileTypeError={"Invalid File"}
                    fileSizeError={"File Size is greater than 5 MB"}
                    label={"Max Size: 5 MB"}
                    fileContainerStyle={{background: "#DF6638", borderRadius: 0}}
                    //fileContainerStyle={{height: 30}}
                    withIcon={true}
              />
              <h6>Files Selected for upload: {this.state.pictures.length}</h6>
              <button onClick={this.onImageUpload}> Upload </button>
              <p>{(this.state.pictures).length}</p>
            </div><br />
            <div className="columns" style={{flexWrap: 'wrap',justifyContent:'space-around'}}>
            {this.state.pictures.map((user,index) =>
             
            <figure className="column" class="image is-128x128" style={{padding: 6}} key={index} >
              <div className="imghvr-flip-horiz" style={{border: 2, borderColor: '#423B57', borderStyle: 'solid', objectFit: 'cover', height: '100%'}} >
                <img src={'https://res.cloudinary.com/azizcloud/image/private/s--ivWcgHNY--/v1578069119/yjot5iy48xj0wfzudjxb.png'}/*src={this.state.uploadedFileCloudinaryUrl[index]}*/></img>
                <figcaption style={styles.vcenter}>
                <CopyToClipboard text={`${this.state.uploadedFileCloudinaryUrl[index]}`}>
                   <button className="button is-primary"style={{fontSize: 14, height: 30, border: 'none', borderRadius: 15, color: "#ffffff",width: 100}}>Copy URL</button>
                </CopyToClipboard> 
                </figcaption>
              </div>
            </figure>
            )}
                       
            </div>
            <form>
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

  vcenter  : {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column"
  }
})

export default view;
