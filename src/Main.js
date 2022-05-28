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
    var options = (i) => `<div class="grid-item-row"><div class="grid-item-left"><div class="overflow">${option}</div></div><div class="grid-item-right"><div class="numberbox"><input class="percentage-field" id="${'field_' + p + '_' + i}" type="number" value="${values}" oninput="updateRemain(this)" step="any"></div></div></div>`;
    var temp = () => `<div class="questionblock"><h2>${title}</h2><div class="grid-container" id="${'grid_' + p}">${option_template}</div><input type="text" class="percentage-remain" id="${'remain_' + p}" value="Remaining 0%" onkeydown="return false;" tabindex="-1"></div>`;
    const qType = q.getType();
    switch (qType)
    {
      case iTypes.MULTIPLE_CHOICE:
         var choices = q.asMultipleChoiceItem().getChoices();
         values = (100/choices.length).toFixed(1).replace(/[.,]0+$/, "");
         for(let i = 0; i < choices.length; i++){
            if(i == choices.length - 1){
               values = (Number(values) + (100 - values*choices.length)).toFixed(1).replace(/[.,]0+$/, "");
            }
            option = choices[i].getValue();
            option_template += options(i);
         }
         temp = temp();
         break;
      case iTypes.TEXT:
      case iTypes.PARAGRAPH_TEXT:
         values = 100;
         option = `<input class="text-field" type="text" id="${"text_" + p + "_0"}">`;
         option_template += options(0);
         option_template += `<div class="grid-item-row"><div class="grid-item-center"><button type="button" class="add-button" id="${'addButton_' + p}" onclick="addtextInput(this.id);"><span class="button-icon" title="Add option"><ion-icon name="add-outline"></ion-icon></span></button></div></div>`
         temp = temp();
         break;
      case iTypes.SCALE:
         var upperbound = q.asScaleItem().getUpperBound(), lowerbound = q.asScaleItem().getLowerBound();
         values = (100/(upperbound + 1 - lowerbound)).toFixed(1).replace(/[.,]0+$/, "");
         for(let i = lowerbound; i <= upperbound; i++){
            if(i == upperbound){
               values = (Number(values) + (100 - values*(upperbound + 1 - lowerbound))).toFixed(1).replace(/[.,]0+$/, "");
            }
            option = i;
            option_template += options(i);
         }
         temp = temp();
         break;
      case iTypes.LIST:
         var choices = q.asListItem().getChoices();
         values = (100/choices.length).toFixed(1).replace(/[.,]0+$/, "");
         for(let i = 0; i < choices.length; i++){
            if(i == choices.length - 1){
               values = (Number(values) + (100 - values*choices.length)).toFixed(1).replace(/[.,]0+$/, "");
            }
            option = choices[i].getValue();
            option_template += options(i);
         }
         temp = temp();
         break;
      case iTypes.CHECKBOX:
         var choices = q.asCheckboxItem().getChoices();
         values = (100/choices.length).toFixed(1).replace(/[.,]0+$/, "");
         for(let i = 0; i < choices.length; i++){
            if(i == choices.length - 1){
               values = (Number(values) + (100 - values*choices.length)).toFixed(1).replace(/[.,]0+$/, "");
            }
            option = choices[i].getValue();
            option_template += options(i);
         }
         temp = temp();
         break;
      case iTypes.GRID:
         var rows = q.asGridItem().getRows();
         var columns = q.asGridItem().getColumns();
         values = (100/(rows.length*columns.length)).toFixed(1).replace(/[.,]0+$/, "");
         for(let i = 0; i < rows.length; i++){
            for(let j = 0; j < columns.length; j++){
               if(i == rows.length - 1 && j == columns.length - 1){
                  values = (Number(values) + (100 - values*(rows.length*columns.length))).toFixed(1).replace(/[.,]0+$/, "");
               }
               option = rows[i] + ' ' + columns[j];
               option_template += options(i+j);
            }
         }
         temp = temp();
         break;
      case iTypes.CHECKBOX_GRID:
         var rows = q.asCheckboxGridItem().getRows();
         var columns = q.asCheckboxGridItem().getColumns();
         values = (100/(rows.length*columns.length)).toFixed(1).replace(/[.,]0+$/, "");
         for(let i = 0; i < rows.length; i++){
            for(let j = 0; j < columns.length; j++){
               if(i == rows.length - 1 && j == columns.length - 1){
                  values = (Number(values) + (100 - values*(rows.length*columns.length))).toFixed(1).replace(/[.,]0+$/, "");
               }
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
      p++;
      html += temp;
  });
  return html;
}

// Record Time
/*
   var total_time = 0;
   var start = new Date().getTime();
   var end = new Date().getTime();
   var time_used = ((end - start)/1000).toFixed(3);
   total_time += parseFloat(time_used);
*/