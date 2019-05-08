type T_Action = "PUSH" | "POP";

export type T_Location = {
  pathname: string;
  search: string;
};

export type T_Navigate = {
  (
    to: string,
    options: {
      state: any;
      replace: boolean;
    }
  ): void;
};
type T_Listener = {
  ({ location, action }: { location: T_Location; action: T_Action }): void;
};
export type T_History = {
  location: T_Location;
  navigate: T_Navigate;
  listen: (listerner: T_Listener) => () => void;
};

let getLocation = (source: Window): T_Location => {
  const { pathname, search } = source.location;
  return {
    pathname,
    search
  };
};

let createHistory = (source): T_History => {
  let listeners: T_Listener[] = [];
  let location = getLocation(source);

  return {
    get location() {
      return location;
    },

    listen(listener) {
      listeners.push(listener);

      return () => {
        listeners = listeners.filter(fn => fn !== listener);
      };
    },

    navigate(to, { state, replace } = { state: {}, replace: false }) {
      state = { ...state, key: Date.now() + "" };
      if (replace) {
        source.history.replaceState(state, null, to);
      } else {
        source.history.pushState(state, null, to);
      }

      location = getLocation(source);
      listeners.forEach(listener => listener({ location, action: "PUSH" }));
    }
  };
};

let globalHistory = createHistory(window);
let { navigate } = globalHistory;

export { globalHistory, navigate, createHistory };
