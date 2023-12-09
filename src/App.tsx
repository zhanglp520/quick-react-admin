import { useRoutes } from "react-router-dom";
// import { RouterProvider } from "react-router-dom";
// import { Route, Routes, useRoutes } from "react-router-dom";
// import Home from "./views/home";
// import User from "./views/system/user";
// import NotFound from "./pages/404";
// import Layout1 from "./layout";
import { router } from "@/router";
// import { Suspense } from "react";
import "./App.css";
import staticRouter from "@/router/staticRouter";
import { Suspense } from "react";
// import { Spin } from "antd";

function App() {
  const element = useRoutes(staticRouter);
  return (
    <Suspense
      fallback={
        <div className="loadding">
          loadding
          {/* <Spin  /> */}
        </div>
      }
    >
      {[element]}
    </Suspense>
  );
  console.log("App-router", router);
}

// function App() {
//   console.log('staticRouter11',router);
//   return (
//     <div className="app">
//       <RouterProvider router={router}></RouterProvider>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout1 />}>
//         <Route path="/home" element={<Home />} />
//         <Route path="/user" Component={() => <User />} />
//       </Route>
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

export default App;
