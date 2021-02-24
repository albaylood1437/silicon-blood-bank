import React from "react";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import Com1Img from "../../images/blood.jpg";
import Com2Img from "../../images/blood-donation.jpg";

const Campaigns = () => {
  return (
    <div className="wrapper white-wrapper">
      <div className="container inner">
        <h3
          className="display-5 text-center mt-4"
          style={{ paddingBottom: "5rem" }}
        >
          <span className="title-underline">Current Campaigns </span>
        </h3>
        <div className="row">
          <div className="item post grid-sizer col-md-4 col-lg-4">
            <figure className="overlay overlay1 rounded mb-3">
              <Link to="/">
                <img
                  style={{ width: "100%", height: "300px" }}
                  src={Com2Img}
                  alt="campaigns"
                />
              </Link>
              <figcaption>
                <h5 className="from-top mb-0">Read More</h5>
              </figcaption>
            </figure>
            <h2 className="post-title">
              <Link style={{ boxShadow: `none` }} to="/">
                Donate Blood
              </Link>
            </h2>

            <div className="meta mb-0">
              <span className="date">
                <FaClock size="19px" color="f3160e" className="mb-2" />
                {"   "}
                September 01, 2020
              </span>
            </div>
          </div>
          <div className="item post grid-sizer col-md-4 col-lg-4">
            <figure className="overlay overlay1 rounded mb-3">
              <Link to="/">
                <img
                  style={{ width: "100%", height: "300px" }}
                  src={Com1Img}
                  alt="campaigns"
                />
              </Link>
              <figcaption>
                <h5 className="from-top mb-0">Read More</h5>
              </figcaption>
            </figure>
            <h2 className="post-title">
              <Link style={{ boxShadow: `none` }} to="/">
                Donate Blood
              </Link>
            </h2>

            <div className="meta mb-0">
              <span className="date">
                <FaClock size="19px" color="f3160e" className="mb-2" />
                {"   "}
                September 01, 2020
              </span>
            </div>
          </div>{" "}
          <div className="item post grid-sizer col-md-4 col-lg-4">
            <figure className="overlay overlay1 rounded mb-3">
              <Link to="/">
                <img
                  style={{ width: "100%", height: "300px" }}
                  src={Com2Img}
                  alt="campaigns"
                />
              </Link>
              <figcaption>
                <h5 className="from-top mb-0">Read More</h5>
              </figcaption>
            </figure>
            <h2 className="post-title">
              <Link style={{ boxShadow: `none` }} to="/">
                Donate Blood
              </Link>
            </h2>

            <div className="meta mb-0">
              <span className="date">
                <FaClock size="19px" color="f3160e" className="mb-2" />
                {"   "}
                September 01, 2020
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
