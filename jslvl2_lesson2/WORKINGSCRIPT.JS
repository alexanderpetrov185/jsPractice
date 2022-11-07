class Main {
    items = []
    name = ''
    price = 0

    constructor() {
        let goodsPromise = this.fetchGoods()
        goodsPromise.then(() => {
            this.render()
        })
    }

    fetchGoods() {
        const result = fetch('http://localhost:3000/database.json')
        return result
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                this.items = data.data.map(cur => {
                    return new GoodItem(cur)
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        console.log(this.items)
        this.items.forEach(good => {
            good.render()
        })
    }
}

// class List extends Main {
//     constructor() {
//         super()
//         this.items.forEach(good => {
//             good.render()
//         })
//     }
// }

class Cart extends Main {
    BuyItems = []
}

class GoodItem {
    constructor({ name, price, index }) {
        this.name = name
        this.price = price
        this.index = index
    }

    pushToCart(eventObj) {
        let selectedItem = ListInstance.items[+(eventObj.target.id)]
    }

    render() {
        const placeToRender = document.querySelector('.goods-list')
        if (placeToRender) {
            const block = document.createElement('div')
            block.className = "goods-item";
            block.innerHTML = `<img class ="goods-image" src="img/${this.name}.png" alt="${this.name}"><h3 class ="name">${this.name}</h3><p class="price">${this.price}$</p>`
            placeToRender.appendChild(block)
            const buyBtn = document.createElement('button');
            buyBtn.id = `${this.index}`
            buyBtn.type = "button"
            buyBtn.innerText = "Купить"
            buyBtn.addEventListener('click', this.pushToCart);
            block.appendChild(buyBtn)
        }
    }
}


const MainSample = new Main()

// const ListInstance = new List()

// const CartInstance = new Cart()


