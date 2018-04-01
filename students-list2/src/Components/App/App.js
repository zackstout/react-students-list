import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import StudentForm from '../StudentForm/StudentForm';
import StudentList from '../StudentList/StudentList';

let allStudents = [];

class App extends Component {
  constructor() {
    super();
    // Keep track of the student list
    this.state = {
      studentList: [],
    };

    // Give our function access to `this`
    this.addStudent = this.addStudent.bind(this);
  }

  // This function is called by the StudentForm when the submit button is pressed
  addStudent(newStudent) {
    console.log(newStudent);
    // POST your data here
    axios.post('/students', newStudent)
      .then(res => {
        console.log(res);
        // after successful post, get all students in the database:
        axios.get('/students')
          .then(result => {
            // console.log("new res", result);
            this.state.studentList = result.data;
            console.log(this.state.studentList);
            // let's try this:
            // allStudents = this.state.studentList;
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(err => {
        // yes, very helpful:
        console.log(err.response);
      });

  }

  render() {
    // Only called at beginning of script -- not on any changes:
    // console.log(allStudents);
    // const allStuds = this.state.studentList.map(stud => <li key={stud._id}> {stud.github} </li>);
    // const allStudents = this.state.starObjs.map(star => <li key= {star.name}> { star.name } has a diameter of { star.diameter } </li>);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GitHub Student List</h1>
        </header>
        <br/>
        <StudentForm addStudent={this.addStudent}/>

        <p>Student list goes here.</p>

        <StudentList studs = { this.state.studentList.map(stud => <li key={stud._id}> {stud.github} </li>) }/>
      </div>
    );
  }
}

export default App;
