package main.exception;

public class InvalidInputDataException extends RuntimeException {
    public InvalidInputDataException() {
        super("Invalid input data: x in [-2; 2], y in [-3; 5], r in [1; 3]");
    }
}
