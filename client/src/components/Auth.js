import {useState} from 'react';
import {useCookies} from 'react-cookie';

const Auth = () => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    const response = await fetch (`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({email,password})
    });
    const data = await response.json();
    if (data.detail){
      setError(data.detail);
    }else{
      setCookies('Email', data.email);
      setCookies('AuthToken', data.token);

      window.location.reload();
    }
  }

    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2 className='text'>{isLogin ? 'Inicia sesion' : 'Registrate'}</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            {!isLogin && <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirma la contraseña" />}
            <button onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} className="button">Enviar</button>
            {error && <p className='error'>{error}</p>}
          </form>
          <div className='auth-options'>
            <button 
              onClick={() => viewLogin(false)}
              style={{backgroundColor: !isLogin ? '#1D1C1F':'#131214' }}
            >
              Registrate
            </button>
            <button 
              onClick={() => viewLogin(true)}
              style={{backgroundColor: isLogin ? '#1D1C1F':'#131214' }}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Auth;
  