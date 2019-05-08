import * as React from "react";
import { T_Navigate, T_Location, T_History } from "./history";

type T_LocationContext = {
  navigate: T_Navigate;
  location: T_Location;
};
const LocationContext = React.createContext<T_LocationContext>(null);

export const LocationProvider: React.FC<{ history: T_History }> = ({
  children,
  history
}) => {
  const getContext = (): T_LocationContext => {
    const { navigate, location } = history;
    return { navigate, location };
  };

  const [context, setContext] = React.useState<T_LocationContext>(() =>
    getContext()
  );

  React.useEffect(() => {
    const unlisten = history.listen(() => {
      setContext(getContext());
    });

    return unlisten;
  }, []);

  return (
    <LocationContext.Provider value={context}>
      {typeof children === "function" ? children(context) : children || null}
    </LocationContext.Provider>
  );
};
type T_Route = {
  value: React.ReactElement;
  path: string;
};
const createRoute = (element): T_Route => {
  return {
    value: element,
    path: element.props.path
  };
};

const pick = (pathname: string, routes: T_Route[]) => {
  return routes.find(route => route.path === pathname);
};
export const Router = ({ children }) => {
  const location = React.useContext(LocationContext);
  const { pathname } = location.location;
  let routes = React.Children.map(children, createRoute);
  const match = pick(pathname, routes);
  return match ? React.cloneElement(match.value, location) : null;
};

export const Route = ({ path, comp, ...props }) => {
  let Comp = comp;
  return <Comp {...props} />;
};

interface LinkProps {
  to: string;
  state?: any;
  replace?: boolean;
}

export const Link: React.FC<LinkProps & React.HTMLProps<HTMLAnchorElement>> = ({
  to,
  state,
  replace,
  ...aProps
}) => {
  const location = React.useContext<T_LocationContext>(LocationContext);
  const { navigate } = location;

  const href = to;
  return (
    <a
      {...aProps}
      href={href}
      onClick={event => {
        event.preventDefault();
        navigate(href, { state, replace });
      }}
    />
  );
};
