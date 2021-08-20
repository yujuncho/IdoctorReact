import React from "react";

import NavigationV1 from "../components/navigation";
import Header from "../components/header";
import Features from "../components/features";
import About from "../components/about";
import Services from "../components/services";
import Testimonials from "../components/testimonials";
import Contact from "../components/contact";
import JsonData from "../data/data.json";

const Home: React.FC = () => {
  return (
    <div>
      <NavigationV1 />
      <Header
        data={{
          title: JsonData.Header.title,
          paragraph: JsonData.Header.paragraph
        }}
      />
      <Features data={JsonData.Features} />
      <About data={JsonData.About} />
      <Services data={JsonData.Services} />
      <Testimonials data={JsonData.Testimonials} />
      <Contact data={JsonData.Contact} />
    </div>
  );
};

export default Home;
