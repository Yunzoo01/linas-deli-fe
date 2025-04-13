const MenuRow =({item, handleOpen}:Props) =>{
  return (
    <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
    <img 
      className="w-full h-48 object-cover rounded-2xl" 
      src={`${item.product.imageUrl}`}
      alt="Card Image" />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
      <p className="text-gray-600 mb-2">{item.country.name}</p>
      <p className="text-gray-600 mb-2">{item.product.description}</p>
      <p className="text-gray-600 mb-4">Allerge: {item.product.allergy}</p>
      <div className="text-right">
        <button 
          onClick={() => handleOpen(item)}
          className="border border-black text-black bg-transparent px-4 py-2 rounded-l-full rounded-r-full hover:bg-black hover:text-white transition">
          Read More
        </button>
      </div>
    </div>
  </div>
  )
}

export default MenuRow;