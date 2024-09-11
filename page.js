function page(id, name, box_info, boxes) {
    this.id = id;
    this.name = name;
    this.box_info = box_info;
    this.boxes = boxes;
}

let pages = [
    new page(0, "home",
        [
            { text: "Portfolio", link: "portfolio.html" },
            { text: "Qualifications", link: "qual.html" },
            { text: "Service", link: "service.html" },
            { text: "AI", link: "ai.html" },
            { text: "Switch Styles!", link: null }
        ], []
    ),
    new page(1, "qual", [], []),
    new page(2, "service", [], []),
    new page(3, "ai", [], []),
    new page(4, "portfolio",
        [
            { text: "Drone Logs", link: "drones.html" }
        ], []
    )
];

function getPage(page_id) {
    return pages.find(page => page.id == page_id);
}

function getPageName() {
    const url = window.location.href;
    const pageName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    return pageName;  // ex. returns home if pg is home.html
}

function getPageID() {
    const pg = getPageName();
    return pages.findIndex(page => page.name === pg);
}
function getBoxes() {
    const pg = getPageName();
    const idx = pages.findIndex(page => page.name === pg);
    return pages[idx].boxes;
}


function switchStyle() {
    const themeLink = document.getElementById('theme');
    const currentHref = themeLink.getAttribute('href');
    const baseHref = currentHref.replace(/2?\.css$/, '');
    const pg = getPage(getPageID());
    // Toggle between stylesheets
    if (currentHref.includes('2.css')) {
        themeLink.setAttribute('href', baseHref + '.css');
        localStorage.setItem("style", "1");
        console.log("Switching style 2 -> 1");
    } else {
        themeLink.setAttribute('href', baseHref + '2.css');
        localStorage.setItem("style", "2");
        console.log("Switching style 1 -> 2");
        location.reload();
    }
}

