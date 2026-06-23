package org.agoncal.quarkus.microservices.book;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;
import org.jboss.logging.Logger;

@ApplicationScoped
public class NumberProxyProducer {

    private static final Logger logger = Logger.getLogger(NumberProxyProducer.class);

    @ConfigProperty(name = "number.proxy/mp-rest/uri", defaultValue = "http://localhost:8701")
    String baseUri;

    @Produces
    @RestClient
    public NumberProxy numberProxy() {
        logger.info("Creating NumberProxy with baseUri: " + baseUri);
        // ResteasyClientBuilder is abstract; use the provided newBuilder() factory
        ResteasyClient client = (ResteasyClient) ResteasyClientBuilder.newBuilder().build();
        ResteasyWebTarget target = client.target(baseUri);
        return target.proxy(NumberProxy.class);
    }
}


