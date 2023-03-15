interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

class UserController implements User {
  constructor(
    public id: string,
    public firstname: string,
    public lastname: string,
    public email: string
  ) {}
}
