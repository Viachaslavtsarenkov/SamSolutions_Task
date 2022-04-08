package by.tsarenkov.common.model.payload;

import by.tsarenkov.common.model.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class OrderPageResponse {
    private List<Order> orders;
    private Integer totalPages;
}
