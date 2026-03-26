import Button from '@material-ui/core/Button';
import LanguageIcon from '@material-ui/icons/Language';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import uni_logo from '../img/uni_logo.jpg';

export default function StartPage({ handleNext }) {
  const [language, setLanguage] = useState('de');
  const { t, i18n } = useTranslation();

  function changeLanguage() {
    const newLanguage = language === 'de' ? 'en' : 'de';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  }

  return (
    <>
      <nav
        id="mainNav"
        className="navbar navbar-expand-md navbar-dark bg-black fixed-top"
      >
        <button className="navbar-button" onClick={changeLanguage}>
          <LanguageIcon /> {t('startPage.language')}
        </button>
      </nav>
      <section id="index-body">
        <div className="container">
          <div className="row justify-content-center text-center">
            <h3 className="p-3">{t('startPage.header')}</h3>
          </div>
          <div className="row index-middle-row text-center justify-content-center">
            <div className="container-fluid">
              <div className="index-body-text1">{t('startPage.text1')}</div>
              <div className="font-italic index-body-title">
                "{t('startPage.title')}"
              </div>
            </div>
          </div>
          <div className="row index-bottom-row text-center justify-content-center">
            <div className="container-fluid">
              <div className="p-2">
                <Button
                  variant="contained"
                  size="medium"
                  className="alert-buttons"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    handleNext();
                  }}
                >
                  {t('startPage.button')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="imprint-partners">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="text-center index-body-footer">
                {t('startPage.footer')}
              </div>
            </div>
          </div>
          <div className="pt-2">
            <img
              className="mx-auto d-block index-logo-size"
              src={uni_logo}
              alt={'University of Hohenheim'}
            />
          </div>
        </div>
      </section>
    </>
  );
}
