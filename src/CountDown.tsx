import React, { useState, useEffect, useCallback } from 'react';
import { Button, Box, Typography, AppBar } from '@mui/material';
import TimeInput from './TimeInput';
import ProgressDisplay from './ProgressDisplay';
import { styled } from '@mui/material/styles';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';

const CountdownContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    min-width: 500px;
    width: 30vw;
    max-width: 550px;
    min-height: 700px;
    height: 82vh;
    margin: 55px;
    padding-bottom: 18px;
    background-color: #2e344d;
    box-shadow: 0px 0px 18px 1px #1b1f30;
`;

const Header = styled(AppBar)`
    align-items: center;
    border-radius: 20px 20px 0 0;
    background-color: #424769;
    box-shadow: 0px 7px 8px -6px #24293e;
`;

const HeaderName = styled(Typography)`
    font-size: 2rem;
    margin-top: 0px;
    padding-top: 10px;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    color: #f4f5fc;
    text-align: center;
`;

const StyledButton = styled(Button)`
    margin: 20px;
    padding: 7px 75px 7px 85px;
    background-color: rgb(252, 167, 102);
    color: #2d334d;
    box-shadow: 0px 0px 10px 2px rgba(252, 167, 102, 0.5);
    font-weight: bolder;
    border-radius: 50px;
`;

const Countdown: React.FC = () => {
    const [initialTime, setInitialTime] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const audioRef = React.useRef<HTMLAudioElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isRunning && timeLeft > 0 && !isPaused) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            if (audioRef.current) {
                audioRef.current.play();
            }
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning, timeLeft, isPaused]);

    const startTimer = () => {
        setTimeLeft(initialTime);
        setIsRunning(true);
        setIsPaused(false);
    };

    const toggleTimer = useCallback(() => {
        setIsPaused(prev => !prev);
    }, []);

    const resetTimer = () => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeLeft(0);
        setInitialTime(0);
        setMinutes(0);
        setSeconds(0);
    };

    const isTimeSet = initialTime > 0;

    return (
        <CountdownContainer>
            <Header position='static'>
                <HeaderName variant='h4'>Countdown</HeaderName>
            </Header>
            <ProgressDisplay initialTime={initialTime} timeLeft={timeLeft} />
            <TimeInput
                setInitialTime={setInitialTime}
                isRunning={isRunning}
                minutes={minutes}
                seconds={seconds}
                setMinutes={setMinutes}
                setSeconds={setSeconds}
                disabled={isRunning}
            />
            <Box>
                <StyledButton
                    startIcon={
                        isRunning ? (
                            isPaused ? (
                                <PlayArrowRoundedIcon style={{ fontSize: 30 }} />
                            ) : (
                                <PauseRoundedIcon style={{ fontSize: 30 }} />
                            )
                        ) : (
                            <PlayArrowRoundedIcon style={{ fontSize: 30 }} />
                        )
                    }
                    onClick={isRunning ? toggleTimer : startTimer}
                    disabled={!isTimeSet}
                ></StyledButton>
                <StyledButton
                    startIcon={<RotateLeftRoundedIcon style={{ fontSize: 30 }} />}
                    onClick={resetTimer}
                ></StyledButton>
            </Box>
            <audio ref={audioRef} src='timer.mp3' preload='auto' />
        </CountdownContainer>
    );
};

export default Countdown;
