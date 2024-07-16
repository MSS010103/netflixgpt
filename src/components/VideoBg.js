import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constans";

const VideoBg = ({ id }) => {
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/1022789/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json);
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    console.log(trailer);
  };
  useEffect(() => {
    getMovieVideos();
  }, []);

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/L4DrolmDxmw?si=sN22TjPDC0zR_W6s"
        title="YouTube video player"
      ></iframe>
    </div>
  );
};

export default VideoBg;
