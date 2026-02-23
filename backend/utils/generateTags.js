const extractKeywords = require("./extractKeywords");

// Generate hashtags from the prompt
function generateTags(prompt) {
  const keywords = extractKeywords(prompt);
  const uniqueKeywords = [...new Set(keywords)];

  // Build tags from extracted keywords
  const tags = uniqueKeywords.slice(0, 4).map((kw) => `#${kw}`);

  // Always add generic marketing tags to fill up to 5
  const genericTags = ["#ad", "#trending", "#premium", "#bestdeal", "#musthave", "#newlaunch", "#quality"];
  while (tags.length < 5) {
    const generic = genericTags[Math.floor(Math.random() * genericTags.length)];
    if (!tags.includes(generic)) tags.push(generic);
  }

  return tags.slice(0, 5);
}

module.exports = generateTags;
