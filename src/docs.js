class Doc {
    #id;
    #docDate;
    #docNum;
    #isMark;
    
    constructor(docDate, docNum) {
        if(typeof docDate == "object") {
            const obj = docDate;
            this.#docDate = obj.docDate;
            this.#docNum = obj.docNum;
            this.#id = obj.id;
            this.#isMark = false;
        } else {
            this.#docDate = this.#getDocDate(docDate);
            this.#docNum = this.#getdocNum(docNum);
            this.#id = Doc.#generateID();
            this.#isMark = false;
        }

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

    get docNum() {
        return this.#docNum;
    }

    set docNum(docNum) {
        this.#docNum = docNum;
    }

    get docDate() {
        return this.#docDate;
    }

    set docDate(docDate) {
        this.#docDate = docDate;
    }

    save() {
        console.log("Save");
    }

    #isValidDate(prDate) {
        const date = new Date(prDate);
        return !isNaN(date.getTime());
    }

    #getDocDate(docDate) {
        if (docDate == undefined || !this.#isValidDate(docDate)) {
            return new Date();
        }

        return new Date(docDate);
    }

    #getdocNum(docNum) {
        if (docNum == undefined) {
            return 1;
        }
        return docNum;
    }

    get id() {
        return this.#id;
    }

    get isMark() {
        return this.#isMark;
    }

    compareTo(other) {
        let res = new Date(this.docDate).getTime() - new Date(other.docDate).getTime();
        if (res === 0) {
            if (this.docNum == +this.docNum && other.docNum == +other.docNum) {
                res =  this.docNum - other.docNum;
            } else {
                res = this.docNum > other.docNum ? 1 : -1;
            }
        }
        return res;

    }

    static new(docName, obj) {
        if (docName == "invoice") {
            return new Invoice(obj);
        } else if(docName == "saleinvoice") {
            return new SaleInvoice(obj);
        } else if(docName == "purchasereturn") {
            return new PurchaseReturn(obj);
        } else if(docName == "salereturn") {
            return new SaleReturn(obj);
        } else {
            return new Doc(obj);
        }
    }

    static getByID(id, tableName) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(id)) {
                return Doc.new(tableName, JSON.parse(localStorage.getItem(key)));
            }
        }

        return "";
    }

    delete() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(this.#id)) {
                localStorage.removeItem(key);
                break;
            }
        }
    }

}

class GoodsDoc extends Doc{
    #customer;
    #warehouse;
    #docSum;
    #tab;
    
    constructor(docDate, docNum) {
        super(docDate, docNum);
        if(typeof docDate == "object") {
            const obj = docDate;
            this.#customer = obj.customer;
            this.#warehouse = obj.warehouse;
            this.#docSum = obj.docSum;
            this.#tab = obj.tab;
        } else {
            this.#tab = [];
        }
    }

    addRow(good, quantity, price, sum) {
        this.#tab.push({good, quantity, price, sum});
    }

    deleteRows() {
        this.#tab = [];
    }

    rowsQuantity() {
        return this.#tab.length;
    }


    getRowBuNumber(num) {
        return this.#tab[num];
    }

    toJSON() {
        return {
            id: this.id,
            docDate: this.docDate,
            docNum: this.docNum,
            isMark: this.isMark,
            customer: this.customer,
            warehouse: this.warehouse,
            docSum: this.docSum,
            tab: this.#tab
        };
    }

    get customer() {
        return this.#customer;
    }

    set customer(customer) {
        this.#customer = customer;
    }

    get warehouse() {
        return this.#warehouse;
    }

    set warehouse(warehouse) {
        this.#warehouse = warehouse;
    }

    get docSum() {
        return this.#docSum;
    }

    set docSum(sum) {
        if(sum == 0) {
            this.#docSum = "";
        } else {
            this.#docSum = sum;
        }
    }
}

class PurchaseReturn extends GoodsDoc{
    constructor(docDate = undefined, docNum = undefined) {
        super(docDate, docNum);
    }

    save() {
        const thisStr = JSON.stringify(this);
        localStorage.setItem("purchasereturn_" + this.id, thisStr);
    }
}

class SaleReturn extends GoodsDoc{
    constructor(docDate = undefined, docNum = undefined) {
        super(docDate, docNum);
    }

    save() {
        const thisStr = JSON.stringify(this);
        localStorage.setItem("salereturn_" + this.id, thisStr);
    }
}

class SaleInvoice extends GoodsDoc{
    constructor(docDate = undefined, docNum = undefined) {
        super(docDate, docNum);
    }

    save() {
        const thisStr = JSON.stringify(this);
        localStorage.setItem("saleinvoice_" + this.id, thisStr);
    }

}

class Invoice extends GoodsDoc{
    constructor(docDate = undefined, docNum = undefined) {
        super(docDate, docNum);
        if(typeof docDate == "object") {
            const obj = docDate;
        }
    }
    
    save() {
        const thisStr = JSON.stringify(this);
        localStorage.setItem("invoice_" + this.id, thisStr);
    }
}

class GoodsMoving extends Doc{
    #from;
    #to;
    #tab;

    constructor(docDate = undefined, docNum = undefined) {
        super(docDate, docNum);
    }

    set from(from) {
        this.#from = from;
    }

    get from() {
        return this.#from;
    }

    set to(to) {
        this.#to = to;
    }

    get to() {
        return this.#to;
    }
}
