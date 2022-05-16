const form = FormApp.getActiveForm();

function onOpen(){
  
  FormApp.getUi().createAddonMenu().addItem("Open", "showSidebar").addToUi();
}

function showSidebar(){
  var html = HtmlService.createHtmlOutputFromFile('Main_Interface');
  FormApp.getUi().showSidebar(html);
}

function result(){
  const questions = form.getItems();
  var data = [];
  questions.forEach(function (q, j) {
    data[j] = [];
    data[j].push(q.getTitle());
    const qType = q.getType();
    switch (qType)
    {
      case iTypes.MULTIPLE_CHOICE:
         var choices = q.asMultipleChoiceItem().getChoices();
         for(let i = 0; i < choices.length; i++){
            data[j].push(choices[i].getValue());
         }
         break;
      case iTypes.TEXT:
         break;
      case iTypes.SCALE:
         var upperbound = q.asScaleItem().getUpperBound(), lowerbound = q.asScaleItem().getLowerBound();
         for(let i = lowerbound; i <= upperbound; i++){
            data[j].push(i);
         }
         break;
    }
  });
  return data;
}