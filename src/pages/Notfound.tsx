// src/pages/NotFound.tsx
const NotFound = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-600">404</h1>
          <p className="text-xl mt-4">Page Not Found</p>
          <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist.</p>
        </div>
      </div>
    );
  };
  
  export default NotFound;