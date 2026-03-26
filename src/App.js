import { useState } from 'react';
import StartPage from './pages/StartPage';
import MathTaskTutorial from './pages/MathTaskTutorial';
import MathTask from './pages/MathTask';
import MathTaskResult from './pages/MathTaskResult';
import SpeechTaskTutorial from './pages/SpeechTaskTutorial';
import SpeechTask from './pages/SpeechTask';
import EndPage from './pages/EndPage';
import StepperWithLabels from './components/StepperWithLabels';

/**
 * The studyPagesSequence array represents the sequence in which the pages are shown during the study run.
 * pageIndex is used as the index for the studyPagesSequence array to determine the current active page.
 * By changing the elements of this array in the source code, pages can be removed or the order of the pages.
 * (Note: Not all possible sequences might automatically work as intended. When changing the
 * sequence of pages here, additional changes might be necessary)
 */
const studyPagesSequence = [
  'startPage',
  'mathTaskTutorial',
  'mathTask',
  'mathTaskResult',
  'speechTaskTutorial',
  'speechTask',
  'endPage',
];

/**
 * The slideSequences object maps the names of the pages to arrays that represent the sequence of slides within that particular page.
 * All possible slides for a particular page are contained in its array (some are commented out). To remove
 * a slide from a page it can be simply uncommented in the array. If a page is present in the studyPagesSequence array
 * then it should have at least one slide in its corresponding array here.
 * (Note: Changing the sequence of slides might not always automatically work as intended. Additional changes may be necessary)
 */
const slideSequences = {
  startPage: ['startPage'],
  mathTaskTutorial: ['intro', 'calibration', 'comparison', 'countdown'],
  mathTask: ['mathTask'],
  mathTaskResult: ['mathTaskResult'],
  speechTaskTutorial: ['transition', 'intro'],
  speechTask: ['speechTask'],
  endPage: ['endPage'],
};

/**
 * The main component holds most of the data that is collected during the study run. It's the parent component of the
 * different pages of the DST (like Mathtask or Speechtask).
 */
export default function Main() {
  const [mathTaskScore, setMathTaskScore] = useState(null);
  const [mathTaskPerformance, setMathTaskPerformance] = useState([]);
  const [speechTestAnalysis, setSpeechTestAnalysis] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const page = studyPagesSequence[pageIndex];
  const slide = slideSequences[page][slideIndex];

  function updateMathTaskPerformance(
    bool,
    noAnswerStreak,
    elapsedTimeCurrentQuestion,
    time_paused,
    questionDuration,
    currentQuestionIndex,
    begin_total_time,
    end_total_time,
    taskList,
    numberInput,
    currentFeedback,
  ) {
    const mathTaskEvent = {
      question_number: mathTaskPerformance.length,
      begin_total_time: begin_total_time,
      end_total_time: end_total_time,
      time_paused: time_paused,
      time_available: questionDuration / 1000,
      time_needed: elapsedTimeCurrentQuestion,
      task_question: taskList[currentQuestionIndex].question,
      task_answer: taskList[currentQuestionIndex].answer,
      task_input: numberInput,
      task_feedback: currentFeedback,
      correct_answer: bool,
      user_interaction: noAnswerStreak <= 0,
    };
    setMathTaskPerformance((prev) => [...prev, mathTaskEvent]);
  }

  function speechTestAnalysisCallback(data) {
    setSpeechTestAnalysis(data);
  }

  /**
   * This function causes a slide or page transition by incrementing the appropriate indexes based on whether its the
   * last slide of a page or not.
   */
  function handleNext() {
    if (slideIndex + 1 === slideSequences[page].length) {
      setPageIndex(pageIndex + 1);
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  }

  function startMathTask() {
    window.scrollTo(0, 0);
    setMathTaskPerformance([]);
    handleNext();
  }

  function endMathTask(mathTaskScore) {
    window.scrollTo(0, 0);
    setMathTaskScore(mathTaskScore);
    handleNext();
  }

  function startSpeechTask() {
    window.scrollTo(0, 0);
  }

  function endSpeechTask() {
    window.scrollTo(0, 0);
    handleNext();
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col text-center">
            {page === 'startPage' && <StartPage handleNext={handleNext} />}
            {page === 'mathTaskTutorial' && (
              <>
                <StepperWithLabels
                  slideSequences={slideSequences}
                  slideIndex={slideIndex}
                  studyPagesSequence={studyPagesSequence}
                  pageIndex={pageIndex}
                />
                <MathTaskTutorial
                  activeSlide={slide}
                  handleNext={handleNext}
                  startMathTask={startMathTask}
                />
              </>
            )}
            {page === 'mathTask' && (
              <MathTask
                updateMathTaskPerformance={updateMathTaskPerformance}
                endMathTask={endMathTask}
                handleNext={handleNext}
              />
            )}
            {page === 'mathTaskResult' && (
              <>
                <StepperWithLabels
                  slideSequences={slideSequences}
                  slideIndex={slideIndex}
                  studyPagesSequence={studyPagesSequence}
                  pageIndex={pageIndex}
                />
                <MathTaskResult
                  handleNext={handleNext}
                  mathTaskScore={mathTaskScore}
                />
              </>
            )}
            {page === 'speechTaskTutorial' && (
              <>
                <StepperWithLabels
                  slideSequences={slideSequences}
                  slideIndex={slideIndex}
                  studyPagesSequence={studyPagesSequence}
                  pageIndex={pageIndex}
                />
                <SpeechTaskTutorial
                  activeSlide={slide}
                  handleNext={handleNext}
                />
              </>
            )}
            {page === 'speechTask' && (
              <SpeechTask
                startSpeechTask={startSpeechTask}
                endSpeechTask={endSpeechTask}
                speechTestAnalysisCallback={speechTestAnalysisCallback}
              />
            )}
            {page === 'endPage' && speechTestAnalysis && (
              <>
                <StepperWithLabels
                  slideSequences={slideSequences}
                  slideIndex={slideIndex}
                  studyPagesSequence={studyPagesSequence}
                  pageIndex={pageIndex}
                />
                <EndPage
                  activeSlide={slide}
                  speechTestAnalysis={speechTestAnalysis}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
