import React, { Component } from 'react';
import './App.css';
import axios from 'axios'  

const API_URL = 'http://127.0.0.1:8000';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        title: '',
        content: '',
        category:'',
        due_date:'',
        category_select: [],
        todo: []
    }  
  }

  getInitialState() {
    return { title: '', content:'', category:'', due_date:''}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, content, category, due_date } = this.state;

    axios.post(`${API_URL}/todolist/`, { title, category, due_date })
      .then((result) => {
        console.log(result);
        this.getTodos();
    });
    this.setState(this.getInitialState());
    
  }

  componentDidMount() {

    axios.get(`${API_URL}/category`)
      .then(res => {
        const category_select = res.data;
        this.setState({ category_select });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

      this.getTodos();
  }

  getTodos(){
    axios.get(`${API_URL}/todolist`)
      .then(res => {
        const todo = res.data;
        this.setState({ todo });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  render() {
    const { title, content, category, due_date } = this.state;
    return (
      <div className="container">
        <div className="content">
          <h1>TodoApp</h1>
          <p className="tagline">a Django-React todo app</p>
          <form onSubmit={this.onSubmit}>
          <div className="inputContainer">
              <input onChange={this.onChange} value={this.state.title} type="text" id="title" className="taskName" placeholder="What do you need to do?" name="title" required />
              <label htmlFor="title">Title</label>
          </div>  
          <div className="inputContainer">
              <input onChange={this.onChange} value={this.state.content} type="text" id="content" className="taskName" placeholder="Breif about your task" name="content" required />
              <label htmlFor="content">Description</label>
            </div>
            <div className="inputContainer half last">
              <i className="fa fa-caret-down selectArrow" />
              <select onChange={this.onChange} value={this.state.category} id="category" className="taskCategory" name="category">
                <option className="disabled" value>Choose a category</option>
                {this.state.category_select.map(category_select =>
                  <option key={category_select.id} className="" value={ category_select.id } name={ category_select.name }>{ category_select.name }</option>
                )}
              </select>
              <label htmlFor="category">Category</label>
            </div>
            <div>
              <div className="inputContainer half last right">
                  <input onChange={this.onChange} value={this.state.due_date} type="date" id="due_date" className="taskDate" name="due_date" />
                  <label htmlFor="due_date">Due Date</label>
              </div>
              <div className="row">
                <button className="taskAdd" name="taskAdd" type="submit"><i className="fa fa-plus icon" />Add task</button> &nbsp;
                <button className="taskDelete" name="taskDelete" formNoValidate type="submit" ><i className="fa fa-trash-o icon" />Delete Tasks</button>
              </div>
            </div>
            <ul className="taskList">
              {this.state.todo.map(todo =>
              <li key={todo.id} className="taskItem">
                  <input type="checkbox" className="taskCheckbox" name="checkedbox" id={ todo.id } value={ todo.id } />
                  <label htmlFor={ todo.id }><span className="complete-">{ todo.title }</span></label>
                  {/*<span className={ todo.category }>{ todo.category }</span>*/}
                  <strong className="taskDate"><i className="fa fa-calendar"></i>{ todo.created } - { todo.due_date }</strong>
              </li>
              )}
            </ul>    
          </form>
        </div>
      </div>
    );
  }
}

export default App;
