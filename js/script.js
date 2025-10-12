/* script.js - carousel, theme, form */
document.addEventListener('DOMContentLoaded', function(){

  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // simple entrance animations
  document.querySelectorAll('.section, .hero').forEach((el,i)=>{
    setTimeout(()=>el.classList.add('show'), 120 + i*80);
  });
  });

  // CAROUSEL
  const track = document.getElementById('track');
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector('[data-action="prev"]');
  const nextBtn = document.querySelector('[data-action="next"]');
  const dotsWrap = document.getElementById('dots');
  let index = 0;
  let autoplay = true;
  let autoplayTimer = null;
  const slideWidth = slides[0].getBoundingClientRect().width + 16; // gap

  // place slides inline (CSS already handles), create dots
  slides.forEach((s, i)=>{
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.dataset.index = i;
    dot.setAttribute('aria-label','Перейти к слайду '+(i+1));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);
  function update(){
    track.scrollTo({left: index*slideWidth, behavior:'smooth'});
    dots.forEach(d=>d.classList.remove('active'));
    dots[index]?.classList.add('active');
  }

  prevBtn.addEventListener('click', ()=>{ index = (index-1+slides.length)%slides.length; update(); resetAutoplay(); });
  nextBtn.addEventListener('click', ()=>{ index = (index+1)%slides.length; update(); resetAutoplay(); });

  dots.forEach(d=> d.addEventListener('click', e=>{ index = Number(e.target.dataset.index); update(); resetAutoplay(); }));

  function startAutoplay(){
    if(autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(()=>{ index = (index+1)%slides.length; update(); }, 4000);
  }
  function resetAutoplay(){ if(autoplay) startAutoplay(); }
  startAutoplay();

  // contact form (fake)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    formMsg.textContent = 'Отправка...';
    setTimeout(()=>{
      formMsg.textContent = 'Спасибо! Сообщение отправлено (заглушка).';
      form.reset();
    }, 900);
  });

  // small accessibility: keyboard arrows to control carousel
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight') { index = (index+1)%slides.length; update(); resetAutoplay(); }
    if(e.key === 'ArrowLeft') { index = (index-1+slides.length)%slides.length; update(); resetAutoplay(); }
  });
