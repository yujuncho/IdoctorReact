import React, { Component } from "react";

export class about extends Component {
  render() {
    return (
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-6">
              {" "}
              <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
            </div>
            <div className="col-6">
              <div className="about-text">
                <h2 className="main">About Us</h2>
                <p>
                  {this.props.data ? this.props.data.paragraph : "loading..."}
                </p>
                <h3>Why Choose Us?</h3>
                <div className="list-style">
                  <div className="row">
                    <div className="col-6">
                      <ul>
                        {this.props.data
                          ? this.props.data.Why.map((d, i) => (
                              <li key={`${d}-${i}`}>{d}</li>
                            ))
                          : "loading"}
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul>
                        {this.props.data
                          ? this.props.data.Why2.map((d, i) => (
                              <li key={`${d}-${i}`}> {d}</li>
                            ))
                          : "loading"}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default about;
