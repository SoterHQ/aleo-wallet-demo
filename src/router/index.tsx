import {RouteObject} from "react-router";
import Home from "../page/home";
import Decrypt from "../page/decrypt";
import Transfer from "../page/transfer";
import Sign from "../page/sign";
import Execute from "../page/Execute";
import Records from "../page/records";
import PrivacyPolicy from "../page/PrivacyPolicy";
import DeployPage from "../page/deploy";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/decrypt",
        element: <Decrypt/>,
    },
    {
        path: "/transfer",
        element: <Transfer/>,
    },
    {
        path: "/sign",
        element: <Sign/>,
    },    {
        path: "/records",
        element: <Records/>,
    },
    {
      path: "/execute",
      element: <Execute/>,
  },
    {
        path: "/deploy",
        element: <DeployPage/>,
    },
    {
        path: "/PrivacyPolicy",
        element: <PrivacyPolicy/>,
    },
];

export default routes