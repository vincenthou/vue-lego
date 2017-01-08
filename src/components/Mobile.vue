<template>
  <section class="mobile">
    <section class="screen">
    </section>
  </section>
</template>

<script>
export default {
  data () {
    return {
      msg: 'mobile'
    }
  }
}
</script>

<style>
.mobile {
  flex: 1;
  border-radius: 10px;
  padding: 40px;
  padding-bottom: 80px;
  border: 1px solid #ddd;
}

.screen {
  position: relative;
  border: 1px solid #ddd;
  width: 375px;
  height: 667px;
}

.screen:before {
  position: absolute;
  top: -30px;
  content: "";
  width: 200px;
  height: 10px;
  border-radius: 2px;
  border: 1px solid #ddd;
}

.screen:after {
  position: absolute;
  bottom: -70px;
  content: "";
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ddd;
}
</style>
