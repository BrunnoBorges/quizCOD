/* eslint-disable react/prop-types */
import React from 'react';

import { Lottie } from '@crello/react-lottie';
import { useRouter } from 'next/router';

import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';
import BackLinkArrow from '../../src/components/BackLinkArrow';

import check from '../../src/screens/Quiz/animations/checkmark.json';
import error from '../../src/screens/Quiz/animations/error-animation.json';
import carregando from '../../src/screens/Quiz/animations/carregando.json';


function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <Widget.TextAlternative>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas, de um total de 10.
        </Widget.TextAlternative>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              <Widget.Text>
                Pergunta
                {index + 1}
                {' '}
                Resultado:
                {result === true
                  ? ' Acertou'
                  : ' Errou'}
              </Widget.Text>
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <Lottie
          width="200px"
          height="200px"
          style={{margin: "0px auto"}}
          className="lottie-container basic"
          config={{ animationData: carregando, loop: true, autoplay: true }}
        />
      </Widget.Header>

      <Widget.Content>
        Preparando armas ...
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '250px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect &&  <Lottie
          width="100px"
          height="100px"
          style={{margin: "0px auto"}}
          className="lottie-container basic"
          config={{ animationData: check, loop: true, autoplay: true }}
        />}
          {isQuestionSubmited && !isCorrect &&  <Lottie
          width="100px"
          height="100px"
          style={{margin: "0px auto"}}
          className="lottie-container basic"
          config={{ animationData: error, loop: true, autoplay: true }}
        />}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage(
  questions,
  bg,
  loadingImage
) {
  const router = useRouter();

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  // const totalQuestions = questions.length;

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 4 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function handleRestartTest(e) {
    e.preventDefault();
    router.push('/');
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {/* {screenState === screenStates.LOADING && <LoadingWidget />} */}
        {screenState === screenStates.LOADING && <LoadingWidget loadingImage={loadingImage} />}

        {/* {screenState === screenStates.RESULT && <ResultWidget results={results} />} */}
        {screenState === screenStates.RESULT && (
          <>
            <ResultWidget results={results} query={router.query} />
            <form onSubmit={handleRestartTest}>
              <Button type="submit">
                REFAZER O TESTE
              </Button>
            </form>
          </>
        )}
      </QuizContainer>
    </QuizBackground>
  );
}