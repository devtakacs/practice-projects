package org.agoncal.quarkus.starting;

import io.quarkus.test.junit.NativeImageTest;

@NativeImageTest
class BookResourceIT extends BookResourceTest {
    // Execute the same tests but in packaged mode.
}
