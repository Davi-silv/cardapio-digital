# Pastel da Casa — Cardápio Digital

<div align="center">

### Cardápio responsivo com seleção de itens e pedidos pelo WhatsApp

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![WhatsApp](https://img.shields.io/badge/Pedidos-WhatsApp-25D366?logo=whatsapp&logoColor=white)](https://www.whatsapp.com/)

**[Repositório](https://github.com/Davi-silv/cardapio-digital)** · **[Portfólio do desenvolvedor](https://portifolio-future.vercel.app/)**

</div>

---

## Sobre o projeto

O **Pastel da Casa** é um cardápio digital desenvolvido com HTML, CSS e JavaScript sem frameworks. A interface apresenta produtos, preços e categorias e permite organizar uma seleção antes de abrir o **WhatsApp com o pedido formatado**.

A solução foi concebida para acesso por celular, inclusive por QR Code em balcões ou mesas.

## Funcionalidades

| Recurso | Descrição |
| --- | --- |
| Catálogo | Itens com foto ilustrativa, descrição e preço |
| Categorias | Salgados, especiais, doces, combos e promoções |
| Bandeja de pedidos | Adição de itens e ajuste de quantidades |
| WhatsApp | Composição da mensagem de pedido e abertura da conversa |
| Responsividade | Layout para celular, tablet e desktop |
| Animações | Efeitos visuais leves em fotos e elementos da página |

> O projeto **não implementa checkout ou processamento de pagamentos**: a etapa de pedido é direcionada ao WhatsApp.

## Tecnologias

- **HTML5** com estrutura semântica;
- **CSS3**, Grid, Flexbox e unidades responsivas;
- **JavaScript ES6+** sem frameworks;
- Integração por link `wa.me`;
- Fontes **Cormorant Garamond** e **DM Sans**.

## Estrutura

```text
index.html       # Estrutura e cards do cardápio
css/styles.css   # Estilos e responsividade
js/main.js       # Bandeja, WhatsApp e animações
assets/food/     # Imagens dos produtos
docs/GUIA.md     # Orientações de configuração e publicação
docs/CARDAPIO.md # Referência de itens e preços
```

## Executar localmente

Não requer instalação de dependências nem etapa de build.

```bash
git clone https://github.com/Davi-silv/cardapio-digital.git
cd cardapio-digital
python3 -m http.server 5570
```

Abra **http://127.0.0.1:5570**. Também é possível utilizar a extensão Live Server.

## Personalização

| Item | Arquivo |
| --- | --- |
| Produtos e preços | `index.html` |
| Número de WhatsApp | `js/main.js` — constante `WHATSAPP_NUMBER` |
| Paleta e fontes | `css/styles.css` |
| Fotos | `assets/food/` |

Para instruções detalhadas, consulte o [guia do projeto](docs/GUIA.md) e a [lista do cardápio](docs/CARDAPIO.md).

## Publicação

Por ser um site estático, pode ser hospedado em serviços de publicação de arquivos HTML/CSS/JS, como GitHub Pages, Vercel ou Netlify. Após o deploy, um QR Code pode direcionar ao endereço publicado.

## Autoria

Projeto **Pastel da Casa** desenvolvido por **Davi Barbosa da Silva**, fundador da **Evolutiva Tech**.

[GitHub](https://github.com/Davi-silv) · [Portfólio](https://portifolio-future.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/davi-barbosa-silva/)

---

<sub>As imagens de produtos apresentadas no projeto são ilustrativas.</sub>
