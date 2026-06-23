package org.agoncal.quarkus.microservices.book;

import jakarta.inject.Inject;
import jakarta.json.bind.JsonbBuilder;
import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
// ...existing code...
import org.jboss.logging.Logger;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.time.Instant;

@Path("/api/books")
@Tag(name="Book REST endpoint")
public class BookResource {

    @RestClient
    NumberProxy proxy;

    @Inject
    Logger logger;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Operation(
            summary = "Creates a book",
            description = "Creates a book with ISBN number"
    )
    @Retry(maxRetries = 3, delay = 1000)
    @Fallback(fallbackMethod = "fallbackOnCreatingABook")
    public Response createABook(@FormParam("title") String title, @FormParam("author") String author, @FormParam("year") int yearOfPublication, @FormParam("genre") String genre) {
        try {
            logger.info("Attempting to generate ISBN from: " + proxy.getClass().getName());
            Book book = new Book();
            IsbnThirteen isbnResponse = proxy.generateIsbnNumbers();
            logger.info("ISBN generated successfully: " + isbnResponse);
            book.isbn13 = isbnResponse.isbn13;
            book.title = title;
            book.author = author;
            book.yearOfPublication = yearOfPublication;
            book.genre = genre;
            book.creationDate = Instant.now();
            logger.info("Book created with ISBN: " + book.isbn13);
            return Response.status(201).entity(book).build();
        } catch (Exception e) {
            logger.error("Error creating book: " + e.getMessage(), e);
            throw e;
        }
    }

    public Response fallbackOnCreatingABook(String title, String author, int yearOfPublication, String genre) throws FileNotFoundException {
        logger.warn("Fallback triggered - ISBN generation failed");
        Book book = new Book();
        book.isbn13 = "Will be set later";
        book.title = title;
        book.author = author;
        book.yearOfPublication = yearOfPublication;
        book.genre = genre;
        book.creationDate = Instant.now();
        saveBookOnDisk(book);
        logger.warn("Book saved on disk: " + book);
        return Response.status(206).entity(book).build();
    }

    public void saveBookOnDisk(Book book) throws FileNotFoundException {
        String bookJson = JsonbBuilder.create().toJson(book);
        try (PrintWriter out = new PrintWriter("book" + Instant.now().toEpochMilli() + ".json")) {
            out.println(bookJson);
        }
    }
}
