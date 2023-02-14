import { Box, Button } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import logo from '../../../img/logo.png';
import './head.css';

export const Header = () => {

  return (
    <Box className='header'>
      <img src={logo} alt='' />
      <h1>WEBで簡単Tシャツ制作</h1>
      <Button color='inherit'>
        <QuestionMarkIcon fontSize="large" />
          <Box/>
          <p>ヘルプ</p>
      </Button>
    </Box>
  );
};