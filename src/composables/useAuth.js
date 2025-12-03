import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// Estado global de autenticação
const currentUser = ref(null);
const userType = ref(null); // 'admin' | 'cliente' | null

export function useAuth() {
    const router = useRouter();

    // Inicializar estado de autenticação verificando localStorage
    const initAuth = () => {
        const tokenAdmin = localStorage.getItem('tokenAdmin');
        const tokenCliente = localStorage.getItem('tokenCliente');
        const emailCliente = localStorage.getItem('emailCliente');

        if (tokenAdmin) {
            userType.value = 'admin';
            currentUser.value = { type: 'admin' };
        } else if (tokenCliente) {
            userType.value = 'cliente';
            currentUser.value = {
                type: 'cliente',
                email: emailCliente
            };
        } else {
            userType.value = null;
            currentUser.value = null;
        }
    };

    // Verificar se há usuário logado
    const isAuthenticated = computed(() => {
        return currentUser.value !== null;
    });

    // Verificar se é admin
    const isAdmin = computed(() => {
        return userType.value === 'admin';
    });

    // Verificar se é cliente
    const isCliente = computed(() => {
        return userType.value === 'cliente';
    });

    // Obter token atual
    const getToken = () => {
        if (userType.value === 'admin') {
            return localStorage.getItem('tokenAdmin');
        } else if (userType.value === 'cliente') {
            return localStorage.getItem('tokenCliente');
        }
        return null;
    };

    // Login de admin
    const loginAdmin = (token) => {
        localStorage.setItem('tokenAdmin', token);
        userType.value = 'admin';
        currentUser.value = { type: 'admin' };
    };

    // Login de cliente
    const loginCliente = (token, email) => {
        localStorage.setItem('tokenCliente', token);
        localStorage.setItem('emailCliente', email);
        userType.value = 'cliente';
        currentUser.value = { type: 'cliente', email };
    };

    // Logout
    const logout = () => {
        // Limpar todos os tokens
        localStorage.removeItem('tokenAdmin');
        localStorage.removeItem('tokenCliente');
        localStorage.removeItem('emailCliente');

        // Resetar estado
        userType.value = null;
        currentUser.value = null;

        // Redirecionar para home
        router.push('/');
    };

    // Obter dados do usuário atual
    const getCurrentUser = () => {
        return currentUser.value;
    };

    // Verificar se precisa fazer login antes de acessar uma rota
    const requireAuth = () => {
        if (!isAuthenticated.value) {
            router.push('/login');
            return false;
        }
        return true;
    };

    // Verificar se precisa ser admin
    const requireAdmin = () => {
        if (!isAdmin.value) {
            router.push('/login');
            return false;
        }
        return true;
    };

    // Verificar se precisa ser cliente
    const requireCliente = () => {
        if (!isCliente.value) {
            router.push('/login');
            return false;
        }
        return true;
    };

    // Inicializar ao usar o composable
    if (currentUser.value === null) {
        initAuth();
    }

    return {
        currentUser: computed(() => currentUser.value),
        userType: computed(() => userType.value),
        isAuthenticated,
        isAdmin,
        isCliente,
        getToken,
        loginAdmin,
        loginCliente,
        logout,
        getCurrentUser,
        requireAuth,
        requireAdmin,
        requireCliente,
        initAuth
    };
}
