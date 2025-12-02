<template>
  <section class="cadastro">
    <h1>Criar Conta</h1>
    <p class="subtitle">Cadastre-se para agendar serviços</p>
    
    <form @submit.prevent="handleCadastro">
      <div class="form-group">
        <input 
          type="text" 
          v-model="form.nome" 
          placeholder="Nome completo" 
          required 
        />
      </div>

      <div class="form-group">
        <input 
          type="email" 
          v-model="form.email" 
          placeholder="E-mail" 
          required 
        />
      </div>

      <div class="form-group">
        <input 
          type="tel" 
          v-model="form.telefone" 
          placeholder="Telefone" 
          required 
        />
      </div>

      <div class="form-group">
        <input 
          type="password" 
          v-model="form.senha" 
          placeholder="Senha" 
          required 
          minlength="6"
        />
      </div>

      <div class="form-group">
        <input 
          type="password" 
          v-model="confirmarSenha" 
          placeholder="Confirmar senha" 
          required 
          minlength="6"
        />
      </div>

      <button type="submit" class="btn" :disabled="loading">
        <span v-if="loading">Cadastrando...</span>
        <span v-else>Criar Conta</span>
      </button>
    </form>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>

    <div class="login-link">
      Já tem conta? 
      <router-link to="/login" class="link">Fazer Login</router-link>
    </div>
  </section>
</template>

<script>
import { useApiClientes } from '@/composables/useApiClientes';

export default {
  name: 'Cadastro',
  setup() {
    const { criarCliente } = useApiClientes();
    return { criarCliente };
  },
  data() {
    return {
      form: {
        nome: '',
        email: '',
        telefone: '',
        senha: ''
      },
      confirmarSenha: '',
      errorMessage: '',
      successMessage: '',
      loading: false
    };
  },
  methods: {
    validarFormulario() {
      if (!this.form.nome || !this.form.email || !this.form.telefone || !this.form.senha) {
        this.errorMessage = 'Todos os campos são obrigatórios.';
        return false;
      }

      if (this.form.senha.length < 6) {
        this.errorMessage = 'A senha deve ter no mínimo 6 caracteres.';
        return false;
      }

      if (this.form.senha !== this.confirmarSenha) {
        this.errorMessage = 'As senhas não coincidem.';
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.email)) {
        this.errorMessage = 'Por favor, insira um e-mail válido.';
        return false;
      }

      return true;
    },

    async handleCadastro() {
      this.errorMessage = '';
      this.successMessage = '';

      if (!this.validarFormulario()) {
        return;
      }

      this.loading = true;

      try {
        const { data, error } = await this.criarCliente(this.form);

        if (error) {
          this.errorMessage = 'Erro ao criar conta. O e-mail pode já estar cadastrado.';
          return;
        }

        this.successMessage = 'Conta criada com sucesso! Redirecionando para login...';
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);

      } catch (error) {
        this.errorMessage = 'Erro ao criar conta. Tente novamente.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.cadastro {
  padding: 20px;
  background-color: #111;
  color: #eee;
  text-align: center;
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 40px auto;
  border-radius: 10px;
}

h1 {
  margin-bottom: 8px;
  font-size: 28px;
}

.subtitle {
  color: #bbb;
  font-size: 14px;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

input {
  display: block;
  margin: 0 auto;
  padding: 12px;
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #222;
  color: white;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #f90;
}

.btn {
  background-color: #f90;
  color: #222;
  border: none;
  padding: 12px 30px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  margin-top: 8px;
}

.btn:hover:not(:disabled) {
  background-color: #e68a00;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-top: 16px;
  color: #ff4444;
  font-weight: bold;
  font-size: 14px;
}

.success {
  margin-top: 16px;
  color: #5ac95a;
  font-weight: bold;
  font-size: 14px;
}

.login-link {
  margin-top: 24px;
  font-size: 14px;
  color: #bbb;
}

.link {
  color: #f90;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}
</style>
