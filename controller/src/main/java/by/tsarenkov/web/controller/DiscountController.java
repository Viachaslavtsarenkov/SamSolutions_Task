package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Discount;
import by.tsarenkov.common.model.payload.DiscountPageResponse;
import by.tsarenkov.service.DiscountService;
import by.tsarenkov.service.exception.DiscountNotFoundException;
import by.tsarenkov.web.controller.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@RestController
@RequiredArgsConstructor
public class DiscountController {

    private static final String DISCOUNT_MAPPING = "/discounts";
    private static final String DISCOUNT_MAPPING_BY_ID = "/discounts/{id}";

    private final DiscountService discountService;

    @PostMapping(value = DISCOUNT_MAPPING)
    public ResponseEntity<?> saveNewDiscount(@RequestBody Discount discount) {
        discountService.saveSale(discount);
        return ResponseEntity.ok().body(discount.getId());
    }

    @PatchMapping(DISCOUNT_MAPPING_BY_ID)
    public void updateDiscount(@PathVariable Long id,
                                        @RequestBody Discount discount) {
        discountService.updateSale(discount);
    }

    @DeleteMapping(DISCOUNT_MAPPING_BY_ID)
    public ResponseEntity<?> deleteDiscount(@PathVariable Long id) {
        discountService.deleteSale(id);
        return ResponseEntity.ok().body(new MessageResponse("sale was deleted"));
    }

    @GetMapping(DISCOUNT_MAPPING_BY_ID)
    public ResponseEntity<?> findDiscount(@PathVariable Long id)
            throws DiscountNotFoundException {
        return ResponseEntity.ok().body(discountService.getSaleById(id));
    }

    @GetMapping(DISCOUNT_MAPPING)
    public DiscountPageResponse findAllDiscounts(@RequestParam(value = "page"
            , required = false, defaultValue = "0") Integer page,
                                             @RequestParam(value = "size",
                                                 required = false,
                                                 defaultValue = "10") Integer size) {
        return discountService.findAllDiscounts(page, size);
    }

    @GetMapping("/discounts/check")
    public ResponseEntity<?> checkBookOnDiscount(@RequestParam(value = "id") Long bookId,
                                   @RequestParam(value = "startDate") Date startDate,
                                   @RequestParam(value = "endDate") Date endDate) {
        return  ResponseEntity.ok()
                .body(discountService.existsBookOnDiscount(bookId, startDate, endDate));
    }
}
