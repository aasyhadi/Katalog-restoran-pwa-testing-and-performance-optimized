import CONFIG from '../../globals/config';

const renderCategories = (restaurant) => {
  let Categories = '';
  const getCategoriesData = restaurant.categories;
  getCategoriesData.forEach((categorie) => {
    Categories += `
      ${categorie.name},
    `;
  });
  return Categories;
};

const renderMenuFoods = (restaurant) => {
  let menuFoods = '';
  const getMenuFoodsData = restaurant.menus.foods;
  getMenuFoodsData.forEach((menuFood) => {
    menuFoods += `
      ${menuFood.name},
    `;
  });
  return menuFoods;
};

const renderMenuDrinks = (restaurant) => {
  let menuDrinks = '';
  const getMenuDrinksData = restaurant.menus.drinks;
  getMenuDrinksData.forEach((menuDrink) => {
    menuDrinks += `
      ${menuDrink.name},
    `;
  });
  return menuDrinks;
};

const renderCustReviews = (restaurant) => {
  let CustReviews = '';
  const getCustReviews = restaurant.customerReviews;
  getCustReviews.forEach((custReview) => {
    CustReviews += `
      <p class="custReviews">${custReview.date} | ${custReview.name} <br>
      <i>${custReview.review}</i></p><br/>
      
    `;
  });
  return CustReviews;
};

const createRestoDetailTemplate = (restaurant) => `
  <h2 class="resto__title">${restaurant.name}</h2>
  <img class="lazyload resto__poster" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
  <div class="resto__info">
  <h3>Information</h3>
    <h4>Address</h4>
    <p>${restaurant.address}</p>
    <h4>Categories</h4>
    <p>${renderCategories(restaurant)}</p>
    <h4>Menu Foods</h4>
    <p>${renderMenuFoods(restaurant)}</p>
    <h4>Menu Drinks</h4>
    <p>${renderMenuDrinks(restaurant)}</p>
    <h4>Description</h4>
    <p>${restaurant.description}</p>
    <h4>City</h4>
    <p>${restaurant.city}</p>
    <h4>Rating</h4>
    <p>⭐️ ${restaurant.rating}</p>
    <h4>Customer Reviews</h4>
    <p>${renderCustReviews(restaurant)}</p></div>
    `;

const createRestoItemTemplate = (restaurants) => `
  <div class="resto-item">
    <div class="resto-item__header">
        <img class="lazyload resto-item__header__poster" alt="${restaurants.name || '-'}"
        data-src="${restaurants.pictureId ? CONFIG.BASE_IMAGE_URL + restaurants.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
        <div class="resto-item__header__rating">
            <p><span class="resto-item__header__rating__score">${restaurants.city}</span></p>
        </div>
    </div>
    <div class="resto-item__content">
        <h3 class="resto__title"><a href="${`/#/detail/${restaurants.id}`}">${restaurants.name || '-'}</a></h3>
        <h4>⭐️ ${restaurants.rating}</h4>
        <p>${restaurants.description || '-'}</p>
    </div>
  </div>
  `;

const createFavoriteRestoButtonTemplate = () => `
  <button aria-label="favorite this resto" id="favoriteButton" class="favorite">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnfavoriteRestoButtonTemplate = () => `
  <button aria-label="unfavorite this resto" id="favoriteButton" class="favorite">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createFavoriteRestoButtonTemplate,
  createUnfavoriteRestoButtonTemplate,
};
