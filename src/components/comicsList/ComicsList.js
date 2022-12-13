import './comicsList.scss';
import { useState, useEffect} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {

    const [ComicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)

    const {loading, error, getAllComics} = useMarvelService();


    useEffect(()=>{
        onRequest(offset, true);
    }, [])

    const  onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
            getAllComics(offset)
                .then(onComiscListLoaded)
        }

        const onComiscListLoaded = (newComicsList) => {
            let ended = false;
            if (newComicsList.length < 8) {
                ended = true;
            }
            setComicsList(charList => [...charList, ...newComicsList])
            setNewItemLoading( false)
            setOffset(offset + 8)
            setComicsEnded(ended)
        }


        function renderItems(arr) {
            const items =  arr.map((item, i) => {
                return (
                    <li className="comics__item" key={item.id}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>

                )
            })
            return(
                <ul className="comics__grid">
                {items}
                </ul>
            )
        }

        const items = renderItems(ComicsList);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;
        
        return( 
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
              disabled={newItemLoading}
              style={{'display': comicsEnded ? 'none' : 'block'}}
              className="button button__main button__long"
              onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;