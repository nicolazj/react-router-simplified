import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

interface Post {
  title: string;
}
function App() {
  const [post] = React.useState<Post | null>(null);

  return (
    <div className="App">
      <div>{post}</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
