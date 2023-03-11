import { CircleLoader } from 'react-spinners';

// export type LoaderProps = {
//   color?: string;
//   size?: number;
//   withoverlay?: boolean;
// };

function MainLoader({ color = '#a2b4c6', size = 60, withoverlay = false }) {
  return (
    <div
      className={
        !withoverlay
          ? 'sweet-loading'
          : 'sweet-loading w-screen h-screen z-50 flex justify-center items-center fixed top-0'
      }
    >
      <CircleLoader color={color} loading size={size} />
    </div>
  );
}

export default MainLoader;
