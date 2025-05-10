import { useEffect, useState } from 'react';
import { Search, Trash2, Edit, Save, X } from 'lucide-react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', description: '', image_url: '' });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
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
  try {
    const payload = {
      name: editForm.name,
      price: editForm.price,
      description: editForm.description,
      image_url: editForm.image_url, // ✅ mapping key here
    };

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const updatedProduct = await res.json();
      setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
      setEditingId(null);
    } else {
      throw new Error("Failed to update");
    }
  } catch (error) {
    alert('Error updating product');
  }
};


  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
  );

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
