<template>
  <div class="card notifications-card">
    <h3>Notificaciones</h3>
    <ul>
      <li class="high">Documento próximo a vencer: Licencia de conducir</li>
      <li class="low">Nueva función disponible: Recarga automática de transporte</li>
      <li class="medium">Saldo bajo en tarjeta Lima Bus. Sugerimos recargar.</li>
    </ul>
  </div>
</template>

<style scoped>
.card { background:#ffffff; border-radius:16px; padding:20px; box-shadow:0 6px 15px rgba(0,0,0,0.08);}
h3 { margin-bottom:10px; color:#333; font-size:1.2rem;}
ul { padding:0; margin:0; list-style:none; }
li { margin-bottom:8px; padding:8px 12px; border-radius:8px; color:#fff; font-weight:bold;}
.high { background:#ef5350; }
.medium { background:#ffb74d; }
.low { background:#64b5f6; }
</style>
