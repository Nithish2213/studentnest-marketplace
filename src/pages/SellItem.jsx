
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Upload, Plus, Minus, X, Camera, Info, AlertTriangle } from 'lucide-react';

const categories = [
  'Books',
  'Electronics',
  'Furniture',
  'Clothing',
  'Accessories',
  'Sports',
  'Transportation',
  'Services',
  'Tickets',
  'Housing',
  'Entertainment',
  'Tutoring',
  'Other'
];

const conditions = [
  'New',
  'Like New',
  'Good',
  'Fair',
  'Poor'
];

const SellItem = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    location: '',
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setForm({
      ...form,
      [name]: value
    });
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Limit to 5 images total
    if (previewImages.length + files.length > 5) {
      setErrors({
        ...errors,
        images: 'Maximum 5 images allowed'
      });
      return;
    }
    
    const newPreviewImages = [...previewImages];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviewImages.push(e.target.result);
        setPreviewImages([...newPreviewImages]);
      };
      reader.readAsDataURL(file);
    });
    
    setForm({
      ...form,
      images: [...form.images, ...files]
    });
  };

  const removeImage = (index) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    
    const newImages = [...form.images];
    newImages.splice(index, 1);
    
    setPreviewImages(newPreviewImages);
    setForm({
      ...form,
      images: newImages
    });
    
    // Clear image error if any
    if (errors.images) {
      setErrors({
        ...errors,
        images: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.condition) newErrors.condition = 'Condition is required';
    if (!form.price) newErrors.price = 'Price is required';
    else if (isNaN(form.price) || Number(form.price) <= 0) newErrors.price = 'Valid price is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (form.images.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', form);
      setIsSubmitting(false);
      
      // In a real app, this would redirect after API success
      navigate('/profile');
    }, 1500);
  };

  return (
    <Layout showCategories={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-display font-semibold text-marketplace-600 mb-6">
            Create a Listing
          </h1>
          
          {/* Info Box */}
          <div className="glass-card p-4 flex items-start mb-8">
            <Info size={20} className="text-marketplace-accent flex-shrink-0 mt-0.5 mr-3" />
            <div className="text-sm text-marketplace-500">
              <strong className="text-marketplace-600">Sell faster with a great listing!</strong>
              <p className="mt-1">Be detailed, honest, and clear. Add high-quality photos and set a fair price. Respond promptly to potential buyers.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Images Upload Section */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-marketplace-600 mb-4">Photos</h2>
              <p className="text-sm text-marketplace-400 mb-4">Add up to 5 photos. The first photo will be your listing's cover image.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-3">
                {/* Image Previews */}
                {previewImages.map((src, index) => (
                  <div key={index} className="aspect-square relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-white/80 text-gray-600 hover:text-red-500 transition duration-200"
                      aria-label="Remove image"
                    >
                      <X size={16} />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-marketplace-accent/80 text-white text-xs font-medium py-1 text-center">
                        Cover
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Upload Button */}
                {previewImages.length < 5 && (
                  <label className="aspect-square cursor-pointer border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition duration-200">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <div className="flex flex-col items-center text-marketplace-400">
                      <Camera size={24} className="mb-2" />
                      <span className="text-sm font-medium">Add Photo</span>
                    </div>
                  </label>
                )}
              </div>
              
              {errors.images && (
                <p className="text-sm text-red-500 mt-2">{errors.images}</p>
              )}
            </div>
            
            {/* Basic Information */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-marketplace-600 mb-4">Item Details</h2>
              
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-marketplace-600 mb-1.5">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    placeholder="e.g., MacBook Pro 2019 - 16 inch"
                    className={`input-field ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>
                
                {/* Category and Condition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-marketplace-600 mb-1.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      className={`input-field ${errors.category ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-marketplace-600 mb-1.5">
                      Condition <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      value={form.condition}
                      onChange={handleInputChange}
                      className={`input-field ${errors.condition ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    >
                      <option value="">Select condition</option>
                      {conditions.map((condition) => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </select>
                    {errors.condition && (
                      <p className="text-sm text-red-500 mt-1">{errors.condition}</p>
                    )}
                  </div>
                </div>
                
                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-marketplace-600 mb-1.5">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-marketplace-400">$</span>
                    </div>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={form.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className={`input-field pl-8 ${errors.price ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-red-500 mt-1">{errors.price}</p>
                  )}
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-marketplace-600 mb-1.5">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Describe your item (condition, features, why you're selling it)"
                    className={`input-field ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                  )}
                  <p className="text-sm text-marketplace-400 mt-1.5">
                    {form.description.length}/2000 characters
                  </p>
                </div>
                
                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-marketplace-600 mb-1.5">
                    Pickup Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Library, West Campus, Engineering Building"
                    className={`input-field ${errors.location ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500 mt-1">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Safety Notice */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex">
                <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-marketplace-600">Safety Reminder</h3>
                  <p className="text-xs text-marketplace-500 mt-1">
                    By posting, you agree to our community guidelines. Always meet in public places and be cautious
                    when sharing personal information.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn-secondary order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary order-1 sm:order-2 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Create Listing'
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
