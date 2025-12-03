<template>
  <div class="home">
    <!-- Hero Section com Carousel -->
    <section class="hero-section">
      <div class="hero-carousel">
        <div 
          v-for="(image, index) in carouselImages" 
          :key="index"
          class="hero-slide"
          :class="{ active: currentSlide === index }"
          :style="{ backgroundImage: `url(${image})` }"
        >
          <div class="hero-overlay"></div>
        </div>
        
        <div class="hero-content">
          <div class="logo-container">
            <h1 class="hero-title">💈 BARBEARIA</h1>
            <p class="hero-subtitle">Tradição & Estilo</p>
          </div>
        </div>
        
        <button class="carousel-btn prev" @click="prevSlide">‹</button>
        <button class="carousel-btn next" @click="nextSlide">›</button>
        
        <div class="carousel-indicators">
          <span 
            v-for="(image, index) in carouselImages" 
            :key="index"
            class="indicator"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
    </section>

    <!-- Seção Sobre Sua Marca -->
    <section class="about-section">
      <div class="about-container">
        <div class="about-content">
          <div class="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
          <h2>NOSSA MARCA</h2>
          <p>
            Mais do que uma barbearia, a Navalha de Ouro é um santuário para o 
            homem moderno que valoriza a tradição e a precisão. Em nosso ambiente, 
            o aroma de loções clássicas se mistura a um suave de blues, criando uma 
            atmosfera onde cada cliente pode relaxar e se desconectar da correria do dia a dia.
          </p>
        </div>
        <div class="about-image">
          <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=400&fit=crop" alt="Interior da Barbearia" />
        </div>
      </div>
    </section>

    <!-- Seção Equipe -->
    <section class="team-section">
      <div class="team-header">
        <h2>EQUIPE</h2>
        <div class="section-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6z"/>
          </svg>
        </div>
      </div>
      <p class="team-description">
        Nossos barbeiros, verdadeiros artesãos da tesoura e da navalha, dominam 
        tanto os cortes clássicos quanto as tendências contemporâneas, garantindo 
        um serviço impecável e personalizado. Na Navalha de Ouro, cada barba é 
        uma escultura e cada corte de cabelo é uma obra de arte.
      </p>
      
      <div class="team-grid" v-if="barbeiros.length > 0">
        <div v-for="barbeiro in barbeiros" :key="barbeiro.email" class="barber-card">
          <div class="barber-image">
            <img :src="barbeiro.foto || 'https://via.placeholder.com/300x300?text=Barbeiro'" :alt="barbeiro.nome" />
          </div>
          <div class="barber-info">
            <h3>{{ barbeiro.nome }}</h3>
            <p>{{ barbeiro.especialidade }}</p>
          </div>
        </div>
      </div>
      
      <div v-else class="loading">
        <p>Carregando equipe...</p>
      </div>
    </section>

    <!-- Seção Agendamento -->
    <section class="booking-section">
      <div class="booking-content">
        <h2>Faça já o seu agendamento</h2>
        <button class="booking-btn" @click="handleAgendar">AGENDAR</button>
      </div>
      
      <div class="booking-images">
        <div class="booking-image" v-for="n in 3" :key="n">
          <img :src="`https://images.unsplash.com/photo-${1503951914724 + n}?w=300&h=300&fit=crop`" alt="Serviço" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useApiBarbeiros } from '@/composables/useApiBarbeiro';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { buscarTodosBarbeiros } = useApiBarbeiros();
    
    const currentSlide = ref(0);
    const barbeiros = ref([]);
    
    const carouselImages = [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1503951914724-5f0e98c4e0a4?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1920&h=1080&fit=crop'
    ];
    
    let autoSlideInterval = null;
    
    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % carouselImages.length;
    };
    
    const prevSlide = () => {
      currentSlide.value = currentSlide.value === 0 
        ? carouselImages.length - 1 
        : currentSlide.value - 1;
    };
    
    const goToSlide = (index) => {
      currentSlide.value = index;
    };
    
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
    };
    
    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    };
    
    const handleAgendar = () => {
      if (!isAuthenticated.value) {
        alert('Você precisa estar logado para agendar um serviço!');
        router.push('/login');
      } else {
        router.push('/agende');
      }
    };
    
    const loadBarbeiros = async () => {
      const { data, error } = await buscarTodosBarbeiros();
      if (data && !error) {
        barbeiros.value = data;
      }
    };
    
    onMounted(() => {
      startAutoSlide();
      loadBarbeiros();
    });
    
    onUnmounted(() => {
      stopAutoSlide();
    });
    
    return {
      currentSlide,
      carouselImages,
      barbeiros,
      nextSlide,
      prevSlide,
      goToSlide,
      handleAgendar
    };
  }
};
</script>

