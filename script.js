function togglePDF() {
    console.log("Toggle function triggered."); // Debugging line
    var pdfViewer = document.getElementById("pdfViewer");
    if (pdfViewer.style.display === "none" || pdfViewer.style.display === "") {
        pdfViewer.style.display = "block";
    } else {
        pdfViewer.style.display = "none";
    }
}
