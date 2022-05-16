const iTypes = FormApp.ItemType;

// Main Control of answer
function createRandomSubmission(prob, text=""){

  const iTypes = FormApp.ItemType;
  const resp = form.createResponse();
  const questions = form.getItems(); 
  j = 0;
  questions.forEach(function (q,i){
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
    }
    resp.withItemResponse(answer);
  });
  resp.submit();
}

// Multiple choice answer
function getWeightedRandomMCQAnswer(q, prob){
  var random = Math.random(), sum = 0, choices = q.getChoices();
  Logger.log(prob);
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

  const questions = form.getItems(); 
  const p = [[0.3, 0.3, 0.3, 0.1],[0.7, 0.3],[0.25,0.25,0.25,0.25]];
  const text = [["a", "b", "c", "d"]];
  for(let i = 0; i < 100; i++){
    createRandomSubmission(questions,p,text);
  }
}






