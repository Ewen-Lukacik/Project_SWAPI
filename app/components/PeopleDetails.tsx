import { Person } from "@/types/person";

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

const PeopleDetails = async ({ people }: { people: Person }) => {

  const homeworldData = await fetchData(people.homeworld);
  const homeworldName = homeworldData.name;

  const speciesName =
    people.species.length > 0
      ? (await fetchData(people.species[0])).name
      : "";

  return (
    <div className="people-detail">
      <h1 className="text-yellow-400 flex justify-center text-2xl">{people.name}</h1>
      <br />
      <p>
        <b>
          {people.gender !== "male" && people.gender !== "female"
          ? "Is a droid constructed "
          : `Is a ${people.gender} ${speciesName} born `}
        </b>

        in <b>{people.birth_year}</b> on <b>{homeworldName}</b>.
        <br />
        <br />
        Specifications :
        <br />
        <b>{people.gender == "male" ? "He " : people.gender == "female" ? "She " : "It "}</b>
        is <b>{people.height}</b>cm tall, 
        <br />
        weighs <b>{people.mass}</b> kg,
        <br />
        has <b>{people.hair_color != "none" && people.hair_color != "n/a" ? people.hair_color : "no" }</b> hair,
        <br />
        <b>{people.eye_color}</b> eyes
        <br />
        and <b>{people.skin_color}</b> skin
      </p>
    </div>
  );
};

export default PeopleDetails;
