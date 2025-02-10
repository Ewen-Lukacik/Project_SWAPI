import { Species } from "@/types/species";

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};


const SpeciesDetails = async ({ species }: { species: Species }) => {

  return (
    <div className="people-detail">
           <h1 className="text-yellow-400 flex justify-center text-2xl">{species.name}</h1>
      they are <b>{species.average_height}</b> cm tall on average, 
      they can live up to <b>{species.average_lifespan}</b> years. 
      <br />
      <br />
      They speak <b>{species.language}</b>
    </div>
  );
};

export default SpeciesDetails;
