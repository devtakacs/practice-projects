package org.agoncal.quarkus.microservices.number;

import java.time.Instant;

public class IsbnNumbers {
    public String isbn13;
    public String isbn10;
    public Instant generationDate;

    @java.lang.Override
    public java.lang.String toString() {
        return "IsbnNumbers{" +
                "isbn13='" + isbn13 + '\'' +
                ", isbn10='" + isbn10 + '\'' +
                ", generationDate=" + generationDate +
                '}';
    }
}
