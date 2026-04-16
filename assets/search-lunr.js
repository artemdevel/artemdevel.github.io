let idx = null;
let documents = [];

const searchBox = document.getElementById("searchBox");
const results = document.getElementById("results");

// Load index data
fetch("/search.json")
  .then(res => res.json())
  .then(data => {
    documents = data;

    // Build Lunr index
    idx = lunr(function () {
      this.ref("id");
      this.field("date");
      this.field("title", { boost: 10 });
      this.field("tags", { boost: 5 });
      this.field("content");

      documents.forEach(doc => this.add(doc));
    });
  });

searchBox.addEventListener("input", function () {
  const query = this.value.trim();

  if (!query || !idx) {
    results.innerHTML = "";
    return;
  }

  const matches = idx.search(query);

  render(matches);
});

function highlight(text, query) {
  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function render(matches) {
  if (matches.length === 0) {
    results.innerHTML = "<p class='no-results'>No results found</p>";
    return;
  }

  const query = searchBox.value.trim();

  results.innerHTML = matches.slice(0, 10).map(match => {
    const doc = documents.find(d => d.id.toString() === match.ref);

    return `
      <div class="result-item">
        <a href="${doc.url}">
          <h3>${doc.title}</h3>
        </a>
        <small>${doc.date}</small>
        <p>${highlight(truncate(doc.content, 160), query)}</p>
      </div>
    `;
  }).join("");
}

function truncate(str, n) {
  return str.length > n ? str.substring(0, n) + ".." : str;
}
