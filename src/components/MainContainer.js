import React from "react";
import { useSelector } from "react-redux";
import VideoBg from "./VideoBg";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;

  const mainMovie = movies[0];
  console.log(mainMovie);
  const { original_title, overview,id } = mainMovie;
  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBg id={id} />
    </div>
  );
};

export default MainContainer;