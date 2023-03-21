import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
import AnswerModalWindow from './answerModal/AnswerModalWindow';
import useAsync from './useAsync';
import qnaStyles from './qnaStyles.module.css';

// create and export css as a context object
export const QnaStyles = React.createContext(null);
export const OnAddAnswer = React.createContext(null);

function QuestionsAnswers() {
  const params = useParams(); // to get productId
  // sort according to helpfulness
  const sortDescHelpful = (a, b) => (b.question_helpfulness - a.question_helpfulness);

  // need to declare all the state variables on the top
  const [numberOfQs, setNumberOfQs] = useState(2);
  // visibility state variable for answer modal window
  const [answerFormVisible, setAnswerFromVisible] = useState(false);
  // question stata vars for answer modal
  const [questionInfo, setQuestionInfo] = useState({
    id: '',
    body:'',
  })

  // fetching initial data
  /// handle loading and error
  const reqObjs = [
    axios.get('http://localhost:8080/qa/questions/', {
      params: {
        product_id: params.productId,
        page: 1,
        count: 100,
      },
    }),
    axios.get(`http://localhost:8080/products/${params.productId}`),
  ];

  // custom hook to handle requests
  const { loading, response, error } = useAsync(reqObjs, []);

  // handle loading state;
  if (loading) return <div> Loading...</div>;
  if (error) return <div> Error has occurred while loading</div>;
  if (!response) return null;

  // extract data from responses
  const questions = response[0].data.results.sort(sortDescHelpful);
  const productInfo = response[1].data;

  // function for loading more questions
  const loadMoreQs = () => {
    setNumberOfQs(Math.min(numberOfQs + 2, questions.length));
  };

  const onAddAnswer = (state, id, body) => {
    setQuestionInfo({id, body})
    setAnswerFromVisible(state);
  };

  return (

    <QnaStyles.Provider value={qnaStyles}>
      <OnAddAnswer.Provider value={onAddAnswer}>
        <div>
          <h2>Main Q&A Div</h2>
          {/* <Search /> */}
          <QuestionsList questions={questions} numberOfQs={numberOfQs} />
          {/* show more questions button only when there are more */}
          <div>
            {numberOfQs < questions.length
              && <input type="button" onClick={loadMoreQs} value="More Answered Questions" />}
            <input type="button" onClick={console.log} value="Add a question +" />
          </div>
          {answerFormVisible
            && (
              <AnswerModalWindow
                qnaStyles={qnaStyles}
                onAddAnswer={onAddAnswer}
                productInfo={productInfo}
                questionInfo={questionInfo}
              />
            )}
        </div>
      </OnAddAnswer.Provider>
    </QnaStyles.Provider>
  );
}

export default QuestionsAnswers;
