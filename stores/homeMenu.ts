import { defineStore, acceptHMRUpdate } from "pinia";

export const useHomeMenuStore = defineStore("homeFoodMenus", {
  state: () => ({
    allHomeMenus: [
      {
        id: 1,
        name: "Tapas Y Aperitivos",
        image: "https://laceibapr.com/img/menu_items/appetizer_placeholder.png",
        menus: [
          {
            id: 5,
            title: "Bacalao a la vizcaína",
            basePrice: 26.4,
            description:
              "Bacalao empanado, en salsa al horno de piquillo, cebolla, ajo y aceite de oliva",
            type: "simple",
            image:
              "https://laceibapr.com/img/menu_items/appetizer_placeholder.png",
          },
          {
            id: 4,
            title: "Pulpo a la gallega",
            basePrice: 16.0,
            description:
              "Pulpo, aceite de oliva y pimentón dulce. Precio por ración",
            type: "simple",
            bestSeller: true,
            image:
              "https://laceibapr.com/img/menu_items/appetizer_placeholder.png",
          },
          {
            id: 16,
            title: "Ensalada de papa",
            basePrice: 6.0,
            description:
              "Papa, pimientos rojos y verdes, mayonesa, cebolla y manzana verde",
            type: "sizes",
            sizes: [
              { name: "Regular", price: 6.0 },
              { name: "Media", price: 3.5 },
            ],
            bestSeller: true,
            image:
              "https://laceibapr.com/img/menu_items/appetizer_placeholder.png",
          },
          {
            id: 18,
            title: "Ensalada de coditos",
            basePrice: 6.6,
            description: "Coditos, mayonesa, cebolla, pimientos rojos y verdes",
            type: "sizes",
            sizes: [
              { name: "Regular", price: 6.6 },
              { name: "Media", price: 3.85 },
            ],
            bestSeller: true,
            image:
              "https://laceibapr.com/img/menu_items/appetizer_placeholder.png",
          },
          {
            id: 23,
            title: "Croquetas",
            basePrice: 2.0,
            description: "Precio por unidad: $2.00",
            type: "options",
            options: [
              { name: "Jamón regular", price: 2.0 },
              { name: "Jamón serrano", price: 2.0 },
              { name: "Bacalao", price: 2.0 },
              { name: "Queso gouda", price: 2.0 },
              { name: "Queso manchego", price: 2.0 },
            ],
            bestSeller: true,
            image:
              "https://laceibapr.com/img/menu_items/appetizer_placeholder.png",
          },
        ],
      },
      {
        id: 2,
        name: "Sandwiches",
        image: "https://laceibapr.com/img/menu_items/sandwich_placeholder.png",
        menus: [
          {
            id: 48,
            title: "Bistec (Pepito)",
            image:
              "https://laceibapr.com/img/menu_items/sandwich_placeholder.png",
            basePrice: 13.5,
            description:
              "Bistec, repollo, tomate, queso suizo y ketchup, en pan de agua",
            type: "sandwich",
            defaultIngredients: [
              "Bistec",
              "Repollo",
              "Tomate",
              "Queso suizo",
              "Ketchup",
            ],
            allowRemoval: true,
            swapOptions: {
              "Queso suizo": "cheeseOptions",
            },
            allowAddons: true,
            allowBreadSwap: true,
            defaultBread: "Pan de agua",
            bestSeller: true,
          },
          {
            id: 55,
            title: "Cubano",
            image:
              "https://laceibapr.com/img/menu_items/sandwich_placeholder.png",
            basePrice: 11.45,
            description: "Queso suizo, pernil y jamón dulce, en pan de agua",
            type: "sandwich",
            defaultIngredients: ["Queso suizo", "Pernil", "Jamón dulce"],
            allowRemoval: true,
            swapOptions: {
              "Queso suizo": "cheeseOptions",
              "Jamón dulce": "meatOptions",
            },
            allowAddons: true,
            allowBreadSwap: true,
            defaultBread: "Pan de agua",
            bestSeller: true,
          },
          {
            id: 61,
            title: "Media noche",
            image:
              "https://laceibapr.com/img/menu_items/sandwich_placeholder.png",
            basePrice: 10.2,
            description:
              "Queso suizo, jamón dulce y pernil, en pan media noche",
            type: "sandwich",
            defaultIngredients: ["Queso suizo", "Jamón dulce", "Pernil"],
            allowRemoval: true,
            swapOptions: {
              "Queso suizo": "cheeseOptions",
            },
            allowAddons: true,
            allowBreadSwap: true,
            defaultBread: "Pan media noche",
            bestSeller: true,
          },
          {
            id: 67,
            title: "Pastrami",
            image:
              "https://laceibapr.com/img/menu_items/sandwich_placeholder.png",
            basePrice: 10.8,
            description: "Pastrami, queso suizo y ketchup, en pan de agua",
            type: "sandwich",
            defaultIngredients: ["Queso suizo", "Ketchup"],
            allowRemoval: true,
            swapOptions: {
              "Queso suizo": "cheeseOptions",
            },
            allowAddons: true,
            allowBreadSwap: true,
            defaultBread: "Pan de agua",
            bestSeller: true,
          },
        ],
      },
      {
        id: 3,
        name: "Postres",
        image: "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
        menus: [
          {
            id: 159,
            title: "Cheesecake de guayaba",
            basePrice: 7.15,
            description: "Disponible completo (precio por libra) o por pedazo",
            type: "sizes",
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            sizes: [
              {
                name: "Completo",
                price: 7.15,
                timeRestriction: 24,
              },
              {
                name: "Pedazo",
                price: 3.85,
              },
            ],
            bestSeller: true,
          },
          {
            id: 160,
            title: "Cheesecake plein",
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            basePrice: 7.15,
            description: "Disponible completo (precio por libra) o por pedazo",
            type: "sizes",
            sizes: [
              {
                name: "Completo",
                price: 7.15,
                timeRestriction: 24,
              },
              {
                name: "Pedazo",
                price: 3.85,
              },
            ],
            bestSeller: true,
          },
          {
            id: 162,
            title: "Bizcocho de chocolate",
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            basePrice: 38.5,
            description: "Disponible completo o por pedazo",
            type: "sizes",
            sizes: [
              {
                name: "Completo",
                price: 38.5,
                timeRestriction: 24,
              },
              {
                name: "Pedazo",
                price: 3.85,
              },
            ],
          },
          {
            id: 167,
            title: "Bizcocho de zanahoria",
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            basePrice: 20.0,
            description: "Disponible completo o mitad",
            type: "sizes",
            sizes: [
              {
                name: "Completo",
                price: 20.0,
                timeRestriction: 24,
              },
              {
                name: "Mitad",
                price: 11.0,
              },
            ],
          },
          {
            id: 169,
            title: "Bizcocho de limón",
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            basePrice: 16.5,
            description: "Disponible completo, mitad o pedazo",
            type: "sizes",
            sizes: [
              {
                name: "Completo",
                price: 16.5,
                timeRestriction: 24,
              },
              {
                name: "Mitad",
                price: 9.5,
              },
              {
                name: "Pedazo",
                price: 3.85,
              },
            ],
          },
          {
            id: 171,
            title: "Flan de coco",
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            basePrice: 16.5,
            description: "Disponible completo o por pedazo",
            type: "sizes",
            sizes: [
              {
                name: "Completo",
                price: 16.5,
                timeRestriction: 24,
              },
              {
                name: "Pedazo",
                price: 3.85,
              },
            ],
            bestSeller: true,
          },
          {
            id: 172,
            title: "Flan de vainilla",
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            basePrice: 16.5,
            description: "Disponible completo o por pedazo",
            type: "sizes",
            sizes: [
              {
                name: "Completo",
                price: 16.5,
                timeRestriction: 24,
              },
              {
                name: "Pedazo",
                price: 3.85,
              },
            ],
            bestSeller: true,
          },
          {
            id: 173,
            title: "Flan de queso",
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            basePrice: 16.5,
            description: "Disponible completo o por pedazo",
            type: "sizes",
            sizes: [
              {
                name: "Completo",
                price: 16.5,
                timeRestriction: 24,
              },
              {
                name: "Pedazo",
                price: 3.85,
              },
            ],
            bestSeller: true,
          },
          {
            id: 199,
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            title: "Tres leches",
            basePrice: 36.0,
            description: "Disponible completo o por pedazo",
            type: "sizes",
            sizes: [
              {
                name: "Completo",
                price: 36.0,
                timeRestriction: 24,
              },
              {
                name: "Pedazo",
                price: 3.85,
              },
            ],
          },
          {
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            id: 208,
            title: "Pie de limón",
            basePrice: 25.3,
            description: "Disponible completo o por pedazo",
            type: "sizes",
            sizes: [
              {
                name: "Completo",
                price: 25.3,
                timeRestriction: 24,
              },
              {
                name: "Pedazo",
                price: 3.5,
              },
            ],
            bestSeller: true,
          },
          {
            id: 213,
            image:
              "https://laceibapr.com/img/menu_items/dessert_placeholder.png",
            title: "Tiramisu",
            basePrice: 38.5,
            description: "Disponible completo o por pedazo",
            type: "sizes",
            sizes: [
              {
                name: "Completo",
                price: 38.5,
                timeRestriction: 24,
              },
              {
                name: "Pedazo",
                price: 6.0,
              },
            ],
          },
        ],
      },
    ],
  }),

  getters: {
    getHomeMenus(state) {
      return state.allHomeMenus;
    },
  },
});
