const form = FormApp.getActiveForm();

function onOpen(){
  FormApp.getUi().createAddonMenu().addItem("Open", "showSidebar").addToUi();
}

function showSidebar(){
  var html = HtmlService.createHtmlOutputFromFile('Main_Interface');
  FormApp.getUi().showSidebar(html);
}

function getQuestions(){
  const questions = form.getItems();
  var html = "";
  questions.forEach(function (q) {
    var temp = '<div class="questionblock"><h2>' + q.getTitle() + '</h2><table style="width:100%;margin:auto;">';
    var options = '<tr style="width:100%;"><td style="width:70%;">options</td><td style="float:right;"><div class="numberbox"><input class="percentage-field" type="number" value="values"></div></td></tr>';
    const qType = q.getType();
    switch (qType)
    {
      case iTypes.MULTIPLE_CHOICE:
         var choices = q.asMultipleChoiceItem().getChoices();
         for(let i = 0; i < choices.length; i++){
            temp +=  options.replace("options", choices[i].getValue()).replace("values", (100/choices.length).toFixed(1));
         }
         temp += '</table></div>';
         break;
      case iTypes.TEXT:
         break;
      case iTypes.SCALE:
         var upperbound = q.asScaleItem().getUpperBound(), lowerbound = q.asScaleItem().getLowerBound();
         for(let i = lowerbound; i <= upperbound; i++){
            temp +=  options.replace("options", i).replace("values", (100/(upperbound + 1 - lowerbound)).toFixed(1));
         }
         temp += '</table></div>';
         break;
      case iTypes.PAGE_BREAK:
         temp = "";
         break;
      }
      html += temp;
  });
  return html;
}