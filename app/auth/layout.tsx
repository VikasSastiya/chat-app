const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(254,205,182,1) 15%, rgba(254,208,186,1) 20%, rgba(255,140,202,1)",
      }}
      className="h-full flex items-center justify-center "
    >
      {children}
    </div>
  );
};

export default AuthLayout;
