class List {
    name = ''
    price = 0
    items = []

    constructor() {
        let goods = this.fetchGood()
        goods = goods.map(cur => {
            return new GoodItem(cur)
        })
        this.items.push(...goods)
        this.render();
    }

    fetchGood() {
        return [
            { name: 'Shirt', price: 150 },
            { name: 'Socks', price: 15 },
            { name: 'Jacket', price: 50 },
            { name: 'Shoes', price: 1500 }
        ]
    }

    render() {
        this.items.forEach(good => {
            good.render()
        })
        const buyBtn = document.getElementsByClassName("buy-button");
        Array.prototype.forEach.call(buyBtn, function (el) {
            el.addEventListener('click', function () {
                new CartItem();
            });
        })
    }
}

class GoodItem {
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

class CartItem extends List {
    render() {
        const placeToRender = document.querySelector('.cart')
        if (placeToRender) {
            const block = document.createElement('div')
            block.className = "cart-item";
            block.innerHTML = `<p class ="name"></p><p class="price"><button class="buy-button" type="button">Удалить</button></p>`
            placeToRender.appendChild(block)
        }
    }
}

const ListInstance = new List()

// console.log(TargetList.items[0].name)
