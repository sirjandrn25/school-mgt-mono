import Header from "./header.component";
import SideBar from "./sideBar.component";

const DashboardWrapper = ({ children }) => {
    return (
        <div className="flex w-screen h-screen bg-gray-100 ">
            <SideBar className="w-[300px]" />
            <div className="flex-1">
                <Header />
                {children}
            </div>
        </div>
    );
};

export default DashboardWrapper;
