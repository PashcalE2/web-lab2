<%@ page import="main.data.AreaPoint" %>
<%@ page import="main.data.PointDataBean" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="pointsBeans" class="main.data.TableBeans" scope="session"/>

<table id="result-table">
    <thead>
    <tr>
        <th>Номер точки</th>
        <th>Значение X</th>
        <th>Значение Y</th>
        <th>Значение R</th>
        <th>ОДЗ соблюдена</th>
        <th>Попадание</th>
        <th>Отправлено в</th>
        <th>Время работы скрипта, с</th>
    </tr>
    </thead>

    <tbody>
        <%
            for (PointDataBean bean : pointsBeans.getBeans()) {
                AreaPoint point = bean.getPoint();
        %>
        <tr>
            <td class="id"><%=bean.getId() %></td>
            <td class="x"><%=point.getX() %></td>
            <td class="y"><%=point.getY() %></td>
            <td class="r"><%=point.getR()%></td>
            <td class="valid"><%=point.isValid() ? "Да" : "Нет" %></td>
            <td class="hit"><%=point.isHit() ? "Да" : "Нет" %></td>
            <td class="sent-in"><%=bean.getSendingTime()%></td>
            <td class="exec-time"><%=bean.getExecutionTime()%></td>
        </tr>
        <%}%>
    </tbody>
</table>