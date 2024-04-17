import React, { useRef, useState, useEffect } from 'react'
import Header from '../components/Header'
import HomeButton from '../components/HomeButton'
import { useTranslation } from 'react-i18next'
import '../styles/weather.css'
import iconConfig from '../components/iconConfig'
import dayClear from '../assets/weather-app/clear.mp4'
import cloudy from '../assets/weather-app/cloudy.mp4'
import night from '../assets/weather-app/night.mp4'
import rain from '../assets/weather-app/rain.mp4'
import snow from '../assets/weather-app/snow.mp4'
import daySunny from '../assets/weather-app/sunny.mp4'
import thunder from '../assets/weather-app/thunder.mp4'
const Weather = () => {
  const [city, setCity] = useState('')
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [cityLoaded, setCityLoaded] = useState(false)
  const inputRef = useRef(null)
  const weatherHoursRef = useRef(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [dataSuggestions, setDataSuggestions] = useState([])
  //   const [conditionChanged, setConditionChanged] = useState(false)

  const { t } = useTranslation()
  // Pré-carrega os videos quando o componente weather for montado
  useEffect(() => {
    const videosToPreload = [
      dayClear,
      cloudy,
      night,
      rain,
      snow,
      daySunny,
      thunder,
    ]
    videosToPreload.forEach((videoSrc) => {
      const video = document.createElement('video')
      video.src = videoSrc
      video.preload = 'auto'
      video.style.display = 'none'
      document.body.appendChild(video)
    })

    return () => {
      // Limpar os vídeos pré-carregados quando o componente for desmontado
      videosToPreload.forEach((videoSrc) => {
        const video = document.querySelector(`video[src="${videoSrc}"]`)
        if (video) {
          document.body.removeChild(video)
        }
      })
    }
  }, [])
  // Busca a localização do usuário e atualiza o estado de cityLoaded para fazer a pesquisa
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const userLatitude = position.coords.latitude
        const userLongitude = position.coords.longitude

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${userLatitude}&lon=${userLongitude}&format=json`
        )
        const data = await response.json()

        const cityName = data.address.city
        setCity(clearSpecialChars(cityName))

        setCityLoaded(true)
      })
    }
  }, [])

  useEffect(() => {
    if (cityLoaded) {
      handleSearch(city)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityLoaded])

  const line = () => {
    return (
      <div className="weather-border-line-box">
        <div className="weather-border-line"></div>
      </div>
    )
  }

  const handleChange = (e) => {
    setCity(clearSpecialChars(e.target.value))
    if (e.target.value !== '') {
      fetch(
        `http://api.weatherapi.com/v1/search.json?key=5d97fe619b214861ae5171040242302&q=${e.target.value}&lang=en`
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else if (response.status === 404 || response.status === 400) {
            alert('City not found, please try again!')
          }
        })
        .then((data) => {
          setDataSuggestions(data)
        })
    }
  }
  // Função para lidar com a tecla pressionada no campo de entrada de texto

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setCity(clearSpecialChars(dataSuggestions[0]?.name))
      handleSearch(dataSuggestions[0]?.name)

      setDataSuggestions([])
    }
  }

  // Função para realizar uma busca com base na cidade selecionada

  const handleSearch = (selectedCity) => {
    if (selectedCity && selectedCity.length > 2) {
      fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=5d97fe619b214861ae5171040242302&q=${selectedCity}&lang=en`
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else if (response.status === 404 || response.status === 400) {
            alert('City not found, please try again!')
          }
        })
        .then((data) => {
          setWeatherForecast(data)
          // setConditionChanged((prevState) => !prevState)
          console.log(data)
        })
    }
  }
  // Função para limpar caracteres especiais de uma string e evitar bugs no input

  const clearSpecialChars = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
  }
  // Funções para lidar com eventos de arrastar para rolar
  const handleMouseDown = (e) => {
    setIsMouseDown(true)
    setStartX(e.pageX - weatherHoursRef.current.offsetLeft)
    setScrollLeft(weatherHoursRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsMouseDown(false)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = (e) => {
    if (!isMouseDown) return
    e.preventDefault()
    const x = e.pageX - weatherHoursRef.current.offsetLeft
    const walk = (x - startX) * 1.4
    weatherHoursRef.current.scrollLeft = scrollLeft - walk
  }

  // Função para determinar a fase da lua atual

  const moonPhases = () => {
    if (weatherForecast) {
      const moon_phase =
        weatherForecast.forecast.forecastday[0].astro.moon_phase

      if (moon_phase === 'New Moon' || moon_phase === 'New') {
        return iconConfig.moonNew
      } else if (moon_phase === 'Waxing Crescent') {
        return iconConfig.moonWaxingCrescent
      } else if (moon_phase === 'First Quarter') {
        return iconConfig.moonFirstQuarter
      } else if (moon_phase === 'Waxing Gibbous') {
        return iconConfig.moonWaxingGibbous
      } else if (moon_phase === 'Waning Gibbous') {
        return iconConfig.wanningGibbous
      } else if (moon_phase === 'Third Quarter') {
        return iconConfig.moonThirdQuarter
      } else if (moon_phase === 'Waning Crescent') {
        return iconConfig.moonWaningCrescent
      } else {
        return iconConfig.moonFull
      }
    }
  }

  // Função para formatar os dados do clima recebido da API

  const formatWeather = (weatherCondition) => {
    return weatherCondition
      ? weatherCondition.toLowerCase().trim()
      : weatherCondition
  }

  // Função para determinar o plano de fundo com base nas condições climáticas

  const weatherBackground = () => {
    const condition = formatWeather(weatherForecast?.current?.condition?.text)

    const conditionMap = {
      cloudy: [
        'cloudy',
        'mostly cloudy',
        'overcast',
        'light drizzle',
        'mist',
        'fog',
        'freezing fog',
        'partly cloudy',
      ],
      rain: [
        'rain',
        'raining',
        'cloudy with rain',
        'light rain',
        'light rain shower',
        'light freezing rain',
        'moderate rain',
        'moderate rain at times',
        'moderate or heavy freezing rain',
        'moderate or heavy rain shower',
        'heavy rain',
        'heavy rain at times',
        'torrential rain shower',
        'freezing drizzle',
        'drizzle',
        'showers',
        'heavy freezing drizzle',
        'patchy freezing drizzle possible',
        'patchy light rain',
        'patchy light drizzle',
        'patchy rain possible',
        'patchy rain nearby',
        'thunderstorms and rain',
        'freezing rain',
      ],
      thunderstorm: [
        'thunderstorm',
        'storm',
        'thundery outbreaks possible',
        'severe thunderstorm',
        'thunderstorms and hail',
        'hailstorm',
        'tornardo',
        'patchy light rain with thunder',
        'moderate or heavy rain with thunder',
        'patchy light snow with thunder',
        'moderate or heavy snow with thunder',
        'hurricane',
      ],
      snow: [
        'snow',
        'light snow',
        'patchy light snow',
        'light snow showers',
        'moderate or heavy snow showers',
        'moderate or heavy showers of ice pellets',
        'ice pellets',
        'light showers of ice pellets',
        'moderate snow',
        'heavy snow',
        'patchy moderate snow',
        'moderate snow',
        'patchy heavy snow',
        'patchy snow possible',
        'snowing',
        'blizzard',
        'ice pellets',
        'patchy sleet possible',
        'sleet',
        'light sleet',
        'light sleet showers',
        'moderate or heavy sleet',
        'moderate or heavy sleet showers',
        'sleetstorm',
        'hail',
        'hailstorm',
        'thunderstorms and snow',
        'blowing snow',
        'snowstorm',
      ],
      daySunny: [
        'clear sky',
        'mostly clear',
        'sunny',
        'mostly sunny',
        'partly sunny',
        'fair',
      ],
      dayClear: ['clear sky', 'mostly clear', 'fair'],
      night: [
        'clear night',
        'mostly clear night',
        'clear',
        'cloudy night',
        'overcast night',
        'partly cloudy night',
        'night',
        'mostly cloudy night',
      ],
    }

    for (const category in conditionMap) {
      if (conditionMap[category].includes(condition)) {
        return category
      }
    }

    return 'night'
  }

  // Função para rolar para o horário correto
  const scrollToNow = (hour) => {
    const weatherHours = weatherHoursRef.current
    if (weatherHours) {
      const hourWidth = 57
      const newScrollLeft = hour * hourWidth
      weatherHours.scrollLeft = newScrollLeft
    }
  }
  // Função para rolar para o horário atual
  const now = new Date().getHours()

  useEffect(() => {
    scrollToNow(now)
  }, [weatherForecast, now])

  return (
    // <div className={`container-weather-${weatherBackground()}`}>
    <div className={`container-weather-transparent`}>
      <div className="container-video">
        <div>
          <div className="screen">
            {/* Componente de cabeçalho */}

            <Header />
            <div className="weather-screen">
              {weatherForecast ? (
                <video
                  key={weatherBackground()}
                  autoPlay
                  loop
                  muted
                  className="weather-video"
                  playsInline
                >
                  <source
                    src={
                      weatherBackground() === 'cloudy'
                        ? cloudy
                        : weatherBackground() === 'daySunny'
                        ? daySunny
                        : weatherBackground() === 'dayClear'
                        ? dayClear
                        : weatherBackground() === 'rain'
                        ? rain
                        : weatherBackground() === 'night'
                        ? night
                        : thunder
                    }
                    type="video/mp4"
                  />
                </video>
              ) : (
                <video autoPlay loop muted className="weather-video">
                  <source src={night} type="video/mp4" />
                </video>
              )}

              <div className="weather-input">
                {/* Campo de busca */}

                <div className="weather-input-box">
                  <input
                    className="weather-input-search"
                    type="text"
                    placeholder={t('search')}
                    ref={inputRef}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />
                  {/* Ícone de busca */}
                  <div
                    className="search-icon"
                    onClick={() => handleSearch(inputRef.current.value)}
                  ></div>
                </div>

                {/* Sugestões de busca */}

                <div className="weather-data-result">
                  {dataSuggestions &&
                    dataSuggestions.map((data, index) => {
                      return (
                        <div className="weather-data-item" key={data.url}>
                          <p
                            onClick={() => {
                              handleSearch(data.url)
                              inputRef.current.value =
                                data.name +
                                ', ' +
                                data.region +
                                ', ' +
                                data.country
                              setDataSuggestions([])
                            }}
                          >
                            {data.name}, {data.region}, {data.country}
                          </p>
                        </div>
                      )
                    })}
                </div>
              </div>

              {/* Informações meteorológicas */}

              <div className="weather-header">
                {weatherForecast?.location?.name ? (
                  <h1>{weatherForecast?.location?.name}</h1>
                ) : (
                  '--'
                )}
                {weatherForecast?.location?.country ? (
                  <p>
                    {weatherForecast?.location?.region},{' '}
                    {weatherForecast?.location?.country}
                  </p>
                ) : (
                  '--'
                )}
                {weatherForecast?.current?.temp_c ? (
                  <h1>{weatherForecast?.current?.temp_c}°</h1>
                ) : (
                  '--'
                )}
                {weatherForecast?.current?.condition?.text ? (
                  <p>
                    {t(
                      formatWeather(weatherForecast?.current?.condition?.text)
                    )}
                  </p>
                ) : (
                  '--'
                )}
                <p>
                  {t('high')}{' '}
                  {weatherForecast
                    ? weatherForecast.forecast.forecastday[0].day.maxtemp_c
                    : '--'}{' '}
                  {t('low')}{' '}
                  {weatherForecast
                    ? weatherForecast.forecast.forecastday[0].day.mintemp_c
                    : '--'}
                </p>
              </div>
              {/* Previsão por hora */}

              <div className="weather-box weather-box-night">
                <div className="weather-condition">
                  <img src={iconConfig.weatherWatch} alt="watch" />
                  <p>{t('hourlyForecast')}</p>
                </div>
                {line()}
                <div
                  className="weather-hours"
                  ref={weatherHoursRef}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  {weatherForecast
                    ? weatherForecast.forecast.forecastday[0].hour.map(
                        (hour, index) => (
                          <div className="weather-hour" key={index}>
                            <div>
                              {hour.time.slice(11, 13) === now.toString()
                                ? t('now')
                                : hour.time.slice(11, 13)}
                            </div>

                            <img
                              src={hour.condition.icon}
                              alt="weather condition"
                            />
                            <div>{hour.temp_c}°</div>
                          </div>
                        )
                      )
                    : ''}
                </div>
              </div>
              {/* Outras informações meteorológicas */}

              <div className="weather-container-center">
                {/* Índice UV */}

                <div className="weather-box weather-box-night">
                  <div className="weather-condition-small">
                    <img src={iconConfig.weatherUV} alt="icon" />
                    <p>{t('UV')}</p>
                  </div>

                  <h1>{weatherForecast ? weatherForecast.current.uv : '0'}</h1>
                  <h3>
                    {weatherForecast
                      ? weatherForecast.current.uv <= 2
                        ? t('UVLow')
                        : weatherForecast.current.uv <= 5
                        ? t('UVModerate')
                        : weatherForecast.current.uv <= 7
                        ? t('UVHigh')
                        : weatherForecast.current.uv <= 10
                        ? t('UVVeryHigh')
                        : t('UVExtreme')
                      : '0'}
                  </h3>
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      disabled={true}
                      value={weatherForecast ? weatherForecast.current.uv : '0'}
                    />
                  </div>
                </div>
                {/* Componente de nascer e pôr do sol */}

                <div className="weather-box weather-box-night">
                  <div className="weather-condition-small">
                    <img src={iconConfig.weatherSunrise} alt="icon" />
                    <p>{t('sunrise')}</p>
                  </div>

                  <h1>
                    {weatherForecast
                      ? weatherForecast.forecast.forecastday[0].astro.sunset.slice(
                          0,
                          5
                        )
                      : '0'}
                  </h1>
                  <div className="sunrise-img">
                    <img src={iconConfig.sunset} alt="sunset" />
                    <p>
                      {t('sunset')}:{' '}
                      {weatherForecast
                        ? weatherForecast.forecast.forecastday[0].astro.sunset.slice(
                            0,
                            5
                          )
                        : '0'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="weather-container">
                <div className="weather-box weather-box-night">
                  {/* Componente de sensação termica */}

                  <div className="weather-condition-small">
                    <img src={iconConfig.weatherFeelsLike} alt="icon" />
                    <p className="font-size-1">{t('feelsLike')}</p>
                  </div>

                  <h1>
                    {weatherForecast
                      ? weatherForecast.current.feelslike_c + '°'
                      : '0'}
                  </h1>
                  <p className="font-size-2">
                    {weatherForecast
                      ? weatherForecast.current.feelslike_c <= 0
                        ? t('feelsLikeVeryLow')
                        : weatherForecast.current.feelslike_c <= 10
                        ? t('feelsLikeLow')
                        : weatherForecast.current.feelslike_c <= 15
                        ? t('feelsLikeModerate')
                        : weatherForecast.current.feelslike_c <= 20
                        ? t('feelsLikeHigh')
                        : t('feelsLikeVeryHigh')
                      : '0'}
                  </p>
                </div>

                <div className="weather-box weather-box-night">
                  <div className="weather-condition-small">
                    {/* Componente de visibilidade */}

                    <img src={iconConfig.weatherVisibility} alt="icon" />
                    <p className="font-size-1">{t('visibility')}</p>
                  </div>

                  <h1>
                    {weatherForecast
                      ? weatherForecast.current.vis_km + ' km'
                      : '0km'}
                  </h1>
                  <p className="font-size-2">
                    {weatherForecast
                      ? weatherForecast.current.vis_km <= 1
                        ? t('visibilityVeryBad')
                        : weatherForecast.current.vis_km <= 2
                        ? t('visibilityBad')
                        : weatherForecast.current.vis_km <= 5
                        ? t('visibilityModerate')
                        : weatherForecast.current.vis_km <= 10
                        ? t('visibilityGood')
                        : t('visibilityVeryGood')
                      : ' -- '}
                  </p>
                </div>
              </div>

              <div className="weather-box weather-box-night">
                <div className="weather-condition">
                  {/* Componente de fases de lua */}

                  <img src={iconConfig.weatherMoon} alt="watch" />
                  <p>
                    {t('moonPhase')}
                    {weatherForecast
                      ? (() => {
                          const moonPhases = {
                            'Waning Crescent': t('moonWaningCrescent'),
                            'Waxing Crescent': t('moonWaxingCrescent'),
                            'First Quarter': t('moonFirstQuarter'),
                            'Waxing Gibbous': t('moonWaxingGibbous'),
                            'Full Moon': t('moonFull'),
                            'Waning Gibbous': t('moonWaningGibbous'),
                            'Third Quarter': t('moonThirdQuarter'),
                            'New Moon': t('moonNew'),
                          }

                          const moonPhase =
                            weatherForecast.forecast.forecastday[0].astro
                              .moon_phase
                          return moonPhases[moonPhase] || '--'
                        })()
                      : ' -- '}
                  </p>
                </div>
                {line()}
                <div className="moon-phase-container">
                  <div className="moon-phase-box">
                    <div className="moon-phase-text ">
                      <p>{t('illumination')}</p>
                      <p className="moon-phase-text-info">
                        {weatherForecast
                          ? weatherForecast.forecast.forecastday[0].astro
                              .moon_illumination + '%'
                          : ' -- '}
                      </p>
                    </div>
                    {line()}

                    <div className="moon-phase-text">
                      <p>{t('moonrise')}</p>
                      <p className="moon-phase-text-info">
                        {weatherForecast
                          ? weatherForecast.forecast.forecastday[0].astro.moonrise.slice(
                              0,
                              8
                            )
                          : ' -- '}
                      </p>
                    </div>
                    {line()}

                    <div className="moon-phase-text">
                      <p>{t('moonset')}</p>
                      <p className="moon-phase-text-info">
                        {weatherForecast
                          ? weatherForecast.forecast.forecastday[0].astro.moonset.slice(
                              0,
                              8
                            )
                          : ' -- '}
                      </p>
                    </div>
                  </div>
                  <div className="moon-phase-img">
                    {weatherForecast ? (
                      <img src={moonPhases()} alt="moon" />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>

              <div className="weather-container">
                <div className="weather-box weather-box-night">
                  {/* Componente de umidade */}

                  <div className="weather-condition-small">
                    <img src={iconConfig.weatherHumidity} alt="icon" />
                    <p className="font-size-1">{t('humidity')}</p>
                  </div>

                  <h1>
                    {weatherForecast
                      ? weatherForecast.current.humidity + '%'
                      : '0%'}
                  </h1>
                  <p className="font-size-2">
                    {weatherForecast
                      ? weatherForecast.current.humidity <= 30
                        ? t('humidityVeryLow')
                        : weatherForecast.current.humidity <= 50
                        ? t('humidityLow')
                        : weatherForecast.current.humidity <= 60
                        ? t('humidityModerate')
                        : weatherForecast.current.humidity <= 80
                        ? t('humidityHigh')
                        : t('humidityVeryHigh')
                      : ' -- '}
                  </p>
                </div>

                <div className="weather-box weather-box-night">
                  {/* Componente de precipitação */}

                  <div className="weather-condition-small">
                    <img src={iconConfig.weatherPrecipitation} alt="icon" />
                    <p>{t('precipitation')}</p>
                  </div>

                  <h2>
                    {weatherForecast
                      ? (weatherForecast.current.precip_mm / 10).toFixed(2) +
                        ' cm'
                      : '0'}
                  </h2>

                  <p className="font-size-2">
                    {weatherForecast
                      ? (
                          weatherForecast.forecast.forecastday[0].day
                            .totalprecip_mm / 10
                        ).toFixed(2) + t('precipitationToday')
                      : '--'}
                  </p>
                </div>
              </div>
            </div>
            <div className="weather-adjust-home-button">
              <HomeButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
