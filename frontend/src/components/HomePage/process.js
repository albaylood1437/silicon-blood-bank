import React from "react";
import { Link } from "react-router-dom";

const Process = () => {
  return (
    <div className="wrapper light-wrapper">
      <div className="container pb-4">
        <h3
          className="display-5 text-center"
          style={{ paddingBottom: "5rem", paddingTop: "5rem" }}
        >
          <span className=" title-underline">Process</span>
        </h3>
        <div className="row text-center">
          <div className="col-md-6 col-lg-4 text-center">
            <div className="box bg-white shadow shadow-hover mb-4">
              <div
                className="icon icon-svg mb-4 text-center"
                style={{ width: "20%", marginLeft: `100px` }}
              >
                <h1 style={{ color: "#f00" }}> <span style={{ fontSize: "1rem" }}>#</span>1</h1>
              </div>
              <h5>Come to blood campn</h5>
              <p style={{ fontSize: `.9rem` }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 text-center">
            <div className="box bg-white shadow shadow-hover mb-4">
              <div
                className="icon icon-svg mb-4 text-center"
                style={{ width: "20%", marginLeft: `100px` }}
              >
                <h1 style={{ color: "#f00" }}> <span style={{ fontSize: "1rem" }}>#</span>2</h1>
              </div>
              <h5>make donation</h5>
              <p style={{ fontSize: `.9rem` }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 text-center">
            <div className="box bg-white shadow shadow-hover mb-4">
              <div
                className="icon icon-svg mb-4 text-center"
                style={{ width: "20%", marginLeft: `100px` }}
              >
                <h1 style={{ color: "#f00" }}>
                  <span style={{ fontSize: "1rem" }}>#</span>3
                </h1>
              </div>
              <h5>be ready for come back</h5>
              <p style={{ fontSize: `.9rem` }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
