//filtro para dar el formato SERCAT al codigo catastral - OK
app.filter("FormatoSercat", function(){
	return function(text) {
		if(text != null){
			if(text.length == 15)
			{
				var cc = text;
				var cc1 = cc.substring(0,3) + '-' + cc.substring(3,7) + '-' + cc.substring(7,11) + '-' + cc.substring(11,15);
				return cc1;
			}
			else
			{
				return text;
			}
		}
	}
});

app.filter("FormatoFecha", function(){
	return function(text) {
		function getFormattedDate(date) {
			
			var year = date.getFullYear();

			var month = (1 + date.getMonth()).toString();
			month = month.length > 1 ? month : '0' + month;

			var day = date.getDate().toString();
			day = day.length > 1 ? day : '0' + day;

			var horas=date.getHours();
			var minutos=date.getMinutes();
			var segundos=date.getSeconds();
			return day + '/' + month + '/' + year + ' '+horas+':'+minutos+':'+segundos;
		}
		
		if(text != null){
			var f =  "";
			var offset = 4;
			var fechaRegistro = new Date( new Date(text).getTime() + offset * 3600 * 1000);
			var f = getFormattedDate(fechaRegistro);
			return f;
		}
	}
});


app.directive('vaCombo', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
			function myValidation(value) {
				if (value.indexOf("e") > -1) {
					mCtrl.$setValidity('charE', true);
				} else {
					mCtrl.$setValidity('charE', false);
				}
				return value;
			}
			mCtrl.$parsers.push(myValidation);
		}
	};
});

app.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if(event.which === 13) {
				scope.$apply(function(){
					scope.$eval(attrs.ngEnter, {'event': event});
				});

				event.preventDefault();
			}
		});
	};
});

//Para convertir a object params los parametros enviados por el metodo POST -- OK
Object.toparams = function ObjecttoParams(obj) {
	var p = [];
	for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
	}
	return p.join('&');
};

//Funcion padleft
function Padleft(pad,valor) {
	var str = "" + valor;
	return ans = pad.substring(0, pad.length - str.length) + str;
};
function arrayObjectIndexOf(miArray, buscarTexto, propiedad) {
	for (var i = 0, len = miArray.length; i < len; i++) {
		if (miArray[i][propiedad] === buscarTexto) return i;
	}
	return -1;
}

function validarNumero(value){
	var valor = $(value).val();
	if (!isNaN(valor) && valor >= 0){
	$(value).val(valor);
	}else{
	$(value).val(0);
	}
};

