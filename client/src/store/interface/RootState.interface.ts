export interface RootState {
  userLogin: { loading: boolean; error: string; userInfo: Object | any };

  userRegister: { loading: boolean; error: string; userInfo: Object | any };

  authenticatedUser: { loading: boolean; error: string; user: Object | any };

  emailConfirmation: {
    loading: boolean;
    success: boolean;
    error: string;
  };

  resendEmail: {
    loading: boolean;
    success: boolean;
    error: string;
  };

  userGetDetails: {
    loading: boolean;
    error: string;
    user: Object | any;
  };

  userUpdate: {
    loading: boolean;
    error: string;
    success: boolean;
  };

  userList: {
    loading: boolean;
    error: string;
    users: Array<Object>;
  };

  userDelete: {
    success: boolean;
  };

  userAdminUpdate: {
    loading: boolean;
    error: string;
    success: boolean;
  };

  postList: {
    loading: boolean;
    error: string;
    posts: Array<Object>;
  };

  postGetDetails: {
    loading: boolean;
    error: string;
    post: Object | any;
  };

  postCreate: {
    success: boolean;
    error: string;
  };

  postDelete: {
    success: boolean;
    error: string;
  };

  postLike: { success: boolean; error: string };

  linesList: { loading: boolean; error: string; lines: Array<Object> };

  getLocation: {
    loading: boolean;
    error: string;
    line: Object | any;
  };

  fileSignedUrl: {
    loading: boolean;
    error: string;
    url: Object | any;
  };

  fileS3Post: {
    loading: boolean;
    error: string;
    success: boolean;
  };

  fileAvatarUpdate: {
    loading: boolean;
    error: string;
    success: boolean;
  };
}
