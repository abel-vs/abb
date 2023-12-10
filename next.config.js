/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push(function (context, request, callback) {
        if (request === "canvas") {
          return callback(null, "commonjs " + request);
        }
        callback();
      });
    }

    return config;
  },
};

module.exports = nextConfig;
