import { Routes, Route } from "react-router-dom";

import ProductsPage from "./pages/products";
import CheckoutPage from "./pages/checkout"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
