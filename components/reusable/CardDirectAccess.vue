<template>
  <nuxt-link :to="{ name: route_name }">
    <div
      class="tw-bg-white tw-rounded-lg shadow-md p-8 tw-flex tw-space-x-4 align-center tw-justify-between tw-cursor-pointer tw-text-neutral-900"
    >
      <div class="tw-flex tw-space-x-4 align-center">
        <div class="shadow-md p-4" v-html="icon_svg"></div>
        <div class="tw-flex-col">
          <span class="block font-semibold">{{ label }}</span>
          <span class="block tw-flex tw-flex-col tw-text-sm">{{ text }}</span>
        </div>
      </div>
      <div class="tw-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bg-slate-200 p-1 icon icon-tabler icon-tabler-chevron-right"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#000000"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { marked } from "marked";

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
    route_name: {
      type: String,
      description: "Nombre de la ruta",
      default: "",
      required: false,
    },
  },
  computed: {
    icon_svg() {
      switch (this.icon) {
        case "lista":
          return marked(`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <line x1="9" y1="6" x2="20" y2="6" />
                  <line x1="9" y1="12" x2="20" y2="12" />
                  <line x1="9" y1="18" x2="20" y2="18" />
                  <line x1="5" y1="6" x2="5" y2="6.01" />
                  <line x1="5" y1="12" x2="5" y2="12.01" />
                  <line x1="5" y1="18" x2="5" y2="18.01" /></svg>`);
        case "file-search":
          return marked(`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-search" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" />
                  <circle cx="16.5" cy="17.5" r="2.5" />
                  <line x1="18.5" y1="19.5" x2="21" y2="22" />
                  </svg>`);
        case "file":
          return marked(`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  </svg>`);
      }
    },
  },
};
</script>

<style></style>
