const systemElements = {
	"customer": "Контрагенти",
	"warehouse": "Склади",
	"invoice": "Прибуткові накладні",
	"saleinvoice": "Видаткові накладні",
	"goodsmoving": "Переміщення",
	"salereturn": "Повернення покупцю",
	"purchasereturn": "Повернення постачальнику",
};

const $refModal = $("#refModal");
const $refModalCode = $("#refModalCode");
const $refModalName = $("#refModalName");
const $bodyTables =  {
	warehouse: $('#warehouseTable tbody'),
	customer: $('#customerTable tbody'),
	good: $('#goodTable tbody'),
	invoice: $('#invoiceTable tbody'),
	saleinvoice: $('#saleinvoiceTable tbody'),
	salereturn: $('#salereturnTable tbody'),
	purchasereturn: $('#purchasereturnTable tbody')
};

const $docModal = $("#docModal");
const $docModalNumber = $("#docModalNumber");
const $docModalDate = $("#docModalDate");
const $docModalCustomer = $("#docModalCustomer");
const $docModalWarehouse = $("#docModalWarehouse");

const $goodsTableBody = $('#goodsTableBody')

let selectedRow = null;
let editMode = false;
let currentTable;
let currentTableName;
