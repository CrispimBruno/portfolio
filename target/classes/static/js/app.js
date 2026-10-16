const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement,
  S = localStorage;
let dict = {},
  z = 10;

/* tema (escuro = preto e branco) e idioma */
const setTheme = (t) => {
  root.dataset.theme = t;
  S.theme = t;
};
setTheme(
  S.theme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
);
$("#theme").onclick = () =>
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
const apply = (r = document) =>
  $$("[data-i18n]", r).forEach((e) => {
    if (dict[e.dataset.i18n]) e.textContent = dict[e.dataset.i18n];
  });
async function setLang(l) {
  dict = await (await fetch("/api/i18n/" + l)).json();
  S.lang = l;
  root.lang = l;
  $("#lang").textContent = l === "pt" ? "EN" : "PT";
  apply();
}
$("#lang").onclick = () => setLang((S.lang || "pt") === "pt" ? "en" : "pt");
setLang(S.lang || "pt");

/* contador com os sprites 0-9 (9lana e Ado) */
const num = (el, n, pad = 0) => {
  el.innerHTML = String(n)
    .padStart(pad, "0")
    .split("")
    .map((d) => `<img src="/img/digits/${d}.png" alt="${d}">`)
    .join("");
};
const now = new Date();
num($("#dd"), now.getDate(), 2);
num($("#mm"), now.getMonth() + 1, 2);

/* janelas móveis dentro da mesma página */
const init = {
  exp(w) {
    const L = [...CONFIG.experiencias].sort((a, b) => b.ano - a.ano);
    let y = null;
    $(".exp", w).innerHTML = L.map((e) => {
      const h = e.ano !== y ? `<h3 class="yr">${e.ano}</h3>` : "";
      y = e.ano;
      const f =
        (e.fotos || []).map((x) => `<img src="${x}" alt="">`).join("") ||
        '<div class="ph" data-i18n="exp.foto"></div>';
      return (
        h +
        `<div class="xp"><button class="xh" aria-expanded="false" data-i18n="${e.titulo}"></button><div class="xb"><div class="xi"><div><div class="xf">${f}</div><p data-i18n="${e.texto}"></p></div></div></div></div>`
      );
    }).join("");
    $$(".xf img", w).forEach(
      (i) =>
        (i.onerror = () => {
          const d = document.createElement("div");
          d.className = "ph";
          d.dataset.i18n = "exp.foto";
          i.replaceWith(d);
          apply(w);
        }),
    );
    $$(".xh", w).forEach(
      (b) =>
        (b.onclick = () => {
          const o = b.parentElement.classList.toggle("open");
          b.setAttribute("aria-expanded", o);
        }),
    );
    apply(w);
  },
  status(w) {
    $(".attrs", w).innerHTML = CONFIG.atributos
      .map(
        ([n, v]) =>
          `<div class="st"><span>${n}</span><i style="--v:${v}%"></i></div>`,
      )
      .join("");
    $(".q", w).innerHTML = CONFIG.missoes
      .map((m) => {
        const h = m.url || `https://github.com/${CONFIG.githubUser}/${m.repo}`;
        return `<a href="${h}" target="_blank" rel="noopener"><b>${m.nome}</b><span data-i18n="${m.texto}"></span></a>`;
      })
      .join("");
    apply(w);
  },
  resume(w) {
    $(".tech", w).textContent = CONFIG.tecnologias;
  },
  social(w) {
    const I = {
      whatsapp:
        '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
      instagram:
        '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
      linkedin:
        '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
      github:
        '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
      email:
        '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    };
    $(".soc", w).innerHTML = CONFIG.contatos
      .map((c) => {
        const ext = /^https?:/.test(c.url);
        return `<a href="${c.url}"${ext ? ' target="_blank" rel="noopener"' : ""}><svg viewBox="0 0 24 24" aria-hidden="true">${I[c.id] || I.email}</svg><span><b>${c.nome}</b><small>${c.handle}</small></span></a>`;
      })
      .join("");
  },
  contact(w) {
    const f = $("form", w),
      s = $(".cs", w),
      cf = $(".cf", w),
      say = (k) => {
        s.dataset.i18n = k;
        s.textContent = dict[k] || k;
      };
    f.onsubmit = async (e) => {
      e.preventDefault();
      const c = CONFIG.emailjs;
      cf.hidden = true;
      if (!c.serviceId || !c.templateId || !c.publicKey)
        return say("contact.setup");
      say("contact.sending");
      const p = {
        from_name: f.elements.from_name.value,
        reply_to: f.elements.reply_to.value,
        message: f.elements.message.value,
      };
      try {
        const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: c.serviceId,
            template_id: c.templateId,
            user_id: c.publicKey,
            template_params: p,
          }),
        });
        if (!r.ok) {
          const t = await r.text().catch(() => "");
          throw new Error(r.status + " " + t);
        }
        f.reset();
        say("contact.ok");
      } catch (err) {
        /* mostra o motivo real (ex.: "400 The service ID not found") e oferece o envio pelo app de e-mail */
        console.error("EmailJS:", err);
        say("contact.err");
        s.textContent += " (" + (err.message || err) + ")";
        const to = (
          (CONFIG.contatos || []).find((x) => x.id === "email") || {
            url: "mailto:",
          }
        ).url;
        cf.href =
          to +
          "?subject=" +
          encodeURIComponent("Contato pelo portfólio - " + p.from_name) +
          "&body=" +
          encodeURIComponent(
            p.title + "\n\n" + p.from_name + " <" + p.reply_to + ">",
          );
        cf.hidden = false;
      }
    };
  },
  github(w) {
    const u = CONFIG.githubUser;
    $("#ghlink", w).href = "https://github.com/" + u;
    num($("#repos", w), 0);
    fetch("https://api.github.com/users/" + u)
      .then((r) => r.json())
      .then((d) => {
        if (d.public_repos != null) num($("#repos", w), d.public_repos);
      })
      .catch(() => {});
  },
  game(w) {
    const b = $(".board", w);
    let a = null,
      lock = false,
      moves = 0,
      found = 0;
    const start = () => {
      moves = found = 0;
      a = null;
      lock = false;
      $(".winmsg", w).hidden = true;
      num($(".moves", w), 0);
      const d = [..."0123456789"].sort(() => Math.random() - 0.5).slice(0, 6),
        c = [...d, ...d].sort(() => Math.random() - 0.5);
      b.innerHTML = c
        .map(
          (x) =>
            `<button class="card" data-d="${x}"><img src="/img/digits/${x}.png" alt="${x}"></button>`,
        )
        .join("");
    };
    b.onclick = (e) => {
      const c = e.target.closest(".card");
      if (!c || lock || c.classList.contains("on")) return;
      c.classList.add("on");
      if (!a) {
        a = c;
        return;
      }
      num($(".moves", w), ++moves);
      if (a.dataset.d === c.dataset.d) {
        a.classList.add("ok");
        c.classList.add("ok");
        a = null;
        if (++found === 6) $(".winmsg", w).hidden = false;
      } else {
        lock = true;
        setTimeout(() => {
          a.classList.remove("on");
          c.classList.remove("on");
          a = null;
          lock = false;
        }, 700);
      }
    };
    $(".reset", w).onclick = start;
    start();
  },
};
const focusWin = (w) => (w.style.zIndex = ++z);
function openWin(id) {
  const old = $("#w-" + id);
  if (old) return focusWin(old);
  const w = document.createElement("article"),
    n = $$(".win").length;
  w.className = "win";
  w.id = "w-" + id;
  w.innerHTML = `<header><span data-i18n="nav.${id}"></span><button class="x" aria-label="close">×</button></header><div class="body"></div>`;
  $(".body", w).append($("#t-" + id).content.cloneNode(true));
  w.style.left = innerWidth < 700 ? "4vw" : 90 + n * 36 + "px";
  w.style.top = 120 + n * 30 + "px";
  $("#desk").append(w);
  apply(w);
  focusWin(w);
  init[id]?.(w);
  const h = $("header", w);
  h.onpointerdown = (e) => {
    if (e.target.closest("button")) return;
    focusWin(w);
    const r = w.getBoundingClientRect(),
      dx = e.clientX - r.left,
      dy = e.clientY - r.top;
    h.setPointerCapture(e.pointerId);
    h.onpointermove = (m) => {
      w.style.left =
        Math.max(0, Math.min(innerWidth - 90, m.clientX - dx)) + "px";
      w.style.top =
        Math.max(70, Math.min(innerHeight - 40, m.clientY - dy)) + "px";
    };
    h.onpointerup = () => (h.onpointermove = null);
  };
  w.onpointerdown = () => focusWin(w);
  $(".x", w).onclick = () => {
    w.classList.add("out");
    setTimeout(() => w.remove(), 200);
  };
}
$$("[data-win]").forEach((b) => (b.onclick = () => openWin(b.dataset.win)));

