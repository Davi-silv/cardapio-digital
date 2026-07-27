# Pastel da Casa — Cardápio Digital

Cardápio digital premium para a pastelaria **Pastel da Casa**, com visual escuro (carvão + dourado), bandeja de pedidos e envio direto pelo **WhatsApp**.

Ideal para uso via **QR Code** no balcão ou nas mesas.

---

## Demonstração local

```bash
cd cardapio-digital
python3 -m http.server 5570
```

Abra: [http://127.0.0.1:5570](http://127.0.0.1:5570)

Ou use a extensão **Live Server / Go Live** no Cursor (porta configurada: `5570`).

---

## Funcionalidades

- Hero full-screen com marca e CTA
- Categorias: Salgados, Especiais, Doces, Combos & Promos
- Cards com foto ilustrativa, descrição e preço
- Bandeja lateral (adicionar / alterar quantidade)
- Pedido enviado ao WhatsApp **(22) 99848-0314**
- Layout responsivo (celular, tablet e desktop)
- Animações leves (Ken Burns, scroll reveal, zoom nas fotos)
- Aviso de fotos meramente ilustrativas

---

## Estrutura do projeto

```text
cardapio-digital/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos e responsividade
├── js/
│   └── main.js         # Bandeja, WhatsApp, animações
├── assets/
│   └── food/           # Imagens do hero e dos itens
├── docs/
│   ├── GUIA.md         # Guia completo (edição, deploy, WhatsApp)
│   └── CARDAPIO.md     # Lista de itens e preços
├── README.md
└── .vscode/
    └── settings.json   # Configuração do Live Server
```

---

## Tecnologias

| Camada     | Stack                          |
|------------|--------------------------------|
| Marcação   | HTML5 semântico                |
| Estilo     | CSS3 (Grid, Flexbox, clamp)    |
| Script     | JavaScript (vanilla, ES6+)     |
| Fontes     | Cormorant Garamond + DM Sans   |
| Pedidos    | WhatsApp (`wa.me`)             |

Sem build step, sem framework — basta hospedar os arquivos estáticos.

---

## WhatsApp

Número configurado em `js/main.js`:

```js
const WHATSAPP_NUMBER = "5522998480314"; // (22) 99848-0314
```

Ao clicar em **Pedir no WhatsApp**, o cliente abre uma conversa com o pedido formatado.

---

## Personalização rápida

| O quê              | Onde                          |
|--------------------|-------------------------------|
| Itens e preços     | `index.html` (cards)          |
| Número WhatsApp    | `js/main.js` → `WHATSAPP_NUMBER` |
| Cores / tipografia | `css/styles.css` → `:root`    |
| Fotos              | `assets/food/`                |

Documentação detalhada: [`docs/GUIA.md`](docs/GUIA.md)

---

## Hospedagem

Qualquer host de arquivos estáticos funciona, por exemplo:

- Netlify / Vercel / Cloudflare Pages
- GitHub Pages
- Hospedagem compartilhada (upload via FTP)

Depois de publicar, gere um QR Code apontando para a URL pública.

---

## Licença / uso

Projeto desenvolvido para o cliente **Pastel da Casa**.  
As fotos dos produtos são **meramente ilustrativas**.
# cardapio-digital
