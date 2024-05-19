var azioneclick=0;
var LinguaSito="ITA";
var recordsPerPage=9;




function setPagination(id) {
	recordsPerPage = document.getElementById(id).value;
}


function RicercaBirre(page) {
	var idCitta = document.getElementById("IdCitta").value;
	var idMarca = document.getElementById("IdMarca").value;
	loadBeers(idCitta, idMarca, page);
}



function createPagination(id, numRecords, functionToCall, currentPage) {
	var numPages = 1;	
	while((numPages * recordsPerPage) < numRecords) {
		 numPages = numPages +1;
	}
	var content = document.getElementById(id).innerHTML;
	 
	content ='	<li class="page-item disabled">';
	content+='		<span class="page-linklabel">Pagina: '+currentPage+' di '+numPages+'</span>';
	content+='	</li>';
	for(var i=1; i<=numPages; i++) {
		if(i==parseInt(currentPage)) {
			content+='	<li class="page-item active">';
			content+='		<span class="page-linkactive">' +i+ '<span class="sr-only">(current)</span></span>';
		}
		else {
			content+='	<li class="page-item" onclick="'+functionToCall+'('+i+');">';
			content+='		<span class="page-link">' +i+ '</span>';
		}
		content+='	</li>';
	}
	document.getElementById(id).innerHTML = content;
}


function loadBeers(province, model, currentPage) {
	checkLogin();
	setPagination("IdRecords");
	
	executeRequest("list").then(data => {
		//console.log(data);
		//outputElement.textContent = JSON.stringify(data, null, 2);
		//var json = JSON.stringify(data, null, 2);
		
		var numRecords=0;
		var filteredData = [];
		data.forEach((item) => {
			if((province=="" || item.state_province == province) && (model== "" || item.name.indexOf(model) > 0)) {
				filteredData.push(item);
			}
		});
		
		numRecords = filteredData.length;
		createPagination('beerListPagination', numRecords, 'RicercaBirre', currentPage);
		
		var paginedData = [];		
		var endIndex = currentPage*recordsPerPage;
		var startIndex = endIndex-recordsPerPage;
		if(endIndex >= filteredData.length) {
			endIndex = filteredData.length;
		}
		
		//alert(startIndex + " + " + endIndex);
		for(var i=startIndex; i<endIndex; i++) {
			paginedData.push(filteredData[i]);
		}
		
		//alert(paginedData);
		
		var content = "";
		var counter=1;
		document.getElementById("beer_list").innerHTML = "";
		paginedData.forEach((item) => {
			//if((province=="" || item.state_province == province) && (model== "" || item.name.indexOf(model) > 0)) {
				content += '<li>';
				content += '	<div id="cont_17">';
				content += '		<div class="img-wrapper-model">';
				content += '			<div class="img-wrapper-model-inner">';
				content += '				<a href="#"><img src="images/'+ item.name +'.jpg" alt="photo" style="position:relative; max-width:250px" /></a>';
				content += '			</div>';
				content += '			<div class="wrapper-modelname">'+ item.name +'</div>';
				content += '			<div class="wrapper-modelinfo">';
				content += '				<strong>'+ item.city +' - ' + item.state_province +'</strong><br/>';
				content += '				<div style="height:4px;"></div>';
				content += '				Birra <strong>'+ item.brewery_type +'</strong><br/>'; 
				content += '				Paese <strong>'+ item.country +'</strong><br/>'; 
				content += '				Cap <strong>'+ item.postal_code +'</strong><br/>'; 
				content += '				Telefono <strong>'+ item.phone +'</strong><br/>';
				content += '				Latitudine <strong>'+ item.latitude +'</strong><br/>'; 
				content += '				Longitudine <strong>'+ item.longitude +'</strong><br/>';
				content += '				Sito web <span style="cursor:pointer; text-decoration:underline;" onclick="LinkEsterno(\''+ item.website_url +'\')">Vai al sito</span></a>';
				content += '			</div>';
				content += '		</div>';
				content += '	</div>';
				content += '</li>';

				if(counter <= 3) {
					newContent = ReplaceAll(content, '<div class="img-wrapper-model">', '<div class="img-wrapper-model" style="width:152px !important;">');
					newContent = ReplaceAll(newContent, 'max-width:250px', 'min-width:100px !important;');
					newContent = ReplaceAll(newContent, '<div class="wrapper-modelname">', '<div class="wrapper-modelname" style="background-color:#F1F2F2; color:#6d6e71;">');
					newContent = ReplaceAll(newContent, '<div class="wrapper-modelinfo">', '<div class="wrapper-modelinfo" style="background-color:#F1F2F2; color:#6d6e71; padding-bottom:10px;">');
					document.getElementById("mostDrink").innerHTML = newContent;
				}
				
				counter++;
			//}
		});
		document.getElementById("beer_list").innerHTML = content;		
	});
}




