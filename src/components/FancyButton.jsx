import { useNavigate } from 'react-router-dom';
import "../styles/FancyButton.css"

function FancyButton({ to, menuTab }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button className="learn-more" onClick={handleClick}>
            <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
            </span>
            <span className="button-text">{menuTab}</span>
        </button>
    );
}

export default FancyButton;