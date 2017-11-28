import React from 'react';

export default class Highlight extends React.Component {

  render() {
    return (
      <section className="features-icons bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="icon-screen-desktop m-auto text-primary"></i>
                </div>
                <h3>Connect instagram</h3>
                <p className="lead mb-0">With just two clicks you can connect with your insttagram account!</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="icon-layers m-auto text-primary"></i>
                </div>
                <h3>Publish your photos</h3>
                <p className="lead mb-0">Connecting your account allow us to fetch your photos and get their GPS locations!</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="icon-check m-auto text-primary"></i>
                </div>
                <h3>Watch your journey</h3>
                <p className="lead mb-0">Let us create nice map of your travel and show you how awesome we are!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}
