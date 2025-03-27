import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Camera, X, Upload, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'books', label: 'Books' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'services', label: 'Services' },
  { value: 'other', label: 'Other' }
];

const locations = [
  'West Campus',
  'East Campus',
  'North Campus',
  'South Campus',
  'Library',
  'Engineering Building',
  'Science Building',
  'Arts Building',
  'Recreation Center',
  'Student Center',
  'Off Campus'
];

const conditions = [
  { value: 'new', label: 'New' },
  { value: 'like_new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' }
];

const SellItem = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    images: []
  });
  
  const [errors, setErrors] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    if (imageFiles.length + files.length > 5) {
      setErrors({
        ...errors,
        images: 'Maximum 5 images allowed'
      });
      return;
    }
    
    const newImageFiles = [...imageFiles];
    
    files.forEach(file => {
      if (!file.type.includes('image/')) {
        setErrors({
          ...errors,
          images: 'Only image files are allowed'
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        newImageFiles.push({
          file,
          preview: e.target.result
        });
        setImageFiles([...newImageFiles]);
      };
      reader.readAsDataURL(file);
    });
    
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });
    
    if (errors.images) {
      setErrors({
        ...errors,
        images: null
      });
    }
  };

  const removeImage = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
    
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const imageUrls = imageFiles.map(img => img.preview);
      
      const newProduct = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        image: imageUrls[0],
        images: imageUrls,
        condition: conditions.find(c => c.value === formData.condition)?.label || formData.condition,
        category: formData.category,
        location: formData.location,
        timeAgo: 'Just now',
        rating: 0,
        seller: {
          id: currentUser?.id || 'user123',
          name: currentUser?.name || 'Current User',
          avatar: currentUser?.avatar || null
        }
      };
      
      const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const updatedProducts = [newProduct, ...storedProducts];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      toast({
        title: "Listing created!",
        description: "Your item has been listed successfully",
        variant: "success",
      });
      
      navigate('/home');
    } catch (error) {
      console.error('Error creating listing:', error);
      setErrors({
        ...errors,
        submit: 'Failed to create listing. Please try again.'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Layout showCategories={false}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-display font-semibold text-marketplace-600 mb-6">
          Create a New Listing
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {errors.submit && (
              <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                {errors.submit}
              </div>
            )}
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., MacBook Pro 2019 - 16 inch"
                className={`w-full p-3 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600 error-message">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your item in detail. Include condition, features, and reason for selling."
                className={`w-full p-3 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent`}
              ></textarea>
              {errors.description && <p className="mt-1 text-sm text-red-600 error-message">{errors.description}</p>}
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`w-full pl-8 p-3 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent`}
                />
              </div>
              {errors.price && <p className="mt-1 text-sm text-red-600 error-message">{errors.price}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600 error-message">{errors.category}</p>}
              </div>
              
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.condition ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent`}
                >
                  <option value="">Select condition</option>
                  {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>
                      {condition.label}
                    </option>
                  ))}
                </select>
                {errors.condition && <p className="mt-1 text-sm text-red-600 error-message">{errors.condition}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.location ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent`}
              >
                <option value="">Select location</option>
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {errors.location && <p className="mt-1 text-sm text-red-600 error-message">{errors.location}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images <span className="text-red-500">*</span>
                <span className="text-gray-500 text-xs ml-2">(Up to 5 images, first one will be the main image)</span>
              </label>
              
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {imageFiles.map((image, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img 
                      src={image.preview} 
                      alt={`Preview ${index}`} 
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-marketplace-accent/80 text-white text-xs font-medium py-1 px-2 text-center">
                        Main Image
                      </div>
                    )}
                  </div>
                ))}
                
                {imageFiles.length < 5 && (
                  <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-marketplace-accent/50 transition-colors">
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="images" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <Camera size={24} className="mb-2" />
                      <span className="text-sm">Add Image</span>
                    </label>
                  </div>
                )}
              </div>
              
              {errors.images && <p className="mt-1 text-sm text-red-600 error-message">{errors.images}</p>}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto bg-marketplace-accent text-white py-3 px-6 rounded-lg shadow-sm font-medium flex items-center justify-center ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-marketplace-accent/90 transition-colors'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Upload size={18} className="mr-2 animate-spin" />
                    Creating Listing...
                  </>
                ) : (
                  <>
                    <Check size={18} className="mr-2" />
                    Create Listing
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SellItem;
