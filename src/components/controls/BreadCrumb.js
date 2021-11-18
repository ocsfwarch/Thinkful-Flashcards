import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ crumbs, linkId }) => {
  //const [currentUrl, setCurrentUrl] = useState("");
  const [crumbList, setCrumbList] = useState([]);

  useEffect(() => {
    let currentUrl = "";
    const links = crumbs.map((crumb) => {
      currentUrl = `${currentUrl}${crumb.value}/`;
      return crumb.type === "text" ? (
        <li key={`${linkId}-${crumb.id}`}>{crumb.title}</li>
      ) : (
        <li key={`${linkId}-${crumb.id}`}>
          <Link to={currentUrl}>
            {" "}
            {crumb.title === "Home" ? (
              <span id="home" className="oi oi-home mr-1"></span>
            ) : (
              ""
            )}
            {crumb.title}
          </Link>
          <span className="mr-2">{`/`}</span>
        </li>
      );
    });
    setCrumbList((current) => (current = [...links]));
  }, [crumbs, linkId]);

  return (
    <div className="nav">
      <ul>{crumbList}</ul>
    </div>
  );
};

export default BreadCrumb;
