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
  var p = 0;
  questions.forEach(function (q) {
    var title = q.getTitle();
    var option, option_template, values, option = option_template = values = "";
    var options = (i) => `<tr align="center left" style="width:100%;"><td style="width:70%;">${option}</td><td style="float:right;"><div class="numberbox"><input class="percentage-field" id="${'field_' + i}" type="number" value="${values}"></div></td></tr>`;
    var temp = () => `<div class="questionblock"><h2>${title}</h2><table style="width:100%;margin:auto;" id="${'table_' + p}">${option_template}</table></div>`;
    const qType = q.getType();
    switch (qType)
    {
      case iTypes.MULTIPLE_CHOICE:
         var choices = q.asMultipleChoiceItem().getChoices();
         values = (100/choices.length).toFixed(1);
         for(let i = 0; i < choices.length; i++){
            option = choices[i].getValue();
            option_template += options(i);
         }
         temp = temp();
         break;
      case iTypes.TEXT:
      case iTypes.PARAGRAPH_TEXT:
         values = 100;
         option = '<input class="text-field" type="text">';
         option_template += options(0);
         option_template += `<tr style="width:100%;"><td colspan="2" align="center"><button type="button" class="add-button" id="${'addButton_' + p}" onclick="addtextInput(this.id);"><span class="button-icon"><ion-icon name="add-outline"></ion-icon></span></button></td></tr>`
         temp = temp();
         break;
      case iTypes.SCALE:
         var upperbound = q.asScaleItem().getUpperBound(), lowerbound = q.asScaleItem().getLowerBound();
         values = (100/(upperbound + 1 - lowerbound)).toFixed(1);
         for(let i = lowerbound; i <= upperbound; i++){
           option = i;
           option_template += options(i);
         }
         temp = temp();
         break;
      case iTypes.LIST:
         var choices = q.asListItem().getChoices();
         values = (100/choices.length).toFixed(1);
         for(let i = 0; i < choices.length; i++){
            option = choices[i].getValue();
            option_template += options(i);
         }
         temp = temp();
         break;
      case iTypes.CHECKBOX:
         var choices = q.asCheckboxItem().getChoices();
         values = (100/choices.length).toFixed(1);
         for(let i = 0; i < choices.length; i++){
            option = choices[i].getValue();
            option_template += options(i);
         }
         temp = temp();
         break;
      case iTypes.GRID:
         var rows = q.asGridItem().getRows();
         var columns = q.asGridItem().getColumns();
         values = (100/(rows.length*columns.length)).toFixed(1);
         for(let i = 0; i < rows.length; i++){
            for(let j = 0; j < columns.length; j++){
               option = rows[i] + ' ' + columns[j];
               option_template += options(i+j);
            }
         }
         temp = temp();
         break;
      case iTypes.CHECKBOX_GRID:
         var rows = q.asCheckboxGridItem().getRows();
         var columns = q.asCheckboxGridItem().getColumns();
         values = (100/(rows.length*columns.length)).toFixed(1);
         for(let i = 0; i < rows.length; i++){
            for(let j = 0; j < columns.length; j++){
               option = rows[i] + ' ' + columns[j];
               option_template += options(i+j);
            }
         }
         temp = temp();
         break;
      default:
         Logger.log(qType);
      case iTypes.PAGE_BREAK:
         p--;
         temp = "";
         break;
      }
      console.log()
      p++;
      html += temp;
  });
  return html;
}