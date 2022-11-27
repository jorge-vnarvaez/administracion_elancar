<template>
  <div class="tw-flex tw-justify-center tw-w-full tw-h-full align-center tw-flex-col">
      <v-img :src="image" width="500" height="420" contain></v-img>
      <div class="tw-flex tw-flex-col tw-space-x-4 align-center">
        <span class="tw-text-neutral-900 tw-font-bold tw-block tw-my-4"
          >{{ txt }} {{ contador }} segundos...</span
        >

        <v-progress-circular indeterminate color="black"></v-progress-circular>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            default: ''
        },
        txt: {
            type: String,
            default: ''
        },
        contador: {
            type: Number,
            default: 0
        },
    }
}
</script>

<style>

</style>