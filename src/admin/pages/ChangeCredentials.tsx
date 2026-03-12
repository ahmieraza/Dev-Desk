import { useState, FormEvent } from 'react';
import { Key, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { getAdminCredentials, updateAdminCredentials } from '../utils/storage';
import { verifyPassword, hashPassword } from '../utils/auth';

const ChangeCredentials = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const admin = getAdminCredentials();

      // Verify current password
      const isValid = await verifyPassword(formData.currentPassword, admin.passwordHash);
      if (!isValid) {
        throw new Error('Current password is incorrect');
      }

      // Validate new username
      if (!formData.newUsername.trim()) {
        throw new Error('New username is required');
      }

      if (formData.newUsername.length < 3) {
        throw new Error('Username must be at least 3 characters long');
      }

      // Validate new password
      if (!formData.newPassword) {
        throw new Error('New password is required');
      }

      if (formData.newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Hash new password
      const newPasswordHash = await hashPassword(formData.newPassword);

      // Update credentials
      updateAdminCredentials({
        username: formData.newUsername,
        passwordHash: newPasswordHash,
      });

      setSuccess(true);
      setFormData({
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update credentials');
    } finally {
      setSaving(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const currentAdmin = getAdminCredentials();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Change Credentials</h2>
        <p className="text-gray-600">Update your admin username and password</p>
      </div>

      {/* Current Credentials Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Key className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900">Current Username</p>
            <p className="text-sm text-blue-700 mt-1">{currentAdmin.username}</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">Credentials updated successfully!</p>
            <p className="text-sm text-green-700 mt-1">Your login credentials have been changed. Please use the new credentials for future logins.</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">Error updating credentials</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter current password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">Verify your identity with your current password</p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Credentials</h3>

          {/* New Username */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="newUsername"
              value={formData.newUsername}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter new username"
              required
              minLength={3}
            />
            <p className="text-sm text-gray-500 mt-1">Minimum 3 characters</p>
          </div>

          {/* New Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">Minimum 6 characters</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Security Notice:</strong> After changing your credentials, you will need to use the new username and password for all future logins. Make sure to remember them!
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Key className="w-5 h-5" />
            {saving ? 'Updating...' : 'Update Credentials'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeCredentials;
