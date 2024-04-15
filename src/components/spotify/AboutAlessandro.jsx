import React from 'react';
import { Link } from 'react-router-dom';
import iconConfig from '../iconConfig';
import { useTranslation } from 'react-i18next'



const AboutAlessandro = () => {     
    const { t } = useTranslation();

    return (  
        <div className='spotify-page'>
            {/* Cabeçalho */}
            <div className='header-spotify'>
                <Link to={"/Spotify/peregrino"} ><img style={{height: '18px'}} src={iconConfig.arrowBack} alt="arrowBack" /></Link>
                <p className='spotify-header-text'>Alessandro Vilas Boas</p>
                <div></div> 
             </div> 
            {/* Conteúdo */}
            <div>
                {/* Card de informações sobre o artista */}

                <div className='about-artist-card'>
                    <div className='about-artist-title'>
                    </div>
                    {/* Informações sobre o artista */}
                    <div className='artist-info-alessandro'>
                            <h2>1,237,219</h2>
                            <p>{t("montlyListeners")}</p>
                    </div>
                    {/* Descrição do artista */}
                    
                    <div className='artist-description'>
                    {/* Parágrafos de descrição */}
                       <p>
                       Sua história começa no favor de Deus. Alessandro é um improvável, e como ama dizer "alguém comum". 
                       Nascido dia 30 de Julho de 1993 em Itajubá - MG, Vilas Boas teve sua primeira experiência com o 
                       evangelho de Cristo em sua adolescência. Anos depois em seu apartamento em 
                       São Paulo teve um encontro com o texto de João 17, o que transformou radicalmente sua trajetória. 
                       Fascinado pelo conhecimento de Deus, Alessandro é irrevogavelmente incendiado com lágrimas e paixão 
                       por Jesus, sendo suas canções e livros resultado de uma busca incessante por Jesus. </p>
                       <p>
                       <br />
                        E foi assim que Vilas Boas encontrou suas composições, ao redor da fogueira da presença.
                        Alessandro pôs em palavras sua busca pessoal pelo Senhor, mas também o clamor de sua familia na fé 
                        - Igreja ONE. No ano de 2015 gravou o seu primeiro álbum, 'Live At Home' com One Sounds e desde então tem 
                        extendido seu trabalho como compositor, ministro e artista. Algumas de suas músicas mais relevantes são: 
                        "Quero Conhecer Jesus", "O carpinteiro", "Ser Mudado", "O Fogo nunca dorme" e "Tu és tudo".
                       </p>
                       <p>--</p>
                       <br /><br /><br />
                       <p>His story begins in God's favor. Alessandro is an unlikely, and as he loves to say, a 'common person.' 
                        Born on July 30, 1993, in Itajuba - MG, Vilas Boas had his first experience with the gospel of Christ in 
                        his adolescence. Alessandro is irrevocably ignited with tears and passion for Jesus. In 2015, he recorded
                         his first album, 'Live At Home' with One Sounds, and since then has extended his work as a songwriter, minister, 
                         and artist. </p>
                    {/* Ícone do artista e informações */}                         
                         <div className='artist-icon'>
                           <img src={iconConfig.Alessandro} alt='alessandro'/>
                            <div> {t("postedBy")} Alessandro Vilas Boas</div>
                        </div>
                    {/* Ícones de redes sociais */}                        
                        <div className='social-icon'>
                            <Link target='_blank' to={"https://twitter.com/ale_vilasboas1"}>
                               <img  src={iconConfig.Twitter} alt='twitter'/>
                            </Link>
                            <Link target='_blank' to={"https://twitter.com/ale_vilasboas1"}>
                                <div> X</div>
                            </Link>
                        </div>
                        <div className='social-icon'>
                            <Link target='_blank' to={"https://www.instagram.com/alessandro_vilasboas/"}> 
                                <img  src={iconConfig.Instagram} alt='instagram'/>
                            </Link>
                            <Link target='_blank' to={"https://www.instagram.com/alessandro_vilasboas/"}> 
                                <div> Instagram</div>
                            </Link>
                        </div>
                        
                    </div>
                    
                </div>
             
            </div>                    

        </div>

    );
}
 
export default AboutAlessandro;