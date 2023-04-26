import { useNavigate, useLocation, matchPath } from 'react-router-dom';
import "../styles/FancyButton.css"

function FancyButton({ to, menuTab }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleClick = () => {
        navigate(to);
    };

    const isActive = matchPath({ path: `${to}/*` }, pathname);

    return (
        <button className={`learn-more ${isActive ? 'active' : ''}`} onClick={handleClick}>
            <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
            </span>
            <span className="button-text">{menuTab}</span>
        </button>
    );
}

export default FancyButton;
