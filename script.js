function togglePDF() {
    console.log("Toggle function triggered.");
    var pdfViewer = document.getElementById("pdfViewer");
    if (pdfViewer.style.display === "none" || pdfViewer.style.display === "") {
        pdfViewer.style.display = "block";
    } else {
        pdfViewer.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    //sizing
    // resizeCanvas();
    const themeLink = document.getElementById('theme');
    //get theme
    const pg = getPage(getPageID());
    const baseHref = themeLink.getAttribute('href').replace(/2?\.css$/, '');
    const savedStyle = localStorage.getItem("style");
    if (savedStyle === "2") {
        themeLink.setAttribute('href', baseHref + "2.css");
    } else {
        themeLink.setAttribute('href', baseHref + ".css");
    }
    console.log("page: " + pg +
        " style: " + savedStyle
    );
    //create boxes
});

window.addEventListener('load', function () {
    const themeLink = document.getElementById('theme');
    const currentHref = themeLink.getAttribute('href');
    const pg = getPage(getPageID());
    if (localStorage.getItem("style") === "1" && currentHref.includes("2")) {
        switchStyle();
        console.log("1");
    } else if (localStorage.getItem("style") === "2" && !(currentHref.includes("2"))) {
        pg.switchStyle();
        console.log("2");
    }
    if (localStorage.getItem("style") === "2") {
        resizeCanvas();
        animate();
    }
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();



