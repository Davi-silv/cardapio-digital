# Guia do projeto — Pastel da Casa

Documentação operacional para editar, testar e publicar o cardápio digital.

---

## 1. Visão geral

O site é uma **SPA estática** (single page) com:

1. **Hero** — marca, tagline e botão “Explorar os sabores”
2. **Cardápio** — seções por categoria com cards de produto
3. **Bandeja** — painel lateral que acumula itens
4. **Checkout WhatsApp** — abre `wa.me` com o texto do pedido

Não há backend: o fluxo de pedido termina no aplicativo WhatsApp do cliente.

---

## 2. Como rodar localmente

### Opção A — Python

```bash
cd /caminho/para/cardapio-digital
python3 -m http.server 5570 --bind 0.0.0.0
```

Acesse `http://127.0.0.1:5570`.

### Opção B — Live Server (Cursor / VS Code)

1. Abra a pasta `cardapio-digital` como workspace
2. Clique em **Go Live**
3. A porta configurada em `.vscode/settings.json` é **5570**

> Se o Go Live abrir outro projeto, pare o servidor antigo (clique em `Port: xxxx` na barra de status) e inicie de novo com o `index.html` deste projeto aberto.

---

## 3. Alterar o número do WhatsApp

Arquivo: `js/main.js`

```js
const WHATSAPP_NUMBER = "5522998480314";
```

Use o formato internacional **sem** `+` ou espaços:

| Número local     | Formato no código   |
|------------------|---------------------|
| (22) 99848-0314  | `5522998480314`     |
| (11) 98765-4321  | `5511987654321`     |

O prefixo `55` é o código do Brasil.

### Mensagem enviada

O texto é montado automaticamente, por exemplo:

```text
Olá! Gostaria de pedir no *Pastel da Casa*:

• 2x Frango com Requeijão — R$ 43,60
• 1x Romeu e Julieta — R$ 20,50

*Total: R$ 64,10*
```

---

## 4. Editar itens do cardápio

Cada produto é um `<article class="card">` em `index.html`.

Exemplo:

```html
<article class="card reveal" data-name="Frango com Requeijão" data-price="21.80">
  <div class="card__media">
    <span class="badge badge--popular">Popular</span>
    <img src="assets/food/s_1.jpg" alt="..." loading="lazy" width="1200" height="750" />
  </div>
  <div class="card__body">
    <div class="card__row">
      <h3 class="card__name">Frango com Requeijão</h3>
      <span class="card__price">R$&nbsp;21,80</span>
    </div>
    <p class="card__desc">Descrição do item...</p>
    <button class="card__btn" type="button">+ Adicionar à bandeja</button>
  </div>
</article>
```

### Campos importantes

| Atributo / elemento | Função |
|---------------------|--------|
| `data-name`         | Nome enviado no WhatsApp |
| `data-price`        | Preço numérico (`21.80`) usado no total |
| `.card__price`      | Preço exibido (formato BR) |
| `.card__desc`       | Descrição na tela |
| `src` da imagem     | Arquivo em `assets/food/` |

> Mantenha `data-price` e o texto de `.card__price` **iguais**.  
> `data-price` usa ponto (`21.80`); a tela usa vírgula (`R$ 21,80`).

### Badges opcionais

```html
<span class="badge badge--popular">Popular</span>
<span class="badge">Especial</span>
<span class="badge badge--promo">Promo</span>
<span class="badge badge--combo">Combo</span>
<span class="badge badge--classic">Clássico</span>
```

Lista completa de itens: [`CARDAPIO.md`](CARDAPIO.md)

---

## 5. Imagens

Pasta: `assets/food/`

| Arquivo        | Uso                          |
|----------------|------------------------------|
| `hero.jpg`     | Fundo do topo (1920×1080)    |
| `s_*.jpg`      | Pastéis salgados (1ª linha)  |
| `s2_*.jpg`     | Pastéis salgados (2ª linha)  |
| `e_*.jpg`      | Especiais                    |
| `d_*.jpg`      | Doces                        |
| `c_*.jpg`      | Combos                       |

**Recomendação para cards:** 1200×750 (16:10), JPG otimizado.  
**Hero:** 1920×1080 ou maior, foco no centro da comida.

As fotos são tratadas como **ilustrativas** (há aviso no rodapé do cardápio).

---

## 6. Design system (CSS)

Arquivo: `css/styles.css` — variáveis em `:root`

| Variável         | Uso                    |
|------------------|------------------------|
| `--charcoal`     | Fundo principal        |
| `--gold`         | Preços, acentos        |
| `--cta`          | Botão “Explorar…”      |
| `--font-display` | Títulos (serif)        |
| `--font-body`    | Texto corrido          |
| `--max`          | Largura máxima do menu |

### Breakpoints

| Largura     | Comportamento                          |
|-------------|----------------------------------------|
| &lt; 560px  | 1 coluna de cards                      |
| ≥ 560px     | 2 colunas                              |
| ≥ 768px     | Header em linha única                  |
| ≥ 1024px    | 3 colunas (especiais em 2)             |
| ≥ 1400px    | Container mais largo                   |

---

## 7. Comportamentos JavaScript

Arquivo: `js/main.js`

- **Scroll reveal** — elementos `.reveal` entram com fade
- **Nav ativa** — destaca a categoria visível
- **Bandeja** — adiciona, soma quantidade, calcula total
- **WhatsApp** — `window.open` para `https://wa.me/{numero}?text=...`
- **Escape** — fecha a bandeja
- **Header dinâmico** — ajusta `--header-h` para âncoras corretas

---

## 8. Publicar (deploy)

1. Faça upload de **toda** a pasta do projeto (mantenha a estrutura)
2. Garanta que o servidor sirva `index.html` na raiz
3. Teste no celular: categorias, bandeja e WhatsApp
4. Gere um QR Code da URL final (ex.: [qr-code-generator.com](https://www.qr-code-generator.com/))

### Checklist pós-deploy

- [ ] Página abre em HTTPS
- [ ] Imagens carregam
- [ ] WhatsApp abre com o número certo
- [ ] Layout ok no iPhone e Android
- [ ] Pedido de teste recebido no aparelho do estabelecimento

---

## 9. Solução de problemas

| Problema | Solução |
|----------|---------|
| Go Live abre outro site | Pare o Live Server antigo; confira `.vscode/settings.json` (porta 5570) |
| WhatsApp não abre | Confirme `WHATSAPP_NUMBER` com DDI `55` + DDD + número |
| Imagens quebradas | Caminhos relativos a partir de `index.html` (`assets/food/...`) |
| Âncoras cobertas pelo header | O JS recalcula `--header-h`; force um refresh completo |
| Cache antigo | Ctrl+Shift+R (hard refresh) |

---

## 10. Contato do estabelecimento

- **Nome:** Pastel da Casa  
- **WhatsApp pedidos:** (22) 99848-0314  
- **Formato API:** `5522998480314`
