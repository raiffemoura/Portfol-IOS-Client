import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/phone.css";
import HomeButton from "../components/HomeButton";
import { useTranslation } from "react-i18next";
import iconConfig from "../components/iconConfig";

const Phone = () => {
  const [isEraseHovered, setIsEraseHovered] = React.useState(false);
  const [currentNumber, setCurrentNumber] = React.useState("");
  const [selected, setSelected] = useState("contacts");

  const { t } = useTranslation();
  const changeSelected = (value) => {
    setSelected(value);
  };
  const insertMask = (phone) => {
    const noMask = phone.replace(/\D/g, "");
    const { length } = noMask;

    if (length <= 11) {
      return noMask
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, "$1-$2");
    } else if (length > 14) {
      return "..." + noMask.slice(-11);
    }
    return phone;
  };

  const inputNum = (e) => {
    if (currentNumber === "") {
      setCurrentNumber(e.target.value);
    } else {
      setCurrentNumber(currentNumber + e.target.value);
    }
    console.log(currentNumber);
  };

  const erase = () => {
    let erase = currentNumber;
    erase = erase.slice(0, -1);
    setCurrentNumber(erase);
  };

  return (
    <div className="container-calculator">
      <div>
        <div className="screen">
          <Header />
          <div className="phone-numbers">{insertMask(currentNumber)}</div>
          <div className="keypad">
            <button className="keypad-btn" onClick={inputNum} value={1}>
              1
            </button>
            <button className="keypad-btn" onClick={inputNum} value={2}>
              2
            </button>
            <button className="keypad-btn" onClick={inputNum} value={3}>
              3
            </button>
            <button className="keypad-btn" onClick={inputNum} value={4}>
              4
            </button>
            <button className="keypad-btn" onClick={inputNum} value={5}>
              5
            </button>
            <button className="keypad-btn" onClick={inputNum} value={6}>
              6
            </button>
            <button className="keypad-btn" onClick={inputNum} value={7}>
              7
            </button>
            <button className="keypad-btn" onClick={inputNum} value={8}>
              8
            </button>
            <button className="keypad-btn" onClick={inputNum} value={9}>
              9
            </button>
            <button
              className="keypad-btn asterisk"
              onClick={inputNum}
              value={"*"}
            >
              ✱
            </button>
            <button className="keypad-btn" onClick={inputNum} value={0}>
              0
            </button>
            <button className="keypad-btn" onClick={inputNum} value={"#"}>
              #
            </button>

            <button className="keypad-call">
              <img src={iconConfig.call} alt="" />
            </button>

            <button className="keypad-erase">
              <img
                src={isEraseHovered ? iconConfig.eraseHover : iconConfig.erase}
                alt="erase"
                onClick={erase}
                onMouseEnter={() => setIsEraseHovered(true)}
                onMouseLeave={() => setIsEraseHovered(false)}
              />
            </button>
          </div>
          <div className="menu-bottom-phone">
            <div>
              <img
                className="menu-bottom-phone-img"
                onClick={() => changeSelected("favourites")}
                src={
                  selected === "favourites"
                    ? iconConfig.favouritesBlue
                    : iconConfig.favourites
                }
                alt=""
              />
              <p>{t("favourites")}</p>
            </div>
            <div>
              <img
                className="menu-bottom-phone-img"
                onClick={() => changeSelected("recents")}
                src={
                  selected === "recents"
                    ? iconConfig.recentsBlue
                    : iconConfig.recents
                }
                alt=""
              />
              <p>{t("recents")}</p>
            </div>

            <div>
              <img
                className="menu-bottom-phone-img"
                onClick={() => changeSelected("contacts")}
                src={
                  selected === "contacts"
                    ? iconConfig.contactsBlue
                    : iconConfig.contacts
                }
                alt=""
              />
              <p>{t("contacts")}</p>
            </div>

            <div>
              <img
                className="menu-bottom-phone-img"
                onClick={() => changeSelected("keypad")}
                src={
                  selected === "keypad"
                    ? iconConfig.keypadBlue
                    : iconConfig.keypad
                }
                alt=""
              />
              <p>{t("keypad")}</p>
            </div>

            <div>
              <img
                className="menu-bottom-phone-img"
                onClick={() => changeSelected("voicemail")}
                src={
                  selected === "voicemail"
                    ? iconConfig.voicemailBlue
                    : iconConfig.voicemail
                }
                alt=""
              />
              <p>{t("voicemail")}</p>
            </div>
          </div>

          <HomeButton />
        </div>
      </div>
    </div>
  );
};

export default Phone;
