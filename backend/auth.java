import java.util.Hashtable;
import java.util.Properties;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

public class auth {

	public static void main(String[] args) {
		performAuthentication();
	}

	public static void testLDAPConnection() {
		
		Hashtable env = new Hashtable();

		env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
		env.put(Context.PROVIDER_URL, "ldaps://ldap2.ucr.ac.cr;636");
		env.put(Context.SECURITY_AUTHENTICATION, "simple");
		env.put(Context.SECURITY_PRINCIPAL, "uid=LDAP.FING,ou=Special Users,dc=ucr,dc=ac,dc=cr");
		env.put(Context.SECURITY_CREDENTIALS, "DLf896mVC");

		try {
			// bind to the domain controller
			LdapContext ctx = new InitialLdapContext(env, null);
			ctx = new InitialLdapContext(env, null);
			System.out.println("LDAP Connection Successful");
			System.exit(0);
		} catch (NamingException e) {
			System.err.println("LDAP Notifications failure. " + e);
			System.exit(1);
		}
		
	}
	
	public static boolean performAuthentication() {

	    // service user
	    String serviceUserDN = "uid=LDAP.FING,ou=Special Users,dc=alpha,dc=ucr,dc=ac,dc=cr";
	    String serviceUserPassword = "3sN5.f82q";

	    // user to authenticate
	    String identifyingAttribute = "uid";
	    String identifier = "AXL.ROSE";
	    String password = "4xl.R0S3";
	    String base = "dc=alpha,dc=ucr,dc=ac,dc=cr";

	    // LDAP connection info
	    String ldap = "172.31.20.51";
	    int port = 389;
	    String ldapUrl = "ldap://" + ldap + ":" + port;

	    // first create the service context
	    DirContext serviceCtx = null;
	    try {
            System.out.println("STEP 1");
	        // use the service user to authenticate
	        Properties serviceEnv = new Properties();
	        serviceEnv.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
	        serviceEnv.put(Context.PROVIDER_URL, ldapUrl);
	        serviceEnv.put(Context.SECURITY_AUTHENTICATION, "simple");
	        serviceEnv.put(Context.SECURITY_PRINCIPAL, serviceUserDN);
	        serviceEnv.put(Context.SECURITY_CREDENTIALS, serviceUserPassword);
	        serviceCtx = new InitialDirContext(serviceEnv);

            System.out.println("STEP 2");
	        
	        // we don't need all attributes, just let it get the identifying one
	        String[] attributeFilter = { identifyingAttribute };
	        SearchControls sc = new SearchControls();
	        sc.setReturningAttributes(attributeFilter);
	        sc.setSearchScope(SearchControls.SUBTREE_SCOPE);
	        
            System.out.println("STEP 3");

	        // use a search filter to find only the user we want to authenticate
	        String searchFilter = "(" + identifyingAttribute + "=" + identifier + ")";
	        NamingEnumeration<SearchResult> results = serviceCtx.search(base, searchFilter, sc);

	        System.out.println("STEP 3.1 -> searchFilter-> " + searchFilter);
	        System.out.println("STEP 3.2 -> base -> " + base);
	        System.out.println("STEP 3.3 -> SearchControls -> " + sc.getReturningAttributes()[0]);
	        
	        
            System.out.println("STEP 4");
	        System.out.println("STEP 4.1 -> results" + results.toString());
	        
	        if (results.hasMore()) {
	        	
	            System.out.println("STEP 5");
	            
	            // get the users DN (distinguishedName) from the result
	            SearchResult result = results.next();
	            String distinguishedName = result.getNameInNamespace();


	            System.out.println("distinguishedName -> " + distinguishedName);
	            System.out.println("ldapUrl -> " + ldapUrl);
	            System.out.println("password -> "+ password);
	            

	            System.out.println("STEP 6");
	            
	            // attempt another authentication, now with the user
	            Properties authEnv = new Properties();
	            authEnv.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
	            authEnv.put(Context.PROVIDER_URL, ldapUrl);
	            authEnv.put(Context.SECURITY_AUTHENTICATION, "simple");
	            authEnv.put(Context.SECURITY_PRINCIPAL, distinguishedName);
	            authEnv.put(Context.SECURITY_CREDENTIALS, password);
	            new InitialDirContext(authEnv);
	            

	            System.out.println("STEP 7");

	            System.out.println("Authentication successful");
	            return true;
	        }
	        

            System.out.println("STEP 8");
            
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        if (serviceCtx != null) {
	            try {
	                serviceCtx.close();
	            } catch (NamingException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	    System.err.println("Authentication failed");
	    return false;
	}

}
