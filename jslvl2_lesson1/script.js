var picNumber;
var sumPrice = [];

function init() {
    var images = document.getElementsByTagName("img");
    var btnL = document.getElementById("btnL");
    var btnR = document.getElementById("btnR");
    var btnPlus = document.getElementsByClassName("buttonPlus");
    for (var i = 0; i < images.length; i++) {
        images[i].addEventListener("click", currentPic);
        btnL.addEventListener("click", slideLeft);
        btnR.addEventListener("click", slideRight);
        btnPlus[i].addEventListener("click", addItem);
    }
}

function currentPic(eventObj) {
    var eventElement = eventObj.target;
    var imageNameParts = eventElement.id.split("_");
    picNumber = imageNameParts[1];
    changeBigPicture(picNumber);
    var show = document.getElementById("slider");
    show.style.display = "flex";
    return picNumber;
}

function changeBigPicture(eventObj) {
    var appDiv = document.getElementById("big_picture");
    appDiv.innerHTML = "";
    var src = "img/gallery/big/" + eventObj + ".jpg";
    var imageDomElement = document.createElement("img");
    imageDomElement.id = "bigPic";
    imageDomElement.style.maxHeight = "500px";
    imageDomElement.src = src;
    imageDomElement.addEventListener("error", imageError);
    appDiv.appendChild(imageDomElement);
}

function imageError() {
    alert("file not found");
}

function slideLeft() {
    if (picNumber == 0) {
        picNumber = 3;
    }
    changeBigPicture(--picNumber);
}

function slideRight() {
    if (picNumber == 3) {
        picNumber = 0;
    }
    changeBigPicture(++picNumber);
}

function addItem(eventObj) {
    var eventElement = eventObj.target;
    var p = eventElement.closest("div").querySelector("p");
    var bucket = document.getElementById("bucket");
    var subject = p.innerHTML.split(" ");
    var price = subject[1].split("р");
    if (!bucket.innerHTML.includes(subject[0])) {
        var itemDiv = document.createElement("div");
        itemDiv.id = "itemCard";
        bucket.appendChild(itemDiv);
        var btnMinus = document.createElement("button");
        btnMinus.innerHTML = "минус";
        itemDiv.appendChild(btnMinus);
        var newItem = document.createElement("p");
        newItem.id = "item" + p.id;
        newItem.innerHTML = subject[0] + " " + price[0] + "р -x1";
        itemDiv.appendChild(newItem);
        btnMinus.addEventListener("click", minusItem);
        sumPrice = +sumPrice + +price[0];
    }
    else {
        sumPrice = +sumPrice + +price[0];
        var amount = document.getElementById("item" + p.id).innerHTML.split("x");
        amount[1] = +amount[1] + 1;
        price[0] = +price[0] * +amount[1];
        document.getElementById("item" + p.id).innerHTML = subject[0] + " " + price[0] + "р -x" + amount[1];
    }

    function minusItem(eventObj) {
        sumPrice = +sumPrice - +price[0];
        var amount = document.getElementById("item" + p.id).innerHTML.split("x");
        price[1] = price[0];
        price[1] = +price[0] * +amount[1] - price[1];
        amount[1] = +amount[1] - 1;
        document.getElementById("item" + p.id).innerHTML = subject[0] + " " + price[1] + "р -x" + amount[1];
        if (+amount[1] == 0) {
            document.getElementById("item" + p.id).parentElement.remove();
            eventObj.currentTarget.remove();
        }
        document.getElementById("sumPrice").innerHTML = "Общая стоимость: " + sumPrice + "р";
    }
    document.getElementById("sumPrice").innerHTML = "Общая стоимость: " + sumPrice + "р";
}

window.onload = init;
