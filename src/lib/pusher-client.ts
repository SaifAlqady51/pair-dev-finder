import Pusher from "pusher-js";

interface PusherConfig {
  key: string;
  cluster: string;
  authEndpoint: string;
}

interface PusherAuthParams {
  userId: string;
  username: string;
}

export const initializePusher = (
  params: PusherAuthParams,
  customConfig?: Partial<PusherConfig>,
): Pusher => {
  // Default configuration
  const defaultConfig: PusherConfig = {
    key: process.env.PUSHER_KEY as string,
    cluster: process.env.PUSHER_CLUSTER as string,
    authEndpoint: "/api/pusher/auth",
  };

  // Validate required environment variables
  if (!process.env.PUSHER_KEY) {
    throw new Error(
      "PUSHER_KEY is not defined. Please check your environment variables.",
    );
  }
  if (!process.env.PUSHER_CLUSTER) {
    throw new Error(
      "PUSHER_CLUSTER is not defined. Please check your environment variables.",
    );
  }

  // Merge default config with any custom config
  const config = { ...defaultConfig, ...customConfig };

  // Create and return Pusher instance
  return new Pusher(config.key, {
    cluster: config.cluster,
    authEndpoint: config.authEndpoint,
    auth: {
      params: {
        userId: params.userId,
        username: params.username,
      },
    },
  });
};

/**
 * Helper function to create a Pusher client with minimal parameters
 */
export const createPusherClient = (
  userId: string,
  username: string,
): Pusher => {
  return initializePusher({ userId, username });
};
