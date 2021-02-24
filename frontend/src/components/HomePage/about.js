import React from "react";
import AboutImg from "../../images/blood.jpg";
import Layout from "./layout";
const About = () => {
  return (
    <Layout>
      <div className="wrapper white-wrapper mt-5">
        <div className="container inner">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2 text-center">
              <div>
                <figure>
                  <img src={AboutImg} alt="about" />
                </figure>
                <div
                  className="row counter counter-s position-absolute"
                  // style="top: 45%; right: 8%;"
                  style={{ top: `57%`, right: `23%` }}
                ></div>
              </div>
            </div>
            <div className="space30 d-none d-md-block d-lg-none"></div>

            <div className="col-lg-6 pr-60 pr-md-15">
              <h2
                className="title-color color-gray"
                style={{ fontSize: "1rem", fontWeight: "700" }}
              >
                <span className="title-underline">About Us</span>
              </h2>
              <h3 className="display-5">Hargeisa Hospital Group</h3>
              <p style={{ fontSize: `1rem`, letterSpacing: `.01rem` }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum.Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum.Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum.
              </p>
              <p style={{ fontSize: `1rem`, letterSpacing: `.01rem` }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum.Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum.Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
