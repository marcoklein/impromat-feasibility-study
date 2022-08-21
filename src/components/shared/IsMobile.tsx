import { useMediaQuery } from "react-responsive";

export function useIsMobile() {
  return useMediaQuery({ maxWidth: 500 });
}

export function IsMobile(props: { children: JSX.Element }) {
  const isMobile = useMediaQuery({ maxWidth: 500 });
  if (isMobile) return props.children;
  else undefined;
}

export function IsNotMobile(props: { children: JSX.Element }) {
  const isMobile = useMediaQuery({ maxWidth: 500 });
  if (!isMobile) return props.children;
  else undefined;
}