function RegularizacionController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout,$window)
{
	var positions =
	[
	{ name: "CENTRAL", pos: [-7584575.389127423986793, -1862343.043682825984433], zoom: 17 },
	{ name: "EL ROSARIO", pos: [-7585334.050879356451333, -1862239.9863074591849], zoom: 17 },
	{ name: "MIRAFLORES", pos: [-7583254.50954529736191, -1862010.036386856343597], zoom: 17 },
	{ name: "MIRAFLORES SUR", pos: [-7583055.178539209999144, -1863615.049259479390457], zoom: 17 },
	{ name: "SAN SEBASTIAN", pos: [-7585442.824538857676089, -1861826.247660768451169], zoom: 17 },
	{ name: "SANTA BARBARA", pos: [-7583974.984731253236532, -1862690.543432838283479], zoom: 17 },
	{ name: "8 DE DICIEMBRE", pos: [-7584748.066591577604413, -1864890.710699074435979], zoom: 17 },
	{ name: "BAJO LLOJETA", pos: [-7583142.230117241851985, -1865823.243447743123397], zoom: 17 },
	{ name: "BELEN", pos: [-7585074.674997083842754, -1862692.293808240443468], zoom: 17 },
	{ name: "BELLO HORIZONTE", pos: [-7585290.624263345263898, -1863809.083335365634412], zoom: 17 },
	{ name: "SOPOCACHI ALTO", pos: [-7584707.215883921831846, -1864106.894659134792164], zoom: 17 },
	{ name: "FARO MURILLO", pos: [-7586858.611691223457456, -1863764.773887964198366], zoom: 17 },
	{ name: "LAS LOMAS", pos: [-7585173.666602561250329, -1865391.871765763731673], zoom: 17 },
	{ name: "LLOJETA", pos: [-7584662.395358731038868, -1866533.877968890825287], zoom: 17 },
	{ name: "OBISPO BOSQUE", pos: [-7585435.508878928609192, -1864837.927322140429169], zoom: 17 },
	{ name: "PASANKERI", pos: [-7585767.764774272218347, -1865537.58297059731558], zoom: 17 },
	{ name: "SAN JUAN DE COTAHUMA", pos: [-7586306.866494508460164, -1864478.913437245413661], zoom: 17 },
	{ name: "SAN PEDRO", pos: [-7584780.67906707059592, -1863200.836958569008857], zoom: 17 },
	{ name: "SAN PEDRO ALTO", pos: [-7585399.338494156487286, -1863318.893120896304026], zoom: 17 },
	{ name: "SOPOCACHI", pos: [-7584123.997609419748187, -1864265.001257843337953], zoom: 17 },
	{ name: "SOPOCACHI BAJO", pos: [-7583627.402222845703363, -1864949.447272849734873], zoom: 17 },
	{ name: "TACAGUA", pos: [-7585947.916534631513059, -1863928.570672059897333], zoom: 17 },
	{ name: "ALTO TACAGUA", pos: [-7586464.408974840305746, -1864116.116282521281391], zoom: 17 },
	{ name: "TEMBLADERANI", pos: [-7585348.244538004510105, -1864355.268725552363321], zoom: 17 },
	{ name: "TUPAC AMARU", pos: [-7586210.394282031804323, -1864839.748238522326574], zoom: 17 },
	{ name: "VILLA NUEVO POTOSI", pos: [-7586154.456157615408301, -1863450.120637079235166], zoom: 17 },
	{ name: "ARANJUEZ", pos: [-7581200.774069448933005, -1869436.353795574279502], zoom: 17 },
	{ name: "HUACALLANI", pos: [-7573260.989794577471912, -1871550.958630996989086], zoom: 17 },
	{ name: "ISLA VERDE", pos: [-7581154.668572027236223, -1870760.950427461415529], zoom: 17 },
	{ name: "JUPAPINA", pos: [-7577541.409126745536923, -1874366.538863426772878], zoom: 17 },
	{ name: "MALLASA", pos: [-7578749.671328227035701, -1871347.286766723031178], zoom: 17 },
	{ name: "MALLASILLA", pos: [-7580769.777354169636965, -1870271.172185633098707], zoom: 17 },
	{ name: "14 DE SEPTIEMBRE", pos: [-7585968.517929330468178, -1862274.456255996366963], zoom: 17 },
	{ name: "23 DE MARZO LA HOYADA", pos: [-7587483.163100826554, -1863105.305639019934461], zoom: 17 },
	{ name: "ALTO CIUDADELA", pos: [-7586805.824034798890352, -1857562.564819663297385], zoom: 17 },
	{ name: "VILLA ANTOFAGASTA", pos: [-7588393.181135034188628, -1861710.975596196483821], zoom: 17 },
	{ name: "ALTO MARISCAL SANTA CRUZ", pos: [-7587820.542018600739539, -1862091.365827252622694], zoom: 17 },
	{ name: "ALTO MUNAYPATA CUSICANCHA", pos: [-7587944.357111064717174, -1860873.340048674726859], zoom: 17 },
	{ name: "ALTO PURA PURA", pos: [-7587492.952691739425063, -1858246.204243602231145], zoom: 17 },
	{ name: "SAGRADO CORAZON DE JESUS", pos: [-7586936.598027259111404, -1863251.761214685626328], zoom: 17 },
	{ name: "UNION ALIANZA", pos: [-7588209.25594993494451, -1859702.988275178475305], zoom: 17 },
	{ name: "MARISCAL SANTA CRUZ", pos: [-7587352.45905127748847, -1861817.860730615677312], zoom: 17 },
	{ name: "EL TEJAR", pos: [-7587137.232291190885007, -1862340.195488650118932], zoom: 17 },
	{ name: "BARRIO LINDO", pos: [-7587217.357083014212549, -1863206.92454343335703], zoom: 17 },
	{ name: "CAJA FERROVIARIA", pos: [-7586348.995702271349728, -1856852.145127942785621], zoom: 17 },
	{ name: "CALLAMPAYA", pos: [-7586493.587536536157131, -1862129.417951250215992], zoom: 17 },
	{ name: "CHAMOCO CHICO", pos: [-7586980.342528648674488, -1862884.132513507967815], zoom: 17 },
	{ name: "CHUALLUMA", pos: [-7587537.774060629308224, -1862388.166171441087499], zoom: 17 },
	{ name: "CIUDADELA FERROVIARIA", pos: [-7586543.77658115234226, -1857956.17481010989286], zoom: 17 },
	{ name: "GRAN PODER", pos: [-7585651.610807147808373, -1862732.332019188674167], zoom: 17 },
	{ name: "HUACATAQUI", pos: [-7587683.315389631316066, -1862728.677742580417544], zoom: 17 },
	{ name: "LA PORTADA", pos: [-7588250.318409558385611, -1861593.309383704792708], zoom: 17 },
	{ name: "LOS ANDES", pos: [-7586248.442233351059258, -1862591.06972394650802], zoom: 17 },
	{ name: "MUNAYPATA", pos: [-7587444.859195145778358, -1861308.837057073833421], zoom: 17 },
	{ name: "OBISPO INDABURO", pos: [-7586253.948639475740492, -1862837.323284632293507], zoom: 17 },
	{ name: "PURA PURA", pos: [-7586463.155256864614785, -1860361.236305014463142], zoom: 17 },
	{ name: "RINCON LA PORTADA", pos: [-7588401.164816685020924, -1860986.100798856467009], zoom: 17 },
	{ name: "CHIJINI", pos: [-7586600.004494304768741, -1863172.248001657659188], zoom: 17 },
	{ name: "VILLA VICTORIA", pos: [-7586564.490867748856544, -1861656.755053364904597], zoom: 17 },
	{ name: "27 DE MAYO", pos: [-7584229.946807553991675, -1860745.617805159185082], zoom: 17 },
	{ name: "3 DE MAYO", pos: [-7582410.433675794862211, -1858512.20621913461946], zoom: 17 },
	{ name: "ACHACHICALA", pos: [-7586419.54581409599632, -1859242.275827085133642], zoom: 17 },
	{ name: "AGUA DE LA VIDA", pos: [-7584214.513950261287391, -1861646.218446695012972], zoom: 17 },
	{ name: "AGUA DE LA VIDA NORTE", pos: [-7584159.113460076972842, -1861133.99202243774198], zoom: 17 },
	{ name: "ALTO LA MERCED", pos: [-7583083.630136646330357, -1858628.300866358680651], zoom: 17 },
	{ name: "ALTO LAS DELICIAS", pos: [-7583713.436358477920294, -1859454.848433757899329], zoom: 17 },
	{ name: "ALTO VINO TINTO", pos: [-7585891.713526440784335, -1859729.483823749003932], zoom: 17 },
	{ name: "BARRIO GRAFICO", pos: [-7582914.426172704435885, -1860559.144622958265245], zoom: 17 },
	{ name: "BARRIO PETROLERO", pos: [-7582601.689698295667768, -1860105.826998739968985], zoom: 17 },
	{ name: "CHALLAPAMPA", pos: [-7585548.969299544580281, -1861156.450974193867296], zoom: 17 },
	{ name: "CHUQUIAGUILLO", pos: [-7581337.959845637902617, -1858100.91390790999867], zoom: 17 },
	{ name: "CONDORINI", pos: [-7582881.369746356271207, -1858434.673640359658748], zoom: 17 },
	{ name: "CUPILUPACA", pos: [-7584135.720153969712555, -1860347.630793693242595], zoom: 17 },
	{ name: "HUAYCHANI", pos: [-7582182.17956683691591, -1859535.554873832967132], zoom: 17 },
	{ name: "KALAJAHUIRA", pos: [-7580267.188570158556104, -1857108.826984283979982], zoom: 17 },
	{ name: "KAMIRPATA", pos: [-7586171.215681899338961, -1859161.369320353725925], zoom: 17 },
	{ name: "KOCHAPAMPA", pos: [-7581556.965090903453529, -1858800.72512088296935], zoom: 17 },
	{ name: "LA MERCED", pos: [-7582927.855331616476178, -1859243.455617816653103], zoom: 17 },
	{ name: "LAS DELICIAS", pos: [-7583386.917237648740411, -1859649.061720251105726], zoom: 17 },
	{ name: "LAS NIEVES", pos: [-7585887.164701138623059, -1856768.378226893488318], zoom: 17 },
	{ name: "LIMANIPATA", pos: [-7585472.751124052330852, -1855769.221358699025586], zoom: 17 },
	{ name: "MIRAFLORES ALTO", pos: [-7583556.066997868940234, -1860659.493838639231399], zoom: 17 },
	{ name: "PLAN AUTOPISTA", pos: [-7586068.087455393746495, -1857895.685788345290348], zoom: 17 },
	{ name: "POKENI CHAPUMA", pos: [-7583649.126864579506218, -1860099.3574275940191], zoom: 17 },
	{ name: "ROSASANI", pos: [-7583634.483963656239212, -1858983.383918674197048], zoom: 17 },
	{ name: "SAN JUAN", pos: [-7583805.377016878686845, -1861811.876407221890986], zoom: 17 },
	{ name: "SAN JUAN LAZARETO", pos: [-7583818.871678208932281, -1861233.216576041188091], zoom: 17 },
	{ name: "SANTA ROSA", pos: [-7583851.10124590806663, -1860485.379238266963512], zoom: 17 },
	{ name: "SANTA ROSA TIJI", pos: [-7584047.102831547148526, -1859836.493263468611985], zoom: 17 },
	{ name: "SANTIAGO DE LACAYA", pos: [-7584315.712182273156941, -1859154.527811831794679], zoom: 17 },
	{ name: "TANGANI", pos: [-7585399.539247383363545, -1857874.56223296164535], zoom: 17 },
	{ name: "URKUPI�A", pos: [-7583148.745729890652001, -1857866.803474461426958], zoom: 17 },
	{ name: "VILLA 18 DE MAYO", pos: [-7585915.853044949471951, -1860148.806745241396129], zoom: 17 },
	{ name: "VILLA DE LA CRUZ", pos: [-7584660.278235969133675, -1861118.480471759336069], zoom: 17 },
	{ name: "VILLA EL CARMEN", pos: [-7582269.301103976555169, -1858888.648474775021896], zoom: 17 },
	{ name: "VILLA FATIMA", pos: [-7582956.654733026400208, -1860004.853408654686064], zoom: 17 },
	{ name: "VILLA PABON", pos: [-7584042.478899341076612, -1862044.264504177495837], zoom: 17 },
	{ name: "VINO TINTO", pos: [-7585502.158879031427205, -1860543.154278266243637], zoom: 17 },
	{ name: "ZONA NORTE", pos: [-7584794.178734118118882, -1861518.050444986205548], zoom: 17 },
	{ name: "24 DE JUNIO", pos: [-7581870.932806400582194, -1860317.267436271067709], zoom: 17 },
	{ name: "CALLAPA", pos: [-7579760.428931327536702, -1862828.629910174757242], zoom: 17 },
	{ name: "CIUDAD DEL NI�O", pos: [-7580119.272505860775709, -1861926.038844330934808], zoom: 17 },
	{ name: "CUARTO CENTENARIO", pos: [-7582224.759401317685843, -1864372.277023858157918], zoom: 17 },
	{ name: "ESCOBAR URIA", pos: [-7581861.07794851064682, -1861789.845424922183156], zoom: 17 },
	{ name: "KUPINI", pos: [-7580702.712056228891015, -1863772.968938525998965], zoom: 17 },
	{ name: "PACASA", pos: [-7582242.604598212987185, -1860855.118173870723695], zoom: 17 },
	{ name: "PAMPAHASI", pos: [-7581262.593644492328167, -1862458.634054996073246], zoom: 17 },
	{ name: "PRIMAVERA", pos: [-7580512.163242063485086, -1860281.465106666786596], zoom: 17 },
	{ name: "SAN ANTONIO", pos: [-7582144.85304607078433, -1862610.599266275763512], zoom: 17 },
	{ name: "SAN ISIDRO", pos: [-7581559.307691799476743, -1864025.557487776968628], zoom: 17 },
	{ name: "SAN SIMON", pos: [-7582376.782298262231052, -1860186.045479797990993], zoom: 17 },
	{ name: "VALLE DE LAS FLORES", pos: [-7580653.482863613404334, -1862592.111964323092252], zoom: 17 },
	{ name: "VALLE HERMOSO", pos: [-7581872.608224695548415, -1861268.331739237299189], zoom: 17 },
	{ name: "VILLA ARMONIA", pos: [-7582215.742416431196034, -1863740.985217806650326], zoom: 17 },
	{ name: "VILLA COPACABANA", pos: [-7582628.105873658321798, -1861406.075947349891067], zoom: 17 },
	{ name: "VILLA LITORAL", pos: [-7581677.113431815057993, -1863392.298785836203024], zoom: 17 },
	{ name: "VILLA SALOME", pos: [-7580602.70865554921329, -1861315.842531692469493], zoom: 17 },
	{ name: "ACHUMANI", pos: [-7577414.573940338566899, -1865745.344794997246936], zoom: 17 },
	{ name: "ACHUMANI PORVENIR KANTUTAS", pos: [-7577547.437317503616214, -1866759.289408138720319], zoom: 17 },
	{ name: "ALTO ACHUMANI", pos: [-7575918.886411567218602, -1864589.083988386904821], zoom: 17 },
	{ name: "ALTO IRPAVI", pos: [-7578717.313126971013844, -1864677.796380328480154], zoom: 17 },
	{ name: "ALTO OBRAJES", pos: [-7581568.982156996615231, -1865030.571529152337462], zoom: 17 },
	{ name: "ALTO SEGUENCOMA", pos: [-7581294.144417535513639, -1866763.171759801451117], zoom: 17 },
	{ name: "ARUNTAYA", pos: [-7578242.783758474513888, -1865181.452141001122072], zoom: 17 },
	{ name: "AUQUISAMA�A", pos: [-7578179.635179939679801, -1868390.259402561932802], zoom: 17 },
	{ name: "ALTO CALACOTO", pos: [-7577020.366396177560091, -1868268.206016578245908], zoom: 17 },
	{ name: "BELLA VISTA", pos: [-7580340.321901459246874, -1866130.180752525571734], zoom: 17 },
	{ name: "BOLOGNIA", pos: [-7579893.902720748446882, -1865062.888733100844547], zoom: 17 },
	{ name: "CALACOTO", pos: [-7579086.470360332168639, -1867482.664010311011225], zoom: 17 },
	{ name: "CALIRI", pos: [-7579798.50655569601804, -1863759.724554466083646], zoom: 17 },
	{ name: "CASEGURAL", pos: [-7574058.712366397492588, -1866438.286516410531476], zoom: 17 },
	{ name: "CHASQUIPAMPA", pos: [-7575475.559805101715028, -1867228.929050863953307], zoom: 17 },
	{ name: "CIUDADELA STRONGUISTA", pos: [-7577600.474686773493886, -1864091.744209086056799], zoom: 17 },
	{ name: "CONDORES LAKOTA", pos: [-7576369.242782182060182, -1866174.219569551292807], zoom: 17 },
	{ name: "COQUENI", pos: [-7575133.421287257224321, -1866717.511302017141134], zoom: 17 },
	{ name: "COTA COTA", pos: [-7576851.195173903368413, -1867505.947315374854952], zoom: 17 },
	{ name: "GRAMADAL", pos: [-7580608.512332336045802, -1868083.899038502248004], zoom: 17 },
	{ name: "HUANTAQUI", pos: [-7576013.411894388496876, -1865397.393743685213849], zoom: 17 },
	{ name: "HUANCANE", pos: [-7574633.349048878066242, -1865878.316699963295832], zoom: 17 },
	{ name: "HUANU HUANUNI", pos: [-7580770.138764542527497, -1865570.10413537803106], zoom: 17 },
	{ name: "HUAYLLANI", pos: [-7574620.258624342270195, -1863757.093436109367758], zoom: 17 },
	{ name: "VIRGEN DE COPACABANA", pos: [-7574350.298567577265203, -1868087.521722486242652], zoom: 17 },
	{ name: "IRPAVI", pos: [-7579292.946862655691803, -1865578.051428287290037], zoom: 17 },
	{ name: "IRPAVI II", pos: [-7578769.239181567914784, -1862735.936850840691477], zoom: 17 },
	{ name: "CHIJIPATA", pos: [-7574574.12801768630743, -1863435.484964594710618], zoom: 17 },
	{ name: "KESINI", pos: [-7575007.764225488528609, -1866332.292329096468166], zoom: 17 },
	{ name: "KOANI", pos: [-7578591.411408574320376, -1866287.169425025349483], zoom: 17 },
	{ name: "KUPILLANI CODAVISA", pos: [-7574368.662123691290617, -1867532.492788660805672], zoom: 17 },
	{ name: "LA FLORIDA", pos: [-7579430.290499017573893, -1868492.773829154903069], zoom: 17 },
	{ name: "LOS PINOS", pos: [-7577923.902832310646772, -1867803.532334489515051], zoom: 17 },
	{ name: "LOS ROSALES", pos: [-7575516.8683429248631, -1864255.73324583703652], zoom: 17 },
	{ name: "LOS ROSALES ALTO CALACOTO", pos: [-7575124.179243098013103, -1867835.63353370805271], zoom: 17 },
	{ name: "MESETA ACHUMANI", pos: [-7578231.549248016439378, -1866145.873688667779788], zoom: 17 },
	{ name: "OBRAJES", pos: [-7581709.929666577838361, -1865676.286957937991247], zoom: 17 },
	{ name: "OVEJUYO", pos: [-7573412.213621910661459, -1866755.963299581548199], zoom: 17 },
	{ name: "OVEJUYO EL ARENAL", pos: [-7573146.819741238839924, -1867561.153219840023667], zoom: 17 },
	{ name: "PEDREGAL", pos: [-7575683.985033422708511, -1868380.428158273920417], zoom: 17 },
	{ name: "ROSAS DE CALACALANI", pos: [-7573738.115373941138387, -1865923.218727274332196], zoom: 17 },
	{ name: "SAN MIGUEL", pos: [-7578528.617541827261448, -1867732.386491046985611], zoom: 17 },
	{ name: "SEGUENCOMA BAJO", pos: [-7580588.809920757077634, -1867098.02254404919222], zoom: 17 },
	{ name: "VENTILLA", pos: [-7580137.30264147464186, -1867127.270347015466541], zoom: 17 },
	{ name: "VERGEL", pos: [-7578882.3064289316535, -1863407.695347341243178], zoom: 17 },
	{ name: "VILLA APA�A", pos: [-7572655.011713838204741, -1868284.801278015598655], zoom: 17 },
	{ name: "VIRGEN DE LA MERCED", pos: [-7574273.656202050857246, -1867074.717927056131884], zoom: 17 },
	{ name: "WILACOTA", pos: [-7574274.904636557213962, -1866003.053984515136108], zoom: 17 },
	{ name: "INCA LLOJETA", pos: [-7585589.117314196191728, -1866368.384293087292463], zoom: 17 },
	{ name: "SAN JORGE", pos: [-7583506.305569479241967, -1863823.559384596301243], zoom: 17 },
	{ name: "ALTO SAGRADO CORAZON DE JESUS", pos: [-7587219.329540045931935, -1863431.70383109874092], zoom: 17 },
	{ name: "ALTO LA FLORIDA", pos: [-7579056.350696032866836, -1868161.18444691807963], zoom: 17 },
	{ name: "SANTA RITA", pos: [-7577233.270060525275767, -1868661.292841135058552], zoom: 17 },
	{ name: "JARDINES DEL SUR", pos: [-7576035.006058088503778, -1864027.7378771584481], zoom: 17 },
	{ name: "KELLUMANI", pos: [-7575259.562787232920527, -1863351.136840760940686], zoom: 17 },
	{ name: "JURENKO", pos: [-7576131.337519105523825, -1863849.313985739834607], zoom: 17 },
	{ name: "AMOR DE DIOS", pos: [-7580190.244221467524767, -1868885.565226703183725], zoom: 17 },
	{ name: "ALTO TEJAR", pos: [-7587387.017981482669711, -1862759.461370324250311], zoom: 17 },
	{ name: "ALPACOMA", pos: [-7585149.640104291029274, -1867158.259184121387079], zoom: 17 },
	{ name: "SAN ALBERTO", pos: [-7579854.153370961546898, -1866506.461370793636888], zoom: 17 },
	{ name: "CHINCHAYA", pos: [-7579172.16243804898113, -1861046.481197626097128], zoom: 17 },
	{ name: "CHICANI", pos: [-7578185.114695341326296, -1861076.593721435405314], zoom: 17 },
	{ name: "COTAHUMA", pos: [-7585611.504907376132905, -1864588.103705125162378], zoom: 17 },
	{ name: "ALTO PURA PURA SAN SEBASTIAN", pos: [-7586682.196477663703263, -1856774.073530652560294], zoom: 17 },
	{ name: "KANTUTANI", pos: [-7583448.291622105054557, -1864442.811048134695739], zoom: 17 },
	{ name: "ALTO PURA PURA ALTO SAN PEDRO", pos: [-7586688.594827311113477, -1856104.460680505027995], zoom: 17 },
	{ name: "LOMAS DE ACHUMANI", pos: [-7575634.770889706909657, -1866240.844477463979274], zoom: 17 },
	{ name: "LIPARI", pos: [-7577041.639747112058103, -1874675.380580195225775], zoom: 17 },
	{ name: "ALTO VILLA VICTORIA", pos: [-7588212.674174014478922, -1860351.667790911858901], zoom: 17 },
	{ name: "CHIARAQUE", pos: [-7575910.365170025266707, -1869583.783041697461158], zoom: 17 }
	];

	
	$scope.open_mapa = function (){
		vectorSourcePoints = new ol.source.Vector();
    	vectorLayerPoints = new ol.layer.Vector({ source: vectorSourcePoints });
		
		var lotes_s = new ol.layer.Tile({
			title: 'Lotes Catastro',
			//opacity: 0.3,
			visible: true,
			source: new ol.source.TileWMS({
				url:  CONFIG.SIT_GEO_EXT +'geoserver/wms',
				params: { 'LAYERS': 'sit:lotessit', 'VERSION': '1.1.1', 'FORMAT': 'image/png','STYLES':'lotessit_s1','TILED': true },
				serverType: 'geoserver',
				crossOriginKeyword: 'anonymous'
			})
		});
		setTimeout(function()
		{
			console.log("open map");
			$("#map_regularizacion").empty();
			$scope.map = new ol.Map({
                target: 'map_regularizacion',
                layers: [
                    new ol.layer.Group({
                        title: 'Mapas Base',
                        layers: [
                            osm,
							lotes_s
							
                        ]
                    }),
                    new ol.layer.Group({
                        title: 'Capas',
                        layers: [
							vectorLayerZonas,
							vectorLayerPoints
                        ]
                    })
                ],

                view: new ol.View({
                    zoom: 16,
                    center: ol.proj.fromLonLat([-68.133555, -16.495687])
                })
            });
			//////////////////////////////////////
			var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
        	$scope.map.addControl(layerSwitcher);
			$scope.map.on('click', function (evt)
            {
                vectorSourcePoints.clear();
				var viewResolution = view.getResolution();
                var coord = $scope.map.getCoordinateFromPixel(evt.pixel);
                var centro = ol.proj.transform(coord,'EPSG:3857',epsg32719);
                var wkt = '';
                var centro_1 = ol.proj.transform(coord,'EPSG:3857',epsg4326);
                wkt = "POINT("+centro[0]+" "+centro[1]+")";
                var url = CONFIG.SIT_GEO_EXT +'geoserver/sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:zonasref&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(wkb_geometry,'+ wkt +')';       
				var url_zt = CONFIG.SIT_GEO_EXT +'geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:zonasvalor2015&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(geom,'+wkt+')'
                console.log("rrrrrrr",url);
				setTimeout(function()
                {
                    $.ajax({
                              url: url,
                              type: 'GET',
                              dataType: 'jsonp',
                              jsonpCallback: 'getJson',
                              success: function (data)
                              {
                                if(data.features.length == 1){            
									$scope.solicitud.distrito = data.features[0].properties.distrito;
									$("#distrito_r").val(data.features[0].properties.distrito);
									$scope.solicitud.macrodistrito = data.features[0].properties.macrodistrito;
									$("#macrodistrito_r").val(data.features[0].properties.macrodistrito);                
									$scope.solicitud.zona = data.features[0].properties.zona;
									$("#zona_r").val(data.features[0].properties.zona);
									///////////////////////////////////////////////////
									$.ajax({
										url: url_zt,
										type: 'GET',
										dataType: 'jsonp',
										jsonpCallback: 'getJson',
										success: function (data)
										{
										  	if(data.features.length == 1){
												var zona_t =  data.features[0].properties.grupovalor.replace("-","");
												$scope.solicitud.zonatributaria = parseInt(zona_t);
												$("#zona_t").val($scope.solicitud.zonatributaria);     
												console.log("Zona Tributaria : ",zona_t);   
										  	}
										  	else
										  	{
												console.log("ningun resultado para zona tributaria");
										  	}
										},
										error: function (data)
										{ 
										  console.log(data);
										}   
									});
									///////////////////////////////////////////////////      
                                }
                                else
                                {
                                  console.log("ningun resultado para zonas");
                                }
                              },
                              error: function (data)
                              { 
                                console.log(data);
                              }   
                          });
                },200);
                var feature = new ol.Feature(
                      new ol.geom.Point(ol.proj.fromLonLat(centro_1))
                );
                feature.setStyle(iconStyle);
                vectorSourcePoints.addFeature(feature);
            });
			//////////////////////////////////
			var search = new ol.control.Search(
			{
				getTitle: function (f) { return f.name; },
				autocomplete: function (s, cback) {
				var result = [];
				var rex = new RegExp(s.replace("*", "") || "\.*", "i");
				for (var i = 0; i < positions.length; i++) {
					if (rex.test(positions[i].name))
					result.push(positions[i]);
				}
				return result;
				}
			});
			$scope.map.addControl(search);
			search.on('select', function (e) {
				var n = e.search.name;
				var c = 0;
				var geo_zona;
				var myStyleZonas = new ol.style.Style({
					stroke: new ol.style.Stroke({ color: '#FF8000', width: 5 }),
					fill: new ol.style.Fill({ color: 'transparent' })
				});
		
				$scope.map.removeLayer(vectorLayerZonas);
				for (var i = 0; i < geo_zonas.features.length; i++) {
					var nombre_zona = geo_zonas.features[i].properties.zonaref; 
					if (n === nombre_zona) {
					c = c + 1;
					geo_zona = geo_zonas.features[i];
					}
				}
				if (c > 0) {
					geo_zona = JSON.stringify(geo_zona);
					vectorLayerZonas.setSource(new ol.source.Vector({
					features: (new ol.format.GeoJSON({ defaultDataProjection: 'EPSG:3857' })).readFeatures(geo_zona)
					}));
					vectorLayerZonas.setStyle(myStyleZonas);
					$scope.map.addLayer(vectorLayerZonas);
					$scope.map.getView().setCenter(e.search.pos);
					$scope.map.getView().setZoom(15);
					setTimeout(function () {
					vectorLayerZonas.getSource().clear();
					$scope.map.removeLayer(vectorLayerZonas);
					}, 2000);
				}
				$scope.map.getView().animate({
					center: e.search.pos,
					zoom: 15,
					easing: ol.easing.easeOut
				})
			});
		},3000);
	}
	//IMPORTANTE
	$scope.configParametros = {
		documentoSolicitud:{
			idTipoDocIfile : 0, //Actualizar para PRODUCCION
			acciones:{
				obtener:function () {
					var conf = new dataSITOL();
					conf.catObtenerParam("CatastroDocIDRegistro",function(resultado){
						var resApi = JSON.parse(resultado);
						//console.log("datos param--->",resApi);
						if(resApi.success)
						{
							$scope.configParametros.documentoSolicitud.idTipoDocIfile = parseInt(resApi.success.dataSql[0].valorParametro);
						}
						else
						{
							swal('', 'Error al obtener datos', 'error');
							console.log("Error al obtener datos",resApi.error.message,resApi.error.code);
							//$.unblockUI();
						}
					});
				}
			}
		},
		tasas:{
			servicioMunicipalNuevoMenor1000 : 0,
			servicioMunicipalNuevoMenor2000 : 0,
			servicioMunicipalNuevoMayor2000 : 0,
			servicioExternoNuevo : 0,
			servicioActualizacion : 0,

			acciones:{
				obtener:function () {
					var conf = new dataSIT();
					conf.catTasasCatastro(function(resultado){
						var resApi = JSON.parse(resultado);
						console.log("datos param tasas--->",resApi);
						if(resApi.success){
							//$scope.configParametros.documentoSolicitud.idTipoDocIfile = parseInt(resApi.success.dataSql[0].valorParametro);
							var data = resApi.success.dataSql;
							angular.forEach(data, function (item) {
								if(item.servicio == 'EXTERNO' && item.tipo == 'NUEVO'){
									$scope.configParametros.tasas.servicioExternoNuevo = item.valor;
								}
								if(item.servicio == 'MUNICIPAL' && item.tipo == 'NUEVO' && item.tipoArea == 1){
									$scope.configParametros.tasas.servicioMunicipalNuevoMenor1000 = item.valor;
								}
								if(item.servicio == 'MUNICIPAL' && item.tipo == 'NUEVO' && item.tipoArea == 2){
									$scope.configParametros.tasas.servicioMunicipalNuevoMenor2000 = item.valor;
								}
								if(item.servicio == 'MUNICIPAL' && item.tipo == 'NUEVO' && item.tipoArea == 3){
									$scope.configParametros.tasas.servicioMunicipalNuevoMayor2000 = item.valor;
								}
								if(item.servicio == 'ACTUALIZACION' && item.tipo == 'ACTUALIZACION'){
									$scope.configParametros.tasas.servicioActualizacion = item.valor;
								}
							})
						}
						else
						{
							swal('', 'Error al obtener datos', 'error');
							console.log("Error al obtener datos",resApi.error.message,resApi.error.code);
							//$.unblockUI();
						}
					});
				}
			}
		},
		
	}

	$scope.servicioTerritorio = {
		seleccionado : null,
		externo:{
			titulo : "Ley 467-REGULARIZACIÓN, DE EDIFICACIONES Y ADECUACIÓN NORMATIVA TERRITORIAL",
			codigo :"externo",
			vistas:{
				seleccionado:null,
				guia:{
					titulo:"GUÍA DE TRÁMITE",
					codigo:"guiaE"
				},
				tramites:{
					titulo:"MIS TRÁMITES",
					codigo:"tramitesE"
				},
				fomulario:{
					titulo:"FORMULARIO 402",
					codigo:"fomulario402"
				},
				solicitar:{
					titulo:"SOLICITAR TRÁMITE",
					codigo:"solicitarE"
				},
			}
		},
		acciones:{
			seleccionar:function (servicio) {
				
				$scope.servicioTerritorio.seleccionado = angular.copy(servicio);
				$scope.servicioTerritorio.seleccionado.vistas.seleccionado =angular.copy($scope.servicioTerritorio.seleccionado.vistas.guia);
				/*
				if($scope.servicioTerritorio.seleccionado.codigo == $scope.servicioTerritorio.externo.codigo){
					$scope.solicitud.acciones.establecerDatosTipoServicioyRegistro(3,1);//tipo servicio 3 externo, tipo registro 1 nuevo
				}
				*/
			},
			seleccionarVista:function (vista) {
				
				$scope.servicioTerritorio.seleccionado.vistas.seleccionado =  angular.copy(vista);
				//borrar datos de tramite
			}
		}
		
	}

	
	$scope.solicitud = {
		
		idTramiteOL	 : null,
		idInsFlujo	 : null,
		geom	 : null,
		idCatastroTipoServicio	 : null,
		idCatastroTipoRegistro	 : null,
		oid	 : null,
		solicitante	 : null,
		idTipoDocumento	 : null,
		numDocumento	 : null,
		idExpedido	 : null,
		telefonoSolicitante	 : null,
		emailSolicitante	 : null,
		tipoPersona	 : null,
		profesionalNombre	 : null,
		profesionalEmail	 : null,
		profesionalTelefono	 : null,
		profesionalCab	 : null,
		idmacroDistrito	 : null,
		iddistritoMunicipal	 : null,
		codigoCatastral	 : null,
		direccion	 : null,
		zona	 : null,
		nroPuerta	 : null,
		riesgo	 : null,
		idCodPlanimetria	 : null,
		descPlanimetria	 : null,
		idTipoLote	 : null,
		numeroPisos	 : null,
		numeroBloques	 : null,
		tieneSotano	 : null,
		numeroInmueble	 : null,
		observaciones	 : null,
		idRequisitos	 : null,
		fechaRegistro	 : null,
		fechaDelegado	 : null,
		fechaEnvio	 : null,
		fechaModificacion	 : null,
		idEstado	 : null,
		idTipoAcceso	 : null,
		archivo1	 : null,
		archivo2	 : null,
		carTerrPendiente	 : null,
		carViaPendiente	 : null,
		serBasAlcantarillado	 : null,
		serBasEnergiaElectrica	 : null,
		serBasTelefono	 : null,
		serBasAguaPotable	 : null,
		serBasAlumbradoPublico	 : null,
		serBasGasDomiciliario	 : null,
		serBasTvCable	 : null,
		serBasInternet	 : null,
		supTotalConstruida	 : null,
		supSegunLevantamiento	 : null,
		supSegunTestimonio	 : null,
		correosProcesamiento	 : null,
		fotoFachada	 : null,
		apoderadoNombre	 : null,
		apoderadoIdTipoDocumento	 : null,
		apoderadoNrodocumento	 : null,
		apoderadoTelefono	 : null,
		apoderadoEmail	 : null,
		apoderadoNroPoder	 : null,
		sitramUid	 : null,
		sitramNro	 : null,
		sitramGestion	 : null,
		sitramContrasena	 : null,
		usuarioProcesador	 : null,
		idTramiteIGOB	 : null,
		solicitanteNombre: null,
		solicitantePaterno: null,
		solicitanteMaterno: null,
		listaExterno:[],
		listaNombres:[],
		listatipovivienda:[],
		listaSolicitudF02:[],
		acciones:{
			reset:function () {
				$scope.solicitud.idTramiteOL = null,
					$scope.solicitud.idInsFlujo = null,
					$scope.solicitud.geom = null,
					$scope.solicitud.idCatastroTipoServicio = null,
					$scope.solicitud.idCatastroTipoRegistro = null,
					//$scope.solicitud.oid = null,
					//$scope.solicitud.solicitante = null,
					//$scope.solicitud.idTipoDocumento = null,
					//$scope.solicitud.numDocumento = null,
					//$scope.solicitud.idExpedido = null,
					//$scope.solicitud.telefonoSolicitante = null,
					//.solicitud.emailSolicitante = null,
					//$scope.solicitud.tipoPersona = null,
					$scope.solicitud.profesionalNombre = null,
					$scope.solicitud.profesionalEmail = null,
					$scope.solicitud.profesionalTelefono = null,
					$scope.solicitud.profesionalCab = null,
					$scope.solicitud.idmacroDistrito = null,
					$scope.solicitud.iddistritoMunicipal = null,
					$scope.solicitud.codigoCatastral = null,
					$scope.solicitud.direccion = null,
					$scope.solicitud.zona = null,
					$scope.solicitud.nroPuerta = null,
					$scope.solicitud.riesgo = null,
					$scope.solicitud.idCodPlanimetria = null,
					$scope.solicitud.descPlanimetria = null,
					$scope.solicitud.idTipoLote = null,
					$scope.solicitud.numeroPisos = null,
					$scope.solicitud.numeroBloques = null,
					$scope.solicitud.tieneSotano = null,
					$scope.solicitud.numeroInmueble = null,
					$scope.solicitud.observaciones = null,
					$scope.solicitud.idRequisitos = null,
					$scope.solicitud.fechaRegistro = null,
					$scope.solicitud.fechaDelegado = null,
					$scope.solicitud.fechaEnvio = null,
					$scope.solicitud.fechaModificacion = null,
					$scope.solicitud.idEstado = null,
					$scope.solicitud.idTipoAcceso = null,
					$scope.solicitud.archivo1 = null,
					$scope.solicitud.archivo2 = null,
					$scope.solicitud.carTerrPendiente = null,
					$scope.solicitud.carViaPendiente = null,
					$scope.solicitud.serBasAlcantarillado = null,
					$scope.solicitud.serBasEnergiaElectrica = null,
					$scope.solicitud.serBasTelefono = null,
					$scope.solicitud.serBasAguaPotable = null,
					$scope.solicitud.serBasAlumbradoPublico = null,
					$scope.solicitud.serBasGasDomiciliario = null,
					$scope.solicitud.serBasTvCable = null,
					$scope.solicitud.serBasInternet = null,
					$scope.solicitud.supTotalConstruida = null,
					$scope.solicitud.supSegunLevantamiento = null,
					$scope.solicitud.supSegunTestimonio = null,
					$scope.solicitud.correosProcesamiento = null,
					$scope.solicitud.fotoFachada = null,
					$scope.solicitud.apoderadoNombre = null,
					$scope.solicitud.apoderadoIdTipoDocumento = null,
					$scope.solicitud.apoderadoNrodocumento = null,
					$scope.solicitud.apoderadoTelefono = null,
					$scope.solicitud.apoderadoEmail = null,
					$scope.solicitud.apoderadoNroPoder = null,
					$scope.solicitud.sitramUid = null,
					$scope.solicitud.sitramNro = null,
					$scope.solicitud.sitramGestion = null,
					$scope.solicitud.sitramContrasena = null,
					$scope.solicitud.usuarioProcesador = null,
					$scope.solicitud.idTramiteIGOB = null,

					$scope.solicitud.numeroDocumento = null,
					
					$scope.solicitud.supconstruida = null,	
					$scope.solicitud.supmodificar = null,	
					$scope.solicitud.tipovivienda = null,	
					$scope.solicitud.tipoconstruccion = null,	

					$scope.profesinalExterno.encontrado = null;		


			},
			establecerDatosSolicitante:function () {
				var datosCiudadano = new rcNatural();
				datosCiudadano.oid = sessionService.get('IDCIUDADANO');
				datosCiudadano.datosCiudadanoNatural(function(resultado){
					var response = JSON.parse(resultado);
					if (response.length > 0) {
						var results = response;
						$scope.solicitud.oid = sessionService.get('IDCIUDADANO');
						var tipoPersona = results[0].dtspsl_tipo_persona;
						$scope.solicitud.idExpedido = '11';
						if (tipoPersona == 'NATURAL') {
							$scope.solicitud.tipoPersona = 'NATURAL';
							if(results[0].dtspsl_nombres){
								$scope.solicitud.solicitante = results[0].dtspsl_nombres;
								$scope.solicitud.solicitanteNombre = results[0].dtspsl_nombres;
							}
							if(results[0].dtspsl_paterno){
								$scope.solicitud.solicitante = $scope.solicitud.solicitante + ' ' + results[0].dtspsl_paterno;
								$scope.solicitud.solicitantePaterno = results[0].dtspsl_paterno;
							}
							if(results[0].dtspsl_materno){
								$scope.solicitud.solicitante = $scope.solicitud.solicitante + ' ' + results[0].dtspsl_materno;
								$scope.solicitud.solicitanteMaterno = results[0].dtspsl_materno;
							}
							$scope.solicitud.idTipoDocumento= 1;
							$scope.solicitud.numDocumento= results[0].dtspsl_ci;
							switch(results[0].dtspsl_expedido) {
								case 'CHQ':
									$scope.solicitud.idExpedido = '6';
									break;
								case 'LPZ':
									$scope.solicitud.idExpedido = '1';
									break;
								case 'CBB':
									$scope.solicitud.idExpedido = '2';
									break;
								case 'ORU':
									$scope.solicitud.idExpedido = '4';
									break;
								case 'PTS':
									$scope.solicitud.idExpedido = '5';
									break;
								case 'TJA':
									$scope.solicitud.idExpedido = '7';
									break;
								case 'SCZ':
									$scope.solicitud.idExpedido = '3';
									break;
								case 'BNI':
									$scope.solicitud.idExpedido = '8';
									break;
								case 'PND':
									$scope.solicitud.idExpedido = '9';
									break;
							}
							//$scope.solicitud.idExpedido= results[0].dtspsl_expedido;
							$scope.solicitud.telefonoSolicitante= (results[0].dtspsl_movil!=null ? results[0].dtspsl_movil:(results[0].dtspsl_telefono != null ? results[0].dtspsl_telefono:''));
							$scope.solicitud.emailSolicitante= (results[0].dtspsl_correo != null?results[0].dtspsl_correo:'');
						}
						else{

							$scope.solicitud.tipoPersona = 'JURIDICO';
							if(results[0].dtspsl_razon_social){
								$scope.solicitud.solicitante = results[0].dtspsl_razon_social;
								$scope.solicitud.solicitanteNombre = results[0].dtspsl_razon_social;
							}
							$scope.solicitud.idTipoDocumento= 7;
							$scope.solicitud.numDocumento= results[0].dtspsl_nit;
							$scope.solicitud.idExpedido= '11';
							$scope.solicitud.telefonoSolicitante= (results[0].dtspsl_movil!=null ? results[0].dtspsl_movil:(results[0].dtspsl_telefono != null ? results[0].dtspsl_telefono:''));
							$scope.solicitud.emailSolicitante = (results[0].dtspsl_correo != null?results[0].dtspsl_correo:'');;
						}
					}
					else{
						swal('', 'Error al recuperar datos', 'error');
						console.log("Error no se encontraron los datos del ciudadano!!", sessionService.get('IDCIUDADANO'));
					}
				});

			},
			consultacontribuyente:function(datacon)
			{
				$.blockUI();


				console.log(datacon);
				$scope.open_mapa();
				
				var param= {
					"numeroInmueble": datacon.inmueble,//"269427",
					"numeroDocumentoId":datacon.cinit //"1540831-27"
				}
				var paramsup= {
					"inmueblesup": datacon.inmueble					
				}
				var p = {
					"usuario":"degem2021",
					"password":"degem20212021123456"
				};
				$http({
					method: 'POST',
					//url: 'http://192.168.6.210:3010/api/ingresarATM',				
					//url:  CONFIG.CONEXION_API_PG_IF_OFICIAL + 'wsSTTF/visualizarTramitesSITRAM',
					url:  CONFIG.CONEXION_API_ATM + 'api/ingresarATM',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					console.log("aaa==>", data.token);
					
					if(data.token)
					{
						$scope.solicitud.listaNombres = [];
						$scope.solicitud.listatipovivienda = [];
						$http({
							method: 'POST',
							//url: 'http://192.168.6.210:3010/api/superficieinmuebles',
							url:  CONFIG.CONEXION_API_ATM + 'api/superficieinmuebles',
							data: Object.toparams(param),
							headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + data.token }
						}).success(function (datasup, status, headers, config) {
							$.unblockUI();
							console.log("error email ",datasup.length);
							if(datasup.message)
							{
								console.log("no");
								$.unblockUI();
								$scope.solicitud.numeroDocumento = false;
								$scope.solicitud.macrodistrito="";
								$scope.solicitud.distrito="";
								$scope.solicitud.zona="";
								$scope.solicitud.celle_av="";
								$scope.solicitud.supconstruida="";
								$scope.solicitud.supmodificar="";
								$scope.solicitud.tipovivienda="";
								$scope.solicitud.tipoconstruccion="";					
								$scope.solicitud.inmueble="";
								$scope.solicitud.listaNombres = [];
								$scope.solicitud.listatipovivienda = [];
							}
							else
							{
								$scope.solicitud.numeroDocumento = true;
								var aMievento = [];
								var aEvento = {};																
								aEvento.NOMBRE_RSOCIAL= datasup.NOMBRE_RSOCIAL1;
								aEvento.PRIMER_APELLIDO_SIGLA=datasup.PRIMER_APELLIDO_SIGLA;
								aEvento.SEGUNDO_APELLIDO=datasup.SEGUNDO_APELLIDO ;
								aEvento.APELLIDO_ESPOSO=datasup.APELLIDO_ESPOSO ;
								aEvento.DOC_IDENTIDAD=datasup.DOC_IDENTIDAD ;
								aEvento.EXPEDIDO=datasup.EXPEDIDO ;
								aEvento.CLASE_INMUEBLE=datasup.CLASE_INMUEBLE ;
								aMievento.push(aEvento);
								$scope.solicitud.listaNombres =aMievento;
								$scope.tblSolicitudesNombres.reload();
								
								if(datasup.CLASE_INMUEBLE=="PH")
								{
									let arr =[{valor: "PH", clave: "PROPIEDAD HORIZONTAL"}];
									$scope.solicitud.listatipovivienda =arr;
								}
								else
								{
									let arr =[{valor: "VU", clave: "VIVIENDA UNIFAMILIAR"},{valor: "PH", clave: "PROPIEDAD HORIZONTAL"}];
									$scope.solicitud.listatipovivienda =arr;
									
								}

								$http({
									method: 'POST',
									//url: 'http://192.168.6.210:3010/api/superficiee',
									url:  CONFIG.CONEXION_API_ATM + 'api/superficiee',
									data: Object.toparams(paramsup),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + data.token }
								}).success(function (dataRegIgob, status, headers, config) {									
									$scope.solicitud.supconstruida = dataRegIgob.CONSTRUCCION_TOTAL;
									$.unblockUI();
								}).error(function (data, status, headers, config) {	
									$.unblockUI();
								});	
								
							}

							//console.log("error email ",datasup[0].PRIMER_APELLIDO_SIGLA);
							/*if(datasup.message=="no encontradoss")
							{
								$.unblockUI();
								$scope.solicitud.numeroDocumento = false;
							}else{
								$scope.solicitud.listaNombres =datasup;
								$scope.tblSolicitudesNombres.reload();
								console.log("==>",$scope.solicitud.listaNombres);
						

								$http({
									method: 'POST',
									url: 'http://192.168.6.210:3010/api/superficiee',
									data: Object.toparams(paramsup),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + data.token }
								}).success(function (dataRegIgob, status, headers, config) {									
									$scope.solicitud.supconstruida = dataRegIgob.CONSTRUCCION_TOTAL;
									$.unblockUI();
								}).error(function (data, status, headers, config) {	
									$.unblockUI();
								});	
							}	*/						

						}).error(function (data, status, headers, config) {		
							$.unblockUI();
							
							$scope.solicitud.macrodistrito="";
							$scope.solicitud.distrito="";
							$scope.solicitud.zona="";
							$scope.solicitud.celle_av="";
							$scope.solicitud.supconstruida="";
							$scope.solicitud.supmodificar="";
							$scope.solicitud.tipovivienda="";
							$scope.solicitud.tipoconstruccion="";					
							$scope.solicitud.inmueble="";
							$scope.solicitud.listaNombres = [];

						});

					}
					else{
						$scope.solicitud.numeroDocumento = true;
						swal('', 'Error al consultar seguimiento de trámite', 'error');
					}

				}).error(function (data, status, headers, config) {
					swal('', 'Error al consultar seguimiento de trámite', 'error');
					$.unblockUI();
				});
			},
			limpiar:function()
			{
				$scope.solicitud.macrodistrito="";
				$scope.solicitud.distrito="";
				$scope.solicitud.zona="";
				$scope.solicitud.celle_av="";
				$scope.solicitud.supconstruida="";
				$scope.solicitud.supmodificar="";
				$scope.solicitud.tipovivienda="";
				$scope.solicitud.tipoconstruccion="";					
				$scope.solicitud.inmueble="";
				$scope.solicitud.cinit="";
				$scope.solicitud.listaNombres = [];	
			},
			guardarDatosRecaudacionFor402:function (data) {
				console.log(data.listaNombres);
				
				var cadenan="",cadenaci="",cadenaexpedido="";
				
				for(i=0;i<data.listaNombres.length;i++)
				{
					console.log(data.listaNombres[i].TERCER_APELLIDO);
					if(data.listaNombres[i].NOMBRE_RSOCIAL==undefined)
					{
						data.listaNombres[i].NOMBRE_RSOCIAL="";
					}
					if(data.listaNombres[i].PRIMER_APELLIDO_SIGLA==undefined)
					{
						data.listaNombres[i].PRIMER_APELLIDO_SIGLA="";
					}
					if(data.listaNombres[i].SEGUNDO_APELLIDO==undefined)
					{
						data.listaNombres[i].SEGUNDO_APELLIDO="";
					}
					if(data.listaNombres[i].TERCER_APELLIDO==undefined)
					{
						data.listaNombres[i].TERCER_APELLIDO="";
					}
					if(data.listaNombres[i].DOC_IDENTIDAD==undefined)
					{
						data.listaNombres[i].DOC_IDENTIDAD="";
					}
					if(data.listaNombres[i].EXPEDIDO==undefined)
					{
						data.listaNombres[i].EXPEDIDO="";
					}
					var p = {
						"oid" :$scope.solicitud.oid,
						"nombre":data.listaNombres[i].NOMBRE_RSOCIAL,
						"primerapellido":data.listaNombres[i].PRIMER_APELLIDO_SIGLA,
						"segundoaepellido":data.listaNombres[i].SEGUNDO_APELLIDO,
						"esposoepellido":data.listaNombres[i].TERCER_APELLIDO,
						"ci":data.listaNombres[i].DOC_IDENTIDAD,
						"expedido":data.listaNombres[i].EXPEDIDO,						
						"macrodistrito":data.macrodistrito,
						"distrito":data.distrito,
						"zona":data.zona,
						"calle_av":data.celle_av,
						"supconstruida":data.supconstruida,
						"supmodificar":data.supmodificar,
						"tipovivienda":data.tipovivienda,
						"tipoconstruccion":data.tipoconstruccion,						
						"numero_inmueble":data.inmueble,
						"ci_solicitante":sessionService.get('CICIUDADANO'),
						"zonatributaria":data.zonatributaria
					};				
					
					$http({
						method: 'POST',
						url: CONFIG.SERVICE_SITOLextgen + 'ApiFom402/wsRegistraForm',
						data: Object.toparams(p),
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function (datasolici, status, headers, config) {
					
						$scope.solicitud.macrodistrito="";
						$scope.solicitud.distrito="";
						$scope.solicitud.zona="";
						$scope.solicitud.celle_av="";
						$scope.solicitud.supconstruida="";
						$scope.solicitud.supmodificar="";
						$scope.solicitud.tipovivienda="";
						$scope.solicitud.tipoconstruccion="";					
						$scope.solicitud.inmueble="";
						$scope.solicitud.cinit="";
						$scope.solicitud.listaNombres = [];						
						$scope.solicitud.acciones.listarFor402Solitud();
						if(datasolici.length>0)
						{
							
						}
						else{
							
						}
						$.unblockUI();
					}).error(function (data, status, headers, config) {
						swal('', 'Error al consultar seguimiento de trámite', 'error');
						$.unblockUI();
					});
				}
			},
			listarFor402Solitud:function (data) {
				console.log($scope.solicitud.oid);
				$scope.solicitud.listaSolicitudF02 = [];
				var sNroDocCiudadano = $scope.solicitud.oid;					
			        var p = {cisol:sessionService.get('CICIUDADANO')};
					$http({
						method: 'POST',
						url: CONFIG.SERVICE_SITOLextgen + 'ApiFom402/Seguimiento',
						data: Object.toparams(p),
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function (datasolici, status, headers, config) {
						console.log("rosososo",datasolici);
						if(datasolici.length>0)
						{
							$scope.solicitud.listaSolicitudF02 =datasolici;
						     $scope.tblSolicitudesExternoFormulario402.reload();
						}
						else{
							
						}
						$.unblockUI();
					}).error(function (data, status, headers, config) {
						swal('', 'Error al consultar seguimiento de trámite', 'error');
						$.unblockUI();
					});
			},
			establecerDatosProfesional:function (nombre, cab, telefono, email) {
				$scope.solicitud.profesionalNombre=nombre;
				$scope.solicitud.profesionalEmail=email;
				$scope.solicitud.profesionalTelefono=telefono;
				$scope.solicitud.profesionalCab=cab;
			},
			listarExterno:function () {
				$scope.solicitud.listaExterno = [];
				$.blockUI();
				var sNroDocCiudadano = sessionService.get('CICIUDADANO');
				if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
				{
					sNroDocCiudadano = sessionService.get('NITCIUDADANO');
				}
				var solicitud = new dataSITOL();
				solicitud.regListaSolicitudes(sNroDocCiudadano
					, function(resultado){
						$.unblockUI();
						var resApi = JSON.parse(resultado);
						if(resApi.success)
						{
							//console.log("entro");
							$scope.solicitud.listaExterno =resApi.success.dataSql;
							$scope.tblSolicitudesExterno.reload();
						}
						else
						{
							console.log("Error al listar",resApi.error.message,resApi.error.code);
						}
					});

			},
			obtener:function (idTramiteOL, accion) {
				$.blockUI();
				var solicitud = new dataSITOL();
				solicitud.regObtenerSolicitud(
					idTramiteOL
					, function(resultado){
						$.unblockUI();
						var resApi = JSON.parse(resultado);
						if(resApi.success)
						{
							console.log("sss", resApi);
							var data =resApi.success.dataSql[0];
							$scope.solicitud.idTramiteOL = data.idTramiteOL;
							//$scope.solicitud.solicitante = data.solicitanteNombre;
							//$scope.solicitud.idTipoDocumento = data.idTipoDocumento;
							$scope.solicitud.numDocumento = data.solicitanteNroDocumento;
							//$scope.solicitud.idExpedido = data.idExpedido;
							//$scope.solicitud.telefonoSolicitante = data.telefonoSolicitante;
							//$scope.solicitud.emailSolicitante = data.emailSolicitante;
							//$scope.solicitud.tipoPersona = data.tipoPersona;
							$scope.solicitud.profesionalCab = data.profesionalCab;
							$scope.solicitud.direccion = (data.direccion!=null)?data.direccion:"";
							$scope.solicitud.zona =data.zona;
							$scope.solicitud.nroPuerta = data.nroPuerta;
							$scope.solicitud.idTramiteIGOB = data.idTramiteIGOB;

							$scope.profesinalExterno.acciones.buscarPorNro($scope.solicitud.profesionalCab)
							console.log($scope.solicitud);
							//$('#modalConfirmacionReEnvio').modal('show');
							//return;
							if(accion == "delegar"){
								$scope.servicioTerritorio.acciones.seleccionar($scope.servicioTerritorio.externo)
								$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.solicitar);
							}
						}
						else
						{
							console.log("Error al obtener data",resApi.error.message,resApi.error.code);
						}
					});
			},
			guardarEnviar: function () {
				$.blockUI();
				if($scope.solicitud.idExpedido == null || $scope.solicitud.idExpedido == undefined)
					$scope.solicitud.idExpedido ='11';
				console.log('*************', $scope.solicitud);
				var solicitud = new dataSITOL();
				solicitud.regSolicitudReg(
					$scope.solicitud.idTramiteOL==null?0:$scope.solicitud.idTramiteOL,
					$scope.solicitud.solicitante,
					$scope.solicitud.idTipoDocumento,
					$scope.solicitud.numDocumento,
					$scope.solicitud.idExpedido,
					$scope.solicitud.telefonoSolicitante,
					$scope.solicitud.emailSolicitante,
					$scope.solicitud.tipoPersona,
					$scope.solicitud.profesionalNombre,
					$scope.solicitud.profesionalEmail,
					$scope.solicitud.profesionalTelefono,
					$scope.solicitud.profesionalCab,
					$scope.solicitud.direccion,
					$scope.solicitud.zona,
					$scope.solicitud.nroPuerta,
					$scope.solicitud.oid,
					$scope.solicitud.solicitanteNombre,
					$scope.solicitud.solicitantePaterno,
					$scope.solicitud.solicitanteMaterno
					, function(resultado){
						var resApi = JSON.parse(resultado);
						console.log(resApi);
						if(resApi.success)
						{
							$.unblockUI();
							if(resApi.success.dataSql[0].d)
							{
								//enviar correo al arquitecto
								$scope.solicitud.acciones.delegarProfesional(resApi.success.dataSql[0].d,$scope.solicitud.profesionalNombre,$scope.solicitud.idTramiteIGOB);
							}
							else
							{
								swal('', 'Error al guardar', 'error');
								$.unblockUI();
							}
						}
						else
						{
							$.unblockUI();
							swal('', 'Error al registrar solicitud. ' + resultado, 'error');
							console.log("Error al guardar",resApi.error.message,resApi.error.code);
						}
					});

			},
			delegarProfesional:function (param, profesional,idTramiteIGOB) {
				var p = {q: param};
				$.blockUI();
				$http({
					method: 'POST',
					//url: CONFIG.SERVICE_SITOLextgen + 'Territorio/EnviarCorreoDelegado',
					url: CONFIG.SERVICE_SITOLextgen + 'Regularizacion/DelegarSolicitud',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					$.unblockUI();
					if(data.res == "OK")
					{
						$scope.solicitud.acciones.listarExterno();
						swal('', 'Su solicitud fue delegada al profesional '+ profesional +'. \nUsted deberá coordinar con él, para el seguimiento de su trámite.', 'success');
						$scope.solicitud.acciones.reset();
						$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
						$.unblockUI();
						$scope.solicitud.acciones.registrarIGOB(param,idTramiteIGOB);
					}
					else
					{
						console.log("error email",data);
						$scope.solicitud.acciones.reset();
						$scope.solicitud.acciones.listarExterno();
						$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
						swal('', 'Error al enviar correo', 'error');
						$.unblockUI();
					}
				}).error(function (data, status, headers, config) {
					console.log("error email conexion",data, status, headers, config);
					$scope.solicitud.acciones.reset();
					$scope.solicitud.acciones.listarExterno();
					$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
					swal('', 'Error al enviar correo', 'error');
					$.unblockUI();
				});
			},
			anularConfirm:function (idTramite, idTramiteEnc) {
				console.log("sol", idTramiteEnc);
				$scope.idTramiteAnular = idTramite;
				$scope.idTramiteAnularEnc = idTramiteEnc;
				$('#modalConfirmarAnular').modal('show');
			},
			anular:function (idTramiteEnc) {
				console.log("anular" + idTramiteEnc);
				var p = {q: idTramiteEnc};
				$.blockUI();
				$http({
					method: 'POST',
					url: CONFIG.SERVICE_SITOLextgen + 'Regularizacion/AnularSolicitud',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					$.unblockUI();
					if(data.res == "OK")
					{
						$scope.solicitud.acciones.listarExterno();
						swal('', 'La solicitud fua anulada correctamente.', 'success');
						$scope.solicitud.acciones.reset();
						$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
						$.unblockUI();

						$scope.idTramiteAnular = null;
						$scope.idTramiteAnularEnc = null;
					}
					else
					{
						console.log("error email",data);
						$scope.solicitud.acciones.reset();
						$scope.solicitud.acciones.listarExterno();
						$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
						swal('', 'Error al anular solicitud. ' + JSON.stringify(data), 'error');
						$.unblockUI();
					}
				}).error(function (data, status, headers, config) {
					console.log("error anular solicitud conexion",data, status, headers, config);
					$scope.solicitud.acciones.reset();
					$scope.solicitud.acciones.listarExterno();
					$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
					swal('', 'Error al anular solicitud', 'error');
					$.unblockUI();
				});
			},
			registrarIGOB:function (param,idTramiteIGOB) {
				var p = {q: param};
				$.blockUI();
				$http({
					method: 'POST',
					url: CONFIG.SERVICE_SITOLextgen + 'Regularizacion/RegistrarIGOBObtenerParam',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					$.unblockUI();
					console.log("Obteniendo parametros igob", data, $scope.solicitud);
					if(data.res)
					{
						console.log("error crear en igob",data);
						swal('', 'No se pudo registrar en IGOB: ' + data.valor, 'error');
						$.unblockUI();
					}
					else
					{
						var credentials= {
							"user": data.igobCredentialsUser,
							"password": data.igobCredentialsPwd
						}
						$http({
							method: 'POST',
							url: data.igobCredentialsURL,
							data: Object.toparams(credentials),
							headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
						}).success(function (dataCre, status, headers, config) {
							$.unblockUI();
							console.log("Credentials igob", dataCre);
							if(idTramiteIGOB == null){
								/// igob reg
								$http({
									method: 'POST',
									url: data.igobServCreacionURL,
									data: Object.toparams(data.data),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + dataCre.token }
								}).success(function (dataRegIgob, status, headers, config) {
									$.unblockUI();
									console.log("Crear en igob", dataRegIgob);
									if(dataRegIgob.success){
										if(dataRegIgob.success.length>0){
											var id_form_tra = dataRegIgob.success[0].id_form_tra;
											console.log("id_form_tra",id_form_tra);
											//Actualizar idtramite en sitv2online
											var dataSit= {
												"q": param,
												"idTramite": id_form_tra
											}
											$http({
												method: 'POST',
												url: CONFIG.SERVICE_SITOLextgen + 'Regularizacion/RegistrarIGOBActualizarIDtramite',
												data: Object.toparams(dataSit),
												headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
											}).success(function (dataActTram, status, headers, config) {
												$.unblockUI();
												console.log("Actualizar tramite en sitol", dataActTram);
												if(dataActTram.res == "OK")
												{
													//Enviar notificacion
													var msj = data.igobServNotificacionMsj.replace('{0}', data.idRegTramiteOL);
													msj = msj.replace('{1}', data.profesional);
													var dataSit= {
														"idtramite":id_form_tra,
														"notificacion":msj,
														"sistema":data.igobServNotificacionSistema,
														"usuario":"CIUDADANO",
														"url_adjunto":""
													}
													$http({
														method: 'POST',
														url: data.igobServNotificacionURL,
														data: Object.toparams(dataSit),
														headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + dataCre.token }
													}).success(function (dataNotifIgob, status, headers, config) {
														$.unblockUI();
														console.log("Enviar notificacion", dataNotifIgob);
														if(dataNotifIgob.success){

														}
														else{
															//swal('', 'No se pudo enviar la notificacion. '  + JSON.stringify(dataNotifIgob), 'error');
															$.unblockUI();
														}

													}).error(function (data, status, headers, config) {
														console.log("error email conexion",data, status, headers, config);
														swal('', 'Error al registrar trámite en IGOB', 'error');
														$.unblockUI();
													});

													//
												}
												else
												{

												}
											}).error(function (data, status, headers, config) {
												console.log("error email conexion",data, status, headers, config);
												swal('', 'Error al registrar trámite en IGOB', 'error');
												$.unblockUI();
											});
										}
									}
									else{
										swal('', 'Error al registrar trámite en IGOB' + JSON.stringify(dataRegIgob), 'error');
										$.unblockUI();
									}
								}).error(function (data, status, headers, config) {
									console.log("error email conexion",data, status, headers, config);
									swal('', 'Error al registrar trámite en IGOB', 'error');
									$.unblockUI();
								});
								/// igob reg
							}
							else{
								return ;
								//****ernvio de comentario notificacion */
								var msj = data.igobServNotificacionMsj.replace('{0}', data.idRegTramiteOL);
								msj = msj.replace('{1}', data.profesional);
								var dataSit= {
									"idtramite":idTramiteIGOB,
									"notificacion":msj,
									"sistema":data.igobServNotificacionSistema,
									"usuario":"CIUDADANO",
									"url_adjunto":""
								}
								$http({
									method: 'POST',
									url: data.igobServNotificacionURL,
									data: Object.toparams(dataSit),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + dataCre.token }
								}).success(function (dataNotifIgob, status, headers, config) {
									$.unblockUI();
									console.log("Enviar notificacion", dataNotifIgob);
									if(dataNotifIgob.success){

									}
									else{
										
										//swal('', 'No se pudo enviar la notificacion. '  + JSON.stringify(dataNotifIgob), 'error');
										$.unblockUI();
									}

								}).error(function (data, status, headers, config) {
									console.log("error email conexion",data, status, headers, config);
									swal('', 'Error al registrar trámite en IGOB', 'error');
									$.unblockUI();
								});

								//
							}

						}).error(function (data, status, headers, config) {
							console.log("error credentials coneccion",data, status, headers, config);
							swal('', 'Error al enviar credenciales al IGOB', 'error');
							$.unblockUI();
						});
					}
				}).error(function (data, status, headers, config) {
					console.log("error email conexion",data, status, headers, config);
					swal('', 'Error al registrar trámite en IGOB', 'error');
					$.unblockUI();
				});
			},
		

			imprimirFomulario402:function (param){
				console.log(param);
				var fecha =  param.FECHA_REGISTRO;
				var fecha1="";
				if (fecha == null) {
					return '';
				}
				else {
					var f = new Date(parseInt(fecha.replace("/Date(", "").replace(")/", ""), 10)),
        			dia = f.getDate(), mes = (parseInt(f.getMonth()) + 1), anio = f.getFullYear();
					//var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
					fecha1=(dia < 10 ? "0" + dia : dia) + "/" + (mes < 10 ? "0" + mes : mes) + "/" + anio; //new Date(codigo_fecha).toLocaleDateString("es-AR");
					//var fecha_formato = $.format.date(fecha1, "dd-MM-yyyy");
					
				}
			
				/*alert(date.getFullYear());
				alert(date.getMonth());
				alert(date.getDay());*/
				/*let nom=param.cadenanombrescompleto.substring(0,param.cadenanombrescompleto.length-1);
				let arr = nom.split('|');
				let nom1=param.cadenaci.substring(0,param.cadenaci.length-1);
				let arr1 = nom1.split('|');
				console.log(param);
				var html='<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td  style="width: 70%; font-family:Arial; font-size:12px; color:#666; font-style:bold; text-align: center;"><b>NOMBRE Y APELLIDO O RAZÓN SOCIAL</b></td><td  style="width: 30%; font-family:Arial; font-size:12px; color:#666; font-style:bold; text-align: center;"><b>CI./NIT</b></td><t/r>';
				for(i=0;i<arr.length;i++)
				{
					html=html+'<tr><td  style="width: 70%; font-family:Arial; font-size:12px; color:#666; font-style:bold; text-align: left;">' +arr[i]+'</td><td  style="width: 30%; font-family:Arial; font-size:12px; color:#666; font-style:bold; text-align: center;">' +arr1[i]+'</td></tr>';

				}
				html=html+'</table>';*/

				var  printContents ='<div align="center">' +
				'<table width="98%" border="0" cellspacing="0" cellpadding="0">' +
					'<tr>' +
						'<td>' +
							'<div align="center"><img src="../../libs/img/log.png" height="50" /></div>' +
							
						'</td>' +
						'<td>' +
							'<p align="center">' +
						   ' <span style="font-family:Arial; font-size:14px; color:#666; font-weight: bold;"> FORMULARIO SOLICITUD DE MODIFICACIÓN DE DATOS TÉCNICOS</span><br>' +
						'</td>' +
					
					'</tr>' +
				'</table>' +
			'</div>' +
			'<br>' +
			'<center>' +
				'<table width="80%" border="0" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
					'<tr border="1">' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666;  font-weight: bold; text-align: center;">FORM 402 - A</td>' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666;  font-weight: bold; text-align: center;">NUMERO DE INMUEBLE</td>' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666;  font-weight: bold; text-align: center;">FECHA DE LA SOLICITUD</td>' +
					'</tr> ' +
					'<tr border="1">' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666; font-style:bold; text-align: center;">No. '+param.ID+'</td>' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666; font-style:bold; text-align: center;">'+param.NUMERO_INMUEBLE+'</td>' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666; font-style:bold; text-align: center;">'+fecha1+'</td>' +
					'</tr>' +
					
			   ' </table>' +
				'<table width="80%" border="2" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
					'<tr>' +
					     
						'<td style="width: 40%; font-family:Arial; font-size:11px; color:#666; font-weight: bold; text-align: left; border: 0mm;">NOMBRE Y APELLIDO O RAZÓN SOCIAL: </td>' +
						'<td style="width: 60%; font-family:Arial; font-size:11px; color:#666; font-style:bold; text-align: left; border: 0mm;"> '+param.NOMBRE_RAZON_SOCIAL+'  '+param.PRIMER_APELLIDO+' '+param.SEGUNDO_APELLIDO+' '+param.APELLIDO_ESPOSO+'</td> ' +
					'</tr>' +
					'<tr>' +
						'<td style="width: 40%; font-family:Arial; font-size:11px; color:#666; font-weight: bold; text-align: left; border: 0mm;">C.I./NIT: </td>' +
						'<td style="width: 60%; font-family:Arial; font-size:11px; color:#666; font-style:bold; text-align: left; border: 0mm;"> '+param.CARNET_IDENTIDAD+'</td> ' +
					'</tr>' +					
					'<tr>' +
						'<td style="width: 40%; font-family:Arial; font-size:11px; color:#666; font-weight: bold; text-align: left; border: 0mm;">DIRECCIÓN DEL INMUEBLE: </td>' +
						'<td style="width: 60%; font-family:Arial; font-size:11px; color:#666; font-style:bold; text-align: left; border: 0mm;">Macrodistrito:'+param.MACRO_DISTRITO+' Distrito:'+' '+param.DISTRITO+' Zona:'+param.ZONA+' Calle/Av.:'+param.CALLE_AVENIDA+' Nro:'+param.NUMERO_INMUEBLE+'</td> ' +
					'</tr>' +
				'</table>' +
			'</center>' +
			
			'<br>' +
			'<br>' +
			
			'<center>' +
				'<table width="80%"  cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
					'<tr border="1">' +
						'<td style="width: 100%; font-family:Arial; font-size:15px; color:#666;  font-weight: bold; text-align: center;">INFORMACIÓN DEL INMUEBLE OBJETO DE MODIFICACIÓN</td>' +
					'</tr> ' +
				'</table>' +
				'<br>' +
				'<table>'+
				'<tr>'+
				'</td>rrr'+
				'</td>'+
				'</tr>'+
				'</table>'+
			
				'<table width="80%" border="2" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;"> ' +
					'<tr border="2">' +
						'<table width="20%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
							'<tr>' +
								'<br>' +
								'<td style="width: 50%; font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center; border: 0mm;">DATOS DE LA CONSTRUCCIÓN REGISTRADOS EN EL PMC</td>' +
								'<td style="width: 50%; font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center; border: 0mm;">DATOS A MODIFICAR</td>   ' +
							'</tr> ' +
						'</table>' +
				   '</tr>' +
					'<br>' +
					'<tr>' +
						'<table width="80%" >  ' +
							'<tr style="border: black 2px solid;">' +
								'<td style="border: black 2px solid;">' +
									'<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: left;">SUPERFICIE DE CONSTRUCCIÓN A MODIFICAR mts2 :</td>' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: normal; text-align: center;">'+param.SUPERFICIE_CONSTRUIDA_RUAT+'</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: left;">BLOQUE :</td>' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: normal; text-align: center;">MODIFICAR</td>' +
										'</tr>' +
									'</table>' +
									
								'</td>' +
								'<td style="border: black 2px solid;">' +
									'<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: left;">SUPERFICIE A MODIFICAR m2:</td>' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: normal; text-align: center;">'+param.SUPERFICIE_A_MODIFICAR+'</td> ' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: left;">TIPO DE CONSTRUCCIÓN:</td>' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: normal; text-align: center;">'+param.TIPO_DE_VIVIENDA+'</td> ' +
										'</tr>' +
										
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: left;">TIPOLOGIA DE LA CONSTRUCCIÓN:</td>' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: normal; text-align: center;">'+param.MONTO_DETERMINADO+'</td> ' +
										'</tr>' +
									'</table>' +
								'</td>' +
							'</tr>' +
						'</table>' +
					'</tr>' +
				'</table>' +
				'<br>' +
				'<table width="80%" border="0" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
					'<tr border="1">' +
						'<td style="width: 100%; font-family:Arial; font-size:15px; color:#666;  font-weight: bold; text-align: center;">SUSCRIPCIÓN DE DDJJ</td>' +
					'</tr> ' +
				'</table>' +
				'<br>' +
				'<table width="80%" border="2" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;"> ' +
					'<tr border="2">' +
						'<table width="80%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
							'<tr>' +
								'<br>' +
								'<td style="width: 100%; font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center; border: 0mm;">' +
									'La presente declaración jurada se suscribe conforme a lo establecido en el articulo 22,78 y 157de la ley Nro. 2492 <br>' +
									'JURO LA EXACTITUD DE LA INFORMACIÓN DECLARADA EN EL PRESENTE FORMULARIO' +
								'</td> ' +
							'</tr> ' +
						'</table>' +
					'</tr>' +
				   '<br>' +
					'<tr>' +
						'<table width="80%" >  ' +
							'<tr style="border: black 2px solid;">' +
								'<td style="border: black 2px solid;">' +
									'<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">FIRMA:</td></br>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">ACLARACIÓN DE FIRMA :</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">C.I. NRO :</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">CORREO ELECTRONICO :</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">TELEFONO DE CONTACTO :</td>' +
										'</tr>' +
									'</table>' +
									
								'</td>' +
								'<td style="border: black 2px solid;">' +
									'<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
										'</tr>' +
									'</table>' +
								'</td>' +
							'</tr>' +
						'</table>' +
					'</tr>' +
				'</table>' +
			'</center>' ;
			var  printContents1 ='<center>' +
			'<table style="font-family: Arial; font-size: 10px; color: #333333; width: 80%;" border="1" width="80%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr>' +
			'<td rowspan=2 style="width: 21.2979%; font-family: Arial; font-size: 12px; color: #666666; text-align: center;"><br><div align="center"><img src="../../libs/img/log.png" height="50" /></div><br></td>' +
			'<td style="width: 21.1206%; font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: center;">FORMULARIO</td>' +
			'<td style="width: 89.5815%; font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: center;" colspan="2">SOLICITUD DE MODIFICACI&Oacute;N DE DATOS T&Eacute;CNICOS</td>' +
			'</tr>' +
			'<tr>' +
			
			'<td style="width: 21.1206%; font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: center;">FORM 402 - A</td>' +
			'<td style="width: 31.2269%; font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: center;">NUMERO DE INMUEBLE</td>' +
			'<td style="width: 58.3546%; font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: center;">FECHA DE LA SOLICITUD</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 21.2979%; font-family: Arial; font-size: 8px; color: #666666; text-align: center; font-weight: bold;">SOLICITUD DE MODIFICACI&Oacute;N DE DATOS DE CONSTRUCCI&Oacute;N</td>' +
			'<td style="width: 21.1206%; font-family: Arial; font-size: 12px; color: #666666; text-align: center;">No. '+param.ID+'</td>' +
			'<td style="width: 31.2269%; font-family: Arial; font-size: 12px; color: #666666; text-align: center;">'+param.NUMERO_INMUEBLE+'</td>' +
			'<td style="width: 58.3546%; font-family: Arial; font-size: 12px; color: #666666; text-align: center;">'+fecha1+'</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 132%;" colspan="4">' +
			'<table>' +
			'<tbody>' +
			'<tr>' +
			'<td style="width: 176.281px;font-family: Arial; font-size: 12px; color: #666666;">NOMBRE Y APELLIDO O RAZ&Oacute;N SOCIAL:</td>' +
			'<td style="width: 353.312px;font-family: Arial; font-size: 12px; color: #666666;">'+param.NOMBRE_RAZON_SOCIAL+'  '+param.PRIMER_APELLIDO+' '+param.SEGUNDO_APELLIDO+' '+param.APELLIDO_ESPOSO+'</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 176.281px;font-family: Arial; font-size: 12px; color: #666666;">C.I./NIT:</td>' +
			'<td style="width: 353.312px;font-family: Arial; font-size: 12px; color: #666666;"> '+param.CARNET_IDENTIDAD+'</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 176.281px;font-family: Arial; font-size: 12px; color: #666666;">DIRECCI&Oacute;N DEL INMUEBLE:</td>' +
			'<td style="width: 353.312px;font-family: Arial; font-size: 12px; color: #666666;">'+param.MACRO_DISTRITO+' Distrito:'+' '+param.DISTRITO+' Zona:'+param.ZONA+' Calle/Av.:'+param.CALLE_AVENIDA+' Nro:'+param.NUMERO_INMUEBLE+'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			
			'<table style="font-family: Arial; font-size: 10px; color: #333;"  width="80%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr>' +
			'<td style="width: 100%; font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;"><br>INFORMACI&Oacute;N DEL INMUEBLE OBJETO DE MODIFICACI&Oacute;N</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'<table style="font-family: Arial; font-size: 12px; color: #333333; width: 80%;" border="1" width="80%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr>' +
			'<td style="width: 40%; font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">&nbsp;&nbsp;<br />DATOS DE LA CONSTRUCCI&Oacute;N REGISTRADOS EN EL PMC<br /></td>' +
			'<td style="width: 40%; font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">&nbsp;</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 40%;">' +
			'<table style="font-family: Arial; font-size: 10px; color: #333;" width="100%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr style="width: 40%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: left;"><br />&nbsp;SUPERFICIE DE CONSTRUCCI&Oacute;N A MODIFICAR mts2 :<br /></td>' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: normal; text-align: center;"><br />'+param.SUPERFICIE_CONSTRUIDA_RUAT+'&nbsp;&nbsp;<br /></td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</td>' +
			'<td style="width: 60%;">' +
			'<table style="font-family: Arial; font-size: 10px; color: #333333; width: 100%;" width="100%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr style="width: 60%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: left; width: 80.8664%;"><br />&nbsp;SUPERFICIE A MODIFICAR m2 :</td>' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: normal; text-align: center; width: 18.4116%;">'+param.SUPERFICIE_A_MODIFICAR+'</td>' +
			'</tr>' +
			'<tr style="width: 60%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: left; width: 80.8664%;">&nbsp;TIPO DE CONSTRUCCI&Oacute;N :</td>' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: normal; text-align: center; width: 18.4116%;">'+param.TIPO_DE_VIVIENDA+'</td>' +
			'</tr>' +
			'<tr style="width: 60%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: left; width: 80.8664%;">&nbsp;TIPOLOGIA DE LA CONSTRUCCI&Oacute;N :</td>' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: normal; text-align: center; width: 18.4116%;">'+param.TIPO_DE_CONSTRUCCION+'</td>' +
			'</tr>' +
			'<tr style="width: 60%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: left; width: 80.8664%;">&nbsp;MONTO DETERMINADO :</td>' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: normal; text-align: center; width: 18.4116%;">'+param.MONTO_DETERMINADO+'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'<table style="font-family: Arial; font-size: 10px; color: #333;" width="80%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr>' +
			'<td style="width: 100%; font-family: Arial; font-size: 15px; color: #666; font-weight: bold; text-align: center;"><br />SUSCRIPCI&Oacute;N DE DDJJ<br /></td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'<table style="font-family: Arial; font-size: 10px; color: #333333; width: 80%;" border="2" width="80%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr>' +
			'<td style="width: 100%; font-family: Arial; font-size: 12px; color: #666;  text-align: center; border: 0mm;" colspan="2"><br />La presente Declaraci&oacute;n Jurada se suscribe conforme a lo establecido en el Articulo 22,78 y 157 de la Ley Nro. 2492. CONFORME Ley Municipal <br />Autionoma N&ordm; 467, Regularizacion De Edificaciones y Adecuacion NORMATIVA Territorial<br /><br />JURO LA EXACTITUD DE LA INFORMACI&Oacute;N DECLARADA EN EL PRESENTE FORMULARIO<br /><br /></td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 100%;">' +
			'<table style="font-family: Arial; font-size: 10px; color: #333;" width="100%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr style="width: 35%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666;  text-align: left;">&nbsp;&nbsp;FIRMA:</td>' +
			'</tr>' +
			'<tr style="width: 35%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666;  text-align: left;">&nbsp;&nbsp;ACLARACI&Oacute;N DE FIRMA :</td>' +
			'</tr>' +
			'<tr style="width: 35%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666;  text-align: left;">&nbsp;&nbsp;C.I. NRO :</td>' +
			'</tr>' +
			'<tr style="width: 35%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666;  text-align: left;">&nbsp;&nbsp;CORREO ELECTRONICO :</td>' +
			'</tr>' +
			'<tr style="width: 35%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666;  text-align: left;">&nbsp;&nbsp;TELEFONO DE CONTACTO :</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</td>' +
			'<td style="width: 68.306%;">' +
			'<table style="font-family: Arial; font-size: 10px; color: #333;" width="100%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr style="width: 65%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
			'</tr>' +
			'<tr style="width: 65%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
			'</tr>' +
			'<tr style="width: 65%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
			'</tr>' +
			'<tr style="width: 65%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
			'</tr>' +
			'<tr style="width: 65%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</center>' ;
			//console.log(printContents1);
            var popupWin = window.open('', '_blank', 'width=800,height=550');
            popupWin.document.open()
            popupWin.document.write('<html><head></head><body onload="window.print()">' + printContents1 + '<br><br></html>');
            popupWin.document.close();  
			},
			/*
			establecerDatosTipoServicioyRegistro:function (idCatastroTipoServicio,idCatastroTipoRegistro) {
				$scope.solicitud.idCatastroTipoServicio = idCatastroTipoServicio; //1	CATASTRO MASIVO, 2	SERVICIO MUNICIPAL,3	CATASTRO EXTERNO
				$scope.solicitud.idCatastroTipoRegistro = idCatastroTipoRegistro; // 1 nuevo, 2 actualizacion

			},*/






			
			//Obsoleto
			seguimientoFlujo : function (sol) {
				$.blockUI();
				if(sol.piif)
				{
					var p = {q: sol.piif};
					$http({
						method: 'POST',
						url: CONFIG.SERVICE_SITOLextgen + 'ApiMotorFlujo/FlujoSeguimientoTarea',
						data: Object.toparams(p),
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function (data, status, headers, config) {
						if(data.res)
						{
							swal('', 'Error al consultar seguimiento de trámite', 'error');
						}
						else{
							$('#seguimientoNroSolicitud').val(sol.idCatastroTramiteOL);
							//$('#seguimientoTipoTramite').val($scope.config.tipoTramite.descripcion);
							$scope.listaSeguimientoTareas = data;
							$('#divPopupSeguimiento').modal('show');
						}
						$.unblockUI();
					}).error(function (data, status, headers, config) {
						swal('', 'Error al consultar seguimiento de trámite', 'error');
						$.unblockUI();
					});
				}
				else
				{
					swal('', 'Error al consultar seguimiento de trámite', 'error');
					console.log("No se puede ver el seguimiento, parámetro no valido");
				}
			},
			seguimientoSitram : function (nro, pwd) {
				console.log(nro, pwd);
				$scope.tmpSitram = nro;
				$scope.tmpSitramPwd = pwd;
				$.blockUI();
				var p = {
					"nroTramite":nro,
					"clave": pwd
				};
				$http({
					method: 'POST',
					//url: 'http://serviciosrs.lapaz.bo/wsSTTF/visualizarTramitesSITRAM',
					//url:'https://gamlpmotores.lapaz.bo/gamlp/wsSTTF/visualizarTramitesSITRAM',
					//url:'http://192.168.5.141:9091/wsSTTF/visualizarTramitesSITRAM',
					url:  CONFIG.CONEXION_API_PG_IF_OFICIAL + 'wsSTTF/visualizarTramitesSITRAM',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					console.log("aaa", data);
					$.unblockUI();
					if(data.success)
					{
						$scope.listaSeguimientoSitram = data.success.data;
						//$('#seguimientoNroSolicitud').val(sol.idCatastroTramiteOL);
						$('#divPopupSeguimiento').modal('show');

					}
					else{
						swal('', 'Error al consultar seguimiento de trámite', 'error');
					}

				}).error(function (data, status, headers, config) {
					swal('', 'Error al consultar seguimiento de trámite', 'error');
					$.unblockUI();
				});
			},
			descargar:function (piif) {
				var params = Object();
				params.idoc = $scope.configParametros.documentoSolicitud.idTipoDocIfile;//195;
				params.q = piif;
				//return $http.post("DocumentoFlujo", JSON.stringify(params), { responseType: 'arraybuffer', headers: {} });

				var promise = $http.post(CONFIG.SERVICE_SITOLextgen + 'Catastro/DocumentoFlujo', JSON.stringify(params), { responseType: 'arraybuffer', headers: {} });
				promise.success(function (response) {
					//console.log("response", response);
					var formato = "pdf";
					var nombreArchivo = "Solicitud.pdf";
					var contentType = "";
					if (formato == 'pdf') {
						contentType = "application/pdf";
					}
					else if (formato == "dwg") {
						contentType = "image/vnd.dwg";
					}
					var file = new Blob([response], { type: formato });
					//console.log("file", file);
					var isChrome = !!window.chrome && !!window.chrome.csi;//!!window.chrome.webstore;
					var isIE = /*cc_on!*/false || !!document.documentMode;
					var isEdge = !isIE && !!window.StyleMedia;
					if (isChrome) {
						var url = window.URL || window.webkitURL;

						var downloadLink = angular.element('<a></a>');
						downloadLink.attr('href', url.createObjectURL(file));
						downloadLink.attr('target', '_self');
						downloadLink.attr('download', nombreArchivo);
						downloadLink[0].click();
					}
					else if (isEdge || isIE) {
						window.navigator.msSaveOrOpenBlob(file, nombreArchivo);

					}
					else {
						var fileURL = URL.createObjectURL(file);
						window.open(fileURL);
					}
				})
					.error(function (error) {
						console.log("error", error);
						$rootScope.notificacionError("Error al descargar archivo");
					});
			},
			
			
			
		}
	}

	$scope.tblSolicitudesExterno = new ngTableParams({
		page: 1,
		count: 10,
		filter: {},
		sorting: {
			fechaRegistro: 'desc'
		}
	}, {
		total: $scope.solicitud.listaExterno.length,
		getData: function($defer, params) {
			var filteredData = params.filter() ? $filter('filter')($scope.solicitud.listaExterno, params.filter()) : $scope.solicitud.listaExterno;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : $scope.solicitud.listaExterno;
			params.total($scope.solicitud.listaExterno.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});


	$scope.tblSolicitudesExternoFormulario402 = new ngTableParams({
		page: 1,
		count: 10,
		filter: {},
		sorting: {
			fechaRegistro: 'desc'
		}
	}, {
		total: $scope.solicitud.listaSolicitudF02.length,
		getData: function($defer, params) {
			var filteredData = params.filter() ? $filter('filter')($scope.solicitud.listaSolicitudF02, params.filter()) : $scope.solicitud.listaSolicitudF02;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : $scope.solicitud.listaSolicitudF02;
			params.total($scope.solicitud.listaSolicitudF02.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});


	$scope.tblSolicitudesNombres = new ngTableParams({
		page: 1,
		count: 10,
		filter: {}		
	}, {
		total: $scope.solicitud.listaNombres.length,
		getData: function($defer, params) {
			var filteredData = params.filter() ? $filter('filter')($scope.solicitud.listaNombres, params.filter()) : $scope.solicitud.listaNombres;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : $scope.solicitud.listaNombres;
			params.total($scope.solicitud.listaNombres.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});

	$scope.inicio = function () {
		
		$scope.servicioTerritorio.seleccionado=null;
		setTimeout(function()
		{
			try{
				//$scope.mapa.acciones.iniciar();
				//$scope.srcTutorial="../Catastro/img/RegistroCatastralNuevoInfograma.png";
				$scope.configParametros.documentoSolicitud.acciones.obtener();
				$scope.configParametros.tasas.acciones.obtener();
				$scope.solicitud.acciones.listarExterno();
				$scope.solicitud.acciones.listarFor402Solitud();
				$scope.solicitud.acciones.establecerDatosSolicitante();
				//$scope.predio.acciones.listar();
				$scope.profesinalExterno.acciones.listar();

				console.log("controlando redireccion de catastro");
				var servicioCatReferer = sessionService.get('servicioCat');
				if(servicioCatReferer){
					console.log("Redireccion desde catastro",servicioCatReferer);
					if(servicioCatReferer == 2){
						$scope.solicitud.acciones.reset();
						$scope.servicioTerritorio.acciones.seleccionar($scope.servicioTerritorio.municipal);
					}
					else if(servicioCatReferer == 3){
						$scope.solicitud.acciones.reset();
						$scope.servicioTerritorio.acciones.seleccionar($scope.servicioTerritorio.externo);
					}
					sessionService.destroy('servicioCat');
				}
				else
				{
					
					$scope.servicioTerritorio.seleccionado=null;
					$scope.servicioTerritorio.acciones.seleccionar($scope.servicioTerritorio.externo);
				}
				
			}catch(e)
			{
				console.log("error", e);
			}
		},500);

		/*
		setTimeout(function()
		{
			try{
				sessionService.destroy('servicioCat');

			}catch(e)
			{
				console.log("error", e);
			}
		},1000);
		*/
	}

	$scope.loading = {
		blockUI: false,
		show:function () {
			$scope.loading.blockUI = true;
		},
		hide:function () {
			$scope.loading.blockUI = false;
		}
	};
	dbg = $scope;



	function getFormattedDate(date) {
		var year = date.getFullYear();

		var month = (1 + date.getMonth()).toString();
		month = month.length > 1 ? month : '0' + month;

		var day = date.getDate().toString();
		day = day.length > 1 ? day : '0' + day;

		return day + '/' + month + '/' + year;
	}

	$scope.profesinalExterno = {
		lista:[],
		filtro:null,
		encontrado:null,
		acciones:{
			listar: function () {
				$scope.profesinalExterno.lista = [];
				var apiSIT = new dataSIT();
				apiSIT.pcListaArquitecto(function(resultado){
					var resApi = JSON.parse(resultado);
					if(resApi.success){
						$scope.profesinalExterno.lista = resApi.success.dataSql;
						var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
						//$scope.tblProfesionalExterno.reload();
					}
					else
					{
						swal('', 'Error al recuperar la data de arquitectos', 'error');
						console.log("Error al recuperar la data de arquitectos",resApi.error.message,resApi.error.code);
					}
				});
			},
			buscarPorNro:function (nro) {
				$scope.solicitud.profesionalNombre=null;
				$scope.solicitud.profesionalEmail=null;
				$scope.solicitud.profesionalTelefono=null;
				$scope.solicitud.profesionalCab=null;
				$scope.profesinalExterno.encontrado = null;
				var encontrado = false;
				angular.forEach($scope.profesinalExterno.lista, function (item) {
					if(item.registroNacionalCAB + '' == nro + ''){
						$scope.profesinalExterno.encontrado = true;
						$scope.solicitud.acciones.establecerDatosProfesional(item.arquitectoNombre,item.registroNacionalCAB,  item.telefonoCelular, item.correoElectronico);
					}
				})
				if($scope.profesinalExterno.encontrado == null){
					$scope.profesinalExterno.encontrado= false;
				}
			},
		}
	}

}
