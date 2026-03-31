import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;