import type { MetadataRoute } from "next";
import { ADMIN_PATH_PREFIX, SETUP_PATH } from "@/lib/admin-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        ADMIN_PATH_PREFIX,
        `${ADMIN_PATH_PREFIX}/`,
        SETUP_PATH,
        `${SETUP_PATH}/`,
      ],
    },
  };
}