/* playlist de fundo (faixas em config.js -> musicas) */
const pl = CONFIG.musicas,
  au = new Audio(),
  mp = $(".mp"),
  SS = sessionStorage;
let ti = +(SS.track || 0) % pl.length;
au.volume = +(S.vol ?? CONFIG.volumeInicial ?? 0.15);
const ICO = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause:
    '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
};
const playMusic = () => au.play().catch(() => {});
function loadTrack(i, go) {
  ti = (i + pl.length) % pl.length;
  SS.track = ti;
  const t = pl[ti];
  au.src = t.arquivo;
  $(".disc", mp).src = t.capa;
  $(".mt", mp).textContent = t.titulo;
  $(".ma", mp).textContent = t.artista || "";
  if (go) {
    SS.mpPaused = "";
    playMusic();
  }
}
au.onplay = () => {
  mp.classList.add("on");
  $("#mplay").innerHTML = ICO.pause;
};
au.onpause = () => {
  mp.classList.remove("on");
  $("#mplay").innerHTML = ICO.play;
};
au.onended = () => loadTrack(ti + 1, true);
$("#mplay").onclick = () => {
  if (au.paused) {
    SS.mpPaused = "";
    playMusic();
  } else {
    SS.mpPaused = "1";
    au.pause();
  }
};
$("#mprev").onclick = () => loadTrack(ti - 1, true);
$("#mnext").onclick = () => loadTrack(ti + 1, true);
$("#mvol").value = au.volume;
$("#mvol").oninput = (e) => {
  au.volume = +e.target.value;
  S.vol = e.target.value;
};
loadTrack(ti, false);
$("#mplay").innerHTML = ICO.play;
if (!SS.mpPaused) {
  playMusic();
  /* navegadores bloqueiam som antes do 1º clique: começa no primeiro toque/tecla */
  ["pointerdown", "keydown"].forEach((ev) =>
    addEventListener(
      ev,
      () => {
        if (!SS.mpPaused && au.paused) playMusic();
      },
      { once: true },
    ),
  );
}

/* abertura: vídeo -> sistema (precisa ficar por último: usa openWin/init) */
const boot = $("#boot"),
  bv = $("#bv");
const enter = () => {
  boot.classList.add("off");
  bv.pause();
  if (!$$(".win").length) openWin("status");
};
if (sessionStorage.booted) enter();
else {
  bv.play().catch(enter);
  bv.onended = enter;
}
$("#skip").onclick = () => {
  sessionStorage.booted = 1;
  enter();
};
bv.addEventListener("ended", () => (sessionStorage.booted = 1));
