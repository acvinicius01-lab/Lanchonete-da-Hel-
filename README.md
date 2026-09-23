# 🍔 Lanchonete da Helô - Website Completo

Projeto web moderno, responsivo e 100% funcional desenvolvido sob medida para a **Lanchonete da Helô**, reproduzindo com fidelidade os mockups visuais e incluindo todas as páginas navegáveis com carrinho de compras integrado ao WhatsApp!

---

## 🚀 Como Abrir e Rodar no VS Code

### Método 1: Pelo Terminal do VS Code (Mais Rápido)

1. Abra o VS Code.
2. Vá em **File (Arquivo)** > **Open Folder (Abrir Pasta)** e selecione:
   ```
   C:\Users\acvin\.gemini\antigravity\scratch\lanchonete-da-helo
   ```
   _(Ou abra o terminal e digite: `code C:\Users\acvin\.gemini\antigravity\scratch\lanchonete-da-helo`)_
3. Abra o terminal integrado do VS Code (`Ctrl + '` ou menu **Terminal** > **New Terminal**).
4. Digite o comando abaixo e aperte **Enter**:
   ```bash
   npm start
   ```
5. O servidor iniciará imediatamente:
   ```
   🍔 Servidor da Lanchonete da Helô rodando com sucesso!
   👉 Acesse no navegador: http://localhost:3000
   ```
6. Basta clicar no link ou abrir `http://localhost:3000` no seu navegador!

---

### Método 2: Usando a Extensão "Live Server"

1. No VS Code, instale a extensão **Live Server** (caso ainda não tenha).
2. Clique com o botão direito no arquivo `index.html`.
3. Selecione **"Open with Live Server"**.

---

## 📄 Páginas Criadas

| Página        | Arquivo         | Descrição                                                                                                      |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| **Início**    | `index.html`    | Hero com destaque do lanche artesanal, categorias e banner institucional _"Feito com amor, servido pra você!"_ |
| **Cardápio**  | `cardapio.html` | Cardápio interativo com filtros por categoria, fotos, preços, badges e botão de adicionar ao pedido            |
| **Sobre Nós** | `sobre.html`    | História da Helô, valores, foto do balcão aconchegante com lousa e 4 pilares de atendimento                    |
| **Galeria**   | `galeria.html`  | Grade com as 8 fotos originais dos pratos e ambiente, com **Lightbox (Zoom ao clicar)**                        |
| **Contato**   | `contato.html`  | Endereço, horários de funcionamento, telefone, formas de pagamento e mapa                                      |

---

## 🛒 Carrinho de Compras & WhatsApp

- **Carrinho Flutuante**: Acessível em todas as páginas pelo botão flutuante no canto inferior direito.
- **Gaveta Lateral (Drawer)**: Permite ajustar quantidades (`+` e `-`), remover itens e adicionar dados de entrega e observações.
- **Envio Automático para WhatsApp**: Ao clicar em _"Enviar Pedido no WhatsApp"_, o sistema formata a mensagem com a lista de itens, valores e total, abrindo a conversa pronta para envio!

### 📱 Como configurar o seu número de WhatsApp:

No arquivo [`js/cart.js`](file:///C:/Users/acvin/.gemini/antigravity/scratch/lanchonete-da-helo/js/cart.js), altere a linha 5 para o seu número com DDD (apenas números):

```javascript
const WHATSAPP_PHONE = "558487543937"; // Número da Helô configurado
```

---

## 📁 Estrutura de Pastas

```
lanchonete-da-helo/
├── index.html              # Página Inicial
├── cardapio.html           # Cardápio completo
├── sobre.html              # Sobre Nós
├── galeria.html            # Galeria com Lightbox
├── contato.html            # Contato e Localização
├── server.js               # Servidor local leve em Node.js
├── package.json            # Scripts de execução
├── css/
│   └── styles.css          # Estilos principais, responsivos e tema
├── js/
│   ├── main.js             # Menu mobile e navegação
│   ├── cart.js             # Carrinho de compras e integração WhatsApp
│   └── gallery.js          # Visualizador Lightbox de fotos
└── assets/
    └── images/             # Fotos recortadas e logo SVG
```
