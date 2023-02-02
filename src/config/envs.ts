import dotenv from "dotenv";

export default function loadEnvs() {
  let path = ".env";
  if (process.env.NODE_ENV === "test") {
    console.log(process.env.NODE_ENV);
    path = ".env.test";
  }
  dotenv.config({path})
}
