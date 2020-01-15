import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Home from './components/home/home';
import Blog from './components/blog/blog';
import View from './components/blog/view';
import Create from './components/admin/create';
import Editor from './components/admin/editor';
import Dashboard from './components/admin/dashboard';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/Todo" component={App} />
        <Route exact path="/blog" component={Blog} />
	      <Route path="/blog/:id" component={View}/>
        <Route exact path="/admin/editor" component={Editor} />
       	<Route path="/admin/create" component={Create}/>
        <Route path="/admin/dashboard" component={Dashboard}/>
      </div>
    </Router>
)

ReactDOM.render(routing , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
