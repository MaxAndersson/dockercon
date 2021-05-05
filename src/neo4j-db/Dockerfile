FROM neo4j:latest
COPY recommendations-40.dump .
ENV NEO4J_AUTH=neo4j/letmein
RUN bin/neo4j-admin load --from recommendations-40.dump

