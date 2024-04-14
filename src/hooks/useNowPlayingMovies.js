import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "utils/constants";
import { addNowPlayingMovies } from "utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatchMovies = useDispatch();

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
  
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();

    dispatchMovies(addNowPlayingMovies(json.results));
  }; // empty dependency array ensures that this effect runs only once, similar to componentDidMount
};

export default useNowPlayingMovies;
