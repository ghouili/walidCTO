// PM2 process definition for the production Next.js server.
// Loaded by deploy.sh on every release (`pm2 reload ecosystem.config.cjs`).
//
// Named `.cjs` so it keeps working even if the project later switches to ESM
// (`"type": "module"` in package.json).
module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || "walid-ghouili-site",

      // Run the Next.js production server directly — equivalent to `next start`.
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: __dirname,

      // Single fork process. For multi-core, switch to:
      //   instances: "max",
      //   exec_mode: "cluster",
      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      watch: false,
      max_memory_restart: "512M",

      env: {
        NODE_ENV: "production",
        // `next start` honours PORT; change here or set it in the env file.
        PORT: process.env.PORT || 3000,
      },

      // Keep logs alongside the app (./logs is created by deploy.sh).
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
