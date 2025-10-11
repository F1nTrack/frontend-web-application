<template>
  <div class="card">
    <h3>Balance</h3>
    <p>S/125.50 En transporte</p>
  </div>
</template>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.12);
}
h3 { margin-bottom: 12px; color: #333; font-size: 1.2rem; }
p { font-size: 1.8rem; font-weight: bold; color: #1e88e5; }
</style>
