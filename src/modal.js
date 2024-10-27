function openRefModal(mode) {
	let innerText = mode === 'customer' ? "Новий контрагент" : "Новий склад";
	$("#refModalTitle").text(innerText);
	if ($refModalCode.attr("class") == "hidden") {
		$refModalCode.toggleClass("hidden");
		$refModalName.toggleClass("hidden");
	}
	$refModal.css("display", "flex");
	editMode = false; // Скидаємо режим редагування
}

function getCurrentDate() {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0'); // Січень починається з 0
	const yyyy = today.getFullYear();
	return yyyy + '-' + mm + '-' + dd;
}

function fillCustomers() {
	const customers = getRows("customer");
	$docModalCustomer.empty();
	$docModalCustomer.append('<option value=""></option>');
	customers.forEach(element => {
		$docModalCustomer.append(`<option value="${element.id}">${element.name}</option>`);
	});
}

function fillWarehouses() {
	const warehouses = getRows("warehouse");
	$docModalWarehouse.empty();
	$docModalWarehouse.append('<option value=""></option>');
	warehouses.forEach(element => {
		$docModalWarehouse.append(`<option value="${element.id}">${element.name}</option>`);
	});
}

function openDocModal(mode) {
	let innerText;
    if (mode === "invoice") {
        innerText = "Прибуткова накладна"
    } else if (mode === "saleinvoice") {
        innerText = "Видаткова накладна"
    } else if (mode === "purchasereturn") {
        innerText = "Повернення постачальнику"
    } else if (mode === "saleinvoice") {
        innerText = "Повернення від покупця"
    }
    if (!editMode) {
        innerText += "(Новий)"
		$docModalDate.val(getCurrentDate());
    }
	$("#docModalTitle").text(innerText);
	if ($docModalNumber.attr("class") == "hidden") {
		$docModalNumber.toggleClass("hidden");
		$docModalDate.toggleClass("hidden");
	}
	$docModal.css("display", "flex");
	editMode = false; // Скидаємо режим редагування

	fillCustomers();
	fillWarehouses();
}

function closeRefModal() {
	$refModal.css("display", "none");
	// Очищуємо поля форми
	$refModalCode.val("");
	$refModalName.val("");
}

function closeDocModal() {
	$docModal.css("display", "none");
	// // Очищуємо поля форми
	$docModalNumber.val("");
	$docModalDate.val("");
	$docModalCustomer.val("");
	$docModalWarehouse.val("");
	$('#goodsTableBody').html("");
}

function saveRefRow() {
	let code = 	$refModalCode.val();
	let name = $refModalName.val();
	let cell1;
	let cell2;
	let currentElement;

	if (code && name) {
		if (editMode && selectedRow) {
			// Оновлення існуючого запису
			const cells = selectedRow.find('td');
			cell1 = cells.eq(0);
			cell2 = cells.eq(1);
			// currentElement = selectedRow.val();
			currentElement = Ref.getByID(selectedRow.val(), currentTableName);
			currentElement.code = code;
			currentElement.name = name;
		} else {
			// Додавання нового запису
			let newRow = $("<tr></tr>").appendTo(currentTable);

			cell1 = $("<td></td>").appendTo(newRow);
			cell2 = $("<td></td>").appendTo(newRow);

			// Додаємо функцію для вибору рядка
			newRow.on("click", function () {
				selectRow(newRow);
			});
			
			// Додаємо функцію для редагування рядка по подвійному кліку
			newRow.on("dblclick", function () {
				editRefRow(newRow);
			});

			currentElement = Ref.new(currentTableName, code, name);
		}
		cell1.text(code);
		cell2.text(name);

		currentElement.save();
		// cell1.val(currentElement);
		selectedRow.val(currentElement.id);
		closeRefModal();
		refreshTable(currentTableName);
	} else {
		alert("Будь ласка, заповніть всі поля.");
	}
}

