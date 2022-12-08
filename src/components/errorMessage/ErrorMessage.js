
import img from './404-er.gif'

const ErrorMessage = ()=>{
  return (
    <img style={{display: 'block', width:'auto', height: '260px',
     objectFit: 'contain', margin: '0 auto'}}
     src={img} alt="404-Error" />
  )
}

export default ErrorMessage;