import React, {Component} from 'react';
import axios from 'axios';
import '../index.css';
import Input from './Input';


class Todo extends Component {

  state = {
    todos: ["asd",]
  }

  componentDidMount(){
    this.getTodos();
  }

  getTodos = () => {
    axios.get('/api/aziz')
      .then(res => {
        if(res.data){
          this.setState({
            todos: res.data
          })
        }
      })
      .catch(err => console.log(err))
  }

  deleteTodo = (id) => {

    axios.delete(`/api/aziz/${id}`)
      .then(res => {
        if(res.data){
          this.getTodos()
        }
      })
      .catch(err => console.log(err))
  }

  render() {
 
    return(
      <div>
        <h1>Aziz's Todo(s)</h1>
        <Input getTodos={this.getTodos}/>
    {//<ListTodo todos={this.state.todos} deleteTodo={this.deleteTodo}
    }
        <ul>
      {
        this.state.todos &&
          this.state.todos.length > 0 ?
            (
              this.state.todos.map(todo => {
                return (
                  <li key={todo._id} onClick={() => this.deleteTodo(todo._id)}>{todo.action}</li>
                )
              })
            )
            :
            (
              <li>No todo(s) left</li>
            )
      }
    </ul>

      </div>
    )
  }
}

export default Todo;
