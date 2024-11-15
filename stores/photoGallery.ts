import { defineStore, acceptHMRUpdate } from "pinia";

export const usePhotoGalleryStore = defineStore("photoGallery", {
  state: () => ({
    galleryData: [
      {
        id: 1,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_1.jpg",
        title: "Title One",
      },
      {
        id: 2,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_2.jpg",
        title: "Title Two",
      },
      {
        id: 3,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_3.jpg",
        title: "Title Three",
      },
      {
        id: 4,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_5.jpg",
        title: "Title Four",
      },
      {
        id: 5,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_4.jpg",
        title: "Title Five",
      },
      {
        id: 6,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_7.jpg",
        title: "Title Six",
      },
      {
        id: 7,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_6.jpg",
        title: "Title Seven",
      },
      {
        id: 8,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_9.jpg",
        title: "Title Eight",
      },
      {
        id: 9,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_8.jpg",
        title: "Title Nine",
      },
      {
        id: 10,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_10.jpg",
        title: "Title Ten",
      },
      {
        id: 11,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_13.jpg",
        title: "Title Eleven",
      },
      {
        id: 12,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_12.jpg",
        title: "Title Twelve",
      },
      {
        id: 13,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_11.jpg",
        title: "Title Thirteen",
      },
      {
        id: 14,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_15.jpg",
        title: "Title Fourteen",
      },
      {
        id: 15,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_16.jpg",
        title: "Title Fifteen",
      },
      {
        id: 16,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_14.jpg",
        title: "Title Sixteen",
      },
      {
        id: 17,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_18.jpg",
        title: "Title Seventeen",
      },
      {
        id: 18,
        image: "https://laceibapr.com/img/gallery/large/gallery_masonry_17.jpg",
        title: "Title Eighteen",
      },
    ],
  }),

  getters: {
    getPhotoGalleries(state) {
      return state.galleryData;
    },
  },
});
