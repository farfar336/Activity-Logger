import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Activity Logger</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
  
            <Link to="/" className="nav-link">Activities</Link>
            </li>
            <li className="navbar-item">
              {/* When 'Create Activity Log' is clicked, direct user to the link ending in '/create' */}
            <Link to="/create" className="nav-link">Create Activity Log</Link>
            </li>
            <li className="navbar-item">
            <Link to="/user" className="nav-link">Create User</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}