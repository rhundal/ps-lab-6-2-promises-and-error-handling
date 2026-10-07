class NetworkError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default function validateNetworkError(onlineStatus: string) {
  if (onlineStatus === "offline") {
    throw new NetworkError(
      "You are not connected to the network, check your internet conneciton.",
    );
  }
}
