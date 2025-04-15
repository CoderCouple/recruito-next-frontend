export type NavBarItemType = {
  title: string;
  path: string;
  enabled: boolean;
  target?: string;
  icon?: string;
};

type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string };
