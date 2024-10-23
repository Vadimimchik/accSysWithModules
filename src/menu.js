function hidePopupSubmenu(text) {
    if (isSidebarMinimized()) {
        $(text).hide();
    }
}

function hideShowSubmenu(text) {
    if (!isSidebarMinimized()) {
        const element = $(text);
        if (element.is(":visible")) {
            element.hide();
        } else {
            element.show();
        }
    }
}
