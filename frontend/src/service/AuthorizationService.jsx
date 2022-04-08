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
        } else {
            return this.getCurrentUser().role.includes(role);
        }

    }

    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.jwt) {
            console.log("ff")
            return { Authorization: 'Bearer ' + user.jwt };
        } else {
            return {};
        }
    }
}

export default new AuthorizationService();