import { useState, FormEvent } from 'react';
import { Save, CheckCircle, AlertCircle, Plus, Trash2, DollarSign, Edit2 } from 'lucide-react';

interface PricingItem {
  id: string;
  name: string;
  priceUSD: string;
  pricePKR: string;
}

interface PricingCategory {
  id: string;
  category: string;
  items: PricingItem[];
}

const PricingManagement = () => {
  const [categories, setCategories] = useState<PricingCategory[]>([
    {
      id: '1',
      category: 'Academic Assignments',
      items: [{ id: '1-1', name: 'Academic Assignments', priceUSD: '$20', pricePKR: '5,500' }],
    },
    {
      id: '2',
      category: 'Projects',
      items: [
        { id: '2-1', name: 'Projects for GitHub', priceUSD: '$35', pricePKR: '10,000' },
        { id: '2-2', name: 'University Projects', priceUSD: '$43', pricePKR: '12,000' },
      ],
    },
    {
      id: '3',
      category: 'Web Development',
      items: [
        { id: '3-1', name: 'Frontend Web Development', priceUSD: '$70', pricePKR: '19,000' },
        { id: '3-2', name: 'E-commerce Websites with Backend', priceUSD: '$300', pricePKR: '83,500' },
        { id: '3-3', name: 'Educational Websites', priceUSD: '$200', pricePKR: '55,500' },
      ],
    },
    {
      id: '4',
      category: 'App Development',
      items: [
        { id: '4-1', name: 'Mobile App Development', priceUSD: '$300', pricePKR: '83,500' },
        { id: '4-2', name: '3D Game Development', priceUSD: '$350', pricePKR: '95,500' },
      ],
    },
    {
      id: '5',
      category: 'Logo & Brand Identity',
      items: [{ id: '5-1', name: 'Logo & Brand Identity', priceUSD: '$25', pricePKR: '6,500' }],
    },
    {
      id: '6',
      category: 'Custom Digital Solutions',
      items: [{ id: '6-1', name: 'Custom Digital Solutions', priceUSD: '$100', pricePKR: '27,500' }],
    },
    {
      id: '7',
      category: 'Database & Backend',
      items: [{ id: '7-1', name: 'Database & Backend', priceUSD: '$50', pricePKR: '13,500' }],
    },
    {
      id: '8',
      category: 'SEO Optimization',
      items: [{ id: '8-1', name: 'SEO Optimization', priceUSD: '$50', pricePKR: '13,500' }],
    },
    {
      id: '9',
      category: '1-on-1 Project Guidance',
      items: [
        { id: '9-1', name: 'Fiverr Account Help', priceUSD: '$10', pricePKR: '2,500' },
        { id: '9-2', name: 'GitHub ID Publish', priceUSD: '$10', pricePKR: '2,500' },
        { id: '9-3', name: 'Project Guidance', priceUSD: '$10', pricePKR: '2,500' },
      ],
    },
  ]);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const updateItem = (categoryId: string, itemId: string, field: string, value: string) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? {
            ...cat,
            items: cat.items.map(item =>
              item.id === itemId ? { ...item, [field]: value } : item
            ),
          }
        : cat
    ));
  };

  const addItem = (categoryId: string) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? {
            ...cat,
            items: [
              ...cat.items,
              {
                id: `${categoryId}-${Date.now()}`,
                name: 'New Service',
                priceUSD: '$0',
                pricePKR: '0',
              },
            ],
          }
        : cat
    ));
  };

  const removeItem = (categoryId: string, itemId: string) => {
    if (confirm('Are you sure you want to remove this pricing item?')) {
      setCategories(categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
          : cat
      ));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      // Save to localStorage
      localStorage.setItem('devdesk_pricing_data', JSON.stringify(categories));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save pricing data');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing Management</h2>
        <p className="text-gray-600">Manage all your pricing plans and services</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-green-900">Pricing updated successfully!</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-red-900">Error: {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                {category.category}
              </h3>
              <button
                type="button"
                onClick={() => addItem(category.id)}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {category.items.map((item) => (
                <div key={item.id} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg">
                  <Edit2 className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(category.id, item.id, 'name', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      placeholder="Service Name"
                    />
                    <input
                      type="text"
                      value={item.priceUSD}
                      onChange={(e) => updateItem(category.id, item.id, 'priceUSD', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      placeholder="$0"
                    />
                    <input
                      type="text"
                      value={item.pricePKR}
                      onChange={(e) => updateItem(category.id, item.id, 'pricePKR', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      placeholder="Rs 0"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(category.id, item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PricingManagement;
