package ac.cr.ucr.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertyManager {

    public static String LDAP_PROP_FILE = "ldap.properties";

    /*LDAP CONFIG*/
    public static String LDAP_PROP_SERVICE_USR = "ldap.service.user.dn";
    public static String LDAP_PROP_SERVICE_PASS = "ldap.service.user.password";
    public static String LDAP_PROP_USR_IDNT = "ldap.user.identifying-attribute";
    public static String LDAP_PROP_USR_BASE = "ldap.user.base ";
    public static String LDAP_PROP_CONF_ADDRESS = "ldap.config.address";
    public static String LDAP_PROP_CONF_ADDRESS_PREFIX = "ldap.config.address.prefix";
    public static String LDAP_PROP_CONF_PORT = "ldap.config.port";
    public static String LDAP_PROP_DEV_MODE = "ldap.dev-mode";

    public static String GetStringValue(String file, String key) {
        
        Properties properties = new Properties();
        String value = "";

        try (InputStream input = PropertyManager.class.getClassLoader().getResourceAsStream(file)) {

            if(null!=input){
                properties.load(input);
                value = properties.getProperty(key);
            }

        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return value;
    }

    public static boolean GetBooleanValue(String file, String key) {
        
        Properties properties = new Properties();
        Boolean value = false;
        String stringValue = "";

        try (InputStream input = PropertyManager.class.getClassLoader().getResourceAsStream(file)) {

            if(null!=input){
                properties.load(input);
                stringValue = properties.getProperty(key);
                value = stringValue.trim() != null && stringValue.trim().equals("true") ? true : false;
            }

        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return value;
    }
}
