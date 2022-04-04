import React, { Fragment } from "react";
import "./Home.css";
import MetaData from "../layout/MetaData";

const Home = () => {
  return (
    <Fragment>
      <MetaData title="ecommerce" />
      <div className="banner">
        <p>Welcome to E-comemrce</p>
        <h1>Find Amazing Products Below</h1>
        <a href="">
          <button>Scroll</button>
        </a>
      </div>
      <h1 className="homeHeading">Featured Product</h1>
    </Fragment>
  );
};

export default Home;
