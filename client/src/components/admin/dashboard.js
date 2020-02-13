import React, {Component} from "react";
import axios from "axios";
import loading from "./loading.gif";

class Dashboard extends Component{

constructor(props) {
    super(props);
    this.state = {
      id: "",
      ctitle: "",
      scontent: ["loading"],
      modalstate: "",
      modalstate2: "",
      target: "",
      space: "loading"
    }
  }

  componentDidMount(){
    axios.get('/api/isLogged')
     .then(res => {
      this.getSpace()
      this.getPosts()
     }).catch( err => {
         if(err.response.status === 401){
             this.props.history.push('/admin/login');
         } 
     })   
  }


getPosts = () => {
  axios.get('/api/postitles')
    .then(res => {
      if(res.data){
        this.setState({
          scontent: res.data,
        })
      }
    })
    .catch(err => console.log(err))
}

clearCache = () => {
  axios.delete('/api/clear')
       .then(res => {
          window.alert('Cache cleared')
          this.setState({
            modalstate2: ""
          })
       }).catch( err => {
          window.alert("Failed to clear cache")
       })   
}

getSpace = () => {
  axios.get('/api/usedspace')
  .then(res => {
    if(res.data){
      this.setState({
        space: res.data,
      })
    }
  })
  .catch(err => console.log(err))
}

deletePost = (e) => {
  const refer = this.state;
  const post = refer.scontent[refer.target]
  if(refer.ctitle === post.title){
    axios.delete('/api/deletepost', {
      headers: {
        Authorization: 'authorizationToken'
      },
      data: {
        id: post._id
      }
    }).then(res => {
      if(res.data){
        window.alert("Post has been deleted")
        this.setState({
          ctitle : "",
          modalstate: "",
        })
        this.getPosts()
      }
    })
    ;
  }
  else{
    window.alert("Please enter matching title")
  }
}

toggleModal = (e) => {
  e.preventDefault()
  if(this.state.modalstate === ''){
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



toggleModal2 = (e) => {
  e.preventDefault()
  if(this.state.modalstate2 === ''){
    this.setState({
      modalstate2: "is-active is-clipped"
    })
  }
  else{
    this.setState({
      modalstate2: ""
    })
  }
}

logout = () => {
  axios.get('/api/logout')
  .then(res => {
      console.log("out")
      this.props.history.push("login")
  })
  .catch(err => console.log(err))
}

updateTitle = (e) => {
  this.setState({
      ctitle: e.target.value
  })
}

loader = () => {
  return(
    <center><img src={loading} alt="loading" style={{width: 40}}/></center>
  )
}

  render() {
    const { scontent } = this.state;
      return (
      <div>
        <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: '10%', paddingTop: '6%', marginLeft: '16%',  marginRight: '16%', }}>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <h2 style={{color: '#ffffff' }} className="title is-2"> Dashboard </h2>
            <div style={{minWidth: '68vw'}}>
            <div className="card" style={{ borderRadius: 6, backgroundColor: '#80BFE2'}}>
                <div className="card-content" style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'}}>
                  { this.state.space !== 'loading' ? (
                      <div>
                        <p>Database storage used: {(this.state.space.MStorage/1024).toFixed(2)}/500 MB</p>
                        <p>CDN storage used: {(this.state.space.CStorage/1048576).toFixed(2)} MB</p>
                        <p>CDN service used: {this.state.space.Credits} %</p>
                      </div>) : this.loader()
                  }
                  <button className="button is-info" onClick={()=>{this.getSpace(); this.getPosts()}}>Refresh</button> 
                  <button style={{backgroundColor:'#3f4257' }} className="button is-dark" onClick={()=>{window.open('editor#new')}}>Create Post</button> 
                  <button className="button is-danger" onClick={(e)=>{this.toggleModal2(e)}}>Clear Cache</button>
                  <button className="button is-danger" onClick={(e)=>{this.logout()}}>Log out</button>  
                </div>
            </div>
            <br/>
            {this.state.scontent[0] !== 'loading' ? (<table className="table is-hoverable is-striped" style={{borderRadius: 5, width: '100%'}}>
                <thead>
                    <tr>
                        <th>S.No</th><th>Title</th><th>Date</th><th>Tag</th><th>Views</th><th>View Post</th><th>Edit</th><th>Delete</th>
                    </tr>    
                </thead>
            {scontent.map((post,index)  =>
                <tbody key={index}>
                    <tr >
                        <td>{index}</td>
                        <td style={{wordBreak: 'break-word'}}>{post.title}</td>
                        <td>{post.date}</td>
                        <td>{post.tag}</td>
                        <td>{post.vcount}</td>
                        <td><button className="button is-info" onClick={() => {window.open(`/blog/${post.cid}/${post.title}`)}}>View</button></td>
                        <td><button className="button is-link" onClick={() => {window.open(`/admin/editor/${post.cid}/${post.title}?m=edit`)}}>Edit</button></td>
                        <td><button className="button is-danger" onClick={(e) => {this.setState({target: index}) || this.toggleModal(e)}}>Delete</button></td>
                    </tr>
                </tbody>
            )}
            </table>): this.loader()}
            </div>
            <div className={`modal ${this.state.modalstate}`}>
              <div className="modal-background"></div>
              <div className="modal-content">
              <div className="card" style={{borderRadius: 6}}>
                <div className="card-content">
                  <p className="title">
                    Are you sure you want to permanently delete this post?
                  </p>
                  <br/>
                  <p className="subtitle">
                    Type the title of the post to confirm.
                  </p>
                  <input className="input is-danger" onChange={this.updateTitle} type="text" value={this.state.ctitle} placeholder="Enter Title" />
                </div>
                <footer className="card-footer">
                  <p className="card-footer-item">
                    <span>
                      <a href="# " style={{color: 'red'}} onClick = {(e) => {this.deletePost(e)}} >Delete Post</a>
                    </span>
                  </p>
                  <p className="card-footer-item">
                    <span>
                      <a onClick = {(e) => {this.toggleModal(e)}} href="# ">Cancel</a>
                    </span>
                  </p>
                </footer>
              </div>
              </div>
              <button className="modal-close is-large" onClick = {(e) => {this.toggleModal(e)}} aria-label="close"></button>
            </div>


            <div className={`modal ${this.state.modalstate2}`}>
              <div className="modal-background"></div>
              <div className="modal-content">
              <div className="card" style={{borderRadius: 6}}>
                <div className="card-content">
                  <p className="subtitle">
                    <span style={{color: 'red'}}>Warning</span>: Clearing the cache while writting a post will cause data loss.
                    Make sure there is no pending posts to submit.
                  </p>
                  <br/>
                  <p className="subtitle">
                    Are you sure you want to clear cache?
                  </p>
                  <br/>
                </div>
                <footer className="card-footer">
                  <p className="card-footer-item">
                    <span>
                      <a style={{color: 'red'}} href="# " onClick = {(e) => {this.clearCache(e)}} >Clear cache</a>
                    </span>
                  </p>
                  <p className="card-footer-item">
                    <span>
                      <a onClick = {(e) => {this.toggleModal2(e)}} href="# " >Cancel</a>
                    </span>
                  </p>
                </footer>
              </div>
              </div>
              <button className="modal-close is-large" onClick = {(e) => {this.toggleModal2(e)}} aria-label="close"></button>
            </div>
        </div>
      </div>
      );
  }
}

export default Dashboard;