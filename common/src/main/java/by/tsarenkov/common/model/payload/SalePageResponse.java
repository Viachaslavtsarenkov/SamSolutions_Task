package by.tsarenkov.common.model.payload;

import by.tsarenkov.common.model.entity.Sale;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SalePageResponse {
    private List<Sale> sales;
    private Integer totalPages;
}
