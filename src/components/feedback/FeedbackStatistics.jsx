import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import iconConfig from '../iconConfig';
import HeaderBlack from '../HeaderBlack';
import FeedbackFooter from './FeedbackFooter';
import HomeButtonFeedback from './HomeButtonFeedback';
import { useTranslation } from 'react-i18next';

const FeedbackStatistics = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feedbacks');
        setFeedbacks(response.data);
      } catch (err) {
        console.log('Erro ao buscar feedbacks: ' + err);
      }
    };
    fetchFeedbacks();
  }, []);

  const ratings = feedbacks.map((feedback) => feedback.rating);
  const totalA = ratings.filter((rating) => rating === 'A').length;
  const totalB = ratings.filter((rating) => rating === 'B').length;
  const totalC = ratings.filter((rating) => rating === 'C').length;
  const average = (totalA * 10 + totalB * 7.5 + totalC * 5) / ratings.length;
  const roundedAverage = average.toFixed(2);

  const { t } = useTranslation();

  return (
    <div className="container-feedback">
      <div>
        <div className="screen ">
          <HeaderBlack />
          <div className="feedback-header">
            <Link to={'/feedback'}>
              {' '}
              <img src={iconConfig.arrowBackBlue} alt="back" />
            </Link>
            <img id="feedback-logo" src={iconConfig.feedbackLogo} alt="logo" />
            <Link to={'/thanks-for-your-feedback'}>
              <img src={iconConfig.addFeedback} alt="add-feedback" />
            </Link>
          </div>
          <div className="statistics">
            <div className="statistics-container">
              <h4 className="tgray">{t('feedbackDetails')}</h4>
              <div className="statistic-box">
                <div className="statistic-img">
                  <img src={iconConfig.feedbackA} alt="A" />
                </div>
                <div className="statistic-text">
                  <h2>{t('great')}</h2>
                  <p>{t('youDidSomething')}</p>
                </div>
                <div className="statistics-rating">
                  <h2>{totalA}</h2>
                </div>
              </div>

              <div className="statistic-box">
                <div className="statistic-img">
                  <img src={iconConfig.feedbackB} alt="B" />
                </div>
                <div className="statistic-text">
                  <h2>{t('good')}</h2>
                  <p>{t('keepUpTheGoodWork')}</p>
                </div>
                <div className="statistics-rating">
                  <h2>{totalB}</h2>
                </div>
              </div>

              <div className="statistic-box">
                <div className="statistic-img">
                  <img src={iconConfig.feedbackC} alt="C" />
                </div>
                <div className="statistic-text">
                  <h2>{t('notGood')}</h2>
                  <p>{t('somethingNeedsImprovement')}</p>
                </div>
                <div className="statistics-rating">
                  <h2>{totalC}</h2>
                </div>
              </div>

              <div className="statistic-box">
                <div className="statistic-img">
                  <img src={iconConfig.average} alt="average" />
                </div>
                <div className="statistic-text">
                  <h2>{t('average')}</h2>
                  <p>{t('considering')}</p>
                </div>
                <div className="statistics-rating">
                  <h2>{roundedAverage === 'NaN' ? 0 : roundedAverage}</h2>
                </div>
              </div>
            </div>
            <div className="statistics-footer">
              <FeedbackFooter />
            </div>
            <HomeButtonFeedback />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackStatistics;
