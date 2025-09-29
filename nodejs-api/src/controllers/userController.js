const userService = require('../services/userService');

class UserController {
  // GET /api/users
  async getAllUsers(req, res) {
    try {
      const { search, role } = req.query;
      
      let users;
      if (search) {
        users = userService.searchUsers(search);
      } else if (role) {
        users = userService.getUsersByRole(role);
      } else {
        users = userService.getAllUsers();
      }

      res.status(200).json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // GET /api/users/:id
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // POST /api/users
  async createUser(req, res) {
    try {
      const userData = req.body;
      const user = userService.createUser(userData);

      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // PUT /api/users/:id
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const user = userService.updateUser(id, updateData);

      res.status(200).json({
        success: true,
        data: user,
        message: 'User updated successfully'
      });
    } catch (error) {
      const statusCode = error.message === 'User not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        error: error.message
      });
    }
  }

  // DELETE /api/users/:id
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = userService.deleteUser(id);

      res.status(200).json({
        success: true,
        data: user,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new UserController();