function saveDocRow() {
	let date = 	$docModalDate.val();
	let number = $docModalNumber.val();
	let customerText = $docModalCustomer.find('option:selected').text();;
	let warehouseText = $docModalWarehouse.find('option:selected').text();;
	let customer = $docModalCustomer.val();
	let warehouse = $docModalWarehouse.val();
	let sum = 0;
	let currentDoc;
	let cell1;
	let cell2;
	let cell3;
	let cell4;
	let cell5;

	// if (date && number) {
		if (editMode && selectedRow) {
			// Оновлення існуючого запису
			const cells = selectedRow.find('td');
			cell1 = cells.eq(0);
			cell2 = cells.eq(1);
            cell3 = cells.eq(2);
            cell4 = cells.eq(3);
			cell5 = cells.eq(4);
			currentDoc = Doc.getByID(selectedRow.val(), currentTableName);
			currentDoc.date = date;
			currentDoc.number = number;
		} else {
			// Додавання нового запису
			let newRow = $("<tr></tr>").appendTo(currentTable);
			selectedRow = newRow;

			cell1 = $("<td></td>").appendTo(newRow);
			cell2 = $("<td></td>").appendTo(newRow);
            cell3 = $("<td></td>").appendTo(newRow);
            cell4 = $("<td></td>").appendTo(newRow);
			cell5 = $("<td></td>").appendTo(newRow);

			// Додаємо функцію для вибору рядка
			newRow.on("click", function () {
				selectRow(newRow);
			});
			
			// Додаємо функцію для редагування рядка по подвійному кліку
			newRow.on("dblclick", function () {
				editDocRow(newRow);
			});

			if(currentTableName == "invoice") {
				currentDoc = new Invoice(date, number);
			} else if(currentTableName == "saleinvoice") {
				currentDoc = new SaleInvoice(date, number);
			} else if(currentTableName == "purchasereturn") {
				currentDoc = new PurchaseReturn(date, number);
			} else if(currentTableName == "salereturn") {
				currentDoc = new SaleReturn(date, number);
			}
		}
		
		$('#goodsTableBody .goodTotal').each(function() {
			const value = parseFloat($(this).val()); // Отримуємо значення інпуту
			if (!isNaN(value)) {
				sum += value; // Додаємо значення до загальної суми
			}
		});

		currentDoc.customer = customer;
		currentDoc.warehouse = warehouse;
		currentDoc.docSum = sum;

		currentDoc.deleteRows();
		$('#goodsTableBody tr').each(function() {
			// 'this' посилається на поточний рядок (tr)
			const good = $(this).find(".goodName").val();
			const quantity = $(this).find('.goodQuantity').val();
			const price = $(this).find('.goodPrice').val();
			const sum = $(this).find('.goodTotal').val();
		
			currentDoc.addRow(good, quantity, price, sum);
		});

		currentDoc.save();

		cell1.text(date);
		cell2.text(number);
		cell3.text(customerText);
		cell4.text(warehouseText);
		cell3.val(customer);
		cell4.val(warehouse);
		cell5.text(sum);

		selectedRow.val(currentDoc.id);
		closeDocModal();
		refreshTable(currentTableName);
	// } else {
	// 	alert("Будь ласка, заповніть всі поля.");
	// }

}

function fillGoods(rowNum) {
	const $goodName = $("#goodName" + rowNum);
	const goods = getRows("good");
	$goodName.empty();
	$goodName.append('<option value=""></option>');
	goods.forEach(element => {
		$goodName.append(`<option value="${element.id}">${element.name}</option>`);
	});
}

function addRowGoods() {
	const rowNum = $("#goodsTableBody tr").length;
	$goodsTableBody.append(`
		<tr>
			<td><select id="goodName${rowNum}" class="goodName" name="goodName"></select></td>
			<td><input type="number"  id="goodQuantity${rowNum}" class="goodQuantity" placeholder="Кількість"></td>
			<td><input type="number"  id="goodPrice${rowNum}" class="goodPrice" placeholder="Ціна"></td>
			<td><input type="text"  id="goodTotal${rowNum}" class="goodTotal" placeholder="Сума" readonly></td>
		</tr>
	`);
	fillGoods(rowNum);
}

// Функція для підрахунку суми
function calculateTotal() {
	let total = 0;
	$('#goodsTableBody tr').each(function() {
		const quantity = $(this).find('.goodQuantity').val();
		const price = $(this).find('.goodPrice').val();
		const sum = quantity * price;
		$(this).find('.goodTotal').val(sum.toFixed(2));
		total += sum;
	});
	return total.toFixed(2);
}
