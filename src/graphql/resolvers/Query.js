import User from "../models/User.js";

const Query = {
  async getUser() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch users');
    }
  },
  
  async login(_, { email, password }) {
    try {
      const verifyUser = await User.findOne({ email, password });
      if (!verifyUser) {
        throw new Error('Invalid credentials');
      }
      return verifyUser;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to login');
    }
  }
}; 

export default Query;