FROM alpine:latest AS build
RUN apk add --no-cache curl ca-certificates
RUN curl -sSL https://github.com/rust-lang/mdBook/releases/download/v0.4.21/mdbook-v0.4.21-x86_64-unknown-linux-gnu.tar.gz | tar -xz --directory=/usr/bin
WORKDIR /book/
COPY . /book/
RUN mdbook build

FROM alpine:latest
COPY --from=build /book/book/ /book
ENTRYPOINT sh -c "rm -rf /data/* && cp -r /book/* /data/"
