import React from 'react';

export default class Navigation extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
          <a className="navbar-brand" href="#">2 Lemons</a>
          {/* <a className="btn btn-primary" href="#">Sign In</a> */}
        </div>
      </nav>
    )
  }

}
