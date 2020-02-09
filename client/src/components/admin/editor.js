import React, { Component } from "react";
import axios from "axios";
//import './react-draft-wysiwyg.css';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ImageUploader from 'react-images-upload';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import bstyles from '../blog/blog.module.css';
import renderHTML from 'react-render-html';

class editor extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    editmode: "Create Post",
    simage: "",
    otitle: "",
    ocid: 0,
    stitle: "",
    stag: "",
    uploadedFileCloudinaryUrl: [],
    uploadedFileCloudinaryId: [],
    editorState: EditorState.createEmpty(),
    pictures: [],
    buttonUrl: "Copy URL",
    uploadStatus: 'NotStarted',
    uploadCount: 0,
    modalstate: '',
    uindex: 0,
    utotal: 0,
    udone: 0,
    tab: ["is-active","",""]
  }
}

onEditorStateChange: Function = (editorState) => {
  if(editorState.getCurrentContent().getPlainText('').length < 500001){
    this.setState({
      editorState
    });
  }
  else{
    window.alert("Warning: Maximum content size reached")
  }
};

componentDidMount() {
  axios.get('/api/isLogged')
     .then(res => {
       var searchParams = new URLSearchParams(this.props.location.search).get("m");
       if(searchParams === 'edit'){
        this.setState({
          editmode: 'Edit Post'
        })
        this.getPost()
      }
     }).catch( err => {
         if(err.response.status === 401){
             console.log('Unauthorized')
           //  this.props.history.push('/admin/login');
         } 
     })   
}

putPost = () => { 
  const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    if(this.state.stitle.length && this.state.stag.length && this.state.simage.length && content.length > 0){
      axios.post('/api/posts',{
          imageurl: this.state.simage,
          title: this.state.stitle,
          tag: this.state.stag,
          content: content,
          cimages: this.state.uploadedFileCloudinaryId,        
      })
        .then(res => {
          
          //Remove ids from unused stack
          axios.delete('/api/deleteunused',{
            headers: {
              Authorization: 'authorizationToken'
            },
            data: {
              imgids: this.state.uploadedFileCloudinaryId
            }  
          }).then((res) => {
            console.log("Stack Cleared")
          }).catch( err => console.log(err))

          if(res){
            window.alert("Posted Successfully!")
            this.setState({
              modalstate: "",
            })
            this.props.history.push(`/blog/${res.data.cid}/${res.data.title}`);
          }
        })
        .catch(err => window.alert('Post creation failed'))
    }else {
      window.alert('Input field required')
    }
}

getPost = () => {
  const path = this.props.location.pathname
  const cid = path.slice(14,path.lastIndexOf('/'));
  const title = path.slice(15 + cid.length).replace(/-/g,' ');
  axios.get('/api/viewpost',{
    params: {
      title: title,
      cid: cid
    }
  })
    .then(res => {
      if(res.data){
        const blocksFromHtml = htmlToDraft(res.data.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          otitle: title,
          ocid: cid,
          stitle: res.data.title,
          simage: res.data.imageurl,
          stag: res.data.tag,
          uploadedFileCloudinaryId: res.data.cimages,
          udone: res.data.cimages.length,
          //Editor state conversion
          editorState: editorState
        })
      }
    })
    .catch(err => console.log(err))
}

setPost = () => {
  console.log("Post will update");
  const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    if(this.state.stitle.length && this.state.stag.length && this.state.simage.length && content.length > 0){
      axios.put('/api/updatepost',{
          otitle: this.state.otitle,
          cid: this.state.ocid,
          cimages: this.state.uploadedFileCloudinaryId,
          imageurl: this.state.simage,
          title: this.state.stitle,
          tag: this.state.stag,
          content: content        
      })
        .then(res => {
          axios.delete('/api/deleteunused',{
            headers: {
              Authorization: 'authorizationToken'
            },
            data: {
              imgids: this.state.uploadedFileCloudinaryId
            }  
          }).then((res) => {
            console.log("Stack Cleared")
            if(res.data){
              window.alert("Success: Post Updated!")
              this.setState({
                modalstate: "",
              })
            }
          }).catch( err => console.log(err))
          this.props.history.push(`/blog/${res.data.cid}/${this.state.stitle}`);
        })
        .catch(err => console.log(err))
    }else {
      window.alert('Update failed, Please try again')
    }
}

updateImage = (e) => {
  this.setState({
      simage: e.target.value
  })
}

