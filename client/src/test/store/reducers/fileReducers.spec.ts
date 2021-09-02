import { fileEnum } from "../../../store/enum/file.enum";
import {
  fileAvatarUpdateReducer,
  fileS3PostReducer,
  fileSignedUrlReducer,
} from "../../../store/reducers/fileReducers";
import { mockUser } from "../../utils/mocks/mockUser";

describe("fileSignedUrlReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(fileSignedUrlReducer(undefined, {})).toEqual({});
  });

  it("should handle success", () => {
    expect(
      fileSignedUrlReducer(
        {},
        {
          // @ts-ignore
          payload: { presignedURL: "", key: "" },
          type: fileEnum.FILE_URL_SUCCESS,
        }
      )
    ).toEqual({ url: { presignedURL: "", key: "" } });
  });

  it("should handle fail", () => {
    expect(
      fileSignedUrlReducer(
        {},
        // @ts-ignore
        { payload: "error", type: fileEnum.FILE_URL_FAIL }
      )
    ).toEqual({ error: "error" });
  });
});

describe("fileS3PostReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(fileS3PostReducer(undefined, {})).toEqual({});
  });

  it("should handle success", () => {
    expect(
      fileS3PostReducer(
        {},
        // @ts-ignore
        {
          type: fileEnum.FILE_POST_SUCCESS,
        }
      )
    ).toEqual({ success: true });
  });

  it("should handle fail", () => {
    expect(
      fileS3PostReducer(
        {},
        // @ts-ignore
        { payload: "error", type: fileEnum.FILE_POST_FAIL }
      )
    ).toEqual({ error: "error" });
  });
});

describe("fileAvatarUpdateReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(fileAvatarUpdateReducer(undefined, {})).toEqual({});
  });

  it("should handle success", () => {
    expect(
      fileAvatarUpdateReducer(
        {},
        {
          // @ts-ignore
          payload: mockUser,
          type: fileEnum.FILE_AVATAR_UPDATE_SUCCESS,
        }
      )
    ).toEqual({ success: true, user: mockUser });
  });

  it("should handle fail", () => {
    expect(
      fileAvatarUpdateReducer(
        {},
        // @ts-ignore
        { payload: "error", type: fileEnum.FILE_AVATAR_UPDATE_FAIL }
      )
    ).toEqual({ error: "error" });
  });

  it("should handle reset", () => {
    expect(
      fileAvatarUpdateReducer(
        {},
        // @ts-ignore
        { type: fileEnum.FILE_AVATAR_UPDATE_RESET }
      )
    ).toEqual({});
  });
});
