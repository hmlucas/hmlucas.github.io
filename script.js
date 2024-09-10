let boxes = [];
const canvas = document.getElementById("block1");
const context = canvas.getContext('2d');

function togglePDF() {
    console.log("toggle pdf");
    var pdfViewer = document.getElementById("pdfViewer");
    if (pdfViewer.style.display === "none" || pdfViewer.style.display === "") {
        pdfViewer.style.display = "block";
    } else {
        pdfViewer.style.display = "none";
    }
}

function switchStyle() {
    const themeLink = document.getElementById('theme');
    const currentHref = themeLink.getAttribute('href');

    const baseHref = currentHref.replace(/2?\.css$/, '');

    // Toggle between stylesheets
    if (currentHref.includes('2.css')) {
        themeLink.setAttribute('href', baseHref + '.css');
        localStorage.setItem("style", "1");

    } else {
        themeLink.setAttribute('href', baseHref + '2.css');
        localStorage.setItem("style", "2");
    }
}

//canvas alterations

//style switch trigger
function getColor() {
    const colors = ["#f5f7fa"];
    let idx = Math.floor(Math.random() * colors.length);
    return colors[idx];
}
//box template
function tile(context, box) {
    let x = box.x;
    let y = box.y;
    let h = box.h;
    let w = box.w;
    let r = box.r;
    context.beginPath();
    context.moveTo(x + r, y);

    context.lineTo(x + w - r, y);
    context.arcTo(x + w, y, x + w, y + h, r);

    context.lineTo(x + w, y + h - r);
    context.arcTo(x + w, y + h, x, y + h, r);
    context.lineTo(x + r, y + h);
    context.arcTo(x, y + h, x, y, r);

    context.lineTo(x, y + r);
    context.arcTo(x, y, x + r, y, r);

    context.closePath();
    context.strokeStyle = "#557b80";
    context.fillStyle = box.color;
    context.fill();
    context.stroke();
    context.fillStyle = box.txt_color;
    context.font = "20px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    //box text pos center
    const textX = x + w / 2;
    const textY = y + h / 2;
    context.fillText(box.text, textX, textY);

}
function drawBoxes() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    boxes.forEach(box => {
        tile(context, box);
    });
}
function drawEnv() {
    // context.fillStyle = "#97bcd1";
    // context.fillRect(60, 60, 300, 200);
    // context.fillStyle = "#c5e0e8";
    // context.fillRect(50, 50, 300, 200);
}
//box movement
function move() {
    boxes.forEach(box => {
        box.x += box.vx;
        box.y += box.vy;
        //bounds
        if (box.x + box.w > canvas.width || box.x < 0) {

            box.vx = -box.vx;
        }
        if (box.y + box.h > canvas.height || box.y < 0) {
            box.vy = -box.vy;
        }

    });
    //collision detection
    for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            if (collide(boxes[i], boxes[j])) {
                const tempx = boxes[i].vx;
                const tempy = boxes[i].vy;
                boxes[i].vx = boxes[j].vx;
                boxes[i].vy = boxes[j].vy;
                boxes[j].vx = tempx;
                boxes[j].vy = tempy;
            }
        }
    }
}
function collide(box1, box2) {
    return !(box1.x + box1.w < box2.x ||
        box1.x > box2.x + box2.w ||
        box1.y + box1.h < box2.y ||
        box1.y > box2.y + box2.h);
}

function animate() {
    move();
    drawBoxes();
    drawEnv();
    requestAnimationFrame(animate);
}
function resizeCanvas() {
    const s = document.getElementById("sidebar2");
    canvas.width = window.innerWidth - s.clientWidth;
    canvas.height = window.innerHeight;
    console.log(`Canvas size: ${canvas.width}x${canvas.height}`);

}
function generateCoords(box1) {
    let x1 = Math.random() * (canvas.width - 300);
    let y1 = Math.random() * (canvas.height - 200);
    box1.x = x1;
    box1.y = y1;
    while (boxes.some(box2 => isBoxInBox(box1, box2))) {
        x1 = Math.random() * (canvas.width - 300);
        y1 = Math.random() * (canvas.height - 200);
        box1.x = x1;
        box1.y = y1;
    };
}
function makeBoxes() {
    let text = ["Portfolio", "Qualifications", "Service", "AI", "Switch Styles!"];
    for (let i = 0; i < 5; i++) {
        let box = {
            id: i,
            w: 150,
            h: 60,
            r: 10,
            color: "#f0f7e9",
            vx: (Math.random() + 0.05),
            vy: (Math.random() + 0.05),
            txt_color: "black",
            text: text[i],
        };
        generateCoords(box);
        console.log(box);
        boxes.push(box);
    }
    let box2 = {
        id: 5,
        w: 300,
        h: 100,
        r: 10,
        color: "#678E7F",
        vx: 0.5,
        vy: 0.5,
        txt_color: "black",
        text: "Hello! My name is Hannah",
    };
    generateCoords(box2);
    boxes.push(box2);
}
//click handling
function isPointInBox(x, y, box) {
    return x >= box.x && x <= box.x + box.w &&
        y >= box.y && y <= box.y + box.h;
}
function isBoxInBox(box1, box2) {
    return !(box1.x + box1.w <= box2.x ||
        box1.x >= box2.x + box2.w ||
        box1.y + box1.h <= box2.y ||
        box1.y >= box2.y + box2.h);
}
function onBoxClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    boxes.forEach(box => {
        if (isPointInBox(mouseX, mouseY, box)) {
            console.log(`${box.text} box clicked at x = ${box.x}, y = ${box.y}. w = ${canvas.width}, h = ${canvas.height}`);
        }
    });
}
canvas.addEventListener('click', onBoxClick);

//initialize
document.addEventListener("DOMContentLoaded", function () {
    //sizing
    resizeCanvas();

    //get theme
    const themeLink = document.getElementById('theme');
    const currentHref = themeLink.getAttribute('href');
    if (localStorage.getItem("style") === "1" && currentHref.includes("2")) {
        switchStyle();
    } else if (localStorage.getItem("style") === "2" && !(currentHref.includes("2"))) {
        switchStyle();
    }
    //create boxes
    // makeBoxes();
    // animate();
});

window.addEventListener('load', function () {
    resizeCanvas();
    makeBoxes();
    animate();
});

window.addEventListener('resize', resizeCanvas);




