import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../style.css';
import logo from './../../img/logoedit.svg';

const Header = () => {
    return (
      <div>
        <nav className="navbar navbar-default" id="navigation-purple">
          <div className="container">
          <img className="img-responsive avatar" src={logo} alt="Avatar" />
          <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><a href={"/login"}>Start APP</a></li>
                    {/* <li><a href="#">refresh token?</a></li> */}
                </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }

export default Header;