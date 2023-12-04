import { useRoutes } from "react-router-dom";
// import { Route, Routes, useRoutes } from "react-router-dom";
// import Home from "./views/home";
// import User from "./views/system/user";
// import NotFound from "./pages/404";
// import Layout1 from "./layout";
import staticRouter from "./router/staticRouter";
// import {addRoutes} from "./router/dynamicRouter";
import { Suspense } from "react";
import './App.css'

function App() {
  const element = useRoutes(staticRouter);
  // const element = useRoutes(addRoutes());
  return <Suspense fallback={<div>Loadding...</div>}>{element}</Suspense>;
}

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
