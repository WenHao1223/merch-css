import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Cart from './pages/Cart';

import SharedLayout from './pages/SharedNavbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/merch-css/" element={<SharedLayout/>}>
          <Route index element={<Home/>}></Route>
          <Route path="cart" element={<Cart/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
