// Authentication module for HE5 SiteGen Demo
const Auth = {
  getCredentials() {
    return {
      email: 'admin@he5.com',
      password: 'admin123'
    };
  },

  isLoggedIn() {
    return localStorage.getItem('he5_auth_logged_in') === 'true';
  },

  login(email, password) {
    const creds = this.getCredentials();
    if (email.trim().toLowerCase() === creds.email && password === creds.password) {
      localStorage.setItem('he5_auth_logged_in', 'true');
      localStorage.setItem('he5_auth_user', email);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
  },

  logout() {
    localStorage.removeItem('he5_auth_logged_in');
    localStorage.removeItem('he5_auth_user');
    window.location.href = 'index.html';
  },

  protectPage() {
    const path = window.location.pathname;
    if (path.includes('builder.html') && !this.isLoggedIn()) {
      window.location.href = 'login.html';
    }
  },

  updateNavbar() {
    const isLoggedIn = this.isLoggedIn();
    
    // Find all desktop & mobile navbar action elements
    const navbarActions = document.querySelectorAll('.navbar-actions, .mobile-actions');
    
    navbarActions.forEach(actions => {
      // Find existing login buttons
      const loginBtns = actions.querySelectorAll('.btn-login, .btn-secondary');
      
      loginBtns.forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === 'login') {
          if (isLoggedIn) {
            btn.textContent = 'Logout';
            btn.href = '#';
            btn.removeAttribute('target');
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              this.logout();
            });
          } else {
            btn.textContent = 'Login';
            btn.href = 'login.html';
          }
        }
      });

      // Handle the "Start Building" / "Open Builder" links
      const startBtns = actions.querySelectorAll('.btn-primary');
      startBtns.forEach(btn => {
        if (btn.textContent.trim() === 'Start Building' || btn.textContent.trim() === 'Open Builder') {
          btn.href = isLoggedIn ? 'builder.html' : 'login.html';
        }
      });
    });

    // Also update main nav link if applicable
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
      if (link.textContent.trim() === 'Builder' || link.textContent.trim() === 'Prompt Library') {
        link.href = isLoggedIn ? 'builder.html' : 'login.html';
      }
    });
  }
};

// Run immediately to protect page
Auth.protectPage();

// Run when DOM is ready to update UI
document.addEventListener('DOMContentLoaded', () => {
  Auth.updateNavbar();
});
