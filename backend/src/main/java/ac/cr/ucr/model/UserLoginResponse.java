package ac.cr.ucr.model;

public class UserLoginResponse extends ServiceResponse {

    private Boolean isUserAuthorized;

    public UserLoginResponse() {
        this.isUserAuthorized = false;
    }

    public UserLoginResponse(Boolean isUserAuthorized) {
        this.isUserAuthorized = isUserAuthorized;
    }

    public UserLoginResponse(String errorCode, String errorDescription, String userMessage, Boolean isUserAuthorized) {
        super(errorCode, errorDescription, userMessage);
        this.isUserAuthorized = isUserAuthorized;
    }

    public Boolean getIsUserAuthorized() {
        return isUserAuthorized;
    }

    public void setIsUserAuthorized(Boolean isUserAuthorized) {
        this.isUserAuthorized = isUserAuthorized;
    }
    
}
