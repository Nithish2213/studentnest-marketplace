
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { ArrowLeft, Send, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from "@/components/ui/use-toast";

const ChatWithSeller = () => {
  const { sellerId, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  // Simulate getting product and seller data
  useEffect(() => {
    // This would be an API call in a real app
    const productData = {
      id: 1,
      title: 'MacBook Pro 2019 - 16" - i7 - 16GB - 512GB',
      price: 1100,
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80'
      ],
    };
    
    const sellerData = {
      id: 123,
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/300?img=12',
      rating: 4.9,
      responseTime: 'Under 1 hour',
      verified: true
    };
    
    // Simulate API delay
    setTimeout(() => {
      setProduct(productData);
      setSeller(sellerData);
      setLoading(false);
    }, 500);
    
    // Get chat history from localStorage
    const storedChat = localStorage.getItem(`chat_${productId}_${sellerId}`);
    if (storedChat) {
      setChatHistory(JSON.parse(storedChat));
    }
  }, [productId, sellerId]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      sender: 'user',
      text: message,
      timestamp: new Date().toISOString()
    };
    
    // Add message to chat history
    const updatedChat = [...chatHistory, newMessage];
    setChatHistory(updatedChat);
    
    // Save to localStorage
    localStorage.setItem(`chat_${productId}_${sellerId}`, JSON.stringify(updatedChat));
    
    // Clear input
    setMessage('');
    
    // Simulate seller response after a delay
    setTimeout(() => {
      const sellerResponse = {
        sender: 'seller',
        text: 'Thanks for your message! I\'ll get back to you as soon as possible.',
        timestamp: new Date().toISOString()
      };
      
      const updatedChatWithResponse = [...updatedChat, sellerResponse];
      setChatHistory(updatedChatWithResponse);
      
      // Save to localStorage
      localStorage.setItem(`chat_${productId}_${sellerId}`, JSON.stringify(updatedChatWithResponse));
      
      // Show notification
      toast({
        title: "New message",
        description: "You received a message from the seller",
      });
    }, 1000);
  };

  if (loading) {
    return (
      <Layout showCategories={false}>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showCategories={false}>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <Link to={`/product/${productId}`} className="flex items-center text-marketplace-400 hover:text-marketplace-accent text-sm transition duration-200">
            <ArrowLeft size={16} className="mr-2" /> Back to product
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center p-4 border-b">
            <div className="flex-shrink-0 mr-3">
              {seller.avatar ? (
                <img 
                  src={seller.avatar} 
                  alt={seller.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <UserCircle size={48} className="text-gray-400" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-marketplace-600">
                {seller.name}
                {seller.verified && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    Verified
                  </span>
                )}
              </h2>
              <div className="text-sm text-marketplace-400">
                About {product.title}
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {/* Product summary */}
            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="w-16 h-16 object-cover rounded-md mr-3"
              />
              <div>
                <div className="font-medium text-marketplace-600 line-clamp-1">
                  {product.title}
                </div>
                <div className="text-marketplace-accent font-semibold">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            </div>
            
            {chatHistory.length === 0 ? (
              <div className="text-center text-marketplace-400 py-8">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      msg.sender === 'user' 
                        ? 'bg-marketplace-accent text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Chat input */}
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`ml-2 px-4 py-2 rounded-lg flex items-center justify-center ${
                  message.trim() 
                    ? 'bg-marketplace-accent text-white hover:bg-marketplace-accent/90' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatWithSeller;
