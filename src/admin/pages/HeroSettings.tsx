import { useState, FormEvent, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, CheckCircle, AlertCircle, Heading, FileText, MousePointer, Link as LinkIcon } from 'lucide-react';

const HeroSettings = () => {
  const { content, updateContent } = useContent();
  
  // Initialize with current content or fallback to actual website data
  const initialData = {
    mainHeading: content?.hero?.mainHeading || 'Build Your Digital Presence and Projects with Experts',
    subheading: content?.hero?.subheading || 'Websites, Apps, Assignments, and Branding — Done for You',
    ctaButtonText: content?.hero?.ctaButtonText || "Let's Build Your Idea",
    ctaLink: content?.hero?.ctaLink || '/contact',
  };

  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update form when content changes
  useEffect(() => {
    if (content?.hero) {
      setFormData({
        mainHeading: content.hero.mainHeading,
        subheading: content.hero.subheading,
        ctaButtonText: content.hero.ctaButtonText,
        ctaLink: content.hero.ctaLink,
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
      if (!content) {
        throw new Error('Content not loaded');
      }

      // Validate
      if (!formData.mainHeading.trim()) {
        throw new Error('Main heading is required');
      }

      // Update content
      updateContent({
        ...content,
        hero: {
          mainHeading: formData.mainHeading,
          subheading: formData.subheading,
          ctaButtonText: formData.ctaButtonText,
          ctaLink: formData.ctaLink,
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hero Section Settings</h2>
        <p className="text-gray-600">Manage your homepage hero section content</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">Changes saved successfully!</p>
            <p className="text-sm text-green-700 mt-1">Your hero section has been updated.</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">Error saving changes</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Main Heading */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Heading <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Heading className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="mainHeading"
              value={formData.mainHeading}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              placeholder="Enter main heading"
              required
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">The primary headline displayed on your homepage</p>
        </div>

        {/* Subheading */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subheading
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              name="subheading"
              value={formData.subheading}
              onChange={handleChange}
              rows={3}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-gray-900 bg-white"
              placeholder="Enter subheading"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Supporting text below the main heading</p>
        </div>

        {/* CTA Button Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Call-to-Action Button Text
          </label>
          <div className="relative">
            <MousePointer className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="ctaButtonText"
              value={formData.ctaButtonText}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              placeholder="e.g., Get Started, Contact Us"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Text displayed on the primary action button</p>
        </div>

        {/* CTA Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Call-to-Action Link
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="ctaLink"
              value={formData.ctaLink}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              placeholder="/contact"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">URL or path where the button should navigate</p>
        </div>

        {/* Preview */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {formData.mainHeading || 'Your Main Heading'}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {formData.subheading || 'Your subheading will appear here'}
            </p>
            <button
              type="button"
              className="px-8 py-3 bg-primary text-white font-medium rounded-lg"
            >
              {formData.ctaButtonText || 'Button Text'}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSettings;
