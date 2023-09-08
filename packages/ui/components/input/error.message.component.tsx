const ErrorMessage = ({ error }: { error: string }) => {
    if (!error) return <></>;
    return <div className="pl-1 mt-1 text-xs text-error">{error}</div>;
};

export default ErrorMessage;
