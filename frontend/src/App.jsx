import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingScreen from './components/common/LoadingScreen';
import { useAuth } from './auth.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import MeowDex from './pages/MeowDex';
import PurrLounge from './pages/PurrLounge';
import BeatPaws from './pages/BeatPaws';
import ClawMart from './pages/ClawMart';
import MewSeum from './pages/MewSeum';
import TopPaw from './pages/TopPaw';

function AppRoutes() {
  const location = useLocation();

  return (
    <main className="route-screen">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Legacy redirects */}
        <Route path="/rooms" element={<Navigate to="/purrlounge" replace />} />
        <Route path="/gallery" element={<Navigate to="/mewseum" replace />} />
        <Route path="/leaderboard" element={<Navigate to="/toppaw" replace />} />
        <Route path="/shop" element={<Navigate to="/clawmart" replace />} />
        <Route path="/profile/:id" element={<Navigate to="/meowdex/:id" replace />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/meowdex/:id" element={<MeowDex />} />
          <Route path="/purrlounge" element={<PurrLounge />} />
          <Route path="/purrlounge/:id/beatpaws" element={<BeatPaws />} />
          <Route path="/clawmart" element={<ClawMart />} />
          <Route path="/mewseum" element={<MewSeum />} />
          <Route path="/toppaw" element={<TopPaw />} />
        </Route>
      </Routes>
    </main>
  );
}

export default function App() {
  const { loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}
