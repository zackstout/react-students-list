import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

class StudentList extends Component {
  render() {
    return (
        <ul>
            { this.props.studs }
        </ul>
    );
  }
}

export default StudentList;
