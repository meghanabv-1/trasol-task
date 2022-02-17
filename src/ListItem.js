import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ListItem() {
  const [data, setData] = useState();
  const { id } = useParams();

  const apiGet = (itemId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    apiGet(id);
  }, [id]);

  return (
    <div>
      <p>{data?.title}</p>
      <p>{data?.body}</p>
    </div>
  );
}

export default ListItem;
