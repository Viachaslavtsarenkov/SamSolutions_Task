package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Sale;
import by.tsarenkov.common.model.payload.SalePageResponse;
import by.tsarenkov.service.exception.SaleNotFoundException;
import by.tsarenkov.service.impl.SaleServiceImpl;
import by.tsarenkov.web.controller.response.MessageResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class SaleController {

    private static final String SALE_MAPPING = "/sales";
    private static final String SALE_MAPPING_BY_ID = "/sales/{id}";

    @Autowired
    private static SaleServiceImpl saleService;

    @PostMapping(SALE_MAPPING_BY_ID)
    public ResponseEntity<?> saveNewSale(@PathVariable Long id,
                                         @RequestBody Sale sale) {
        saleService.saveSale(sale);
        return null;
    }

    @PatchMapping(SALE_MAPPING_BY_ID)
    public ResponseEntity<?> updateSale(@PathVariable Long id,
                                        @RequestBody Sale sale) {
        saleService.updateSale(sale);
        return null;
    }

    @DeleteMapping(SALE_MAPPING_BY_ID)
    public ResponseEntity<?> deleteSale(@PathVariable Long id) {
        saleService.deleteSale(id);
        return ResponseEntity.ok().body(new MessageResponse("sale was deleted"));
    }

    @GetMapping(SALE_MAPPING_BY_ID)
    public ResponseEntity<?> getSale(@PathVariable Long id) throws SaleNotFoundException {
        return ResponseEntity.ok().body(saleService.getSaleById(id));
    }

    @GetMapping(SALE_MAPPING)
    public SalePageResponse getAllSales(@RequestParam(value = "page") Integer page) {
        saleService.getSales(page);
        return saleService.getSales(page);
    }
}
