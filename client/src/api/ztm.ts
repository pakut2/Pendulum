import axios from "axios";

export const listLines = async () => {
  let { data } = await axios.get(
    "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851/download/routes.json"
  );

  data = data[Object.keys(data)[0]].routes;

  const validData: Array<Object> = [];

  data.forEach((route: any) => {
    if (route.agencyId === 1 || route.agencyId === 2) {
      validData.push(route);
    }
  });

  return validData;
};

export const getLocation = async (vehicleCode: string) => {
  const { data } = await axios.get(
    "https://ckan2.multimediagdansk.pl/gpsPositions"
  );

  let validData;

  data.Vehicles.forEach((line: any) => {
    if (vehicleCode === line.VehicleCode) {
      validData = line;
    }
  });

  return validData;
};
