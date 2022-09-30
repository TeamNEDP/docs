FROM peaceiris/mdbook:v0.4.21-rust AS build
RUN cargo install --git "https://github.com/lzanini/mdbook-katex"
WORKDIR /book/
COPY . /book/
RUN mdbook build

FROM alpine:latest
COPY --from=build /book/book/ /book
ENTRYPOINT sh -c "rm -rf /data/* && cp -r /book/* /data/"
