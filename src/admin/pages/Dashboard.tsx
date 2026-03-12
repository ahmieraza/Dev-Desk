import { useContent } from '../context/ContentContext';
import { useTheme } from '../context/ThemeContext';
import { FileText, DollarSign, Code, Phone, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { content, loading } = useContent();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Loading...</div>
      </div>
    );
  }

  const stats = [
    {
      icon: Code,
      label: 'Total Services',
      value: content?.services?.length || 0,
      color: 'bg-blue-500',
    },
    {
      icon: DollarSign,
      label: 'Pricing Plans',
      value: content?.pricing?.length || 0,
      color: 'bg-green-500',
    },
    {
      icon: FileText,
      label: 'Navigation Links',
      value: content?.header?.navLinks?.length || 0,
      color: 'bg-purple-500',
    },
    {
      icon: Phone,
      label: 'Contact Methods',
      value: 3,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-2`}>Dashboard Overview</h2>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Welcome to DevDesk Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-1`}>{stat.value}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-4`}>Website Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Website Title:</span>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{content?.seo?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Contact Email:</span>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{content?.contact?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Phone:</span>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{content?.contact?.phone}</span>
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-4`}>Quick Actions</h3>
          <div className="space-y-2">
            <a
              href="/admin/services"
              className={`block px-4 py-3 ${theme === 'dark' ? 'bg-primary/20 hover:bg-primary/30' : 'bg-primary/10 hover:bg-primary/20'} text-primary rounded-lg transition-colors font-medium`}
            >
              Manage Services
            </a>
            <a
              href="/admin/pricing"
              className={`block px-4 py-3 ${theme === 'dark' ? 'bg-primary/20 hover:bg-primary/30' : 'bg-primary/10 hover:bg-primary/20'} text-primary rounded-lg transition-colors font-medium`}
            >
              Update Pricing
            </a>
            <a
              href="/admin/seo"
              className={`block px-4 py-3 ${theme === 'dark' ? 'bg-primary/20 hover:bg-primary/30' : 'bg-primary/10 hover:bg-primary/20'} text-primary rounded-lg transition-colors font-medium`}
            >
              SEO Settings
            </a>
          </div>
        </div>
      </div>

      {/* Recent Content */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-4`}>Hero Section Preview</h3>
        <div className="space-y-3">
          <div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Main Heading:</p>
            <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{content?.hero?.mainHeading}</p>
          </div>
          <div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Subheading:</p>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{content?.hero?.subheading}</p>
          </div>
          <div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>CTA Button:</p>
            <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium">
              {content?.hero?.ctaButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