updateTitle = (e) => {
  this.setState({
      stitle: e.target.value
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
      if(res.data){
        var response = res.data.imgurl;
        var id = res.data.public_id;
          {
            this.setState({
              uploadedFileCloudinaryUrl: this.state.uploadedFileCloudinaryUrl.concat(response),
              uploadedFileCloudinaryId: this.state.uploadedFileCloudinaryId.concat(id),
              uploadCount: this.state.uploadCount + 1
            })
          }
        if(this.state.pictures.length !== this.state.uploadCount){
          this.setState({ uindex: this.state.uindex + 1})
          this.handleImageUpload(index + 1)
        }
        else{
          this.setState({
            uindex: this.state.uindex + 1,
            uploadStatus: 'Finished',
          })
          console.log("Finished")
          let unused = this.state.uploadedFileCloudinaryId.slice(this.state.uindex + this.state.udone - this.state.utotal)
      }
      }})
    .catch(err => console.log(err))
}

deleteImage = (index) => {
  axios.delete('/api/deleteimage', {
    headers: {
      Authorization: 'authorizationToken'
    },
    data: {
      title: this.state.otitle,
      cid: this.state.ocid,
      imageid: this.state.uploadedFileCloudinaryId[index]
    }
  }).then(res => {
    if(res.data){
      window.alert("Imagehas been deleted")
      const ids = this.state.uploadedFileCloudinaryId;
      ids.splice(index,1)
      this.setState({
        uploadedFileCloudinaryId: ids,
        udone: this.state.udone - 1,
      })
    }
  })
}

imageStack = (img) => {
  this.setState({
    pictures: img
  });
  //console.log(URL.createObjectURL(img[0].slice()))
}

toggleModal = (e) => {
  if(e){
    e.preventDefault();
  }
  var mstate = this.state.modalstate
  if(mstate === ''){
    this.setState({
      modalstate: "is-active is-clipped"
    })
  }
  else{
    this.setState({
      modalstate: ""
    })
  }
}

switchTab = (index) =>{
  let tab = ["","",""]
  tab[index] = "is-active"
  this.setState({
    tab: tab
  })
}

