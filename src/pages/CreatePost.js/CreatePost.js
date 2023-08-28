import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../hooks/AuthContext';
import styles from './CreatePost.module.css';
import { useInsertDocument } from '../../hooks/useInsertDocument';


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const {insertDocument, response} = useInsertDocument("posts");
  const {user} = useAuthValue()
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    setFormError("");
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL")
      
    }
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    if(!title || !image || !body){
      setFormError("Por favor, preencha todos os campos");
    }
    if(formError){
      return;
    }
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })
    navigate("/")
  }

  return (
    <div className={styles.create_post} >
      <h2>
        Criar post
      </h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título: </span>
          <input type="text" name="title" id="" required placeholder='Pense num bom titulo' onChange={(e) => setTitle(e.target.value)} 
          value={title}
          />
        </label>
        <label>
          <span>URL da imagem: </span>
          <input type="text" name="image" id="" required placeholder='Insira a URL da imagem' onChange={(e) => setImage(e.target.value)}
          value={image}
          />
        </label>
        <label>
          <span>Conteúdo: </span>
          <input type="text" name="body" id="" required placeholder='Digite o conteúdo do post' onChange={(e) => setBody(e.target.value)}
          value={body}
          />
        </label>
        <label>
          <span>Tags: </span>
          <input type="text" name="image" id="" required placeholder='Insira as tags separadas por vírgula' onChange={(e) => setTags(e.target.value)}
          value={tags}
          />
        </label>
        {!response.loading && <button type="submit" className='btn'>Postar</button>}
        {response.loading && <button type="submit" className='btn' disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p> }
        {formError && <p className="error">{formError}</p> }
      </form>
    </div>
  )
}

export default CreatePost