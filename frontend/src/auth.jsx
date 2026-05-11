import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { firebaseAuth, isFirebaseConfigured } from './firebase.jsx';

const AuthContext = createContext(null);

function friendlyError(error) {
  const code = error?.code || '';

  if (code.includes('auth/invalid-email')) return 'Email không hợp lệ / invalid email.';
  if (code.includes('auth/user-not-found')) return 'Không tìm thấy tài khoản / user not found.';
  if (code.includes('auth/wrong-password')) return 'Sai mật khẩu / wrong password.';
  if (code.includes('auth/email-already-in-use')) return 'Email đã được dùng / email already in use.';
  if (code.includes('auth/weak-password')) return 'Mật khẩu quá yếu / weak password.';
  if (code.includes('auth/too-many-requests')) return 'Thử lại sau một chút / too many requests.';
  if (code.includes('auth/popup-closed-by-user')) return 'Bạn đã đóng cửa sổ đăng nhập Google.';
  if (code.includes('auth/cancelled-popup-request')) return 'Yêu cầu đăng nhập đã bị hủy.';
  if (code.includes('auth/popup-blocked')) return 'Trình duyệt đã chặn popup Google. Hãy cho phép popup và thử lại.';
  if (!isFirebaseConfigured) return 'Firebase chưa được cấu hình. Hãy điền file `.env` ở frontend trước.';

  return error?.message || 'Đã có lỗi xảy ra / something went wrong.';
}

function toUserProfile(nextUser) {
  if (!nextUser) {
    return null;
  }

  return {
    uid: nextUser.uid,
    email: nextUser.email || '',
    displayName: nextUser.displayName || nextUser.email?.split('@')[0] || 'Cat User',
    photoURL: nextUser.photoURL || '',
    providerId: nextUser.providerData?.[0]?.providerId || 'password',
    emailVerified: Boolean(nextUser.emailVerified),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const googleProvider = useMemo(() => new GoogleAuthProvider(), []);

  useEffect(() => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      setLoading(false);
      setError('Firebase chưa được cấu hình. Hãy điền file `.env` ở frontend trước.');
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser);
      setUserProfile(toUserProfile(nextUser));
      setLoading(false);
      setError('');
    });

    return unsubscribe;
  }, []);

  const ensureConfigured = () => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      throw new Error('Firebase chưa được cấu hình. Hãy điền file `.env` ở frontend trước.');
    }
  };

  const authApi = useMemo(
    () => ({
      user,
      userProfile,
      loading,
      error,
      isFirebaseConfigured,
      clearError: () => setError(''),
      login: async (email, password) => {
        setError('');
        try {
          ensureConfigured();
          const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
          setUser(credential.user);
          setUserProfile(toUserProfile(credential.user));
          return credential.user;
        } catch (err) {
          const message = friendlyError(err);
          setError(message);
          throw new Error(message);
        }
      },
      register: async (email, password, displayName) => {
        setError('');
        try {
          ensureConfigured();
          const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          if (displayName) {
            await updateProfile(credential.user, { displayName });
          }
          setUser(credential.user);
          setUserProfile(toUserProfile({ ...credential.user, displayName: displayName || credential.user.displayName }));
          return credential.user;
        } catch (err) {
          const message = friendlyError(err);
          setError(message);
          throw new Error(message);
        }
      },
      loginWithGoogle: async () => {
        setError('');
        try {
          ensureConfigured();
          const credential = await signInWithPopup(firebaseAuth, googleProvider);
          setUser(credential.user);
          setUserProfile(toUserProfile(credential.user));
          return credential.user;
        } catch (err) {
          const message = friendlyError(err);
          setError(message);
          throw new Error(message);
        }
      },
      logout: async () => {
        setError('');
        ensureConfigured();
        await signOut(firebaseAuth);
        setUser(null);
        setUserProfile(null);
      },
      resetPassword: async (email) => {
        setError('');
        try {
          ensureConfigured();
          await sendPasswordResetEmail(firebaseAuth, email);
        } catch (err) {
          const message = friendlyError(err);
          setError(message);
          throw new Error(message);
        }
      },
    }),
    [user, userProfile, loading, error, googleProvider]
  );

  return <AuthContext.Provider value={authApi}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
