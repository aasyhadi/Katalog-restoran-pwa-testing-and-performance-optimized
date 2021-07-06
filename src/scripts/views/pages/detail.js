import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestoDetailTemplate } from '../templates/template-creator';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter';
import FavoriteRestoIdb from '../../data/favoriteresto-idb';

const Detail = {
  async render() {
    return `
      <div id="resto" class="resto"></div>
      <div id="favoriteButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await RestaurantDbSource.detailRestaurant(url.id);
    const restoContainer = document.querySelector('#resto');
    restoContainer.innerHTML = createRestoDetailTemplate(resto);

    FavoriteButtonPresenter.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      favoriteRestos: FavoriteRestoIdb,
      resto: {
        id: resto.id,
        name: resto.name,
        description: resto.description,
        pictureId: resto.pictureId,
        rating: resto.rating,
        city: resto.city,
      },
    });
  },
};

export default Detail;
