import '../side.css';

export const Type = (props:{Value:number[]}) => {

      

      
          return (
            <div className='SideText'>
                <p className='SideItem'>図形:</p>
                <p className='SideValue'>{props.Value}</p>
            </div>
         )
}