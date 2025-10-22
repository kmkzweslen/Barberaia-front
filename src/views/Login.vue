<template>
  <section class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="user" placeholder="Usuário" required />
      <input type="password" v-model="password" placeholder="Senha" required />
      <button type="submit" class="btn">Entrar</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: '',
      password: '',
    };
  },
  methods: {
    login() {
      alert(`Usuário ${this.user} tentou logar.`);
      this.$router.push('/admin');  // redireciona para painel após login
    }
  }
};
</script>

<style scoped>
.login {
  padding: 20px;
  background-color: #111;
  color: #eee;
  text-align: center;
  font-family: Arial, sans-serif;
}

input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 250px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #222;
  color: white;
  font-size: 16px;
}

.btn {
  background-color: #f90;
  color: #222;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

.btn:hover {
  background-color: #e68a00;
}
</style>
