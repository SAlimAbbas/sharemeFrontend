import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState();
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      client
        .fetch(query)
        .then((response) => {
          setPins(response);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      client
        .fetch(feedQuery)
        .then((response) => {
          setPins(response);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [categoryId]);
  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;
  if (!pins?.length) return <h2>No pins available</h2>;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
