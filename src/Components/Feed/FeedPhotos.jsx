import React from 'react'
import FeedPhotosItem from './FeedPhotosItem'
import { PHOTOS_GET } from '../../../api';
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading';
import styles from './FeedPhotos.module.css'

const FeedPhotos = ({ user, page, setModalPhoto, setInfinite }) => {

    const { data, loading, error, request } = useFetch();

    React.useEffect(() => {
        async function fetchPhotos() {
            const totalPhotos = 6
            const { url, options } = PHOTOS_GET({ page, total: totalPhotos, user })
            const { response, json } = await request(url, options)
            if (response && response.ok && json.length < totalPhotos) {
                setInfinite(false)
            }
        }

        fetchPhotos()
    }, [request, user, page, setInfinite])

    if (error) return <Error error={error} />
    if (loading) return <Loading />
    if (!data)
        return <p>Nenhuma foto encontrada.</p>
    if (data)
        return (
            <ul className={`${styles.feed} animeLeft`}>
                {data.map((photo) => (
                    <FeedPhotosItem
                        key={photo.id}
                        photo={photo}
                        setModalPhoto={setModalPhoto}
                    />
                ))
                }
            </ul>
        )

}

export default FeedPhotos