async function executeRequest(request) {
	var apiUrl;
	if(request=="list") {
		apiUrl = 'https://api.openbrewerydb.org/v1/breweries';
	}
	//ALtre chiamate Api
	else {
		apiUrl = 'https://api.openbrewerydb.org/v1/breweriesxxxxxx';
	}
	
	let response = await fetch(apiUrl);
	let data = await response.json();
	return data;
}



function getCheck() {
	var errorMessage="";
	document.getElementById("frm_login").className="form-group col-xs-12";
	document.getElementById("frm_password").className="form-group col-xs-12";
	
	Username = trim(document.getElementById("login").value);
	Password = trim(document.getElementById("password").value);
	if(Username != "root" || Password != "password") {
		document.getElementById("frm_login").className="form-group col-xs-12 has-error";
		document.getElementById("frm_password").className="form-group col-xs-12 has-error";
		errorMessage +="Username o Password errate!";
	}
	if (errorMessage=="") {
		setMyPrivacyCookie();
		enableSite();
	}
	else
		erroriform(errorMessage);
}



function checkLogin() {
	if(GetCookie("beer_Cookye")=="1") {
		enableSite();
	}	
}

function enableSite() {
	document.getElementById("lp-register").style.display = "none";
	document.getElementById("main_site").style.display = "block";
	document.getElementById("body").style.background = "none";
}


function MandaMail() {
	locationurl=getLocationUrl();
	url="Azione=ContattaAssistenza&LinguaSito=" + LinguaSito;
	preparaMail(url, '', linguaCampi(11), '', locationurl, 'Assistenza');
}




function preparaMail(url, Testo, lMessaggio, Messaggio, UrlNascosto, Tipo) {
	contenuto='<div class="send-pvmessage" style="margin-top:10px;"><div id="MessageBoard2" class="errors"></div>';
	if (Testo != '')
		contenuto+='<p class="titolo_link">'+Testo+'</p>';
	contenuto+='<form name="FormTesto" id="FormTesto" method="post">';
	if (Tipo=="Abuso"  || Tipo=="Assistenza") {
		apri_finestra_esajob('A', 440);
		contenuto+='<div id="frm_Nominativo" class="form-group"><label for="Nominativo" class="sr-only"></label><input type="text" id="Nominativo" class="form-control input-group-lg" placeholder="Nominativo" /></div>';
		contenuto+='<div id="frm_email" class="form-group"><label for="email" class="sr-only"></label><input type="text" id="email" class="form-control input-group-lg" placeholder="E-mail"/></div>';
	}
	else
		apri_finestra_esajob('A', 300);
	
	contenuto+='<div id="frm_Messaggio" class="form-group"><label for="Messaggio" class="sr-only"></label>';
	if (Tipo=="Abuso" || Tipo=="Assistenza")
		contenuto+='<textarea name="Messaggio" id="Messaggio" class="form-control input-group-lg" placeholder="'+lMessaggio+'">'+Messaggio+'</textarea></div>';
	else
		contenuto+='<textarea name="Messaggio" id="Messaggio" class="form-control areamex3" data-emojiable="true" placeholder="'+lMessaggio+'">'+Messaggio+'</textarea></div>';
	contenuto+='<input type="button" class="btn btn-primary" value="Invia" onclick="eseguiPreparaMail(\''+url+'\', \''+UrlNascosto+'\', \''+Tipo+'\');" />';
	contenuto+='</form></div>';
	InsCont(contenuto);
	
}


