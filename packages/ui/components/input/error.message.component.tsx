import React from "react";

const ErrorMessage = ({ error }: { error: string }) => {
    return <div className="pl-1 mt-1 text-xs text-error">{error}</div>;
};

export default ErrorMessage;
