const extractKeywords = require("./extractKeywords");

// ── Tagline Templates ──
const taglineTemplates = [
  "Discover the Best {keyword} Experience",
  "Elevate Your Life with {keyword}",
  "{keyword} — Reimagined for You",
  "Unleash the Power of {keyword}",
  "Your Perfect {keyword} Awaits",
  "{keyword}: Beyond Expectations",
  "Experience Premium {keyword} Today",
  "The Future of {keyword} is Here",
  "{keyword} — Made for Champions",
  "Transform Your World with {keyword}",
  "Feel the Difference with {keyword}",
  "{keyword}: Where Quality Meets Style",
  "Redefine Excellence with {keyword}",
  "Live Bold. Choose {keyword}.",
  "{keyword} — Crafted to Perfection",
];

// Generate a tagline from the prompt
function generateTagline(prompt) {
  const keywords = extractKeywords(prompt);
  const mainKeyword = keywords.length > 0
    ? keywords.slice(0, 2).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "Your Product";
  const template = taglineTemplates[Math.floor(Math.random() * taglineTemplates.length)];
  return template.replace("{keyword}", mainKeyword);
}

module.exports = generateTagline;
