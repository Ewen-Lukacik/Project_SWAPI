import CharacterList from "@/app/components/CharacterList";
import MoviePoster from "@/app/components/MoviePoster";
import PlanetDetails from "@/app/components/PlanetDetails";
import { Planet } from "@/types/planet";
import { promises as fs } from "fs";
import path from "path";

// On récupère les params directement via les props
const PlanetPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await fetch(`https://swapi.dev/api/planets/${id}/`);
  const planet: Planet = await res.json();

  const filePath = path.join(process.cwd(), "app/images.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const images = JSON.parse(fileContents);
  const poster = images.imagesList[0].planets[parseInt(id) - 1];


  /**************************RECUP DES DONNEES************************ */
  const MovieList = await Promise.all(
    planet.films.map(async (filmsURL) => {
      const characterRes = await fetch(filmsURL);
      return await characterRes.json();
    })
  );
  const ResidentData = await Promise.all(
    planet.residents.map(async (speciesUrl) => {
      const speciesRes = await fetch(speciesUrl);
      return await speciesRes.json();
    })
  );


  if (!planet) {
    return <div>Loading...</div>;
  }

  return (
    <section className="m-auto pt-24">
      <div className="container-detail">
        <MoviePoster poster={poster} />
        <PlanetDetails planet={planet} />

      </div>

      <br />
      <h2 className="flex justify-center text-3xl">Notable people to live there : </h2>
      <CharacterList title="" items={ResidentData} />
      <br />

      <h2 className="flex justify-center text-3xl">This planet can be seen in the following movies : </h2>
      <CharacterList title="" items={MovieList} />

    </section>
  );
};

export default PlanetPage;