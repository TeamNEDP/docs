FROM rust:bullseye AS build
RUN cargo install mdbook && cargo install --git "https://github.com/lzanini/mdbook-katex"
WORKDIR /book/
COPY . /book/
RUN mdbook build

FROM alpine:latest
COPY --from=build /book/book/html /book
ENTRYPOINT sh -c "rm -rf /data/* && cp -r /book/* /data/"
