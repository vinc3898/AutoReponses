// Main Control of answer
function createRandomSubmission(prob, text){
  
  const resp = form.createResponse();
  const questions = form.getItems(); 
  var j = 0;
  var i = 0;
  questions.forEach(function (q){
    const qType = q.getType();
    var answer;
    switch (qType)
    {
      case iTypes.MULTIPLE_CHOICE:
         answer = getWeightedRandomMCQAnswer(q.asMultipleChoiceItem(), prob[i]);
         break;
      case iTypes.TEXT:
         answer = getWeightedRandomTextAnswer(q.asTextItem(), prob[i], text[j]);
         j++;
         break;
      case iTypes.SCALE:
         answer = getWeightedRandomScaleAnswer(q.asScaleItem(), prob[i]);
         break;
      case iTypes.PAGE_BREAK:
         return;
    }
    i++;
    resp.withItemResponse(answer);
  });
  resp.submit();
}

// Multiple choice answer
function getWeightedRandomMCQAnswer(q, prob){
  var random = Math.random(), sum = 0, choices = q.getChoices();
  for(let i = 0; i < choices.length - 1; i++){
    sum += prob[i];
    if(sum > random){
      return  q.createResponse(choices[i].getValue());
    }
  }
  return q.createResponse(choices[choices.length - 1].getValue());
}

// Scale answer
function getWeightedRandomScaleAnswer(q, prob){
  var random = Math.random(), sum = 0;
  var upperbound = q.getUpperBound(), lowerbound = q.getLowerBound();
  var choices = [];

  for(let i = lowerbound; i <= upperbound; i++){
    choices.push(i);
  }
  Logger.log(prob);
  for(let i = 0; i < choices.length - 1; i++){
    sum += prob[i];
    if(sum > random){
      return  q.createResponse(choices[i]);
    }
  }
  return q.createResponse(choices[choices.length - 1]);
}

// Text answer
function getWeightedRandomTextAnswer(q, prob, text){
  var random = Math.random(), sum = 0;
  for(let i = 0; i < text.length - 1; i++){
    sum += prob[i];
    if(sum > random){
      return  q.createResponse(text[i]);
    }
  }
  return q.createResponse(text[text.length - 1]);
}

function test(){

  const p = [[0.33299999999999996, 0.33299999999999996, 0.33399999999999996], [0.25, 0.25, 0.25, 0.25], [0.25, 0.25, 0.25, 0.25], [0.16699999999999998, 0.16699999999999998, 0.16699999999999998, 0.16699999999999998, 0.16699999999999998, 0.165], [0.33299999999999996, 0.33299999999999996, 0.33399999999999996], [0.5, 0.5], [0.33299999999999996, 0.33299999999999996, 0.33399999999999996], [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]];
  const text = 	[["abc", "edf"]];
  createRandomSubmission(p,text);
}