editHtml = (contents) => {
    const blocksFromHtml = htmlToDraft(contents.target.value);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({
      editorState: editorState
    })
}

  render() {
   // const { data } = this.props.location
    const { editorState } = this.state;
   // const { uploading, images } = this.state

    return (
      
      <div className={''} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
         <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&display=swap" rel="stylesheet"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <div style={{width: '60%', paddingTop: '10%'}}>
          <section className={`hero is-fullheight`} >
          <h1 style={{fontSize: 36, textAlign: 'center'}}>{this.state.editmode}</h1>
        
          {(this.state.uploadStatus === 'Uploading' && this.state.pictures.length !== this.state.uploadCount) &&
          <div>
            <h1>
             Uploading image {this.state.utotal - (this.state.pictures.length - this.state.uindex) + 1} of {this.state.utotal}
            </h1>
            <progress id="progress" className="progress is-info" value="0" max="100"></progress>
          </div>
          }
          
          { 
          //(this.state.uploadStatus === 'NotStarted') &&
            <div style={{backgroundColor: '#80BFE2', textAlign: 'center',  borderRadius: 30, paddingBottom: 30}}> 
              <ImageUploader
                    buttonText={`Choose images`}
                    onChange={this.imageStack.bind(this)}
                    imgExtension={['.jpg','.jpeg', '.gif', '.png', '.gif']}
                    maxFileSize={1050000}
                    fileTypeError={"Invalid File"}
                    fileSizeError={"image size is larger than 1 MB"}
                    label={"Maximum image size: 1 MB"}
                    fileContainerStyle={{background: "#80BFE2",  borderRadius: 30, boxShadow: 'none'}}
                    withIcon={true}
              />
              <p style={{fontSize: 14}}>Files selected for upload:  {this.state.pictures.length - this.state.uindex}</p><br />
              <button onClick={() => (this.state.pictures.length > 0 && this.state.pictures.length !== this.state.uploadCount) && (this.setState({utotal: this.state.pictures.length - this.state.uindex}) | this.handleImageUpload(this.state.uindex))} className="button is-primary" style={styles.bttn}> Upload </button>
            </div> 
          }
          <br />
          {
          //this.state.uploadStatus !== 'Finished'
          }
          <h1> Uploaded Images </h1><br/> 
          {(true) &&
            <div className="columns" style={{flexWrap: 'wrap',justifyContent:'space-around', backgroundColor: '#131313', borderRadius: 30}}>
            {this.state.uploadedFileCloudinaryId.map((user,index) =>
              (this.state.uploadedFileCloudinaryId[index] !== undefined) && 
              <figure className="column"  className="image is-128x128" style={{padding: 6}} key={index} >
                <div className="imghvr-flip-horiz" style={{border: 2, borderColor: '#423B57', borderStyle: 'solid', height: '100%'}} >
                  <img style={{width:'100%', height: '100%', objectFit: 'cover'}} src={`https://res.cloudinary.com/azizcloud/image/upload/${this.state.uploadedFileCloudinaryId[index]}`}></img>
                  <figcaption style={styles.vcenter}>
                  <CopyToClipboard text={`https://res.cloudinary.com/azizcloud/image/upload/${this.state.uploadedFileCloudinaryId[index]}`}>
                    <button className="button is-primary" onClick={() => {this.setState({ buttonUrl: "Copied"})}} onMouseOut={() => {this.setState({ buttonUrl: "Copy URL"})}} style={styles.bttn}>{this.state.buttonUrl}</button>
                  </CopyToClipboard> 
                  <button className="button is-danger" onClick={() => {this.deleteImage(index)}}>Delete</button>
                  </figcaption> 
                </div>
              </figure>
            )}            
            </div>}

            <form onSubmit={this.toggleModal}>
              <input className="input" type="url" onChange={this.updateImage} value={this.state.simage} placeholder="Enter header image URL" maxLength="250" required/><br /><br />
              <input className="input" pattern={`^[a-zA-Z0-9,!.()"'|]+$`} onChange={this.updateTitle} value={this.state.stitle} placeholder="Enter post title without special characters" maxLength='77' required/><br /><br />
              <input className="input" type="text" onChange={this.updateTag} value={this.state.stag} placeholder="Enter tag" maxLength='14' required/><br/><br />
              <div>
                <article className="panel is-primary" >
                  <p className="panel-heading">
                    Manage content
                  </p>
                  <div class="tabs is-centered is-boxed" style={{backgroundColor: '#fff',paddingTop: 10,marginBottom: 0}}>
                  <ul>
                    <li class={`${this.state.tab[0]}`} onClick={() => {this.switchTab(0)}}>
                      <a>
                        <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
                        <span>Editor</span>
                      </a>
                    </li>
                    <li class={`${this.state.tab[1]}`} onClick={() => {this.switchTab(1)}}>
                      <a>
                        <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span>
                        <span>Preview</span>
                      </a>
                    </li>
                    <li class={`${this.state.tab[2]}`} onClick={() => {this.switchTab(2)}}>
                      <a>
                        <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span>
                        <span>Edit HTML</span>
                      </a>
                    </li>
                  </ul>
                </div>
                  <div style={this.state.tab[0] === "" ? styles.hide : undefined}>
                    <Editor
                      editorState={editorState}
                      editorClassName={bstyles.contentArea}
                      onEditorStateChange={this.onEditorStateChange}
                    />
                    {/* <textarea
                      disabled
                      style={{width: '100%',minHeight: '200px'}}
                      value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    /> */}<br />
                    <center><button className="button is-primary" value='submit' >{this.state.editmode === 'Edit Post' ? 'Save Changes' : 'Create Post'}</button></center>
                  </div>

                  {this.state.tab[1] === "is-active" && 
                    <div style={{borderStyle: 'double', padding: '4%', minHeight: '60vh'}}>
                      <div className="container">
                        <div className={bstyles.contentArea} >
                          {renderHTML(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                        </div>
                      </div>
                    </div>
                  }

                  {this.state.tab[2] === "is-active" && 
                        <textarea style={{backgroundColor: "#1A171B",width: '100%', minHeight: '60vh',color: '#fff'}} onChange = {(e) => this.editHtml(e)}>
                          {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        </textarea >
                  }
                </article> 
              </div>
            </form>
          </section>  
        </div>
        
        <div className={`modal ${this.state.modalstate}`}>
              <div className="modal-background"></div>
              <div className="modal-content">
              <div className="card" style={{borderRadius: 6}}>
                <div className="card-content">
                  <p className="title">
                     {this.state.editmode === "Create Post" ? 'Are you sure you want to create a new post?' : 'Are you sure you want to update the changes to the post?' }
                  </p>
                </div>
                <footer className="card-footer">
                  <p className="card-footer-item">
                    <span>
                      <a onClick = {this.state.editmode === 'Create Post' ? this.putPost : this.setPost}>Confirm</a>
                    </span>
                  </p>
                  <p className="card-footer-item">
                    <span>
                      <a onClick = {() => {this.toggleModal()}} >Cancel</a>
                    </span>
                  </p>
                </footer>
              </div>
              </div>
              <button className="modal-close is-large" onClick = {() => {this.toggleModal()}} aria-label="close"></button>
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

const styles =({

  hide: {
    display: 'none',
  },

  bttn : {
    fontSize: 14,
    height: 30,
    border: 'none',
    borderRadius: 15,
    width: 100,
    padding:0,
    backgroundColor:'#3f4257' 
  },

  vcenter  : {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column"
  }
})

export default editor;