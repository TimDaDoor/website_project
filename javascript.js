// Function to search and highlight results
function searchKeyword() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    if (!query) {
        clearHighlights();
        return;
    }

    clearHighlights(); // Remove existing highlights
    highlightResults(query); // Highlight matches

    // Scroll to the first highlighted element
    const firstHighlight = document.querySelector(".highlight");
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

// Function to highlight all occurrences of the query
function highlightResults(query) {
    const elements = document.body.querySelectorAll("*"); // Select all elements in the body

    elements.forEach((el) => {
        if (el.children.length === 0) { // Process only elements without child nodes
            const text = el.textContent;
            const regex = new RegExp(`(${query})`, "gi");

            if (regex.test(text)) {
                const highlightedHTML = text.replace(
                    regex,
                    `<span class="highlight">$1</span>`
                );
                el.innerHTML = highlightedHTML;
            }
        }
    });

    // Add event listener to clear highlights when clicking anywhere else
    document.body.addEventListener("click", clearHighlights, { once: true });
}

// Function to clear all highlights
function clearHighlights() {
    const highlights = document.querySelectorAll(".highlight");
    highlights.forEach((highlight) => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize(); // Merge adjacent text nodes
    });
}

// Add event listener to trigger the search function on input
document.getElementById("search-bar").addEventListener("input", searchKeyword);

// Add some CSS for highlights
const style = document.createElement("style");
style.innerHTML = `
    .highlight {
        background-color: yellow;
        color: black;
        font-weight: bold;
    }
`;
document.head.appendChild(style);
