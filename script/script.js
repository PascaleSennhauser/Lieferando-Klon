/**
 * This function shows all the menu items.
 */
function showAll() {
    let menuListSection = document.getElementById('menu-list-section');
    menuListSection.innerHTML = '';
    forLoopMenu(menuListSection);
    renderBasketBtnResponsiv();
}


/**
 * This function goes through the category-array.
 * @param {HTMLElement} menuListSection - The HTML-container, in which the menu-images and menu-items are inserted.
 */
function forLoopMenu(menuListSection) {
    for (let c = 0; c < category.length; c++) {
        menuListSection.innerHTML += menuImg(c);
        forLoopPerCategory(menuListSection, c);
    }   
}


/**
 * This function shows the image and title from the category.
 * @param {Number} c - The current index for the category and the belonging image.
 * @returns The HTML-element with the image and title of a category.
 */
function menuImg(c) {
    return /*html*/`
    <div class="section-menu">
    <img class="menu-img" src=${img[c]}>
    <h1 class="title-menu-list">${category[c]}</h1>
    </div>
    `;
}


/**
 * This function selects all the items from a category by going through the array menu.
 * @param {HTMLElement} menuListSection - The HTML-container, in which the menu-images and menu-items are inserted.
 * @param {Number} category - The index of the category.
 */
function forLoopPerCategory(menuListSection, category) {
    for (let i = 0; i < menu.length; i++) {
        let menuItem = menu[i];
        if (menuItem['category'] == category) {
            let price = menuItem['price'].toFixed(2);
            menuListSection.innerHTML += menuItems(menuItem, i, price);
        }
    }
}


/**
 * This function renders the html-element of a menu-item.
 * @param {Object} menuItem - The current object of the JSON-Array "menu"
 * @param {Number} i - The current index.
 * @param {Number} price - The price of the current item.
 * @returns - The html-element of the menu-item.
 */
function menuItems(menuItem, i, price) {
    return /*html*/`
        <div class="menu-item">
            <h1 class="title-menu-item" id="menu-name${i}">${menuItem['name']}</h1>
            <span class="description-menu-item">${menuItem['description']}</span>
            <div class="div-price-menu-item">
                <p class="price-menu-item" id="menu-price${i}">${price}</p>
                <span> CHF</span>
            </div>
            <div class="btn-plus-menu-item" onclick="addToBasket(${i})">
                <img class="plus-menu-item" src="./img/icons/plus-solid.svg">
            </div>
        </div>
    `;
}


/**
 * This function renders the items from the chosen category.
 * @param {Number} index - The number of the chosen category.
 */
function showMenuItems(index) {
    let menuListSection = document.getElementById('menu-list-section');
    menuListSection.innerHTML = menuImg(index);
    forLoopPerCategory(menuListSection, index);
}


/**
 * This function highlights the delivery or the get-button and calculates it to the total.
 * @param {String} add - The button, which gets the white background.
 * @param {String} remove - The button, from whom, the white background gets removed.
 */
function btnDeliveryGet(add, remove) {
    document.getElementById(add).classList.add('bg-white');
    document.getElementById(remove).classList.remove('bg-white');
    calculateDeliveryExpenses();
    renderBasket();
}


/**
 * This function adds a menu-item to the basket.
 * @param {Number} i - The index of the menu-item.
 */
function addToBasket(i) {
    let menu = document.getElementById(`menu-name${i}`).innerHTML;
    let price = +document.getElementById(`menu-price${i}`).innerHTML;
    let index = getMenuIndex(menu);
    if (index === -1) {
        menuBasket.push(menu);
        pricesBasket.push(price);
        amountsBasket.push(1);
    } else {
        amountPlus(index);
    }
    renderBasket();
    renderBasketBtnResponsiv();
}


/**
 * This function gets the index of the added item in the menuBasket-array.
 * @param {*} menu 
 * @returns The index of the item in the basket.
 */
function getMenuIndex(menu) {
    let index = menuBasket.indexOf(menu);
    return index;
}


/**
 * This function renders the basket-button in the responsive design.
 */
function renderBasketBtnResponsiv() {
    let totalBasketResponsiv = document.getElementById('price-shopping-basket');
    let roundedTotal = total.toFixed(2);
    totalBasketResponsiv.innerHTML = roundedTotal;
}


