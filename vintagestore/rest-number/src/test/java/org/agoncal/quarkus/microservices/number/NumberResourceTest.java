package org.agoncal.quarkus.microservices.number;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class NumberResourceTest {
    @Test
    void testHelloEndpoint() {
        given()
          .when().get("/api/numbers")
          .then()
             .statusCode(200)
             .body(is("Hello RESTEasy"));
    }

}