import { defineStore } from "pinia";

export const useControllerStore = defineStore({
  id: "controller",
  state: () => ({
    cardTaskView: false,
    cardTaskForm: {
      visible: false,
      edit: false,
    },
    boardForm: {
      visible: false,
      edit: false,
    },
    delete: {
      visible: false,
      board: false,
    },
    overlay: false,
    dragging: false,
  }),
  getters: {},
  actions: {
    hideOverlay() {
      this.overlay = false;
      this.cardTaskView = false;
      this.cardTaskForm.visible = false;
      this.boardForm.visible = false;
      this.delete.visible = false;
    },
  },
});
