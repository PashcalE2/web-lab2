package main.data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class TableBeans implements Serializable {
    private int next_id = 0;
    private final List<PointDataBean> data;

    public TableBeans() {
        data = new ArrayList<>();
    }

    public void addBean(PointDataBean bean) {
        bean.setId(next_id);
        data.add(bean);
        next_id++;
    }

    public List<PointDataBean> getBeans() {
        return data;
    }
}
