import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import AddItem from './pages/AddItem';
import ViewItems from './pages/ViewItems';
import ItemDetail from './pages/ItemDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to={"/"} className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-medium text-gray-900">Item Manager</h1>
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900"
                >
                  View Items
                </Link>
                <Link
                  to="/add"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900"
                >
                  Add Item
                </Link>
              </div>
            </div>
          </div>
        </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<ViewItems />} />
              <Route path="/add" element={<AddItem />} />
              <Route path="/items/:id" element={<ItemDetail />} /> {/* New route */}
            </Routes>
          </motion.div>
        </main>

        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;