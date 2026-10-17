// Two Little Layers — monta a página inicial e as páginas de coleção a partir de produtos.js.
// Cada página define no <body>: data-page ("home" ou o id da coleção) e data-base ("" na raiz, "../" nas coleções).
(function () {
  const loja = window.LOJA;
  const BASE = document.body.dataset.base || "";
  const PAGE = document.body.dataset.page || "home";
  const preview = new URLSearchParams(location.search).has("preview");
  const produtos = window.PRODUTOS.filter(p => preview || !p.rascunho);
  const personagens = window.PERSONAGENS || [];
  const colecoes = (loja.colecoes || []).filter(c => preview || c.publicada !== false);
  const colecao = colecoes.find(c => c.id === PAGE);
  const natal = PAGE === "christmas";

  const igIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
  const waIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c.1.2.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.7-.9c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.7-.1 1.2z"/></svg>';

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = n => "$" + Number(n).toFixed(2).replace(/\.00$/, "");
  const src = f => esc(BASE + f);
  const troca = loja.troca;

  // Mensagens prontas: cada botão leva um texto diferente pro WhatsApp e pra DM.
  const MSGS = {};
  function mensagem(id, texto) { MSGS[id] = texto; return id; }
  function msgProduto(p) {
    let t = `Hi Two Little Layers! I'd like to order the ${p.nome}${p.preco != null ? " (" + money(p.preco) + ")" : ""}.`;
    if (p.customizavel) t += " Characters I'd like: ";
    return t + (p.colecao === "christmas" ? " 🎄" : "");
  }
  const MSG_CUSTOM = "Hi Two Little Layers! I have an idea for a custom piece.";
  const MSG_JESUS = "Hi Two Little Layers! I'd like Mini Jesus in my Christmas set ✝️. The set I want is: ";

  function botoes(id) {
    return `<a class="btn wa" href="https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(MSGS[id])}" target="_blank" rel="noopener">${waIcon}WhatsApp</a>
            <button class="btn ig" type="button" data-msg="${esc(id)}">${igIcon}Instagram</button>`;
  }

  // Instagram não aceita mensagem pré-preenchida: copio o texto e abro a DM.
  function abrirDM(id) {
    const ir = () => window.open(`https://ig.me/m/${loja.instagram}`, "_blank", "noopener");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(MSGS[id] || MSG_CUSTOM).then(() => toast("Message copied! Just paste it in our DM."), () => {}).finally(ir);
    } else ir();
  }

  function toast(t) {
    const el = document.getElementById("toast");
    el.textContent = t;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2600);
  }

  // Foto ainda não enviada: troca pelo aviso sem quebrar o card.
  window.semFoto = function (img) {
    const box = img.parentElement;
    box.classList.remove("full");
    const ph = document.createElement("div");
    ph.className = "ph";
    ph.textContent = "Photo coming soon";
    img.replaceWith(ph);
  };

  const linhaTroca = () => troca
    ? `<div class="swap">✨ Make it yours: swap any character for ${money(troca.preco)} each, or ${money(troca.precoJesus)} for Mini Jesus ✝️. <a href="#characters">See characters</a></div>`
    : "";

  function card(p) {
    const foto = p.foto
      ? `<img src="${src(p.foto)}" alt="${esc(p.nome)}" onerror="semFoto(this)">`
      : `<div class="ph">${esc(p.nome)}<br>photo coming soon</div>`;
    const preco = p.precos && p.precos.length
      ? `<ul class="prices">${p.precos.map(o => `<li><span>${esc(o.label)}</span><strong>${money(o.preco)}</strong></li>`).join("")}</ul>`
      : p.preco != null
        ? `<div class="price">${money(p.preco)}</div>`
        : `<div class="price ask">Price on request</div>`;
    const opcoes = p.opcoes && p.opcoes.length ? `<div class="opts">Options: ${p.opcoes.map(esc).join(" · ")}</div>` : "";
    const id = mensagem("p:" + p.id, msgProduto(p));
    return `<article class="card">
      <div class="photo${p.fotoInteira ? " full" : ""}">${foto}
        ${p.destaque ? '<span class="badge">Best gift</span>' : ""}
        ${p.rascunho ? '<span class="badge draft">Draft</span>' : ""}
      </div>
      <div class="body">
        <h3 class="name">${esc(p.nome)}</h3>
        <p class="desc">${esc(p.descricao)}${p.personalizavel ? " Can be personalized." : ""}</p>
        ${opcoes}${p.customizavel ? linhaTroca() : ""}${preco}
        <div class="actions">${botoes(id)}</div>
      </div>
    </article>`;
  }

  function cabecalho(titulo, sub) {
    const nav = [{ id: "home", nome: "Home", href: BASE || "./" }, ...colecoes.map(c => ({ id: c.id, nome: c.nome, href: `${BASE}${c.id}/` }))];
    return `<header>
      <a href="${BASE || "./"}"><img class="logo${PAGE === "home" ? "" : " small"}" src="${src("logo.webp")}" alt="Two Little Layers logo"></a>
      <h1 class="brand">${esc(loja.nome)}</h1>
      <div class="tag">Custom creations made layer by layer</div>
      <nav class="topnav" aria-label="Collections">${nav.map(n => `<a href="${n.href}"${n.id === PAGE ? ' aria-current="page"' : ""}>${esc(n.nome)}</a>`).join("")}</nav>
      ${titulo ? `<p class="title">${esc(titulo)}</p>` : ""}
      ${sub ? `<p class="sub">${esc(sub)}</p>` : ""}
      ${natal && loja.pedidoAte ? `<div class="deadline">🎄 Christmas orders close ${esc(loja.pedidoAte)}</div>` : ""}
      ${loja.prazoEntrega && PAGE !== "home" ? `<p class="lead">Made to order · ready in ${esc(loja.prazoEntrega)}</p>` : ""}
    </header>`;
  }

  function blocoJesus() {
    const jesus = personagens.find(c => c.id === "jesus");
    if (!jesus || !troca) return "";
    const nomes = produtos.filter(p => p.customizavel).map(p => p.nome);
    const kits = nomes.length > 1 ? nomes.slice(0, -1).join(", ") + " or " + nomes[nomes.length - 1] : nomes.join("");
    const id = mensagem("jesus", MSG_JESUS);
    return `<section class="jesus">
      <img src="${src(jesus.foto)}" alt="Mini Jesus figure">
      <div class="txt">
        <div class="kick">New for Christmas</div>
        <h2>Make it with Jesus ✝️</h2>
        <p>Keep Christ in Christmas. Swap any character in our ${esc(kits)} for Mini Jesus, printed in soft colors, layer by layer.</p>
        <p class="price">${money(troca.precoJesus)} per swap</p>
        <div class="actions">${botoes(id)}</div>
      </div>
    </section>`;
  }

  function blocoPersonagens() {
    if (!personagens.length || !troca) return "";
    return `<section class="chars" id="characters">
      <h2>Choose your characters</h2>
      <p>Our Christmas Mini Set, Feliz Natal Set and Village Set can be customized. Swap any piece for the characters you love. New characters coming soon!</p>
      <ul>${personagens.map(c => `<li class="${c.destaque ? "star" : ""}"><img src="${src(c.foto)}" alt="${esc(c.nome)}" onerror="semFoto(this)">${esc(c.nome)}<small>${money(c.id === "jesus" ? troca.precoJesus : troca.preco)} swap</small></li>`).join("")}</ul>
    </section>`;
  }

  function blocoCustom() {
    const id = mensagem("custom", MSG_CUSTOM);
    return `<section class="custom">
      <h2>Have an idea? We'll make it.</h2>
      <p>Names, colors, sizes, a little gift for someone special. Tell us what you're dreaming of and we'll bring it to life, one layer at a time.</p>
      <div class="actions">${botoes(id)}</div>
    </section>`;
  }

  const rodape = () => `<footer>
      Made with love in ${esc(loja.cidade)} 🤎<br>
      <a href="https://www.instagram.com/${esc(loja.instagram)}" target="_blank" rel="noopener">@${esc(loja.instagram)}</a>
    </footer>`;

  function paginaInicial() {
    const top = colecoes.find(c => c.destaque) || colecoes[0];
    const outras = colecoes.filter(c => c !== top);
    return cabecalho("", "") + `
      <a class="hero" href="${BASE}${top.id}/">
        <img src="${src(top.foto)}" alt="${esc(top.titulo)}">
        <div class="over">
          <div class="kick">${top.id === "christmas" && loja.pedidoAte ? "Orders close " + esc(loja.pedidoAte) : "Featured"}</div>
          <h2>${esc(top.titulo)}</h2>
          <p>${esc(top.chamada)}</p>
          <span class="pill">Shop ${esc(top.nome)} →</span>
        </div>
      </a>
      ${blocoJesus()}
      ${outras.length ? `<h2 class="section-title">Shop by collection</h2>
      <div class="cols">${outras.map(c => `<a class="col" href="${BASE}${c.id}/"><img src="${src(c.foto)}" alt="${esc(c.nome)}"><div><b>${esc(c.nome)}</b><span>${esc(c.chamada)}</span></div></a>`).join("")}
        <a class="col" href="#custom"><img src="${src("fotos/feliz-natal-snowflake.webp")}" alt="Custom orders"><div><b>Custom orders</b><span>Your idea, printed just for you.</span></div></a>
      </div>` : ""}
      <section class="story">
        <h2>Hello, we're Two Little Layers ♡</h2>
        What started as a 3D printer in our home and a love for creating is becoming something a little bigger.
        Our name was inspired by our two little girls and by the many layers that come together to turn an idea into something real.
        Made with love, layer by layer, in ${esc(loja.cidade)}.
      </section>
      <div id="custom">${blocoCustom()}</div>` + rodape();
  }

  function paginaColecao() {
    const lista = produtos.filter(p => p.colecao === PAGE);
    const grade = `<main class="grid">${lista.length ? lista.map(card).join("") : '<p class="empty">New pieces coming soon. Send us a DM!</p>'}</main>`;
    return cabecalho(colecao ? colecao.titulo : "", colecao ? colecao.chamada : "")
      + (natal ? blocoJesus() : "")
      + grade
      + (natal ? blocoPersonagens() : "")
      + blocoCustom() + rodape();
  }

  document.getElementById("app").innerHTML = PAGE === "home" ? paginaInicial() : paginaColecao();
  document.body.addEventListener("click", e => {
    const b = e.target.closest(".btn.ig");
    if (b) abrirDM(b.dataset.msg);
  });
})();
