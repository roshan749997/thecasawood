import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminProductsAPI, adminCategoriesAPI, adminFabricsAPI } from '../services/adminApi';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fabrics, setFabrics] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    image: '',
    images: [],
    stock: '',
    sku: '',
    tags: [],
    status: 'active',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    warranty: '',
    specifications: [],
    colorOptions: [],
    variants: [],
    fabricTypes: [],
    defaultFabric: '',
    defaultColor: '',
  });

  const [errors, setErrors] = useState({});
  const [newSpec, setNewSpec] = useState({ key: '', value: '' });
  const [newVariant, setNewVariant] = useState({ name: '', price: '', dimensions: '' });

  const availableTags = ['Best Seller', 'New', 'Sale', 'Featured', 'Premium', 'Trending'];
  // Categories come from API (adminCategoriesAPI.getAll)

  useEffect(() => {
    fetchCategories();
    fetchFabrics();
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await adminProductsAPI.getById(id);
      if (response.data.success) {
        const product = response.data.data;
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          originalPrice: product.originalPrice || '',
          category: product.category || '',
          image: product.image || '',
          images: product.images || [],
          stock: product.stock || '',
          sku: product.sku || '',
          tags: product.tags || [],
          status: product.status || 'active',
          weight: product.weight || '',
          dimensions: product.dimensions || { length: '', width: '', height: '' },
          warranty: product.warranty || '',
          specifications: product.specifications || [],
          colorOptions: product.colorOptions || [],
          variants: product.variants || [],
          fabricTypes: product.fabricTypes || [],
          defaultFabric: product.defaultFabric || '',
          defaultColor: product.defaultColor || '',
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await adminCategoriesAPI.getAll();
      if (response.data.success && response.data.data?.length > 0) {
        setCategories(response.data.data);
      } else {
        setCategories([
          { name: 'Beds' },
          { name: 'Coffee & Center Tables' },
          { name: 'Dining Tables' },
          { name: 'Sofas' },
          { name: 'Lounge chair' }
        ]);
      }
    } catch (error) {
      setCategories([
        { name: 'Beds' },
        { name: 'Coffee & Center Tables' },
        { name: 'Dining Tables' },
        { name: 'Sofas' },
        { name: 'Lounge chair' }
      ]);
    }
  };

  const fetchFabrics = async () => {
    try {
      const response = await adminFabricsAPI.getAll();
      if (response.data.success) {
        setFabrics(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching fabrics:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleAddSpec = () => {
    if (newSpec.key && newSpec.value) {
      setFormData(prev => ({
        ...prev,
        specifications: [...prev.specifications, { ...newSpec }]
      }));
      setNewSpec({ key: '', value: '' });
    }
  };

  const handleRemoveSpec = (index) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const handleAddVariant = () => {
    if (newVariant.name && newVariant.price) {
      setFormData(prev => ({
        ...prev,
        variants: [...prev.variants, { ...newVariant, price: Number(newVariant.price) }]
      }));
      setNewVariant({ name: '', price: '', dimensions: '' });
    }
  };

  const handleRemoveVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleImageAdd = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }));
    }
  };

  const handleImageRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Product name is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      const productData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price),
        stock: formData.stock ? Number(formData.stock) : 0,
      };

      if (isEdit) {
        await adminProductsAPI.update(id, productData);
      } else {
        await adminProductsAPI.create(productData);
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({ submit: error.response?.data?.message || 'Failed to save product' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b5e3c]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
                placeholder="Enter product description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] ${
                  errors.category ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id || cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
                placeholder="Enter SKU"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing & Stock</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] ${
                  errors.price ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="0"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Images</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
                placeholder="Enter main image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images
              </label>
              <div className="flex flex-wrap gap-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleImageAdd}
                  className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  formData.tags.includes(tag)
                    ? 'bg-[#8b5e3c] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h2>
          <div className="space-y-4">
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{spec.key}:</span>
                <span className="text-gray-600">{spec.value}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(index)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex gap-4">
              <input
                type="text"
                value={newSpec.key}
                onChange={(e) => setNewSpec(prev => ({ ...prev, key: e.target.value }))}
                placeholder="Specification name"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
              <input
                type="text"
                value={newSpec.value}
                onChange={(e) => setNewSpec(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Value"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
              <button
                type="button"
                onClick={handleAddSpec}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Variants (Size Options)</h2>
          <div className="space-y-4">
            {formData.variants.map((variant, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{variant.name}</span>
                <span className="text-gray-600">₹{variant.price?.toLocaleString()}</span>
                {variant.dimensions && <span className="text-gray-500 text-sm">{variant.dimensions}</span>}
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(index)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex gap-4">
              <input
                type="text"
                value={newVariant.name}
                onChange={(e) => setNewVariant(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Variant name (e.g., King Size)"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
              <input
                type="number"
                value={newVariant.price}
                onChange={(e) => setNewVariant(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Price"
                className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
              <input
                type="text"
                value={newVariant.dimensions}
                onChange={(e) => setNewVariant(prev => ({ ...prev, dimensions: e.target.value }))}
                placeholder="Dimensions"
                className="w-40 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
              <button
                type="button"
                onClick={handleAddVariant}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Status</h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="active"
                checked={formData.status === 'active'}
                onChange={handleChange}
                className="text-[#8b5e3c] focus:ring-[#8b5e3c]"
              />
              <span className="text-gray-700">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formData.status === 'inactive'}
                onChange={handleChange}
                className="text-[#8b5e3c] focus:ring-[#8b5e3c]"
              />
              <span className="text-gray-700">Inactive</span>
            </label>
          </div>
        </div>

        {/* Error */}
        {errors.submit && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {errors.submit}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d] disabled:opacity-50 flex items-center gap-2"
          >
            {saving && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            )}
            {isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
