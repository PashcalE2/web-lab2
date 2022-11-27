package main.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import main.data.TableBeans;

import java.io.IOException;


public class MyControllerServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getServletContext().getRequestDispatcher("/main.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String xString = request.getParameter("x-input");
        String yString = request.getParameter("y-input");
        String RString = request.getParameter("r-input");
        String clear = request.getParameter("clear");

        // просим проверить точку
        if (xString != null && yString != null && RString != null) {
            request.getServletContext().getRequestDispatcher("/check").forward(request, response);
        }
        // просим очистить результаты
        else if (clear != null) {
            TableBeans beans = (TableBeans) request.getSession().getAttribute("pointsBeans");
            if (beans == null) beans = new TableBeans();
            beans.getBeans().clear();

            request.getSession().setAttribute("pointsBeans", beans);
            getServletContext().getRequestDispatcher("/table.jsp").forward(request, response);
        }
        // кринж, возвращаемся
        else {
            request.getServletContext().getRequestDispatcher("/main.jsp").forward(request, response);
        }


    }

}