function eseguiPreparaMail(url, UrlNascosto, Tipo) {
	var errorMessage="";
	Nominativo="";
	email="";
	Soggetto=linguaCampi(69);
	
	document.getElementById("frm_Nominativo").className="form-group";
	document.getElementById("frm_email").className="form-group";
	document.getElementById("frm_Messaggio").className="form-group";
	
	Nominativo=document.getElementById("Nominativo").value;
	if(Nominativo=="")
		errorMessage+=CampoErrato("frm_Nominativo", linguaCampi(111), "Obb");

	email=document.getElementById("email").value;
	if (checkMail(email) != true)
		errorMessage+=CampoErrato("frm_email", linguaCampi(10), "Err");

	Messaggio=document.getElementById("Messaggio").value;
	if(Messaggio=="" || Messaggio=="-" || Messaggio==" ") {
		if(Tipo=="Assistenza")
			errorMessage += CampoErrato("frm_Messaggio", linguaCampi(11), "Obb");
	}
	NewMessaggio=  UrlNascosto + " " + String.fromCharCode(10)+String.fromCharCode(13); 
	NewMessaggio+= "-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --" +String.fromCharCode(10)+String.fromCharCode(13) +Messaggio;
	Messaggio=NewMessaggio;

	
	if (errorMessage=="") {
		if (azioneclick==0) {
			azioneclick=1;
			TestoMex=linguaCampi(111) + ": " + Nominativo + String.fromCharCode(10)+String.fromCharCode(13);
			TestoMex+=linguaCampi(72) + email + String.fromCharCode(10)+String.fromCharCode(13);
			if (Tipo=="Abuso")
				Soggetto=linguaCampi(67);
			TestoMex+=linguaCampi(113);
			Messaggio=TestoMex + Messaggio;
			//url+="&EmailMittente=" +encodeURIComponent(email) + "&Soggetto=" +encodeURIComponent(Soggetto) + "&Messaggio=" + encodeURIComponent(htmlEncode(Messaggio)) + "&Nominativo=" +encodeURIComponent(Nominativo);
			//url+="&Telefono=" +encodeURIComponent(Telefono) + "&IdAnnuncio=" +IdAnnuncio;
			url+= + "&Tempo=" +millisecondi();
			/*
			eseguiAjax(url, "POST", "esteto.asp");
			if(Tipo=="RispPrivato")
				RisultatoAjax("mostravideochat", "Riesegui");
	  		else
	  			RisultatoAjax("mostravideochat", "Chiudi");
			*/
			alert("MESSAGGIO INVIATO")
		}
		else
			alert("Sending Data");
	}
	else
		erroriform2(errorMessage);
}


function getLocationUrl() {
	locationurl="";
	try {locationurl=location.href;} catch(e) {locationurl=document.location.href;}
	return locationurl;
}


function InsCont(contenuto) {
	document.getElementById("mostravideochat").innerHTML=contenuto;
}
function InsCont2(contenuto) {
	document.getElementById("mostravideochat2").innerHTML=contenuto;
}


function CampoErrato(IdCampo, NomeCampo, Tipo) {
	errMessage="";
	if (IdCampo !="")
		document.getElementById(IdCampo).className="form-group has-error";
	if (Tipo=="Err")
		errMessage += " ";
	else if (Tipo=="Mag")
		errMessage = linguaJs(0) + "<span class='grassetto'>"+NomeCampo+"</span> " + linguaJs(27) + "0<br/>";
	else if (Tipo=="Num")
		errMessage = linguaJs(0) + "<span class='grassetto'>"+NomeCampo+"</span> " + linguaJs(6) + "<br/>";
	else
		errMessage += " ";
	return errMessage;
}



