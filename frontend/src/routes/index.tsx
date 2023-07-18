import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/HomePage';
import { ErrorRoute } from './Error';
import * as Goals from '@/features/goals';

export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/goals" element={<Goals.Manager />} />
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
