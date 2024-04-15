import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import iconConfig from './iconConfig'


const Notes = () => {
    const [expandedNoteId, setExpandedNoteId] = useState(null); 
    const [showInput, setShowInput] = useState(false);
    const [showAllNotes, setShowAllNotes] = useState(true); 
    const [showHeader, setShowHeader] = useState(true);
    const [newTitle, setNewTitle] = useState('');
    const [newSubtitle, setNewSubtitle] = useState('');
    const { t } = useTranslation();
    // Array de notas
    const [notes, setUpdatedNotes] = useState([
            { id: 0,
            title: "Apresentando Meu Portfól-IOS", 
            subtitle: `Bem-vindo ao meu portfólio interativo, uma experiência inovadora que demonstra a  minha preparação e capacidade para enfrentar novos desafios como desenvolvedor Full Stack. Deixe-me guiá-lo por esta jornada única e mostrar como cada "app"  representa um passo sólido em direção ao meu futuro profissional.`,            
            },
            { id: 1,
            title: "Uma Nova Perspectiva", 
            subtitle: `Em vez de apresentar meus projetos em um formato tradicional de portfólio, decidi adotar uma abordagem mais dinâmica, criativa e envolvente. Inspirado pela familiaridade dos smartphones, criei um website que simula a interface de um Iphone, com cada "app" representando um projeto de maneira envolvente e profissional.`,
            },
            { id: 2,
            title: "Capacidade e Criatividade", 
            subtitle: `Meu objetivo com este portfólio é ir além de simplesmente listar projetos. Busco mostrar minha habilidade de resolver problemas mais complexos, de pensar de forma criativa e me adaptar a novos ambientes e desafios do mundo real. Cada "app" neste portfólio é uma prova da minha capacidade de encontrar soluções inovadoras e me adaptar a diferentes cenários. `,
            },
            { id: 3,
            title: "Da Calculadora ao Google Maps", 
            subtitle: `Dentro do meu Portfól-IOS, você encontrará uma variedade de projetos, desde aplicativos práticos como uma calculadora e uma lista de tarefas, até experiências mais complexas como o Google Maps, com integração de mapas, análise da dados, rotas e geolocalização ou como o Weather e Stocks. Cada "app" é uma demonstração das minhas habilidades como desenvolvedor.`,
            },
            { id: 4,
            title: "Conclusão: Pronto para o Desafio", 
            subtitle: `Espero que esta exploração pelo meu Portfól-IOS tenha oferecido uma visão convincente do meu potencial e das habilidades como programador e o quanto posso somar na equipe. Estou ansioso para discutir como posso contribuir para os objetivos da sua empresa e enfrentar os desafios com confiança e determinação.`,
            },
            
        ]);
    // Função para limitar o título da nota
        const limitTitle = (title, limit) => {
            if (!showAllNotes && title.length > limit) {
                return title.substring(0, limit) + '...';
            } else {
                return title;
            }
        };

    // Função para limitar o subtítulo da nota
    const limitSubtitle = (subtitle, limit) => {
        if (showAllNotes) {
            return subtitle.substring(0, limit) + '...';
        } else {
            if (subtitle.length > limit) {
                return subtitle.substring(0, limit) + '...';
            } else {
                return subtitle;
            }
        }
    };

    // Expande ou recolhe a nota clicada
    const handleNoteClick = (noteId) => {
        setExpandedNoteId(noteId);
        setShowAllNotes(!showAllNotes);
    };
    // Função para mostrar todas as notas ou apenas uma
    const handleShowAllNotes = () => {
        setShowAllNotes(!showAllNotes); 
        setShowHeader(!showHeader);
        setShowInput(false);
    };

    // Função para adicionar uma nova nota
    const handleNewNote =()=>{
       handleShowAllNotes(!showAllNotes);
       setExpandedNoteId(null)
       setShowInput(true);
    }

    // Função para excluir uma nota
    const deleteNote = (noteId) =>{
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setUpdatedNotes(updatedNotes);
        setShowAllNotes(!showAllNotes);
        setShowInput(false);
        
       

    }

    // Função para salvar uma nova nota
    const saveNote = () =>{
        const newNote = {
            id: notes.length ,
            title: newTitle,
            subtitle: newSubtitle,
        }
        setUpdatedNotes([...notes, newNote]);
        handleShowAllNotes();

    }

    
    return ( 
         
            <div className='notes-container'> 
                {/* Cabeçalho */}
                
                <div className='notes-header-container'>
                    <div className='notes-header'>
                        {showAllNotes ? 
                        <Link className='notes-back-link' to={'/'}> <img src={iconConfig.arrowBackYellow}  alt="back" /> </Link>
                            :
                        <Link to={"#"} > <img src={iconConfig.arrowBackYellow} onClick={handleShowAllNotes}  alt="back" /> </Link>
                        }
                        
                        { showAllNotes ? 
                        <Link className='notes-back-link' to={'/'} ><h3>{t("folders")}</h3> </Link>
                        :
                        <Link to={"#"} className='notes-back-link' ><h3 onClick={handleShowAllNotes}  >{t("notes")}</h3> </Link>
                        }
                    </div>
                    {showInput ? <div className='notes-done' onClick={saveNote}>{t("done")}</div> : <img src={iconConfig.moreCircleIcon} alt="more" /> }
                    
                </div>

                
                { showAllNotes ? <div className='notes-title'><h1>{t("notes")}</h1></div> : null }
                {/* Título da página de notas */}
                { showInput ? <div className='notes-title'>
                    <textarea className='notes-text-area-title' autoFocus rows={2} maxLength={50} 
                    onChange={(e) =>  {setNewTitle(e.target.value); }} type="text" placeholder={t("enterTitle")} />
                    <textarea className='notes-text-area-body' type="text"  placeholder={t("writeNote")}                    onChange={(e) =>  {setNewSubtitle(e.target.value); }} />
                    </div> 
                    :
                    null }
                    
                {/* Corpo da página de notas */}

                <div className='notes-body-container'>
                    <div className='notes-body-title'>
                    

                    { showAllNotes ? <h3>{t("January")}</h3> : null }
        
                        
                    </div>
        
                    {showAllNotes ? ( 
                    notes.map((note) => (
                        <div key={note.id}>
                            <div className='notes-box' onClick={() => handleNoteClick(note.id)}>
                                <h4 className='notes-box-title'>{limitTitle(note.title, 30)}</h4>
                                <p className='notes-box-text'>{limitSubtitle(note.subtitle, 38)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        {notes.map((note) => (
                            <div key={note.id}>
                                {expandedNoteId === note.id ? (
                                    <div className='notes-box-expanded' onClick={() => handleNoteClick(note.id)}>
                                        <h4 className='notes-box-title-expanded'>{note.title}</h4>
                                        <p className='notes-box-text-expanded'>{note.subtitle}</p>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                        <div className='notes-footer-expanded'>
                            <img src={iconConfig.listIcon} alt="list" />
                            <img src={iconConfig.cameraIcon} alt="camera" />
                            <img src={iconConfig.pencilIcon} alt="pencil" />
                            <img src={iconConfig.shareNotesIcon} alt="share" />
                            <img src={iconConfig.trashIcon} onClick={() => deleteNote(expandedNoteId)} alt="" />
                        </div>
                    </div>
                )}
            </div>
            {/* Rodapé da página de notas */}

            {showAllNotes ? 
            <div className='notes-footer'>
                <h5>{notes.length} {t("notes")}</h5>
                <img src={iconConfig.newNote} onClick={handleNewNote} alt="" />
            </div>
            : null } 
        </div> 
        );
}
 
export default Notes;