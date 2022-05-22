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

function openUrl( url ){
  var html = HtmlService.createHtmlOutput('<html><script>'
  +'window.close = function(){window.setTimeout(function(){google.script.host.close()},9)};'
  +'var a = document.createElement("a"); a.href="'+url+'"; a.target="_blank";'
  +'if(document.createEvent){'
  +'  var event=document.createEvent("MouseEvents");'
  +'  if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){window.document.body.append(a)}'                          
  +'  event.initEvent("click",true,true); a.dispatchEvent(event);'
  +'}else{ a.click() }'
  +'close();'
  +'</script>'
  // Offer URL as clickable link in case above code fails.
  +'<body style="word-break:break-word;font-family:sans-serif;">Failed to open automatically. <a href="'+url+'" target="_blank" onclick="window.close()">Click here to proceed</a>.</body>'
  +'<script>google.script.host.setHeight(40);google.script.host.setWidth(410)</script>'
  +'</html>')
  .setWidth( 90 ).setHeight( 1 );
  FormApp.getUi().showModalDialog( html, "Opening ..." );
}

function open(){
  for(let i = 0;i<5;i++){
    Logger.log(i);
      openUrl("https://docs.google.com/forms/u/4/d/e/1FAIpQLSfT2SVnCbT233B6M71dvaDErvxiUSC3njSAjA99Ka-QVdA9dg/formResponse?usp=pp_url&entry.1193869602=%E9%80%89%E9%A1%B9+1&entry.1592361129=%E9%80%89%E9%A1%B9+1&submit=Submit")
      Utilities.sleep(5000);
  }
}