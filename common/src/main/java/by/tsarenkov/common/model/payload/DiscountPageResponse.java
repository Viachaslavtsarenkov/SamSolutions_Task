package by.tsarenkov.common.model.payload;

import by.tsarenkov.common.model.entity.Discount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class DiscountPageResponse {
    private List<Discount> discounts;
    private Integer totalPages;
}
