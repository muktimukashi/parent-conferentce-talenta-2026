const slides = [...document.querySelectorAll('.slide')];
    const currentEl = document.getElementById('current');
    const totalEl = document.getElementById('total');
    const progress = document.getElementById('progress');
    let index = 0;

    totalEl.textContent = slides.length;

    function showSlide(newIndex) {
      index = (newIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      currentEl.textContent = index + 1;
      progress.style.width = `${((index + 1) / slides.length) * 100}%`;
    }

    document.getElementById('next').addEventListener('click', () => showSlide(index + 1));
    document.getElementById('prev').addEventListener('click', () => showSlide(index - 1));

    document.addEventListener('keydown', (event) => {
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) showSlide(index + 1);
      if (['ArrowLeft', 'PageUp'].includes(event.key)) showSlide(index - 1);
      if (event.key === 'Home') showSlide(0);
      if (event.key === 'End') showSlide(slides.length - 1);
    });

    let startX = null;
    document.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    document.addEventListener('touchend', e => {
      if (startX === null) return;
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) showSlide(index + (diff < 0 ? 1 : -1));
      startX = null;
    });

    showSlide(0);
