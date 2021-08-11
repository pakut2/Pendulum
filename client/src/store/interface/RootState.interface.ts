export interface RootState {
  userLogin: { loading: boolean; error: string; userInfo: Object | any };

  userRegister: { loading: boolean; error: string; userInfo: Object | any };

  authenticatedUser: { loading: boolean; error: string; user: Object | any };

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

  postCreate: {
    success: boolean;
    error: string;
  };

  postDelete: {
    success: boolean;
    error: string;
  };

  linesList: { loading: boolean; error: string; lines: Array<Object> };
}
