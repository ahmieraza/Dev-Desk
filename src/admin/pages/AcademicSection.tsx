import { useState, FormEvent, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, CheckCircle, AlertCircle, Plus, Trash2, Edit2, GraduationCap } from 'lucide-react';

const defaultAcademicCategories = {
  "Programming Tasks": [
    "HTML", "CSS", "JavaScript", "C#", "C++", "Python", "Java", "PHP", "Ruby", "Swift", "Kotlin", "TypeScript", "Go", "Rust", "React JS", "Node JS", "Angular", "Vue.js", "Next.js", "Express.js", "Django", "Flask", "Laravel", "ASP.NET", "React Native", "Flutter"
  ],
  "Database Projects": [
    "MySQL", "MongoDB", "PostgreSQL", "Firebase", "SQL Server", "Oracle", "Redis", "Cassandra", "SQLite", "MariaDB", "CouchDB", "DynamoDB"
  ],
  "Research Papers": [
    "Thesis Writing", "Research Proposal", "Literature Review", "Case Study", "Survey Research", "Qualitative Research", "Quantitative Research", "Data Analysis", "Academic Writing"
  ],
  "Technical & Business Reports": [
    "Technical Documentation", "Business Reports", "Project Reports", "Feasibility Study", "System Analysis", "Requirements Documentation", "User Manuals", "API Documentation"
  ]
};

const AcademicSection = () => {
  const { content, updateContent } = useContent();
  
  // Initialize with current content or fallback to actual website data
  const initialCategories = content?.academicCategories || defaultAcademicCategories;
  
  const [categories, setCategories] = useState<Record<string, string[]>>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    categoryName: '',
    items: [''],
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update categories when content changes
  useEffect(() => {
    if (content?.academicCategories) {
      setCategories(content.academicCategories);
    }
  }, [content]);

  const handleEdit = (categoryName: string) => {
    setEditingCategory(categoryName);
    setFormData({
      categoryName,
      items: [...categories[categoryName]],
    });
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setFormData({
      categoryName: '',
      items: [''],
    });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, ''],
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems.length > 0 ? newItems : [''],
    });
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = value;
    setFormData({
      ...formData,
      items: newItems,
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

      if (!formData.categoryName.trim()) {
        throw new Error('Category name is required');
      }

      const filteredItems = formData.items.filter(item => item.trim() !== '');
      if (filteredItems.length === 0) {
        throw new Error('At least one item is required');
      }

      let updatedCategories = { ...categories };
      
      if (editingCategory && editingCategory !== formData.categoryName) {
        // Renaming category
        delete updatedCategories[editingCategory];
      }
      
      updatedCategories[formData.categoryName] = filteredItems;

      setCategories(updatedCategories);
      updateContent({
        ...content,
        academicCategories: updatedCategories,
      });

      setSuccess(true);
      handleCancel();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (categoryName: string) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}" category?`)) {
      const updatedCategories = { ...categories };
      delete updatedCategories[categoryName];
      setCategories(updatedCategories);
      if (content) {
        updateContent({
          ...content,
          academicCategories: updatedCategories,
        });
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Section</h2>
        <p className="text-gray-600">Manage academic help and assignment services</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">Changes saved successfully!</p>
            <p className="text-sm text-green-700 mt-1">Your academic categories have been updated.</p>
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
      {editingCategory !== null && (
        <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.categoryName}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              placeholder="e.g., Programming Tasks"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {formData.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
                    placeholder={`Item ${index + 1}`}
                  />
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Item
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
              {saving ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      )}

      {/* Add New Button */}
      {editingCategory === null && (
        <button
          onClick={() => setEditingCategory('new')}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Add New Category
        </button>
      )}

      {/* Categories List */}
      <div className="space-y-4">
        {Object.entries(categories).map(([categoryName, items]) => (
          <div key={categoryName} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{categoryName}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(categoryName)}
                  className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(categoryName)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {items.length} items in this category
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicSection;
