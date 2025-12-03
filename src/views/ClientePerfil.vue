<template>
  <div class="perfil-cliente">
    <div class="perfil-container">
      <h2>Perfil do Cliente</h2>
      
      <!-- Dados do Cliente -->
      <div class="dados-section">
        <h3>Meus Dados</h3>
        <div v-if="clienteData" class="dados-card">
          <div class="dado-item">
            <span class="label">Nome:</span>
            <span class="value">{{ clienteData.nome }}</span>
          </div>
          <div class="dado-item">
            <span class="label">Email:</span>
            <span class="value">{{ clienteData.email }}</span>
          </div>
          <div class="dado-item">
            <span class="label">Telefone:</span>
            <span class="value">{{ clienteData.telefone }}</span>
          </div>
        </div>
        <div v-else class="loading">
          <p>Carregando dados...</p>
        </div>
      </div>

      <!-- Histórico de Atendimentos -->
      <div class="historico-section">
        <h3>Histórico de Atendimentos</h3>
        
        <div v-if="historico.length > 0" class="historico-list">
          <div v-for="item in historico" :key="item.id" class="historico-item">
            <div class="historico-header">
              <span class="data">{{ formatarData(item.data) }}</span>
              <span class="status" :class="item.status">{{ item.status }}</span>
            </div>
            <div class="historico-body">
              <p class="servico">{{ item.servico }}</p>
              <p class="barbeiro">Barbeiro: {{ item.barbeiro }}</p>
              <p class="preco">R$ {{ item.preco?.toFixed(2) }}</p>
            </div>
          </div>
        </div>
        
        <div v-else class="empty-state">
          <p>Você ainda não possui atendimentos registrados.</p>
          <button @click="$router.push('/agende')" class="btn-agendar">
            Agendar Primeiro Serviço
          </button>
        </div>
      </div>

      <!-- Botão Sair -->
      <div class="actions">
        <button @click="handleLogout" class="btn-logout">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          Sair
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useApiClientes } from '@/composables/useApiClientes';

export default {
  name: 'ClientePerfil',
  setup() {
    const router = useRouter();
    const { logout, getCurrentUser } = useAuth();
    const { buscarCliente } = useApiClientes();
    
    const clienteData = ref(null);
    const historico = ref([]);
    
    const handleLogout = () => {
      if (confirm('Deseja realmente sair?')) {
        logout();
      }
    };
    
    const formatarData = (dataString) => {
      if (!dataString) return '';
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR');
    };
    
    const loadClienteData = async () => {
      const user = getCurrentUser();
      if (user && user.email) {
        const { data, error } = await buscarCliente(user.email);
        if (data && !error) {
          clienteData.value = data;
        }
      }
    };
    
    const loadHistorico = async () => {
      // Simulação de histórico - substituir pela chamada real da API quando disponível
      // const { data } = await api('/cliente/historico', { method: 'GET' });
      
      // Dados de exemplo
      historico.value = [
        // {
        //   id: 1,
        //   data: '2024-11-15',
        //   servico: 'Corte Masculino',
        //   barbeiro: 'Carlos Silva',
        //   preco: 35.00,
        //   status: 'Concluído'
        // }
      ];
    };
    
    onMounted(() => {
      const tokenCliente = localStorage.getItem('tokenCliente');
      if (!tokenCliente) {
        router.push('/login');
        return;
      }
      
      loadClienteData();
      loadHistorico();
    });
    
    return {
      clienteData,
      historico,
      handleLogout,
      formatarData
    };
  }
};
</script>

<style scoped>
.perfil-cliente {
  min-height: 100vh;
  background: linear-gradient(135deg, #000 0%, #111 100%);
  padding: 40px 20px;
}

.perfil-container {
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #fff;
  letter-spacing: 2px;
  text-transform: uppercase;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #e63946;
  letter-spacing: 1px;
}

/* Dados Section */
.dados-section {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.dados-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.dado-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #222;
  border-radius: 8px;
  border-left: 4px solid #e63946;
}

.label {
  font-weight: 600;
  color: #ccc;
  font-size: 0.95rem;
}

.value {
  color: #fff;
  font-size: 1.05rem;
}

/* Histórico Section */
.historico-section {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.historico-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.historico-item {
  background: #222;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #457b9d;
  transition: all 0.3s ease;
}

.historico-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 20px rgba(69, 123, 157, 0.3);
}

.historico-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}

.data {
  color: #ccc;
  font-size: 0.9rem;
}

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status.Concluído {
  background: #2a9d8f;
  color: #fff;
}

.status.Agendado {
  background: #e9c46a;
  color: #000;
}

.status.Cancelado {
  background: #e63946;
  color: #fff;
}

.historico-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.servico {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
}

.barbeiro {
  color: #ccc;
  font-size: 0.95rem;
}

.preco {
  color: #e63946;
  font-size: 1.1rem;
  font-weight: 700;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-state p {
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.btn-agendar {
  background: linear-gradient(135deg, #e63946, #c1121f);
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.btn-agendar:hover {
  background: linear-gradient(135deg, #c1121f, #9d0208);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(230, 57, 70, 0.4);
}

/* Actions */
.actions {
  text-align: center;
}

.btn-logout {
  background: transparent;
  border: 2px solid #e63946;
  color: #e63946;
  padding: 12px 40px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 1px;
}

.btn-logout svg {
  width: 20px;
  height: 20px;
}

.btn-logout:hover {
  background: #e63946;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(230, 57, 70, 0.4);
}

.loading {
  text-align: center;
  padding: 40px;
  color: #999;
}

@media (max-width: 768px) {
  h2 {
    font-size: 2rem;
  }
  
  .dado-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .historico-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
