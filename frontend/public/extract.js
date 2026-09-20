const fs = require('fs');
const html = fs.readFileSync('./main.html', 'utf8');

// A very basic regex based extraction to see the text content.
// Since it's Elementor, text is usually in .elementor-heading-title or .elementor-text-editor
const textEditorRegex = /<div class="elementor-text-editor[^>]*>([\s\S]*?)<\/div>/g;
let match;
console.log("--- TEXT EDITORS ---");
while ((match = textEditorRegex.exec(html)) !== null) {
  let text = match[1].replace(/<[^>]+>/g, '').trim();
  if (text) console.log(text);
}

const headingRegex = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g;
console.log("\n--- HEADINGS ---");
while ((match = headingRegex.exec(html)) !== null) {
  let text = match[1].replace(/<[^>]+>/g, '').trim();
  if (text) console.log(text);
}
