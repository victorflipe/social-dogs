import React from 'react'
import ImgComment from '../../Assets/enviar.svg?react'
import { COMMENT_POST } from '../../../api';
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setComments, single }) => {

    const [comment, setComment] = React.useState('');
    const { request, error } = useFetch();

    async function handleSubmit(event) {
        event.preventDefault();

        const { url, options } = COMMENT_POST(id, { comment })
        const { response, json } = await request(url, options)

        if (response.ok) {
            setComment('')
            setComments((comments) => [...comments, json])
        }
    }

    return (
        <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
            <textarea
                name="comment"
                id="comment"
                placeholder="Comente aqui..."
                className={styles.textarea}
                value={comment}
                onChange={({ target }) => setComment(target.value)}
            />
            <button className={styles.button}>
                <ImgComment />
            </button>
            <Error error={error} />
        </form>
    )

}

export default PhotoCommentsForm