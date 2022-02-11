import jwtDecode from 'jwt-decode';

class AuthorizationService {
    getCurrentUser() {
        let user = localStorage.getItem('user');
        if (user) {
            return jwtDecode(user);
        }
    }

    currentUserHasRole(role) {
        if (!this.getCurrentUser()) {
            return false;
        } {
            return this.getCurrentUser().role.includes(role);
        }

    }

    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.jwt) {
            return { Authorization: 'Bearer ' + user.jwt };
        } else {
            return {};
        }
    }
}

export default new AuthorizationService();