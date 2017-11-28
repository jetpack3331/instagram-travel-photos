import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { authorize, logout } from '../state/actions/user';
import { INSTAGRAM } from '../state/constants/platforms';

export class Header extends React.Component {
  render() {
    return (
      <header className="masthead text-white text-center">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <h1 className="mb-5">Create Map from my photos?</h1>
            </div>
            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
              <div className="form-row">
                {! this.props.logged
                  ? <div className="col-12">
                      <a onClick={() => authorize(INSTAGRAM)}  className="btn btn-block btn-lg btn-primary">Sign up with Instagram!</a>
                      <small>We will redirect you into API of instagram.com</small>
                    </div>
                  : <div className="col-12"><a onClick={() => this.props.logout(INSTAGRAM)} className="btn btn-block btn-lg btn-danger">Sign out</a></div>}
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default connect(undefined, {
  logout,
})(Header);
