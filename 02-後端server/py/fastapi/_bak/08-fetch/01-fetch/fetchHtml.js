const textResponse = await fetch("https://example.com/");
const textData = await textResponse.text();
console.log(textData);
