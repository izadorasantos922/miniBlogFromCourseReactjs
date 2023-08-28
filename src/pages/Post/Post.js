import React from 'react';
import styles from './Post.module.css';
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFecthDocument';
const Post = () => {
    const {id} = useParams();
    const {document: post} = useFetchDocument("posts",  id)
  return (
    <div className={styles.post_container}>
        {post && (
            <>
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title} />
                <p>{post.body}</p>
                <h3>Este post se trata sobre:</h3>
                {post.tagsArray.map((tag) =>(
                    <div className={styles.tags}>
                        <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
                    </div>
                ))}
            </>
        )}
    </div>
  )
}

export default Post