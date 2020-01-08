class Login {
  constructor(auth, authContainer) {
    this.auth = auth;
    this.authContainer = authContainer;
  }

  draw(callback) {
    const loginInput = document.createElement('input');
    loginInput.classList.add('login', 'input');

    const passwordInput = document.createElement('input');
    passwordInput.classList.add('password', 'input');

    const loginButton = document.createElement('button');
    loginButton.classList.add('loginButton');
    loginButton.innerHTML = 'login';

    const registerButton = document.createElement('button');
    registerButton.classList.add('registerButton');
    registerButton.innerHTML = 'register';

    loginButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const login = loginInput.value;
      const password = passwordInput.value;

      await this.auth.login(login, password);

      callback();
    });

    registerButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const login = loginInput.value;
      const password = passwordInput.value;

      await this.auth.register(login, password);

      callback();
    });

    this.authContainer.append(
      loginInput,
      passwordInput,
      loginButton,
      registerButton,
    );
  }
}
