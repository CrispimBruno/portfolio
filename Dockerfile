# ---------- 1) build: compila o projeto com Maven ----------
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# copia só o pom primeiro: o Docker reaproveita o cache das dependências
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

COPY src ./src
RUN mvn -B -q -DskipTests package && cp target/*.jar app.jar

# ---------- 2) runtime: imagem leve, só com o Java ----------
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/app.jar app.jar

# o Render define a variável PORT; localmente cai em 8080
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -XX:MaxRAMPercentage=75 -Dserver.port=${PORT:-8080} -jar app.jar"]
