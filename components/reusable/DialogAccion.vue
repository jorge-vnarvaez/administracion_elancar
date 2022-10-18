<template>
  <div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          {{ dialog }}
          <span v-if="title">{{ title }}</span>
        </v-card-title>

        <v-card-text>
          {{ mensaje }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            {{ txt_boton_aceptar }}
          </v-btn>

          <v-btn color="green darken-1" text @click="dialog = false">
            {{ txt_boton_cancelar }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    mensaje: {
      type: String,
      required: true,
    },
    txt_boton_aceptar: {
      type: String,
      required: true,
    },
    txt_boton_cancelar: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: this.open,
    };
  },
  mounted() {
    this.dialog = this.open;
  }
};
</script>

<style></style>
