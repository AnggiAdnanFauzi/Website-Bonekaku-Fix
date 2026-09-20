import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function NewProductsCoverflow({ items }) {
  const getImgSrc = (img) => {
    if (!img) return "/Icon-001b.png";
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    return "/" + img;
  };

  let displayProducts = items ? [...items] : [];
  // Ensure we have enough slides for coverflow loop
  if (displayProducts.length > 0 && displayProducts.length < 10) {
    displayProducts = [...displayProducts, ...displayProducts, ...displayProducts, ...displayProducts];
  }

  return (
    <div className="np-coverflow-wrapper" style={{ padding: "20px 0 60px 0" }}>
      <style>{`
        .np-coverflow-swiper { padding-bottom: 60px !important; }
        .swiper-pagination-bullet { background: var(--primary); width: 10px; height: 10px; }
        .swiper-pagination-bullet-active { background: var(--secondary); transform: scale(1.2); }
        .np-coverflow-controls .btn { 
            border: 2px solid var(--primary); color: var(--primary); background: transparent; 
            transition: 0.3s; display: flex; align-items: center; justify-content: center;
        }
        .np-coverflow-controls .btn:hover { background: var(--primary); color: #fff; transform: scale(1.1); }
      `}</style>
      {displayProducts.length > 0 && (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          watchSlidesProgress={true}
          coverflowEffect={{
            rotate: 0,
            stretch: -30,
            depth: 250,
            modifier: 2.5,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ el: '.np-coverflow-pagination', clickable: true }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="np-coverflow-swiper"
        >
          {displayProducts.map((p, i) => (
            <SwiperSlide key={(p.id || i) + "-" + i} style={{ width: "320px", maxWidth: "80%" }}>
              <div className="np-slide-card" style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                  border: '4px solid #fff'
              }}>
                  <div className="np-new-badge" style={{
                      position:'absolute', top:'15px', left:'15px', 
                      background:'linear-gradient(135deg,#00b09b,#96c93d)', 
                      color:'#fff', padding:'5px 15px', borderRadius:'50px', 
                      fontSize:'0.8rem', fontWeight:'800', zIndex:10,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                  }}>NEW</div>
                  <img 
                      src={getImgSrc(p.image_url || p.image)} 
                      alt={p.name} 
                      style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }} 
                  />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      
      <div className="np-coverflow-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-15px' }}>
         <div className="np-coverflow-pagination" style={{ position: 'relative', width: 'auto', bottom: 'auto' }}></div>
      </div>
    </div>
  );
}
