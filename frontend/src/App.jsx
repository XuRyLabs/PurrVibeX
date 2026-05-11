import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingScreen from './components/common/LoadingScreen';
import { useAuth } from './auth.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Profile from './pages/Profile';
import Rooms from './pages/Rooms';
import MusicRoom from './pages/MusicRoom';
import Shop from './pages/Shop';
import Gallery from './pages/Gallery';
import Leaderboard from './pages/Leaderboard';

function AppRoutes() {
  const location = useLocation();

  return (
    <main className="route-screen">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id/music" element={<MusicRoom />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
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
