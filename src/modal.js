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

function openDocModal(mode) {
	let innerText;
    if (mode === "invoice") {
        innerText = "Прибуткова накладна"
    } else {
        innerText = mode;
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
	let id;

	if (code && name) {
		if (editMode && selectedRow) {
			// Оновлення існуючого запису
			const cells = selectedRow.find('td');
			cell1 = cells.eq(0);
			cell2 = cells.eq(1);
			id = cells.eq(0).val()
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
		}
		cell1.text(code);
		cell2.text(name);

		let currentElement;
		if (currentTableName == "good") {
			currentElement = new Good(code, name, id);
		} else if (currentTableName == "customer"){
			currentElement = new Customer(code, name, id);
		} else if (currentTableName == "warehouse"){
			currentElement = new Warehouse(code, name, id);
		}

		currentElement.save();
		cell1.val(currentElement.id);
		closeRefModal();
	} else {
		alert("Будь ласка, заповніть всі поля.");
	}
}

function saveDocRow(docType) {
	let date = 	$docModalDate.val();
	let number = $docModalNumber.val();
	let customer = $docModalCustomer.val();
	let warehouse = $docModalWarehouse.val();
	let sum = 0;
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
		} else {
			// Додавання нового запису
			let newRow = $("<tr></tr>").appendTo(currentTable);

			cell1 = $("<td></td>").appendTo(newRow);
			cell2 = $("<td></td>").appendTo(newRow);
            cell3 = $("<td></td>").appendTo(newRow);
            cell4 = $("<td></td>").appendTo(newRow);
			cell5 = $("<td></td>").appendTo(newRow);
			$('#goodsTableBody .goodTotal').each(function() {
                var value = parseFloat($(this).val()); // Отримуємо значення інпуту
                if (!isNaN(value)) {
                    sum += value; // Додаємо значення до загальної суми
                }
            });

			// Додаємо функцію для вибору рядка
			newRow.on("click", function () {
				selectRow(newRow);
			});
			
			// Додаємо функцію для редагування рядка по подвійному кліку
			newRow.on("dblclick", function () {
				editDocRow(newRow);
			});
		}
		cell1.text(date);
		cell2.text(number);
		cell3.text(customer);
		cell4.text(warehouse);
		cell5.text(sum);

		closeDocModal();
	// } else {
	// 	alert("Будь ласка, заповніть всі поля.");
	// }

}

function addRowGoods() {
	$goodsTableBody.append(`
		<tr>
			<td><input type="text" class="goodName" placeholder="Товар"></td>
			<td><input type="number" class="goodQuantity" placeholder="Кількість"></td>
			<td><input type="number" class="goodPrice" placeholder="Ціна"></td>
			<td><input type="text" class="goodTotal" placeholder="Сума" readonly></td>
		</tr>
	`);
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
