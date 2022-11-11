import { Debug } from '@react-three/cannon';

function TogglableDebug({ disable, children, ...rest }) {
  if (disable) return children;

  return (
    <Debug color="black" {...rest}>
      {children}
    </Debug>
  );
}

export default TogglableDebug;
