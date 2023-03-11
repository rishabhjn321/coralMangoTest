export interface LoaderProps {
  children?: React.ReactNode;
  loading?: boolean;
  loaderType?: any;
}

export const LoaderComponent = ({ children, loading, loaderType }: LoaderProps) => {
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {loaderType}
      </div>
    );
  }
  return <>{children || null} </>;
};

export default LoaderComponent;