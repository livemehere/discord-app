import { FC, ReactNode } from "react";

interface Props {
  condition: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}
export const Show: FC<Props> = ({ condition, children, fallback = null }) => {
  if (condition) {
    return <>{children}</>;
  }
  return fallback;
};
