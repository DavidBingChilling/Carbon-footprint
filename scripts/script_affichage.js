const categories = {
  repas: {
    vegetarien: ["Végétarien", "Repas", 1,5 ], 
    viande_poulet_poisson: ["Viande (Poulet/Poisson)", "Repas", 3.3], 
    viande_rouge: ["Viande Rouge", "Repas", 6.5],
    cafe: ["Café", "Tasse", 0.03],
  },
  transport: {
    metro: ["Métro", "Km", 0.00008], 
    voiture_essence: ["Voiture (Essence)", "Km", 0.274],
    voiture_electrique: ["Voiture (Electrique)", "Km", 0.042], 
    voiture_gazole: ["Voiture (Gazole)", "Km", 0.314], 
    bus: ["Bus", "Km", 0.024], 
    train: ["Train", "Km", 0.0024],
    velo: ["Vélo", "Km", 0], 
    scooter: ["Scooter", "Km", 0.08]
  },
  numerique: {
    envoi_email: ["Envoi d'e-mail", "Envoi", 0.000004], 
    streaming_video: ["Streaming Vidéo", "Heure", 0.55], 
    streaming_musique: ["Streaming Musique", "Heure", 0.03],
    telechargement: ["Téléchargement", "Téléchargement", 0.2],
    jeux_ligne: ["Jeux en Ligne", "Heure", 0.02],
    appel_video: ["Appel Vidéo", "Heure", 0.22],
  },
  achat: {
    lave_linge_vaisselle: ["Lave Linge/Vaisselle", "Acheté/produit", 260], 
    frigo: ["Frigo", "Acheté/produit", 240],
    telephone: ["Téléphone", "Acheté/produit", 20],  
    televisions: [{
      petite: ["Petite", "Acheté/produit", 180],
      moyenne: ["Moyenne", "Acheté/produit", 270], 
      grande: ["Grande", "Acheté/produit", 370] 
    }, "Télévisions"],
    ordinateurs: [{
      portable: ["Portable", "Acheté/produit", 240], 
      fixe: ["Fixe", "Acheté/produit", 410] 
    }, "Ordinateurs"],
    vetements_neufs: [{
      jean: ["Jean", "Acheté/produit", 33], 
      t_shirt: ["T-Shirt", "Acheté/produit", 5], 
      chemise: ["Chemise", "Acheté/produit", 33], 
      pantalon: ["Pantalon", "Acheté/produit", 33], 
      robe_jupe: ["Robe/Jupe", "Acheté/produit", 33], 
      sous_vetements: ["Sous-Vetements", "Acheté/produit", 1] 
    }, "Vetements Neufs"],
    vetements_occasions: [{
      jean_o: ["Jean", "Acheté", 7], 
      t_shirt_o: ["T-Shirt", "Acheté", 1], 
      chemise_o: ["Chemise", "Acheté", 7], 
      pantalon_o: ["Pantalon", "Acheté", 7], 
      robe_jupe_o: ["Robe/Jupe", "Acheté", 7], 
      sous_vetements_o: ["Sous-vtms",  "Acheté", 0.2] 
    }, "Vetements Occasions"]
  },
  courses_alimentaires: {
    riz: ["Riz", "Kg", 0.8], 
    pates: ["Pates", "Kg", 0.9],
    pommes_de_terre: ["Pommes de Terre", "Kg", 0.15],
    carottes: ["Carottes", "Kg", 0.14],
    tomates: ["Tomates", "Kg", 0.12],
    salade: ["Salade", "Kg", 0.3],
    poisson: ["Poisson", "Kg", 3.1],
    poulet: ["Poulet", "Kg", 3],
    lait: ["Lait", "L", 1.2],
    oeufs: ["Oeufs", "Douzaine", 0.6]
}
};

// Add event listener to the button with the class ".btn-outline-secondary"
document
  .querySelector(".btn-outline-secondary")
  .addEventListener("click", addForm);

