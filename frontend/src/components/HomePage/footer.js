import React from "react";
import "../../styles/style.css";
// import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
// import SubscribeForm from "./subscribeForm";

const Footer = () => {
  return (
    <footer className="dark-wrapper inverse-text">
      <div className="container inner">
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <div className="widget">
              {/* <img src={Logo} alt="" style={{ width: `130px` }} /> */}

              <div className="space40"></div>
              <p>
                © 2020 somalilandbloodbank. <br className="d-none d-lg-block" />
                All rights reserved.
              </p>
            </div>
          </div>
          <div className="col-md-4 col-lg-3">
            <div className="widget">
              <h3 className="widget-title">Get in Touch</h3>
              <address>
               Main Hospital
                <br className="d-none d-lg-block" /> Hargeisa Group Hospital
              </address>
              <span style={{ boxShadow: `none` }}>info@bloodbank.com</span>
              <br /> +2526.....
            </div>
          </div>
          <div className="col-md-4 col-lg-3">
            <div className="widget">
              <h3 className="widget-title">Learn More</h3>
              <ul className="list-unstyled">
                <li>
                  <Link
                    style={{ boxShadow: `none` }}
                    to="/about"
                    className="nocolor"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ boxShadow: `none` }}
                    to="/contact"
                    className="nocolor"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="space30 d-none d-md-block d-lg-none"></div>
          <div className="col-md-12 col-lg-3">
            <div className="widget">
              <div className="space10"></div>
              <div className="newsletter-wrapper">
                {/* <SubscribeForm /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
