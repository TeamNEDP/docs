FROM r.s8k.top/mdbook-katex AS build
WORKDIR /book/
COPY . /book/
RUN mdbook build

FROM alpine:latest
COPY --from=build /book/book/html /book
ENTRYPOINT sh -c "rm -rf /data/* && cp -r /book/* /data/"
