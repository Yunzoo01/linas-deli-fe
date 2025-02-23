import home from "../assets/home.jpeg";

const Home = () => {
    return (
      <div>
        <img src={home} alt="Menu Icon" />
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Lina's Deli</h1>
      </div>
    );
  };
  
  export default Home;