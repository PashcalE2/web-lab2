package main.data;

import java.io.Serializable;

public class AreaPoint implements Serializable {
    private final double x;
    private final double y;
    private final double R;
    private boolean hit;

    public AreaPoint(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.R = r;
        hit = false;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return R;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }
}
