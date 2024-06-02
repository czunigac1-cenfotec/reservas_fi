package ac.cr.ucr.controller;

import java.util.Properties;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ac.cr.ucr.model.UserLogin;
import ac.cr.ucr.model.UserLoginResponse;
import ac.cr.ucr.util.PropertyManager;

@RequestMapping("/userLogin")
@CrossOrigin
@RestController
public class UserLoginController {
    
    private final String LOGIN_ERROR_CODE = "USER_LOGIN_001";
    
    private static String ldapServiceUser = "";
    private static String ldapServicePassword = "";
    private static String ldapUserIdentifying = "";
    private static String ldapUserBase = "";
    private static String ldapConfigAddress = "";
    private static String ldapConfigAddressPrefix = "";
    private static String ldapConfigPort = "";
    private static String ldapUrl = "";
    private static Boolean ldapDevMode = false; 

    @PostMapping
    public UserLoginResponse login(@RequestBody UserLogin userLogin) {

        UserLoginResponse response = new UserLoginResponse();
        DirContext serviceCtx = null;
        
        try {
            
            getConfig();

            System.out.println("debug-> ldapDevMode"  + " | " + ldapDevMode.toString() );

            if(!ldapDevMode){
                
                Properties serviceEnv = new Properties();
                serviceEnv.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
                serviceEnv.put(Context.PROVIDER_URL, ldapUrl);
                serviceEnv.put(Context.SECURITY_AUTHENTICATION, "simple");
                serviceEnv.put(Context.SECURITY_PRINCIPAL, ldapServiceUser);
                serviceEnv.put(Context.SECURITY_CREDENTIALS, ldapServicePassword);
                serviceCtx = new InitialDirContext(serviceEnv);
    
                // we don't need all attributes, just let it get the identifying one
                String[] attributeFilter = { ldapUserIdentifying };
                SearchControls sc = new SearchControls();
                sc.setReturningAttributes(attributeFilter);
                sc.setSearchScope(SearchControls.SUBTREE_SCOPE);

    
                System.out.println("debug-> userLogin.getUserName()"  + " | " + userLogin.getUserName() );
                System.out.println("debug-> userLogin.getUserName()"  + " | " + userLogin.getUserName() );
                    
                // use a search filter to find only the user we want to authenticate
                String searchFilter = "(" + ldapUserIdentifying + "=" + userLogin.getUserName() + ")";
                NamingEnumeration<SearchResult> results = serviceCtx.search(ldapUserBase, searchFilter, sc);
                
                System.out.println("debug-> searchFilter"  + " | " + searchFilter );

                if (results.hasMore()) {
                    
                    // get the users DN (distinguishedName) from the result
                    SearchResult result = results.next();
                    String distinguishedName = result.getNameInNamespace();

                    System.out.println("debug-> distinguishedName"  + " | " + distinguishedName );
                    
                    // attempt another authentication, now with the user
                    Properties authEnv = new Properties();
                    authEnv.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
                    authEnv.put(Context.PROVIDER_URL, ldapUrl);
                    authEnv.put(Context.SECURITY_AUTHENTICATION, "simple");
                    authEnv.put(Context.SECURITY_PRINCIPAL, distinguishedName);
                    authEnv.put(Context.SECURITY_CREDENTIALS, userLogin.getPassword());
                    new InitialDirContext(authEnv);
                    
                    response.setUserMessage("Authentication successful");
                    response.setIsUserAuthorized(true);
                }   
            }else{
                response.setIsUserAuthorized(true);
            }
        } catch (Exception e) {
            response.setErrorCode(LOGIN_ERROR_CODE);
            response.setErrorDescription(e.getMessage());
            response.setErrorDescription(e.toString());
        }

        return response;
    }

    private static void getConfig()
    {
        ldapServiceUser = PropertyManager.GetStringValue(PropertyManager.LDAP_PROP_FILE, PropertyManager.LDAP_PROP_SERVICE_USR);
        ldapServicePassword = PropertyManager.GetStringValue(PropertyManager.LDAP_PROP_FILE, PropertyManager.LDAP_PROP_SERVICE_PASS);
        ldapUserIdentifying = PropertyManager.GetStringValue(PropertyManager.LDAP_PROP_FILE, PropertyManager.LDAP_PROP_USR_IDNT);
        ldapUserBase = PropertyManager.GetStringValue(PropertyManager.LDAP_PROP_FILE, PropertyManager.LDAP_PROP_USR_BASE);
        ldapConfigAddress = PropertyManager.GetStringValue(PropertyManager.LDAP_PROP_FILE, PropertyManager.LDAP_PROP_CONF_ADDRESS);
        ldapConfigAddressPrefix = PropertyManager.GetStringValue(PropertyManager.LDAP_PROP_FILE, PropertyManager.LDAP_PROP_CONF_ADDRESS_PREFIX);
        ldapConfigPort = PropertyManager.GetStringValue(PropertyManager.LDAP_PROP_FILE, PropertyManager.LDAP_PROP_CONF_PORT);
        ldapDevMode = PropertyManager.GetBooleanValue(PropertyManager.LDAP_PROP_FILE, PropertyManager.LDAP_PROP_DEV_MODE);

        System.out.println("debug-> ldapServiceUser"  + " | " + ldapServiceUser );
        System.out.println("debug-> ldapServicePassword"  + " | " + ldapServicePassword );            
        System.out.println("debug-> ldapUserIdentifying"  + " | " + ldapUserIdentifying );
        System.out.println("debug-> ldapConfigAddress"  + " | " + ldapConfigAddress );
        System.out.println("debug-> ldapConfigAddressPrefix"  + " | " + ldapConfigAddressPrefix );
        System.out.println("debug-> ldapConfigPort"  + " | " + ldapConfigPort );

        ldapUrl = ldapConfigAddressPrefix + ldapConfigAddress + ":" + ldapConfigPort;
    }
}
