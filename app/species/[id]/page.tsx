import CharacterList from "@/app/components/CharacterList";
import MoviePoster from "@/app/components/MoviePoster";
import SpeciesDetails from "@/app/components/speciesDetails";
import { Species } from "@/types/species";
import { promises as fs } from "fs";
import path from "path";


// On récupère les params directement via les props
const SpeciesPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await fetch(`https://swapi.dev/api/species/${id}/`);
  const species: Species = await res.json();

  const filePath = path.join(process.cwd(), "app/images.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const images = JSON.parse(fileContents);
  const poster = images.imagesList[0].species[parseInt(id) - 1];



  /**************************RECUP DES DONNEES************************ */
  const movieData = await Promise.all(
    species.films.map(async (filmsURL) => {
      const characterRes = await fetch(filmsURL);
      return await characterRes.json();
    })
  );
  const charactersData = await Promise.all(
    species.people.map(async (speciesUrl) => {
      const speciesRes = await fetch(speciesUrl);
      return await speciesRes.json();
    })
  );


  if (!species) {
    return <div>Loading...</div>;
  }

  return (
    <section className="m-auto pt-24">
      <div className="container-detail">
        <MoviePoster poster={poster} />
        <SpeciesDetails species={species} />

      </div>

      <br />
      <h2 className="flex justify-center text-3xl">{species.name} appears in these movies : </h2>
      <CharacterList title="" items={movieData} />
  
      <br />
      <h2 className="flex justify-center text-3xl">Notable members of this specie: </h2>
      <CharacterList title="" items={charactersData} />
  

    </section>
  );
};

export default SpeciesPage;
