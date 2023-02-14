import '../side.css';

export const Type = (props:{Value:string}) => {
  
          return (
            <div className='SideText'>
                <p className='SideItem'>図形:</p>
                <p className='SideValue'>{props.Value}</p>
            </div>
         )
}