let canvas;
let ctx;

let canvas_width;
let canvas_half_width;
let canvas_height;
let canvas_half_height;
let plot_padding;
let radius_px;
let half_axis_len;

function initCanvas(element) {
    canvas = element;
    ctx = canvas.getContext("2d");

    canvas_width = canvas.width;
    canvas_half_width = canvas_width / 2;
    canvas_height = canvas.height;
    canvas_half_height = canvas_height / 2;
    plot_padding = 80;
    radius_px = (canvas_height - plot_padding * 2) / 2;
    half_axis_len = (radius_px + plot_padding / 2);

    loadPoints();
    updateCanvas(r_value);
}

function loadPoints() {
    points_data = [];

    $("#result-table > tbody > tr").each(function(index, element) {
        let x = parseFloat($(element).find(".x").text());
        let y = parseFloat($(element).find(".y").text());
        let r = parseFloat($(element).find(".r").text());
        let hit = $(element).find(".hit").text().trim() === "Да";

        //console.log(`${x}, ${y}, ${r}, ${hit}`);

        points_data[index]={x: x, y: y, r: r, hit: hit};
    });
}

function drawAreas(radius_value = null) {
    const radius_string = radius_value === null ? "R" : radius_value
    const half_radius_string = radius_value === null ? "R/2" : radius_value / 2

    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, canvas_width, canvas_height);

    ctx.strokeRect(0, 0, canvas_width, canvas_height);

    ctx.fillStyle = 'rgb(0, 127, 255)';

    // arc

    ctx.beginPath();

    ctx.moveTo(canvas_half_width, canvas_half_height);
    ctx.arc(canvas_half_width, canvas_half_height, radius_px, 0, Math.PI / 2, false);
    ctx.fill();

    ctx.closePath();

    // triangle

    ctx.beginPath();

    ctx.moveTo(canvas_half_width, canvas_half_height);
    ctx.lineTo(canvas_half_width, canvas_half_height - radius_px);
    ctx.lineTo(canvas_half_width - radius_px / 2, canvas_half_height);
    ctx.lineTo(canvas_half_width, canvas_half_height);
    ctx.fill();

    ctx.closePath();

    // rectangle

    ctx.fillRect(canvas_half_width - radius_px / 2, canvas_half_height, radius_px / 2, radius_px);


    // Oxy

    ctx.beginPath();

    // X

    ctx.moveTo(canvas_half_width - half_axis_len, canvas_half_height);
    ctx.lineTo(canvas_half_width + half_axis_len, canvas_half_height);
    ctx.lineTo(canvas_half_width + half_axis_len - 8, canvas_half_height - 4);
    ctx.moveTo(canvas_half_width + half_axis_len, canvas_half_height);
    ctx.lineTo(canvas_half_width + half_axis_len - 8, canvas_half_height + 4);

    ctx.font = '14px Serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgb(0, 0, 0)';

    ctx.fillText('x', canvas_half_width + half_axis_len - 5, canvas_half_height - 7);

    ctx.fillText(`-${radius_string}`, canvas_half_width - radius_px, canvas_half_height - 7);

    ctx.moveTo(canvas_half_width - radius_px, canvas_half_height - 5);
    ctx.lineTo(canvas_half_width - radius_px, canvas_half_height + 5);

    ctx.fillText(`-${half_radius_string}`, canvas_half_width - radius_px / 2, canvas_half_height - 7);

    ctx.moveTo(canvas_half_width - radius_px / 2, canvas_half_height - 5);
    ctx.lineTo(canvas_half_width - radius_px / 2, canvas_half_height + 5);

    ctx.fillText(`${half_radius_string}`, canvas_half_width + radius_px / 2, canvas_half_height - 7);

    ctx.moveTo(canvas_half_width + radius_px / 2, canvas_half_height - 5);
    ctx.lineTo(canvas_half_width + radius_px / 2, canvas_half_height + 5);

    ctx.fillText(`${radius_string}`, canvas_half_width + radius_px, canvas_half_height - 7);

    ctx.moveTo(canvas_half_width + radius_px, canvas_half_height - 5);
    ctx.lineTo(canvas_half_width + radius_px, canvas_half_height + 5);

    // Y

    ctx.moveTo(canvas_half_width, canvas_half_height + half_axis_len);
    ctx.lineTo(canvas_half_width, canvas_half_height - half_axis_len);
    ctx.lineTo(canvas_half_width - 4, canvas_half_height - half_axis_len + 8);
    ctx.moveTo(canvas_half_width, canvas_half_height - half_axis_len);
    ctx.lineTo(canvas_half_width + 4, canvas_half_height - half_axis_len + 8);

    ctx.textAlign = 'left';

    ctx.fillText('y', canvas_half_width + 7, canvas_half_height - half_axis_len + 5);

    ctx.fillText(`-${radius_string}`, canvas_half_width + 7, canvas_half_height + radius_px + 5);

    ctx.moveTo(canvas_half_width - 5, canvas_half_height + radius_px);
    ctx.lineTo(canvas_half_width + 5, canvas_half_height + radius_px);

    ctx.fillText(`-${half_radius_string}`, canvas_half_width + 7, canvas_half_height + radius_px / 2 + 5);

    ctx.moveTo(canvas_half_width - 5, canvas_half_height + radius_px / 2);
    ctx.lineTo(canvas_half_width + 5, canvas_half_height + radius_px / 2);

    ctx.fillText(`${half_radius_string}`, canvas_half_width + 7, canvas_half_height - radius_px / 2 + 5);

    ctx.moveTo(canvas_half_width - 5, canvas_half_height - radius_px / 2);
    ctx.lineTo(canvas_half_width + 5, canvas_half_height - radius_px / 2);

    ctx.fillText(`${radius_string}`, canvas_half_width + 7, canvas_half_height - radius_px + 5);

    ctx.moveTo(canvas_half_width - 5, canvas_half_height - radius_px);
    ctx.lineTo(canvas_half_width + 5, canvas_half_height - radius_px);

    ctx.stroke();
    ctx.closePath();
}

