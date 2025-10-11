<template>
  <div class="card documents-card">
    <h3>Documentos Activos</h3>
    <p>6 (+3 este mes)</p>
    <ul>
      <li>Identidad Digital (DNI) - <span class="activo">Activo</span></li>
      <li>Licencia de Conducir - <span class="pendiente">Pendiente</span></li>
      <li>Pasaporte - <span class="activo">Activo</span></li>
      <li>Tarjeta Sanitaria - <span class="activo">Activo</span></li>
    </ul>
  </div>
</template>

<style scoped>
.card { background:#ffffff; border-radius:16px; padding:20px; box-shadow:0 6px 15px rgba(0,0,0,0.08);}
h3 { margin-bottom:10px; color:#333; font-size:1.2rem;}
p { font-weight:bold; margin-bottom:10px; color:#1e88e5;}
ul { padding:0; margin:0; list-style:none; }
li { margin-bottom:6px; padding:6px 10px; border-radius:8px; background:#e3f2fd;}
.activo { color:#43a047; font-weight:bold; }
.pendiente { color:#fb8c00; font-weight:bold; }
</style>
