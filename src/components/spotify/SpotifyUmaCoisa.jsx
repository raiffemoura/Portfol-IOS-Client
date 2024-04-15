import React , { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import iconConfig from '../iconConfig';
import "../../styles/spotify-uma-coisa.css"
import { useTranslation } from 'react-i18next'


const SpotifyPage = () => {
    // State
            const [isPlaying, setIsPlaying] = useState(false);
            const [isShuffle, setIsShuffle] = useState(true);
            const [isPreviusMouseOver, setIsPreviusMouseOver] = useState(false);
            const [isNextMouseOver, setIsNextMouseOver] = useState(false);
            const [isHidden, setIsHidden] = useState(false);
            const [duration, setDuration] = useState(0);
            const [currentTime, setCurrentTime] = useState(0);
            const [isFollowing, setIsFollowing] = useState(false);
            const { t } = useTranslation();



    // Referências
    const audioPlayer = useRef(); // Referência para o componente de áudio
    const progressBar = useRef(); // Referência para a barra de progresso
    const animationRef = useRef(); // Referência para a animação

    useEffect(() => {
        if (audioPlayer.current) {
            const seconds = Math.floor(audioPlayer.current.duration);
            setDuration(seconds);
            progressBar.current.max = seconds;
        }
    }, [audioPlayer?.current?.loadedMetaData, audioPlayer?.current?.readyState]);


    


    // Calcula o tempo no formato MM:SS
    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);

        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${returnedMinutes}:${returnedSeconds}`;
    }
    // Alterna entre reprodução e pausa
    const togglePlayPause = () => {
       const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }
    // Para a reprodução
    const stop = () => {
        setIsPlaying(false);
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);

    }
    // Atualiza a barra de progresso e o tempo enquanto reproduz
    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);


    } 
    // Atualiza a posição da reprodução e o tempo
    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
       changePlayerCurrentTime();
    }
    // Altera o tempo atual da reprodução
    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty("--seek-before-width", `${(progressBar.current.value / duration) * 100}%`);
        setCurrentTime(progressBar.current.value);
    }

  
   

 



    return (  
        <div className='spotify-page-uma-coisa '>
            {/* Cabeçalho */}
            <div className='header-spotify'>
            {/* Capa do álbum */}
                <Link to={"/"} ><img className='spotify-header-img' src={iconConfig.arrow} alt="arrow" /></Link>
                <p className='spotify-header-text'>{t("likedSongs")}</p>
                <img className='spotify-header-img' src={iconConfig.dots} alt="more" />
            </div>
            <div className='album'><img src={iconConfig.albumUmaCoisa} alt="album" /></div>
            <div>
                <div className='title'>
                    <div>
                        <h3>Uma Coisa - Ao Vivo</h3>
                        <p>MORADA</p>
                    </div>
                    <div><img className='liked' src={iconConfig.liked}  alt="liked" /></div>

                </div>
                <div className='player'>
                        {/* Container de áudio */}
                <div className='audio-container'>
                            {/* Áudio */}
                    <audio ref={audioPlayer} >
                                {/* Fontes do áudio */}
                        <source src={iconConfig.umacoisa} type="audio/mp3" />
                        <source src={iconConfig.umacoisaOGG} type="audio/ogg" />
                            
                        Your browser does not support the audio element.

                    </audio>
                        {/* Barra de progresso */}
                    <input className="progressBar" type="range" defaultValue="0" ref={progressBar} onChange={changeRange}/>
                        {/* Controles do áudio */}                      
                    <div className='audio-progress-container' >
                            {/* Tempo atual */}
                        <div className='audio-progress'>{calculateTime(currentTime)}</div>
                            {/* Duration  */}
                        <div className='audio-duration'>{(duration && !isNaN(duration)) ? calculateTime(duration) : '0:00'}</div>

                    </div>
                            {/* Botões do controle de reprodução */}
                    <div className='audio-buttons'>
                        <button onClick={() => setIsShuffle(!isShuffle)}>{isShuffle ? <img className='shuffle-list' src={iconConfig.shuffle} alt="shuffle-list"  /> : <img className='shuffle-list' src={iconConfig.list} alt="shuffle"  />}</button>
                                {/* Botão de faixa anterior */}                                                
                        <button
                            onMouseOver={() => setIsPreviusMouseOver(true)}
                            onMouseOut={() => setIsPreviusMouseOver(false)}>
                            {isPreviusMouseOver ? (
                            <Link to={"/spotify/Peregrino"}><img onClick={iconConfig.stop} className='previus' src={iconConfig.previusWhite} alt="previusWhite" /></Link>
                            ) : (
                            <img className='previus' src={iconConfig.previus} alt="previus" />
                            )}
                        </button>
                                {/* Botão de reprodução/pausa */}
                        <button onClick={togglePlayPause}>{isPlaying ? <img className='play-pause' src={iconConfig.pause} alt="play-pause"  /> : <img className='play-pause' src={iconConfig.play} alt="play-pause"  /> }</button>
                                {/* Botão de próxima faixa */}                        
                        <button
                            onMouseOver={() => setIsNextMouseOver(true)}
                            onMouseOut={() => setIsNextMouseOver(false)}>
                            {isNextMouseOver ? (
                            <Link to={"/spotify/Peregrino"}><img onClick={stop} className='next' src={iconConfig.nextWhite} alt="nextWhite" /></Link>
                            ) : (
                            <img className='next' src={iconConfig.next} alt="next" />
                            )}
                        </button>
                                {/* Botão de ocultar */}
                        <button onMouseOver={() => setIsHidden(true)} onMouseOut={() => setIsHidden(false)}>
                            {isHidden ? (  <img className='spotify-hidden' src={iconConfig.hiddenRed} alt="hiddenRed" />
                            ) : (
                            <img className='spotify-hidden' src={iconConfig.hidden} alt="hidden" />
                            )}
                        </button>
                    </div>

                </div>
                </div>
                {/* Botões inferiores */}
                <div className='bottom-buttons'>
                    <button className='bottom-buttons-left'>
                        <img src={iconConfig.devices} alt="devices" />
                    </button>
                   
                    <button className='bottom-buttons-right'>
                        <img src={iconConfig.share} alt="share" />
                    </button>

                </div>
                {/* Lyricas */}
                <div className='lycris-uma-coisa'>
                        <h5 className='artist-title'>{t('lyrics')}</h5>
                        <div className='lycris'>
                            <div>
                                <p>Uma coisa vou pedir</p>
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p>
                                Uma coisa vou pedir
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p>
                            </div>
                            <div>
                                <p>Uma coisa vou pedir</p>
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p>
                                <p>Uma coisa vou pedir</p> (é só uma coisa)
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p> 
                                <p>(na Tua presença, na Tua Presença)</p>
                            </div>
                            <div>
                                <p>E uma coisa vou pedir</p>
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p>
                                <p>Uma coisa vou pedir</p>
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p>
                            </div>
                            <div>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Vento aos Teus anjos</p>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Fogo aos Teus ministros</p>
                            </div>
                            <div>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Vento aos Teus anjos</p>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Fogo aos Teus ministros</p>
                            </div>
                            <div>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Vento aos Teus anjos</p>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Fogo aos Teus ministros</p>
                            </div>
                            <div>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Vento aos Teus anjos</p>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Fogo aos Teus ministros</p>
                            </div>
                            <div>
                                <p>Nós somos Seus ministros</p>
                                <p>Não negue o Seu fogo</p>
                                <p>Nós somos Seus ministros</p>
                                <p>Queremos queimar! Queremos queimar!</p>
                            </div>
                            <div>
                                <p>Nós somos Seus ministros</p>
                                <p>Não negue o Seu fogo</p>
                                <p>Nós somos Seus ministros</p>
                                <p>Queremos queimar! Queremos queimar!</p>
                            </div>
                            <div>
                                <p>Nós somos Seus ministros</p>
                                <p>Não negue o Seu fogo</p>
                                <p>Nós somos Seus ministros</p>
                                <p>Queremos queimar! Queremos queimar!</p>
                            </div>
                            <div>
                                <p>Nós somos Seus ministros</p>
                                <p>Não negue o Seu fogo, Deus!</p>
                                <p>Nós somos Seus ministros</p>
                                <p>Queremos queimar! Queremos queimar!</p>
                            </div>
                        </div>
                </div>
                {/* Sobre o artista */}                
                <div className='about-artist-card'>
                    <div className='artist-photo-morada'>
                        <h5 className='artist-title'>{t("aboutArtist")}</h5>
                    </div>
                    <div className='artist-info'>
                        <div>
                            <h4>MORADA</h4>
                            <p>2.4M {t("montlyListeners")}</p>
                            
                               
                        </div>
                        {/* Botão de seguir */}
                        <button className='follow-button' onClick={() => setIsFollowing(!isFollowing)}>{isFollowing ? t("following") : t('follow')}</button>
                    </div>
                    {/* Descrição do artista */}
                    <div className='artist-description'>
                        {/* Descrição */}
                        <span >
                        O MORADA é uma banda que tem por ansioso "gritas nos telhados o que Deus Tem 
                        sussurrado em seus ouvidos". Com pouco mais de 10 anos de estrada  </span> <Link to='/spotify/MORADA'><button  className='see-more'>...{t("seeMore")}</button></Link>
                    </div>
                    
                </div>
                {/* Créditos */}
                <div className='about-artist-card'>
                        <div className='card-credit-title'>
                            <h4>{t("credits")}</h4>
                        </div>
                        <div className='card-credit'>
                            <div className='card-credit-text'>
                                <h5>MORADA</h5>
                                <p className='credit-text'>{t("mainArtist")}</p>
                            </div>
                            <button className='follow-button' onClick={() => setIsFollowing(!isFollowing)}>{isFollowing ? t("following") : t('follow')}</button>
                        </div>
                        <div className='card-credit'>
                            <div className='card-credit-text'>
                                <h5>Brunão Morada</h5>
                                <p className='credit-text'>{t("composer")}, {t("producer")}</p>
                            </div>
                        </div>
                        <div className='card-credit'>
                            <div className='card-credit-text'>
                                <h5>Felipe Henri</h5>
                                <p className='credit-text'>{t("producer")}</p>
                            </div>
                        </div>
                    
                
                    
                    
                    
                </div>
            </div>  
            


        </div>

    )
}
 
export default SpotifyPage;