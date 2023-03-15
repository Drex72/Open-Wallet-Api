class AuthService {
  constructor() {}
  /**
   * Create a user
   * @param {String} email
   * @param {String} password
   * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
   */
  async createUser(email: string, password: string): Promise<void> {
    try {
      console.log(email, password, "hey");
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Login a user
   * @param {String} email
   * @param {String} password
   * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
   */
  async login(email: string, password: string): Promise<void> {
    console.log("hey");
    try {
      console.log(email, password, "hey");
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthService;
