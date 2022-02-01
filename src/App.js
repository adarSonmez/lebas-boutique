import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shop/ShopPage';
import './App.scss';
import Header from './components/header/Header';
import SignIn from './pages/sign-in/SignIn';
import { useAuth } from './firebase/auth';
import { createUserProfileDocument } from './firebase/firestore';

function App() {
  const currentUser = useAuth();
  createUserProfileDocument(currentUser, {});

  return (
    // Define elements corresponding to each path.
    <div className="App">
      <Header currentUser={currentUser} />
      <div>{currentUser?.displayName}</div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signin" element={<SignIn userAuth={currentUser} />} />
      </Routes>
    </div>
  );
}

export default App;
