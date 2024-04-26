import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderBlack from '../HeaderBlack';
import '../../styles/feedback.css';
import axios from 'axios';
import iconConfig from '../iconConfig';
import nice from '../../assets/icons/nice.gif';
import { useTranslation } from 'react-i18next';

const Feedback = () => {
  const [selectedRate, setSelectedRate] = useState(null);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackDescription, setFeedbackDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const { t } = useTranslation();

  const handleImageClick = (rate) => {
    if (selectedRate === rate) {
      setSelectedRate(null);
    } else {
      setSelectedRate(rate);
    }
  };
  const handleNameChange = (event) => {
    setFeedbackName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setFeedbackDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (!feedbackName || !feedbackDescription || !selectedRate) {
      alert('Name, description and rating are required fields.');
    } else {
      axios
        .post('http://localhost:5000/api/feedback', {
          name: feedbackName,
          description: feedbackDescription,
          rating: selectedRate,
        })
        .then(() => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 6700);
          setTimeout(() => {
            window.location.href = '/feedback';
          }, 5500);
        })
        .catch((error) => {
          setSuccess(false);
          alert(
            'There was an error submitting feedback. Please try again later.',
          );
        });
    }
  };

  return (
    <div className="container-feedback">
      <div>
        <div className="screen ">
          <HeaderBlack />
          <div className={`feedback-modal ${success ? 'show' : ''}`}>
            <div className="feedback-modal-content">
              <img src={nice} alt="nice" />
              <h3>{t('feedbackSubmmited')}</h3>
            </div>
          </div>

          <div className="feedback-header">
            <Link to={'/feedback'}>
              <img src={iconConfig.arrowBackBlue} alt="arrow-back-blue" />
            </Link>
            <img id="feedback-logo" src={iconConfig.feedbackLogo} alt="logo" />
            <Link to={'/feedback'}>
              <img src={iconConfig.closefeedback} alt="close-feedback" />
            </Link>
          </div>

          <div className="feedback-person tblack">
            <div>
              <h3>Raiffe Moura</h3>
              <p>{t('fullStackDev')}</p>
            </div>
            <img src={iconConfig.avatar} alt="person" />
          </div>

          <div className="feedback-questions tblack">
            <div className="feedback-question">
              <h3>{t('howWasYourExperience')}</h3>
              <div className="feedback-rating">
                <img
                  src={
                    selectedRate === 'A'
                      ? iconConfig.feedbackASelected
                      : iconConfig.feedbackA
                  }
                  alt="add-feedback"
                  className={selectedRate === 'A' ? 'selected' : ''}
                  onClick={() => handleImageClick('A')}
                />
                <img
                  src={
                    selectedRate === 'B'
                      ? iconConfig.feedbackBSelected
                      : iconConfig.feedbackB
                  }
                  alt="add-feedback"
                  className={selectedRate === 'B' ? 'selected' : ''}
                  onClick={() => handleImageClick('B')}
                />
                <img
                  src={
                    selectedRate === 'C'
                      ? iconConfig.feedbackCSelected
                      : iconConfig.feedbackC
                  }
                  alt="add-feedback"
                  className={selectedRate === 'C' ? 'selected' : ''}
                  onClick={() => handleImageClick('C')}
                />
              </div>
            </div>
          </div>

          <div className="feedback-textarea-box tblack">
            <p>{t('yourHonestFeedback')}</p>
            <textarea
              onChange={handleDescriptionChange}
              className="feedback-textarea tblack"
              placeholder="Enter your honest feedback here"
            ></textarea>
            <p>{t('yourName')}</p>
            <input
              onChange={handleNameChange}
              className="feedback-input-name"
              type="text"
              maxLength={20}
              placeholder="Your name"
            />

            <div className="feedback-private">
              <Link
                to={
                  'https://api.whatsapp.com/send?phone=5583991669951&text=Ol%C3%A1%20Raiffe%2C%20cheguei%20aqui%20atrav%C3%A9s%20do%20seu%20portfol-IOS...'
                }
              >
                <p>{t('privateFeedback')}</p>
              </Link>
              <Link
                to={
                  'https://api.whatsapp.com/send?phone=5583991669951&text=Ol%C3%A1%20Raiffe%2C%20cheguei%20aqui%20atrav%C3%A9s%20do%20seu%20portfol-IOS...'
                }
              >
                <img src={iconConfig.privateChat} alt="chat" />
              </Link>
            </div>
          </div>

          <div className="feedback-submit-box">
            <button onClick={handleSubmit} className="feedback-submit">
              {t('sendFeedback')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
