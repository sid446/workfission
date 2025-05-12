import { useEffect, useState } from 'react';
import { Search, Trash2, Edit, Save, X } from 'lucide-react';
import { useProductContext } from '../context/productContext';

function ProductList() {

  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', description: '', image_url: '' });
  const { products, fetchProducts, deleteProduct,editProduct, loading } = useProductContext();
 

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteProduct(id);
    if (!result.success) {
      alert('Error deleting product');
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image_url: product.image_url
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

const handleEditSave = async (id) => {
    const payload = {
      name: editForm.name,
      price: editForm.price,
      description: editForm.description,
      image_url: editForm.image_url,
    };

    const result = await editProduct(id, payload);

    if (result.success) {
      setEditingId(null);
    } else {
      alert('Error updating product');
    }
  };
const parseSmartSearch = (query) => {
  const lower = query.toLowerCase();
  let priceFilter = null;

  if (lower.includes('under')) {
    const match = lower.match(/under\s+(\d+)/);
    if (match) priceFilter = { type: 'under', value: parseFloat(match[1]) };
  } else if (lower.includes('above')) {
    const match = lower.match(/above\s+(\d+)/);
    if (match) priceFilter = { type: 'above', value: parseFloat(match[1]) };
  }

  // remove price-related words for clean keyword search
  const cleanedKeyword = lower.replace(/(under|above)\s+\d+/gi, '').trim();

  return { keyword: cleanedKeyword, priceFilter };
};

const { keyword, priceFilter } = parseSmartSearch(search);


const filteredProducts = products.filter((product) => {
  const matchesKeyword =
    product.name?.toLowerCase().includes(keyword) ||
    product.description?.toLowerCase().includes(keyword);

  const matchesPrice =
    !priceFilter ||
    (priceFilter.type === 'under' && product.price <= priceFilter.value) ||
    (priceFilter.type === 'above' && product.price >= priceFilter.value);

  return matchesKeyword && matchesPrice;
});


  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
      </div>

      {loading ? (
        <div className="flex justify-center my-10">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col md:flex-row border border-gray-700 animate-fadeIn"
              >
                {editingId === product.id ? (
                  <div className="flex-1">
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="w-full mb-2 p-2 rounded bg-gray-900 text-white border border-gray-600"
                      placeholder="Name"
                    />
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      value={editForm.price}
                      onChange={handleEditChange}
                      className="w-full mb-2 p-2 rounded bg-gray-900 text-white border border-gray-600"
                      placeholder="Price"
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="w-full mb-2 p-2 rounded bg-gray-900 text-white border border-gray-600"
                      placeholder="Description"
                    />
                    <input
                      name="image_url"
                      value={editForm.image_url}
                      onChange={handleEditChange}
                      className="w-full mb-2 p-2 rounded bg-gray-900 text-white border border-gray-600"
                      placeholder="Image URL"
                    />
                  </div>
                ) : (
                  <>
                    {product.image_url && (
                      <div className="w-full md:w-32 h-32 mb-4 md:mb-0 md:mr-4 flex-shrink-0">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white">{product.name}</h2>
                      <p className="text-blue-400 font-semibold my-2">${product.price}</p>
                      <p className="text-gray-300">{product.description}</p>
                    </div>
                  </>
                )}
                <div className="flex flex-row md:flex-col justify-start mt-4 md:mt-0 md:ml-4 md:justify-center space-x-2 md:space-x-0 md:space-y-2">
                  {editingId === product.id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(product.id)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg flex items-center justify-center"
                        title="Save"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg flex items-center justify-center"
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg flex items-center justify-center"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg flex items-center justify-center"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 animate-fadeIn">
              No products found. Try a different search or add some products.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
