"use client";

import { useAuthContext } from "../../src/context/auth.context";

const Dashboard = () => {
    const { user } = useAuthContext();

    return <div>Dashboard</div>;
};
export default Dashboard;
