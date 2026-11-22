import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { Toaster } from '@/components/ui/sonner'
import { FilmesPage } from '@/pages/FilmesPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SobrePage } from '@/pages/SobrePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<FilmesPage />} />
          <Route path="sobre" element={<SobrePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  )
}