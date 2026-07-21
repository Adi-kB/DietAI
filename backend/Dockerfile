FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Install maven directly on the Linux container
RUN apt-get update && apt-get install -y maven

COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]