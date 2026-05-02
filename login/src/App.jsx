import AuthService from "./AuthService"
import React from "react"
import { styles } from "./styles";

export default class LoginApp extends React.Component {
  constructor(props) {
    super(props);
    // Initialize AuthService
    this.authService = new AuthService;

    // Component state
    this.state = {
      isLoginMode: true,
      username: '',
      password: '',
      confirmPassword: '',
      currentUser: this.authService.getCurrentUser(),
      error: '',
      success: ''
    };
  };

  // Handle input changes
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: '',
      success: ''
    });
  };

  // Toggle between login and register
  toggleMode = () => {
    this.setState(prevState => ({
      isLoginMode: !prevState.isLoginMode,
      username: '',
      password: '',
      confirmPassword: '',
      error: '',
      success: ''
    }));
  };

  // Handle login
  handleLogin = (e) => {
    e.preventDefault();

    try {
      const user = this.authService.login(
        this.state.username,
        this.state.password
      );

      this.setState({
        currentUser: user,
        success: 'Login successful!',
        error: '',
        username: '',
        password: ''
      });

    } catch (error) {
      this.setState({
        error: error.message,
        success: ''
      });
    };
  };

  // Handle registration
  handleRegister = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        error: 'Passwords do not match',
        success: ''
      });
      return;
    }

    try {
      this.authService.register(
        this.state.username,
        this.state.password
      );

      this.setState({
        success: 'Registration successful! Please login.',
        error: '',
        isLoginMode: true,
        username: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      this.setState({
        error: error.message,
        success: ''
      });
    }
  }

  // Handle logout
  handleLogout = () => {
    this.authService.logout();
    this.setState({
      currentUser: null,
      username: '',
      password: '',
      confirmPassword: '',
      success: 'Logged out successfully',
      error: ''
    });
  }

  // Render login/register form
  renderAuthForm() {
    const { isLoginMode, username, password, confirmPassword, error, success } = this.state;

    return (
      <div style={styles.authContainer}>
        <div style={styles.authCard}>
          <div style={styles.cardHeader}>
            <h1 style={styles.title}>
              {isLoginMode ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
            </h1>
            <div style={styles.subtitle}>
              {isLoginMode ? 'Login to continue' : 'Register a new account'}
            </div>
          </div>

          <form onSubmit={isLoginMode ? this.handleLogin : this.handleRegister}>
            {/* Username Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleInputChange}
                placeholder="Enter username"
                style={styles.input}
                required
              />
            </div>

            {/* Password Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                placeholder="Enter password"
                style={styles.input}
                required
              />
            </div>

            {/* Confirm Password (only for registration) */}
            {!isLoginMode && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleInputChange}
                  placeholder="Confirm password"
                  style={styles.input}
                  required
                />
              </div>
            )}

            {/* Error/Success Messages */}
            {error && <div style={{ ...styles.message, ...styles.error }}>{error}</div>}
            {success && <div style={{ ...styles.message, ...styles.success }}>{success}</div>}

            {/* Submit Button */}
            <button type="submit" style={styles.submitBtn}>
              {isLoginMode ? 'LOGIN' : 'REGISTER'}
            </button>
          </form>

          {/* Toggle Mode */}
          <div style={styles.toggleMode}>
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <span onClick={this.toggleMode} style={styles.toggleLink}>
              {isLoginMode ? 'Register' : 'Login'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Render dashboard (when logged in)
  renderDashboard() {
    const { currentUser } = this.state;

    return (
      <div style={styles.dashboardContainer}>
        <div style={styles.dashboardCard}>
          <div style={styles.welcomeSection}>
            <h1 style={styles.welcomeTitle}>DASHBOARD</h1>
            <div style={styles.userInfo}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Username:</span>
                <span style={styles.infoValue}>{currentUser.username}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Member Since:</span>
                <span style={styles.infoValue}>
                  {new Date(currentUser.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <button onClick={this.handleLogout} style={styles.logoutBtn}>
            LOGOUT
          </button>

          {/* Show all registered users */}
          <div style={styles.usersSection}>
            <h3 style={styles.usersSectionTitle}>All Registered Users</h3>
            <div style={styles.usersList}>
              {this.authService.getAllUsers().map((user, index) => (
                <div key={index} style={styles.userCard}>
                  <div style={styles.userName}>{user.username}</div>
                  <div style={styles.userDate}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div style={styles.app}>
        {currentUser ? this.renderDashboard() : this.renderAuthForm()}
      </div>
    );
  }
}

