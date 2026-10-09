### Reflection

#### Why is it important to handle errors for each individual API call rather than just at the end of the promise chain?

- Because we want to be able to see specific errors for each api and tell what went wrong at each stage or api call

#### How does using custom error classes improve debugging and error identification?

- It gives us the ability to have specific errors for special usecases

#### When might a retry mechanism be more effective than an immediate failure response?

- I attempted the extra credit. It was challenging and I had to look up syntax alot of times which I have
  indicated in the code (utlities/retryPromise.ts) whenever i needed. I purposely make the last endpoint fail to demonstrate
  this functionality. It might print currentTryCount two times; it seems its due to the async call to sales report via promise.all as per google.
- I might use the retry mechanism for time sensitive payments in an application like stripe when the traffic spikes and causes
  server or network issues.