// Function to add a form based on the selected category
function addForm() {
  // Get the category select element
  const categorySelect = document.getElementById("inputGroupSelect01");
  // Get the value of the selected category
  const selectedValue = categorySelect.value;
  // Get the container where forms will be added
  const formContainer = document.getElementById("form-container");
  // Get the selected option
  const selectedOption = categorySelect.querySelector(`option[value="${selectedValue}"]`);
  // Get the subcategories of the selected category
  const subCat = categories[selectedValue];

  // Check if the selected option is disabled (already added)
  if (selectedOption.disabled) {
    // Do not add a form if the option is already disabled
    return;
  }

  // Generate form HTML template
  let formTemplate = `
    <div id="${selectedValue}" class="card calcul-card" style="width: 25rem;">
    <div class="card-body">
    <i class="fas fa-times close-icon" onclick="removeSubcategory('${selectedValue}')"></i>
    <h5 class="card-title"><label class="form-label">${document.querySelector(`option[value="${selectedValue}"]`).textContent}</label></h5>
      <select class="form-select mb-2" id="${selectedValue}-subcategory-select">
        <option selected>Choisi</option>  `;
  // Iterate through subcategories and add them to the form template
  for (let key in subCat) {
    if (typeof subCat[key][0] === 'object' && subCat[key][0] !== null) {
      formTemplate += `<optgroup label="${subCat[key][1]}">`;
      for (let subkey in subCat[key][0]) {
        if (subkey != key) {
          formTemplate += `<option id="subsubcat" class="${key}" value="${subkey}">${subCat[key][0][subkey][0]}</option>`;
        }
      }
      formTemplate += `</optgroup>`;
    } else {
      formTemplate += `<option value="${key}">${subCat[key][0]}</option>`;
    }
  }
  formTemplate += `
      </select>
      <button class="btn btn-outline-primary mb-2" type="button" onclick="addSubcategory('${selectedValue}')">Ajouter</button>
      <div id="${selectedValue}-subcategories-container"></div>
      </div>
    </div>`;
  // Insert the form template into the form container
  formContainer.insertAdjacentHTML("beforeend",  formTemplate);
  // Mark the selected option as selected and disabled
  selectedOption.dataset.selected = "true";
  selectedOption.disabled = true;
}

// Function to add a subcategory
function addSubcategory(category) {
  // Get the subcategory select element
  const subcategorySelect = document.getElementById(`${category}-subcategory-select`);
  // Get the value of the selected subcategory
  const selectedSubcategory = subcategorySelect.value;
  // Get the selected option
  const selectedOption = subcategorySelect.querySelector(`option[value="${selectedSubcategory}"]`);

  // Check if the selected option is disabled (already added)
  if (selectedOption.disabled) {
    // Do not add a subcategory if the option is already disabled
    return;
  }

  // Check if the selected option is already selected
  if (selectedOption.dataset.selected === "true") {
    return;
  }
  // Get the container where subcategories will be added
  const subcategoriesContainer = document.getElementById(`${category}-subcategories-container`);
  let subcategoryTemplate = "";
  // Generate subcategory HTML template
  if (selectedOption.id == "subsubcat") {
    const subcat = selectedOption.className;
    subcatname = categories[category][subcat][1];
    const subcatnamesplit = subcatname.split(" ");
    if (subcatnamesplit.length > 1){
      subcatname = subcatnamesplit[1];
    }
    subcategoryTemplate += `
    <div class="input-group mb-2 ${category}-subcategory" data-subcategory="${selectedSubcategory}">
      <span class="input-group-text">`;
      
    subcategoryTemplate += `${subcatname} : ${categories[category][subcat][0][selectedSubcategory][0]}`;
      
    subcategoryTemplate += `</span>
      <input type="number" min="0" oninput="checkInput(this)" class="form-control ${category} ${selectedSubcategory} ${subcat} subsubcat" placeholder="(${categories[category][subcat][0][selectedSubcategory][1]})">
      <button class="btn btn-outline-secondary" type="button" onclick="removeSubcategory('${category}', '${selectedSubcategory}')">-</button>
    </div>`;
  } else {
    subcategoryTemplate += `
    <div class="input-group mb-2 ${category}-subcategory" data-subcategory="${selectedSubcategory}">
      <span class="input-group-text">`;
      subcategoryTemplate += `${categories[category][selectedSubcategory][0]}`;
      subcategoryTemplate += `</span>
      <input type="number" min="0" oninput="checkInput(this)" class="form-control ${category} ${selectedSubcategory}" placeholder="(${categories[category][selectedSubcategory][1]})">
      <button class="btn btn-outline-secondary" type="button" onclick="removeSubcategory('${category}', '${selectedSubcategory}')">-</button>
    </div>
  `;
  }
  // Insert the subcategory template into the subcategories container
  subcategoriesContainer.insertAdjacentHTML("beforeend", subcategoryTemplate);
  // Mark the selected option as selected and disabled
  selectedOption.dataset.selected = "true";
  selectedOption.disabled = true;
  // Add event listener to the input element of the added subcategory
  const inputElement = subcategoriesContainer.lastElementChild.querySelector("input");
  inputElement.addEventListener("input", updateCo2Total);
}

