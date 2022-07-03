import Card from "./Card.js";

export default class Cards {
  constructor(selector) {
    this._container = document.querySelector(selector);
  }

  updateCards(cards) {
    this._container.textContent = "";
    const cardNodeList = cards.map((card) => new Card(card).createCard());
    cardNodeList.forEach((node) => this._container.appendChild(node));
  }
}
