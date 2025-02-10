import { Starships } from "@/types/starship";

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

const StarshipsDetails = async ({ starships }: { starships: Starships }) => {

  return (
    <div className="people-detail">
      <h1 className="text-yellow-400 flex justify-center text-2xl">{starships.name}</h1>
    
      <br />
      <br />
      Full model name :
      <br />
      <b>{starships.model}</b>
      <br />
      <br />
      Manufacturer :
      <br />
      <b>{starships.manufacturer}</b>
      <br />
      <br />
      Cost : 
      <b>{formatNumber(starships.cost_in_credits)}</b> credits
      <br />
      <br />
      Length : 
      <b>{starships.length}</b>m
      <br />
      <br />
      There are <b>{starships.crew}</b> crew members in this starship, 
      and it can store enough consumables for <b>{starships.consumables}</b>
      <br />
    </div>
  );
};

export default StarshipsDetails;
