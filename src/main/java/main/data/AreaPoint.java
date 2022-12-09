package main.data;

import java.io.Serializable;

public class AreaPoint implements Serializable {
    private final double x;
    private final double y;
    private final double R;
    private boolean valid;
    private boolean hit;

    public AreaPoint(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.R = r;
        valid = true;
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

    public boolean isValid() {
        return valid;
    }

    public boolean isHit() {
        return hit;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

}
