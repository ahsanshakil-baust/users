import React from "react";
import Layout from "./components/Layout";
import { Routers } from "./components/Routers";

import { DataProvider } from "./contextApi/context";
import "./css/app.css";

const App = () => {
  return (
    <DataProvider>
      <Layout>
        <Routers />
      </Layout>
    </DataProvider>
  );
};

export default App;
