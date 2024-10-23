class Doc {
    #docID;
    #docDate;
    #docNum;

    constructor(docDate, docNum) {
        this.#docDate = this.#getDocDate(docDate);
        this.#docNum = this.#getdocNum(docNum);
        this.#docID = this.#getDocID();
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

    #getDocID() {
        return 1;
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
}

class GoodsDoc extends Doc{
    #customer;
    #warehouse;
    #docSum;
    #tab;
    
    constructor(docDate, docNum) {
        super(docDate, docNum);
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
}

class PurchaseReturn extends GoodsDoc{
    constructor(docDate = undefined, docNum = undefined) {
        super(docDate, docNum);
    }
}

class SaleReturn extends GoodsDoc{
    constructor(docDate = undefined, docNum = undefined) {
        super(docDate, docNum);
    }
}

class SaleInvoice extends GoodsDoc{
    constructor(docDate = undefined, docNum = undefined) {
        super(docDate, docNum);
    }
}

class Invoice extends GoodsDoc{
    constructor(docDate = undefined, docNum = undefined) {
        super(docDate, docNum);
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

const invoice = new Invoice(undefined, 2);
console.log(invoice.docNum);
