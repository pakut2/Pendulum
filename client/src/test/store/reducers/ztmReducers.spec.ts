import { ztmEnum } from "../../../store/enum/ztm.enum";
import {
  getLocationReducer,
  linesListReducer,
} from "../../../store/reducers/ztmReducers";

describe("linesListReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(linesListReducer(undefined, {})).toEqual({ lines: [] });
  });

  it("should handle request", () => {
    expect(
      linesListReducer(
        { lines: [] },
        // @ts-ignore
        { type: ztmEnum.ZTM_LIST_DETAILS_REQUEST }
      )
    ).toEqual({ loading: true, lines: [] });
  });

  it("should handle success", () => {
    expect(
      linesListReducer(
        { lines: [] },
        // @ts-ignore
        { payload: [{ line: "111" }], type: ztmEnum.ZTM_LIST_DETAILS_SUCCESS }
      )
    ).toEqual({ loading: false, lines: [{ line: "111" }] });
  });

  it("should handle fail", () => {
    expect(
      linesListReducer(
        { lines: [] },
        // @ts-ignore
        { payload: "error", type: ztmEnum.ZTM_LIST_DETAILS_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      linesListReducer(
        { lines: [] },
        // @ts-ignore
        { type: ztmEnum.ZTM_LIST_DETAILS_RESET }
      )
    ).toEqual({ lines: [] });
  });
});

describe("getLocationReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(getLocationReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      getLocationReducer(
        {},
        // @ts-ignore
        { type: ztmEnum.ZTM_GET_LOCATION_REQUEST }
      )
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      getLocationReducer(
        {},
        // @ts-ignore
        { payload: { line: "111" }, type: ztmEnum.ZTM_GET_LOCATION_SUCCESS }
      )
    ).toEqual({ loading: false, line: { line: "111" } });
  });

  it("should handle fail", () => {
    expect(
      getLocationReducer(
        {},
        // @ts-ignore
        { payload: "error", type: ztmEnum.ZTM_GET_LOCATION_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      getLocationReducer(
        {},
        // @ts-ignore
        { type: ztmEnum.ZTM_GET_LOCATION_RESET }
      )
    ).toEqual({});
  });
});
