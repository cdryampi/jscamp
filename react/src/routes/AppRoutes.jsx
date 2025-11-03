import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Home } from '../pages/Home/Home';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Rutas futuras */}
          {/* <Route path="evento/:id" element={<EventDetailPage />} /> */}
          {/* <Route path="eventos" element={<EventosPage />} /> */}
          {/* <Route path="sobre-nosotros" element={<AboutPage />} /> */}
          {/* <Route path="contacto" element={<ContactPage />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};