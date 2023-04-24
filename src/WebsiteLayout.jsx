import { Outlet } from "react-router-dom"
import "./styles/WebsiteLayout.css"

function WebsiteLayout() {
    return (
        <div className="website">
            <div className="WebsiteHeader">
            </div>
            <div className="WebsiteBody">
                <Outlet />
            </div>
            <div className="WebsiteFooter">
            </div>
        </div>
    )
}

export default WebsiteLayout;