/**
 * This function adds the price of the item to all the numbers.
 * @param {Number} j - The index of the item in the menuBasket-array.
 */
function amountPlus(j) {
    amountsBasket[j]++;
    calculatePrice(j);
    renderBasket();
    renderBasketBtnResponsiv();
}


/**
 * This function renders the basket-part.
 */
function renderBasket() {
    let basket = document.getElementById('items-in-basket');
    basket.innerHTML = '';
    if (menuBasket.length !== 0) {
    showBasket('items-in-basket', 'no-items');
    for (let j = 0; j < menuBasket.length; j++) {
        basket.innerHTML += itemField(j);
    }
    basket.innerHTML += paySection();
    calculateDifferentPrices();
    } else {
        showBasket('no-items', 'items-in-basket');
    }
}


/**
 * This function shows the basket in the basket-part, when there are no items.
 * @param {String} remove - The html-element, which gets removed.
 * @param {String} add - The html-element, which gets added.
 */
function showBasket(remove, add) {
    document.getElementById(remove).classList.remove('d-none');
    document.getElementById(add).classList.add('d-none');
}


/**
 * This function renders a specific item, which gets showed in the basket.
 * @param {Number} j - The index of the item.
 * @returns The html-element of the item in the basket.
 */
function itemField(j) {
    let priceBasket = +(pricesBasket[j]);
    let roundedPrice = roundPrice(priceBasket);
    return templateItemField(roundedPrice, j);
}


/**
 * This function rounds the price on two decimal places.
 * @param {Number} priceOld - The price not rounded.
 * @returns The rounded price.
 */
function roundPrice(priceOld) {
    let price = priceOld.toFixed(2);
    return price;
}


/**
 * This function shows the html-element of an item in the basket.
 * @param {Number} roundedPrice - The price of the item.
 * @param {Number} j - The index of the item.
 * @returns The html-element of the item.
 */
function templateItemField(roundedPrice, j) {
    return /*html*/`
        <div class="menu-basket">
            <div class="menu-description">
                <span><b>${amountsBasket[j]}</b></span>
                <span><b id="menu-basket${j}">${menuBasket[j]}</b></span>
                <span>${roundedPrice} CHF</span> 
            </div>
            <div class="more-or-less-section">
                <div class="btn-minus-basket" onclick="amountMinus(${j})">
                    <img src="./img/icons/minus-solid.svg" class="minus-basket">
                </div>
                <p>${amountsBasket[j]}</p>
                <div class="btn-plus-basket" onclick="amountPlus(${j})">
                    <img src="./img/icons/plus-solid.svg" class="plus-basket">
                </div>
            </div>
        </div>
        `;
}


/**
 * This function shows the prices to pay.
 * @returns The html-template of the prices to pay.
 */
function paySection() {
    const roundedTotalBtn = roundPrice(total);
    return /*html*/`
        <div class="calculate-section" id="calculate-section">
        </div>
        <div class="pay-section">
            <div class="pay-btn">
                <span class="pay-text" id="pay-text" onclick="payTransaction()">Bezahlen (${roundedTotalBtn} CHF)</span>
            </div>
        </div> `;
}


/**
 * This function removes the amount of an item in the basket.
 * @param {Number} j - The index of the item.
 */
function amountMinus(j) {
    amountsBasket[j]--;
    if (amountsBasket[j] === 0) {
        menuBasket.splice(j, 1);
        pricesBasket.splice(j, 1);
        amountsBasket.splice(j, 1);
    } else {
        calculatePrice(j);
    }
    renderBasket();
}


/**
 * This function calculates the new price of an item in the basket.
 * @param {Number} j - The index of the item in the basket.
 */
function calculatePrice(j) {
    let menuItem = document.getElementById(`menu-basket${j}`).innerHTML;
    let index = getIndex(menuItem);
    if (index !== -1) {
        let price = +menu[index]['price'];
        let amount = +amountsBasket[j];
        let result = +(price * amount);
        pricesBasket[j] = [result];
    } else {
        alert('Menüpunkt nicht gefunden.');
    }
}


/**
 * This function gets the index of the menu-item in the basket.
 * @param {String} menuItem - The name of the menu-item.
 * @returns The index gets returned.
 */
function getIndex(menuItem) {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i]['name'] === menuItem) {
            return i;
        }
    }
    alert('Index nicht gefunden.');
}


