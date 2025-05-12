import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { ShoppingBag, Plus, Moon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('form');

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-gray-200">
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <ShoppingBag className="mr-3 text-blue-400" />
          StoreManager
        </h1>
        
      </header>
      
      <div className="max-w-4xl mx-auto mb-6 bg-gray-800 p-1 rounded-lg border border-gray-700">
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center transform transition-transform active:scale-98 ${
              activeTab === 'form' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-gray-200'
            }`}
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center transform transition-transform active:scale-98 ${
              activeTab === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShoppingBag size={18} className="mr-2" />
            My Products
          </button>
        </div>
      </div>

      <div className="animate-fadeIn">
        {activeTab === 'form' ? <ProductForm /> : <ProductList />}
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
