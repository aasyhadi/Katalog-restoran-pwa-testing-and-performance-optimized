const assert = require('assert');

Feature('Unliking Restos');

Before((I) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restos', (I) => {
    I.seeElement('#query');
    I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});

Scenario('unliking one restaurant', async (I) => {
    I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

    I.amOnPage('/');
    I.seeElement('.resto__title a');
    I.click(locate('.resto__title a').first());
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.resto-item');

    const firstCondition = locate('.resto__title a').first();
    const firstRestoName = await I.grabTextFrom(firstCondition);
    I.click(firstCondition);

    const unfavRestoName = await I.grabTextFrom('.resto__title');
    assert.strictEqual(unfavRestoName, firstRestoName);
});