function drawHit(x, y) {
    ctx.fillStyle = 'rgb(127, 255, 0)';

    ctx.beginPath();

    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.closePath();
}

function drawMiss(x, y) {
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.fillRect(x - 2, y - 2, 4, 4);
}

function drawUnknown(x, y) {
    ctx.fillStyle = 'rgb(255, 0, 255)';

    ctx.beginPath();

    ctx.moveTo(x, y + 4);
    ctx.lineTo(x - 3, y - 2);
    ctx.lineTo(x + 3, y - 2);
    ctx.lineTo(x, y + 4);
    ctx.fill();

    ctx.closePath();
}

function drawPoint(x, y, hit = false, relevant = true) {

    if (relevant) {
        if (hit) {
            drawHit(x, y);
        } else {
            drawMiss(x, y);
        }
    } else {
        drawUnknown(x, y);
    }
}

function drawPoints(radius_value = null) {
    if (radius_value === null) {
        return;
    }

    for (let i = 0; i < points_data.length; i++) {
        let point = points_data[i];
        let relevant = Math.abs(point.r - radius_value) < 0.001;

        //console.log(`${point.x}, ${point.y}, ${point.hit}, ${radius_value}`);
        drawPoint(canvas_half_width + point.x * radius_px / radius_value, canvas_half_height - point.y * radius_px / radius_value, point.hit, relevant);
    }
}

function updateCanvas(radius_value = null) {
    drawAreas(radius_value);
    drawPoints(radius_value);
}

function getLocalMousePos(mouse_event, element) {
    let bounds = element.getBoundingClientRect();
    return { x: mouse_event.clientX - bounds.left, y: mouse_event.clientY - bounds.top };
}

function onClickAreas() {
    if (r_value !== null && r_value > 0) {
        let pos = getLocalMousePos(event, canvas);

        //console.log(`pos=${pos.x}, ${pos.y}`);
        let k = r_value / radius_px;
        let x = k * (pos.x - canvas_half_width);
        let y = k * (canvas_half_height - pos.y);

        setHiddenX(x);
        setHiddenY(y);

        onSubmitForm();
    }
}