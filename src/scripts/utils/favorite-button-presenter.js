import {
  createFavoriteRestoButtonTemplate,
  createUnfavoriteRestoButtonTemplate,
} from '../views/templates/template-creator';

const FavoriteButtonPresenter = {
  async init({ favoriteButtonContainer, favoriteRestos, resto }) {
    this._favoriteButtonContainer = favoriteButtonContainer;
    this._resto = resto;
    this._favoriteRestos = favoriteRestos;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isRestoExist(id)) {
      this._renderFavorited();
    } else {
      this._renderFavorite();
    }
  },

  async _isRestoExist(id) {
    const resto = await this._favoriteRestos.getResto(id);
    return !!resto;
  },

  _renderFavorite() {
    this._favoriteButtonContainer.innerHTML = createFavoriteRestoButtonTemplate();

    const favoriteButton = document.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestos.putResto(this._resto);
      this._renderButton();
    });
  },

  _renderFavorited() {
    this._favoriteButtonContainer.innerHTML = createUnfavoriteRestoButtonTemplate();

    const favoriteButton = document.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestos.deleteResto(this._resto.id);
      this._renderButton();
    });
  },
};

export default FavoriteButtonPresenter;
