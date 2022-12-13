import { useState, useEffect } from 'react';
// import PropTypes  from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';

const  CharInfo = (props)=> {

    const [char, setChar] = useState(null)

    const {loading, error, getCharacter, clearError}= useMarvelService();
    
   
    useEffect(()=>{
        updateChar()
    }, [props.charId])


      const updateChar = ()=>{
        clearError();
        const{charId} = props
        if(!charId){
            return
        }
        
        getCharacter(charId)
            .then(onCharLoaded)
    }


   const  onCharLoaded = (char)=>{
    setChar(char)
    }

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null

        return (
        <div className="char__info">
               {skeleton}
               {errorMessage}
               {spinner}
               {content}
        </div>
        )
}

const View = ({char}) =>{
    const {name,wiki, description, thumbnail, homepage, comics} = char;
    let imgStyle ={'objecFit' : 'cover'}
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle ={'objectFit' : 'contain'}
    }

    
    if(!comics){
        return ErrorMessage()
    }
    return(
        <>
             <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description} 
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.lenght > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return(
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                        )
                    })
                }
            </ul>
        </>
    )
}


export default CharInfo;