function changeClassPopup(id) {
	$("#" + id).removeClass("popup-submenu").addClass("submenu-item").find("*").removeClass("popup-submenu").addClass("submenu-item");
}

function changeClassesPopup() {
	changeClassPopup("refsubmenu");
	changeClassPopup("docsubmenu");
	changeClassPopup("reportsubmenu");
}

function changeClass(id) {
	$("#" + id).removeClass("submenu-item").addClass("popup-submenu").find("*").removeClass("submenu-item").addClass("popup-submenu");
}

function changeClasses() {
	changeClass("refsubmenu");
	changeClass("docsubmenu");
	changeClass("reportsubmenu");
}

function toggleSidebar() {
    if (isSidebarMinimized()) {
        $("#toggleBtn").text("<");
		changeClassesPopup();
    } else {
        $("#toggleBtn").text(">");
		$("#refsubmenu").hide();
		changeClasses();
		$("#docsubmenu").hide();
		$("#reportsubmenu").hide();
    }
	$("#sidebar").toggleClass("minimized");
}

function isSidebarMinimized() {
    const sidebar = document.getElementById("sidebar");
    
	return sidebar.classList.contains("minimized");
}

function showPopupSubmenu(text, prThis) {
	if (isSidebarMinimized()) {
		$(text).css({
			top: $(prThis).offset().top + "px",
			display: "block"
		});
	}
}
