import React from "react";

interface Data {
  title: string;
  paragraph?: string;
}

interface Props {
  data: Data;
}

export const Header: React.FC<Props> = ({ data }) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-md-2 intro-text">
                <h1>
                  {data.title}
                  <span></span>
                </h1>
                <p>{data.paragraph ? data.paragraph : "Loading.."}</p>
                <a href="/main" className=" bttn-custom  ">
                  Log In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
