// Main Control of answer
function createRandomSubmission(prob, text, quantity){

  const questions = form.getItems();
  var choices = [];
  var i = 0;
  var questions_length = 0;
  questions.forEach(function (q){
    const qType = q.getType();
    switch (qType)
    {
      case iTypes.MULTIPLE_CHOICE:
        choices.push(getMCQChoices(q.asMultipleChoiceItem()));
        break;
      case iTypes.TEXT:
        q = q.asTextItem();
        var temp = [];
        for(let j = 0; j < text[i].length; j++){
          temp.push(q.createResponse(text[i][j]));
        }
        choices.push(temp);
        i++;
        break;
      case iTypes.SCALE:
        choices.push(getScaleBounds(q.asScaleItem()));
        break;
      case iTypes.PAGE_BREAK:
        return;
    }
    questions_length++
  });
  getWeightedRandomAnswer(choices, questions_length, prob, quantity);
  return true;
}

// Multiple choice answer
function getMCQChoices(q){
  const choices = q.getChoices()
  var options = [];
  for(let i = 0; i < choices.length; i++){
    options.push(q.createResponse(choices[i].getValue()));
  }
  return options;
}

// Scale answer
function getScaleBounds(q){
  const upperbound = q.getUpperBound(), lowerbound = q.getLowerBound();
  var options = [];
  for(let i = lowerbound; i <= upperbound; i++){
    options.push(q.createResponse(i));
  }
  return options;
}

function getWeightedRandomAnswer(choices, questions_length, prob, quantity){

  for(let i = 0; i < quantity; i++){
    const resp = form.createResponse();
    for(let j = 0; j < questions_length; j++){
      const random = Math.random();
      var sum = 0;
      var answer;
      for(let k = 0; k < choices[j].length; k++){
        sum += prob[j][k];
        if(sum > random){
          answer = choices[j][k];
          break;
        }else{
          if(k == choices[j].length - 1){
            answer = choices[j][k];
          }
        }
      }
      resp.withItemResponse(answer);
    }
    resp.submit();
  }
}

function test(){

  /*const p = [[0.33299999999999996, 0.33299999999999996, 0.33399999999999996], [0.25, 0.25, 0.25, 0.25], [0.25, 0.25, 0.25, 0.25], [0.16699999999999998, 0.16699999999999998, 0.16699999999999998, 0.16699999999999998, 0.16699999999999998, 0.165], [0.33299999999999996, 0.33299999999999996, 0.33399999999999996], [0.5, 0.5], [0.33299999999999996, 0.33299999999999996, 0.33399999999999996], [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]];
  const text = 	[["abc", "edf"]];
  createRandomSubmission(p,text);*/
}