
import React from 'react';
import Layout from '../components/layout/Layout';
import { Bell, Zap, Info, ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: 'trending',
      title: 'MacBook Pro is trending now',
      message: 'This item has gained popularity among students',
      icon: <Zap size={18} className="text-yellow-500" />,
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Website Update',
      message: 'We have updated our terms of service',
      icon: <Info size={18} className="text-blue-500" />,
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'listing',
      title: 'New Listing Available',
      message: 'Someone just listed "Calculus Textbook 5th Edition"',
      icon: <ShoppingBag size={18} className="text-green-500" />,
      time: '3 days ago',
      read: false
    },
    {
      id: 4,
      type: 'favorite',
      title: 'Price Drop Alert',
      message: 'An item in your favorites has reduced in price',
      icon: <Heart size={18} className="text-red-500" />,
      time: '5 days ago',
      read: true
    },
    {
      id: 5,
      type: 'trending',
      title: 'Sony Headphones are trending',
      message: 'This item is getting a lot of attention',
      icon: <Zap size={18} className="text-yellow-500" />,
      time: '1 week ago',
      read: true
    }
  ];

  return (
    <Layout showCategories={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-display font-semibold text-marketplace-600">
              Notifications
            </h1>
            <button className="text-sm text-marketplace-accent hover:underline">
              Mark all as read
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell size={40} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-500">No notifications yet</h3>
                <p className="text-gray-400 mt-1">
                  We'll notify you when there's activity or updates
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2 rounded-full bg-gray-100">
                        {notification.icon}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-marketplace-600' : 'text-gray-600'}`}>
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-400">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <div className="ml-2 w-2 h-2 rounded-full bg-marketplace-accent"></div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
