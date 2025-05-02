import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home';
import DetailPage from '../pages/detail/page';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id/:title" element={<DetailPage />} />
    </Routes>
  );
}