/**
 * This function calculates the prices in the basket.
 */
function calculateDifferentPrices() {
    calculateSubtotal();
    calculateDeliveryExpenses();
    calculateCashDeficit();
    calculateTotal();
    let roundedTotal = total.toFixed(2);
    document.getElementById('calculate-section').innerHTML = showCalculateSection();
    document.getElementById('pay-text').innerHTML = `Bezahlen (${roundedTotal} CHF)`;
}


/**
 * This function calculates the subtotal in the basket.
 */
function calculateSubtotal() {
    subtotal = 0;
    for (let j = 0; j < pricesBasket.length; j++) {
        subtotal += +(pricesBasket[j]);
    }
}


/**
 * This function calculates the delivery expenses in the basket.
 */
function calculateDeliveryExpenses() {
    if (document.getElementById('btn-delivery').classList.contains('bg-white')) {
        deliveryExpenses = 6.9;
    } else {
        deliveryExpenses = 0;
    }
}


/**
 * This function calculates the cash deficit in the basket.
 */
function calculateCashDeficit() {
    if ((subtotal + deliveryExpenses) >= 20) {
        cashDeficit = 0;
    } else {
        cashDeficit = 20 - (subtotal + deliveryExpenses);
    }
}


/**
 * This function calculates the total in the basket.
 */
function calculateTotal() {
    if ((subtotal + deliveryExpenses) > 20) {
        total = subtotal + deliveryExpenses;
    } else {
        total = 20;
    }
}


/**
 * This function gets all the rounded prices in the basket and renders the html-template.
 * @returns - The html-template of the prices in the basket are returned.
 */
function showCalculateSection() {
    const roundedSubtotal = roundPrice(subtotal);
    const roundedDeliveryExpenses = roundPrice(deliveryExpenses);
    const roundedCashDeficit = roundPrice(cashDeficit);
    const roundedTotal = roundPrice(total);
    return templateCalculateSection(roundedSubtotal, roundedDeliveryExpenses, roundedCashDeficit, roundedTotal);
}



/**
 * This function returnes the html-template from the different prices in the basket.
 * @param {Number} roundedSubtotal - The rounded subtotal.
 * @param {Number} roundedDeliveryExpenses - The rounded delivery expenses.
 * @param {Number} roundedCashDeficit - The rounded cash deficit.
 * @param {Number} roundedTotal - The rounded total.
 * @returns The html-template with the different prices.
 */
function templateCalculateSection(roundedSubtotal, roundedDeliveryExpenses, roundedCashDeficit, roundedTotal) {
    return /*html*/`
        <table>
        <tr>
            <td>Zwischensumme</td>
            <td>${roundedSubtotal}<span> CHF</span></td>
        </tr>
        <tr>
            <td>Lieferkosten</td>
            <td>${roundedDeliveryExpenses}<span> CHF</span></td>
        </tr>
        <tr>
            <td>Fehlbetrag bis Minimum</td>
            <td>${roundedCashDeficit}<span> CHF</span></td>
        </tr>
        <tr>
            <td>Gesamt</td>
            <td>${roundedTotal}<span> CHF</span></td>
        </tr>
        </table>
    `;
}


/**
 * This function clears the arrays from the basket, when the pay-button is clicked.
 */
function payTransaction() {
    menuBasket = [];
    pricesBasket = [];
    amountsBasket = [];
    total = 20;
    alert('Vielen Dank für ihre Bestellung.');
    renderBasket();
    renderBasketBtnResponsiv();
}


/**
 * This function opens the info-pop-up.
 */
function openInfo() {
    document.getElementById('pop-up-info').classList.remove('d-none');
}


/**
 * This function closes the info-pop-up.
 */
function closeInfo() {
    document.getElementById('pop-up-info').classList.add('d-none');
}


/**
 * This function opens the shopping basket in the responsive design.
 */
function openShoppingBasket() {
    document.getElementById('order-section').classList.remove('order-section-d-none');
    document.getElementById('pop-up-shopping-basket').classList.add('d-none');
}


/**
 * This function closes the basket in the responsive design.
 */
function closeShoppingBasket() {
    document.getElementById('order-section').classList.add('order-section-d-none');
    document.getElementById('pop-up-shopping-basket').classList.remove('d-none');
}
