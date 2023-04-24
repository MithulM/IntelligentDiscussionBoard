import { useNavigate } from 'react-router-dom';
import "./styles/FancyButton.css"

function FancyButton({ to, menuTab }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button class="learn-more" onClick={handleClick}>
            <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
            </span>
            <span class="button-text">{menuTab}</span>
        </button>
    );
}

export default FancyButton;