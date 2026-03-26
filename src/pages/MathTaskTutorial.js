import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Slide from '@material-ui/core/Slide';
import i18next from 'i18next';

import GenderAndAge from '../components/GenderAndAge';
import CountdownBeforeTask from '../components/CountdownBeforeTask';
import Calibration from '../components/Calibration';

export default function MathTaskTutorial({
  handleNext,
  activeSlide,
  startMathTask,
}) {
  return (
    <>
      <Slide
        direction="right"
        in={activeSlide === 'intro'}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <Card>
            <div className="row py-2 justify-content-center index-body-header">
              {i18next.t('example.header')}
            </div>
            <CardContent className="py-0">
              <div className="row justify-content-center">
                <div className="col-12 ">
                  <ul className="list-styled ul stepper-bullet-point">
                    <li className="pb-1">{i18next.t('example.text0')}</li>
                    <li className="pb-1">{i18next.t('example.text1')}</li>
                    <li className="pb-1">{i18next.t('example.text2')}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="row justify-content-center align-items-center pb-2">
            <div className="p-2">
              <Button
                variant="contained"
                size="medium"
                className="alert-buttons"
                onClick={handleNext}
              >
                {i18next.t('button.continue')}
              </Button>
            </div>
          </div>
        </div>
      </Slide>
      <Slide
        direction="right"
        in={activeSlide === 'calibration'}
        mountOnEnter
        unmountOnExit
      >
        <Calibration handleNext={handleNext} />
      </Slide>
      <Slide
        direction="right"
        in={activeSlide === 'comparison'}
        mountOnEnter
        unmountOnExit
      >
        <GenderAndAge handleNext={handleNext} />
      </Slide>
      <Slide
        direction="right"
        in={activeSlide === 'countdown'}
        mountOnEnter
        unmountOnExit
      >
        <CountdownBeforeTask startTask={startMathTask} />
      </Slide>
    </>
  );
}
