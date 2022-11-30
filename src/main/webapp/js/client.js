const num_re = /^-?\d+(?:[\.,]\d+)?$/m
const YMin = -10;
const YMax = 10;

let last_x_checkbox = null;
let y_textbox = null;
let last_radius_button = null;

let x_hidden = null;
let x_value = null;

let y_hidden = null;
let y_value = null;

let r_hidden = null;
let r_value = null;

let points_data = [];

function init() {
    y_textbox = document.getElementById("Y");

    x_hidden = document.getElementById("x-hidden");
    y_hidden = document.getElementById("y-hidden");
    r_hidden = document.getElementById("r-hidden");

    initCanvas(document.getElementById("areas"));
}

function isWrongNumber(str_num) {
  return num_re.exec(str_num) == null
}

function isWrongXInput() {
  return last_x_checkbox === null || !last_x_checkbox.checked || x_value === null;
}

function isWrongYInput() {
  if (isWrongNumber(y_textbox.value)) {
    return true;
  } else {
    const num = parseFloat(y_textbox.value.replace(",", "."));
    return num < YMin || num > YMax;
  }
}

function isWrongRInput() {
  return last_radius_button === null;
}

function setHiddenX(str_value = "") {
  x_hidden.value = str_value;
  x_value = parseFloat(str_value);
}

function onClickX(element) {
  if (last_x_checkbox !== null && last_x_checkbox !== element) {
    last_x_checkbox.checked = false;
    setHiddenX();
  }

  last_x_checkbox = element;

  if (element.checked) {
    setHiddenX(element.value);
  }
}

function setHiddenY(str_value = "") {
  y_hidden.value = str_value;
  y_value = parseFloat(str_value);
}

function onYInput() {
  if (y_textbox.value.length && isWrongYInput()) {
    y_textbox.className = "wrong-field";
    setHiddenY();
  } else if (y_textbox.value.length) {
    y_textbox.className = "correct-field";
    setHiddenY(y_textbox.value);
  } else {
    y_textbox.className = "empty-field";
  }
}

function setHiddenR(str_value = "") {
  r_hidden.value = str_value;
  r_value = parseFloat(str_value);
}

function onClickRadius(element) {
  if (last_radius_button !== null) {
    last_radius_button.className = "radius";
  }

  element.className = "radius-checked";
  last_radius_button = element;
  setHiddenR(element.value);
  updateCanvas(r_value);
}

function listHasNull(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === null) {
      return true;
    }
  }

  return false;
}

function onSubmitForm() {
  event.preventDefault();
  let send_button = $("#send")

  if (send_button.getAttribute("disabled") === true) {
    return;
  }

  let isError = listHasNull([x_value, y_value, r_value]) && (isWrongXInput() || isWrongYInput() || isWrongRInput());

  if (isError) {
    return isError;
  }

  send_button.attr("disabled", true);

  let data_serialize = $("#dataform").serialize() + "&timezone=" + new Date().getTimezoneOffset();
  console.log(data_serialize);

  $.ajax({
    url: 'control',
    method: "POST",
    data: data_serialize,
    dataType: "html",

    success: function (data) {
      //console.log(data);
      $("#send").attr("disabled", false);
      $("#result-block").html(data);
      loadPoints();
      updateCanvas(r_value);

      // redo
      setHiddenX();
      setHiddenY();
      setHiddenR();
    },
    error: function (error) {
      console.log(error);
      $("#send").attr("disabled", false);
    },
  });
}

function onClearTable() {
  event.preventDefault();

  let data_serialize = $("#clearform").serialize();
  $.ajax({
    url: 'control',
    method: "POST",
    data: data_serialize,
    dataType: "html",

    success: function (data) {
      //console.log(data);
      $("#send").attr("disabled", false);
      $("#result-block").html(data);
      loadPoints();
      updateCanvas(r_value);
    },
    error: function (error) {
      console.log(error);
      $("#send").attr("disabled", false);
    },
  });
}