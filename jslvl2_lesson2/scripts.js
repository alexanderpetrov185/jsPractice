class List {
    name = ''
    price = 0
    items = []

    constructor() {
        let goods = this.fetchGood()
        goods = goods.map((cur, index) => {
            cur.index = index
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
            el.addEventListener('click', function (eventObj) {
                new CartItem(eventObj);
            });
        })
    }
}

class GoodItem {
    constructor({ name, price, index }) {
        this.name = name
        this.price = price
        this.index = index
    }
    render() {
        const placeToRender = document.querySelector('.goods-list')
        if (placeToRender) {
            const block = document.createElement('div')
            block.className = "goods-item";
            block.innerHTML = `<img class ="goods-image" src="img/${this.name}.png" alt="${this.name}"><h3 class ="name">${this.name}</h3><p class="price">${this.price}$</p><button class="buy-button" id="${this.index}" type="button">Купить</button>`
            placeToRender.appendChild(block)
        }
    }
}

class CartItem {
    constructor(eventObj) {
        // console.log(typeof +(eventObj.target.id))
        console.log(List.items)
        // this.name = List.items.name[+(eventObj.target.id)]
        // this.price = List.items.price[+(eventObj.target.id)]
        // console.log(this.name, this.price)
        // this.render();
    }
    render() {
        const placeToRender = document.querySelector('.cart')
        if (placeToRender) {
            const block = document.createElement('div')
            block.className = "cart-item";
            block.innerHTML = `<p class ="cartItem">${this.name} ${this.price} <button class="buy-button" type="button">Удалить</button></p>`
            placeToRender.appendChild(block)
        }
    }
}

const ListInstance = new List()

// console.log(TargetList.items[0].name)
