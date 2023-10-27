import React, { Component, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Error from './Error';

import SharedLayout from './pages/SharedNavbar';

const App = () => {
  const [data, setData] = useState([
      {
          id: 1,
          title: "Fake hair for bald",
          price: 20,
          des: "Specially for CS students who lose hair when battling with bugs and butterflies.",
          img: [
            "https://torontohairtransplantclinic.com/wp-content/uploads/2017/05/Alopecia-Hair-Loss.jpg",
            "https://i5.walmartimages.com/asr/0d4ad9c0-2999-4091-a2c6-de5fe6058a86_1.6d4f3dd589a70afde41c821d0518c38d.jpeg"
          ],
          quantity: 0,
          available: true
      },
      {
          id: 2,
          title: "C++ Programming Textbook",
          price: 90.5,
          des: "Who else do not want a high-quality programming textbook? Enhancing your skils with this popular programming language!",
          img: [
            "https://sanet.pics/storage-6/0620/l3HJD0MmwqaqM0XI1YsnXPaz8myDTYiN.png"
          ],
          quantity: 0,
          available: false
      },
      {
          id: 3,
          title: "Glorious GMMK PRO Keyboard",
          price: 300,
          des: "This model is best suited with programmers, with its sturdy build quality and portable size.",
          img: [
            "https://cdn.mos.cms.futurecdn.net/QKfSDwu2YF65woEFUBz4Hc-970-80.jpg"
        ],
          quantity: 0,
          available: true
      },
      {
          id: 4,
          title: "Not Fake Google T",
          price: 20,
          des: "Specially for CS students who lose hair when battling with bugs and butterflies.",
          img: [
            "https://i.etsystatic.com/30702661/r/il/fe3766/3175228512/il_fullxfull.3175228512_7d0i.jpg", 
            "https://i.etsystatic.com/23151672/r/il/ecc9a9/2376537189/il_1588xN.2376537189_o36w.jpg"
          ],
          quantity: 0,
          available: true
      },
      {
          id: 5,
          title: "Bugs",
          price: 10,
          des: "Just normal insects. No code please.",
          img: [
            "https://www.petful.com/wp-content/uploads/2018/01/pet-tarantula-750x527.jpg"
        ],
          quantity: 0,
          available: true
      },
      {
          id: 6,
          title: "iPhone 15 Pro",
          price: 6000,
          des: "CS Students always day-dream of that.",
          img: [
            "https://photos5.appleinsider.com/gallery/51707-102459-iPhone-15-Ultra-colors-xl.jpg",
            "https://www.91-cdn.com/pricebaba-blogimages/wp-content/uploads/2022/12/iPhone-15-Ultra.jpg",
            "https://backend.mobilizujeme.cz/wp-content/uploads/2022/11/iphone-15.jpg"
          ],
          quantity: 0,
          available: true
      },
  ]);
  
  const [quantitySum, setQuantitySum] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/merch-css/" element={<SharedLayout data={data} quantitySum={quantitySum}/>}> */}
        <Route path="/" element={<SharedLayout data={data} quantitySum={quantitySum}/>}>
          <Route index element={<Home data={data} quantitySum={quantitySum} setQuantitySum={setQuantitySum}/>}></Route>
          <Route path="cart" element={<Cart data={data} quantitySum={quantitySum} setQuantitySum={setQuantitySum}/>}></Route>
          <Route path="*" element={<Error/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
