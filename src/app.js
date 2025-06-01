document.addEventListener("alpine:init", () => {
  // Products data tanpa desc
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "kopi ireng",
        img: "kopi1.jpg",
        price: 10000,
        desc: "Kopi hitam pekat dengan rasa kuat dan pahit yang khas.",
      },
      {
        id: 2,
        name: "kopi Merah",
        img: "kopi2.jpg",
        price: 20000,
        desc: "Kopi dengan aroma buah merah yang segar dan rasa manis alami.",
      },
      {
        id: 3,
        name: "kopi Kuning",
        img: "kopi3.jpg",
        price: 30000,
        desc: "Kopi ringan dengan sentuhan rasa citrus dan warna unik.",
      },
      {
        id: 4,
        name: "kopi Ijo",
        img: "kopi4.jpg",
        price: 40000,
        desc: "Kopi hijau dengan cita rasa herbal dan rendah kafein.",
      },
      {
        id: 5,
        name: "kopi Ungu",
        img: "kopi5.jpg",
        price: 50000,
        desc: "Kopi spesial beraroma bunga dan rasa kompleks yang memikat.",
      },
    ],

    // Show product details modal
    showProductDetail(product) {
      Alpine.store("modal").open(product);
    },
  }));

  // Modal store yang disederhanakan
  Alpine.store("modal", {
    product: null,
    open(product) {
      this.product = product;
      document.getElementById("item-detail-modal").style.display = "block";
      feather.replace();
    },
    close() {
      document.getElementById("item-detail-modal").style.display = "none";
    },
  });

  // Cart store (tetap sama seperti sebelumnya)
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// Event listener untuk close modal
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("item-detail-modal");
  const closeBtn = modal.querySelector(".close-icon");

  closeBtn.addEventListener("click", function () {
    Alpine.store("modal").close();
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      Alpine.store("modal").close();
    }
  });
});
