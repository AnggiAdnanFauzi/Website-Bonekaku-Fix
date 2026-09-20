(function(){
  // 2. Filter Logic
  const filterBtns = document.querySelectorAll('.kfilter-btn');
  const kItems = document.querySelectorAll('.katalog-item');
  if (filterBtns.length > 0 && kItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        kItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.classList.remove('hide');
          } else {
            item.classList.add('hide');
          }
        });
      });
    });
  }

  // 3. Lightbox Logic (Zoom Timbul)
  let lightbox = document.getElementById('lightbox-overlay');
  if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'lightbox-overlay';
      lightbox.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(5px); z-index:9999; display:none; align-items:center; justify-content:center; opacity:0; transition:opacity 0.3s; cursor:zoom-out;';
      
      const lbImg = document.createElement('img');
      lbImg.id = 'lightbox-img';
      lbImg.style.cssText = 'max-width:90%; max-height:90%; border-radius:15px; box-shadow:0 10px 40px rgba(0,0,0,0.5); transform:scale(0.8); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); object-fit:contain;';
      lightbox.appendChild(lbImg);
      document.body.appendChild(lightbox);
      
      lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        lbImg.style.transform = 'scale(0.8)';
        setTimeout(() => { lightbox.style.display = 'none'; }, 300);
      });
  }
  
  // We need to use event delegation because items might be cloned!
  document.addEventListener('click', (e) => {
      const img = e.target.closest('.mf-card .favorite-img-wrap img');
      if (img) {
          e.stopPropagation();
          const lbImg = document.getElementById('lightbox-img');
          lbImg.src = img.src;
          lightbox.style.display = 'flex';
          void lightbox.offsetWidth; // force reflow
          lightbox.style.opacity = '1';
          lbImg.style.transform = 'scale(1)';
      }
  });

  

  // 4. Modern Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-top');
  
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('active');
                  // Optional: observer.unobserve(entry.target); // If you only want it to animate once
              } else {
                  // Optional: remove 'active' when scrolling away to replay animation when scrolling back
                  // entry.target.classList.remove('active'); 
              }
          });
      }, {
          root: null,
          threshold: 0.15, // Trigger when 15% visible
          rootMargin: "0px 0px -50px 0px"
      });

      revealElements.forEach(el => {
          revealObserver.observe(el);
      });
  } else {
      // Fallback for older browsers
      revealElements.forEach(el => el.classList.add('active'));
  }

})();