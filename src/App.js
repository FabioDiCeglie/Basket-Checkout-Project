import { Routes, Route } from "react-router-dom";

import ProductsPage from "./pages/products";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;
