import { Film } from "@/types/films";

const OpeningCrawl = ({ movie }: { movie: Film }) => {
    return (
      <div className="crawl-cardbox">
        <div className="opening_crawl">
          <div className="crawl_content">
            <p>
              <span className="p-1 flex justify-center">EPISODE {movie.episode_id}</span>
              <br />
              <span className="p-0 flex justify-center">{movie.title}</span>
              <br />
              {movie.opening_crawl}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default OpeningCrawl;
  