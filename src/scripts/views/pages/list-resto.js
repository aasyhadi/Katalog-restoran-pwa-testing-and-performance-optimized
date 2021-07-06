import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestoItemTemplate } from '../templates/template-creator';

const ListResto = {
  async render() {
    return `
        <div class="content">
        <h2 class="content__heading">Eksplore Restaurant</h2>
        <div id="restos" class="restos">
  
        </div>
      </div>
      `;
  },

  async afterRender() {
    const restos = await RestaurantDbSource.listRestaurants();
    const restosContainer = document.querySelector('#restos');
    restos.forEach((resto) => {
      restosContainer.innerHTML += createRestoItemTemplate(resto);
    });
  },
};

export default ListResto;
