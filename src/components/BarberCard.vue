<template>
  <div class="barber-card">
    <img :src="photo" alt="Foto do barbeiro" />
    <h3>{{ name }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'BarberCard',
  props: {
    name: String,
    description: String,
    photo: String,
  },
};
</script>

<style scoped>
.barber-card {
  border: 1px solid #444;
  background-color: #222;
  color: white;
  padding: 15px;
  max-width: 250px;
  text-align: center;
  border-radius: 8px;
}

.barber-card img {
  width: 100%;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
