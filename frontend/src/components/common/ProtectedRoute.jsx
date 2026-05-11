import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth.jsx';
import { useLanguage } from '../../i18n.jsx';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const { strings } = useLanguage();
  const system = strings.system;
  const location = useLocation();

  if (loading) {
    return (
      <section className="page-wrap page-placeholder">
        <h2>{system.checkingPassTitle}</h2>
        <p>{system.checkingPassDesc}</p>
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

