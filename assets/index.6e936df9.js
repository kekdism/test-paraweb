const g = function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) o(t);
  new MutationObserver((t) => {
    for (const i of t)
      if (i.type === "childList")
        for (const n of i.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && o(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(t) {
    const i = {};
    return (
      t.integrity && (i.integrity = t.integrity),
      t.referrerpolicy && (i.referrerPolicy = t.referrerpolicy),
      t.crossorigin === "use-credentials"
        ? (i.credentials = "include")
        : t.crossorigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function o(t) {
    if (t.ep) return;
    t.ep = !0;
    const i = r(t);
    fetch(t.href, i);
  }
};
g();
class u {
  constructor(e) {
    this._url = e;
  }
  async getCards() {
    const e = await fetch(this._url);
    return e.ok ? e.json() : Promise.reject(e);
  }
}
var m = new u("https://mocki.io/v1/a5814d24-4e22-49fc-96d1-0e9ae2952afc");
const _ = {
  0: "\u044F\u043D\u0432\u0430\u0440\u044F",
  1: "\u0444\u0435\u0432\u0440\u0430\u043B\u044F",
  2: "\u043C\u0430\u0440\u0442\u0430",
  3: "\u0430\u043F\u0440\u0435\u043B\u044F",
  4: "\u043C\u0430\u044F",
  5: "\u0438\u044E\u043D\u044F",
  6: "\u0438\u044E\u043B\u044F",
  7: "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
  8: "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F",
  9: "\u043E\u043A\u0442\u044F\u0431\u0440\u044F",
  10: "\u043D\u043E\u044F\u0431\u0440\u044F",
  11: "\u0434\u0435\u043A\u0430\u0431\u0440\u044F",
};
class b {
  constructor({ author: e, description: r, title: o, publishedAt: t }) {
    (this._author = e),
      (this._content = r),
      (this._title = o),
      (this._publishDate = new Date(Date.parse(t)));
  }
  createCard() {
    const e = document.createElement("article");
    e.classList.add("card");
    const r = document.createElement("p");
    r.classList.add("card__date"),
      (r.textContent = `${this._publishDate.getDate()} ${
        _[this._publishDate.getMonth()]
      } ${this._publishDate.getFullYear()}`),
      e.appendChild(r);
    const o = document.createElement("h3");
    (o.textContent = this._title),
      o.classList.add("card__title"),
      e.appendChild(o);
    const t = document.createElement("p");
    t.classList.add("card__text"),
      (t.textContent = this._content),
      e.appendChild(t);
    const i = document.createElement("p");
    return (
      i.classList.add("card__author"),
      (i.textContent = this._author),
      this._author && e.appendChild(i),
      e
    );
  }
}
class w {
  constructor(e) {
    this._container = document.querySelector(e);
  }
  updateCards(e) {
    (this._container.textContent = ""),
      e
        .map((o) => new b(o).createCard())
        .forEach((o) => this._container.appendChild(o));
  }
}
(async () => {
  const a = document.querySelector("#author"),
    e = document.querySelector("#dateFrom"),
    r = document.querySelector("#dateTo"),
    o = new w(".cards__wrapper"),
    { articles: t } = await m.getCards();
  o.updateCards(t);
  const i = () => {
    const n = a.value,
      c = Date.parse(e.value) || -1 / 0,
      p = Date.parse(r.value) || 1 / 0,
      l = t.filter(({ author: s = "", publishedAt: f }) => {
        const d = Date.parse(f),
          h = s == null ? void 0 : s.toLowerCase().includes(n.toLowerCase()),
          x = d >= c && d <= p;
        return h && x;
      });
    o.updateCards(l);
  };
  a.addEventListener("input", i),
    e.addEventListener("change", i),
    r.addEventListener("change", i);
})();
