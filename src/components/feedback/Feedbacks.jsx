import React, { useState, useEffect } from 'react';
import axios from 'axios';
import iconConfig from '../iconConfig';
import { Link } from 'react-router-dom';
import FeedbackFooter from './FeedbackFooter';
import HomeButtonFeedback from './HomeButtonFeedback';

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showAllFeedbacks, setShowAllFeedbacks] = useState(true);
  const [feedbackID, setFeedbackID] = useState(null);
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedbacks');
        setFeedbacks(response.data);
      } catch (err) {
        console.log('Erro ao buscar feedbacks: ' + err);
      }
    };
    fetchFeedbacks();
  }, []);

  const limitString = (string, limit) => {
    if (string.length > limit) {
      return string.substring(0, limit) + '...';
    }
    return string;
  };

  const handleFeedbackID = (feedbackID) => {
    setShowAllFeedbacks(!showAllFeedbacks);
    setFeedbackID(feedbackID);
  };

  return (
    <div>
      {/* Cabeçalho */}
      <div className="feedback-header">
        <Link to={'/'}>
          {' '}
          <img src={iconConfig.arrowBackBlue} alt="back" />
        </Link>
        <img id="feedback-logo" src={iconConfig.feedbackLogo} alt="logo" />
        <Link to={'/thanks-for-your-feedback'}>
          <img
            className="feedback-add-feedback"
            src={iconConfig.addFeedback}
            alt="add-feedback"
          />
        </Link>
      </div>
      {/* Container de feedbacks */}

      <div className="feedback-container">
        {/* Renderização condicional dos feedbacks */}

        {/* <div
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: '20px',
            marginLeft: '10px',
            marginTop: '150px',
          }}
        >
          <p>Sem dados.</p>
          <p>App Feedback em contrução.</p>
        </div> */}

        {showAllFeedbacks &&
          // Mapeamento e exibição dos feedbacks

          feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className={`feedback-box ${feedback.rating}`}
              onClick={() => handleFeedbackID(feedback._id)}
            >
              <div className="feedback-box-header">
                <h3>{limitString(feedback.name, 12)}</h3>
                <h6>{feedback.date}</h6>
              </div>
              <div className="feedback-box-text">
                <p>{limitString(feedback.description, 80)}</p>
              </div>
            </div>
          ))}

        {!showAllFeedbacks &&
          // Mapeamento e exibição de um feedback específico
          feedbacks.map(
            (feedback) =>
              feedback._id === feedbackID && (
                <div
                  key={feedback._id}
                  className={`feedback-box ${feedback.rating}`}
                  onClick={() => handleFeedbackID(feedback._id)}
                >
                  <div className="feedback-header-expanded">
                    <div className="feedback-box-header-expanded">
                      <h3 className="feedback-title-name">{feedback.name}</h3>
                      <h6>{feedback.date}</h6>
                    </div>
                    <div className="feedback-box-rating">
                      <img
                        src={iconConfig[`feedback${feedback.rating}`]}
                        alt=""
                        srcset=""
                      />
                    </div>
                  </div>
                  <div className="feedback-box-text">
                    <p>{feedback.description}</p>
                  </div>
                </div>
              ),
          )}
      </div>
      {/* Rodapé e botão de home */}
      <FeedbackFooter />
      <HomeButtonFeedback />
    </div>
  );
};

export default Feedbacks;
