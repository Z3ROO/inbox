import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/HomePage';
import { ErrorRoute } from './Error';
import { UIDocumentationPage } from '@/features/UIDoc';

export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/uidoc" element={<UIDocumentationPage />} />
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
