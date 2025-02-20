document.getElementById("ctfForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const input = document.getElementById("username").value;

  const sanitizedInput = input
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/<.*?on\w+=.*?>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/<img.*?>/gi, "")
    .replace(/<svg.*?>.*?<\/svg>/gi, "")
    .replace(/<\/?iframe.*?>/gi, "")
    .replace(/\s+/g, "")
    .replace(/['"`]/g, "")
    .replace(/[<>]/g, "");

  const encodedInput = encodeURIComponent(sanitizedInput);

  const outputDiv = document.getElementById("output");
  outputDiv.innerText = `Hello, ${encodedInput}`;

  const isObfuscatedPayload = (payload) => {
    const base64Pattern = /[A-Za-z0-9+/=]{8,}/;
    const hexPattern = /%[0-9A-Fa-f]{2}/;
    const keywordCheck = /onload/i;
    return base64Pattern.test(payload) && hexPattern.test(payload) && keywordCheck.test(payload);
  };

  if (isObfuscatedPayload(input)) {
    const userMessageMatch = input.match(/onload=["']?(.*?)["']?$/);
    const userMessage = userMessageMatch ? decodeURIComponent(userMessageMatch[1]) : "No message provided";

    const flag = "CTF{XSS_BYPASS_SUCCESS}";
    alert(`${flag}\nUsername: ${userMessage}`);
  }
});
