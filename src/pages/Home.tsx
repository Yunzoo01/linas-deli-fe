import { useEffect, useState } from "react";
import axios from "axios";

import Hero from "../sections/home/Hero";
import About from "../sections/home/About";
import BestMenu from "../sections/home/BestMenu";
import Order from "../sections/home/OrderSection";
import Instagram from "../sections/home/Instagram";
import PromoPopupModal from "../components/PromoPopupModal";

interface Promotion {
  promotionId: number;
  promotionTitle: string;
  promotionImageUrl?: string;
  startDate: string;
  endDate: string;
}

const Home = () => {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/promotions/active")
      .then((res) => {
        const latest = res.data?.[0];
        if (latest) {
          setPromotion(latest);
          setIsModalOpen(true);
        }
      })
      .catch((err) => console.error("Failed to fetch active promotions", err));
  }, []);


  return (
    <div>
    {promotion && isModalOpen && (
      <PromoPopupModal
        promotion={promotion}
        onClose={() => setIsModalOpen(false)}
      />
    )}


      <Hero />
      <BestMenu />
      <About />
      <Order />
      <Instagram />
    </div>
  );
};

export default Home;