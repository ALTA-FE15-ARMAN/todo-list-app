import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Detail from "./pages/Detail/Index";
import Product from "./pages/Product/Index";

const App = () => {
  axios.defaults.baseURL = "https://api.todoist.com/";

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Product />} path="/" />
        <Route element={<Detail />} path="/detail/:id" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;