<template>
  <section class="admin-dashboard">
    <h1>Painel do Usuário</h1>
    <div class="options">
      <button @click="selected = 'servicos'">Gerenciar Serviços</button>
      <button @click="selected = 'clientes'">Gerenciar Clientes</button>
    </div>

    <div v-if="selected === 'servicos'">
      <h2>Serviços</h2>
      <form @submit.prevent="isEditingServico ? updateServico() : addServico()">
        <input v-model="novoServico.nome" placeholder="Nome do serviço" required />
        <input type="number" v-model.number="novoServico.preco" placeholder="Preço do serviço" required />
        <input v-model="novoServico.descricao" placeholder="Descrição do serviço" required />
        <button type="submit">{{ isEditingServico ? 'Atualizar Serviço' : 'Cadastrar Serviço' }}</button>
        <button v-if="isEditingServico" type="button" @click="cancelEditServico">Cancelar</button>
      </form>
      <ul>
        <li v-for="(servico, index) in servicos" :key="index">
          Nome: {{ servico.nome }}, Preço: R$ {{ servico.preco.toFixed(2) }}, Descrição: {{ servico.descricao }}
          <button @click="editServico(index)">Editar</button>
          <button @click="removerServico(index)">Excluir</button>
        </li>
      </ul>
    </div>

    <div v-if="selected === 'clientes'">
      <h2>Clientes</h2>
      <form @submit.prevent="isEditingCliente ? updateCliente() : addCliente()">
        <input v-model="novoCliente.nome" placeholder="Nome do cliente" required />
        <input v-model="novoCliente.telefone" placeholder="Telefone" required />
        <input v-model="novoCliente.email" type="email" placeholder="E-mail" required />
        <button type="submit">{{ isEditingCliente ? 'Atualizar Cliente' : 'Cadastrar Cliente' }}</button>
        <button v-if="isEditingCliente" type="button" @click="cancelEditCliente">Cancelar</button>
      </form>
      <ul>
        <li v-for="(cliente, index) in clientes" :key="index">
          {{ cliente.nome }} - {{ cliente.telefone }} - {{ cliente.email }}
          <button @click="editCliente(index)">Editar</button>
          <button @click="removerCliente(index)">Excluir</button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      selected: null,
      servicos: [],
      clientes: [],
      novoServico: { nome: '', preco: 0, descricao: '' },
      isEditingServico: false,
      servicoIndex: null,
      novoCliente: { nome: '', telefone: '', email: '' },
      isEditingCliente: false,
      clienteIndex: null,
    };
  },
  methods: {
    addServico() {
      this.servicos.push({ ...this.novoServico });
      this.novoServico = { nome: '', preco: 0, descricao: '' };
    },
    editServico(index) {
      this.servicoIndex = index;
      this.novoServico = { ...this.servicos[index] };
      this.isEditingServico = true;
    },
    updateServico() {
      this.servicos.splice(this.servicoIndex, 1, { ...this.novoServico });
      this.cancelEditServico();
    },
    cancelEditServico() {
      this.novoServico = { nome: '', preco: 0, descricao: '' };
      this.isEditingServico = false;
      this.servicoIndex = null;
    },
    removerServico(index) {
      this.servicos.splice(index, 1);
    },

    addCliente() {
      this.clientes.push({ ...this.novoCliente });
      this.novoCliente = { nome: '', telefone: '', email: '' };
    },
    editCliente(index) {
      this.clienteIndex = index;
      this.novoCliente = { ...this.clientes[index] };
      this.isEditingCliente = true;
    },
    updateCliente() {
      this.clientes.splice(this.clienteIndex, 1, { ...this.novoCliente });
      this.cancelEditCliente();
    },
    cancelEditCliente() {
      this.novoCliente = { nome: '', telefone: '', email: '' };
      this.isEditingCliente = false;
      this.clienteIndex = null;
    },
    removerCliente(index) {
      this.clientes.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  background: #111;
  color: #eee;
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

.options {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
}

form {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-weight: bold;
  background-color: #5599ff;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  margin-left: 10px;
}

button:hover {
  background-color: #4477cc;
}

input {
  padding: 6px;
  margin: 5px 5px 5px 0;
  border-radius: 4px;
  border: none;
  width: 200px;
}
</style>
