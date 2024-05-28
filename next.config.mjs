/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        JWT_SECRET : process.env.JWT_SECRET,
        SALT_ROUNDS : process.env.SALT_ROUNDS,
        GITHUB_TOKEN : process.env.GITHUB_TOKEN,
        PUSHER_KEY: process.env.PUSHER_KEY,
        PUSHER_APP_ID:process.env.PUSHER_APP_ID,
        PUSHER_SECRET:process.env.PUSHER_SECRET
    }
};

export default nextConfig;
