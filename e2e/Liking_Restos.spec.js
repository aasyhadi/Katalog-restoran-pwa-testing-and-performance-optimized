const assert = require('assert');

Feature('Liking Restos');

Before((I) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restos', (I) => {
  I.seeElement('#query');
  // I.seeElement('.query'); // membuat test menjadi gagal
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});

Scenario('liking one resto', async (I) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.resto__title a');

  const firstResto = locate('.resto__title a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-item');
  const likedRestoName = await I.grabTextFrom('.resto__title');

  assert.strictEqual(firstRestoName, likedRestoName);
});

Scenario('searching restos', async (I) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.resto__title a');

  const names = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.resto__title a').at(i));
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');
    names.push(await I.grabTextFrom('.resto__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = names[1].substring(1, 3);
  const matchingRestos = names.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestos = await I.grabNumberOfVisibleElements('.resto-item');
  assert.strictEqual(matchingRestos.length, visibleLikedRestos);

  matchingRestos.forEach(async (name, index) => {
    const visibleName = await I.grabTextFrom(locate('.resto__title').at(index + 1));
    assert.strictEqual(name, visibleName);
  });
});