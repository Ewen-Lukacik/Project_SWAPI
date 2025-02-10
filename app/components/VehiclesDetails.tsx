import { Vehicle } from "@/types/vehicle";

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

const VehiclesDetails = async ({ vehicles }: { vehicles: Vehicle }) => {

  return (
    <div className="people-detail">
      <h1 className="text-yellow-400 flex justify-center text-2xl">{vehicles.name}</h1>
    
      <br />
      <br />
      Full model name :
      <br />
      <b>{vehicles.model}</b>
      <br />
      Class : <b>{vehicles.vehicle_class}</b>
      <br />
      <br />
      Manufacturer :
      <br />
      <b>{vehicles.manufacturer}</b>
      <br />
      <br />
      Cost : 
      {vehicles.cost_in_credits != "unknown" ? <b>{formatNumber(vehicles.cost_in_credits)}</b> + "credits" : " No known cost" }
      <br />
      <br />
      Length : 
      <b>{vehicles.length}</b>m
      <br />
      <br />
      There are <b>{vehicles.crew}</b> crew members in this vehicle, 
      and it can store enough consumables for <b>{vehicles.consumables}</b>
      <br />
    </div>
  );
};

export default VehiclesDetails;
