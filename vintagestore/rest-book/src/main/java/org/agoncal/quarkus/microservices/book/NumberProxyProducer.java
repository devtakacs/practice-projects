package org.agoncal.quarkus.microservices.book;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;

@ApplicationScoped
public class NumberProxyProducer {

    @ConfigProperty(name = "org.agoncal.quarkus.microservices.book.NumberProxy/mp-rest/uri")
    String baseUri;

    @Produces
    @RestClient
    public NumberProxy numberProxy() {
        // ResteasyClientBuilder is abstract; use the provided newBuilder() factory
        ResteasyClient client = (ResteasyClient) ResteasyClientBuilder.newBuilder().build();
        ResteasyWebTarget target = client.target(baseUri);
        return target.proxy(NumberProxy.class);
    }
}


