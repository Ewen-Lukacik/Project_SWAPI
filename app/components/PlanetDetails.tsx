import { Planet } from "@/types/planet";

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

function formatNumber(num: number | string): string {
  if (typeof num === "string") {
    num = parseInt(num, 10);
  }
  if (isNaN(num)) return "Unknown";

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

const PlanetDetails = async ({ planet }: { planet: Planet }) => {

  return (
    <div className="people-detail">
      <h1 className="text-yellow-400 flex justify-center text-2xl">{planet.name}</h1>
      <br />
      <p>
      Is a <b>{planet.climate}</b> planet, in which you may find these terrains :  
      <br />
      <b>{planet.terrain}</b>.
      <br />
      <br />
      It completes a rotation on itself in <b>{planet.rotation_period}</b> days and make a full orbital cycle in <b>{planet.orbital_period}</b> days
      <br />
      <br />
      We can count about <b>{formatNumber(planet.population)}</b> people living  on <b>{planet.name}</b>
      </p>
    </div>
  );
};

export default PlanetDetails;
