import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Resto', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
      };
    
    beforeEach(() => {
        addLikeButtonContainer(); 
});

it('should show the like button when the resto has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="favorite this resto"]'))
      .toBeTruthy();
});

it('should not show the unlike button when the resto has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="unfavorite this resto"]')).toBeFalsy();
  });

  it('should be able to like the resto', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    const resto = await FavoriteRestoIdb.getResto(1);

    expect(resto).toEqual({ id: 1 });

    FavoriteRestoIdb.deleteResto(1);
  });

  it('should not add a resto again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    // Tambahkan resto dengan ID 1 ke daftar resto yang disukai
    await FavoriteRestoIdb.putResto({ id: 1 });
    // Simulasikan pengguna menekan tombol suka resto
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    // tidak ada resto yang ganda
    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([{ id: 1 }]);

    FavoriteRestoIdb.deleteResto(1);
  });

  it('should not add a resto when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({});

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
  });
});