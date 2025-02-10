import CharacterList from "@/app/components/CharacterList";
import MoviePoster from "@/app/components/MoviePoster";
import StarshipsDetails from "@/app/components/StarshipsDetails";
import { Starships } from "@/types/starship";
import { promises as fs } from "fs";
import path from "path";

const StarshipsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await fetch(`https://swapi.dev/api/starships/${id}/`);
  const starships: Starships = await res.json();

  const filePath = path.join(process.cwd(), "app/images.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const images = JSON.parse(fileContents);
  const poster = images.imagesList[0].starships[parseInt(id) - 1];



  /**************************RECUP DES DONNEES************************ */
  const movieData = await Promise.all(
    starships.films.map(async (filmsURL) => {
      const characterRes = await fetch(filmsURL);
      return await characterRes.json();
    })
  );
  const pilotsData = await Promise.all(
    starships.pilots.map(async (speciesUrl) => {
      const speciesRes = await fetch(speciesUrl);
      return await speciesRes.json();
    })
  );


  if (!starships) {
    return <div>Loading...</div>;
  }

  return (
    <section className="m-auto pt-24">
      <div className="container-detail">
        <MoviePoster poster={poster} />
        <StarshipsDetails starships={starships} />

      </div>

      <br />
      <h2 className="flex justify-center text-3xl">It can be seen in these movies : </h2>
      <CharacterList title="" items={movieData} />
      <br />
      
      <h2 className="flex justify-center text-3xl"> 
        These characters has been pilots on this starships
        </h2>
      <CharacterList title="" items={pilotsData} />
  

    </section>
  );
};

export default StarshipsPage;
