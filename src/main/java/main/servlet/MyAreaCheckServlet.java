package main.servlet;

import main.data.AreaPoint;
import main.data.PointDataBean;
import main.data.TableBeans;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import main.exception.InvalidInputDataException;

import java.io.IOException;
import java.time.DateTimeException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public class MyAreaCheckServlet extends HttpServlet {
    private ServletConfig config;

    @Override
    public void init(ServletConfig config) {
        this.config = config;
    }

    @Override
    public void destroy() {}

    @Override
    public ServletConfig getServletConfig()
    {
        return config;
    }

    static boolean isValid(double x, double y, double r) {
        return  (x >= -2) && (x <= 2) &&
                (y >= -3) && (y <= 5) &&
                (r >= 1) && (r <= 3);
    }

    static boolean checkArea(double x, double y, double r) {

        boolean area1 = (x <= 0) && (y >= 0) && (y <= 2 * x + r);
        boolean area2 = (x >= -r / 2) && (x <= 0) && (y <= 0) && (y >= -r);
        boolean area3 = (x >= 0) && (y <= 0) && (x * x + y * y <= r * r);

        return area1 || area2 || area3;
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getServletContext().getRequestDispatcher("/main.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        long startTime = System.nanoTime();
        TableBeans beans = (TableBeans) request.getSession().getAttribute("pointsBeans");

        try {
            double x = Double.parseDouble(request.getParameter("x-input"));
            double y = Double.parseDouble(request.getParameter("y-input").trim());
            double r = Double.parseDouble(request.getParameter("r-input"));

            if (!isValid(x, y, r)) {
                throw new InvalidInputDataException();
            }

            AreaPoint p = new AreaPoint(x, y, r);
            p.setHit(checkArea(x, y, r));

            OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
            String sendingTime;

            try {
                sendingTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            } catch (DateTimeException exception) {
                sendingTime = currentTimeObject.toString();
            }

            String executionTime = String.format("%.9f", (System.nanoTime() - startTime) / 1e9);

            beans.addBean(new PointDataBean(p, sendingTime, executionTime));
        } finally {
            response.setContentType("text/html; charset=UTF-8");
            request.getServletContext().getRequestDispatcher("/table.jsp").forward(request, response);
        }
    }
}
