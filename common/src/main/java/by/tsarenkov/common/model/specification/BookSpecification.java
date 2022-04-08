package by.tsarenkov.common.model.specification;

import by.tsarenkov.common.model.criteria.SearchCriteria;
import by.tsarenkov.common.model.entity.Book;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class BookSpecification implements Specification<Book> {
    private SearchCriteria criteria;

    public BookSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Book> root, CriteriaQuery<?> query,
                                 CriteriaBuilder builder) {
            if (criteria.getOperation().equalsIgnoreCase("<>")) {
                Double minPrice = Double.valueOf(criteria.getValue().toString().split("_")[0]);
                Double maxPrice = Double.valueOf(criteria.getValue().toString().split("_")[1]);
                return builder.between(root.<Double> get(criteria.getKey()),minPrice, maxPrice);
            } else if (criteria.getOperation().equalsIgnoreCase("~")) {
                return builder.equal(
                        root.<Boolean> get(criteria.getKey()), true);
            } else if (criteria.getOperation().equalsIgnoreCase(":")) {
                if (root.get(criteria.getKey()).getJavaType() == String.class) {
                    return builder.like(
                            root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
                } else {
                    return builder.equal(root.get(criteria.getKey()), criteria.getValue());
                }
            }
            return null;
    }
}
