package com.bugtracker.bugmanager.exceptions;

public class ResourceNotFoundException extends RuntimeException{
    String  resourceName;
    String fieldName;
    long fieldValue;

//    public ResourceNotFoundException(String fieldName, long fieldValue, String resourceName) {
//        this.fieldName = fieldName;
//        this.fieldValue = fieldValue;
//        this.resourceName = resourceName;
//    }

    public ResourceNotFoundException(String resourceName, String fieldName, long fieldValue) {
        super(String.format("%s not found with %s : %s",resourceName,fieldName,fieldValue));
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        this.resourceName = resourceName;
    }

    public ResourceNotFoundException(String message, String fieldName, long fieldValue, String resourceName) {
        super(message);
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        this.resourceName = resourceName;
    }

    public ResourceNotFoundException(String message, Throwable cause, String fieldName, long fieldValue, String resourceName) {
        super(message, cause);
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        this.resourceName = resourceName;
    }

    public ResourceNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, String fieldName, long fieldValue, String resourceName) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        this.resourceName = resourceName;
    }
}
