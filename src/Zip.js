import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Zip.css";

const URL = "http://localhost:5000/zip/";

function Zip() {
  const [zips, setZips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["city", "zip"]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setZips(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  function search(zips) {
    return zips.filter((zip) => {

        return searchParam.some((newItem) => {
          return (
            zip[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        })
    });
}

  if (isLoading) {
    return <p>Loading...</p>;
  } else {


    return (
      <div className="container">
        <div className="search-wrapper">
          <label htmlFor="search-form">Filter zip codes and cities in Alabama state:
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
        </div>
<div>
        <ul className="cards">
          {search(zips).map((z) => (
            <li className="cards_item" key={z._id}>
                <div className="card">
                  <div className="card_content">
                    <h2 className="card_title">{z.city}</h2>
                    <ol className="card_list">
                      <li>
                        Location:{" "}
                        <span>
                          {z.loc.y.toFixed(3)}, {z.loc.x.toFixed(3)}
                        </span>
                      </li>
                      <li>
                        Population: <span>{z.pop}</span>
                      </li>
                      <li>
                        State: <span>{z.state}</span>
                      </li>
                      <li>
                        Zip: <span>{z.zip}</span>
                    </li>
                    <li><a rel="noreferrer" target="_blank" href={`https://www.google.com/maps/place/${z.city},+Alabama+${z.zip}`}
												className="btn btn-primary mx-auto">
												View Map
											</a></li>
                    </ol>
                  </div>
                </div>
            </li>
          ))}
        </ul>
      </div></div>
    );
  }
}

export default Zip;
