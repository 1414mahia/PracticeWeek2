// Function to load all meal categories from the API
const loadAllProduct = () => {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    // Fetching data from the API
    fetch(apiUrl)
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            console.log("Categories data:", data); // Debugging statement to check data
            if (data.categories) {
                // If categories are found, display them
                displayProducts(data.categories);
            } else {
                console.error("No categories found.");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error); // Handle any errors
        });
};

// Function to display the categories as cards
const displayProducts = (categories) => {
    const productContainer = document.getElementById("product-container");

    // Check if the container exists in the DOM
    if (!productContainer) {
        console.error("Element with ID 'product-container' not found.");
        return;
    }

    // Clear any previous content
    productContainer.innerHTML = '';

    // Loop through each category and create a card
    categories.forEach(category => {
        const div = document.createElement("div");
        div.classList.add("card");

        // Card structure with category image, name, and description
        div.innerHTML = `
            <img class="card-img" src="${category.strCategoryThumb}" alt="${category.strCategory}" />
            <h5>${category.strCategory}</h5>
            <p>${category.strCategoryDescription.slice(0, 100)}...</p>
            <button class="card-btn" onclick="singleProduct('${category.strCategory}')">Details</button>
        `;

        // Append the card to the product container
        productContainer.appendChild(div);
    });
};

// Function to load the meals of a specific category
const singleProduct = (category) => {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    // Fetch meals from the category
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(`Meals for category ${category}:`, data); // Debugging statement to check data
            if (data.meals) {
                displayMealDetails(data.meals); // Display meal details if found
            } else {
                console.error(`No meals found for category ${category}.`);
            }
        })
        .catch(error => {
            console.error('Error fetching meal details:', error); // Handle errors
        });
};

// Function to display meal details
const displayMealDetails = (meals) => {
    const mealDetailContainer = document.getElementById("meal-detail-container");

    // Check if the container exists in the DOM
    if (!mealDetailContainer) {
        console.error("Element with ID 'meal-detail-container' not found.");
        return;
    }

    // Clear any previous meal details
    mealDetailContainer.innerHTML = '';

    // Loop through each meal and create a meal card
    meals.forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("meal-card");

        // Meal card structure with image, name, and more details button
        div.innerHTML = `
            <img class="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <h3>${meal.strMeal}</h3>
            <button class="meal-btn" onclick="fetchMealDetail('${meal.idMeal}')">More Details</button>
        `;

        // Append the meal card to the meal detail container
        mealDetailContainer.appendChild(div);
    });
};

// Function to fetch meal details by ID
const fetchMealDetail = (mealId) => {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    // Fetch the meal details by ID
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(`Meal details for ID ${mealId}:`, data); // Debugging statement to check data
            if (data.meals && data.meals.length > 0) {
                showMealDetail(data.meals[0]); // Display the meal details
            } else {
                console.error(`No details found for meal ID ${mealId}.`);
            }
        })
        .catch(error => {
            console.error('Error fetching meal detail:', error); // Handle errors
        });
};

// Function to show the meal details
const showMealDetail = (meal) => {
    const mealDetailContainer = document.getElementById("meal-detail-container");

    // Check if the container exists in the DOM
    if (!mealDetailContainer) {
        console.error("Element with ID 'meal-detail-container' not found.");
        return;
    }

    // Clear any previous meal details
    mealDetailContainer.innerHTML = '';

    // Create the meal detail card
    const div = document.createElement("div");
    div.classList.add("meal-detail-card");

    // Meal detail card structure with image, name, instructions, and ingredients
    div.innerHTML = `
        <img class="meal-detail-img" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h2>${meal.strMeal}</h2>
        <p>${meal.strInstructions}</p>
        <ul>
            ${getIngredientsList(meal)}
        </ul>
    `;

    // Append the meal detail card to the meal detail container
    mealDetailContainer.appendChild(div);
};

// Function to generate a list of ingredients and measurements
const getIngredientsList = (meal) => {
    let ingredientsList = '';

    // Loop through the ingredients and measurements
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        // If the ingredient exists, add it to the list
        if (ingredient) {
            ingredientsList += `<li>${ingredient} - ${measure || ''}</li>`;
        } else {
            break;
        }
    }

    return ingredientsList;
};

// Load all products on page load
loadAllProduct();