// Function to remove a category or subcategory
function removeSubcategory(category, subcategoryId) {
  // Check if the function is called to remove a category or subcategory
  if (arguments.length == 1) {
    // Remove the entire category element
    const categoryElement = document.getElementById(category);
    categoryElement.remove();
    // Enable the corresponding option in the category select
    const categorySelect = document.getElementById("inputGroupSelect01");
    const selectedOption = categorySelect.querySelector(`option[value="${category}"]`);
    const categoryOption = selectedOption;
    categoryOption.disabled = false;
    categoryOption.dataset.selected = "false";
  } else {
    // Remove the specific subcategory element
    const subcategoryElement = document.querySelector(`.${category}-subcategory[data-subcategory="${subcategoryId}"]`);
    const subcategoryOption = document.querySelector(`#${category}-subcategory-select option[value="${subcategoryId}"]`);
    // Remove event listener from the input element
    subcategoryElement.querySelector("input").removeEventListener("input", updateCo2Total);
    subcategoryElement.remove();
    // Enable the corresponding option in the subcategory select
    subcategoryOption.disabled = false;
    subcategoryOption.dataset.selected = "false";
  }
  // Update the CO2 total after removing category or subcategory
  updateCo2Total();
}

// Function to update the CO2 total
function updateCo2Total() {
  // Get all input elements
  const inputs = document.querySelectorAll("#form-container input[type='number']");
  let co2Total = 0;

  // Iterate through each input element and calculate CO2 total
  for (const input of inputs) {
    const category = input.classList[1];
    const subcategory = input.classList[2];

    // Check if it's a subsubcategory
    if (input.classList[4] == "subsubcat") {
      const subsubcatId = input.classList[3];
      co2Total += (input.valueAsNumber || 0) * categories[category][subsubcatId][0][subcategory][2];
    } else {
      co2Total += (input.valueAsNumber || 0) * categories[category][subcategory][2];
    }
  }

  // Update the CO2 total in the UI
  document.getElementById("co2-total").textContent = co2Total.toFixed(2);

  // Update CO2 values for comparison if comparison card exists
  const compareSelect = document.getElementById("equivalence-category-select");
  const compareValue = compareSelect.value;
  document.querySelectorAll("span.co2-value").forEach((span) => {
    span.textContent = co2Total.toFixed(2);
  });

  // If comparison card exists, update the comparisons
  if (document.querySelector("div.compare-card") !== null) {
    calculCo2Compare(compareValue);
    updateAllComparisons();
  }
}




