const flavors = [
  { id: "vanilla", name: "Vanilla Bean", color: "#fdf4d2" },
  { id: "chocolate", name: "Chocolate Fudge", color: "#6b3e2e" },
  { id: "strawberry", name: "Strawberry Swirl", color: "#f8a1b4" },
  { id: "mint", name: "Mint Chip", color: "#b9f4d5" },
  { id: "blueberry", name: "Blueberry Bliss", color: "#7a9bd7" },
  { id: "pistachio", name: "Pistachio Dream", color: "#c5e0a9" },
];

const toppings = [
  { id: "sprinkles", name: "Rainbow Sprinkles" },
  { id: "chocolate-syrup", name: "Chocolate Syrup" },
  { id: "caramel-drizzle", name: "Caramel Drizzle" },
  { id: "whipped-cream", name: "Whipped Cream" },
  { id: "cherry", name: "Cherry on Top" },
];

const flavorOptions = document.getElementById("flavor-options");
const toppingOptions = document.getElementById("topping-options");
const scoopsEl = document.getElementById("scoops");
const toppingsEl = document.getElementById("toppings");
const emptyStateEl = document.getElementById("empty-state");
const selectionSummaryEl = document.getElementById("selection-summary");

function createOption(option, group) {
  const label = document.createElement("label");
  label.className = "option";
  label.setAttribute("for", option.id);

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = option.id;
  input.name = option.id;
  input.dataset.group = group;

  const colorIndicator = document.createElement("span");
  colorIndicator.className = "option__color";

  if (group === "flavor") {
    colorIndicator.style.background = option.color;
  } else {
    colorIndicator.style.background = "linear-gradient(135deg, var(--primary), var(--secondary))";
  }

  const text = document.createElement("span");
  text.textContent = option.name;

  label.append(input, colorIndicator, text);

  label.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      input.checked = !input.checked;
      updateCone();
    }
  });

  input.addEventListener("change", updateCone);

  return label;
}

function renderOptions() {
  flavors.forEach((flavor) => {
    const optionEl = createOption(flavor, "flavor");
    flavorOptions.appendChild(optionEl);
  });

  toppings.forEach((topping) => {
    const optionEl = createOption(topping, "topping");
    toppingOptions.appendChild(optionEl);
  });
}

function updateCone() {
  const selectedFlavors = flavors.filter((flavor) =>
    document.getElementById(flavor.id).checked
  );
  const selectedToppings = toppings.filter((topping) =>
    document.getElementById(topping.id).checked
  );

  scoopsEl.innerHTML = "";
  toppingsEl.innerHTML = "";

  if (selectedFlavors.length === 0) {
    emptyStateEl.style.opacity = 1;
    selectionSummaryEl.innerHTML = "";
  } else {
    emptyStateEl.style.opacity = 0;

    selectedFlavors.forEach((flavor, index) => {
      const scoop = document.createElement("div");
      scoop.className = "scoop";
      scoop.style.background = flavor.color;
      scoop.style.zIndex = String(index + 1);
      scoopsEl.appendChild(scoop);
    });

    const flavorNames = selectedFlavors.map((flavor) => flavor.name).join(", ");
    const toppingNames =
      selectedToppings.length > 0
        ? selectedToppings.map((topping) => topping.name).join(", ")
        : "no extra toppings";

    selectionSummaryEl.innerHTML = `<strong>Flavors:</strong> ${flavorNames}<br><strong>Toppings:</strong> ${toppingNames}`;
  }

  selectedToppings.forEach((topping) => {
    const toppingLayer = document.createElement("div");
    toppingLayer.className = `topping topping--${topping.id} topping--visible`;
    toppingsEl.appendChild(toppingLayer);
  });
}

renderOptions();
updateCone();
