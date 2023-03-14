import './.menu.css';
import ImageUpload from '../../../../img/SideIcon/image-upload.svg'
import { Box, Typography } from '@mui/material';

export const ImageWindow = () => {

    return (
        <Box id='ImageMenu'>
            <img src={ImageUpload}/>
            <Typography sx={{
                fontWeight:'bold',
                fontSize:14,
                fontFamily:'メイリオ'
            }}>写真を直接ドラッグ＆ドロップできます</Typography>
        
        </Box>
    );
};