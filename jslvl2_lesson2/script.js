class List {
    items = []

    constructor() {
        let goods = this.fetchGood()
        goods = goods.map(cur => {
            return new GoodItem(cur)
        })
        this.items.push(...goods)
        this.render()
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
            block.innerHTML = `<img class ="goods-image" src="img/${this.name}.png" alt="${this.name}"><p class ="name">${this.name}</h3><p class="price">${this.price}$<button class="buy-button" type="button">Купить</button></p>`
            placeToRender.appendChild(block)
        }
    }
}

class Cart extends GoodItem {

}

const ListInstance = new List()