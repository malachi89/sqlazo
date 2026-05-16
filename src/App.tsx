import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { SchemaProvider } from './context/SchemaContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { CoursePage } from './pages/CoursePage';
import { LessonPage } from './pages/LessonPage';
import { ExerciseBankPage } from './pages/ExerciseBankPage';
import { DashboardPage } from './pages/DashboardPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
      <Route path="/curso/:nivel" element={<Layout><CoursePage /></Layout>} />
      <Route path="/leccion/:nivel/:moduloId/:leccionId" element={<Layout><LessonPage /></Layout>} />
      <Route path="/ejercicios" element={<Layout mostrarSidebar={false}><ExerciseBankPage /></Layout>} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <SchemaProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        </SchemaProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
