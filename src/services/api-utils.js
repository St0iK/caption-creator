export const pollOperation = (operationId, interval = 1000, timeout = 2000000) => {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      const resp = await fetch(`http://localhost/operation/${operationId}`);
      if (resp.ok) {
        const job = await resp.json();

        if (job.done) {
          clearInterval(intervalId);
          resolve(job.results);
        }
      } else {
        clearInterval(intervalId);
        reject(new Error(resp.statusText));
      }
    }, interval);

    setTimeout(() => {
      clearInterval(intervalId);
      reject(new Error('Poll timeout exceeded.'));
    }, timeout);
  });
};