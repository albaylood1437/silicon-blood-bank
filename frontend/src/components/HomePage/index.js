import React from "react";
import Slider from "./slider";
import Process from "./process";
import Layout from "./layout";
import Campaigns from "./campaign";

const Index = () => {
  return (
    <Layout>
      <Slider />
      <Process />
      <Campaigns />
    </Layout>
  );
};

export default Index;
