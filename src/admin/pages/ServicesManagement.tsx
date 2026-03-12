import { useState, FormEvent, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, CheckCircle, AlertCircle, Plus, Trash2, Edit2, Globe, Smartphone, Code2, Database, Search, Users, Palette, GraduationCap } from 'lucide-react';

// Icon mapping
const iconMap: Record<string, any> = {
  Globe, Smartphone, Code2, Database, Search, Users, Palette, GraduationCap
};

const defaultServices = [
  {
    id: '1',
    icon: 'Globe',
    title: 'Web Development',
    description: 'Responsive websites with modern frontend & backend development. Fast, SEO-optimized, and mobile-friendly.',
    features: ['React & Next.js', 'Custom CMS', 'E-commerce', 'Landing Pages'],
  },
  {
    id: '2',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    description: 'Native and cross-platform Android & iOS applications built for performance and great user experience.',
    features: ['React Native', 'Flutter', 'iOS & Android', 'App Store Deployment'],
  },
  {
    id: '3',
    icon: 'GraduationCap',
    title: 'Assignment & Academic Help',
    description: 'Professional assistance for university and college assignments, projects, and research work.',
    features: ['Programming Tasks', 'Database Projects', 'Research Papers', 'Technical Reports'],
  },
  {
    id: '4',
    icon: 'Palette',
    title: 'Logo & Brand Identity',
    description: 'Distinctive logos and complete brand identity packages that make your business memorable.',
    features: ['Logo Design', 'Brand Guidelines', 'Business Cards', 'Social Media Kit'],
  },
  {
    id: '5',
    icon: 'Code2',
    title: 'Custom Digital Solutions',
    description: 'Tailored software solutions to automate workflows, manage data, and scale your business.',
    features: ['SaaS Products', 'Automation Tools', 'API Development', 'Cloud Solutions'],
  },
  {
    id: '6',
    icon: 'Database',
    title: 'Database & Backend',
    description: 'Robust backend architecture and database design for scalable, secure applications.',
    features: ['PostgreSQL', 'Firebase', 'REST APIs', 'Authentication'],
  },
  {
    id: '7',
    icon: 'Search',
    title: 'SEO Optimization',
    description: 'Boost your online visibility with technical SEO, content optimization, and performance tuning.',
    features: ['Technical SEO', 'Page Speed', 'Keyword Strategy', 'Analytics Setup'],
  },
  {
    id: '8',
    icon: 'Users',
    title: '1-on-1 Project Guidance',
    description: 'Personalized mentorship and guidance to help you build and ship your own projects.',
    features: ['Code Reviews', 'Architecture Planning', 'Tech Stack Advice', 'Deployment Help'],
  },
];

const ServicesManagement = () => {
  const { content, updateContent } = useContent();
  
  // Initialize with current content or fallback to actual website data
  const initialServices = content?.services && content.services.length > 0 ? content.services : defaultServices;
  
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    icon: 'Globe',
    title: '',
    description: '',
    features: [''],
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update services when content changes
  useEffect(() => {
    if (content?.services && content.services.length > 0) {
      setServices(content.services);
    }
  }, [content]);

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setFormData({
      icon: service.icon,
      title: service.title,
      description: service.description,
      features: [...service.features],
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      icon: 'Globe',
      title: '',
      description: '',
      features: [''],
    });
  };

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    });
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures.length > 0 ? newFeatures : [''],
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      if (!content) {
        throw new Error('Content not loaded');
      }

      if (!formData.title.trim()) {
        throw new Error('Service title is required');
      }

      const filteredFeatures = formData.features.filter(f => f.trim() !== '');
      if (filteredFeatures.length === 0) {
        throw new Error('At least one feature is required');
      }

      let updatedServices;
      if (editingId) {
        updatedServices = services.map(s =>
          s.id === editingId
            ? { ...s, ...formData, features: filteredFeatures }
            : s
        );
      } else {
        const newService = {
          id: Date.now().toString(),
          ...formData,
          features: filteredFeatures,
        };
        updatedServices = [...services, newService];
      }

      setServices(updatedServices);
      updateContent({
        ...content,
        services: updatedServices,
      });

      setSuccess(true);
      handleCancel();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updatedServices = services.filter(s => s.id !== id);
      setServices(updatedServices);
      if (content) {
        updateContent({
          ...content,
          services: updatedServices,
        });
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Services Management</h2>
        <p className="text-gray-600">Manage your website services</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">Changes saved successfully!</p>
            <p className="text-sm text-green-700 mt-1">Your services have been updated.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">Error saving changes</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {editingId !== null && (
        <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            >
              <option value="Globe">Globe (Web)</option>
              <option value="Smartphone">Smartphone (Mobile)</option>
              <option value="GraduationCap">Graduation Cap (Academic)</option>
              <option value="Palette">Palette (Design)</option>
              <option value="Code2">Code (Development)</option>
              <option value="Database">Database</option>
              <option value="Search">Search (SEO)</option>
              <option value="Users">Users (Guidance)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              placeholder="e.g., Web Development"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-gray-900 bg-white"
              placeholder="Brief description of the service"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
                    placeholder={`Feature ${index + 1}`}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeature}
                className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </form>
      )}

      {/* Add New Button */}
      {editingId === null && (
        <button
          onClick={() => setEditingId('new')}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Add New Service
        </button>
      )}

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => {
          const ServiceIcon = iconMap[service.icon] || Globe;
          return (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <ServiceIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesManagement;
