const paths = {
  login: {
    path: "/login",
  },
  forgotPassword: {
    path: "/forgot-password",
  },
  resetPassword: {
    path: "/reset-password/:token",
  },
  register: {
    path: "/register",
  },
  dashboard: {
    path: "/dashboard",
    settings: {
      path: "/settings",
      profile: {
        path: "/profile",
      },
      changePassword: {
        path: "/change-password",
      },
    },
  },
} as const;

type Paths = typeof paths;

const findPath = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: { [key: string]: any },
  search: { path: string }
): string | undefined => {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      continue;
    }

    if (obj[key] === search) {
      return obj[key].path;
    } else {
      const deepPath = findPath(obj[key], search);
      if (deepPath) {
        return obj[key].path + deepPath;
      }
    }
  }

  return undefined;
};

/**
 * Recursively search the data structure above and find the object that was passed
 * This allows us to do something like:
 * getPath(paths.dashboard.settings) => '/dashboard/settings'
 * Now the caller doesn't need to know the full structure of the app to form a meaningful path
 */
export const getPath = (
  search: (paths: Paths) => { path: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
) => {
  const searchResult = search(paths);

  let path = findPath(paths, searchResult) as string;
  if (!path) {
    throw new Error("No path found.");
  }

  if (params) {
    Object.keys(params).forEach((key) => {
      const value = params[key];
      path = path.replace(`:${key}`, value);
    });
  }

  return path;
};
