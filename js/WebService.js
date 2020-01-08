class WebService {
  static POST = 'POST';
  static GET = 'GET';
  static DELETE = 'DELETE';
  static PUT = 'PUT';
  static PATCH = 'PATCH';

  constructor(port) {
    this.PORT = port;

    this.callbacks = [];

    this.headersCreator = () => ({});
  }

  setHeadersCreator(creator) {
    this.headersCreator = creator;
  }

  subscribe(callback) {
    this.callbacks.push(callback);

    return () => this.callbacks.splice(this.callbacks.indexOf(callback), 1);
  }

  createURL(query) {
    return `http://localhost:${this.PORT}${query}`;
  }

  makeQuery(query, method = WebService.GET, body = {}) {
    const url = this.createURL(query);

    const params = {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        ...this.headersCreator()
      })
    };

    if (method !== WebService.GET) {
      params.body = JSON.stringify(body);
    }

    return fetch(url, params)
      .then(data => data.json())
      .catch(error => this.callbacks.forEach(callback => callback(error)));
  }

  getList() {
    return this.makeQuery('/todos');
  }

  add(inner) {
    return this.makeQuery(`/todos?inner=${inner}`, WebService.POST);
  }

  toggle(id) {
    return this.makeQuery(`/todos/${id}`, WebService.PUT);
  }

  delete(id) {
    return this.makeQuery(`/todos/${id}`, WebService.DELETE);
  }

  update(id, inner) {
    return this.makeQuery(`/todos/${id}?inner=${inner}`, WebService.PATCH);
  }

  login(login, password) {
    return this.makeQuery(`/auth`, WebService.PUT, { login, password });
  }

  register(login, password) {
    return this.makeQuery('/auth', WebService.POST, { login, password });
  }
}
