import { Pane } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

export function UnstyledLink(props: { to: string; children: JSX.Element }) {
  const navigate = useNavigate();

  return (
    <Pane
      onClick={() => {
        navigate(props.to);
      }}
    >
      {props.children}
    </Pane>
  );
}
