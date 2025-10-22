<template>
  <section class="agende">
    <h1>Agende seu horário</h1>
    <p>Faça seu agendamento com facilidade.</p>
    <button class="btn">Agendar</button>
  </section>
</template>

<script>
export default {
  name: 'Agende',
};
</script>

<style scoped>
.agende {
  padding: 20px;
  background-color: #111;
  color: #eee;
  text-align: center;
  font-family: Arial, sans-serif;
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
