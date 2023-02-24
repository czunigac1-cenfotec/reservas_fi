package ac.cr.ucr.model;

public class ServiceResponse {

    private String errorCode;
    private String errorDescription;
    private String userMessage;

    public ServiceResponse() {
        this.errorCode = "";
        this.errorDescription = "";
        this.userMessage = "";
    }

    public ServiceResponse(String errorCode, String errorDescription, String userMessage) {
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
        this.userMessage = userMessage;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorDescription() {
        return errorDescription;
    }

    public void setErrorDescription(String errorDescription) {
        this.errorDescription = errorDescription;
    }

    public String getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(String userMessage) {
        this.userMessage = userMessage;
    }    
    
}
