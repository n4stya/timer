import React, { useEffect } from 'react';
import { Slider, TextField, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextContainer = styled(Box)`
    background: linear-gradient(to bottom, #424769, #2e344d);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 0px;
    min-width: 500px;
    width: 30vw;
    max-width: 550px;
    height: 70px;
`;

const StyledTypography = styled(Typography)`
    color: #9aa3d3;
    font-size: 1.7rem;
    margin: 8px 10px;
`;

const StyledTextField = styled(TextField)`
    width: 70px;
    .MuiOutlinedInput-notchedOutline {
        border: none;
    }
    .MuiInput-underline:before {
        border-bottom: none;
    }
    .MuiInput-underline:hover:not(.Mui-disabled):before {
        border-bottom: none;
    }
    .MuiInput-underline:after {
        border-bottom: none;
    }
    .css-1yrc8ca-MuiInputBase-input-MuiInput-input.Mui-disabled {
        -webkit-text-fill-color: rgb(154, 163, 211, 0.5);
    }
    .css-5h82ro-MuiInputBase-root-MuiInput-root.Mui-disabled:before {
        border-bottom-style: none;
    }
`;

interface TimeInputProps {
    setInitialTime: (time: number) => void;
    isRunning: boolean;
    minutes: number;
    seconds: number;
    setMinutes: (minutes: number) => void;
    setSeconds: (seconds: number) => void;
    disabled: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({
    setInitialTime,
    isRunning,
    minutes: propMinutes,
    seconds: propSeconds,
    setMinutes,
    setSeconds,
    disabled,
}) => {
    useEffect(() => {
        setMinutes(propMinutes);
        setSeconds(propSeconds);
    }, [propMinutes, propSeconds]);

    const updateInitialTime = (newMinutes: number, newSeconds: number) => {
        setInitialTime(newMinutes * 60 + newSeconds);
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        event.preventDefault();
        const totalSeconds = (newValue as number) * 15;
        const newMinutes = Math.floor(totalSeconds / 60);
        const newSeconds = totalSeconds % 60;
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        updateInitialTime(newMinutes, newSeconds);
    };

    const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numericValue = value === '' ? 0 : Math.min(720, Math.max(0, Number(value)));
        setMinutes(numericValue);
        updateInitialTime(numericValue, propSeconds);
    };

    const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numericValue = value === '' ? 0 : Math.min(59, Math.max(0, Number(value)));
        setSeconds(numericValue);
        updateInitialTime(propMinutes, numericValue);
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <Slider
                value={Math.floor((propMinutes * 60 + propSeconds) / 15)}
                onChange={handleSliderChange}
                min={0}
                max={240}
                step={1}
                disabled={isRunning}
                style={{ color: '#8F9BCC', transform: 'translateY(20px)' }}
            />
            <TextContainer>
                <StyledTextField
                    type='number'
                    variant='standard'
                    value={propMinutes}
                    onChange={handleMinutesChange}
                    disabled={disabled}
                    InputProps={{
                        style: { color: '#9aa3d3', fontSize: '2rem', textAlign: 'center' },
                    }}
                />
                <StyledTypography>:</StyledTypography>
                <StyledTextField
                    type='number'
                    variant='standard'
                    value={propSeconds}
                    onChange={handleSecondsChange}
                    disabled={disabled}
                    InputProps={{
                        style: {
                            color: '#9aa3d3',
                            fontSize: '2rem',
                            textAlign: 'center',
                            width: '70px',
                            marginLeft: '45px',
                        },
                    }}
                />
            </TextContainer>
        </div>
    );
};

export default TimeInput;
