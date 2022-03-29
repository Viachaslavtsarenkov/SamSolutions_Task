package by.tsarenkov.common.model.criteria;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SearchCriteria {
    private String key;
    private String operation;
    private Object value;
    public boolean isOrPredicate() {
        return true;
    }
}
