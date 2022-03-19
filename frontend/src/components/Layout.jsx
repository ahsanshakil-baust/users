import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../contextApi/context";

const Layout = ({ children }) => {
    const { loading } = useAuth();
    return (
        <div className="main">
            {loading && (
                <div className="loading">
                    <div className="text">Wait...</div>
                    <div className="circle"></div>
                </div>
            )}

            <Navbar />
            <div className="downPage">{children}</div>
        </div>
    );
};

export default Layout;
