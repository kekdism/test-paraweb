class Api {
  constructor(url) {
    this._url = url;
  }

  async getCards() {
    const res = await fetch(this._url);
    if (!res.ok) {
      return Promise.reject(res);
    }
    return res.json();
  }
}

export default new Api(
  "https://mocki.io/v1/a5814d24-4e22-49fc-96d1-0e9ae2952afc"
);
