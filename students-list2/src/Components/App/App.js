
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import StudentForm from '../StudentForm/StudentForm';
import StudentList from '../StudentList/StudentList';
import InfoList from '../InfoList/InfoList';

class App extends Component {
  constructor() {
    super();
    // Keep track of the student list
    this.state = {
      studentList: [],
      currentInfo: {
        avatar_url: '',
        public_repos: 0,
        following: 0,
        followers: 0,
        bio: '',
        followers_url: '',
        repos_url: '',
        repos: []
      }
    };

    // Give our functions access to `this`:
    this.addStudent = this.addStudent.bind(this);
    this.getStudents = this.getStudents.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  getStudents() {
    axios.get('/students')
    .then(result => {
      this.setState({ studentList: result.data });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getInfo(student) {
    console.log('clicking', student);
    var url = 'https://api.github.com/users/' + student + '?access_token=913f20e25e454b699cbf7b4d5f3ae7fd516cafc4';

    axios.get(url)
      .then(result => {
        console.log(result);
  
        axios.get(result.data.repos_url)
          .then(res => {
            console.log(res);
            var repos = res.data;
            this.setState({ currentInfo: {
              avatar_url: result.data.avatar_url,
              followers: result.data.followers,
              following: result.data.following,
              public_repos: result.data.public_repos,
              bio: result.data.bio,
              followers_url: result.data.followers_url,
              repos_url: result.data.repos_url,
              repos: repos
            }})
          })
        // this.setState({ studentList: result.data });
      })
      .catch(error => {
        console.log(error);
      });
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

            // Ahhhhh don't set state directly! thank you react!
            // this.state.studentList = result.data;
            this.setState({ studentList: result.data });

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

  // similar to jQuery's document.ready:
  componentDidMount() {
    this.getStudents();
  }

  render() {
    // Only called at beginning of script -- not on any changes. No....it's called a lot.
   
    // It seems we can't pass in a parameter to the onClick here.... but then how do we pass it in?
    // Ahhhh you've done it again SO! pass in an *arrow function* (?!?!)
    const studs = this.state.studentList.map(stud => <li key={stud._id}> {stud.github} <button onClick={ () => this.getInfo(stud.github) }>More info</button> </li>);
    // const info = this.state.currentInfo
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GitHub Student List</h1>
        </header>
        <br/>
        <StudentForm addStudent={this.addStudent}/>
        <h3>Secret Info</h3>
        <InfoList info= { this.state.currentInfo }/>

        <br/>
        <h3>Student list goes here.</h3>
      
        <StudentList studs={ studs } gettingInfo={this.getInfo}/>
      </div>
    );
  }
}

export default App;
