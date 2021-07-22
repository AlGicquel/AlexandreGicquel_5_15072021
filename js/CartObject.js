export class CartObject {
    constructor (type, id, name, description, price, imageUrl, option, quantity) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.descritpion = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.option = option;
        this.quantity = quantity;
    }

    constructor (type, element, option, quantity) {
        this.type = type;
        this.id = element._id;
        this.name = element.name;
        this.descritpion = element.description;
        this.price = element.price;
        this.imageUrl = element.imageUrl;
        this.option = option;
        this.quantity = quantity;
    }

    getType() {
        return this.type;
    }

    getId() {
        return this.id;
    }

    getImgUrl() {
        return this.imageUrl;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(qt) {
        this.quantity += qt;
    }


}