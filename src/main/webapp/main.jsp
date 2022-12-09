<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html" charset="utf-8">
	<title>Лаба 2</title>
	<link rel="stylesheet" href="css/styles.css">
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="js/client.js"></script>
	<script src="js/graphics.js"></script>
</head>

<body onload="init()">
<jsp:useBean id="pointsBeans" class="main.data.TableBeans" scope="session"/>
	<div class="max-sized" id="main">
		<div class="block" id="header">
			<header>
				Шипулин П.А. P32151 | Вариант: 5345
			</header>
		</div>

		<div id="app">
			<div class="block" id="frame-form">

				<canvas id="areas" onclick="onClickAreas()" width="400" height="400"></canvas>

				<div class="input">
					X<br>
					<table>
						<tr>
							<td>
								<label for="X1">-2</label>
								<input type="checkbox" id="X1" name="x-coordinate" value="-2" onclick="setXFromInput(this)">
							</td>

							<td>
								<label for="X2">-1.5</label>
								<input type="checkbox" id="X2" name="x-coordinate" value="-1.5" onclick="setXFromInput(this)">
							</td>

							<td>
								<label for="X3">-1</label>
								<input type="checkbox" id="X3" name="x-coordinate" value="-1" onclick="setXFromInput(this)">
							</td>

							<td>
								<label for="X4">-0.5</label>
								<input type="checkbox" id="X4" name="x-coordinate" value="-0.5" onclick="setXFromInput(this)">
							</td>

							<td>
								<label for="X5">0</label>
								<input type="checkbox" id="X5" name="x-coordinate" value="0" onclick="setXFromInput(this)">
							</td>

							<td>
								<label for="X6">0.5</label>
								<input type="checkbox" id="X6" name="x-coordinate" value="0.5" onclick="setXFromInput(this)">
							</td>

							<td>
								<label for="X7">1</label>
								<input type="checkbox" id="X7" name="x-coordinate" value="1" onclick="setXFromInput(this)">
							</td>

							<td>
								<label for="X8">1.5</label>
								<input type="checkbox" id="X8" name="x-coordinate" value="1.5" onclick="setXFromInput(this)">
							</td>

							<td>
								<label for="X9">2</label>
								<input type="checkbox" id="X9" name="x-coordinate" value="2" onclick="setXFromInput(this)">
							</td>
						</tr>
					</table>
				</div>

				<div class="input">
					<label for="Y">Y</label>
					<input type="text" id="Y" name="y-coordinate"  class="empty-field" placeholder="[-3; 5]" maxlength="7" oninput="setYFromInput()">
				</div>

				<div class="input">
					R<br>
					<input type="button" value="1" id="R1" name="radius" class="radius" onclick="setRFromInput(this)">

					<input type="button" value="1.5" id="R2" name="radius" class="radius" onclick="setRFromInput(this)">

					<input type="button" value="2" id="R3" name="radius" class="radius" onclick="setRFromInput(this)">

					<input type="button" value="2.5" id="R4" name="radius" class="radius" onclick="setRFromInput(this)">

					<input type="button" value="3" id="R5" name="radius" class="radius" onclick="setRFromInput(this)">
				</div>

				<div class="input">
					<form id="dataform" style="margin-block-end: 0;" onsubmit="onSubmitForm()">
						<input type="submit" id="send" value="Отправить">
						<input type="hidden" autocomplete="off" id="x-hidden" name="x-input" value="">
						<input type="hidden" autocomplete="off" id="y-hidden" name="y-input" value="">
						<input type="hidden" autocomplete="off" id="r-hidden" name="r-input" value="">
					</form>
				</div>

				<div class="input">
					<form id="clearform" onsubmit="onClearTable()">
						<input type="submit" id="clear" value="Очистить историю">
						<input type="hidden" autocomplete="off" id="clear-req" name="clear" value="1">
					</form>
				</div>
			</div>

			<div class="block" id="result-block">
				<jsp:include page="table.jsp"/>
			</div>
		</div>
	</div>

</body>

</html>
