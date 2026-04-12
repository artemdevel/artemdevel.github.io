---
layout: page
title: Tags
---

{% comment %}
The loop below is one line because of the Markdown parser.
If it has new lines then the Markdown parser will wrap each link into <p>..</p>.
{% endcomment %}

{% assign sorted_tags = site.tags | sort %}
{% for tag in sorted_tags %}<a href="/tag/{{ tag[0] | slugify }}/">{{ tag[0] }}</a>({{ tag[1].size }}) {% endfor %}
