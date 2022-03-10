package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Sale;
import by.tsarenkov.service.SaleService;
import by.tsarenkov.service.impl.SaleServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping()
@AllArgsConstructor
public class SaleController {

    private static final String SALE_MAPPING = "/sales";
    private static SaleServiceImpl saleService;


    @PostMapping(SALE_MAPPING)
    public ResponseEntity<?> saveNewSale(@RequestBody Sale sale) {
        System.out.println(sale);
        saleService.saveSale(sale);
        return null;
    }
}
