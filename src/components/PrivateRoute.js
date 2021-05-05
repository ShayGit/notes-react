import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
