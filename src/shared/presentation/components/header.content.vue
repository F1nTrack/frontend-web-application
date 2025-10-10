<script>
import {Button as PvButton} from "primevue";

export default {
  name: "header-content",
  components: {PvButton}
}
</script>

<template>
  <div class="principal">
    <div class="imagen">
      <img src="https://avatars.githubusercontent.com/u/228631958?s=200&v=4" width="60px" height="60px">
    </div>
    <div class="title">
      <h3>{{$t('try.hello')}}</h3>
    </div>
    <div class="intern">
      <pv-button class="btn-en" @click="$i18n.locale='en'">EN</pv-button>
      <pv-button class="btn-es" @click="$i18n.locale='es' ">ES</pv-button>

    </div>

  </div>
</template>

<style scoped>

.principal {
  display: flex;
  gap: 400px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background: linear-gradient(to left, #55a4f6, #eef1f8);
  padding: 20px;
  border-radius: 8px;
  width: 1250px;
}
.title{
  color: #000000;
}
.imagen img{
  border-radius: 10px;
}
.intern{
  gap: 20px;
}
.intern{
  display: flex;
  gap: 10px;
}
.btn-en{
  background: #777777;
  border-color: #000000;
}

.btn-es{
  background: #777777;
  border-color: #000000;

}


</style>