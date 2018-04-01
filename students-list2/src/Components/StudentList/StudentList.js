import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
console.log('studlist')
class StudentList extends Component {
  render() {
      // this shows up as empty: (because we weren't using setState).
    //   console.log(this.props.studs);
    return (
        <ul>
            { this.props.studs }
        </ul>
    );
  }
}

export default StudentList;
