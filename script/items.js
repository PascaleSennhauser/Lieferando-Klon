/* Arrays of the food-images, categories and the menus */
let img = ['./img/food-img/pizza.jpg', './img/food-img/salad.jpg', './img/food-img/dessert.jpg', './img/food-img/drinks.jpg'];
let category = ['Pizza', 'Salate', 'Dessert', 'Getränke'];
let menu = [

    {   
        'category': 0,
        'name': 'Pizza Salami',
        'description': 'Tomatensauce, Mozzarella, Salami',
        'price': 18.9,
        'amount': 0
    },

    {
        'category': 0,
        'name': 'Pizza Margherita',
        'description': 'Tomatensauce und Mozzarella',
        'price': 14.9,
        'amount': 0
    },

    {
        'category': 0,
        'name': 'Pizza Vegetariana',
        'description': 'Tomatensauce, Mozzarella, Spinat, rote Zwiebeln, Peperoni, Knoblauch, Cherrytomaten',
        'price': 22.9,
        'amount': 0
    },

    {
        'category': 0,
        'name': 'Pizza Tonno',
        'description': 'Tomatensauce, Mozzarella, Thunfisch, Zwiebeln',
        'price': 18.9,
        'amount': 0
    },

    {
        'category': 0,
        'name': 'Pizza 4 Formaggi',
        'description': 'Tomatensauce, Mozzarella, Feta, Gogonzola, Reibkäse und Herbes de Provence',
        'price': 18.9,
        'amount': 0
    },

    {
        'category': 1,
        'name': 'Insalata Verde',
        'description': 'Grüner Salat mit hausgemachter Salatsauce',
        'price': 8.0,
        'amount': 0
    },

    {
        'category': 1,
        'name': 'Insalata Mista',
        'description': 'Gemischter Salat mit Tomaten, Maiskörner, Karotten und hausgemachter Salatsauce',
        'price': 10.0,
        'amount': 0
    },

    {
        'category': 1,
        'name': 'Nüsslisalat mit Ei',
        'description': 'Nüsslisalat mit Ei und hausgemachter Salatsauce',
        'price': 11.50,
        'amount': 0
    },

    {
        'category': 2,
        'name': 'Tiramisu',
        'description': 'Löffelbiskuit mit Mascarpone-Creme',
        'price': 8.5,
        'amount': 0
    },

    {
        'category': 2,
        'name': 'Schokoladenmousse',
        'description': 'Luftiges Schokoladenmousse',
        'price': 8.5,
        'amount': 0
    },

    {
        'category': 2,
        'name': 'Panna-Cotta',
        'description': 'Feiner Rahmpudding mit Himbeersauce',
        'price': 8.5,
        'amount': 0
    },

    {
        'category': 3,
        'name': 'Stilles Wasser',
        'description': '',
        'price': 3.5,
        'amount': 0
    },

    {
        'category': 3,
        'name': 'Wasser mit Kohlensäure',
        'description': '',
        'price': 3.5,
        'amount': 0
    },

    {
        'category': 3,
        'name': 'Coca-Cola',
        'description': '',
        'price': 3.5,
        'amount': 0
    },

    {
        'category': 3,
        'name': 'Fanta',
        'description': '',
        'price': 3.5,
        'amount': 0
    }

]

/* basket */

let menuBasket = [];
let pricesBasket = [];
let amountsBasket = [];


/* Calcualte-Section */

let subtotal = 0;
let deliveryExpenses = 0;
let cashDeficit = 20;
let total = 20;