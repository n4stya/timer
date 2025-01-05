import React, { useState } from 'react';
import Timer from './Timer';
import CountDown from './CountDown';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';

const TimerComponent = () => {
    return <Timer />;
};

const CountDownComponent = () => {
    return <CountDown />;
};

const StyledIconButton = styled(IconButton)`
    color: #bac3eb;
    position: absolute;
    transform: translate(220px, 62px);
`;

const App: React.FC = () => {
    const [showComponentA, setShowComponentA] = useState(true);
    const [buttonIcon, setButtonIcon] = useState(<HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />);

    const toggleComponent = () => {
        setShowComponentA(prev => !prev);
        setButtonIcon(prev =>
            prev.type === HourglassEmptyRoundedIcon ? (
                <TimerOutlinedIcon style={{ fontSize: 30 }} />
            ) : (
                <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
            )
        );
    };

    document.body.style.backgroundColor = '#24293e';
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <StyledIconButton onClick={toggleComponent}>{buttonIcon}</StyledIconButton>
            {showComponentA ? <TimerComponent /> : <CountDownComponent />}
        </div>
    );
};

export default App;
