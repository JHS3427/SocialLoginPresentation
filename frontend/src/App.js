import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout.jsx';
import { Home } from './pages/Home.jsx';
import { Login } from './pages/Login.jsx';
import { Auth } from './pages/Auth.jsx';
import ScrollToTop from "./components/ScrollToTop.jsx";

import './styles/commons.css';
import './styles/home.css';

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="auth" element={<Auth />} />   
        </Route>
      </Routes>
    </BrowserRouter>
  );
}