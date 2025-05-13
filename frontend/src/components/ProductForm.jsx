import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProductContext } from '../context/productContext';
function ProductForm() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
  });
  const [submitting, setSubmitting] = useState(false);
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const { addProduct } = useProductContext();

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  const result = await addProduct({
    name: form.name,
    price: parseFloat(form.price),
    description: form.description,
    image_url: form.image_url,
  });

  if (result.success) {
    alert('Product submitted!');
    setForm({ name: '', price: '', description: '', image_url: '' });
  } else {
    alert('Error submitting product');
  }

  setSubmitting(false);
};

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center">
          <Plus size={20} className="mr-2 text-blue-400" />
          Add New Product
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Product Name</label>
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              className="w-full border border-gray-700 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Price (₹)</label>
            <input 
              name="price" 
              type="number" 
              step="0.01" 
              value={form.price} 
              onChange={handleChange} 
              className="w-full border border-gray-700 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              className="w-full border border-gray-700 bg-gray-900 p-3 rounded-lg text-white h-20 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Image URL</label>
            <input 
              name="image_url" 
              value={form.image_url} 
              onChange={handleChange} 
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-700 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          
          <button 
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium flex items-center justify-center transform transition-transform hover:scale-102 active:scale-98"
          >
            {submitting && (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
            )}
            {submitting ? 'Submitting...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
