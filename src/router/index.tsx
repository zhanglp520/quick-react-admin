// import { createBrowserRouter } from "react-router-dom";
// import staticRouter from "./staticRouter";
// import { addRoutes } from "./dynamicRouter";

// const routerData = addRoutes();
// const routes = [...staticRouter];
// routes[0].children?.push(...routerData);
// export const router = createBrowserRouter([...routes]);
// console.log("router.routes", router.routes);

import { createBrowserRouter } from "react-router-dom";
import staticRouter from "./staticRouter";

export const router = createBrowserRouter([...staticRouter]);
console.log('staticRouter',staticRouter);
