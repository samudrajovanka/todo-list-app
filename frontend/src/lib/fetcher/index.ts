const fetcher = <Response = unknown>(url: string, init?: RequestInit) => {
  return new Promise<Response>(async (resolve, reject) => {
    const response = await fetch(url, init);

    const data = await response.json();

    if (response.status >= 400) {
      reject(data);
    }

    resolve(data);
  });
};

export default fetcher;
