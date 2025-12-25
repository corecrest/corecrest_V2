import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Blog from './Pages/Blog';
import BlogPost from './Pages/BlogPost';
import Contact from './Pages/Contact';
import BookConsultation from './Pages/BookConsultation';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
        <Route path="/about" element={<Layout currentPageName="About"><About /></Layout>} />
        <Route path="/services" element={<Layout currentPageName="Services"><Services /></Layout>} />
        <Route path="/blog" element={<Layout currentPageName="Blog"><Blog /></Layout>} />
        <Route path="/blog-post" element={<Layout currentPageName="BlogPost"><BlogPost /></Layout>} />
        <Route path="/contact" element={<Layout currentPageName="Contact"><Contact /></Layout>} />
        <Route path="/book-consultation" element={<Layout currentPageName="BookConsultation"><BookConsultation /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

