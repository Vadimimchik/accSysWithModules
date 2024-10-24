$(document).ready(function() {
	// $(".consts-item").on("click", function() {
	// });

	//лісенер на клік на меню довідники
    $(".refs-item").on("click", function() {
		hideShowSubmenu("#refsubmenu")
    });

	//лісенер на наведження мишки на довідники
	$(".refs-item").hover(function() {
        if (isSidebarMinimized()) {
			showPopupSubmenu("#refsubmenu", this);
        }
    }, function() {
		hidePopupSubmenu("#refsubmenu");
    });

	//лісенер на наведення мишки на попап довідники
	$("#refsubmenu").hover(function() {
		showPopupSubmenu("#refsubmenu", this);
    }, function() {
		hidePopupSubmenu("#refsubmenu");
    });

	//лученер на клік на субменю склади
	$(".sidebar").on("click", "#warehouses", function() {
		hidePopupSubmenu("#refsubmenu");
		showSection("warehouse");
	});

	//лученер на клік на субменю контрагенти
	$(".sidebar").on("click", "#customers", function() {
		hidePopupSubmenu("#refsubmenu");
		showSection("customer");
	});

	//лученер на клік на субменю контрагенти
	$(".sidebar").on("click", "#goods", function() {
		hidePopupSubmenu("#refsubmenu");
		showSection("good");
	});

	//лісенер на меню документи
	$(".docs-item").on("click", function() {
		hideShowSubmenu("#docsubmenu")
	});

	//лісенер на наведження мишки на документи
	$(".docs-item").hover(function() {
		showPopupSubmenu("#docsubmenu", this);
    }, function() {
		hidePopupSubmenu("#docsubmenu");
    });

	//лісенер на наведення мишки на попап документи
	$("#docsubmenu").hover(function() {
		showPopupSubmenu("#docsubmenu", this);
    }, function() {
		hidePopupSubmenu("#docsubmenu");
    });

	$(".sidebar").on("click", "#invoices", function() {
		hidePopupSubmenu("#docsubmenu");
		showSection("invoice");
	});

	$(".sidebar").on("click", "#saleinvoices", function() {
		hidePopupSubmenu("#docsubmenu");
		showSection("saleinvoice");
	});

	$(".sidebar").on("click", "#purchasereturn", function() {
		hidePopupSubmenu("#docsubmenu");
		showSection("purchasereturn");
	});

	$(".sidebar").on("click", "#salereturn", function() {
		hidePopupSubmenu("#docsubmenu");
		showSection("salereturn");
	});

	$(".sidebar").on("click", "#goodsmoving", function() {
		hidePopupSubmenu("#docsubmenu");
		showSection("goodsmoving");
	});

	// //лісенер на клік на звіти
	// $(".reports-item").on("click", function() {
	// 	hideShowSubmenu("#reportsubmenu")
	// });

	// //лісенер на нведення миши на звіти
	// $(".reports-item").hover(function() {
	// 	showPopupSubmenu("#reportsubmenu", this);
    // }, function() {
	// 	hidePopupSubmenu("#reportsubmenu");
    // });

	//лісенер на наведення мишки на попап звіти
	// $("#reportsubmenu").hover(function() {
	// 	showPopupSubmenu("#reportsubmenu", this);
    // }, function() {
	// 	hidePopupSubmenu("#reportsubmenu");
    // });

	// Автоматичний перерахунок суми товару при зміні кількості або ціни
	$('#goodsTableBody').on('input', '.goodQuantity, .goodPrice', function() {
		calculateTotal();
	});
});

setInterval(setCurrentDateTime, 60 * 1000);
setCurrentDateTime();

