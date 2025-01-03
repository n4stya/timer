import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ProgressDisplayProps {
    initialTime: number;
    timeLeft: number;
}

const ProgressContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 350px;
`;

const StyledTypography = styled(Typography)`
    position: absolute;
    color: #f4f5fc;
    font-size: 3rem;
    width: 500px;
    z-index: 10;
    transform: translate(-75px, 140px);
`;

const Progress = styled(CircularProgress)`
    display: flex;
    width: 80px;
    height: 80px;
    transform: rotate(-90deg);
    color: #676f9d;
`;

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({ initialTime, timeLeft }) => {
    const progress = initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0;

    return (
        <div style={{ marginTop: '70px' }}>
            <StyledTypography style={{ textAlign: 'center' }}>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </StyledTypography>
            <ProgressContainer>
                <Progress
                    variant='determinate'
                    value={progress}
                    thickness={1}
                    style={{ width: '100%', height: '100%' }}
                />
            </ProgressContainer>
        </div>
    );
};

export default ProgressDisplay;
