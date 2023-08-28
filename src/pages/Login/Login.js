import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useAuthentication } from '../../hooks/userAuthentication';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {singIn, error: authError, loading} = useAuthentication();

  const handleSubmit = async(e) => {
      e.preventDefault();
      setError("")
      const user = {
          email,
          password
      }
      const res = await singIn(user);
      console.log(user)
  }
  useEffect(() =>{
      if(authError){
          setError(authError);
      }
  }, [authError]);
  return (
    <div className={styles.login} >
    <h1>
        Faça o login para poder ultilizar o sistema.
    </h1>
    <p>Crie seu usuário e compartilhe suas histórias</p>
    <form onSubmit={handleSubmit}>
        <label>
            <span>Email:</span>
            <input type="email" name="email" id="" required placeholder='E-mail do usuário' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
            <span>Senha:</span>
            <input type="password" name="password" id="" required placeholder='Senha do usuário' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        {!loading && <button type="submit" className='btn'>Entrar</button>}
        {loading && <button type="submit" className='btn' disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p> }
    </form>
    </div>
  )
}

export default Login