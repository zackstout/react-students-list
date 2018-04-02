import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// console.log('studlist')
class InfoList extends Component {

  render() {
    console.log(this.props.info);

    const repos = this.props.info.repos.map(repo => <li key={repo.id}> { repo.name } </li> );

    if (this.props.info.avatar_url) {
        return (
            <div>
            <p>
                {/* Ohoo don't forget the closing slash! */}
                <img src= {this.props.info.avatar_url} />
                {/* Avatar_url: { this.props.info.avatar_url }  */}
            </p>
            <p>
                Following: { this.props.info.following } 
            </p>
            <p>
                Followers: { this.props.info.followers } 
            </p>
            <p>
                Repos: { this.props.info.public_repos } 
            </p>
            <p>
                Bio: { this.props.info.bio } 
            </p>
            <p>
                Followers_url: { this.props.info.followers_url } 
            </p>
         
                Repos: 
                <ul>
                    { repos }
                </ul>

     
            </div>
        );
    } else {
        return (
            <p></p>
        )
    }
    
  }
}

export default InfoList;
