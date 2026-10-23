function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

function closeMenu() {

}

function toggleTheme() {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  localStorage.setItem("raptorTheme", isLight ? "light" : "dark");

  updateThemeButton();
}

function updateThemeButton() {
  const button = document.querySelector(".theme-btn");

  if (!button) return;

  button.textContent = document.body.classList.contains("light")
    ? "Dark Mode 🌙"
    : "Light Mode ☀️";
}

document.addEventListener("DOMContentLoaded", function () {

  // Load saved theme
  const savedTheme = localStorage.getItem("raptorTheme");

  document.body.classList.toggle("light", savedTheme === "light");

  updateThemeButton();

  // Search products
  const searchInput = document.getElementById("searchInput");

  function searchProducts() {
    if (!searchInput) return;

    const searchText = searchInput.value
      .trim()
      .toLowerCase();

    const products = document.querySelectorAll(".product-card");
    let found = 0;

    products.forEach(product => {
      const productText = product.innerText.toLowerCase();

      if (productText.includes(searchText)) {
        product.style.display = "";
        found++;
      } else {
        product.style.display = "none";
      }
    });

    let noResults = document.getElementById("noResults");

    if (!noResults && products.length > 0) {
      noResults = document.createElement("p");
      noResults.id = "noResults";
      noResults.textContent = "No products found!";
      noResults.style.cssText =
        "color:#ff4757;text-align:center;font-size:18px;display:none;width:100%;";
      
      const container = document.querySelector(".products-container");

      if (container) {
        container.appendChild(noResults);
      }
    }

    if (noResults) {
      noResults.style.display = found === 0 ? "block" : "none";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", searchProducts);

    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        searchProducts();
      }
    });
  }

  // Scroll progress
  function updateScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");

    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
      ? (scrollTop / scrollHeight) * 100
      : 0;

    progressBar.style.width = progress + "%";
  }

  window.addEventListener("scroll", updateScrollProgress);
  window.addEventListener("resize", updateScrollProgress);

  updateScrollProgress();

  // Back to top
  const topButton = document.getElementById("topBtn");

  if (topButton) {
    topButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Close menu after clicking a link
  const menu = document.getElementById("menu");

  if (menu) {
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });
  }

  // User button
  window.showUser = function () {
    alert("Welcome to Raptor Gaming Store! 🎮");
  };

  // Product purchase buttons
  document.querySelectorAll(".product-card .Buy1").forEach(button => {
    button.addEventListener("click", function () {
      const product = button.closest(".product-card");

      if (!product) return;

      const name = product.querySelector("h3")?.textContent.trim() || "Product";
      const priceText = product.querySelector(".product-price")?.textContent || "";
      const priceMatch = priceText.match(/[\d.]+/);
      const price = priceMatch ? Number(priceMatch[0]) : 0;

      const input = prompt("Enter quantity:");

      if (input === null) return;

      const quantity = Number(input);

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        alert("Enter a quantity between 1 and 100.");
        return;
      }

      const total = price * quantity;

      const confirmed = confirm(
        "Product: " + name +
        "\nPrice per item: $" + price +
        "\nQuantity: " + quantity +
        "\nTotal: $" + total.toFixed(2) +
        "\n\nConfirm your order?"
      );

      if (confirmed) {
        alert(
          "Demo order prepared! 🎮" +
          "\nProduct: " + name +
          "\nQuantity: " + quantity +
          "\nTotal: $" + total.toFixed(2) +
          "\n\nNo payment was made."
        );
      }
    });
  });

  // Offer purchase buttons
  document.querySelectorAll(".raptor-offers .Buy1").forEach(button => {
    button.addEventListener("click", function () {
      const offer = button.closest(".offer-card");

      if (!offer) {
        alert("Please select a valid offer.");
        return;
      }

      const name =
        offer.querySelector("h3")?.textContent.trim() || "Special Offer";

      const priceText =
        offer.querySelector(".offer-prices strong")?.textContent || "";

      const price = Number(priceText.replace(/[^0-9.]/g, ""));

      if (!Number.isFinite(price) || price <= 0) {
        alert("Offer price is unavailable.");
        return;
      }

      const input = prompt("Enter quantity:");

      if (input === null) return;

      const quantity = Number(input);

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        alert("Enter a quantity between 1 and 100.");
        return;
      }

      const total = price * quantity;

      const confirmed = confirm(
        "Offer: " + name +
        "\nPrice per item: $" + price +
        "\nQuantity: " + quantity +
        "\nTotal: $" + total.toFixed(2) +
        "\n\nConfirm your order?"
      );

      if (confirmed) {
        alert(
          "Demo order prepared! 🎮" +
          "\nOffer: " + name +
          "\nTotal: $" + total.toFixed(2) +
          "\n\nNo payment was made."
        );
      }
    });
  });

});