
function box(box_id, page_id, x, y, w, h, r, color, vx, vy, txt_color, text) {
    this.box_id = box_id;
    this.page_id = page_id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.txt_color = txt_color;
    this.text = text;
}
const canvas = document.getElementById("block1");
const context = canvas.getContext('2d');
const pg = getPage(getPageID());
function getColor() {
    const colors = ["#f5f7fa"];
    let idx = Math.floor(Math.random() * colors.length);
    return colors[idx];
}
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
    (pg.boxes).forEach(box => {
        tile(context, box);
    });
}

function move() {
    (pg.boxes).forEach(box => {
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
    for (let i = 0; i < pg.boxes.length; i++) {
        for (let j = i + 1; j < pg.boxes.length; j++) {
            if (collide(pg.boxes[i], pg.boxes[j])) {
                const tempx = pg.boxes[i].vx;
                const tempy = pg.boxes[i].vy;
                pg.boxes[i].vx = pg.boxes[j].vx;
                pg.boxes[i].vy = pg.boxes[j].vy;
                pg.boxes[j].vx = tempx;
                pg.boxes[j].vy = tempy;
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
    requestAnimationFrame(animate);
}
function resizeCanvas() {
    const s = document.getElementById("sidebar2");
    canvas.width = window.innerWidth - s.clientWidth;
    canvas.height = window.innerHeight;
    console.log(`Canvas size: ${canvas.width}x${canvas.height}`);
    console.log(`page dimensions: ${window.innerWidth}x${window.innerHeight}`);
    console.log(`sidebar dimensions: ${s.clientWidth}x${s.clientHeight}`);
    pg.boxes = [];
    makeBoxes();
}
function generateCoords(box1) {
    let x1 = Math.random() * (canvas.width - 300);
    let y1 = Math.random() * (canvas.height - 200);
    box1.x = x1;
    box1.y = y1;
    while ((pg.boxes).some(box2 => isBoxInBox(box1, box2))) {
        x1 = Math.random() * (canvas.width - 300);
        y1 = Math.random() * (canvas.height - 200);
        box1.x = x1;
        box1.y = y1;
    };
}
function makeBoxes() {
    console.log("makeBoxes() called");
    let selected = pg.box_info;
    selected.forEach((info, i) => {
        let box1 = new box(i, pg.id, 0, 0, 150, 60, 10, "#C2D8B9", (Math.random() + 0.05), (Math.random() + 0.05), "black", info.text);//placeholder x and y
        generateCoords(box1);
        console.log(box1);
        (pg.boxes).push(box1);
    })
    let box2 = new box(5, pg.id, 0, 0, 300, 100, 10, "#f0f7e9", 0.5, 0.5, "black", "Hello! Click a box to explore.");
    generateCoords(box2);
    (pg.boxes).push(box2);
}

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
    const box_txt = pg.box_info.map(info => info.text);
    const box_links = pg.box_info.map(info => info.link);
    // let clicked = false;
    pg.boxes.forEach(box => {
        if (isPointInBox(mouseX, mouseY, box)) {
            // clicked = true;
            console.log(`${box.text} box clicked at x = ${box.x}, y = ${box.y}. w = ${canvas.width}, h = ${canvas.height}`);
            //match box with assoc. entries in box_text & box_links
            if (box.text === "Switch Styles!") {
                switchStyle();
                return;
            }
            let i = box_txt.findIndex(text => text === box.text);
            if (i === -1) {
                console.log("page not found");
            } else {
                window.location.href = box_links[i];
            }
        }
    });
    // if (!clicked) {
    //     window.location.href = "home.html";
    // }
}
canvas.addEventListener('click', onBoxClick);