import CharacterList from "@/app/components/CharacterList";
import MoviePoster from "@/app/components/MoviePoster";
import PeopleDetails from "@/app/components/PeopleDetails";
import { Person } from "@/types/person";
import { promises as fs } from "fs";
import path from "path";

const PeoplePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await fetch(`https://swapi.dev/api/people/${id}/`);
  const people: Person = await res.json();

  const filePath = path.join(process.cwd(), "app/images.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const images = JSON.parse(fileContents);
  const poster = images.imagesList[0].people[parseInt(id) - 1];



  /**************************RECUP DES DONNEES************************ */
  const charactersData = await Promise.all(
    people.films.map(async (filmsURL) => {
      const characterRes = await fetch(filmsURL);
      return await characterRes.json();
    })
  );
  const speciesData = await Promise.all(
    people.species.map(async (speciesUrl) => {
      const speciesRes = await fetch(speciesUrl);
      return await speciesRes.json();
    })
  );
  const starshipsData = await Promise.all(
    people.starships.map(async (starshipsUrl) => {
      const starshipsRes = await fetch(starshipsUrl);
      return await starshipsRes.json();
    })
  );
  const vehiclesData = await Promise.all(
    people.vehicles.map(async (vehiclesUrl) => {
      const vehiclesRes = await fetch(vehiclesUrl);
      return await vehiclesRes.json();
    })
  );


  if (!people) {
    return <div>Loading...</div>;
  }

  return (
    <section className="m-auto pt-24">
      <div className="container-detail">
        <MoviePoster poster={poster} />
        <PeopleDetails people={people} />

      </div>

      <br />
      <h2 className="flex justify-center text-3xl">{people.name} appears in these movies : </h2>
      <CharacterList title="" items={charactersData} />
      <br />
      <h2 className="flex justify-center text-3xl"> 
        <b>{people.gender == "male" ? "He " : people.gender == "female" ? "She " : "It "}</b> belongs to this species : 
        </h2>
      <CharacterList title="" items={speciesData} />
  

    </section>
  );
};

export default PeoplePage;
