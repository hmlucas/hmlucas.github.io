function page(id, name, box_info, boxes, desc_box) {
    this.id = id;
    this.name = name;
    this.box_info = box_info;
    this.boxes = boxes;
    this.desc_box = desc_box;
}

let pages = [
    new page(0, "home",
        [
            { text: "Portfolio", link: "portfolio.html" },
            { text: "Qualifications", link: "qual.html" },
            { text: "Service", link: "service.html" },
            { text: "AI", link: "ai.html" },
            { text: "Switch Styles!", link: null },
            { text: "Contact me!", link: "contact.html" }
        ], [], "Hello! Click a box to explore."
    ),
    new page(1, "qual", [{ text: "Switch Styles!", link: null }, { text: "Resume", link: "#pdf" }], [], ""),
    new page(2, "service", [
        { text: "Switch Styles!", link: null },
        { text: "Community", link: "#environment" },
        { text: "Academics", link: "#academic" }
    ], [], ""),
    new page(3, "ai", [], [], ""),
    new page(4, "portfolio",
        [
            { text: "Drone Connections", link: "#drones" },
            { text: "Store Management", link: "#store" }, { text: "Switch Styles!", link: null }
        ], [], ["Click a box to learn more", "about a specific project!"]),
    new page(5, "contact", [
        { text: "hannah.margaret.lucas@gmail.com", link: "mailto:hannah.margaret.lucas@gmail.com" }, { text: "Switch Styles!", link: null },
        { text: "(512)-774-7848", link: null },
        { text: "LinkedIn", link: "https://www.linkedin.com/in/hannah-lucas-b62382260/" }
    ], [], "")
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
    // Toggle between stylesheets
    if (currentHref.includes('2.css')) {
        themeLink.setAttribute('href', baseHref + '.css');
        localStorage.setItem("style", "1");
        console.log("Switching style 2 -> 1");
    } else {
        themeLink.setAttribute('href', baseHref + '2.css');
        localStorage.setItem("style", "2");
        console.log("Switching style 1 -> 2");
    }
    location.reload();
}

