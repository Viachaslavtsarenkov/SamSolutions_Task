package by.tsarenkov.payment.config;

import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import java.util.HashMap;
import java.util.Map;

@Configuration
@PropertySource(value = "classpath:paypal.properties", encoding = "UTF-8")
public class PayPalConfig {

    @Autowired
    private Environment env;

    private static final  String CLIENT_ID = "paypal.client.id";
    private static final String CLIENT_SECRET = "paypal.client.secret";
    private static final String MODE = "paypal.mode";

    @Bean
    public Map<String, String> paypalSdkConfig() {
        Map<String, String> configMap = new HashMap<>();
        configMap.put("mode", env.getRequiredProperty(MODE));
        return configMap;
    }

    @Bean
    public OAuthTokenCredential authTokenCredential() {
        return new OAuthTokenCredential(env.getRequiredProperty(CLIENT_ID),
                env.getRequiredProperty(CLIENT_SECRET), paypalSdkConfig());
    }

    @Bean
    public APIContext apiContext() throws PayPalRESTException {
        APIContext context = new APIContext(authTokenCredential().getAccessToken());
        context.setConfigurationMap(paypalSdkConfig());
        return context;
    }

}
