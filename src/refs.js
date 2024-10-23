class Ref {
    #id;
    #refCode;
    #refName;

    constructor(code, name, id) {
        this.#refCode = code;
        this.#refName = name;
        if (id == undefined) {
            this.#id = Ref.#generateID();
        } else {
            this.#id = id;
        }
    }

    get name() {
        return this.#refName;
    }

    set name(name) {
        this.#refName = name;
    }

    get code() {
        return this.#refCode;
    }

    set code(code) {
        this.#refCode = code;
    }

    get id() {
        return this.#id;
    }

    static #generateID() {
        const length = 9;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let id = "";
        for (let i = 0; i < length; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        return id;
    }

    toJSON() {
        return {
            id: this.#id,
            code: this.#refCode,
            name: this.#refName
        };
    }
}

class Good extends Ref {
    constructor(code, name, id) {
        super(code, name, id);
    }

    save() {
        const thisStr = JSON.stringify(this);
        localStorage.setItem("good_" + this.id, thisStr);
    }
}

class Customer extends Ref {
    constructor(code, name, id) {
        super(code, name, id);
    }

    save() {
        const thisStr = JSON.stringify(this);
        localStorage.setItem("customer_" + this.id, thisStr);
    }
}

class Warehouse extends Ref {
    constructor(code, name, id) {
        super(code, name, id);
    }

    save() {
        const thisStr = JSON.stringify(this);
        localStorage.setItem("warehouse_" + this.id, thisStr);
    }
}
