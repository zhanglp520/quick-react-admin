import { Suspense } from "react";
import Router from "@/router";
import AuthRouter from "./router/AuthRouter";
import "./App.css";

function App() {
  return (
    <>
      <Suspense
        key={Date.now()}
        fallback={<div className="loadding">loadding</div>}
      >
        <Router />
        <AuthRouter></AuthRouter>
      </Suspense>
    </>
  );
}
export default App;