function apri_finestra_esajob(Position, Altzza) {
	if(Position=="F")
		document.getElementById("contenitorevideo").style.position="fixed";
	else {
		document.getElementById("contenitorevideo").style.position="absolute";
		var vDoc=(document.documentElement && document.documentElement.scrollTop)?document.documentElement:document.body;
		document.getElementById("contenitorevideo").style.top = parseInt(vDoc.scrollTop)+40+"px";
	}
	
	document.getElementById("contenitorevideo").style.display="block";
	document.getElementById("contenitorevideo").style.height=(Altzza+34)+"px";
	document.getElementById("cont_barra_alta").style.display="block";
	document.getElementById("mostravideochat").innerHTML="";
	document.getElementById("mostravideochat").className="chatmostravideo";
	document.getElementById("mostravideochat").style.display="block";
	document.getElementById("mostravideochat").style.height=(Altzza-22)+"px";
}



function chiudi_finestra_esajob() {
	document.getElementById("mostravideochat").innerHTML="";
	document.getElementById("contenitorevideo").style.display="none";
}




function checkMail(mail) {
	var re=/^[-a-zA-Z0-9_.]+@[-a-zA-Z0-9_.]+[-a-zA-Z0-9_.]+\.([-a-zA-Z0-9_.]{2,3}|info|name|mobi)$/;

	var res;
	if ((res = re.exec(mail)) != null) 
		return true;	
	else
		return false;
}



function erroriform(stringaerrore) {
	if(trim(stringaerrore)!="") {
		var MessageBoard;
		MessageBoard = document.getElementById("MessageBoard");
		MessageBoard.style.display = "block";	
		MessageBoard.innerHTML = stringaerrore;
	}
}

function erroriform2(stringaerrore) {	
	if(trim(stringaerrore)!="") {
		var MessageBoard;
		MessageBoard = document.getElementById("MessageBoard2");
		MessageBoard.style.display = "block";	
		MessageBoard.innerHTML = stringaerrore;
	}
}


function trim(o) {
	var re=/^(\s*)([\w\W]*[^\s])(\s*)$/;
	var rs=re.exec(String(o));
	return rs != null ? rs[2] : "";
}



function specialcharsForm(Form, Campo, NuovoCampo) {
	document.getElementById(NuovoCampo).value=htmlEncode(document.getElementById(Campo).value, false, false);
	document.forms[Form].submit();
	return true;
}

function specialcharsCampo(Campo, NuovoCampo) {
	document.getElementById(NuovoCampo).value=htmlEncode(document.getElementById(Campo).value, false, false);
}


function specialcharsCampoNew(Campo) {
	document.getElementById(Campo).value=htmlEncode(document.getElementById(Campo).value, false, false);
}


function calcolatempo() {
	var myDate=new Date();
	return myDate.getTime();
}


function millisecondi() {
	var myDate=new Date();
	ms1=myDate.getTime();
	zeit = new Date(); 
	ms2 = (zeit.getHours() * 24 * 60 * 1000) + (zeit.getMinutes() * 60 * 1000) + (zeit.getSeconds() * 1000) + zeit.getMilliseconds(); 
	return ms1 + "-" + ms2;
}



function left(str, n) {
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}


function right(str, n) {
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}



function mid(str, inizio, lunghezza) {
	return String(str).substring(inizio-1, inizio-1+lunghezza);
}



function ReplaceAll(Source, stringToFind, stringToReplace) {
	var temp = Source;
	var index = temp.indexOf(stringToFind);
	while(index != -1) {
		temp = temp.replace(stringToFind,stringToReplace);
		index = temp.indexOf(stringToFind);
	}
	return temp;
}


function LinkEsterno(link) {
	if(left(link,5)=="index")
		link+="&ctfn=0";
	newWindow= window.open("","");
	newWindow.location.href = link;
}



