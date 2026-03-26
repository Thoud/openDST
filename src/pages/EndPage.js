import Card from '@material-ui/core/Card';
import Slide from '@material-ui/core/Slide';
import { useTranslation } from 'react-i18next';

export default function EndPage({ activeSlide, speechTestAnalysis }) {
  const { t } = useTranslation();

  let loudestQuestionString = '';
  let quietestQuestionString = '';

  if (
    speechTestAnalysis.audioMeanQ1 > speechTestAnalysis.audioMeanQ2 &&
    speechTestAnalysis.audioMeanQ1 > speechTestAnalysis.audioMeanQ3
  ) {
    loudestQuestionString = 'speechTask.question_0.header';
  } else if (
    speechTestAnalysis.audioMeanQ2 > speechTestAnalysis.audioMeanQ1 &&
    speechTestAnalysis.audioMeanQ2 > speechTestAnalysis.audioMeanQ3
  ) {
    loudestQuestionString = 'speechTask.question_1.header';
  } else {
    loudestQuestionString = 'speechTask.question_2.header';
  }

  if (
    speechTestAnalysis.audioMeanQ1 < speechTestAnalysis.audioMeanQ2 &&
    speechTestAnalysis.audioMeanQ1 < speechTestAnalysis.audioMeanQ3
  ) {
    quietestQuestionString = 'speechTask.question_0.header';
  } else if (
    speechTestAnalysis.audioMeanQ2 < speechTestAnalysis.audioMeanQ1 &&
    speechTestAnalysis.audioMeanQ2 < speechTestAnalysis.audioMeanQ3
  ) {
    quietestQuestionString = 'speechTask.question_1.header';
  } else {
    quietestQuestionString = 'speechTask.question_2.header';
  }

  return (
    <Slide
      direction="right"
      in={activeSlide === 'endPage'}
      mountOnEnter
      unmountOnExit
    >
      <div className="py-2">
        <Card>
          <div className="row px-3 py-2 justify-content-center index-body-header ">
            {t('speechTask.analysis.header')}
          </div>
        </Card>
        <div className="my-3 container-fluid">
          <table id="analysis-table">
            <thead>
              <tr>
                <th className="leftmostCol">{''}</th>
                <th>
                  <b>{t('speechTask.analysis.question_1')}</b>
                </th>
                <th>
                  <b>{t('speechTask.analysis.question_2')}</b>
                </th>
                <th>
                  <b>{t('speechTask.analysis.question_3')}</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="leftmostCol">
                  <b>{t('speechTask.analysis.breaks')}</b>
                </td>
                <td>{speechTestAnalysis.speakBreakCounterQ1}</td>
                <td>{speechTestAnalysis.speakBreakCounterQ2}</td>
                <td>{speechTestAnalysis.speakBreakCounterQ3}</td>
              </tr>
              <tr>
                <td className="leftmostCol">
                  <b>{t('speechTask.analysis.mean')}</b>
                </td>
                <td>
                  {Math.round(speechTestAnalysis.audioMeanQ1 * 100) / 100}
                </td>
                <td>
                  {Math.round(speechTestAnalysis.audioMeanQ2 * 100) / 100}
                </td>
                <td>
                  {Math.round(speechTestAnalysis.audioMeanQ3 * 100) / 100}
                </td>
              </tr>
              <tr>
                <td className="leftmostCol">
                  <b>{t('speechTask.analysis.speakingRatio')}</b>
                </td>
                <td>
                  {isNaN(
                    Math.round(
                      (speechTestAnalysis.speakingTickCounterQ1 /
                        (speechTestAnalysis.speakingTickCounterQ1 +
                          speechTestAnalysis.speakBreakCounterQ1)) *
                        10000,
                    ) / 100,
                  )
                    ? '0%'
                    : Math.round(
                        (speechTestAnalysis.speakingTickCounterQ1 /
                          (speechTestAnalysis.speakingTickCounterQ1 +
                            speechTestAnalysis.speakBreakCounterQ1)) *
                          10000,
                      ) / 100}
                  {'%'}
                </td>
                <td>
                  {isNaN(
                    Math.round(
                      (speechTestAnalysis.speakingTickCounterQ2 /
                        (speechTestAnalysis.speakingTickCounterQ2 +
                          speechTestAnalysis.speakBreakCounterQ2)) *
                        10000,
                    ) / 100,
                  )
                    ? '0%'
                    : Math.round(
                        (speechTestAnalysis.speakingTickCounterQ2 /
                          (speechTestAnalysis.speakingTickCounterQ2 +
                            speechTestAnalysis.speakBreakCounterQ2)) *
                          10000,
                      ) / 100}
                  {'%'}
                </td>
                <td>
                  {isNaN(
                    Math.round(
                      (speechTestAnalysis.speakingTickCounterQ3 /
                        (speechTestAnalysis.speakingTickCounterQ3 +
                          speechTestAnalysis.speakBreakCounterQ3)) *
                        10000,
                    ) / 100,
                  )
                    ? '0%'
                    : Math.round(
                        (speechTestAnalysis.speakingTickCounterQ3 /
                          (speechTestAnalysis.speakingTickCounterQ3 +
                            speechTestAnalysis.speakBreakCounterQ3)) *
                          10000,
                      ) / 100}
                  {'%'}
                </td>
              </tr>
              <tr>
                <td className="leftmostCol">
                  <b>{t('speechTask.analysis.volumeHigh')}</b>
                </td>
                <td>
                  {Math.round(speechTestAnalysis.volumeHighQ1 * 100) / 100}
                </td>
                <td>
                  {Math.round(speechTestAnalysis.volumeHighQ2 * 100) / 100}
                </td>
                <td>
                  {Math.round(speechTestAnalysis.volumeHighQ3 * 100) / 100}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="row analysisQuestion pl-3 py-2">
            {t('speechTask.analysis.questionLoudest')}
            {t(loudestQuestionString)}
          </div>
          <div className="row analysisQuestion pl-3 pb-2">
            {t('speechTask.analysis.questionQuietest')}
            {t(quietestQuestionString)}
          </div>
        </div>
        <div className="row justify-content-center py-2">
          <div className="col-12">
            <div className="font-weight-bold">
              {t('end.questionnaire.thanking')}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
