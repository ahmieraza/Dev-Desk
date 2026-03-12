import { useState, FormEvent } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

const FooterSettings = () => {
  const { content, updateContent } = useContent();
  const [formData, setFormData] = useState({
    description: content?.footer?.description || '',
    copyrightText: content?.footer?.copyrightText || '',
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (!content) throw new Error('Content not loaded');

      updateContent({
        ...content,
        footer: {
          ...content.footer,
          description: formData.description,
          copyrightText: formData.copyrightText,
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Footer Settings</h2>
        <p className="text-gray-600">Manage your website footer content</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-green-900">Footer settings saved successfully!</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-red-900">Error: {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Footer Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Professional digital solutions for businesses..."
          />
          <p className="text-sm text-gray-500 mt-1">Brief description shown in footer</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Copyright Text <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="copyrightText"
            value={formData.copyrightText}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="© 2024 DevDesk. All rights reserved."
            required
          />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
          <div className="bg-gray-900 text-white rounded-lg p-6">
            <p className="text-sm text-gray-300 mb-4">{formData.description || 'Footer description will appear here'}</p>
            <p className="text-xs text-gray-400">{formData.copyrightText || 'Copyright text will appear here'}</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
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

export default FooterSettings;
