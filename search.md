---
layout: default
title: Search
permalink: /search
---

<div class="search-container">
  <input
    type="text"
    id="searchBox"
    placeholder="Search posts.."
    autocomplete="off"
  />

  <div id="results"></div>
</div>

<script src="{{ '/assets/lunr.min.js' | relative_url }}"></script>
<script src="{{ '/assets/search-lunr.js' | relative_url }}"></script>
<link rel="stylesheet" href="{{ '/assets/search.css' | relative_url }}">
