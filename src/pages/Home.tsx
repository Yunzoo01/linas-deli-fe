import Hero from "../sections/home/Hero";
import About from "../sections/home/About";
import BestMenu from "../sections/home/BestMenu";
import Order from "../sections/home/OrderSection";
import Instagram from "../sections/home/Instagram";

const Home = () => {
  return (
    <div>
      <Hero />
      <BestMenu />
      <About />
      <Order />
      <Instagram />
    </div>
  );
};

export default Home;