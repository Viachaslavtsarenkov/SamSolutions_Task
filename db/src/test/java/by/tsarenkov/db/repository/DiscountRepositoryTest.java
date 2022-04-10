package by.tsarenkov.db.repository;


import by.tsarenkov.common.model.entity.Discount;
import by.tsarenkov.db.config.JpaTestConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { JpaTestConfig.class })
public class DiscountRepositoryTest {

    @Autowired
    private DiscountRepository discountRepository;
    private final Discount discount = Discount.builder()
            .discountFactor(0.2)
            .name("New Year")
            .build();

    @Test
    public void ShouldSaveDiscount() {
        discountRepository.save(discount);
        assertThat(discount.getId()).isNotEqualTo(0);
    }
}
