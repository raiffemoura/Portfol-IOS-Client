import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import '../styles/mail.css'
import iconConfig from '../components/iconConfig'
import HomeButton from '../components/HomeButton'
import { useTranslation } from 'react-i18next'

export default function Mail() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [from, setFrom] = useState('')
  const [filled, setFilled] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    const checkFilled = () => {
      if (subject && body && from) {
        setFilled(true)
      } else {
        setFilled(false)
      }
    }

    checkFilled()
  }, [subject, body, from])

  function line() {
    return (
      <div className="mail-line-box">
        <div className="mail-line"></div>
      </div>
    )
  }

  return (
    <div className="container-calculator">
      <div className="screen ">
        <Header />
        <div className="mail-screen">
          {/* Mail Header */}
          <form
            target="_blank"
            action="https://formsubmit.co/raiffemoura93@icloud.com"
            method="POST"
          >
            <div className="mail-header">
              <Link to={'/'}>
                <div className="back"></div>
              </Link>
              <div className="mail-header-text">
                <Link to={'/'}>
                  <p>{t('cancel')}</p>
                </Link>
              </div>
              <div className="mail-header-title">
                <h2>{t('newMessage')}</h2>
                <button type="submit">
                  <img
                    src={filled ? iconConfig.sendBlue : iconConfig.send}
                    // src={iconConfig.send}
                    alt="send"
                  />
                </button>
              </div>
            </div>

            <div className="mail-to">
              <p>{t('to')}</p>
              <input
                type="text"
                name="to"
                readOnly
                value="raiffemoura93@icloud.com"
              />
              <img src={iconConfig.mailAdd} alt="add" />
            </div>
            {line()}
            <div className="mail-to">
              <p>{t('from')}</p>
              <input
                type="text"
                name="from"
                required="required"
                placeholder={t('yourEmail')}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            {line()}
            <div className="mail-to">
              <p>{t('subject')} </p>
              <input
                type="text"
                name="subject"
                onChange={(e) => setSubject(e.target.value)}
                required="required"
              />
            </div>
            <input type="hidden" name="_next" value="https://localhost:3000" />
            {line()}
            <textarea
              className="mail-textarea"
              name="message"
              defaultValue="Sent from Portfol-IOS"
              required="required"
              style={{ resize: 'none', width: '90%', height: '390px' }}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </form>
        </div>
        <HomeButton />
      </div>
    </div>
  )
}
