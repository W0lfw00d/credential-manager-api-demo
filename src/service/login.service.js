const LoginService = {
  login(credentials) {
    return new Promise((resolve, reject) => {
      if (credentials.name === 'dev@elop.ers' && credentials.password === 'secret') {
        const token = 'VERY-REAL-FORT-KNOX-SECURITY-TOKEN';
        localStorage.setItem('user-token', token); // store the token in localstorage
        resolve(true);
      } else {
        reject(new Error('Wrong credentials!'));
      }
    });
  },
  logout() {
    localStorage.removeItem('user-token');
  }
};

export default LoginService;
