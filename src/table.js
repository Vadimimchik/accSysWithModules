// Функція для вибору рядка
function selectRow(row) {
    if (selectedRow !== null) {
        $(selectedRow).removeClass("selected");
    }
    selectedRow = row;
    $(selectedRow).addClass("selected");
}

// Функція для редагування рядка довідника
function editRefRow(row) {
	$("#refModalTitle").text("Редагувати запис");
	if ($refModalCode.attr("class") == "hidden") {
		$refModalCode.toggleClass("hidden");
		$refModalName.toggleClass("hidden");
	}
	const cells = row.find('td');
	$refModalCode.val(cells.eq(0).text());
	$refModalName.val(cells.eq(1).text());
	$refModal.css("display", "flex");
	editMode = true;  // У режимі редагування
}

// Функція для редагування рядка документа
function editDocRow(row) {
	$("#docModalTitle").text("Редагувати запис");
	if ($docModalNumber.attr("class") == "hidden") {
		$docModalNumber.toggleClass("hidden");
		$docModalDate.toggleClass("hidden");
	}
	fillCustomers();
	fillWarehouses();
	
    const cells = row.find('td');
    const currentDoc = Doc.getByID(row.val(), currentTableName);
    const rowsQuantity = currentDoc.rowsQuantity();
    
	$docModalDate.val(cells.eq(0).text());
	$docModalNumber.val(cells.eq(1).text());
	$docModalCustomer.val(cells.eq(2).val()).trigger("change");
	$docModalWarehouse.val(cells.eq(3).val()).trigger("change");

    for (let index = 0; index < rowsQuantity; index++) {
        const currentRow =  currentDoc.getRowBuNumber(index); 
        addRowGoods();
        $("#goodName" + index).val(currentRow.good).trigger("change");
        $("#goodQuantity" + index).val(currentRow.quantity);
        $("#goodPrice" + index).val(currentRow.price);
        $("#goodTotal" + index).val(currentRow.quantity * currentRow.price);
        
    }

	$docModal.css("display", "flex");
   
	editMode = true;  // У режимі редагування
}

// Функція для видалення вибраного рядка довідника
function deleteSelectedRowRef() {
    if (selectedRow !== null) {
        const curentRef = Ref.getByID(selectedRow.val(), currentTableName);
        if (curentRef.isMark) {
            curentRef.cancelDel();
            selectedRow.css("text-decoration", "none");
        } else {
            curentRef.delete();
            selectedRow.css("text-decoration", "line-through");
        }
    }
}

// Функція для видалення вибраного рядка документу
function deleteSelectedRowDoc() {
    if (selectedRow !== null) {
        const curentDoc = Doc.getByID(selectedRow.val(), currentTableName);
        curentDoc.delete();
    }
    refreshTable(currentTableName);
}

function showRowRef(row) {
    const newRow = $("<tr></tr>").appendTo(currentTable);
    const cell1 = $("<td></td>").appendTo(newRow);
    const cell2 = $("<td></td>").appendTo(newRow);

    cell1.text(row.code);
    // cell1.val(row);
    newRow.val(row.id);
    cell2.text(row.name);

    // Додаємо функцію для вибору рядка
    newRow.on("click", function () {
        selectRow(newRow);
    });
    
    // Додаємо функцію для редагування рядка по подвійному кліку
    newRow.on("dblclick", function () {
        editRefRow(newRow);
    });

    if(row.isMark) {
        newRow.css("text-decoration", "line-through");
    }
}

function showRowDoc(row) {
    const newRow = $("<tr></tr>").appendTo(currentTable);
    const cell1 = $("<td></td>").appendTo(newRow);
    const cell2 = $("<td></td>").appendTo(newRow);
    const cell3 = $("<td></td>").appendTo(newRow);
    const cell4 = $("<td></td>").appendTo(newRow);
    const cell5 = $("<td></td>").appendTo(newRow);

    newRow.val(row.id);
    cell1.text(row.docDate.slice(0, 10));
    cell2.text(row.docNum);
    cell3.text(Ref.getNameByID(row.customer));
    cell3.val(row.customer);
    cell4.text(Ref.getNameByID(row.warehouse));
    cell4.val(row.warehouse);
    cell5.text(row.docSum);

    // Додаємо функцію для вибору рядка
    newRow.on("click", function () {
        selectRow(newRow);
    });
    
    // Додаємо функцію для редагування рядка по подвійному кліку
    newRow.on("dblclick", function () {
        editDocRow(newRow);
    });

    if(row.isMark) {
        newRow.css("text-decoration", "line-through");
    }
}

function showRows(tableName, rows) {
    for (const row of rows) {
        if (tableName == "customer" || tableName == "warehouse" || tableName == "good") {
            showRowRef(row);
        } else {
            showRowDoc(row);
        }
    }
}

function getRows(tableName) {
    const rows = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(tableName)) {
            if (tableName == "customer" || tableName == "warehouse" || tableName == "good") {
                rows.push(Ref.new(tableName, JSON.parse(localStorage.getItem(key))));
            } else {
                rows.push(Doc.new(tableName, JSON.parse(localStorage.getItem(key))));
            }
        }
    }
    rows.sort((el1, el2) => el1.compareTo(el2));
    return rows;
}

function refreshTable(tableName) {
    $bodyTables[tableName].empty();
    showRows(tableName, getRows(tableName));
}

// Показати відповідну секцію
function showSection(tableName) {
    // Сховати всі секції
    $("div[data-type='table']").addClass("hidden");

    // Показати вибрану секцію
    $("#" + tableName + "Section").removeClass("hidden");
    currentTable = $("#" + tableName + "Table").find("tbody").eq(0);
    currentTableName = tableName;

    refreshTable(tableName);

    //покажемо заголовок
    $("h1").text(systemElements[tableName]);
}