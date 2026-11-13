import { Route, Routes } from 'react-router-dom';

import AppLayout from './components/AppLayout/AppLayout';
import CamperDetailsPage from './pages/CamperDetailsPage/CamperDetailsPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
