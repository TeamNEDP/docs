FROM peaceiris/mdbook:v0.4.21 AS build
WORKDIR /book/
COPY . /book/
RUN mdbook build

FROM alpine:latest
COPY --from=build /book/book/ /book
ENTRYPOINT sh -c "rm -rf /data/* && cp -r /book/* /data/"
