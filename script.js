function showAll() {
    let menuListSection = document.getElementById('menu-list-section');
    menuListSection.innerHTML = '';
    forLoopMenu(menuListSection);
    renderBasketBtnResponsiv();
}


function forLoopMenu(menuListSection) {
    for (let c = 0; c < category.length; c++) {
        menuListSection.innerHTML += menuImg(c);
        forLoopPerCategory(menuListSection, c);
    }   
}


function menuImg(c) {
    return /*html*/`
    <div class="section-menu">
    <img class="menu-img" src=${img[c]}>
    <h1 class="title-menu-list">${category[c]}</h1>
    </div>
    `;
}


function forLoopPerCategory(menuListSection, category) {
    for (let i = 0; i < menu.length; i++) {
        let menuItem = menu[i];
        if (menuItem['category'] == category) {
            let price = menuItem['price'].toFixed(2);
            menuListSection.innerHTML += menuItems(menuItem, i, price);
        }
    }
}


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


function renderBasketBtnResponsiv() {
    let totalBasketResponsiv = document.getElementById('price-shopping-basket');
    let roundedTotal = total.toFixed(2);
    totalBasketResponsiv.innerHTML = roundedTotal;
}


function showMenuItems(index) {
    let menuListSection = document.getElementById('menu-list-section');
    menuListSection.innerHTML = menuImg(index);
    forLoopPerCategory(menuListSection, index);
}


function btnDeliveryGet(add, remove) {
    document.getElementById(add).classList.add('bg-white');
    document.getElementById(remove).classList.remove('bg-white');
    calculateDeliveryExpenses();
    renderBasket();
}


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


function getMenuIndex(menu) {
    let index = menuBasket.indexOf(menu);
    return index;
}


function amountPlus(j) {
    amountsBasket[j]++;
    calculatePrice(j);
    renderBasket();
    renderBasketBtnResponsiv();
}


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


function showBasket(remove, add) {
    document.getElementById(remove).classList.remove('d-none');
    document.getElementById(add).classList.add('d-none');
}


function itemField(j) {
    let priceBasket = +(pricesBasket[j]);
    let roundedPrice = roundPrice(priceBasket);
    return templateItemField(roundedPrice, j);
}


function roundPrice(priceOld) {
    let price = priceOld.toFixed(2);
    return price;
}


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


function getIndex(menuItem) {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i]['name'] === menuItem) {
            return i;
        }
    }
    alert('Index nicht gefunden.');
}


function calculateDifferentPrices() {
    calculateSubtotal();
    calculateDeliveryExpenses();
    calculateCashDeficit();
    calculateTotal();
    let roundedTotal = total.toFixed(2);
    document.getElementById('calculate-section').innerHTML = showCalculateSection();
    document.getElementById('pay-text').innerHTML = `Bezahlen (${roundedTotal} CHF)`;
}

function calculateSubtotal() {
    subtotal = 0;
    for (let j = 0; j < pricesBasket.length; j++) {
        subtotal += +(pricesBasket[j]);
    }
}


function calculateDeliveryExpenses() {
    if (document.getElementById('btn-delivery').classList.contains('bg-white')) {
        deliveryExpenses = 6.9;
    } else {

        deliveryExpenses = 0;
    }
}


function calculateCashDeficit() {
    if ((subtotal + deliveryExpenses) >= 20) {
        cashDeficit = 0;
    } else {
        cashDeficit = 20 - (subtotal + deliveryExpenses);
    }
}


function calculateTotal() {
    if ((subtotal + deliveryExpenses) > 20) {
        total = subtotal + deliveryExpenses;
    } else {
        total = 20;
    }
}


function showCalculateSection() {
    const roundedSubtotal = roundPrice(subtotal);
    const roundedDeliveryExpenses = roundPrice(deliveryExpenses);
    const roundedCashDeficit = roundPrice(cashDeficit);
    const roundedTotal = roundPrice(total);

    return templateCalculateSection(roundedSubtotal, roundedDeliveryExpenses, roundedCashDeficit, roundedTotal);

}


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


function payTransaction() {
    menuBasket = [];
    pricesBasket = [];
    amountsBasket = [];
    total = 20;
    alert('Vielen Dank für ihre Bestellung.');
    renderBasket();
    renderBasketBtnResponsiv();
}


function openInfo() {
    document.getElementById('pop-up-info').classList.remove('d-none');
}


function closeInfo() {
    document.getElementById('pop-up-info').classList.add('d-none');
}


function openShoppingBasket() {
    document.getElementById('order-section').classList.remove('order-section-d-none');
    document.getElementById('pop-up-shopping-basket').classList.add('d-none');
}


function closeShoppingBasket() {
    document.getElementById('order-section').classList.add('order-section-d-none');
    document.getElementById('pop-up-shopping-basket').classList.remove('d-none');
}
