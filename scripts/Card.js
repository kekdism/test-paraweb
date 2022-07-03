const monthsName = {
  0: "января",
  1: "февраля",
  2: "марта",
  3: "апреля",
  4: "мая",
  5: "июня",
  6: "июля",
  7: "августа",
  8: "сентября",
  9: "октября",
  10: "ноября",
  11: "декабря",
};

export default class Card {
  constructor({ author, description, title, publishedAt }) {
    this._author = author;
    this._content = description;
    this._title = title;
    this._publishDate = new Date(Date.parse(publishedAt));
  }

  createCard() {
    const card = document.createElement("article");
    card.classList.add("card");

    const date = document.createElement("p");
    date.classList.add("card__date");
    date.textContent = `${this._publishDate.getDate()} ${
      monthsName[this._publishDate.getMonth()]
    } ${this._publishDate.getFullYear()}`;
    card.appendChild(date);

    const title = document.createElement("h3");
    title.textContent = this._title;
    title.classList.add("card__title");
    card.appendChild(title);

    const text = document.createElement("p");
    text.classList.add("card__text");
    text.textContent = this._content;
    card.appendChild(text);

    const author = document.createElement("p");
    author.classList.add("card__author");
    author.textContent = this._author;
    this._author && card.appendChild(author);
    return card;
  }
}
