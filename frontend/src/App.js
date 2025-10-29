import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout.jsx';
import { Home } from './pages/Home.jsx';
import { Travel } from './pages/Travel.jsx';
import Rental from './pages/Rental.jsx';
import { Support } from './pages/Support.jsx';
import { Login } from './pages/Login.jsx';
import { Auth } from './pages/Auth.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { Terms } from './pages/policies/Terms.jsx';
import { Privacy } from './pages/policies/Privacy.jsx';
import { InternalPolicy } from './pages/policies/InternalPolicy.jsx';
import ScrollToTop from "./components/ScrollToTop.jsx";
import {Products} from "./pages/Products.jsx";

import './styles/commons.css';
import './styles/home.css';
import './styles/travel.css'
import './styles/maps.css'

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rental" element={<Rental />} />
          <Route path="travel" element={<Travel />} />
          <Route path="support" element={<Support />} />
          <Route path="login" element={<Login />} />
          <Route path="auth" element={<Auth />} />   
          <Route path="signUp" element={<SignUp />} />          
          <Route path="policies/terms" element={<Terms />} />
          <Route path="/policies/privacy" element={<Privacy />} />
          <Route path="/policies/internalpolicy" element={<InternalPolicy />} />
          <Route path="product" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}