(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("is-in"));
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  const sections = document.querySelectorAll(".menu-section");
  const nav = document.querySelector(".site-header__nav");
  const navLinks = document.querySelectorAll(".site-header__nav a");
  if ("IntersectionObserver" in window && sections.length) {
    const map = new Map([...navLinks].map((a) => [a.getAttribute("href")?.slice(1), a]));
    const sio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) => a.classList.remove("is-active"));
          const link = map.get(entry.target.id);
          if (!link) return;
          link.classList.add("is-active");
          if (nav && window.matchMedia("(max-width: 767px)").matches) {
            link.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
          }
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => sio.observe(s));
  }

  const tray = document.getElementById("tray");
  const backdrop = document.getElementById("tray-backdrop");
  const trayToggle = document.getElementById("tray-toggle");
  const trayClose = document.getElementById("tray-close");
  const trayList = document.getElementById("tray-list");
  const trayEmpty = document.getElementById("tray-empty");
  const trayTotal = document.getElementById("tray-total");
  const trayCount = document.getElementById("tray-count");
  const trayCheckout = document.getElementById("tray-checkout");
  const toast = document.getElementById("toast");

  /** @type {{ name: string, price: number, qty: number }[]} */
  const items = [];

  const money = (n) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  function openTray() {
    tray.classList.add("is-open");
    tray.setAttribute("aria-hidden", "false");
    trayToggle.setAttribute("aria-expanded", "true");
    backdrop.hidden = false;
    document.body.classList.add("is-tray-open");
  }

  function closeTray() {
    tray.classList.remove("is-open");
    tray.setAttribute("aria-hidden", "true");
    trayToggle.setAttribute("aria-expanded", "false");
    backdrop.hidden = true;
    document.body.classList.remove("is-tray-open");
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-on"), 1800);
  }

  function renderTray() {
    trayList.innerHTML = "";
    let total = 0;
    let count = 0;

    items.forEach((item, idx) => {
      total += item.price * item.qty;
      count += item.qty;
      const li = document.createElement("li");
      li.className = "tray__item";
      li.innerHTML = `
        <div>
          <div class="tray__item-name">${item.name}</div>
          <div class="tray__item-meta">
            <button type="button" data-dec="${idx}" aria-label="Diminuir">−</button>
            <span>${item.qty}</span>
            <button type="button" data-inc="${idx}" aria-label="Aumentar">+</button>
          </div>
        </div>
        <div class="tray__item-price">${money(item.price * item.qty)}</div>
      `;
      trayList.appendChild(li);
    });

    trayEmpty.classList.toggle("is-hidden", items.length > 0);
    trayTotal.textContent = money(total);
    trayCheckout.disabled = items.length === 0;

    if (count > 0) {
      trayCount.hidden = false;
      trayCount.textContent = String(count);
    } else {
      trayCount.hidden = true;
    }
  }

  trayList.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.dataset.inc != null) {
      items[+t.dataset.inc].qty += 1;
      renderTray();
    }
    if (t.dataset.dec != null) {
      const i = +t.dataset.dec;
      items[i].qty -= 1;
      if (items[i].qty <= 0) items.splice(i, 1);
      renderTray();
    }
  });

  document.querySelectorAll(".card__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      if (!card) return;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price || "0");
      const existing = items.find((i) => i.name === name);
      if (existing) existing.qty += 1;
      else items.push({ name, price, qty: 1 });
      renderTray();
      showToast(`${name} adicionado`);
    });
  });

  trayToggle?.addEventListener("click", () => {
    if (tray.classList.contains("is-open")) closeTray();
    else openTray();
  });
  trayClose?.addEventListener("click", closeTray);
  backdrop?.addEventListener("click", closeTray);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && tray.classList.contains("is-open")) closeTray();
  });

  const WHATSAPP_NUMBER = "5522998480314"; // (22) 99848-0314

  trayCheckout?.addEventListener("click", () => {
    if (!items.length) return;
    const lines = items.map((i) => `• ${i.qty}x ${i.name} — ${money(i.price * i.qty)}`);
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const text = `Olá! Gostaria de pedir no *Pastel da Casa*:\n\n${lines.join("\n")}\n\n*Total: ${money(total)}*`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    showToast("Abrindo WhatsApp…");
  });

  const header = document.querySelector(".site-header");
  const setHeaderVar = () => {
    if (!header) return;
    const h = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  };
  setHeaderVar();
  window.addEventListener("resize", setHeaderVar, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", setHeaderVar, { passive: true });
  }

  renderTray();
})();
