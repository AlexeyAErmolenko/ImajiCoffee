import api from './services/api.js';

const listProducts = document.querySelector('.list_products');
const filterTabs = document.querySelector('.tabs');
const filterForm = document.querySelector('.filter_form');
const searchInput = document.querySelector('#search-input');
const changeSelect = document.querySelector('#price-selector');
const sortSelect = document.querySelector('#sort-selector');
const emptyListProductsContainer = document.querySelector(
  '.empty_list_products'
);

let items = [];
let currCategory = 'beverage'; // tab
let currSearch = ''; // input
let currPrice = 'all'; // select Price
let currSort = 'best-selling'; // select Sort By

/** Renders the item cards into the DOM */
const renderUI = data => {
  listProducts.innerHTML = '';

  const filteredByPrice = data.filter(item => {
    const price = parseFloat(item.price);
    if (currPrice === 'all') return true;
    if (currPrice === '0-10') return price < 10;
    if (currPrice === '10-plus') return price >= 10;
    return true;
  });

  if (filteredByPrice.length > 0) {
    emptyListProductsContainer.classList.add('visually_hidden');
    listProducts.innerHTML = filteredByPrice
      .map(item => createItemCard(item))
      .join('');
  } else {
    emptyListProductsContainer.classList.remove('visually_hidden');
  }
};

/** Main function to load items with current filters */
const loadItems = async () => {
  const queryParams = {
    category: currCategory,
  };

  if (currSearch.trim() !== '') {
    queryParams.name = currSearch.trim();
  }

  switch (currSort) {
    case 'price-asc':
      queryParams.sortBy = 'price';
      queryParams.order = 'asc';
      break;
    case 'price-desc':
      queryParams.sortBy = 'price';
      queryParams.order = 'desc';
      break;
    case 'newest':
      queryParams.sortBy = 'createdAt';
      queryParams.order = 'desc';
      break;
  }

  try {
    const data = await api.getAll(queryParams);
    if (currSort === 'best-selling') {
      data.sort((a, b) => Number(b.isBestSelling) - Number(a.isBestSelling));
    }

    renderUI(data);
  } catch (error) {
    console.error('Failed to load products:', error);
    listProducts.innerHTML =
      '<li>Error loading menu. Please try again later.</li>';
  }
};

searchInput.addEventListener('input', event => {
  currSearch = event.target.value;
  loadItems();
});

filterTabs.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const category = button.dataset.category;
  if (!category) return;

  // Reset aria-selected in all tabs
  filterTabs
    .querySelectorAll('.tabs button')
    .forEach(btn => btn.setAttribute('aria-selected', 'false'));
  // Activate the current tab
  button.setAttribute('aria-selected', 'true');

  currCategory = category;
  loadItems();
});

filterForm.addEventListener('change', event => {
  const select = event.target.closest('select');
  if (!select) return;

  if (select.id === 'price-selector') currPrice = select.value;
  if (select.id === 'sort-selector') currSort = select.value;

  loadItems();
});

filterForm.addEventListener('click', event => {
  const button = event.target.closest('button[data-clear]');
  if (!button) return;

  const type = button.dataset.clear;
  if (type === 'search') {
    searchInput.value = '';
    currSearch = '';
  }
  if (type === 'price') {
    changeSelect.value = 'all';
    currPrice = 'all';
  }
  if (type === 'sort') {
    sortSelect.value = 'best-selling';
    currSort = 'best-selling';
  }

  loadItems();
});

/** Generates HTML string for a single product card */
const createItemCard = item => {
  const price =
    typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
  const originalPrice = item.originalPrice
    ? parseFloat(item.originalPrice)
    : null;

  return `
    <li class="product_card" data-category="${item.category}">
      <article>
        <div class="product_image">
          <img src="${item.image}" alt="${item.alt}" width="300" height="300">
          ${
            !item.inStock
              ? `<img class="overlay" src="https://res.cloudinary.com/dserfv7z4/image/upload/v1770373518/overlayOutOfStock_mxenki.png"
            alt="25 percent transparent black overlay" width="300" height="300">`
              : ''
          }
        </div>
        <div class="product_card_name">
          <h3>${item.name}</h3>
          <p>${item.availability}</p>
        </div>
        <div class="price-promo">
          <div class="price">
            <p>$${price.toFixed(2)}</p>
            ${
              originalPrice != null
                ? `<p class="crossed_out">$${originalPrice.toFixed(2)}</p>`
                : ''
            }
          </div>
          ${item.isPromo ? `<p class="promo">Get 20% Off in App</p>` : ''}
        </div>
        ${
          !item.inStock
            ? `<div class="out_of_stock_badge">
          <p>Out of Stock</p>
          </div>`
            : ''
        }
        ${item.onSale ? `<p class="sale_badge">sale</p>` : ''}
      </article>
    </li>
  `;
};

// async function loadProducts() {
async function loadProducts(params = { category: currCategory }) {
  try {
    items = await api.getAll();
    loadItems();
  } catch (error) {
    console.error('Failed to load products:', error);
    listProducts.innerHTML = '<p>Error loading menu</p>';
  }
}

// Initial load
document.addEventListener('DOMContentLoaded', loadProducts);
