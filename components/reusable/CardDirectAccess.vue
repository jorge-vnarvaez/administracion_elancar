<template>
    <div class="bg-white rounded-lg shadow-md p-8 flex space-x-4 align-center">
        <div class="shadow-md p-4">
            <!-- <font-awesome-icon :icon="icon" size="lg"></font-awesome-icon> -->
        </div>
        <div>
            <span class="block font-semibold">{{ label }}</span>
            <span class="block">{{ text }}</span>
        </div>
        
    </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      description: "Label de la tarjeta",
      default: "",
      required: true,
    },
    text: {
      type: String,
      description: "Texto de la tarjeta",
      default: "",
      required: false,
    },
    icon: {
      type: String,
      description: "Icono de la tarjeta",
      default: "",
      required: false,
    },
  },
};
</script>

<style></style>
