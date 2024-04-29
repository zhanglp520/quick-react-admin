import { Suspense } from "react";

import Router from "@/router";
import "./App.css";

function App() {
  return (
    // <Suspense
    //   key={Date.now()}
    //   fallback={<div className="loadding">loadding</div>}
    // >
    //   <Router />
    // </Suspense>
    <Router />
  );
}
export default App;
