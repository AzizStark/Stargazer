import React, {Component} from "react";
import axios from "axios";

class Dashboard extends Component{

 
constructor(props) {
    super(props);
    this.state = {
      id: "",
      simage: "",
      stitle: "",
      sdate: "",
      stag: "",
      scontent: []
    }
  }


getPosts = () => {
    axios.get('/api/postitles')
      .then(res => {
        if(res.data){
          this.setState({
            scontent: res.data,
          })
          for (var i=0; i < res.data.length; i++){
            console.log(this.state.scontent[i])
          }
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { scontent } = this.state;
      return (
        <div>
            <h1> Dashboard </h1>

            <h1> POSTS </h1>
            <table style={{border: 'solid', borderColor: '#ffffff', borderWidth: 4, width: 1000}}>
                <thead>
                    <tr>
                        <th>Post</th><th>Title</th><th>Date</th>
                    </tr>    
                </thead>
            {scontent.map((post,index)  =>
                <tbody key={index}>
                    <tr>
                        <td>{index}</td>
                        <td>{post.title}</td>
                        <td>{post.date}</td>
                        <td><button>Edit</button>
                        </td>
                    </tr>
                </tbody>
            )}
            </table>
           <button onClick={()=>{this.getPosts()}}>Get posts</button> 
        </div>
      );
  }
}

export default Dashboard;