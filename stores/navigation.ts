import { defineStore, acceptHMRUpdate } from "pinia";

export const useNavigationStore = defineStore("navigation", {
  state: () => ({
    showMobileMenu: false,
    menus: [
      {
        name: "Inicio",
        path: "/",
      },
      {
        name: "Menú",
        path: "/menu",
      },
      {
        name: "Order Food",
        path: "/order-food",
      },
      {
        name: "Nosotros",
        path: "/about",
      },
      {
        name: "Galería",
        path: "/gallery",
      },
      {
        name: "Contacto",
        path: "/contact",
      },
      {
        name: "Coming Soon",
        path: "/coming-soon",
      },
    ],
  }),
  actions: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
  },
  getters: {
    getShowMobileMenu(state) {
      return state.showMobileMenu;
    },
    getMenus(state) {
      return state.menus;
    },
  },
});
