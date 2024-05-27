/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        JWT_SECRET : process.env.JWT_SECRET,
        SALT_ROUNDS : process.env.SALT_ROUNDS,
        GITHUB_TOKEN : process.env.GITHUB_TOKEN
    }
};

export default nextConfig;
