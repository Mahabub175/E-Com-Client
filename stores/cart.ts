import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as any,
    subtotal: 0.0 as any,
    totalPrice: 0.0,
    taxRate: 0.11,
    date: "" as any,
    time: "" as any,
    notes: "" as any,
  }),

  actions: {
    addToCart(product: any) {
      // Helper function to compare addons
      const areAddonsSame = (addons1: any[], addons2: any[]) => {
        if (addons1.length !== addons2.length) return false;
        return addons1.every(
          (addon, index) =>
            addon.name === addons2[index].name &&
            addon.price === addons2[index].price
        );
      };

      // Helper function to compare removed items
      const areRemovedSame = (removed1: any[], removed2: any[]) => {
        if (removed1.length !== removed2.length) return false;
        return removed1.every(
          (removedItem, index) => removedItem === removed2[index]
        );
      };

      // Helper function to compare sizes
      const areSizesSame = (sizes1: any[], sizes2: any[]) => {
        if (sizes1.length !== sizes2.length) return false;
        return sizes1.every((size, index) => size.name === sizes2[index].name);
      };

      // Helper function to compare options
      const areOptionsSame = (options1: any[], options2: any[]) => {
        if (options1.length !== options2.length) return false;
        return options1.every(
          (option, index) => option.name === options2[index].name
        );
      };

      // Helper function to compare cheese
      const areCheeseSame = (cheese1: any, cheese2: any) => {
        return cheese1 === cheese2;
      };

      // Helper function to compare bread
      const areBreadSame = (bread1: any, bread2: any) => {
        return bread1 === bread2;
      };

      // Find the item in the cart with the same id, addons, removed items, sizes, options, cheese, and bread
      const existingItem = this.items.find((item: any) => {
        const hasSameAddons = areAddonsSame(
          item?.customizations?.addons || [],
          product?.customizations?.addons || []
        );

        const hasSameRemoved = areRemovedSame(
          item?.customizations?.removed || [],
          product?.customizations?.removed || []
        );

        const hasSameSizes = areSizesSame(
          item?.customizations?.sizes || [],
          product?.customizations?.sizes || []
        );

        const hasSameOptions = areOptionsSame(
          item?.customizations?.options || [],
          product?.customizations?.options || []
        );

        const hasSameCheese = areCheeseSame(
          item?.customizations?.cheese || null,
          product?.customizations?.cheese || null
        );

        const hasSameBread = areBreadSame(
          item?.customizations?.bread || null,
          product?.customizations?.bread || null
        );

        return (
          item.id === product.id &&
          hasSameAddons &&
          hasSameRemoved &&
          hasSameSizes &&
          hasSameOptions &&
          hasSameCheese &&
          hasSameBread
        );
      });

      // Calculate the customization prices (addons, cheese, bread, etc.)
      const addonTotal = product?.customizations?.addons
        ? product.customizations.addons.reduce(
            (acc: number, addon: any) => acc + addon.price,
            0
          )
        : 0;
      const sizePrice = product?.customizations?.sizes?.price || 0;
      const optionPrice = product?.customizations?.options?.price || 0;
      const cheesePrice = product?.customizations?.cheese?.price || 0;
      const breadPrice = product?.customizations?.bread?.price || 0;

      const customizationTotal =
        addonTotal + sizePrice + cheesePrice + breadPrice + optionPrice;

      if (existingItem) {
        // If the item exists, just increase the quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the new item to the cart with the customization prices
        this.items.push({
          ...product,
          basePrice: product.basePrice + customizationTotal, // Include customization prices in the base price initially
          quantity: 1,
        });
      }

      // Calculate totals after adding the item
      this.calculateTotal();
    },
    addCartDetails(date: any, time: any, notes: any) {
      this.date = date;
      this.time = time;
      this.notes = notes;
    },
    removeFromCart(product: any) {
      // Helper function to compare addons
      const areAddonsSame = (addons1: any[], addons2: any[]) => {
        if (addons1.length !== addons2.length) return false;
        return addons1.every(
          (addon, index) =>
            addon.name === addons2[index].name &&
            addon.price === addons2[index].price
        );
      };

      // Helper function to compare removed items
      const areRemovedSame = (removed1: any[], removed2: any[]) => {
        if (removed1.length !== removed2.length) return false;
        return removed1.every(
          (removedItem, index) => removedItem === removed2[index]
        );
      };

      // Helper function to compare sizes
      const areSizesSame = (sizes1: any[], sizes2: any[]) => {
        if (sizes1.length !== sizes2.length) return false;
        return sizes1.every((size, index) => size.name === sizes2[index].name);
      };

      // Helper function to compare options
      const areOptionsSame = (options1: any[], options2: any[]) => {
        if (options1.length !== options2.length) return false;
        return options1.every(
          (option, index) => option.name === options2[index].name
        );
      };

      // Helper function to compare cheese
      const areCheeseSame = (cheese1: any, cheese2: any) => {
        return cheese1 === cheese2;
      };

      // Helper function to compare bread
      const areBreadSame = (bread1: any, bread2: any) => {
        return bread1 === bread2;
      };

      // Find the item in the cart that matches by id and customizations (addons + removed + sizes + cheese + bread)
      const itemIndex = this.items.findIndex((item: any) => {
        const hasSameAddons = areAddonsSame(
          item?.customizations?.addons || [],
          product?.customizations?.addons || []
        );

        const hasSameRemoved = areRemovedSame(
          item?.customizations?.removed || [],
          product?.customizations?.removed || []
        );

        const hasSameSizes = areSizesSame(
          item?.customizations?.sizes || [],
          product?.customizations?.sizes || []
        );

        const hasSameOptions = areOptionsSame(
          item?.customizations?.options || [],
          product?.customizations?.options || []
        );

        const hasSameCheese = areCheeseSame(
          item?.customizations?.cheese || null,
          product?.customizations?.cheese || null
        );

        const hasSameBread = areBreadSame(
          item?.customizations?.bread || null,
          product?.customizations?.bread || null
        );

        return (
          item.id === product.id &&
          hasSameAddons &&
          hasSameRemoved &&
          hasSameSizes &&
          hasSameOptions &&
          hasSameCheese &&
          hasSameBread
        );
      });

      // If item is found, proceed with the removal logic
      if (itemIndex !== -1) {
        const item = this.items[itemIndex];

        if (item.quantity > 1) {
          // If quantity is more than 1, decrease the quantity
          item.quantity -= 1;
        } else {
          // Otherwise, remove the item entirely
          this.items.splice(itemIndex, 1);
        }
      }

      this.calculateTotal(); // Recalculate totals after removing the item
    },

    calculateTotal() {
      // Ensure subtotal remains a number
      this.subtotal = this.items
        .map((item: any) => item.basePrice * item.quantity)
        .reduce((a: any, b: any) => a + b, 0);

      // Convert subtotal back to a number before doing calculations
      const subtotalNum = parseFloat(this.subtotal);

      // Calculate the total including tax
      const total = subtotalNum + this.taxRate * subtotalNum;

      // Set totalPrice with toFixed to ensure proper formatting
      this.totalPrice = +total.toFixed(2);
    },
    clearCart() {
      this.items = [];
      this.subtotal = 0;
      this.totalPrice = 0;
    },
  },
  getters: {
    getCart(state) {
      return state.items;
    },

    getCartTotal(state) {
      return state.totalPrice;
    },

    getSubtotal(state) {
      return state.subtotal;
    },

    getTaxRate(state) {
      return state.taxRate;
    },

    getItemByCategory(state) {
      return (category: string) => {
        return (
          state.items.filter((item: any) => item.category === category) || []
        );
      };
    },

    getQuantityById(state) {
      return (id: number, title: string) => {
        const item = state.items.find(
          (item: any) => item.id == id && item.title == title
        );
        if (item) {
          return item.quantity;
        } else {
          return 0;
        }
      };
    },
    getQuantityByProduct: (state) => (product: any) => {
      const areAddonsSame = (addons1: any[], addons2: any[]) => {
        if (addons1.length !== addons2.length) return false;
        return addons1.every(
          (addon, index) =>
            addon.name === addons2[index].name &&
            addon.price === addons2[index].price
        );
      };

      const areRemovedSame = (removed1: any[], removed2: any[]) => {
        if (removed1.length !== removed2.length) return false;
        return removed1.every(
          (removedItem, index) => removedItem === removed2[index]
        );
      };

      const areSizesSame = (sizes1: any[], sizes2: any[]) => {
        if (sizes1.length !== sizes2.length) return false;
        return sizes1.every((size, index) => size.name === sizes2[index].name);
      };

      // Find the item in the cart that matches by id and customizations
      const item = state.items.find((item: any) => {
        const hasSameAddons = areAddonsSame(
          item?.customizations?.addons || [],
          product?.customizations?.addons || []
        );

        const hasSameRemoved = areRemovedSame(
          item?.customizations?.removed || [],
          product?.customizations?.removed || []
        );

        const hasSameSizes = areSizesSame(
          item?.customizations?.sizes || [],
          product?.customizations?.sizes || []
        );

        return (
          item.id === product.id &&
          hasSameAddons &&
          hasSameRemoved &&
          hasSameSizes
        );
      });

      // Return the quantity or 0 if not found
      return item ? item.quantity : 0;
    },
    getProductsById: (state) => (id: number) => {
      const item = state.items.filter((item: any) => item.id == id);
      if (item) {
        return item;
      } else {
        return null;
      }
    },
  },
});
