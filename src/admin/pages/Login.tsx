import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';
import { getAdminCredentials } from '../utils/storage';
import { verifyPassword, createSession } from '../utils/auth';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const admin = getAdminCredentials();
      
      if (username !== admin.username) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      const isValid = await verifyPassword(password, admin.passwordHash);
      
      if (!isValid) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      createSession(username);
      navigate('/admin');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-primary/10 to-primary/5'} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${theme === 'dark' ? 'bg-primary/20' : 'bg-primary/10'} mb-4`}>
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-2`}>Admin Login</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>DevDesk Admin Panel</p>
          </div>

          {error && (
            <div className={`mb-6 p-4 ${theme === 'dark' ? 'bg-red-900/30 border-red-800' : 'bg-red-50 border-red-200'} border rounded-lg flex items-start gap-3`}>
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-800'}`}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Username
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-500' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                  } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-500' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                  } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
