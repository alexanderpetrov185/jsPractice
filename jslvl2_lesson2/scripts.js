let AllCartItems = []
let Amount = [1, 1, 1, 1]
let ItemPrice = []

class Main {
    items = []

    fetchGoods() {
        const result = fetch('http://localhost:3000/database.json')
        return result
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.items = data.data.map((cur, index) => {
                    cur.index = index
                    return new GoodItem(cur)
                })
            })
            .catch(e => {
                console.log(e)
            })
    }
}

class List extends Main {
    constructor() {
        super()
        let goodsPromise = this.fetchGoods()
        goodsPromise.then(() => {
            this.render()
        })
    }

    render() {
        this.items.forEach(good => {
            good.render()
        })
    }
}


class Cart extends Main {
    constructor(eventObj) {
        super()
        let SelectedItem = ListInstance.items[+eventObj.target.id]
        if (AllCartItems.includes(SelectedItem)) {
            this.plusItem(eventObj)
        }
        else {
            ItemPrice[SelectedItem.index] = SelectedItem.price
            AllCartItems.push(SelectedItem)
        }
        this.render()
    }

    render() {
        let CartHtml = ""
        const placeToRender = document.querySelector('.cartItems')
        placeToRender.innerHTML = ""
        let placetoSum = document.createElement('p')
        let sumPrice = 0
        AllCartItems.forEach(good => {
            if (AllCartItems.length != 0) {
                if (placeToRender) {
                    CartHtml += `<p class ="cartItem" id = "${good.index}">${good.name} ${ItemPrice[good.index]}$ <button class = "btnMinus" id = "${good.index}" type="button"> - </button> ${Amount[good.index]} <button class = "btnPlus" id = "${good.index}" type="button"> + </button> <button class = "btnsDel">Удалить</button></p>`
                }
                sumPrice += ItemPrice[good.index]
                placeToRender.innerHTML = CartHtml
                let btnsMinus = document.querySelectorAll('.btnMinus')
                let btnsPlus = document.querySelectorAll('.btnPlus')
                let btnsDel = document.querySelectorAll('.btnsDel')
                let i = 0;
                btnsDel.forEach(btn => {
                    btn.id = i++
                    btn.addEventListener('click', (eventObj) => {
                        this.deleteItem(eventObj)
                    });
                })
                btnsPlus.forEach(btn => {
                    btn.addEventListener('click', (eventObj) => {
                        this.plusItem(eventObj)
                    });
                })
                btnsMinus.forEach(btn => {
                    btn.addEventListener('click', (eventObj) => {
                        this.minusItem(eventObj)
                    });
                })
            }
            else {
                placeToRender.innerHTML = ""
            }
        })
        let btnClearCart = document.createElement('button')
        btnClearCart.innerText = "Очистить корзину"
        btnClearCart.addEventListener('click', (eventObj) => {
            this.clearCart(eventObj)
        });
        placeToRender.appendChild(btnClearCart)
        placetoSum.innerText = 'общая сумма: ' + sumPrice + '$'
        placeToRender.appendChild(placetoSum)
    }
    plusItem(eventObj) {
        Amount[eventObj.target.id]++
        ItemPrice[eventObj.target.id] = ListInstance.items[eventObj.target.id].price * (Amount[eventObj.target.id])
        this.render()
    }
    minusItem(eventObj) {
        if (Amount[eventObj.target.id] != 0) {
            Amount[eventObj.target.id]--
            ItemPrice[eventObj.target.id] = ListInstance.items[eventObj.target.id].price * (Amount[eventObj.target.id])
            this.render()
        }
    }
    deleteItem(eventObj) {
        AllCartItems.splice(eventObj.target.id, 1)
        this.render()
    }
    clearCart(eventObj) {
        AllCartItems = []
        this.clear()
    }

    clear() {
        const placeToRender = document.querySelector('.cartItems')
        placeToRender.innerHTML = ""
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
            block.innerHTML = `<img class ="goods-image" src="img/${this.name}.png" alt="${this.name}"><h3 class ="name">${this.name}</h3><p class="price">${this.price}$</p>`
            placeToRender.appendChild(block)
            const buyBtn = document.createElement('button');
            buyBtn.id = `${this.index}`
            buyBtn.type = "button"
            buyBtn.innerText = "Купить"
            buyBtn.addEventListener('click', this.CreateNewCart);
            block.appendChild(buyBtn)
        }
    }

    CreateNewCart(eventObj) {
        new Cart(eventObj)
    }
}

const ListInstance = new List()



