const authorInput = document.querySelector("#author");
const dateFromInput = document.querySelector("#dateFrom");
const dateFromTo = document.querySelector("#dateTo");

authorInput.addEventListener("input", (evt) => {
  console.log(evt.target.value);
});
