import { useState, FormEvent, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, CheckCircle, AlertCircle, Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

const ContactSettings = () => {
  const { content, updateContent } = useContent();
  
  // Initialize with current content or fallback to actual website data
  const initialData = {
    phone: content?.contact?.phone || '+92 304 7974977',
    whatsapp: content?.contact?.whatsapp || '+92 304 7974977',
    email: content?.contact?.email || 'azlanshahidd@gmail.com',
    address: content?.contact?.address || 'Sahiwal, Pakistan',
    workingHours: content?.contact?.workingHours || 'Mo-Su 00:00-23:59',
  };

  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update form when content changes
  useEffect(() => {
    if (content?.contact) {
      setFormData({
        phone: content.contact.phone,
        whatsapp: content.contact.whatsapp,
        email: content.contact.email,
        address: content.contact.address,
        workingHours: content.contact.workingHours,
      });
    }
  }, [content]);

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
        contact: formData,
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Settings</h2>
        <p className="text-gray-600">Manage your contact information</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-green-900">Changes saved successfully!</p>
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
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="+92 304 7974977"
              required
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Primary contact phone number</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="+92 304 7974977"
              required
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">WhatsApp number for quick messaging</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="azlanshahidd@gmail.com"
              required
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Primary email for contact inquiries</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Sahiwal, Pakistan"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Business location or city</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Working Hours
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Mo-Su 00:00-23:59"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Business operating hours</p>
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

export default ContactSettings;
