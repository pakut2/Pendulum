import axios from "axios";
import { getLocation, listLines } from "../../api/ztm";

describe("when listing lines", () => {
  it("should return filtered lines", async () => {
    jest.spyOn(axios, "get").mockReturnValue(
      Promise.resolve({
        data: { index: { routes: [{ line: "111", agencyId: 1 }] } },
      })
    );

    const lines = await listLines();

    expect(lines).toEqual([{ line: "111", agencyId: 1 }]);
  });
});

describe("when getting the location", () => {
  it("should return the location based on VehicleCode", async () => {
    jest.spyOn(axios, "get").mockReturnValue(
      Promise.resolve({
        data: { Vehicles: [{ line: "111", VehicleCode: "1" }] },
      })
    );

    const lines = await getLocation("1");

    expect(lines).toEqual({ line: "111", VehicleCode: "1" });
  });
});
