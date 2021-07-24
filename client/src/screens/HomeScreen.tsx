import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthenticatedUser } from "../actions/userActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const authenticatedUser = useSelector(
    (state: any) => state.authenticatedUser
  );
  const { user } = authenticatedUser;

  useEffect(() => {
    if (!user) {
      dispatch(getAuthenticatedUser());
    }
  }, [getAuthenticatedUser, user, dispatch]);

  return (
    <div>
      <h1>hello there</h1>
    </div>
  );
};

export default HomeScreen;
