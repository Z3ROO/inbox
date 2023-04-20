import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/HomePage';
import { ErrorRoute } from './Error';

export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
