---
layout: null
permalink: /search.json
---

[
  {% for post in site.posts -%}
  {
    "id": {{ forloop.index0 }},
    "title": {{ post.title | jsonify }},
    "url": {{ post.url | jsonify }},
    "date": {{ post.date | date: "%Y-%m-%d" | jsonify }},
    "content": {{ post.content | strip_html | jsonify }},
    "tags": {{ post.tags | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {%- endfor %}
]
