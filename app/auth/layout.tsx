const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            style={{
                background:
                    "linear-gradient(160deg, rgba(79,70,229,1) 0%, rgba(91,33,182,1) 15%, rgba(15,23,42,1) 85%)",
            }}
            className="h-full flex items-center justify-center"
        >
            {children}
        </div>
    );
};

export default AuthLayout;
