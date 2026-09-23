/* ==========================================================================
   LANCHONETE DA HELÔ - GERENCIADOR DO CARRINHO E WHATSAPP
   ========================================================================== */

const WHATSAPP_PHONE = '5511999999999'; // Substituir pelo número real desejado

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.initElements();
    this.bindEvents();
    this.render();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('helo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Erro ao carregar carrinho:', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('helo_cart', JSON.stringify(this.items));
    } catch (e) {
      console.error('Erro ao salvar carrinho:', e);
    }
    this.render();
  }

  initElements() {
    this.floatingCartBtn = document.getElementById('floatingCartBtn');
    this.cartCountBadge = document.getElementById('cartCountBadge');
    this.cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
    this.cartDrawer = document.getElementById('cartDrawer');
    this.cartItemsList = document.getElementById('cartItemsList');
    this.cartTotalAmount = document.getElementById('cartTotalAmount');
    this.btnCloseDrawer = document.getElementById('btnCloseDrawer');
    this.btnCheckoutWhatsApp = document.getElementById('btnCheckoutWhatsApp');
    
    // Inputs opcionais
    this.clientNameInput = document.getElementById('clientName');
    this.deliveryTypeSelect = document.getElementById('deliveryType');
    this.clientAddressInput = document.getElementById('clientAddress');
    this.orderNotesInput = document.getElementById('orderNotes');
  }

  bindEvents() {
    // Abrir carrinho ao clicar no botão flutuante
    if (this.floatingCartBtn) {
      this.floatingCartBtn.addEventListener('click', () => this.openCart());
    }

    // Botões "Faça seu pedido" ou links diretos
    const triggerButtons = document.querySelectorAll('.trigger-open-cart');
    triggerButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Se estiver na página do cardápio abre o drawer, caso contrário navega
        if (window.location.pathname.includes('cardapio.html')) {
          e.preventDefault();
          this.openCart();
        }
      });
    });

    // Fechar gaveta do carrinho
    if (this.btnCloseDrawer) {
      this.btnCloseDrawer.addEventListener('click', () => this.closeCart());
    }

    if (this.cartDrawerOverlay) {
      this.cartDrawerOverlay.addEventListener('click', () => this.closeCart());
    }

    // Finalizar no WhatsApp
    if (this.btnCheckoutWhatsApp) {
      this.btnCheckoutWhatsApp.addEventListener('click', () => this.checkoutWhatsApp());
    }

    // Delegação de cliques para botões de adicionar do cardápio
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.btn-add-cart');
      if (addBtn) {
        const id = addBtn.getAttribute('data-id');
        const name = addBtn.getAttribute('data-name');
        const price = parseFloat(addBtn.getAttribute('data-price'));
        this.addItem({ id, name, price });
      }
    });
  }

  openCart() {
    if (this.cartDrawerOverlay && this.cartDrawer) {
      this.cartDrawerOverlay.classList.add('open');
      this.cartDrawer.classList.add('open');
    }
  }

  closeCart() {
    if (this.cartDrawerOverlay && this.cartDrawer) {
      this.cartDrawerOverlay.classList.remove('open');
      this.cartDrawer.classList.remove('open');
    }
  }

  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
    this.saveCart();

    if (typeof showToast === 'function') {
      showToast(`🍔 <strong>${product.name}</strong> adicionado ao seu pedido!`);
    }
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
  }

  updateQuantity(id, delta) {
    const item = this.items.find(item => item.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(id);
    } else {
      this.saveCart();
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  render() {
    const totalCount = this.getTotalCount();
    const total = this.getTotal();

    // Atualizar badge flutuante
    if (this.cartCountBadge) {
      this.cartCountBadge.textContent = totalCount;
    }

    // Atualizar valor total
    if (this.cartTotalAmount) {
      this.cartTotalAmount.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Renderizar lista de itens no Drawer
    if (this.cartItemsList) {
      if (this.items.length === 0) {
        this.cartItemsList.innerHTML = `
          <div class="cart-empty-state">
            <p style="font-size: 2.5rem; margin-bottom: 8px;">🍟</p>
            <h4 style="font-family: var(--font-rounded); color: var(--color-text-dark); margin-bottom: 6px;">Seu pedido está vazio</h4>
            <p style="font-size: 0.9rem;">Escolha lanches, porções ou sobremesas deliciosas para adicionar!</p>
          </div>
        `;
      } else {
        this.cartItemsList.innerHTML = this.items.map(item => `
          <div class="cart-item">
            <div class="cart-item-details">
              <h5>${item.name}</h5>
              <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="cart-item-actions">
              <button class="qty-btn" onclick="window.cart.updateQuantity('${item.id}', -1)">-</button>
              <span class="cart-item-qty">${item.quantity}</span>
              <button class="qty-btn" onclick="window.cart.updateQuantity('${item.id}', 1)">+</button>
              <button class="btn-remove-item" onclick="window.cart.removeItem('${item.id}')" style="color: #999; margin-left: 6px; font-size: 1.1rem;" title="Remover item">✕</button>
            </div>
          </div>
        `).join('');
      }
    }
  }

  checkoutWhatsApp() {
    if (this.items.length === 0) {
      alert('Seu carrinho está vazio! Adicione pelo menos um item para fazer o pedido.');
      return;
    }

    const clientName = this.clientNameInput ? this.clientNameInput.value.trim() : '';
    const deliveryType = this.deliveryTypeSelect ? this.deliveryTypeSelect.value : 'Entrega';
    const clientAddress = this.clientAddressInput ? this.clientAddressInput.value.trim() : '';
    const notes = this.orderNotesInput ? this.orderNotesInput.value.trim() : '';

    let text = `*🍔 NOVO PEDIDO - LANCHONETE DA HELÔ 🍔*\n`;
    text += `--------------------------------------\n`;
    
    this.items.forEach(item => {
      const sub = (item.price * item.quantity).toFixed(2).replace('.', ',');
      text += `• ${item.quantity}x ${item.name} - R$ ${sub}\n`;
    });

    const totalStr = this.getTotal().toFixed(2).replace('.', ',');
    text += `--------------------------------------\n`;
    text += `*TOTAL:* R$ ${totalStr}\n\n`;

    text += `*Tipo de Pedido:* ${deliveryType}\n`;
    if (clientName) text += `*Nome:* ${clientName}\n`;
    if (clientAddress && deliveryType === 'Entrega') text += `*Endereço:* ${clientAddress}\n`;
    if (notes) text += `*Observações:* ${notes}\n`;

    text += `\nMuito obrigado! Aguardo a confirmação do pedido e prazo de entrega.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;
    
    // Abre em nova aba
    window.open(whatsappUrl, '_blank');
  }
}

// Inicializar globalmente
document.addEventListener('DOMContentLoaded', () => {
  window.cart = new CartManager();
});
