import React  from 'react';
import { Link } from 'react-router-dom';
import iconConfig from '../iconConfig';
import { useTranslation } from 'react-i18next'

const AboutMorada = () => {     
    const { t } = useTranslation();

    return (  
        <div className='spotify-page'>
            {/* Cabeçalho */}
            <div className='header-spotify'>
                <Link to={"/Spotify/uma-coisa"} ><img style={{height: '18px'}} src={iconConfig.arrowBack} alt="arrowBack" /></Link>
                <p className='spotify-header-text'>MORADA</p>
                <div></div> 
             </div> 
            {/* Conteúdo */}
            <div>
                <div className='about-artist-card'>
                {/* Card de informações sobre o artista */}
                    <div className='artist-photo-morada'>
                    </div>
                    {/* Informações sobre o artista */}                
                    <div className='artist-info-morada'>
                            <h2>2,359,202</h2>
                            <p>{t("montlyListeners")}</p>
                    </div>
                    {/* Descrição do artista */}
                    <div className='artist-description'>
                    {/* Parágrafos de descrição */}
                       <p>
                        O <b style={{color: 'white'}}>MORADA</b> é uma banda que tem por ansioso
                        "gritar nos telhados o que Deus tem sussurrado em seus ouvidos".
                        Com pouco mais de 10 anos de estrada, o ministério tem alcançado cada vez 
                        mais um público diversificado desde crianças aos mais velhos, proporcionando assim, 
                        momentos intensos e alegres entre as famílias por onde tem passado. Isso se deve 
                        à diversidade musical que a banda possui e o cuidado que tem de sempre fazer um som 
                        que tocou a todos. Seu último lançamento foi o álbum <b style={{color: 'white'}}>Lembre-se 2000's</b>. Ouça e seja
                        encorajado(a)! </p>
                    {/* Ícone do artista e informações */}                                     
                         <div className='artist-icon'>
                           <img src={iconConfig.Morada} alt="Morada" />
                            <div> {t("postedBy")} MORADA</div>
                        </div>
                    {/* Ícones de redes sociais */}                        
                        <div className='social-icon'>
                            <Link target='_blank' to={"https://twitter.com/Moradaoficial"}>
                               <img  src={iconConfig.Twitter} alt='Twitter'/>
                            </Link>
                            <Link target='_blank' to={"https://twitter.com/Moradaoficial"}>
                                <div> X</div>
                            </Link>
                        </div>
                        <div className='social-icon'>
                            <Link target='_blank' to={"https://www.instagram.com/moradaoficial"}> 
                                <img  src={iconConfig.Instagram} alt='Instagram'/>
                            </Link>
                            <Link target='_blank' to={"https://www.instagram.com/moradaoficial"}> 
                                <div> Instagram</div>
                            </Link>
                        </div>
                        <div className='social-icon'>
                        <Link target='_blank' to={"https://www.facebook.com/ministeriomorada"}> 
                                <img  src={iconConfig.Facebook} alt='Facebook'/>
                            </Link>
                            <Link target='_blank' to={"https://www.facebook.com/ministeriomorada"}> 
                                <div> Facebook</div>
                            </Link>
                        </div>
                        
                    </div>
                    
                </div>
             
            </div>                    
            {/* <HomeButtonSticky /> */}

        </div>

    );
}
 
export default AboutMorada;