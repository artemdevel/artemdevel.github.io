# Build: docker build -t dev_jekyll .
# Run: docker run --name dev_jekyll -dp 4000:4000 -v $(pwd):/usr/src/app dev_jekyll
# Exec: docker exec -it dev_jekyll bash
# Jekyll: bundle exec jekyll serve --safe --host 0.0.0.0
FROM ruby:3.1.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN set -x && \
    gem install jekyll

EXPOSE 4000

CMD ["sleep", "infinity"]
