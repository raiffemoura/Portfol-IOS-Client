import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/stocks.css";
import iconConfig from "../components/iconConfig";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import { useTranslation } from "react-i18next";
const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Obter a data atual e formatá-la
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString("en", { month: "long" });
  const day = currentDate.getDate();
  const translatedMonthName = t(monthName);

  const formattedDate = `${day} ${translatedMonthName}`;

  // Função para buscar os dados das ações
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-USD,BTC-BRL,ETH-USD,ETH-USD,ETH-BRL"
        );
        if (response.status === 200) {
          setStocks(response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="container-calculator">
      <div>
        <div className="screen ">
          <Header />
          {/* Cabeçalho das ações */}

          <div className="stocks-header">
            {/* Título das ações e data */}
            <div className="stocks-back">
              <span>
                <Link to="/">
                  <img src={iconConfig.arrowBack} alt="" />
                </Link>
              </span>
              <div>
                <h3>{t("stocks")}</h3>
                <h4>{formattedDate}</h4>
              </div>
            </div>
            <div>
              <img src={iconConfig.more} alt="" />
            </div>
          </div>
          {/* Caixa de entrada de pesquisa */}

          <div className="stocks-input-box">
            <input
              className="stocks-input"
              type="text"
              placeholder={t("search")}
            />
          </div>
          {/* Container das ações */}
          <div className="stocks-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              Object.keys(stocks).map((key, index) => (
                <div key={index} className="stocks-box">
                  <div>
                    <h3>
                      {stocks[key].code}/{stocks[key].codein}
                    </h3>
                    <p>{t(`${stocks[key].code}/${stocks[key].codein}`)}</p>
                  </div>
                  <div className="stocks-price">
                    {localStorage.getItem("language") === "EN" ? (
                      <h3>
                        {parseFloat(stocks[key].bid).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h3>
                    ) : (
                      <h3>
                        {parseFloat(stocks[key].bid).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h3>
                    )}

                    <h4
                      className={
                        stocks[key].pctChange > 0
                          ? "stocks-positive"
                          : "stocks-negative"
                      }
                    >
                      {parseFloat(stocks[key].pctChange).toFixed(2)}%
                    </h4>
                  </div>
                </div>
              ))
            )}
          </div>
          <HomeButton />
        </div>
      </div>
    </div>
  );
};

export default Stocks;
