import FavoriteButtonPresenter from '../../src/scripts/utils/favorite-button-presenter';
import FavoriteRestoIdb from '../../src/scripts/data/favoriteresto-idb';

const createLikeButtonPresenterWithResto = async (resto) => {
  await FavoriteButtonPresenter.init({
    favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
    favoriteRestos: FavoriteRestoIdb,
    resto,
  });
};

export { createLikeButtonPresenterWithResto };