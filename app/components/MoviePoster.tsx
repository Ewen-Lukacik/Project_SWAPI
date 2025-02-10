const MoviePoster = ({ poster }: { poster: string }) => {
  return (
    <div className="cardbox-detail">
      <img src={poster} alt="Movie poster" />
    </div>
  );
};

export default MoviePoster;
