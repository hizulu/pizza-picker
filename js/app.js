// variables
const pizzas = [{
        id: 1,
        name: 'Pizza 1',
        img_url: "images/pizza1.jpeg",
        price: 8,
        toppings: ['avocado', 'broccoli', 'onions', 'zucchini', 'tuna', 'ham']
    },
    {
        id: 2,
        name: 'Pizza 2',
        img_url: "images/pizza2.jpg",
        price: 10,
        toppings: ['broccoli', 'onions', 'zucchini', 'lobster', 'oyster', 'salmon', 'bacon', 'ham']
    },
    {
        id: 3,
        name: 'Pizza 3',
        img_url: "images/pizza3.jpg",
        price: 12,
        toppings: ['broccoli', 'onions', 'zucchini', 'tuna', 'bacon', 'duck', 'ham', 'sausage']
    }
]
const toppings = [{
        name: 'avocado',
        price: 1
    },
    {
        name: 'lobster',
        price: 2
    },
    {
        name: 'bacon',
        price: 3
    },
    {
        name: 'broccoli',
        price: 1
    },
    {
        name: 'oyster',
        price: 2
    },
    {
        name: 'duck',
        price: 3
    },
    {
        name: 'onions',
        price: 1
    },
    {
        name: 'salmon',
        price: 2
    },
    {
        name: 'ham',
        price: 3
    },
    {
        name: 'zucchini',
        price: 1
    },
    {
        name: 'tuna',
        price: 2
    },
    {
        name: 'sausage',
        price: 3
    },
]
var totalPrice = 0
var selected = {
    pizza: {},
    toppings: [],
    size: 0
}
//

// render view to screen
const renderPizzas = () => {
    let items = ''

    if (pizzas.length > 0) {
        pizzas.map(item => {
            items += `<div class="card">
                <img src="${item.img_url}" alt="pizza name" height="120px">
                <div class="card-body">
                    <h3 class="pizza-price">${ '$' + item.price }</h3>
                    <p class="pizza-name">${item.name}</p>
                    <input type="radio" name="pizza" id="" onchange="getSelectedPizza()" value="${item.id}"> I like this
                </div>
            </div>`
        })
    }

    document.getElementById("pizza-list").innerHTML = items
}

const renderToppings = (firstRender = true) => {

    let columnLength = 3
    let columnCounter = 0
    let toppingItems = ''

    toppings.map(item => {
        columnCounter += 1
        if (columnCounter == 1) {
            toppingItems += '<div class="d-flex">'
        }
        if (firstRender) {
            toppingItems += `<div class="topping-item mr-8"><input onclick="getSelectedTopping(this)" type="checkbox" disabled="" name="toppings" value="${item.name}" id=""> <span>${item.name.capitalize()} (+${'$' + item.price})</span></div>`
        } else {
            if (selected.pizza.toppings.includes(item.name)) {
                toppingItems += `<div class="topping-item mr-8"><input onclick="getSelectedTopping(this)" type="checkbox" name="toppings" value="${item.name}" id=""> <span>${item.name.capitalize()} (+${'$' + item.price})</span></div>`
            } else {
                toppingItems += `<div class="topping-item mr-8"><input onclick="getSelectedTopping(this)" type="checkbox" disabled="" name="toppings" value="${item.name}" id=""> <span class="unavailable">${item.name.capitalize()} (+${'$' + item.price})</span></div>`
            }
        }
        if (columnCounter == columnLength) {
            toppingItems += '</div>'
            columnCounter = 0;
        }
    })


    document.getElementById("toppings").innerHTML = toppingItems
}

const renderTotalPrice = (price) => {
    document.getElementById("total-price").innerHTML = '$' + price
}
//

// on change event
const getSelectedPizza = () => {
    let el = document.getElementsByName('pizza')
    for (var i = 0, len = el.length; i < len; ++i)
        if (el[i].checked) {
            let pizza = pizzas.find(item => {
                return item.id == el[i].value
            })
            totalPrice = pizza.price
            selected.pizza = pizza
            selected.toppings = []
            renderToppings(false)
            calculateTotalPrice()
        }
}

const getSelectedSize = () => {
    let el = document.getElementsByName('size')
    for (var i = 0, len = el.length; i < len; ++i)
        if (el[i].checked) {
            selected.size = parseInt(el[i].value)
            calculateTotalPrice()
        }
}

const getSelectedTopping = (el) => {
    if (el.checked) {
        let topping = toppings.find(item => {
            return item.name == el.value
        })

        selected.toppings.push(topping)
    } else {
        let index = selected.toppings.findIndex(item => {
            return item.name == el.value
        })
        selected.toppings.splice(index, 1)
    }
    calculateTotalPrice()
}
//

const calculateTotalPrice = () => {
    let total = 0
    if (Object.keys(selected.pizza).length > 0) {
        total += selected.pizza.price
    }

    if (total != 0) {
        total += selected.size
    }

    if (selected.toppings.length > 0) {
        selected.toppings.map(item => {
            total += item.price
        })
    }
    totalPrice = total
    renderTotalPrice(total)
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        renderPizzas()
        renderToppings()
        renderTotalPrice(0)
    }
}