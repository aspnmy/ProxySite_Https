// 新增 日志记录、错误处理、缓存以及性能监控


(() => {
  // src/index.js
  var OPENAI_API_HOST = VSDT;
  addEventListener("fetch", (event) => {
    console.time('handleRequest');
    event.respondWith(handleRequest(event.request).catch((error) => {
      console.error('Request failed:', error);
      return new Response('Internal Server Error', { status: 500 });
    }));
    console.timeEnd('handleRequest');
  });

  async function handleRequest(request) {
    const url = new URL(request.url);
    console.log(`Original request URL: ${request.url}`);
    url.host = OPENAI_API_HOST;
    const newRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow"
    });
    console.log(`New request URL: ${url.toString()}`);

    // 使用缓存
    const cacheKey = new Request(url.toString(), { method: 'GET' });
    const cachedResponse = await caches.match(cacheKey);
    if (cachedResponse) {
      console.log('Returning cached response');
      return cachedResponse;
    }

    try {
      const response = await fetch(newRequest);
      const clonedResponse = response.clone();
      caches.put(cacheKey, clonedResponse);
      return response;
    } catch (error) {
      console.error(`Error fetching new request: ${error}`);
      throw error;
    }
  }
})();
//# sourceMappingURL=index.js.map