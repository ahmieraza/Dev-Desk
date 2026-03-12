import { useState, FormEvent, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, CheckCircle, AlertCircle, Plus, Trash2, Type, Phone, Tag, Link as LinkIcon } from 'lucide-react';

const HeaderSettings = () => {
  const { content, updateContent } = useContent();
  
  // Initialize with current content or fallback to actual website data
  const initialData = {
    logoText: content?.header?.logoText || 'DevDesk',
    contactNumber: content?.header?.contactNumber || '+92 304 7974977',
    navLinks: content?.header?.navLinks || [
      { id: '1', label: 'Home', path: '/' },
      { id: '2', label: 'Services', path: '/services' },
      { id: '3', label: 'Portfolio', path: '/portfolio' },
      { id: '4', label: 'Pricing', path: '/pricing' },
      { id: '5', label: 'Contact', path: '/contact' },
    ],
  };

  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update form when content changes
  useEffect(() => {
    if (content?.header) {
      setFormData({
        logoText: content.header.logoText,
        contactNumber: content.header.contactNumber,
        navLinks: content.header.navLinks,
      });
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNavLinkChange = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      navLinks: formData.navLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    });
  };

  const addNavLink = () => {
    const newLink = {
      id: Date.now().toString(),
      label: 'New Link',
      path: '/',
    };
    setFormData({
      ...formData,
      navLinks: [...formData.navLinks, newLink],
    });
  };

  const removeNavLink = (id: string) => {
    if (confirm('Are you sure you want to remove this navigation link?')) {
      setFormData({
        ...formData,
        navLinks: formData.navLinks.filter(link => link.id !== id),
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      if (!content) throw new Error('Content not loaded');

      updateContent({
        ...content,
        header: {
          logoText: formData.logoText,
          contactNumber: formData.contactNumber,
          navLinks: formData.navLinks,
        },
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Header Settings</h2>
        <p className="text-gray-600">Manage your website header and navigation</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">Changes saved successfully!</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">Error: {error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Text <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="logoText"
                value={formData.logoText}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
                placeholder="Enter logo text"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">The brand name displayed in the header</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
                placeholder="+92 304 7974977"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">Phone number shown in the header</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Navigation Links</h3>
            <button
              type="button"
              onClick={addNavLink}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </button>
          </div>

          <div className="space-y-4">
            {formData.navLinks.map((link) => (
              <div key={link.id} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-3">
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => handleNavLinkChange(link.id, 'label', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      placeholder="Link Label (e.g., Home)"
                    />
                  </div>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={link.path}
                      onChange={(e) => handleNavLinkChange(link.id, 'path', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      placeholder="Path (e.g., /home)"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeNavLink(link.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeaderSettings;
