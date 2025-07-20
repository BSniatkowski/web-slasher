<template><slot /></template>

<script setup lang="ts">
import { createGameInstance } from "./game/game";

createGameInstance();
</script>
