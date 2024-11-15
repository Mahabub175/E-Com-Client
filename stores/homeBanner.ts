import { defineStore, acceptHMRUpdate } from "pinia";

export const useHomeBannerStore = defineStore("homeMenus", {
  state: () => ({
    banners: [
      {
        name: "Especiales de Thanksgiving",
        type: "Thanksgiving",
        description:
          "Pavo entero relleno, Arroz con gandules, Ensalada de papa o coditos, Pie de calabaza",
        price: "desde $130.00",
        bannerDescription: "Paquetes desde $130.00",
        image:
          "https://laceibapr.com/img/flex_slides/slide_thanksgiving_thumb.png",
        bgImage: "https://laceibapr.com/img/flex_slides/slide_thanksgiving.png",
        offer: true,
      },
      {
        name: "Especiales de Vino",
        type: "Selección Raíz",
        description:
          "Descubre nuestra exclusiva selección de vinos Raiz de España",
        price: "desde $130.00",
        bannerDescription:
          "Raiz Crianza 2020 | Raiz Reserva 2018 | Raiz Profunda 2019",
        image: "https://laceibapr.com/img/flex_slides/slide_wines_thumb.png",
        bgImage: "https://laceibapr.com/img/flex_slides/slide_wines.png",
        offer: true,
      },
      {
        name: "Sandwiches Cubanos",
        type: "Sandwiches",
        description: "Queso Suizo, Pernil y Jamón Dulce",
        price: "$11.45 por unidad",
        image: "https://laceibapr.com/img/flex_slides/slide_1_thumb.jpg",
        bgImage: "https://laceibapr.com/img/flex_slides/slide_1.jpg",
        offer: false,
      },
      {
        name: "Flan de Coco",
        type: "Postres",
        description: "Coco, Huevos",
        price: "$16.50 por unidad",
        image: "https://laceibapr.com/img/flex_slides/slide_2_thumb.jpg",
        bgImage: "https://laceibapr.com/img/flex_slides/slide_2.jpg",
        offer: false,
      },
      {
        name: "Sandwiches de Pollo",
        type: "Sandwiches",
        description: "Repollo, Tomate y Queso Suizo",
        price: "$12.50 por unidad",
        image: "https://laceibapr.com/img/flex_slides/slide_3_thumb.jpg",
        bgImage: "https://laceibapr.com/img/flex_slides/slide_3.jpg",
        offer: false,
      },
      {
        name: "Tarta de Santiago",
        type: "Postres",
        description: "Almendra, Canela, Huevos",
        price: "$22.00 por unidad",
        image: "https://laceibapr.com/img/flex_slides/slide_4_thumb.jpg",
        bgImage: "https://laceibapr.com/img/flex_slides/slide_4.jpg",
        offer: false,
      },
      {
        name: "Tarta de Manzana",
        type: "Postres",
        description: "Manzana, Harina de Trigo, Huevo, Leche",
        price: "$25.00 por unidad",
        image: "https://laceibapr.com/img/flex_slides/slide_5_thumb.jpg",
        bgImage: "https://laceibapr.com/img/flex_slides/slide_5.jpg",
        offer: false,
      },
    ],
  }),

  getters: {
    getBanners(state) {
      return state.banners;
    },
  },
});
