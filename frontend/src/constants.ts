const PROD_BACKEND_API_URL = "https://dmg-sdi.mooo.com/api"
const DEV_BACKEND_API_URL = "http://localhost:8000/api";

// export  const BACKEND_API_URL = "https://dmg-sdi.mooo.com/api";
//  export  const BACKEND_API_URL = "http://localhost:8000/api";
// const PROD_BACKEND_API_URL = "https://dmgbackend-env.eba-mm4q4fpd.eu-north-1.elasticbeanstalk.com/api";
// const DEV_BACKEND_API_URL = "http://localhost:8000/api";

export const BACKEND_API_URL =
	process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;