<template>
  <Background>
    <Button class="flex items-center justify-center group gap-4 w-full sm:w-auto mb-8" color="secondary" size="md"
      @click="loginWithGoogle">
      <img src="../../assets/icons/google-icon.svg" alt="Logo do Google" width="30" />
      <span class="text-base">Entrar com Google</span>
    </Button>

    <div class="text-white/70 text-sm animate-pulse text-center w-full">
      Clique no botão para começar a jogar!
    </div>
  </Background>
</template>

<script setup lang="ts">
import Background from "@/components/elements/Background/index.vue";
import Button from "@/components/elements/Button/index.vue";

function loginWithGoogle() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = `${window.location.origin}/login/callback`;
  const scope = "profile email";
  const responseType = "token";

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

  window.location.href = url;
}
</script>

<style scoped></style>
