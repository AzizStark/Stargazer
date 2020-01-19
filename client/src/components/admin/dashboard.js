import React, {Component} from "react";
import axios from "axios";

class Dashboard extends Component{

 
constructor(props) {
    super(props);
    this.state = {
      id: "",
      ctitle: "",
      scontent: [],
      modalstate: "",
      target: ""
    }
  }

  componentDidMount(){
    this.getPosts()
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

toggleModal = (indx) => {
  var mstate = this.state.modalstate
  if(mstate == ''){
    this.setState({
      target: indx,
      modalstate: "is-active is-clipped"
    })
  }
  else{
    this.setState({
      modalstate: ""
    })
  }
}

updateTitle = (e) => {
  this.setState({
      ctitle: e.target.value
  })
}

  render() {
    const { scontent } = this.state;
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <h2 style={{color: '#ffffff' }} className="title is-2"> Dashboard </h2>

            <h3 style={{color: '#ffffff' }} className="title is-3">Manage Blog </h3>
            <div style={{minWidth: '50%'}}>
            <div className="card" style={{ borderRadius: 6}}>
                <div className="card-content" style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row'}}>
                  <button className="button is-link" onClick={()=>{this.getPosts()}}>Refresh</button> 
                  <button className="button is-success" onClick={()=>{window.open('editor#new')}}>Create Post</button> 
                </div>
            </div>
            <br/>
            <table className="table is-hoverable is-striped" style={{borderRadius: 5}}>
                <thead>
                    <tr>
                        <th>Post ID</th><th>Title</th><th>Date</th><th>CID</th><th>Tag</th><th>View Post</th><th>Edit</th><th>Delete</th>
                    </tr>    
                </thead>
            {scontent.map((post,index)  =>
                <tbody key={index}>
                    <tr>
                        <td>{index}</td>
                        <td>{post.title}</td>
                        <td>{post.date}</td>
                        <td>{post.cid}</td>
                        <td>{post.tag}</td>
                        <td><button className="button is-info" onClick={() => {window.open(`/blog/${post.cid}/${post.title}`)}}>View</button></td>
                        <td><button className="button is-link" onClick={() => {window.open(`/admin/editor/${post.cid}/${post.title}?m=edit`)}}>Edit</button></td>
                        <td><button className="button is-danger" onClick={() => this.toggleModal(index)}>Delete</button></td>
                    </tr>
                </tbody>
            )}
            </table>
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
                      <a style={{color: 'red'}} onClick = {() => {this.deletePost()}}>Delete Post</a>
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
        </div>
      );
  }
}

export default Dashboard;