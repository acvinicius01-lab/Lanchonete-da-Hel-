/* ==========================================================================
   LANCHONETE DA HELÔ - LIGHTBOX DA GALERIA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  if (!lightboxModal || !lightboxImg) return;

  // Ao clicar em um item da galeria
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const captionText = item.getAttribute('data-caption') || img.getAttribute('alt') || '';
      
      lightboxImg.src = img.src;
      lightboxCaption.textContent = captionText;
      lightboxModal.classList.add('open');
      document.body.style.overflow = 'hidden'; // trava scroll
    });
  });

  // Função para fechar o modal
  const closeLightbox = () => {
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Fechar com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
      closeLightbox();
    }
  });
});
