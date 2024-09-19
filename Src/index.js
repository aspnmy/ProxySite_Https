(() => {
  // src/index.js
  var OPENAI_API_HOST = VSDT;
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  async function handleRequest(request) {
    const url = new URL(request.url);
    url.host = OPENAI_API_HOST;
    const newRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow"
    });
    return await fetch(newRequest);
  }
})();
//# sourceMappingURL=index.js.map
