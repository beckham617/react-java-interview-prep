const User = require('../models/User');

class UserService {
  constructor() {
    // In-memory storage (in real app, this would be a database)
    this.users = [
      new User('1', 'John Doe', 'john@example.com', 30, 'admin'),
      new User('2', 'Jane Smith', 'jane@example.com', 25, 'user'),
      new User('3', 'Bob Johnson', 'bob@example.com', 35, 'user')
    ];
  }

  // Get all users
  getAllUsers() {
    return this.users.map(user => user.toJSON());
  }

  // Get user by ID
  getUserById(id) {
    const user = this.users.find(u => u.id === id);
    return user ? user.toJSON() : null;
  }

  // Get user by email
  getUserByEmail(email) {
    const user = this.users.find(u => u.email === email);
    return user ? user.toJSON() : null;
  }

  // Create new user
  createUser(userData) {
    // Validate required fields
    if (!userData.name || !userData.email || !userData.age) {
      throw new Error('Name, email, and age are required');
    }

    // Check if email already exists
    if (this.getUserByEmail(userData.email)) {
      throw new Error('User with this email already exists');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Validate age
    if (userData.age < 0 || userData.age > 150) {
      throw new Error('Age must be between 0 and 150');
    }

    const user = User.create(userData);
    this.users.push(user);
    return user.toJSON();
  }

  // Update user
  updateUser(id, updateData) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // If email is being updated, check for duplicates
    if (updateData.email && updateData.email !== this.users[userIndex].email) {
      if (this.getUserByEmail(updateData.email)) {
        throw new Error('User with this email already exists');
      }
    }

    this.users[userIndex].update(updateData);
    return this.users[userIndex].toJSON();
  }

  // Delete user
  deleteUser(id) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const deletedUser = this.users[userIndex].toJSON();
    this.users.splice(userIndex, 1);
    return deletedUser;
  }

  // Search users
  searchUsers(query) {
    const searchTerm = query.toLowerCase();
    return this.users
      .filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      )
      .map(user => user.toJSON());
  }

  // Get users by role
  getUsersByRole(role) {
    return this.users
      .filter(user => user.role === role)
      .map(user => user.toJSON());
  }
}

module.exports = new UserService();
