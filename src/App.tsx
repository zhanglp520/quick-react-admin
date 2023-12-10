import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { router } from "@/router";
import staticRouter from "@/router/staticRouter";
import "./App.css";

function App() {
  const element = useRoutes(staticRouter);
  console.log("App-router", router);
  return (
    <Suspense
      key={Date.now()}
      fallback={<div className="loadding">loadding</div>}
    >
      {element}

      {/* {[element]} */}
    </Suspense>
  );
}
export default App;
