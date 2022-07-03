import "./style.css";
import api from "./scripts/Api";
import Cards from "./scripts/Cards";

(async () => {
  const authorInput = document.querySelector("#author");
  const dateFromInput = document.querySelector("#dateFrom");
  const dateToInput = document.querySelector("#dateTo");

  const cards = new Cards(".cards__wrapper");

  const { articles: cardsList } = await api.getCards();

  cards.updateCards(cardsList);

  const applyFilters = () => {
    const authorFilter = authorInput.value;
    const dateFrom = Date.parse(dateFromInput.value) || -Infinity;
    const dateTo = Date.parse(dateToInput.value) || Infinity;
    const filteredCards = cardsList.filter(({ author = "", publishedAt }) => {
      const publishDate = Date.parse(publishedAt);
      const validAuthor = author
        ?.toLowerCase()
        .includes(authorFilter.toLowerCase());
      const validDate = publishDate >= dateFrom && publishDate <= dateTo;
      return validAuthor && validDate;
    });
    cards.updateCards(filteredCards);
  };

  authorInput.addEventListener("input", applyFilters);
  dateFromInput.addEventListener("change", applyFilters);
  dateToInput.addEventListener("change", applyFilters);
})();
