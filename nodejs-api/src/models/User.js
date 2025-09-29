class User {
  constructor(id, name, email, age, role = 'user') {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.role = role;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // Static method to create a new user
  static create(userData) {
    const { name, email, age, role } = userData;
    const id = Date.now().toString(); // Simple ID generation
    return new User(id, name, email, age, role);
  }

  // Method to update user data
  update(updateData) {
    Object.keys(updateData).forEach(key => {
      if (this.hasOwnProperty(key) && key !== 'id' && key !== 'createdAt') {
        this[key] = updateData[key];
      }
    });
    this.updatedAt = new Date().toISOString();
    return this;
  }

  // Method to get user as plain object
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = User;
