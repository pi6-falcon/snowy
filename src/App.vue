<template>
  <main>
    <PreLoader :key="$route.name" />
    <Header v-show="$route.name !== 'Register'" />
    <router-view />
  </main>
</template>

<style>
</style>
<script>
import Header from "@/components/Header";
import PreLoader from "@/components/PreLoader";
export default {
  components: {PreLoader, Header}
}
</script>
