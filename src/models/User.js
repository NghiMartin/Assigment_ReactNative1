import axios from "axios";

class User {
  constructor(iduser, username, password, name, address, phone, email) {
    this.iduser = iduser;
    this.username = username;
    this.password = password;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }

  register(us, pw) {
    // Your registration logic using axios or any other method
    // For example, using axios:
    axios.post('/register', { username: us, password: pw })
      .then(response => {
        console.log('Registration successful:', response.data);
      })
      .catch(error => {
        console.error('Registration failed:', error);
      });
  }
}

export default User;