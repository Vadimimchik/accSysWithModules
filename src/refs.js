class Ref {
    #id;
    #refCode;
    #refName;
    #isMark;

    constructor(code, name, id) {
        let lvCode = code;
        if (typeof code == "object") {
            lvCode = code.code;
            name = code.name;
            id = code.id;
        }

        this.#refCode = lvCode;
        this.#refName = name;
        if (id == undefined) {
            this.#id = Ref.#generateID();
        } else {
            this.#id = id;
        }
        this.#isMark = false;

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
            name: this.#refName,
            isMark: this.#isMark
        };
    }

    delete() {
        this.#isMark = true;
        this.save();
    }

    cancelDel() {
        this.#isMark = false;
        this.save();
    }

    get isMark() {
        return this.#isMark;
    }

    compareTo(other) {
        if (this.code == +this.code && other.code == +other.code) {
            return this.code - other.code;
        }
        return this.code > other.code ? 1 : -1
    }

    static new(refName, obj, name, id) {
        if (refName == "customer") {
            return new Customer(obj, name, id);
        }
        if (refName == "warehouse") {
            return new Warehouse(obj, name, id);
        }
        if (refName == "good") {
            return new Good(obj, name, id);
        }
    }

    static getByID(tableName, id) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(id)) {
                return Ref.new(tableName, JSON.parse(localStorage.getItem(key)));
            }
        }

        return Ref.new(tableName, "", "", id);
    }

    static getNameByID(id) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(id)) {
                const obj = JSON.parse(localStorage.getItem(key));
                return obj.name;
            }
        }

        return Ref.new(tableName, "", "", id);
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

    static getByID(id) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(id)) {
                return new Customer(JSON.parse(localStorage.getItem(key)));
            }
        }

        return Ref.new(tableName, "", "", id);
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

