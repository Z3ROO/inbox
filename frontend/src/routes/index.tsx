import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/HomePage';
import { ErrorRoute } from './Error';
import { RehearsalConfig } from '@/features/rehearsal';

export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rehearsal" element={<RehearsalConfig />} />
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
