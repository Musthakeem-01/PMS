import React ,{useState,useEffect} from 'react';
import loading from '../../assets/img/lg.gif'
// import './commonstyles.css';
const divStyle={
    position:'absolute',
   // left: '50%',
    textAlign:'center',
     top: '46%',
    width: '100%',
    // height: '100%',
    zIndex: '99',
    transform: 'translate(-50%, -50%)',
    transform: '-webkit-translate(-50%, -50%)',
    transform: '-moz-translate(-50%, -50%)',
    transform: '-ms-translate(-50%, -50%)',
}

const img = {
        width:'5%',
        WebkitTouchCallout: 'none', /* iOS Safari */
        WebkitUserSelect: 'none', /* Safari */
         khtmlUserSelect: 'none', /* Konqueror HTML */
           MozUserSelect: 'none', /* Old versions of Firefox */
            msUserSelect: 'none', /* Internet Explorer/Edge */
                userSelect: 'none', /* Non-prefixed version, currently
                                      supported by Chrome, Opera and Firefox */
    };
  


function Customloading(props){
    const { classes } = props;
    const [visible , setVisible] = useState('hidden');

   useEffect(() => {

        if(props.loading === true){
            setVisible('block');
        }else{
            setVisible('none');
        }
   })

    return (
        <div className='loadingRoot' style={{display:visible}} draggable="false">
        <div style={divStyle} draggable="false"> 
            <img draggable="false"

            src={loading}
            
             alt="Logo" style = {img}  />
        </div>
        
        </div>
    )
}


export default Customloading;