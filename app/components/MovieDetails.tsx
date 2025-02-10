import { Film } from "@/types/films";
import { formatDate } from "../utils/formatDate";


const MovieDetails = ({ movie }: { movie: Film }) => {
  return (
    <div className="movie-detail">
      <h1 className="text-yellow-400 flex justify-center text-2xl">{movie.title}</h1>
      <br />
      <h2>Chronological order: <b>{movie.episode_id}</b></h2>
      <p>Release Date: <b>{formatDate(movie.release_date)}</b></p>
      <p>Directed by <b>{movie.director}</b> and produced by <b>{movie.producer}</b></p>
    </div>
  );
};

export default MovieDetails;
