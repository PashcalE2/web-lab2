package main.data;

import java.io.Serializable;

public class PointDataBean implements Serializable {
    private int id;
    private final AreaPoint point;
    private final String sendingTime;
    private final String executionTime;

    public PointDataBean(AreaPoint point, String sendingTime, String executionTime) {
        this.point = point;
        this.sendingTime = sendingTime;
        this.executionTime = executionTime;
    }

    public int getId() {
        return id;
    }

    public AreaPoint getPoint() {
        return point;
    }

    public String getSendingTime() {
        return sendingTime;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public void setId(int id) {
        this.id = id;
    }
}
