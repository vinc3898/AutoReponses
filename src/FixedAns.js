function createFixSubmission(questions, prob, text="", numbers){
  
  j = 0;
  var answer = [];
  questions.forEach(function (q,i){
    const qType = q.getType();
    switch (qType)
    {
      case iTypes.MULTIPLE_CHOICE:
         answer.push(getMCQAnswer(q.asMultipleChoiceItem(), prob[i], numbers));
         break;
      case iTypes.TEXT:
         //answer[i].push(getTextAnswer(q.asTextItem(), prob[i], text[j]), numbers);
         j++;
         break;
      case iTypes.SCALE:
         //answer[i].push(getScaleAnswer(q.asScaleItem(), prob[i]), numbers);
         break;
    }
  });

  for(let i = 0; i < numbers; i++){
    var resp = form.createResponse();
    for(let j = 0; j < questions.length; j++){
      resp.withItemResponse(answer[j][i]);
    }
    resp.submit();
  }
}

function getMCQAnswer(q, prob, numbers){
  
  const each = prob.map(x => x * numbers);
  var choices = q.getChoices();
  var answersheet = [];

  for(let i = 0; i < choices.length; i++){
    for(let j = 0; j < each[i]; j++){
      answersheet.push(q.createResponse(choices[i].getValue()));
    }
  }
  
  return answersheet;
}


function test2(){
  const questions = form.getItems(); 
  const p = [[0.3, 0.3, 0.3, 0.1],[0.7, 0.3],[0.25,0.25,0.45,0.05]];
  const text = [["a", "b", "c", "d"]];
  const numbers = 100;
  createFixSubmission(questions, p, "", numbers);

}
