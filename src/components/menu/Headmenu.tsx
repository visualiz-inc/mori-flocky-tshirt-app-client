import { useCallback, useMemo } from "react";

import './header.css';
import picture0 from '../../img/HeaderLogo/0.png';
import picture1 from '../../img/HeaderLogo/1.png';
import picture2 from '../../img/HeaderLogo/2.png';
import picture3 from '../../img/HeaderLogo/3.png';

export const Header = () => {

    const picture = useMemo(() => {
        return [
            picture0,
            picture1,
            picture2,
            picture3
        ]
    }, []);

    const onClickHead = useCallback((e: React.MouseEvent<HTMLElement>) => {
        console.log(e.target);
    }, [])

    return (
        <div className='header'>
            {picture.map((obj, i) => {
                return (
                    <div key={`Head${i}`} className='head-element' onClick={onClickHead}>
                        <img className='head-logo' src={obj} alt='' />
                    </div>
                )
            })}
        </div>
    );
};
