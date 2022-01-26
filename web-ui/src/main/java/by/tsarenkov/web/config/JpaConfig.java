package by.tsarenkov.web.config;

import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableJpaRepositories(basePackages={"by.tsarenkov.db"})
@EnableTransactionManagement
public class JpaConfig {

    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUsername("user");
        dataSource.setPassword("1234");
        dataSource.setUrl("jdbc:postgresql://localhost:5432/book_store");
        dataSource.setDriverClassName("org.postgresql.Driver");

        return dataSource;
    }


    private Properties jpaProperties() {
        Properties extraProperties = new Properties();
        extraProperties.put("javax.persistence.jdbc.url", "jdbc:postgresql://localhost:5432/book_store");
        extraProperties.put("hibernate.format_sql", "true");
        extraProperties.put("hibernate.show_sql", "true");
        extraProperties.put("hibernate.hbm2ddl.auto", "update");
        return extraProperties;
    }


    @Bean
    public PlatformTransactionManager transactionManager() {
        return new JpaTransactionManager(entityManagerFactory().getObject());
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();

        factoryBean.setJpaVendorAdapter(vendorAdapter);

        factoryBean.setDataSource(dataSource());
        factoryBean.setPackagesToScan("by.tsarenkov.common.model.entity");
        factoryBean.setPersistenceProvider(new HibernatePersistenceProvider());
        factoryBean.setJpaProperties(jpaProperties());
        return factoryBean;
    }



}

