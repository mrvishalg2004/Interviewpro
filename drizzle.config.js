/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mocker_owner:F6KSTD3Hmqub@ep-red-hat-a5myoax0.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };