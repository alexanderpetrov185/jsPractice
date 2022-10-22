class List {
    items = []

    constructor() {
        let goods = fetchGood()
        goods = goods.map(cur => {
            return new GoodItem(cur)
        })
        this.items.push(...goods)
        this.render()
    }

    render() {
        this.items.forEach(good => {
            good.render()
        })
    }

}

class GoodItem {
    name = ''
    price = 0

    constructor({ name, price }) {
        this.name = name
        this.price = price
    }

    render() {
        const placeToRender = document.querySelector('.goods-list')
        if (placeToRender) {
            const block = document.createElement('div')
            block.className = "goods-item";
            block.innerHTML = `<img class ="goods-image" src="img/${this.name}.png" alt="${this.name}"><h3 class ="name">${this.name}</h3><p class="price">${this.price}$<button class="buy-button" type="button">Купить</button></p>`
            placeToRender.appendChild(block)
        }
    }
}

class Cart extends List {
    render() {
        const placeToRender = document.querySelector('.cart')
        if (placeToRender) {
            const block = document.createElement('div')
            block.className = "cart-item";
            block.innerHTML = `<p class ="name">${this.name}</p><p class="price">${this.price}$<button class="buy-button" type="button">Удалить</button></p>`
            placeToRender.appendChild(block)
        }
    }
}

const ListInstance = new List()

function fetchGood() {
    return [
        { name: 'Shirt', price: 150 },
        { name: 'Socks', price: 15 },
        { name: 'Jacket', price: 50 },
        { name: 'Shoes', price: 1500 }
    ]
}

function init() {
    const buyBtn = document.getElementsByClassName("buy-button");
    Array.prototype.forEach.call(buyBtn, function (el) {
        el.addEventListener('click', function () {
            new Cart();
        });
    })
}

window.onload = init;
