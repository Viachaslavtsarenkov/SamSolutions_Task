package by.tsarenkov.db.config;

import org.hibernate.jpa.HibernatePersistenceProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableJpaRepositories(basePackages={"by.tsarenkov.db"})
@EnableTransactionManagement
@PropertySource(value = "classpath:db.properties", encoding = "UTF-8")
public class JpaConfig {

    private static Logger LOGGER = LoggerFactory.getLogger(JpaConfig.class);
    private static final String USER_KEY = "spring.datasource.username";
    private static final String PASSWORD_KEY = "spring.datasource.password";
    private static final String URL_KEY = "spring.datasource.url";
    private static final String DRIVER_KEY = "spring.datasource.driver-class-name";

    @Autowired
    private Environment env;

    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUsername(env.getRequiredProperty(USER_KEY));
        dataSource.setPassword(env.getRequiredProperty(PASSWORD_KEY));
        dataSource.setUrl(env.getRequiredProperty(URL_KEY));
        dataSource.setDriverClassName(env.getRequiredProperty(DRIVER_KEY));

        return dataSource;
    }


    private Properties jpaProperties() {
        Properties extraProperties = new Properties();
        extraProperties.put("javax.persistence.jdbc.url", env.getRequiredProperty(URL_KEY));
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
