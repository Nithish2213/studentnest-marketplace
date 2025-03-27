
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  AlertCircle, 
  Settings, 
  LogOut,
  ArrowDown,
  ArrowUp,
  Search,
  MoreVertical,
  Filter,
  Download,
  Trash,
  CheckSquare,
  XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalListings: 0,
    activeLlistings: 0,
    pendingApprovals: 0,
    totalUsers: 0,
    recentUsers: 0,
    reportedItems: 0
  });

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, action: 'New listing', item: 'MacBook Pro 2019', user: 'Alex Johnson', time: '10 minutes ago' },
    { id: 2, action: 'New user', item: 'Sarah Williams', user: 'System', time: '1 hour ago' },
    { id: 3, action: 'Item reported', item: 'Physics Book', user: 'James Smith', time: '2 hours ago' },
    { id: 4, action: 'Item sold', item: 'Desk Lamp', user: 'Emma Wilson', time: '3 hours ago' },
    { id: 5, action: 'New listing', item: 'Sony Headphones', user: 'David Brown', time: '5 hours ago' }
  ];

  // Check if user is admin
  useEffect(() => {
    // In a real app, you would check user roles
    if (currentUser?.type !== 'admin') {
      toast({
        title: "Access denied",
        description: "You don't have permission to access the admin dashboard",
        variant: "destructive",
      });
      navigate('/');
    }

    // Load products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts);

    // Calculate statistics
    setStats({
      totalListings: storedProducts.length,
      activeListings: storedProducts.length,
      pendingApprovals: Math.floor(Math.random() * 10),
      totalUsers: 45 + Math.floor(Math.random() * 30),
      recentUsers: 5 + Math.floor(Math.random() * 10),
      reportedItems: Math.floor(Math.random() * 8)
    });
  }, [currentUser, navigate, toast]);

  const handleLogout = () => {
    signOut();
  };

  const approveItem = (id) => {
    toast({
      title: "Item approved",
      description: "The item has been approved and is now visible to users",
      variant: "success",
    });
    // In a real app, update the database
  };

  const rejectItem = (id) => {
    toast({
      title: "Item rejected",
      description: "The item has been rejected and removed from the listings",
      variant: "default",
    });
    // In a real app, update the database
  };

  const deleteItem = (id) => {
    // Filter out the deleted item
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    
    // Update localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    toast({
      title: "Item deleted",
      description: "The item has been removed from the marketplace",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-marketplace-600 text-white h-screen fixed">
        <div className="p-4 border-b border-marketplace-500">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-marketplace-300">Managing marketplace</p>
        </div>
        
        <nav className="py-4">
          <ul>
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeTab === 'dashboard'
                    ? 'bg-marketplace-700 border-l-4 border-marketplace-accent'
                    : 'hover:bg-marketplace-500'
                }`}
              >
                <LayoutDashboard size={18} className="mr-3" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('products')}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeTab === 'products'
                    ? 'bg-marketplace-700 border-l-4 border-marketplace-accent'
                    : 'hover:bg-marketplace-500'
                }`}
              >
                <ShoppingBag size={18} className="mr-3" />
                <span>Products</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('users')}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeTab === 'users'
                    ? 'bg-marketplace-700 border-l-4 border-marketplace-accent'
                    : 'hover:bg-marketplace-500'
                }`}
              >
                <Users size={18} className="mr-3" />
                <span>Users</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('reports')}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeTab === 'reports'
                    ? 'bg-marketplace-700 border-l-4 border-marketplace-accent'
                    : 'hover:bg-marketplace-500'
                }`}
              >
                <AlertCircle size={18} className="mr-3" />
                <span>Reports</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeTab === 'settings'
                    ? 'bg-marketplace-700 border-l-4 border-marketplace-accent'
                    : 'hover:bg-marketplace-500'
                }`}
              >
                <Settings size={18} className="mr-3" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-marketplace-500">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-left text-marketplace-300 hover:text-white"
          >
            <LogOut size={18} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="ml-64 flex-1">
        {/* Header */}
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          <h2 className="text-xl font-semibold text-marketplace-600">
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'products' && 'Product Management'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'reports' && 'Reports & Flags'}
            {activeTab === 'settings' && 'Admin Settings'}
          </h2>
          
          <div className="flex items-center">
            <div className="mr-4 relative">
              <div className="w-10 h-10 rounded-full bg-marketplace-100 flex items-center justify-center text-marketplace-600">
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="font-bold">{currentUser?.name?.charAt(0) || 'A'}</span>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard tab */}
        {activeTab === 'dashboard' && (
          <div className="p-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Listings</p>
                    <h3 className="text-3xl font-semibold text-marketplace-600 mt-1">{stats.totalListings}</h3>
                  </div>
                  <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center text-blue-600">
                    <ShoppingBag size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <span className="text-green-600 flex items-center">
                    <ArrowUp size={14} className="mr-1" /> 12%
                  </span>
                  <span className="text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <h3 className="text-3xl font-semibold text-marketplace-600 mt-1">{stats.totalUsers}</h3>
                  </div>
                  <div className="bg-purple-100 rounded-full h-12 w-12 flex items-center justify-center text-purple-600">
                    <Users size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <span className="text-green-600 flex items-center">
                    <ArrowUp size={14} className="mr-1" /> 8%
                  </span>
                  <span className="text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending Approvals</p>
                    <h3 className="text-3xl font-semibold text-marketplace-600 mt-1">{stats.pendingApprovals}</h3>
                  </div>
                  <div className="bg-yellow-100 rounded-full h-12 w-12 flex items-center justify-center text-yellow-600">
                    <AlertCircle size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <span className="text-red-600 flex items-center">
                    <ArrowDown size={14} className="mr-1" /> 5%
                  </span>
                  <span className="text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-marketplace-600">Recent Activity</h3>
                <Link to="#" className="text-sm text-marketplace-accent hover:underline">View All</Link>
              </div>
              
              <div className="overflow-hidden rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentActivities.map(activity => (
                      <tr key={activity.id} className="hover:bg-gray-50">
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">{activity.action}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">{activity.item}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">{activity.user}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">{activity.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Products tab */}
        {activeTab === 'products' && (
          <div className="p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              
              <div className="flex gap-2">
                <button className="btn-outline flex items-center text-sm">
                  <Filter size={16} className="mr-1.5" /> Filter
                </button>
                <button className="btn-outline flex items-center text-sm">
                  <Download size={16} className="mr-1.5" /> Export
                </button>
              </div>
            </div>
            
            {products.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 mr-3">
                                <img 
                                  src={product.image} 
                                  alt={product.title} 
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                              </div>
                              <div className="truncate max-w-xs">
                                <div className="text-sm font-medium text-gray-900 truncate">{product.title}</div>
                                <div className="text-xs text-gray-500 truncate">{product.condition}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{product.seller?.name || 'Unknown'}</td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => approveItem(product.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <CheckSquare size={18} />
                              </button>
                              <button 
                                onClick={() => rejectItem(product.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <XCircle size={18} />
                              </button>
                              <button 
                                onClick={() => deleteItem(product.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center bg-white py-12 rounded-lg shadow-sm">
                <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-marketplace-600 mb-2">No products available</h3>
                <p className="text-marketplace-400">There are no products in the marketplace yet.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Users tab */}
        {activeTab === 'users' && (
          <div className="p-6">
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Users size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-marketplace-600 mb-2">User Management</h3>
              <p className="text-marketplace-400 max-w-md mx-auto mb-6">
                This section allows you to manage users, view profiles, and adjust permissions.
              </p>
              <button className="btn-primary">Load User Data</button>
            </div>
          </div>
        )}
        
        {/* Reports tab */}
        {activeTab === 'reports' && (
          <div className="p-6">
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <AlertCircle size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-marketplace-600 mb-2">Reports & Flags</h3>
              <p className="text-marketplace-400 max-w-md mx-auto mb-6">
                View and manage reported listings, user complaints, and content flags.
              </p>
              <button className="btn-primary">View Reports</button>
            </div>
          </div>
        )}
        
        {/* Settings tab */}
        {activeTab === 'settings' && (
          <div className="p-6">
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Settings size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-marketplace-600 mb-2">Admin Settings</h3>
              <p className="text-marketplace-400 max-w-md mx-auto mb-6">
                Configure marketplace settings, permissions, and preferences.
              </p>
              <button className="btn-primary">Manage Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
