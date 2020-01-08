class Auth {
  constructor(webService) {
    this.ws = webService;

    this.user = null;
  }

  createUser(login, token) {
    return (this.user = new User(login, token));
  }

  deleteUser() {
    this.user = null;
  }

  async login(login, password) {
    const { token } = await this.ws.login(login, password);

    this.createUser(login, token);
  }

  async register(login, password) {
    const { token } = await this.ws.register(login, password);

    this.createUser(login, token);
  }
}
