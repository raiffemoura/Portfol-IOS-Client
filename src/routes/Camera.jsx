import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import iconConfig from '../components/iconConfig'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import '../styles/camera.css'
const Camera = () => {
  const [cameraUp, setCameraUp] = useState(true)
  const [flashOn, setFlashOn] = useState(false)
  const [nightMode, setNightMode] = useState(false)
  const [liveOn, setLiveOn] = useState(false)
  const [frontCamera, setFrontCamera] = useState(false)

  const itemsRef = useRef(null)
  const videoRef = useRef(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [centerX, setCenterX] = useState('photo')
  const [moved, setMoved] = useState(false)
  const [shot, setShot] = useState(false)
  const [screenshots, setScreenshots] = useState([])

  const { t } = useTranslation()

  // webcam and screenshot
  useEffect(() => {
    const constraints = { video: true }

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        videoRef.current.srcObject = stream
      } catch (err) {
        console.error('Error accessing the webcam:', err)
      }
    }

    startCamera()
    const currentVideoRef = videoRef.current

    return () => {
      if (currentVideoRef.srcObject) {
        const stream = currentVideoRef.srcObject
        const tracks = stream.getTracks()

        tracks.forEach((track) => {
          track.stop()
        })
      }
    }
  }, [])

  // Função para parar a câmera e redirecionar para o albuns ou home

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject
      const tracks = stream.getTracks()
      tracks.forEach((track) => {
        track.stop()
      })
    }
  }
  const redirectAlbuns = () => {
    stopCamera()

    window.location.href = '/photos'
  }
  const redirectHome = () => {
    stopCamera()

    window.location.href = '/'
  }

  // Função para tirar foto e salvar no localstorage
  const takeScreenshot = () => {
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataURL = canvas.toDataURL('image/png')

    // Salvar no localStorage
    const savedScreenshots =
      JSON.parse(localStorage.getItem('screenshots')) || []
    if (savedScreenshots.length >= 10) {
      // Se houver 10 ou mais capturas, remova a primeira captura para fazer espaço para a nova
      savedScreenshots.shift()
    }
    localStorage.setItem(
      'screenshots',
      JSON.stringify([...savedScreenshots, dataURL])
    )

    // Atualizar o estado screenshots apenas com as últimas 10 capturas
    setScreenshots([...savedScreenshots, dataURL])
    animationShot()
  }

  // animação shot

  const animationShot = () => {
    setShot(true)

    setTimeout(() => {
      setShot(false)
    }, 200)
  }

  // Funções de eventos de mouse
  const handleMouseLeave = () => {
    setIsMouseDown(false)
  }
  const handleMouseDown = (e) => {
    setIsMouseDown(true)
    setStartX(e.pageX - itemsRef.current.offsetLeft)
    setScrollLeft(itemsRef.current.scrollLeft)
  }

  const handleMouseUp = (e) => {
    setIsMouseDown(false)

    if (!moved) {
      const targetDiv = e.target.getAttribute('data-div')
      if (targetDiv) {
        setCenterX(targetDiv)
      }
    }
    setMoved(false)
  }
  const handleMouseMove = (e) => {
    if (!isMouseDown) return
    e.preventDefault()
    setCenterX(null)

    const x = e.pageX - itemsRef.current.offsetLeft
    const walk = (x - startX) * 1 // Ajuste da velocidade

    itemsRef.current.scrollLeft = scrollLeft - walk

    // Se houve movimento, definimos moved como true
    setMoved(true)
  }
  return (
    <div className="container-calculator">
      <div className="screen ">
        <Header app="cameraApp" text="testando" />
        <div className="cameraApp-icon"></div> {/* icon camera on  */}
        <div className="cameraApp-screen">
          <div className="cameraApp-header">
            <div className="cameraApp-flash">
              <img
                onClick={() => setFlashOn(!flashOn)}
                src={
                  flashOn ? iconConfig.cameraFlash : iconConfig.cameraFlashOff
                }
                alt="flash"
              />
              <img
                onClick={() => setNightMode(!nightMode)}
                src={
                  nightMode ? iconConfig.cameraNight : iconConfig.cameraNightOff
                }
                alt="night mode"
              />
              <img
                // style={{ height: "25px" }}
                src={iconConfig.cameraExp}
                alt="exposure"
              />
            </div>
            <div className="cameraApp-up-down">
              <img
                onClick={() => setCameraUp(!cameraUp)}
                src={cameraUp ? iconConfig.cameraUp : iconConfig.cameraDown}
                alt="Up/down"
              />
            </div>
            {liveOn ? (
              <div className="cameraApp-live">
                <img
                  onClick={() => setLiveOn(!liveOn)}
                  src={iconConfig.cameraRaw}
                  alt="live mode"
                />
                <img
                  onClick={() => setLiveOn(!liveOn)}
                  src={iconConfig.cameraFilter}
                  alt="live mode"
                />
                <img
                  onClick={() => setLiveOn(!liveOn)}
                  src={iconConfig.cameraLive}
                  alt="live mode"
                />
              </div>
            ) : (
              <div className="cameraApp-live">
                <img
                  onClick={() => setLiveOn(!liveOn)}
                  src={iconConfig.cameraRawOff}
                  alt="live mode"
                />

                <img
                  onClick={() => setLiveOn(!liveOn)}
                  src={iconConfig.cameraLiveOff}
                  alt="live mode"
                />
              </div>
            )}
          </div>

          <div className="cameraApp-camera">
            <video
              ref={videoRef}
              // width="cover"
              height="contain"
              autoPlay
              playsInline
              muted
            ></video>
          </div>

          <div className="cameraApp-menu">
            <div
              className="cameraApp-menu-camera"
              ref={itemsRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div
                data-div="time-lapse"
                className={
                  centerX === 'time-lapse'
                    ? 'cameraApp-centerX cameraApp-adjust-menu-start'
                    : 'cameraApp-adjust-menu-start'
                }
              >
                {t('time-lapse')}
              </div>
              <div
                data-div="slow-motion"
                className={centerX === 'slow-motion' ? 'cameraApp-centerX' : ''}
              >
                {t('slow-motion')}
              </div>
              <div
                data-div="cinematic"
                className={centerX === 'cinematic' ? 'cameraApp-centerX' : ''}
              >
                {t('cinematic')}
              </div>
              <div
                data-div="video"
                className={centerX === 'video' ? 'cameraApp-centerX' : ''}
              >
                {t('video')}
              </div>
              <div
                data-div="photo"
                className={centerX === 'photo' ? 'cameraApp-centerX' : ''}
              >
                {t('photo')}
              </div>
              <div
                data-div="portrait"
                className={centerX === 'portrait' ? 'cameraApp-centerX' : ''}
              >
                {t('portrait')}
              </div>
              <div
                data-div="pano"
                className={
                  centerX === 'pano'
                    ? 'cameraApp-centerX cameraApp-adjust-menu-end'
                    : 'cameraApp-adjust-menu-end'
                }
              >
                {t('pano')}
              </div>
            </div>
            <div className="cameraApp-buttons">
              <div
                className="cameraApp-albuns"
                onClick={() => redirectAlbuns()}
              >
                {screenshots.length > 0 ? (
                  <img
                    src={screenshots[screenshots.length - 1]}
                    alt="Última Captura"
                  />
                ) : (
                  <img src={iconConfig.photoReact} alt="albuns" />
                )}
              </div>
              <div className="cameraApp-shot">
                <div className="cameraApp-shot-outside">
                  <div
                    onMouseDown={() => takeScreenshot()}
                    className={
                      shot
                        ? 'cameraApp-shot-inside cameraApp-shot-down'
                        : 'cameraApp-shot-inside'
                    }
                  ></div>
                </div>
              </div>
              <div
                className="cameraApp-switch"
                onClick={() => setFrontCamera(!frontCamera)}
              >
                <img
                  src={
                    frontCamera ? iconConfig.cameraBack : iconConfig.cameraFront
                  }
                  alt="switch"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="home-button">
          <Link onClick={() => redirectHome()}>
            <button className="back-btn"> </button>
          </Link>
        </div>{' '}
      </div>
    </div>
  )
}

export default Camera
