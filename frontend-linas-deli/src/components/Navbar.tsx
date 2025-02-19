import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-gray-900">Lina's Deli</Link>
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link></li>
          <li><Link to="/menu" className="text-gray-700 hover:text-gray-900">Menu</Link></li>
          <li><Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link></li>
          <li><Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link></li>
        </ul>
        <button className="md:hidden text-gray-700">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;