import React from "react";
import ImageOne from "../../images/blood.jpg";
import ImageTwo from "../../images/blood.jpg";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const SlideShow = () => {
  return (
    <div className="wrapper white-wrapper text-center pt-5">
      <div className="container rev_slider_wrapper fullwidth-container dark-spinner dark-nav">
        <Carousel style={{ zIndex: `0` }}>
          <Carousel.Item>
            <div id="slider16" className="row rev_slider fullwidthbanner">
              <div className="col-lg-6 col-md-6 col-sm-6 heading-con">
                <div className="heading-one color-dark mt-3 mb-4">
                  Safe Live Become a Hero
                </div>
                <Link
                  className="btn btn-center mt-4"
                  to="/about"
                >
                  About
                </Link>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-6 r-pic mt-5">
                <img className="size-pic" src={ImageTwo} alt="" />
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div id="slider16" className="row rev_slider fullwidthbanner">
              <div className="col-lg-6 col-md-6 col-sm-6 heading-con">
                <div className="heading-one color-dark mt- mb-4">
                  Give Blood And Save Life
                </div>
                <Link
                  className="btn btn-center mb-4"
                  to="/about"
                >
                  About
                </Link>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-6 r-pic">
                <img className="size-pic" src={ImageOne} alt="empleyment" />
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default SlideShow;
