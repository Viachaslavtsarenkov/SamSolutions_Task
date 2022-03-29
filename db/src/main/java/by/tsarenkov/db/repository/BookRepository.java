package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.enumeration.UserStatus;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNullApi;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BookRepository extends CrudRepository<Book, Long>, JpaSpecificationExecutor<Book> {
    List<Book> findBookByNameContaining(String name);
    List<Book> findAllByIdIn(Set<Long> ids);
    @Modifying
    @Query("update Book book set book.inStock = :inStock where book.id = :id")
    void changeInStockStatus(@Param(value = "inStock") Boolean inStock ,
                      @Param(value = "id") Long id);
    Page<Book> findAll(@Nullable Specification<Book> spec, @NotNull Pageable pageable);
    //Integer countAll(Specification<Book> spec);
}
