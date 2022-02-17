import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [data, setData] = useState([]);

  const apiGet = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  useEffect(() => {
    apiGet();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <Link to={`list-item/${item.id}`}>
            <p>{item.title}</p>
          </Link>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
