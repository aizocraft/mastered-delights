// gallery.js
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  function showCategory(category) {
    // Deactivate all panels and buttons
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabPanels.forEach(panel => panel.classList.remove("active"));

    // Activate the right tab
    tabButtons.forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add("active");
      }
    });

    // Show the correct panel(s)
    if (category === "all") {
      tabPanels.forEach(panel => panel.classList.add("active"));
    } else {
      const targetPanel = document.querySelector(`.tab-panel[data-category="${category}"]`);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    }
  }

  // Button click handler
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      window.location.hash = category; // Update URL hash
      showCategory(category);
    });
  });

  // On initial load, check URL hash
  function initFromHash() {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    const validCategories = Array.from(tabButtons).map(btn => btn.dataset.category);
    if (validCategories.includes(hash)) {
      showCategory(hash);
    } else {
      showCategory("all");
    }
  }

  window.addEventListener("hashchange", initFromHash);
  initFromHash(); // Call on page load
});