function linguaCampi(valore)
{
	linguacc = new Array();
	if(LinguaSito=="ITA")
	{
		linguacc[0]="Si";
		linguacc[1]="No";
		linguacc[2]="Devi accettare ";
		linguacc[3]="Le condizioni";
		linguacc[4]=" per proseguire.";
		linguacc[5]="Pubblicare l\'annuncio ?";
		linguacc[6]="Ripubblicare l\'annuncio ?";
		linguacc[7]="Devi prima creare un annuncio.";
		linguacc[8]="Devi selezionare un' immagine per procedere.";
		linguacc[9]="Caricamento pagina in corso.<br/><br/>Riprova tra qualche secondo.";
		linguacc[10]="E-MAIL";
		linguacc[11]="Messaggio";
		linguacc[12]="Link";
		linguacc[13]="Link immagine";
		linguacc[14]="Descrizione abuso";
		linguacc[15]="Soggetto";
		linguacc[16]="Sezione";
		linguacc[17]="Tipo";
		linguacc[18]="Accetto";
		linguacc[19]="Nome profilo";
		linguacc[20]="Descrizione";
		linguacc[21]="Nome link";
		linguacc[22]="Decidi per questo modello";
		linguacc[23]="Stato";
		linguacc[24]="In esame";
		linguacc[25]="Va al casting";
		linguacc[26]="Confermato";
		linguacc[27]="Scartato";
		linguacc[28]="Cambia stato";
		linguacc[29]="Il modello &egrave; gi&agrave; nello stato selezionato.";
		linguacc[30]="Stato cambiato correttamente.";
		linguacc[31]="E-mail Cliente";
		linguacc[32]="Modelli inviati correttamente.";
		linguacc[33]="Non Presente";
		linguacc[34]=" Accetto ";
		linguacc[35]="Valuta il modello";
		linguacc[36]="Rispondere all\'annuncio ?";
		linguacc[37]="Dai un punteggio";
		linguacc[38]="Candidatura inviata correttamente.";
		linguacc[39]="Eliminare l\'annuncio ?";
		linguacc[40]="Molto bene";
		linguacc[41]="Molto male";
		linguacc[42]="Date";
		linguacc[43]="Titolo";
		linguacc[44]="Dai una motivazione";
		linguacc[45]="Valutazione cliente: ";
		linguacc[46]="Giudica la professionalit&agrave; e le qualit&agrave; del modello, e non se &egrave; idoneo a questa posizione lavorativa.";
		linguacc[47]="Devi confermare le modifiche in corso.";
		linguacc[48]="Proponi al cliente";
		linguacc[49]="Lingua";
		linguacc[50]="Da confermare";
		linguacc[51]="Condividi su ";
		linguacc[52]="Scritto";
		linguacc[53]="Lettura";
		linguacc[54]="Posto di lavoro";
		linguacc[55]="Azienda";
		linguacc[56]="ad oggi";
		linguacc[57]="Cliccare per applicare";
		linguacc[58]="E-mail operatore";
		linguacc[59]="Cerca";
		linguacc[60]="Mostra di pi&ugrave;";
		linguacc[61]="Mostra di meno";
		linguacc[62]="Il link inserito non  e\' corretto";
		linguacc[63]="Devi riempire tutti i campi per geolocalizzare.";
		linguacc[64]="Crea operatore";
		linguacc[65]="Agenzia trovata";
		linguacc[66]="Attenzione non hai selezionato alcun modello.";
		linguacc[67]="Emposs segnalazione abuso";
		linguacc[68]="Invia";
		linguacc[69]="Emposs contatto via e-mail";
		linguacc[70]="La tua e-mail";
		linguacc[71]="Emposs contatto per richiesta informazioni";
		linguacc[72]="E-mail mittente: ";
		linguacc[73]="Manda un messaggio";
		linguacc[74]="Informazioni per il casting";
		linguacc[75]="Informazioni per il posto di lavoro";
		linguacc[76]="Nickname";
		linguacc[77]="Disponibilit&agrave; solo parziale";
		linguacc[78]="Utente";
		linguacc[79]="Motivazione";
		linguacc[80]="";
		linguacc[81]="Accesso libero";
		linguacc[82]="Tipo profilo";
		linguacc[83]="Privato";
		linguacc[84]="Emposs nuove notifiche!";
		linguacc[85]="Agenzia";
		linguacc[86]="Emposs hai delle notofiche da leggere!";
		linguacc[87]="Professionista";
		linguacc[88]="Modifica";
		linguacc[89]="Immagine di sfondo";
		linguacc[90]="Commenti";
		linguacc[91]="Elimina";
		linguacc[92]="Clicca per scegliere ";
		linguacc[93]="Eliminare ";
		linguacc[94]="Parole chiave";
		linguacc[95]="Nota";
		linguacc[96]="Eliminare la foto selezionata";
		linguacc[97]="Usa i tag speciali [imgxp] [/imgxp]. Esempio: ";
		linguacc[98]="Posiziona marker sulla mappa";
		linguacc[99]="Nessun indirizzo inserito";
		linguacc[100]="Devi prima cambiare indirizzo";
		linguacc[101]="Hai effettuato troppe richeste. Sposta il marker manualmente";
		linguacc[102]="Geocode non &egrave; andato a buon fine per la seguente ragione: ";
		linguacc[103]="Distanza totale: ";
		linguacc[104]="Indirizzo di partenza";
		linguacc[105]="Imposta indirizzo";
		linguacc[106]="Calcola percorso";
		linguacc[107]="Nome categoria";
		linguacc[108]="Categoria di riferimento";
		linguacc[109]="Tipo di vetrina";
		linguacc[110]="Tipo di importazione";
		linguacc[111]="Nominativo";
		linguacc[112]="Telefono";
		linguacc[113]="Link: ";
		linguacc[114]="Estrazione dati. Attendere.";
		linguacc[115]="Elaborazione dati. Attendere";
		linguacc[116]=" alla ";
		linguacc[117]="Attendere";
		linguacc[118]="Attenzione! Si e\' verificato un errore imprevisto!";
		linguacc[119]="Sincronizzazione";
		linguacc[120]="Ragione Sociale";
		linguacc[121]="Comune";
		linguacc[122]="Indirizzo";
		linguacc[123]="Cap";
		linguacc[124]="Partita Iva";
		linguacc[125]="Sito";
		linguacc[126]="Eliminare la richiesta selezionata";
	}
	else
	{
		linguacc[0]="Yes";
		linguacc[1]="No";
		linguacc[2]="You have to accept ";
		linguacc[3]="The conditions";
		linguacc[4]=" to can continue.";	
		linguacc[5]="Publish the announce ?";
		linguacc[6]="Republish the announce ?";
		linguacc[7]="You have to create an announce before.";
		linguacc[8]="You have to select an image to go on.";
		linguacc[9]="Loading page in progress.<br/><br/>Try again in few seconds.";
		linguacc[10]="E-MAIL";
		linguacc[11]="Message";
		linguacc[12]="Link";
		linguacc[13]="Image link";
		linguacc[14]="Abuse description";
		linguacc[15]="Subject";
		linguacc[16]="Section";
		linguacc[17]="Type";
		linguacc[18]="I Accept";
		linguacc[19]="Profile name";
		linguacc[20]="Description";
		linguacc[21]="Link name";
		linguacc[22]="Decide for this model";
		linguacc[23]="State";
		linguacc[24]="On exame";
		linguacc[25]="Go to casting";
		linguacc[26]="Confirmed";
		linguacc[27]="Discarded";
		linguacc[28]="Change state";
		linguacc[29]="The model is already on the selected state.";
		linguacc[30]="State correctly changed.";
		linguacc[31]="Customer E-Mail";
		linguacc[32]="Models correctly sent.";
		linguacc[33]="Not Presented";
		linguacc[34]=" I accept ";
		linguacc[35]="Evaluate the model";
		linguacc[36]="Answer to the announce ?";
		linguacc[37]="Give a score";
		linguacc[38]="Candidate correctly sent.";
		linguacc[39]="Delete the announce ?";
		linguacc[40]="Very good";
		linguacc[41]="Very bad";
		linguacc[42]="Dates";
		linguacc[43]="Title";
		linguacc[44]="Give a reason";
		linguacc[45]="Customer evaluation: ";
		linguacc[46]="Judge the professionalism and the qualities of the model, and not if it is suitable for this job position.";
		linguacc[47]="You have to confirm the current modify before.";
		linguacc[48]="Propose to customer";
		linguacc[49]="Language";
		linguacc[50]="To be confirmed";
		linguacc[51]="Share on ";
		linguacc[52]="Written";
		linguacc[53]="Reading";
		linguacc[54]="Working place";
		linguacc[55]="Company";
		linguacc[56]="to today";
		linguacc[57]="Click to apply";
		linguacc[58]="Operator e-mail";
		linguacc[59]="Search";
		linguacc[60]="Show More";
		linguacc[61]="Show Less";
		linguacc[62]="The inserted link is not correct";
		linguacc[63]="You have to fill all the fields to geolocalize.";
		linguacc[64]="Create operator";
		linguacc[65]="Agency founded";
		linguacc[66]="Attention you have not selected any model.";
		linguacc[67]="Emposs report abuse";
		linguacc[68]="Send";
		linguacc[69]="Emposs e-mail contact";
		linguacc[70]="Your e-mail";
		linguacc[71]="Emposs informations request contact";
		linguacc[72]="Sender E-mail: ";
		linguacc[73]="Send a message";
		linguacc[74]="Casting Info";
		linguacc[75]="Info about the place of work";
		linguacc[76]="Nickname";
		linguacc[77]="Only partial availability";
		linguacc[78]="User";
		linguacc[79]="Explanation";
		linguacc[80]="";
		linguacc[81]="Free access";
		linguacc[82]="Profile type";
		linguacc[83]="Private";
		linguacc[84]="Emposs new notifications!";
		linguacc[85]="Agency";
		linguacc[86]="Emposs you have new notifications to read!";
		linguacc[87]="Professional";
		linguacc[88]="Edit";
		linguacc[89]="Background image";
		linguacc[90]="Comments";
		linguacc[91]="Delete";
		linguacc[92]="Click to choose ";
		linguacc[93]="Delete ";
		linguacc[94]="Keywords";
		linguacc[95]="Note";
		linguacc[96]="Delete the selected photo";
		linguacc[97]="Usa special tag [imgxp] [/imgxp]. Example: ";
		linguacc[98]="Place marker on the map";
		linguacc[99]="No address entered";
		linguacc[100]="You must first change your address";
		linguacc[101]="You have made too many request. Move the marker manually";
		linguacc[102]="Geocode was not successful for the following reason: ";
		linguacc[103]="Total distance: ";
		linguacc[104]="Starting address";
		linguacc[105]="Set address";
		linguacc[106]="Calculate route";
		linguacc[107]="Category name";
		linguacc[108]="Reference category";
		linguacc[109]="Showcase type";
		linguacc[110]="Import type";
		linguacc[111]="Nominative";
		linguacc[112]="Telephone";
		linguacc[113]="Link: ";
		linguacc[114]="Data Extraction in progress. Wait.";
		linguacc[115]="Data Processing in process. Wait. ";
		linguacc[116]=" to ";
		linguacc[117]="Wait";
		linguacc[118]="Warning! An unexpected error occurred!";
		linguacc[119]="Synchronization";
		linguacc[120]="Company";
		linguacc[121]="Municipality";
		linguacc[122]="Address";
		linguacc[123]="Post Code";
		linguacc[124]="Vat";
		linguacc[125]="Site";
		linguacc[126]="Delete the selected request";
	
	}
	return linguacc[valore];	
}





//********************************************************************************************
//*											COOKIE
//********************************************************************************************
function SetCookie(nomeCookie,valoreCookie,durataCookie) {
  var scadenza = new Date();
  var adesso = new Date();
  scadenza.setTime(adesso.getTime() + (parseInt(durataCookie) * 60000));
  document.cookie = nomeCookie + '=' + escape(valoreCookie) + '; expires=' + scadenza.toGMTString() + '; path=/';
}


function GetCookie(nomeCookie) {
  if (document.cookie.length > 0) {
    var inizio = document.cookie.indexOf(nomeCookie + "=");
    if (inizio != -1) {
      inizio = inizio + nomeCookie.length + 1;
      var fine = document.cookie.indexOf(";",inizio);
      if (fine == -1) fine = document.cookie.length;
      return unescape(document.cookie.substring(inizio,fine));
    }else{
       return "";
    }
  }
  return "";
}


function VerificaCookie() {
  document.cookie = 'verifica_cookie';
  var testcookie = (document.cookie.indexOf('verifica_cookie') != -1) ? true : false;
  return testcookie;
}

function setMyPrivacyCookie() {
	SetCookie('beer_Cookye',  1, 44640);
}





