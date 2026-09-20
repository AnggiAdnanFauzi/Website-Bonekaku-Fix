import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SouvenirCarousel({ items }) {
  const getImgSrc = (img) => {
    if (!img) return "/Icon-001b.png";
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    return "/" + img;
  };

  let displayProducts = items ? [...items] : [];
  if (displayProducts.length > 0 && displayProducts.length < 10) {
    displayProducts = [...displayProducts, ...displayProducts, ...displayProducts, ...displayProducts];
  }

  return (
    <div className="mf-carousel-wrapper" style={{ padding: "10px 0 60px 0" }}>
      <style>{`
        .mf-swiper { padding-top: 50px !important; margin-top: -50px !important; padding-bottom: 70px !important; margin-bottom: -20px !important; overflow: hidden !important; }
        .mf-swiper-controls { display: flex; justify-content: center; align-items: center; margin-top: -5px; }
        .mf-swiper-controls .btn { border: 2px solid var(--primary); color: var(--primary); background: transparent; transition: 0.3s; display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; padding: 0; }
        .mf-swiper-controls .btn:hover { background: var(--primary); color: #fff; transform: scale(1.1); }
        .swiper-pagination-bullet { background: var(--primary); width: 10px; height: 10px; }
        .swiper-pagination-bullet-active { background: var(--secondary); transform: scale(1.2); }
      `}</style>
      {displayProducts.length > 0 && (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 }
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ el: '.mf-swiper-pagination', clickable: true }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mf-swiper"
        >
          {displayProducts.map((p, i) => (
            <SwiperSlide key={(p.id || i) + "-" + i}>
              <div className="mf-card" style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'visible', zIndex: 1, transition: 'z-index 0.3s' }}>
                  <div className="favorite-img-wrap" style={{ position: 'relative', zIndex: 2, transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transformStyle: 'preserve-3d' }}>
                      <img 
                          src={getImgSrc(p.image_url || p.image)} 
                          alt={p.name} 
                          style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "var(--radius-md)", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }} 
                      />
                  </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      
      <div className="mf-swiper-controls" style={{ marginTop: "-5px" }}>
         <div className="mf-swiper-pagination" style={{ position: 'relative', width: 'auto', bottom: 'auto' }}></div>
      </div>
    </div>
  );
}
