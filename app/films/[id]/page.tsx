
import CharacterList from "@/app/components/CharacterList";
import MovieDetails from "@/app/components/MovieDetails";
import MoviePoster from "@/app/components/MoviePoster";
import OpeningCrawl from "@/app/components/OpeningCrawl";
import { Film } from "@/types/films";
import { promises as fs } from "fs";
import path from "path";

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await fetch(`https://swapi.dev/api/films/${id}/`);
  const movie: Film = await res.json();

  const filePath = path.join(process.cwd(), "app/images.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const images = JSON.parse(fileContents);
  const poster = images.imagesList[0].films[parseInt(id) - 1];



  /**************************RECUP DES DONNEES************************ */
  const charactersData = await Promise.all(
    movie.characters.map(async (characterUrl) => {
      const characterRes = await fetch(characterUrl);
      return await characterRes.json();
    })
  );
  const planetsData = await Promise.all(
    movie.planets.map(async (planetUrl) => {
      const planetRes = await fetch(planetUrl);
      return await planetRes.json();
    })
  );
  const speciesData = await Promise.all(
    movie.species.map(async (speciesUrl) => {
      const speciesRes = await fetch(speciesUrl);
      return await speciesRes.json();
    })
  );
  const starshipsData = await Promise.all(
    movie.starships.map(async (starshipsUrl) => {
      const starshipsRes = await fetch(starshipsUrl);
      return await starshipsRes.json();
    })
  );
  const vehiclesData = await Promise.all(
    movie.vehicles.map(async (vehiclesUrl) => {
      const vehiclesRes = await fetch(vehiclesUrl);
      return await vehiclesRes.json();
    })
  );


  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <section className="m-auto pt-24">
      <div className="container-detail">
        <MoviePoster poster={poster} />
        <MovieDetails movie={movie} />
        <OpeningCrawl movie={movie} />

      </div>

      <br />
      <h2 className="flex justify-center text-3xl">Who and what can you see in this movie ?</h2>

      
      <CharacterList title="Characters :" items={charactersData} />
      <CharacterList title="Planets : " items={planetsData} />
      <CharacterList title="Species : " items={speciesData} />
      <CharacterList title="Starships :" items={starshipsData} />
      <CharacterList title="Vehicles :" items={vehiclesData} />
    </section>
  );
};

export default MoviePage;
