import React, {useEffect, useState} from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../hooks/AuthContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFecthDocument';
import styles from "./EditPost.module.css";


const EditPost = () => {
  const {id} = useParams();
  const {document: post} = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  useEffect(() =>{
    if(post){
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tagsArray.join(", ");
      setTags(textTags)
    }
  }, [post])

  const {updateDocument, response} = useUpdateDocument("posts");
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
    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }
    updateDocument(id, data);
    navigate("/dashboard")
  }

  return (
    <div className={styles.edit_post} >
      {post && 
      <>
        <h2>
        Editando post: {post.title}
      </h2>
      <p>Altere os dados como desejar!</p>
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
        <p className={styles.preview_title}>Preview da imagem atual:</p>
        <img src={post.image} alt={post.title} className={styles.image_preview} />
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
        {!response.loading && <button type="submit" className='btn'>Editar</button>}
        {response.loading && <button type="submit" className='btn' disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p> }
        {formError && <p className="error">{formError}</p> }
      </form>
      </>}
    </div>
  )
}

export default EditPost