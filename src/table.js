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
	const cells = row.find('td');
	$docModalNumber.val(cells.eq(0).text());
	$docModalDate.val(cells.eq(1).text());
	$docModalCustomer.val(cells.eq(2).text());
	$docModalWarehouse.val(cells.eq(3).text());
	$docModal.css("display", "flex");
	editMode = true;  // У режимі редагування
}

// Функція для видалення вибраного рядка
function deleteSelectedRow() {
    if (selectedRow !== null) {
        $(selectedRow).remove(); 
        selectedRow = null;	
    }
}

function showRowRef(row) {
    const newRow = $("<tr></tr>").appendTo(currentTable);
    const cell1 = $("<td></td>").appendTo(newRow);
    const cell2 = $("<td></td>").appendTo(newRow);

    cell1.text(row.code);
    cell1.val(row.id);
    cell2.text(row.name);

    // Додаємо функцію для вибору рядка
    newRow.on("click", function () {
        selectRow(newRow);
    });
    
    // Додаємо функцію для редагування рядка по подвійному кліку
    newRow.on("dblclick", function () {
        editRefRow(newRow);
    });
}

function showRowDoc(row) {
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
            rows.push(JSON.parse(localStorage.getItem(key)));
        }
    }
    rows.sort((el1, el2) => {
        if (el1.code == +el1.code && el2.code == +el2.code) {
            return el1.code - el2.code;
        }
        return el1.code > el2.code ? 1 : -1
    });

    showRows(tableName, rows);
}

function refreshRefTable(tableName) {
    $refBodyTables[tableName].empty();
    getRows(tableName);
}

// Показати відповідну секцію
function showSection(tableName) {
    // Сховати всі секції
    $("div[data-type='table']").addClass("hidden");

    // Показати вибрану секцію
    $("#" + tableName + "Section").removeClass("hidden");
    currentTable = $("#" + tableName + "Table").find("tbody").eq(0);
    currentTableName = tableName;

    if ($(`#${tableName}Table tbody tr`).length <= 0) { //У таблиці немає рядків
        getRows(tableName);
    }

    //покажемо заголовок
    $("h1").text(systemElements[tableName]);
}