<style scoped>
.home {
  background-color: #000;
  color: #fff;
  font-family: 'Roboto', 'Arial', sans-serif;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero-carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.hero-slide.active {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
}

.logo-container {
  animation: fadeInScale 1.5s ease-out;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: 8px;
  margin: 0;
  text-shadow: 0 0 30px rgba(230, 57, 70, 0.8);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #e63946;
  letter-spacing: 4px;
  margin-top: 10px;
  font-weight: 300;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(255,255,255,0.5);
  color: #fff;
  font-size: 40px;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.carousel-btn:hover {
  background: rgba(230, 57, 70, 0.8);
  border-color: #e63946;
}

.carousel-btn.prev {
  left: 20px;
}

.carousel-btn.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 20;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #e63946;
  width: 30px;
  border-radius: 6px;
}

/* About Section */
.about-section {
  padding: 80px 20px;
  background-color: #111;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-content {
  text-align: left;
}

.section-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  color: #e63946;
}

.section-icon svg {
  width: 100%;
  height: 100%;
}

.about-content h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #fff;
  letter-spacing: 2px;
}

.about-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ccc;
}

.about-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(230, 57, 70, 0.3);
}

/* Team Section */
.team-section {
  padding: 80px 20px;
  background-color: #000;
  text-align: center;
}

.team-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.team-header h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.team-header .section-icon {
  width: 50px;
  height: 50px;
  color: #e63946;
  margin: 0;
}

.team-description {
  max-width: 800px;
  margin: 0 auto 60px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ccc;
}

.team-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.barber-card {
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.barber-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(230, 57, 70, 0.4);
}

.barber-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.barber-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.barber-card:hover .barber-image img {
  transform: scale(1.1);
}

.barber-info {
  padding: 20px;
  text-align: center;
}

.barber-info h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #fff;
}

.barber-info p {
  color: #e63946;
  font-size: 0.95rem;
}

/* Booking Section */
.booking-section {
  padding: 100px 20px;
  background: linear-gradient(135deg, #e63946 0%, #457b9d 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.booking-content {
  position: relative;
  z-index: 10;
  margin-bottom: 40px;
}

.booking-content h2 {
  font-size: 3rem;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.booking-btn {
  background: #000;
  color: #fff;
  border: 3px solid #fff;
  padding: 18px 60px;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50px;
}

.booking-btn:hover {
  background: #fff;
  color: #e63946;
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.booking-images {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.booking-image {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  border: 3px solid #fff;
  transform: rotate(-5deg);
  transition: transform 0.3s ease;
}

.booking-image:nth-child(2) {
  transform: rotate(5deg);
}

.booking-image:hover {
  transform: rotate(0deg) scale(1.05);
}

.booking-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loading {
  padding: 40px;
  color: #ccc;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .about-container {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2.5rem;
    letter-spacing: 4px;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    letter-spacing: 2px;
  }
  
  .about-content h2,
  .team-header h2 {
    font-size: 2rem;
  }
  
  .booking-content h2 {
    font-size: 2rem;
  }
  
  .carousel-btn {
    font-size: 30px;
    padding: 5px 15px;
  }
}
</style>
