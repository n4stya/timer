import React, { useState, useEffect, useCallback, memo } from 'react';
import { Button, Typography, Box, AppBar } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import { styled } from '@mui/material/styles';

const TimerContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 55px;
    padding-bottom: 18px;
    min-width: 500px;
    width: 30vw;
    max-width: 550px;
    min-height: 700px;
    height: 82vh;
    background-color: #2e344d;
    border-radius: 20px;
    box-shadow: 0px 0px 18px 1px #1b1f30;
`;

const Header = styled(AppBar)`
    align-items: center;
    background-color: #424769;
    border-radius: 20px 20px 0 0;
    box-shadow: 0px 7px 8px -6px #24293e;
`;

const StyledButton = styled(Button)`
    margin: 20px;
    background-color: #fca766;
    color: #2d334d;
    font-weight: bolder;
    border-radius: 50px;
    box-shadow: 0px 0px 10px 2px rgba(252, 167, 102, 0.5);
    padding: 7px 75px 7px 85px;
`;

const TimerDisplay = styled(Typography)`
    font-size: 3.5rem;
    margin: 20px 0;
    color: #f4f5fc;
    min-width: 300px;
    width: 30vw;
    text-align: center;
    border-radius: 5px;
`;

const HeaderName = styled(Typography)`
    font-size: 2rem;
    margin-top: 0px;
    padding-top: 10px;
    border-radius: 5px;
    color: #f4f5fc;
    width: 200px;
    height: 50px;
    text-align: center;
`;

const StyledIcon = styled(RotateLeftRoundedIcon)`
    font-size: 30px;
`;

const Timer: React.FC = memo(() => {
    const [time, setTime] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const toggleTimer = useCallback(() => {
        setIsActive(prev => !prev);
        if (!isActive) {
            setIsPaused(false);
        }
    }, [isActive]);

    const resetTimer = useCallback(() => {
        setIsActive(false);
        setIsPaused(false);
        setTime(0);
    }, []);

    const formatTime = useCallback((time: number): string => {
        const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
        const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }, []);

    return (
        <TimerContainer>
            <Header position='static'>
                <HeaderName variant='h4'>Timer</HeaderName>
            </Header>
            <TimerDisplay>{formatTime(time)}</TimerDisplay>
            <Box>
                <StyledButton
                    startIcon={
                        isActive ? (
                            isPaused ? (
                                <PlayArrowRoundedIcon style={{ fontSize: 30 }} />
                            ) : (
                                <PauseRoundedIcon style={{ fontSize: 30 }} />
                            )
                        ) : (
                            <PlayArrowRoundedIcon style={{ fontSize: 30 }} />
                        )
                    }
                    onClick={toggleTimer}
                ></StyledButton>
                <StyledButton startIcon={<StyledIcon style={{ fontSize: 30 }} />} onClick={resetTimer}></StyledButton>
            </Box>
        </TimerContainer>
    );
});

export default Timer;
