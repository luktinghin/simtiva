var complex_mode = 0;
var paedi_mode = 0;
var PMA;
var ageunit = "y";
var active_drug_set_index = 0;
var alt_drug_set_index = 1;
var vc;
var d = null; //to store date object
var mass;
var ABW; //for eleveld
var lbm, height, gender;
var ibw, AdjBW;
var useAdjBW = 0;
var bmi;
var conc1;
var conc2;
var conc3;
var drug_sets = new Array();
var drug_name = "Propofol";
var conc_units = "mcg";
var infused_units = "mg";
var k10;
var k12;
var k21;
var k13;
var k31;
var k41;
var l1, l2, l3, l4;
var bolus;
var time = 0;  //time in ms
var time_in_s = 0;
var r = new Array();
var lambda = new Array();
var refresh_interval = 1000; //interval for drug infusions
var inf_rate_mls;
//var inf_rate_mgperkg; //deprecated
var inf_rate_permass;
var inf_rate_permass_factor = 1; //1 for propofol
var inf_rate_permass_unit = "mg/kg/h"; 
var inf_rate_permass_dp = 100; //100 means 2 dp, if need zero dp, set this to 1
var inf_rate_amt;
var infusate_concentration=10;
var delta_volume_infused;
var delta_amount_infused;
var infuse_time;
var prior_infuse_time = -1;
var interval;
var volume_infused = 0;
var pump_rate_in_amt = 0;
var p_coef = new Array();
var e_coef = new Array();
var p_udf = new Array();
var e_udf = new Array();
var delta_seconds = 1; // for p_udf
var p_state = new Array();
var e_state = new Array();
var p_state2 = new Array();
var e_state2 = new Array();
var p_state3 = new Array();
var e_state3 = new Array();
var timeadjust = 0; 
var loop1;
var loop2;
var firstrun = -1;
var result = 0;
var result_e = 0;
var alt_result = 0;
var alt_result_e = 0;
var simspeed =1;
var corX=0; //for chartjs
var corY=0; //for chartjs
var historytext = ""; //for history writing
var modeltext = "&nbsp;"; //for modeldescription
var myChart;
var desired;

var cpt_threshold_auto =1;
var cpt_threshold=0.08;
var cpt_avgfactor=0.667;

var cpt_active = 0;
var cet_active = 0;
var IB_active = 0;
var IB_last_dose = 0;
var IB_last_time = 0;
var IB_next_dose = 0;
var IB_next_time = 0;
var manualmode_active = 0;
var running = 0;
var trial_result = 0;
var trial_result_e = 0;
var cpt_bolus = 0;
var cet_bolus = 0;
var cpt_rates = new Array();
var cpt_rates_real = new Array();
var cpt_times = new Array();
var cpt_cp = new Array();
var cpt_ce = new Array();
var volinf = new Array();

//fentanyl shibutani weight adjusted
//var fentanyl_weightadjusted_factor = 1;
//var fentanyl_weightadjusted_flag = 0;
//var fentanyl_weightadjusted_target_uncorrected = 0;

var cpt_rates_real_PP = new Array();
var cpt_cp_PP = new Array();
var cpt_ce_PP = new Array();

var cpt_interval = 120;//cpt interval 

//for ce targeting
var peak_time, prior_peak_time;
var temp_peak, current, next_time;
var cet_lockdowntime = 0; //this will allow any cet_bolus to exert its full effect before going to new scheme of new target
var cet_priordesired = 0;

var historyarray = new Array();
// this is for current scheme
var historyarrays = new Array();
/* history arrays structure: this is for record keeping of all schemes entered
	[a0,a1,a2,a3,a4,a5]
	where
	a0 = 0:manual, 1:cpt, 2:cet
	a1 = 0:target, 1:bolus, 2:infusion arrays, 3:cetpause, 4:intermittent bolus arrays
	a2 = time in s
	a3 = content
	added a5, a6 below to determine IB mode
	a4 = IB mode active
	a5 = IB swing
structure end */ 
var historydivs = new Array();
var prior = 0; //this is for update -->display-->highlight current inf rate
var next = 999; //this is for update -->display highlighting function when next is near
var preview_bolus;
var preview_rate;
var preview_downtrend;
var previewtimeout;
var user_hide=0; // for warning prompt - NOT hide by default
var timeout2 = null; // for delay display cpt prompt
var optionsarray = new Array();
var optionsarray_infusionunit = new Array();

var PD_mode = 0 ; //PD effect estimtation: 0 is off, 1 is BIS, 2 is PTOL, 3 is NSRI

var alert_vibrate_on = 0;
var alert_sound_on = 0;
var alertinterval_vibrate = null; //for alert api use - it is a setinterval function
var alertinterval_sound = null; //for alert api use - it is a setinterval function
var alert_sound_object = new sound("beep.mp3");
var alert_sound_object2 = new sound("beep-2.mp3");
var historytexts = new Array();
var chartprofile = 0;

var arrPOINTERS = new Array();
var arrTEMP = new Array();

var IB_swing = 0.05; //this is intermittent bolus swing

var PP_mode;
var PP_tickertime;
var PP_interval=180;
var PP_start = 0;
var PP_next = PP_interval;
var PP_temp_bolus_store = 0;
var PP_temp_bolustime_store = 0;
var ticker_active = 0;

var notificationallowed = 0;
var notificationactive = 0;

var UI_borderon = 0;
var UI_infrateon = 0;

var manageFileListState = 0;

var modal = undefined;

var prior_half_minute_clock = 0;

var time_of_stop = -1;

window.ptolcouplesarray = []; //ptol couples over time
//var ptol0overtime = new Array(); //ptol chart data for 0 over time, series based on chart data
//var ptol1overtime = new Array(); //ptol chart data for 1 over time

var loop6 = null; //this is setinterval function
var loop7 = null;

window.BIS_array = [];
window.eventArray = [];

const arrBodyIcons = [
	["baby","<i class='fas fa-baby fa-fw tooltip bodyicon'><span class='tooltiptext'>BMI-for-age reference range from WHO</span></i>"],
	["child","<i class='fas fa-child fa-fw tooltip bodyicon'><span class='tooltiptext'>BMI-for-age & weight-for-age reference range from WHO</span></i>"],
	["male","<i class='fas fa-male fa-fw tooltip bodyicon'><span class='tooltiptext'>BMI reference range from WHO</span></i>"],
	["female","<i class='fas fa-female fa-fw tooltip bodyicon'><span class='tooltiptext'>BMI reference range from WHO</span></i>"]
]

// variables for loading and saving
var uid;
//for local storage: data structure
//UID + "DATA" - target data
//UID + "PATIENT" - demographic and model
//UID + "TIME" - frequently changing time variable

var selected_uid;

var texttimeout = null;
// start service worker code

var parseloading = 0; //suppress function calls during parseobject loading when equals 1

var popupon = false;
var emulateOn = false;

var isDark = false;
var timeoutptol = null;
var chartviewarray = [0,30,10];
var ringbell2active = 0;
var ringbell2timeout = null;
var alert_sound_2 = null;
var alert_vibrate_2 = null;
var updateBIS = null;
var timeoutVal = null;
var ringtimeout = null;
var ringactive = 0;
var inputname = "";
var importDataArray = new Array();
var canvasUpdateInterval = null;
var textheight = 0;
var newCanvas = document.createElement('canvas');
var newCanvasReady = 0;
var popupchart;
var boxesArray = new Array();
var suitableForBoxes = false;
var isFullscreen = false;
var popupUpdateInterval;
var numpadValue = 0;
var numpadOrig;
var opioid = 1; //arbitrary default opioid = 1 for eleveld. to be re-set to 0 or 1 at first input screen

var collapsibles = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < collapsibles.length; i++) {
  collapsibles[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
  if (collapsibles[i].classList.contains("active")) {
    collapsibles[i].nextElementSibling.style.display = "block";
  }
}

var collapsiblecards = document.getElementsByClassName("collapsiblecard");

for (i=0; i<collapsiblecards.length; i++) {
	collapsiblecards[i].nextElementSibling.style.display = "none";
	collapsiblecards[i].nextElementSibling.classList.add("collapsed");
	collapsiblecards[i].addEventListener("click", function() {
		toggleCard(this);
	});
}

function toggleCard(x) {
	var content = x.nextElementSibling;
	x.classList.toggle("active");
    if (content.style.display === "block") {
      content.style.display = "none";
      //content.classList.add("collapsed");
      content.classList.remove("animate");
    } else {
      content.style.display = "block";
      content.classList.add("animate");
    }
}

var tops = document.getElementsByClassName("top_title_box");

for (i=0; i<tops.length; i++) {
	tops[i].addEventListener("click", function() {
		window.scrollTo(0,0);
	})
}


//global colors / charting script initiation


		//band colors from column 200 of material design 1-10 hues, for myChart2
		var bandColor0 = 'rgb(239,154,154,0.2)';//red
		var bandColor1 = 'rgb(244,143,177,0.2)';//pink
		var bandColor2 = 'rgb(206,147,216,0.2)';//purple
		var bandColor3 = 'rgb(179,157,219,0.2)';
		var bandColor4 = 'rgb(159,168,218,0.2)';
		var bandColor5 = 'rgb(144,202,249,0.2)';
		var bandColor6 = 'rgb(129,212,250,0.2)';
		var bandColor7 = 'rgb(128,222,234,0.2)';
		var bandColor8 = 'rgb(128,203,196,0.2)';
		var bandColor9 = 'rgb(165,214,167,0.2)';
		var bandColor10 = 'rgb(197,225,165,0.2)';
		var bandColor11 = 'rgb(230,238,156,0.2)';//lime
		var bandColor12 = 'rgb(255,245,157,0.2)';//yellow
		var bandColor13 = 'rgb(255,224,130,0.2)';//amber
		var bandColor14= 'rgb(255,204,128,0.2)'//orange

		var dotColor0 = 'rgb(158,158,158,1)';
		var dotColor1 = 'rgb(117,117,117,1)';
		var dotColor2 = 'rgb(97,97,97,1)';
		var dotColor3 = 'rgb(66,66,66,1)';
		var dotColor4 = 'rgb(33,33,33,1)';
		var dotColor5 = 'rgb(66,66,66,1)';
		var dotColor6 = 'rgb(97,97,97,1)';
		var dotColor7 = 'rgb(117,117,117,1)';
		var dotColor8 = 'rgb(158,158,158,1)';

		var dotColor0dark = 'rgb(185,185,185,0.7)';
		var dotColor1dark = 'rgb(200,200,200,0.8)';
		var dotColor2dark = 'rgb(215,215,215,0.8)';
		var dotColor3dark = 'rgb(230,230,230,0.8)';
		var dotColor4dark = 'rgb(245,245,245,1)';
		var dotColor5dark = 'rgb(230,230,230,0.8)';
		var dotColor6dark = 'rgb(215,215,215,0.8)';
		var dotColor7dark = 'rgb(200,200,200,0.8)';
		var dotColor8dark = 'rgb(185,185,185,0.7)';

		/*
		const dotColor0 = 'rgb(0,96,100,1)'//cyan
		const dotColor1 = 'rgb(1,87,155,1)'; // lightblue
		const dotColor2 = 'rgb(26,35,126,1)'; //indigo
		const dotColor3 = 'rgb(74,20,140,1)'; //purple
		const dotColor4 = 'rgb(183,28,28,1)';//red
		const dotColor5 = 'rgb(230,81,0,1)';//orange
		const dotColor6 = 'rgb(245,127,23,1)';//yellow
		const dotColor7 = 'rgb(51,105,30,1)';//lightgreen
		const dotColor8 = 'rgb(0,77,64,1)';//teal
		*/

		//line colors from blue-grey row
		var lineColor0 = 'rgba(84,110,122,0.75)';
		var lineColor1 = 'rgba(120,144,156,1)';
		var lineColor1dark = 'rgba(210,235,250,1)';

		var yellowPri = 'rgba(251,192,45,1)';
		var yellowPri50 = 'rgba(251,192,45,0.58)';
		var yellowPri10 = 'rgba(251,192,45,0.1)';
		var yellowPri70 = 'rgba(251,192,45,0.7)';
		var yellowPri30 = 'rgba(251,192,45,0.3)';
		var yellowLight = 'rgba(255,242,99,1)';
		var yellowLight10 = 'rgba(255,242,99,0.1)';
		var yellowLight70 = 'rgba(255,242,99,0.7)';
		var yellowDark = 'rgba(196,144,0,1)';
		var yellowSec = 'rgba(255,202,40,1)';
		var yellowSec10 = 'rgba(255,202,40,0.11)';
		var yellowSecLight = 'rgba(255,253,97,1)';
		var yellowSecDark = 'rgba(199,154,0,1)';
		var orangeShadeLight = 'rgba(255,204,128,0.2)';
		var orangeShadeDark = 'rgba(255,152,0,0.2)';

		var bluePri = 'rgba(21,101,192,1)';
		var bluePri50 = 'rgba(21,101,192,0.5)';
		var blueLight = 'rgba(94,146,243,1)';
		var blueLight10 = 'rgba(94,146,243,0.1)';
		var blueLight70 = 'rgba(94,146,243,0.7)';
		var blueLight50 = 'rgba(94,146,243,0.58)';
		var blueDark = 'rgba(0,60,143,1)';
		var blueSec = 'rgba(3,169,244,1)';
		var blueSec10 = 'rgba(3,169,244,0.11)';
		var blueSecLight = 'rgba(103,218,255,1)';
		var blueSecDark = 'rgba(0,122,193,1)';
		var blueShadeDark = 'rgba(3,169,244,0.2)';

		var greenShade = 'rgba(102, 177, 105, 0.25)';
		var greenShadeDark = 'rgba(102, 177, 105, 0.35)';




	function getGradientRed(ctx, chartArea, scales) {
		
		const gradientBgRed = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
		var position = (scales.x.getPixelForValue(time_in_s/60) - scales.x.getPixelForValue(scales.x.min)) / chartArea.width;
		if (position<=0) position = 0;
		if (position>=1) position = 1;
		gradientBgRed.addColorStop(0, 'rgba(231,50,39,0.4)');
		gradientBgRed.addColorStop(position, 'rgba(231,50,39,0.4)');
		gradientBgRed.addColorStop(position, 'rgba(231,50,39,0.1');
		gradientBgRed.addColorStop(1, 'rgba(231,50,39,0.1)');
		return gradientBgRed;
		
	}

	function getGradientYellow(ctx, chartArea, scales) {

		const gradientBgYellow = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
		var position = (scales.x.getPixelForValue(time_in_s/60) - scales.x.getPixelForValue(scales.x.min)) / chartArea.width;
		if (position<=0) position = 0;
		if (position>=1) position = 1;
		gradientBgYellow.addColorStop(0, 'rgba(251,192,45,0.58)');
		gradientBgYellow.addColorStop(position, 'rgba(251,192,45,0.58)');
		gradientBgYellow.addColorStop(position, 'rgba(255,202,40,0.11)');
		gradientBgYellow.addColorStop(1, 'rgba(255,202,40,0.11)');
		return gradientBgYellow;

	}

	function getGradientBlue(ctx, chartArea, scales) {

		const gradientBgBlue = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
		var position = (scales.x.getPixelForValue(time_in_s/60) - scales.x.getPixelForValue(scales.x.min)) / chartArea.width;
		if (position<=0) position = 0;
		if (position>=1) position = 1;
		gradientBgBlue.addColorStop(0, 'rgba(94,146,243,0.58)');
		gradientBgBlue.addColorStop(position, 'rgba(94,146,243,0.58)');
		gradientBgBlue.addColorStop(position, 'rgba(3,169,244,0.11)');
		gradientBgBlue.addColorStop(1, 'rgba(3,169,244,0.11)');
		return gradientBgBlue;

	}

	function getGradientGreen(ctx, chartArea, scales) {
		
		const gradientBgGreen = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
		var position = (scales.x.getPixelForValue(time_in_s/60) - scales.x.getPixelForValue(scales.x.min)) / chartArea.width;
		if (position<=0) position = 0;
		if (position>=1) position = 1;
		gradientBgGreen.addColorStop(0, 'rgba(9,203,93,0.7)');
		gradientBgGreen.addColorStop(position, 'rgba(9,203,93,0.7)');
		gradientBgGreen.addColorStop(position, 'rgba(9,203,93,0.1');
		gradientBgGreen.addColorStop(1, 'rgba(9,203,93,0.1)');
		return gradientBgGreen;
		
	}

//dark mode activation
	
	if (localStorage.getItem("colourMode") == "dark") {
		isDark = true;
		var metaThemeColor = document.querySelector("meta[name=theme-color]");
		metaThemeColor.setAttribute("content", "#000");
		document.body.classList.add("dark");
		document.getElementById("darkmodebutton").innerHTML = "<i class='fas fa-adjust fa-fw'></i>";
	}


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceworker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

window.addEventListener("resize", function() {
	setTimeout(alignEvents,600);
	setTimeout(alignPtolLabels,600);
});

screen.orientation.addEventListener("change", (event) => {
	setTimeout(updatechartview2,500); //workaround for chartjs background problem
})

//for tooltip destruction on touchend for mobile devices
document.addEventListener('touchend', function(event) {
    if (event.target && event.target.tagName.toLowerCase() !== "canvas") {
    	if (popupon) {
    		popupchart.canvas.dispatchEvent(new Event("mouseout"));
    	} else {
    		if (myChart != undefined) {
    			myChart.canvas.dispatchEvent(new Event("mouseout"));		
    		}
    	}
      if (emulateOn) {
      	myChartEmulate.canvas.dispatchEvent(new Event("mouseout"));		
      } 
    }
})


function init() {
	setmodal("modalInitial");	
}
function initsubmit() {
	//the validation function on clicking "proceed" on starting page 1
	//new, arbitrarily set zero
	let validateText = "";
	drug_sets_index=0;
	simspeed=1;
	//initiate parameters;
	mass = document.getElementById("inputBW").value *1; 
	height = document.getElementById("inputBH").value*1;
	if (paedi_mode==0) {
		age = document.getElementById("inputAge").value*1;
		ElModel = document.getElementById("select_model");
		document.getElementById("ptoltooltip").style.display = "none";
	} else {
		document.getElementById("ptoltooltip").style.display = "inline-block";
		ageunit = document.getElementById("select_age_unit").value;
		if (ageunit == "d") {
			age = document.getElementById("inputAgePaedi").value*1 / 365;
		} else if (ageunit == "w") {
			age = document.getElementById("inputAgePaedi").value*1 / 52;
		} else if (ageunit == "m") {
			age = document.getElementById("inputAgePaedi").value*1 / 12;
		} else if (ageunit == "y") {
			age = document.getElementById("inputAgePaedi").value*1;
		}
		ElModel = document.getElementById("select_model_paedi");
	}
	
	if (document.getElementById("select_gender").value === "Male") {
		gender = 0;
	} else {
		gender = 1;
	}
	if (height>0) {
		document.getElementById("bh").innerHTML = height + "cm";
		if (gender == 0) 
			{lbm = 1.1 * mass - 128 * (mass/height) * (mass/height);}
		else
			{lbm = 1.07 * mass - 148 * (mass/height) * (mass/height);}
	} else {
		document.getElementById("bh").innerHTML = "?";
	}
	if (paedi_mode == 0) {
		if (age>=0) {
			document.getElementById("age").innerHTML = age + "y";
		} else {
			document.getElementById("age").innerHTML = "?";
		}
	} else {
		document.getElementById("age").innerHTML = document.getElementById("inputAgePaedi").value + ageunit;
		if (document.getElementById("inputPMA").value*1>0) {
			document.getElementById("age").innerHTML = document.getElementById("age").innerHTML +
				" (PMA: " + document.getElementById("inputPMA").value + "w)";
		}
	}
	//display elements
	document.getElementById("bw").innerHTML = mass + "kg";
	document.getElementById("gender").innerHTML = document.getElementById("select_gender").value;


	//off chart legend
	myChart.legend.options.display = false;
	
	if (ElModel.value === "Complex") {

		complex_mode = 1;
		opioid = 1;
		//interface change

		document.getElementById("complexmodeselection0").style.display = "block";
		document.getElementById("complexmodeselection1").style.display = "block";
		document.getElementById("complexbuttons").style.display = "block";

		document.getElementById("page2title").innerHTML = "Complex Mode Setup";
		document.getElementById("modalScreen2").style.paddingTop = "5vw";
		document.getElementById("modalScreen2content").style.width = "90vw";
		document.getElementById("simplemodeselection").style.display = "none";

		if (age<0 || age>=100) {
			validateText = validateText.concat("Invalid age (accepted range >0 to <100y)" + "<br>");
			document.getElementById("inputAge").value = "";
		}
		if (mass<=0 || mass>=200) {
			validateText = validateText.concat("Invalid body weight (accepted range >0 to <200kg)" + "<br>");
			document.getElementById("inputBW").value = "";
		}

		//change model selection options according to paedimode
		if (paedi_mode == 0) {
			
			document.getElementById("model_propofol").options[0].disabled = false; 
			document.getElementById("model_propofol").options[1].disabled = false;
			
			document.getElementById("model_opioid").options[0].disabled = false;
			document.getElementById("model_opioid").options[2].disabled = false;
			
			document.getElementById("model_opioid").value = "Minto";
		} else {
			//off marsh, schnider
			document.getElementById("model_propofol").options[0].disabled = true; 
			document.getElementById("model_propofol").options[1].disabled = true;
			//off minto, shafer, alfen
			document.getElementById("model_opioid").options[0].disabled = true;
			document.getElementById("model_opioid").options[2].disabled = true;
			document.getElementById("model_opioid").options[3].disabled = true;
			//set eleveld remi default
			document.getElementById("model_opioid").value = "Eleveld-Remifentanil";
		}

			myChart.options.scales.y.title.text = "Concentration (mcg/ml)";

		//on complex interface displays
		document.getElementById("ptolcard").style.display = "flex";
		document.getElementById("ptolcardoptions").style.display = "block";
		document.getElementById("interactionscontainer").style.display = "block";
	} else {

		complex_mode = 0;

		//off complex interface displays
		document.getElementById("ptolcard").style.display = "none";
		document.getElementById("ptolcardoptions").style.display = "none";
		document.getElementById("interactionscontainer").style.display = "none";
		document.getElementById("ptolcard_switch").style.display = "none";

		//interface change
		document.getElementById("complexmodeselection0").style.display = "none";
		document.getElementById("complexmodeselection1").style.display = "none";
		document.getElementById("complexbuttons").style.display = "none";

		if (ElModel.value == "Eleveld") {
			if (document.getElementById("select_eleveldopioid").value == "1") {opioid = 1} else {opioid = 0};
		}
		readmodel(ElModel.value,0);
		//infusate_concentration goes here
		drug_sets[0].infusate_concentration = 10; //defaults 10 for propofol



		//see if need to display emulation eleveld
		if (((drug_sets[0].model_name == "Marsh") || (drug_sets[0].model_name == "Schnider")) && (height>0)) {
			document.getElementById("emulatecard").style.display = "block";
		} else {
			document.getElementById("emulatecard").style.display = "none";
		}

		if ((paedi_mode == 0 && document.getElementById("select_model").value == "Eleveld") || (paedi_mode == 1 && document.getElementById("select_model_paedi").value == "Eleveld")) {
			PD_mode = 1;
			document.getElementById("chartoverlayoptionscontent").classList.add("PDoptions");
			document.getElementById("select_effect_measure").value = "bis";
			document.getElementById("select_effect_measure").disabled = true;
			BIS40 = BIS_Ce_for_BIS(40);
			BIS60 = BIS_Ce_for_BIS(60);
			myChart.data.datasets[11].data = [{x:0, y:BIS60},{x:21600, y:BIS60}];
			myChart.data.datasets[10].data = [{x:0, y:BIS40},{x:21600, y:BIS40}];
			myChart.data.datasets[10].backgroundColor = yellowPri30;
			myChart.data.datasets[10].borderColor = yellowPri50;
			myChart.data.datasets[11].borderColor = yellowPri50;
			myChart.data.datasets[10].hidden = false;
			myChart.data.datasets[11].hidden = false;
			document.getElementById("ptolcard").style.display = "flex";
			document.getElementById("ptoltitle").innerHTML = "eBIS";
			document.getElementById("ptoldesc").innerHTML = "Estimated BIS from Eleveld PD model";
			myChart.update();
		} else {
			myChart.data.datasets[10].hidden = true;
			myChart.data.datasets[11].hidden = true;
			myChart.update();
		}

		document.getElementById("modalScreen2").style.paddingTop = "";
		document.getElementById("modalScreen2content").style.width = "";
		document.getElementById("simplemodeselection").style.display = "";
		if (paedi_mode == 0) {
			if ((document.getElementById("select_model").value === "Minto") || (document.getElementById("select_model").value === "Eleveld-Remifentanil")) {
				if (document.getElementById("select_remidilution").value == "custom") {
					drug_sets[0].infusate_concentration = document.getElementById("remidilution").innerHTML *1;
				} else {
					drug_sets[0].infusate_concentration = document.getElementById("select_remidilution").value * 1;
				}
	  	}
	  } else {
			if (document.getElementById("select_model_paedi").value === "Eleveld-Remifentanil") {
				if (document.getElementById("select_remidilution").value == "custom") {
					drug_sets[0].infusate_concentration = document.getElementById("remidilution").innerHTML *1;
				} else {
					drug_sets[0].infusate_concentration = document.getElementById("select_remidilution").value * 1;
				}
	  	}
	  }


		if ((paedi_mode == 0) && (document.getElementById("select_model").value === "Shafer")) {
			if (document.getElementById("select_fendilution").value == "custom") {
				drug_sets[0].infusate_concentration = document.getElementById("fendilution").innerHTML *1;
			} else {
				drug_sets[0].infusate_concentration = document.getElementById("select_fendilution").value * 1;
			}
			if (select_fen_weightadjusted.value == "0") {
				drug_sets[0].modeltext = `
				Shafer (no coparameters) (Anesthesiology 1990;73(6):1091-1102) <br>
				vc = ${drug_sets[0].vc} <br>
				v2 = 28.1 <br>
				v3 = 228 <br>
				k10 = ${drug_sets[0].k10} <br>
				k12 = ${drug_sets[0].k12} <br>
				k13 = ${drug_sets[0].k13} <br>
				k21 = ${drug_sets[0].k21} <br>
				k31 = ${drug_sets[0].k31} <br>
				ke0 = ${drug_sets[0].k41} <br>
				ke0 derived from t1/2ke0 of 6.6min (Scott & Stanski, Anesthesiology 1991;74:34042)
				`;
	  		drug_sets[0].fentanyl_weightadjusted_flag = 0;
	  	} else {
				drug_sets[0].modeltext = `
				Shafer (Anesthesiology 1990;73(6):1091-1102) <br>
				PK model adjusted for body weight using formulas by Shibutani (Anesthesiology 2004;101:603-13) <br>
				vc = ${drug_sets[0].vc} <br>
				v2 = 28.1 <br>
				v3 = 228 <br>
				k10 = ${drug_sets[0].k10} <br>
				k12 = ${drug_sets[0].k12} <br>
				k13 = ${drug_sets[0].k13} <br>
				k21 = ${drug_sets[0].k21} <br>
				k31 = ${drug_sets[0].k31} <br>
				ke0 = ${drug_sets[0].k41} <br>
				ke0 derived from t1/2ke0 of 6.6min (Scott & Stanski, Anesthesiology 1991;74:34042)
				`;
	  		drug_sets[0].fentanyl_weightadjusted_factor = (1+(196.4*Math.exp(-0.025*mass)-53.66)/100);
	  		drug_sets[0].fentanyl_weightadjusted_flag = 1;
	  	}
	  	document.getElementById("modeldescription").innerHTML = drug_sets[0].modeltext;
	  }

		if ((paedi_mode ==0) && (document.getElementById("select_model").value == "Maitre")) {
			if (document.getElementById("select_alfendilution").value == "custom") {
				drug_sets[0].infusate_concentration = document.getElementById("alfendilution").innerHTML *1;
			} else {
				drug_sets[0].infusate_concentration = document.getElementById("select_alfendilution").value * 1;
			}
			document.querySelector("#bolus3>.bolus_inside").innerHTML = "300" + "<span class='infused_units'></span>";
			document.querySelector("#bolus3").setAttribute("onclick","bolusadmin(300,0)");
			document.querySelector("#bolus2>.bolus_inside").innerHTML = "200" + "<span class='infused_units'></span>";
			document.querySelector("#bolus2").setAttribute("onclick","bolusadmin(200,0)");
			document.querySelector("#bolus1>.bolus_inside").innerHTML = "100" + "<span class='infused_units'></span>";
			document.querySelector("#bolus1").setAttribute("onclick","bolusadmin(100,0)");
		}

	  if (paedi_mode == 0) {
			if ((document.getElementById("select_model").value === "Minto") || (document.getElementById("select_model").value === "Eleveld-Remifentanil")) {
	  		document.getElementById("drugname").innerHTML = "Remifentanil <span style='opacity:0.5'>(" + drug_sets[drug_sets_index].infusate_concentration + "mcg/ml)</span>";
	  		document.getElementById("card_retrospective").style.display = "none";
	  		document.getElementById("card_wakeup").style.display = "none";
	  	}
	  } else {
			if (document.getElementById("select_model_paedi").value === "Eleveld-Remifentanil") {
	  		document.getElementById("drugname").innerHTML = "Remifentanil <span style='opacity:0.5'>(" + drug_sets[drug_sets_index].infusate_concentration + "mcg/ml)</span>";
	  		document.getElementById("card_retrospective").style.display = "none";
	  		document.getElementById("card_wakeup").style.display = "none";
	  	}
	  }

		if ((paedi_mode == 0) && (document.getElementById("select_model").value === "Shafer"))  {
	  	document.getElementById("drugname").innerHTML = "Fentanyl <span style='opacity:0.5'>(" + drug_sets[drug_sets_index].infusate_concentration + "mcg/ml)</span>";

	  	document.getElementById("card_retrospective").style.display = "none";
	  	document.getElementById("card_wakeup").style.display = "none";
	  }

		if ((paedi_mode == 0) && (document.getElementById("select_model").value === "Maitre"))  {
	  	document.getElementById("drugname").innerHTML = "Alfentanil <span style='opacity:0.5'>(" + drug_sets[drug_sets_index].infusate_concentration + "mcg/ml)</span>";

	  	document.getElementById("card_retrospective").style.display = "none";
	  	document.getElementById("card_wakeup").style.display = "none";
	  }

		var conc_units_fields = document.getElementsByClassName("conc_units");
		for (i=0; i<conc_units_fields.length; i++) {
			conc_units_fields[i].innerHTML = drug_sets[drug_sets_index].conc_units;
		}
		var infused_units_fields = document.getElementsByClassName("infused_units");
		for (i=0; i<infused_units_fields.length; i++) {
			infused_units_fields[i].innerHTML = drug_sets[drug_sets_index].infused_units;
		}

		if (drug_sets[0].drug_name == "Propofol") {
			myChart.options.scales.y.title.text = "Concentration (mcg/ml)";
		} else {
			myChart.options.scales.y.title.text = "Concentration (ng/ml)";
		}
		
		if (age<0 || age>=100) {
			validateText = validateText.concat("Invalid age (accepted range >0 to <100y)" + "<br>");
			document.getElementById("inputAge").value = "";
		}
		if (mass<=0 || mass>=200) {
			validateText = validateText.concat("Invalid body weight (accepted range >0 to <200kg)" + "<br>");
			document.getElementById("inputBW").value = "";
		}
		if ((height<=0 || height>=250) && (ElModel.value=="Schnider" || ElModel.value=="Eleveld")) {
			validateText = validateText.concat("Invalid body height (accepted range >0 to <250cm)" + "<br>");
			document.getElementById("inputBH").value = "";
		}
		if (age<12 && (ElModel.value=="Marsh" || ElModel.value=="Schnider" || ElModel.value=="Minto" || ElModel.value=="Shafer" || ElModel.value=="Maitre")) {
			validateText = validateText.concat("Invalid model: not suitable for children." + "<br>");
		}
		if (mass>=80 && ElModel.value=="Shafer") {
			if (select_fen_weightadjusted.value == "0") {
				validateText = validateText.concat("Warning: Original Shafer model not adjusted to body weight and not recommended for obese. Please select Weight Adjusted model." + "<br>");
			}
		}
		if (age>15 && ElModel.value=="Paedfusor") {
			validateText = validateText.concat("Invalid model: Paedfusor not suitable for adults." + "<br>");
		}

		if (document.getElementById("select_remidilution").value == "custom") {
			temp = document.getElementById("remidilution").innerHTML * 1 ;
			if (temp > 100 || temp < 0.1) {
				validateText = validateText.concat("Invalid remifentanil dilution: must be within 0.1-100mcg/ml" + "<br>");
				document.getElementById("select_remidilution").value = "20";
				document.getElementById("custom_remidilution").style.display = "none";
			}
		}
		if (document.getElementById("select_fendilution").value == "custom") {
			temp = document.getElementById("fendilution").innerHTML * 1 ;
			if (temp > 100 || temp < 0.1) {
				validateText = validateText.concat("Invalid fentanyl dilution: must be within 0.1-100mcg/ml" + "<br>");
				document.getElementById("select_fendilution").value = "10";
				document.getElementById("custom_fendilution").style.display = "none";
			}			
		}
		if (document.getElementById("select_alfendilution").value == "custom") {
			temp = document.getElementById("alfendilution").innerHTML * 1 ;
			if (temp > 500 || temp < 0.1) {
				validateText = validateText.concat("Invalid fentanyl dilution: must be within 0.1-500mcg/ml" + "<br>");
				document.getElementById("select_alfendilution").value = "100";
				document.getElementById("custom_alfendilution").style.display = "none";
			}			
		}

		
		var x = drug_sets[drug_sets_index].drug_name + " (" + ElModel.value + ")";
		document.getElementById("page2title").innerHTML = x;
		if ((ElModel.value == "Shafer") && (drug_sets[0].fentanyl_weightadjusted_flag == 1)) document.getElementById("page2title").innerHTML = "Fentanyl (Shafer: Weight adjusted)";
	}
	

	if (validateText != "") {
		displayWarning("Invalid input",validateText);
		return 1; //1=error
	} else {
		return 0; //0=proceed
	}
}
function initcpt() {
	document.getElementById("card_infusion0").style.display = "none";
	document.getElementById("card_cet0").style.display = "none";
	document.getElementById("card_cet0_new").style.display = "none";
	document.getElementById("btn_displayhistory").innerHTML = "Scheme";
	
	document.getElementById("status").innerHTML="Waiting to start";

		drug_sets_index = 0;
		drug_sets[drug_sets_index].cpt_active = 0.5;
		drug_sets[drug_sets_index].firstrun = -1;
		calculate_udfs(drug_sets_index);  

		drug_sets[drug_sets_index].p_state = new Array();
		drug_sets[drug_sets_index].e_state = new Array();

			// initialize params
			drug_sets[drug_sets_index].cpt_rates = new Array();
			drug_sets[drug_sets_index].cpt_times = new Array();
			drug_sets[drug_sets_index].cpt_cp = new Array();
			drug_sets[drug_sets_index].cpt_ce = new Array();
			drug_sets[drug_sets_index].cpt_rates_real = new Array();
			drug_sets[drug_sets_index].volinf = new Array();
			drug_sets[drug_sets_index].historyarray = new Array();
			drug_sets[drug_sets_index].historyarrays = new Array();
			drug_sets[drug_sets_index].historytexts = new Array();
			drug_sets[drug_sets_index].cpt_bolus = 0;
			drug_sets[drug_sets_index].cet_bolus = 0;
			drug_sets[drug_sets_index].cpt_pause = 0;

		p_state[1] = 0;
		p_state[2] = 0;
		p_state[3] = 0;
		e_state[1] = 0;
		e_state[2] = 0;
		e_state[3] = 0;
		e_state[4] = 0;
		//l1 = Math.exp(-lambda[1] ); 
		//l2 = Math.exp(-lambda[2] );
		//l3 = Math.exp(-lambda[3] );
		//l4 = Math.exp(-lambda[4] );

		
}
function initcet() {
	document.getElementById("card_infusion0").style.display = "none";
	document.getElementById("card_cpt0").style.display = "none";
	document.getElementById("card_cet0").style.display = "none";
	document.getElementById("btn_displayhistory").innerHTML = "Scheme";
	document.getElementById("status").innerHTML="Waiting to start";

	//moved from start_cpt
		//set drug_sets_index to zero
		active_drug_set_index = 0;
		drug_sets[active_drug_set_index].cpt_active = 0;
		drug_sets[active_drug_set_index].cet_active = 0.5;
		drug_sets[active_drug_set_index].IB_active = 0;
		drug_sets[active_drug_set_index].firstrun = -1;
		calculate_udfs(active_drug_set_index);  


			drug_sets[active_drug_set_index].cpt_rates = new Array();
			drug_sets[active_drug_set_index].cpt_times = new Array();
			drug_sets[active_drug_set_index].cpt_cp = new Array();
			drug_sets[active_drug_set_index].cpt_ce = new Array();
			drug_sets[active_drug_set_index].cpt_rates_real = new Array();
			drug_sets[active_drug_set_index].volinf = new Array();
			drug_sets[active_drug_set_index].historyarray = new Array();
			drug_sets[active_drug_set_index].historyarrays = new Array();
			drug_sets[active_drug_set_index].historytexts = new Array();
			drug_sets[active_drug_set_index].cpt_bolus = 0;
			drug_sets[active_drug_set_index].cet_bolus = 0;
			drug_sets[active_drug_set_index].cpt_pause = 0;
			drug_sets[active_drug_set_index].cet_pause = 0;
			drug_sets[active_drug_set_index].cet_lockdowntime = 0;
			drug_sets[active_drug_set_index].p_state = new Array();
			drug_sets[active_drug_set_index].e_state = new Array();

		p_state[1] = 0;
		p_state[2] = 0;
		p_state[3] = 0;
		e_state[1] = 0;
		e_state[2] = 0;
		e_state[3] = 0;
		e_state[4] = 0;
		/*?can remove -> used for bolus admin stuff
		l1 = Math.exp(-lambda[1] ); 
		l2 = Math.exp(-lambda[2] );
		l3 = Math.exp(-lambda[3] );
		l4 = Math.exp(-lambda[4] );
		*/
		
}

function initcet_complex(drug_sets_index) {
	document.getElementById("card_cet" + drug_sets_index + "_new").style.display = "";
	document.getElementById("card_cet" + drug_sets_index + "_new").classList.add("hide");
	document.getElementById("card_infusion" + drug_sets_index).style.display = "none";
	document.getElementById("card_cpt" + drug_sets_index).style.display = "none";
	document.getElementById("card_cet" + drug_sets_index).style.display = "none";
	document.getElementById("btn_displayhistory").innerHTML = "Scheme";
	
	document.getElementById("status").innerHTML="Waiting to start";

		drug_sets[drug_sets_index].cet_active = 0.5;
		drug_sets[drug_sets_index].firstrun = -1;
		drug_sets[drug_sets_index].IB_active = 0;
		calculate_udfs(drug_sets_index);  

			// initialize params
			drug_sets[drug_sets_index].cpt_rates = new Array();
			drug_sets[drug_sets_index].cpt_times = new Array();
			drug_sets[drug_sets_index].cpt_cp = new Array();
			drug_sets[drug_sets_index].cpt_ce = new Array();
			drug_sets[drug_sets_index].cpt_rates_real = new Array();
			drug_sets[drug_sets_index].volinf = new Array();
			drug_sets[drug_sets_index].historyarray = new Array();
			drug_sets[drug_sets_index].historyarrays = new Array();
			drug_sets[drug_sets_index].historytexts = new Array();
			drug_sets[drug_sets_index].cpt_bolus = 0;
			drug_sets[drug_sets_index].cet_bolus = 0;
			drug_sets[drug_sets_index].cpt_pause = 0;
			drug_sets[drug_sets_index].cet_pause = 0;
			drug_sets[drug_sets_index].cet_lockdowntime = 0;
		drug_sets[drug_sets_index].p_state = new Array();
		drug_sets[drug_sets_index].e_state = new Array();

		p_state[1] = 0;
		p_state[2] = 0;
		p_state[3] = 0;
		e_state[1] = 0;
		e_state[2] = 0;
		e_state[3] = 0;
		e_state[4] = 0;
}

function initcpt_complex(drug_sets_index) {
	document.getElementById("card_cpt" + drug_sets_index).style.display = "";
	document.getElementById("card_cpt" + drug_sets_index).classList.add("hide");
	document.getElementById("card_infusion" + drug_sets_index).style.display = "none";
	document.getElementById("card_cet" + drug_sets_index).style.display = "none";
	document.getElementById("card_cet" + drug_sets_index + "_new").style.display = "none";
	document.getElementById("btn_displayhistory").innerHTML = "Scheme";
	
	document.getElementById("status").innerHTML="Waiting to start";

		drug_sets[drug_sets_index].cpt_active = 0.5;
		drug_sets[drug_sets_index].firstrun = -1;
		
		calculate_udfs(drug_sets_index);  

			// initialize params
			drug_sets[drug_sets_index].cpt_rates = new Array();
			drug_sets[drug_sets_index].cpt_times = new Array();
			drug_sets[drug_sets_index].cpt_cp = new Array();
			drug_sets[drug_sets_index].cpt_ce = new Array();
			drug_sets[drug_sets_index].cpt_rates_real = new Array();
			drug_sets[drug_sets_index].volinf = new Array();
			drug_sets[drug_sets_index].historyarray = new Array();
			drug_sets[drug_sets_index].historyarrays = new Array();
			drug_sets[drug_sets_index].historytexts = new Array();
			drug_sets[drug_sets_index].cpt_bolus = 0;
			drug_sets[drug_sets_index].cet_bolus = 0;
			drug_sets[drug_sets_index].cpt_pause = 0;
			drug_sets[drug_sets_index].cet_pause = 0;
			drug_sets[drug_sets_index].cet_lockdowntime = 0;
		drug_sets[drug_sets_index].p_state = new Array();
		drug_sets[drug_sets_index].e_state = new Array();

		p_state[1] = 0;
		p_state[2] = 0;
		p_state[3] = 0;
		e_state[1] = 0;
		e_state[2] = 0;
		e_state[3] = 0;
		e_state[4] = 0;
}

function initcetbolus(ind) {
	document.getElementById("card_infusion" + ind).style.display = "none";
	document.getElementById("card_cpt" + ind).style.display = "none";
	document.getElementById("card_cet" + ind + "_new").style.display = "none";
	document.getElementById("card_cet" + ind).style.display = "";
	document.getElementById("card_cet" + ind).classList.add("hide");
	document.getElementById("btn_displayhistory").innerHTML = "Scheme";

		drug_sets[ind].cpt_active = 0;
		drug_sets[ind].cet_active = 0.5;
		drug_sets[ind].IB_active = 1;
		drug_sets[ind].IB_swing = 0.05;
		drug_sets[ind].firstrun = -1;
		calculate_udfs(ind);  


			drug_sets[ind].cpt_rates = new Array();
			drug_sets[ind].cpt_times = new Array();
			drug_sets[ind].cpt_cp = new Array();
			drug_sets[ind].cpt_ce = new Array();
			drug_sets[ind].cpt_rates_real = new Array();
			drug_sets[ind].volinf = new Array();
			drug_sets[ind].historyarray = new Array();
			drug_sets[ind].historyarrays = new Array();
			drug_sets[ind].historytexts = new Array();
			drug_sets[ind].cpt_bolus = 0;
			drug_sets[ind].cet_bolus = 0;
			drug_sets[ind].cpt_pause = 0;
			drug_sets[ind].cet_pause = 0;
			drug_sets[ind].cet_lockdowntime = 0;
			drug_sets[ind].p_state = new Array();
			drug_sets[ind].e_state = new Array();


	document.getElementById("status").innerHTML="Waiting to start";

	//moved from start_cpt
		
		p_state[1] = 0;
		p_state[2] = 0;
		p_state[3] = 0;
		e_state[1] = 0;
		e_state[2] = 0;
		e_state[3] = 0;
		e_state[4] = 0;
		//l1 = Math.exp(-drug_sets[active_drug_set_index].lambda[1] ); 
		//l2 = Math.exp(-drug_sets[active_drug_set_index].lambda[2] );
		//l3 = Math.exp(-drug_sets[active_drug_set_index].lambda[3] );
		//l4 = Math.exp(-drug_sets[active_drug_set_index].lambda[4] );

		//UI change
		document.getElementById("card_cet" + ind).querySelector(".cardtitle").innerHTML = "INTERMITTENT BOLUS";
		document.getElementById("btn_startCet" + ind).setAttribute("onclick", "start_cet_bolus()");
		document.getElementById("IB_about_btn" + ind).style.display = "block";
		document.getElementById("progressbar").style.display = "block";
		//document.getElementById("IB_description").style.display = "block";
		//var IBelem = document.getElementsByClassName("IB_elements");
		//for (u=0; u<IBelem.length; u++) {
		//	IBelem[u].style.display= "table-row";
		//}
		document.getElementById("IB_swing_select_row" + ind).style.display = "table-row";
		document.getElementById("IB_interval_row" + ind).style.display = "table-row";

		var tempmodel = document.getElementById("modelname").innerText;

		if (drug_sets[ind].drug_name=="Propofol") {
			if (tempmodel=="Marsh") {
				document.getElementById("IB_interval" + ind).innerText = "1.5-2min";
			}
			if (tempmodel=="Schnider") {
				document.getElementById("IB_interval" + ind).innerText = "1.5-2min";
			}
			if (tempmodel=="Eleveld") {
				document.getElementById("IB_interval" + ind).innerText = "3.5-4min";	
			}
			if (tempmodel=="Paedfusor") {
				document.getElementById("IB_interval" + ind).innerText = "2.5-3.5min";		
			}
			if (tempmodel=="Maitre") {
				document.getElementById("IB_interval" + ind).innerText = "2.5-5min";	
			}
		}

		if (drug_sets[ind].drug_name=="Remifentanil") {
			document.getElementById("IB_swing_select" + ind).options[0].disabled = true;
			document.getElementById("IB_swing_select" + ind).options[1].disabled = true;
			document.getElementById("IB_swing_select" + ind).options[2].selected = true;
			drug_sets[ind].IB_swing = 0.075;
			document.getElementById("IB_swing_select" + ind).value = drug_sets[ind].IB_swing;
		}

		//unhide if propofol
		if (ind == 0) {
			document.getElementById("card_cet" + ind).classList.remove("hide");
		}
		
}

function initmanual(ind) {
		drug_sets[ind].cpt_active = 0;
		drug_sets[ind].cet_active = 0;
		drug_sets[ind].manualmode_active = 1;
		
		drug_sets[ind].firstrun = -1;
		calculate_udfs(ind);  

			// initialize params
			drug_sets[ind].cpt_rates = new Array();
			drug_sets[ind].cpt_times = new Array();
			drug_sets[ind].cpt_cp = new Array();
			drug_sets[ind].cpt_ce = new Array();
			drug_sets[ind].cpt_rates_real = new Array();
			drug_sets[ind].volinf = new Array();
			drug_sets[ind].historyarray = new Array();
			drug_sets[ind].historyarrays = new Array();
			drug_sets[ind].historytexts = new Array();
			drug_sets[ind].cpt_bolus = 0;
			drug_sets[ind].cet_bolus = 0;

			drug_sets[ind].historytext = "";


		
		p_state[1] = 0;
		p_state[2] = 0;
		p_state[3] = 0;
		e_state[1] = 0;
		e_state[2] = 0;
		e_state[3] = 0;
		e_state[4] = 0;
		drug_sets[ind].desired = 0;

		//l1 = Math.exp(-drug_sets[active_drug_set_index].lambda[1] ); 
		//l2 = Math.exp(-drug_sets[active_drug_set_index].lambda[2] );
		//l3 = Math.exp(-drug_sets[active_drug_set_index].lambda[3] );
		//l4 = Math.exp(-drug_sets[active_drug_set_index].lambda[4] );

		document.getElementById("card_infusion" + ind).style.display = "";
		document.getElementById("card_infusion" + ind).classList.add("hide");
		//document.getElementById("card_bolus" + ind).style.display = "none"; -->no need this, otherwise tabswitch bug
		document.getElementById("card_bolus" + ind).classList.add("hide");
		document.getElementById('card_cpt' + ind).style.display = 'none';
		document.getElementById('card_cet' + ind).style.display = 'none';
		document.getElementById('card_cet' + ind + "_new").style.display = 'none';
		//document.getElementById('card_TimeEstimation').style.display = 'none';
		//document.getElementById('card_VolumeEstimation').style.display = 'none';
		document.getElementById("schemecopytitle").innerHTML = "HISTORY";
		document.getElementById("pastschemeCOPY").style.display = "none";

		//unhide if this is propofol, first run
		if (ind==0) {
			document.getElementById("card_infusion" + ind).classList.remove("hide");
		}

}

function initshare() {
	if (parseloading == 0) {
		d = new Date(); //create date object and store in d
		document.getElementById("sharebutton").style.display = "block";
		document.getElementById("annotatebutton").style.display = "block";
		document.getElementById("expandbutton").style.display = "block";
		/*
		document.getElementById("inputFileName").value = document.getElementById("inputFileName1").value;
		*/
		showInstallPromotion();
		createfile();
		savefile_patient();
	}
}
function start_manual(ind) { //this is new	

	if (complex_mode == 1) {
		if ((drug_sets[active_drug_set_index].firstrun == -1) && (drug_sets[alt_drug_set_index].firstrun == -1)) {
			common_start_calls();
		}
	} else if (drug_sets[ind].firstrun == -1) {
		common_start_calls();
	}

	if (drug_sets[ind].firstrun == -1) { //first run
		//document.getElementById("top_subtitle").classList.add("topClose");
		//document.getElementById("top_title").classList.add("topOpen");
		//initshare();
		offset = Date.now();
		if (optionsarray_infusionunit[0][0] == 1) {
			drug_sets[ind].inf_rate_mls = document.getElementById("inputInfusion" + ind).value *1; 
		} else {
			//otherwise convert to ml/h first
			drug_sets[ind].inf_rate_mls = document.getElementById("inputInfusion" + ind).value/drug_sets[active_drug_set_index].infusate_concentration/drug_sets[active_drug_set_index].inf_rate_permass_factor*mass;
		}

		//special code to account for "lost time" for delayed start in complex mode
		if (complex_mode == 1) {
			working_clock = Math.floor(time_in_s);
			for (i=0; i<working_clock; i++) {
				drug_sets[ind].cpt_rates_real.push(0);
				drug_sets[ind].cpt_cp.push([0,0,0]);
				drug_sets[ind].cpt_ce.push([0,0,0,0]);
				drug_sets[ind].volinf.push(0)

			}
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock-1)/60, y:0});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock-1)/60, y:0});
			//loop4 = setInterval(updatechart2, 1000);
			//loop5 = setInterval(updatechart3, 1000*30);
			setTimeout(function(){
				updatechart3(1);
			},500);
		}

		drug_sets[ind].firstrun = 0;
		drug_sets[ind].running = 1;

		if (document.getElementById("inputBolus_initial" + ind).value>0) {
			temp_bolus = document.getElementById("inputBolus_initial" + ind).value * 1;
			if (optionsarray_infusionunit[1][0] == 1) {
				bolusadmin(temp_bolus,ind);	
			} else if (optionsarray_infusionunit[1][1] == 1) {
				bolusadmin(temp_bolus * mass,ind);	
			} else {
				bolusadmin(temp_bolus * drug_sets[ind].infusate_concentration,ind);	
			}
			
		} else {
			lookahead(0,21600,ind);
		}


		//UI code goes here
		document.getElementById("btn_start" + ind).innerHTML = "Update Rate";
		document.getElementById("tableInitialBolus" + ind).style.display = "none";
		document.getElementById("tableInfusionRate" + ind).classList.remove("line");
		document.getElementById("card_bolus" + ind).style.display ="";
		document.getElementById("card_bolus" + ind).classList.remove("hide");
		
		document.getElementById("status").innerHTML="Running";
		document.getElementById("iconplay").classList.remove("stop");
		document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
		
		
		if ((complex_mode == 1) && (drug_sets[0].firstrun > -1) && (drug_sets[1].firstrun > -1)) {
			loop4 = setInterval(updatechart2, 5000);
			loop5 = setInterval(updatechart3, 1000);
			setTimeout(function(){
				updatechart3(1);
			},500);
		}
	} else {
		document.getElementById("prompt_msg2").innerHTML = "Current rate";
		if (optionsarray_infusionunit[0][0] == 1) {
			drug_sets[ind].inf_rate_mls = document.getElementById("inputInfusion" + ind).value *1; 
		} else {
			//otherwise convert to ml/h first
			drug_sets[ind].inf_rate_mls = document.getElementById("inputInfusion" + ind).value/drug_sets[active_drug_set_index].infusate_concentration/drug_sets[active_drug_set_index].inf_rate_permass_factor*mass;
		}
		document.getElementById("status").innerHTML="Running";
		document.getElementById("iconplay").classList.remove("stop");
		document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
		
		lookahead(0,21600,ind);//start button name already changed to "updaterate"	
		
	}
}


function start() { // this will be obsolete
	if (firstrun == -1) { //first run
		offset = Date.now();
		inf_rate_mls = document.getElementById("inputInfusion").value *1; 
		inf_rate_mgperkg = inf_rate_mls*10/mass;
		historytext = "<br>" + "Time: " + time_in_s + "s - Rate: " + inf_rate_mls + "ml/h";
		
		calculate_udfs();
		p_state[1] = 0;
		p_state[2] = 0;
		p_state[3] = 0;
		e_state[1] = 0;
		e_state[2] = 0;
		e_state[3] = 0;
		e_state[4] = 0;
		desired = 0;
		
		loop1 = setInterval(update, 100);
		//init patient states
		loop2 = setInterval(runinfusion, refresh_interval);
		loop3 = setInterval(updatechart, 3000, myChart);
		loop4 = setInterval(lookahead, 6000);

		if (document.getElementById("inputBolus_initial").value>0) {
			bolusadmin(document.getElementById("inputBolus_initial").value * 1);
		}
		firstrun = 0;
		running = 1;
		document.getElementById("btn_start").innerHTML = "Update Rate";
		document.getElementById("tableInitialBolus").style.display = "none";
		document.getElementById("tableInfusionRate").classList.remove("line");
		document.getElementById("card_bolus").style.display ="block";
		document.getElementById("card_cpt").style.display ="none";
		document.getElementById("status").innerHTML="Running";
		document.getElementById("iconplay").classList.remove("stop");
		document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
		document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
	} else {
		updateinfusion();//start button name already changed to "updaterate"		
	}
}



function start_cpt() {
	//enter read 'desired' code here, otherwise manual command line entry
	//reading 'desired' code here
	active_drug_set_index = 0;

	if (complex_mode == 1) {
		if ((drug_sets[active_drug_set_index].firstrun == -1) && (drug_sets[alt_drug_set_index].firstrun == -1)) {
			common_start_calls();
		}
	} else if (drug_sets[active_drug_set_index].firstrun == -1) {
		common_start_calls();
	}

	if (drug_sets[active_drug_set_index].firstrun == -1) {
		if (document.getElementById("inputDesired0").value>0) {
			offset = Date.now();
		
			desired = document.getElementById("inputDesired0").value *1;
		
			drug_sets[active_drug_set_index].cpt_active = 1;

			drug_sets[active_drug_set_index].desired = desired;
			drug_sets[active_drug_set_index].firstrun = 0;
			drug_sets[active_drug_set_index].running = 1;

			deliver_cpt(desired, 0, 0, 0); // 4th argument is drug set index (3rd arg is compensation)

		//UI code goes here
			
			document.getElementById("status").innerHTML="";
			document.getElementById("btn_startCpt0_new").innerHTML = `<div class="icon"><i class="fas fa-play fa-fw"></i></div><div class="input-button-text">Enter</div></a>`;
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("pastscheme").classList.add("show");
		} else {
			displayWarning("Warning","CP Target Invalid.");
			document.getElementById("inputDesired0").value = "";
		}
	} else {
		if (document.getElementById("inputDesired0").value>0) {
			desired = document.getElementById("inputDesired0").value *1;
			drug_sets[active_drug_set_index].cpt_active = 1;
			drug_sets[active_drug_set_index].running = 1;
			document.getElementById("status").innerHTML="";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			deliver_cpt(desired, 0, 0,0);
		} else {
			displayWarning("Warning","CP Target Invalid.");
			document.getElementById("inputDesired0").value = "";
		}
		
	}
	alert_api(0);
	displaypreview_hide_onsubmit();
}


function common_start_calls() {
		document.getElementById("top_subtitle").classList.add("topClose");
		document.getElementById("top_title").classList.add("topOpen");

			loop1 = setInterval(update, 500);
			if (complex_mode == 1) {
				loop2 = setInterval(runinfusion_complex, refresh_interval);
			} else {
				loop2 = setInterval(runinfusion2, refresh_interval);	
			}
			loop3 = setInterval(updatechart, 5000, myChart);
		loop7 = setInterval(displayWarningBanner, 60*2000);
		initshare();
		trk();
}

var displaymode = '';

function getPWADisplayMode() {
  if (document.referrer.startsWith('android-app://'))
    return 'twa';
  if (window.matchMedia('(display-mode: browser)').matches)
    return 'net-browser';
  if (window.matchMedia('(display-mode: standalone)').matches)
    return 'PWA-standalone';
  if (window.matchMedia('(display-mode: minimal-ui)').matches)
    return 'PWA-minimal-ui';
  if (window.matchMedia('(display-mode: fullscreen)').matches)
    return 'PWA-fullscreen';
  if (window.matchMedia('(display-mode: window-controls-overlay)').matches)
    return 'PWA-window-controls-overlay';

  return 'unknown';
}

window.addEventListener('DOMContentLoaded', () => {
  // Log launch display mode to analytics
  displaymode = getPWADisplayMode();
  console.log(displaymode);
});

function trk() {
		//custom umami tracker function
		trackerprops = {};
		if (complex_mode == 0) {
			temptext0 = 'Simple';
			trackerprops.model = drug_sets[0].model_name;
			if (drug_sets[0].cpt_active > 0) {
				trackerprops.mode = 'CPT';
			} else if (drug_sets[0].cet_active > 0) {
				if (drug_sets[0].IB_active > 0) {
					trackerprops.mode = 'IB';	
				} else {
					trackerprops.mode = 'CET';	
				}
			} else if (drug_sets[0].manualmode_active > 0) {
				trackerprops.mode = 'Manual';
			}
			temptext = trackerprops.mode + trackerprops.model;
		} else {
			trackerprops.model = 'Complex';
			temptext0 = 'Complex';
			temptext = '';
			if (drug_sets[0].cpt_active > 0) {
				temptext += 'CPT';
			} else if (drug_sets[0].cet_active > 0) {
				if (drug_sets[0].IB_active > 0) {
					temptext += 'IB';	
				} else {
					temptext += 'CET';	
				}
			} else if (drug_sets[0].manualmode_active > 0) {
				temptext += 'Manual';
			}
			temptext += drug_sets[0].model_name;
			temptext += ' + ';
			if (drug_sets[1].cpt_active > 0) {
				temptext += 'CPT';
			} else if (drug_sets[1].cet_active > 0) {
				if (drug_sets[1].IB_active > 0) {
					temptext += 'IB';	
				} else {
					temptext += 'CET';	
				}
			} else if (drug_sets[1].manualmode_active > 0) {
				temptext += 'Manual';
			}
			temptext += drug_sets[1].model_name;
			trackerprops.mode = temptext;
		}
		//patient data 
		if (bmi != undefined) {
			if (bmi<18.5) { 
				trackerprops.BMI = "<18.5";
			} else if ((bmi>=18.5) && (bmi<25)) {
				trackerprops.BMI = "normal";
			} else if ((bmi>=25) && (bmi<29.9)) {
				trackerprops.BMI = "25-30";
			} else if ((bmi>30) && (bmi<35)) {
				trackerprops.BMI = "30-35";
			} else if ((bmi>=35) && (bmi<=9999)) {
				trackerprops.BMI = ">35";
			} else if (bmi == Infinity) {
				trackerprops.BMI = "unknown";
			} else {
				trackerprops.BMI = "unknown";
			}
		}
			if (age<3) {
				trackerprops.age = "<3";
			} else if ((age>=3) && (age<16)) {
				trackerprops.age = "3-16";
			} else if ((age>=16) && (age<=70)) {
				trackerprops.age = "16-70";
			} else if (age>70) {
				trackerprops.age = ">70";
			} else {
				trackerprops.age = "unknown";
			}
			if (gender == 0) {
				trackerprops.sex = "male";
			} else if (gender == 1) {
				trackerprops.sex = "female";
			} else {
				trackerprops.sex = "unknown";
			}
		combinedtext = temptext0 + ": " + temptext;
		combinedtext1 = "Age: " + trackerprops.age + "; Sex: " + trackerprops.sex + "; BMI: " + trackerprops.BMI;
		trackerprops.string_model = combinedtext;
		trackerprops.string_demographics = combinedtext1;
		trackerprops.displaymode = displaymode;
		if (parseloading == 0) {
			umami.track('run', trackerprops);
		} else {
			umami.track('view', trackerprops);	
		}
		umami.identify(trackerprops);
}

function postprocessing(needstartcet) {
	//cet mode
	//PP mode 1 (fixed interval)
	ticker_active = 1;
	//clone the array
	cpt_rates_real_PP = [...cpt_rates_real];
	//PP_interval = 180; //180s = 3mins
	working_clock = Math.floor(time_in_s);
	//store start of postprocessing
	PP_start = working_clock;

	//backup history things, only if cet engine was fired
		if ((cet_bolus > 0) && (needstartcet == 1)) {
			PP_temp_bolus_store = cet_bolus;
			PP_temp_bolustime_store = document.querySelector(".schemecet").getAttribute("data-time")*1;
		}

	//first determine the boluses
	cpt_rates_real_chunks = chunk(cpt_rates_real_PP, PP_interval);
	for (j=0; j<cpt_rates_real_chunks.length; j++) {
		reducer(cpt_rates_real_chunks[j]);
	}

	console.log(cpt_rates_real_chunks);

	//set zero the real infusion rates and CP CE
	//pop the arrays
	//write to system using cpt_rates_real_chunks

	if (cpt_cp.length>0) {
		p_state[1] = cpt_cp[working_clock-1][0];
		p_state[2] = cpt_cp[working_clock-1][1];
		p_state[3] = cpt_cp[working_clock-1][2];

		e_state[1] = cpt_ce[working_clock-1][0];
		e_state[2] = cpt_ce[working_clock-1][1];
		e_state[3] = cpt_ce[working_clock-1][2];
		e_state[4] = cpt_ce[working_clock-1][3];
		// for VI calculation - truncate back to prev
		temp_vol = volinf[working_clock-1];
		myChart.data.datasets[2].data.length = myChart.data.datasets[2].data.findIndex((element)=>element.x>time_in_s/60);
		myChart.data.datasets[3].data.length = myChart.data.datasets[3].data.findIndex((element)=>element.x>time_in_s/60);
	}


	p_state2[1] = p_state[1];
	p_state2[2] = p_state[2];
	p_state2[3] = p_state[3];
	e_state2[1] = e_state[1];
	e_state2[2] = e_state[2];
	e_state2[3] = e_state[3];
	e_state2[4] = e_state[4];

	p_state3[1] = p_state[1];
	p_state3[2] = p_state[2];
	p_state3[3] = p_state[3];
	e_state3[1] = e_state[1];
	e_state3[2] = e_state[2];
	e_state3[3] = e_state[3];
	e_state3[4] = e_state[4];



	//pop the arrays
	cpt_rates.length = 0;
	cpt_times.length = 0;
	//historyarray.length = 0;
	//set the real rates delivery array to current length in time_in_s
	cpt_rates_real.length = working_clock;
	cpt_cp.length = working_clock;
	cpt_ce.length = working_clock;
	volinf.length = working_clock;

	var look_l1 = Math.exp(-lambda[1] ); 
	var look_l2 = Math.exp(-lambda[2] );
	var look_l3 = Math.exp(-lambda[3] );
	var look_l4 = Math.exp(-lambda[4] );
	var temp_result, temp_result_e;


	//because the postprocessing function does not start at time zero, need to account for offset
	var offset = PP_interval - (working_clock % PP_interval);
	var offsetbolus = 0;
	var nextround = Math.ceil(working_clock/PP_interval);

	if ((preview_bolus == 0) && (preview_rate==0)) {
		//decreasing, infusion paused
		offset = offset + PP_interval;
		nextround = nextround + 1;
	}
	console.log("offset", offset);
	console.log("nextround",nextround);

	PP_next = nextround * PP_interval;

	for (i=0; i<offset; i++) {
			offsetbolus += cpt_rates_real_PP[working_clock+i];
			test_rate = 0;

			p_state3[1] = p_state3[1] * look_l1;
			p_state3[2] = p_state3[2] * look_l2;
			p_state3[3] = p_state3[3] * look_l3;
			//if (effect_data)
			//	{
			e_state3[1] = e_state3[1] * look_l1;
			e_state3[2] = e_state3[2] * look_l2;
			e_state3[3] = e_state3[3] * look_l3;
			e_state3[4] = e_state3[4] * look_l4;
			
			//prior_test_rate = test_rate;
			temp_result = p_state3[1] + p_state3[2] + p_state3[3];
			temp_result_e = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];

			cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
			cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
			cpt_rates_real.push(test_rate);

			volinf.push(temp_vol);

			//if (j%60 ==0) {console.log(j + "real rate " + test_rate*3600/10 + " real Cp " + result);}
			//if ((j<1800) && (j%10==0)) {
			myChart.data.datasets[2].data.push({x:(working_clock+i)/60, y:temp_result});
			myChart.data.datasets[3].data.push({x:(working_clock+i)/60, y:temp_result_e});
			//}
			//if ((j>=1800) && (j%60==0)) {
			//	myChart.data.datasets[2].data.push({x:(working_clock+j)/60, y:temp_result});
			//	myChart.data.datasets[3].data.push({x:(working_clock+j)/60, y:temp_result_e});			
			//}

	}

	//add the last offset bolus to the next round
	cpt_rates_real_chunks[nextround][0] += offsetbolus*0.75;

	historyarray.length = 0;	
	historyarray.push([0,0]);
	historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + conc_units + "/ml): " + desired + " <br> *** with intermittent bolus conversion *** </div>";
	
	for (i=nextround; i<cpt_rates_real_chunks.length; i++) {
		clock = PP_interval * i;
		test_rate = Math.round(cpt_rates_real_chunks[i][0]);
		if (test_rate > 0) {
			historytext = historytext.concat("<div class='schemebolus' data-time='" + clock + "'>" + "Time: " + converttime(clock) + " - Bolus: " + test_rate + "mg</div>");
			historyarray.push([clock,test_rate]);
		}

		for (j=0; j<cpt_rates_real_chunks[i].length; j++) {
			test_rate = Math.round(cpt_rates_real_chunks[i][j]);
			temp_vol = temp_vol+test_rate/10;

			p_state3[1] = p_state3[1] * look_l1 + p_coef[1] * test_rate * (1 - look_l1);
			p_state3[2] = p_state3[2] * look_l2 + p_coef[2] * test_rate * (1 - look_l2);
			p_state3[3] = p_state3[3] * look_l3 + p_coef[3] * test_rate * (1 - look_l3);
			//if (effect_data)
			//	{
			e_state3[1] = e_state3[1] * look_l1 + e_coef[1] * test_rate * (1 - look_l1);
			e_state3[2] = e_state3[2] * look_l2 + e_coef[2] * test_rate * (1 - look_l2);
			e_state3[3] = e_state3[3] * look_l3 + e_coef[3] * test_rate * (1 - look_l3);
			e_state3[4] = e_state3[4] * look_l4 + e_coef[4] * test_rate * (1 - look_l4);
			
			//prior_test_rate = test_rate;
			temp_result = p_state3[1] + p_state3[2] + p_state3[3];
			temp_result_e = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];

			cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
			cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
			cpt_rates_real.push(test_rate);

			volinf.push(temp_vol);

			//if (j%60 ==0) {console.log(j + "real rate " + test_rate*3600/10 + " real Cp " + result);}
			//if ((j<1800) && (j%10==0)) {
				if (j%10==0) {
				myChart.data.datasets[2].data.push({x:(PP_interval*i+j)/60, y:temp_result});
				myChart.data.datasets[3].data.push({x:(PP_interval*i+j)/60, y:temp_result_e});
				}
			//}
			//if ((j>=1800) && (j%60==0)) {
			//	myChart.data.datasets[2].data.push({x:(working_clock+j)/60, y:temp_result});
			//	myChart.data.datasets[3].data.push({x:(working_clock+j)/60, y:temp_result_e});			
			//}
		}
	}
	document.getElementById("historywrapper").innerHTML = historytext;

	function chunk(items, size) {
		const chunks = [];
		items = [].concat(...items);
		while (items.length) {
			chunks.push(
				items.splice(0,size))
		}
		return chunks;
	}

	function reducer(inputarray) {
		var sum = inputarray.reduce(function (accumulator, currentValue) {
			return accumulator + currentValue
		}, 0);
		inputarray[0] = sum;
		for (i=1; i<inputarray.length; i++) {
			inputarray[i] = 0;
		}

	}
}
function stop() {
	clearInterval(loop1);
	clearInterval(loop2);
	clearInterval(loop3);
}

function reset() {
	stop();
	document.getElementById("inputBolus").value="0";
	document.getElementById("inputInfusion").value="0";
	offset = null;
	time = 0;
	document.getElementById("clock").innerHTML = "0";
	p_state[1] = 0;
	p_state[2] = 0;
	p_state[3] = 0;
	e_state[1] = 0;
	e_state[2] = 0;
	e_state[3] = 0;
	e_state[4] = 0;
	result = 0;
	result_e =0;
	displayresult(result, result_e);
	volume_infused=0;
	document.getElementById("displayvolume").innerHTML = volume_infused;
}
function updateinfusion() {
	inf_rate_mls = document.getElementById("inputInfusion").value *1;
	inf_rate_mgperkg = inf_rate_mls*10/mass;
	historytext = historytext.concat("<br>" + "Time: " + time_in_s + "s - Rate: " + inf_rate_mls + "ml/h");
	document.getElementById("iconplay").classList.remove("stop");
	document.getElementById("status").innerHTML="Running";
	document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
}
function pause(ind) {
	drug_sets[ind].inf_rate_mls = 0;
	document.getElementById("inputInfusion" + ind).value = "0";
	lookahead(0,21600,ind);
	document.getElementById("iconplay").classList.add("stop");
	document.getElementById("iconplay").innerHTML="<i class='fas fa-pause fa-lg'></i>";
	document.getElementById("status").innerHTML="Paused";
}
function pauseCpt(ind) {
	drug_sets[ind].desired = 0;
	if (parseloading == 0) {
		document.getElementById("inputDesired" + ind).value = "0";
		document.getElementById("inputDesiredCe" + ind + "_new").value = "0";
	}
	drug_sets[ind].running=0;

	var working_clock = Math.floor(time_in_s);
		//backup current P state and E state s

	if (drug_sets[ind].cpt_cp.length>0) {
		p_state[1] = drug_sets[ind].cpt_cp[working_clock-1][0];
		p_state[2] = drug_sets[ind].cpt_cp[working_clock-1][1];
		p_state[3] = drug_sets[ind].cpt_cp[working_clock-1][2];

		e_state[1] = drug_sets[ind].cpt_ce[working_clock-1][0];
		e_state[2] = drug_sets[ind].cpt_ce[working_clock-1][1];
		e_state[3] = drug_sets[ind].cpt_ce[working_clock-1][2];
		e_state[4] = drug_sets[ind].cpt_ce[working_clock-1][3];
	}


	p_state2[1] = p_state[1];
	p_state2[2] = p_state[2];
	p_state2[3] = p_state[3];
	e_state2[1] = e_state[1];
	e_state2[2] = e_state[2];
	e_state2[3] = e_state[3];
	e_state2[4] = e_state[4];

	p_state3[1] = p_state[1];
	p_state3[2] = p_state[2];
	p_state3[3] = p_state[3];
	e_state3[1] = e_state[1];
	e_state3[2] = e_state[2];
	e_state3[3] = e_state[3];
	e_state3[4] = e_state[4];

	//pop the arrays
	drug_sets[ind].cpt_rates.length = 0;
	drug_sets[ind].cpt_times.length = 0;
	drug_sets[ind].historyarray.length = 0;
	//set the real rates delivery array to current length in time_in_s
	drug_sets[ind].cpt_rates_real.length = working_clock;
	drug_sets[ind].cpt_cp.length = working_clock;
	drug_sets[ind].cpt_ce.length = working_clock;
	drug_sets[ind].volinf.length = working_clock;
	myChart.data.datasets[ind*2+2].data.length = myChart.data.datasets[ind*2+2].data.findIndex((element)=>element.x>time_in_s/60);
	myChart.data.datasets[ind*2+3].data.length = myChart.data.datasets[ind*2+3].data.findIndex((element)=>element.x>time_in_s/60);


	var look_l1 = Math.exp(-drug_sets[ind].lambda[1] ); 
	var look_l2 = Math.exp(-drug_sets[ind].lambda[2] );
	var look_l3 = Math.exp(-drug_sets[ind].lambda[3] );
	var look_l4 = Math.exp(-drug_sets[ind].lambda[4] );
	var temp_result, temp_result_e;
	var temp_vol = drug_sets[ind].volinf[working_clock-1];

	for (j=0; j<21600; j++) {

		p_state3[1] = p_state3[1] * look_l1 ;
		p_state3[2] = p_state3[2] * look_l2 ;
		p_state3[3] = p_state3[3] * look_l3 ;
		//if (effect_data)
		//	{
		e_state3[1] = e_state3[1] * look_l1 ;
		e_state3[2] = e_state3[2] * look_l2 ;
		e_state3[3] = e_state3[3] * look_l3 ;
		e_state3[4] = e_state3[4] * look_l4 ;
		
		//prior_test_rate = test_rate;
		temp_result = p_state3[1] + p_state3[2] + p_state3[3];
		temp_result_e = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];

		drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
		drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
		drug_sets[ind].volinf.push(temp_vol);
		drug_sets[ind].cpt_rates_real.push(0);
		//if (j%60 ==0) {console.log(j + "real rate " + test_rate*3600/10 + " real Cp " + result);}
		if ((j<1800) && (j%10==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+j)/60, y:temp_result});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+j)/60, y:temp_result_e});
		}
		if ((j>=1800) && (j<7200) && (j%60==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+j)/60, y:temp_result});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+j)/60, y:temp_result_e});			
		}
		if ((j>=7200) && (j%120==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+j)/60, y:temp_result});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+j)/60, y:temp_result_e});			
		}
	}

	processhistory();
	drug_sets[ind].historytext = "<div class='schemecpt' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - target set zero.</div>";
	drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "Infusion paused</div>");	
	drug_sets[ind].historyarray.push([working_clock, 0]);
	drug_sets[ind].historyarrays.push([,0,working_clock,0]);
	document.getElementById("historywrapper").innerHTML = drug_sets[ind].historytext;
	historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]"); // need to self-write history divs because of update() will not function

	document.getElementById("iconplay").classList.add("stop");
	document.getElementById("iconplay").innerHTML="<i class='fas fa-pause fa-lg'></i>";
	document.getElementById("status").innerHTML="Paused";
	document.getElementById("prompt_msg2").innerHTML = "Current target: 0";
	document.getElementById("warning").style.display = "none";
	document.getElementById("infusiondescriptor").innerHTML="";
	document.getElementById("top_infrate").style.display = "none";
	if (parseloading == 0) {
		savefile_data();	
		ptol_generate_margins(ind,0.9,0.5);
	} else {
		myChart.update();
	}
	
}

function update_IB() {
	//obsolete; merged into update()code
	var now = Date.now();
	var temp_time;
	var temp_message;
	time += (now - offset)*simspeed;
	offset = now;
	time_in_s = time/1000;
	document.getElementById("displayvolume").innerHTML = Math.round(volinf[Math.floor(time_in_s)]*10)/10;
	document.getElementById("clock").innerHTML = converttime(Math.floor(time_in_s));

	
		var i;

			
			document.getElementById("top_infrate").style.display = "none";

		historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]");

		for (i=0; i<historyarray.length; i++) { 
			if (time_in_s<historyarray[i][0]) {
				temp_time = Math.round(historyarray[i][0] - time_in_s);

				if (temp_time<30) { //30s near next infusion rate
					if (user_hide == 0) {
						document.getElementById("warning").style.display = "flex";
						if (ringactive == 0) ringbell(temp_time*1000/simspeed);
						//console.log(temp_time);
						alert_api(1);
					} else {
						alert_api(0);
					}

					//if (ticker_active == 0) {
							temp_message = "Next Bolus: " + historyarray[i][2] + infused_units;
							document.getElementById("warningcounter").innerHTML = temp_time + "s";
							document.getElementById("warningprompt").innerHTML = temp_message;
					//} else {
					//	document.getElementById("warningcounter").innerHTML = temp_time + "s";
					//	document.getElementById("warningprompt").innerHTML = "Bolus: " + document.getElementById("PP_bolus_display").innerHTML + "mg";
					//	document.getElementById("tickerleft").style.background = "linear-gradient(112deg, rgb(238 238 238) 45%, rgb(239 23 17) 45%)";
					//	document.getElementById("progressinside").style.background = "rgb(239 23 17)";
					//}

					if (temp_time<5) {
						if ((notificationallowed == 1) && (notificationactive == 1)) {
							showNotification(document.getElementById("warningprompt").innerText);
						}
					} else {
					}

				} else {
					document.getElementById("warning").style.display = "none";
					//document.getElementById("tickerleft").style.background = "linear-gradient(112deg, rgb(238 238 238) 45%, rgb(123 128 146) 45%)";
					//document.getElementById("progressinside").style.background = "#ddd";
					alert_api(0);
				}
				break; //found
			}
		}

		//testing code
		temp_time1 = Math.round(time_in_s - prior);
		if ((temp_time<15) && (historyarray[i][2]>0)) {
			document.getElementById("infrate").innerHTML = historyarray[i][2] + "<span style='font-weight:normal'>" + infused_units + "</span>";
			document.getElementById("top_infrate").style.display = "inline-block";
			if (!document.getElementById("top_infrate").classList.contains("warningborder")) document.getElementById("top_infrate").classList.add("warningborder");
		} else if ((temp_time1<8) && (historyarray[i-1][2]>0)) {
			document.getElementById("infrate").innerHTML = historyarray[i-1][2] + "<span style='font-weight:normal'>" + infused_units +"</span>";
			document.getElementById("top_infrate").style.display = "inline-block";
			if (!document.getElementById("top_infrate").classList.contains("warningborder")) document.getElementById("top_infrate").classList.add("warningborder");
		} else {
			document.getElementById("top_infrate").classList.remove("warningborder");
			document.getElementById("top_infrate").style.display = "none";
		}
		//if (temp_time1 < 10) {
		//	document.getElementById("top_infrate").classList.remove("warningborder");	
			//if (!document.getElementById("top_infrate").classList.contains("blueshadow")) document.getElementById("top_infrate").classList.add("blueshadow");
		//}
		//document.getElementById("temptimedisplay").innerHTML= temp_time + " / " + temp_time1;

		prior = historyarray[i-1][0]*1;

		if (fentanyl_weightadjusted_flag == 0) {
			document.getElementById("prompt_msg2").innerHTML = "Current target: " + desired + conc_units + "/ml";
		} else {
			document.getElementById("prompt_msg2").innerHTML = "Current target: " + fentanyl_weightadjusted_target_uncorrected + conc_units + "/ml";
		}
		document.getElementById("infusiondescriptor").innerHTML = "Next bolus: " + historyarray[i][2] + infused_units + " in " + converttime(historyarray[i][0]-Math.floor(time_in_s));
		//next = historyarray[i][0]*1;

		//if (Math.abs(Math.round(time_in_s - next)) < 60) { // when next is near, so that no need read DOM many times
			for (j=1; j<historydivs.length; j++) { // j=1 is because first element is the CPT title
				if (historydivs[j].getAttribute("data-time")*1==prior) { //current infusing
					historydivs[j].classList.add("grey");
					historydivs[j].classList.remove("next");
				} else if (historydivs[j].getAttribute("data-time")*1<prior) { //past history
					historydivs[j].classList.add("past");
					historydivs[j].classList.remove("grey");
				} else {
					historydivs[j].classList.add("next");
					historydivs[j].classList.remove("grey");
				}
			}
		//}

		//progressbar code
		tempWidth = (historyarray[i][0]-time_in_s)/(historyarray[i][0] - historyarray[i-1][0]);
		document.getElementById("progressbar").style.width = tempWidth * 100 + "%";


	document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;

}

function update() {
	var now = Date.now();
	var temp_time;
	var temp_message;
	time += (now - offset)*simspeed;
	offset = now;
	time_in_s = time/1000;
	
	document.getElementById("clock").innerHTML = converttime(Math.floor(time_in_s));

	//branch off intermittent bolus code here

	if ((drug_sets[active_drug_set_index].IB_active == 1) && (drug_sets[active_drug_set_index].running == 1)) {
			document.getElementById("displayvolume").innerHTML = Math.round(drug_sets[active_drug_set_index].volinf[Math.floor(time_in_s)]*10)/10;
			document.getElementById("top_infrate").style.display = "none";

			var i;
			historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]");

			if (drug_sets[active_drug_set_index].historyarray.length>0) {
				i = drug_sets[active_drug_set_index].historyarray.findIndex((element)=>element[0]>time_in_s);
				if (i>0) {
					temp_time = Math.round(drug_sets[active_drug_set_index].historyarray[i][0] - time_in_s);

					if (temp_time<30) { //30s near next infusion rate
						if (user_hide == 0) {
							document.getElementById("warning").style.display = "flex";
						if (ringactive == 0) ringbell(temp_time*1000/simspeed);
							//console.log(temp_time);
							alert_api(1);
						} else {
							alert_api(0);
						}

					//if (ticker_active == 0) {
							temp_message = "Next Bolus: " + drug_sets[active_drug_set_index].historyarray[i][2] + drug_sets[active_drug_set_index].infused_units;
							document.getElementById("warningcounter").innerHTML = temp_time + "s";
							document.getElementById("warningprompt").innerHTML = temp_message;
					//} else {
					//	document.getElementById("warningcounter").innerHTML = temp_time + "s";
					//	document.getElementById("warningprompt").innerHTML = "Bolus: " + document.getElementById("PP_bolus_display").innerHTML + "mg";
					//	document.getElementById("tickerleft").style.background = "linear-gradient(112deg, rgb(238 238 238) 45%, rgb(239 23 17) 45%)";
					//	document.getElementById("progressinside").style.background = "rgb(239 23 17)";
					//}

						if (temp_time<5) {
							if ((notificationallowed == 1) && (notificationactive == 1)) {
								showNotification(document.getElementById("warningprompt").innerText);
							}
						} else {
						}

					} else {
						//NOT 30s near next inf rate
						document.getElementById("warning").style.display = "none";
						alert_api(0);
					}
					
				} else { //means current time is already past the last historyarray time
					alert_api(0);
					document.getElementById("warning").style.display = "none";
					//redefine i as the length
					i = drug_sets[active_drug_set_index].historyarray.length;
				}
			} 

		
			temp_time1 = Math.round(time_in_s - prior);
			if ((temp_time<15) && (drug_sets[active_drug_set_index].historyarray[i][2]>0)) {
				document.getElementById("infrate").innerHTML = drug_sets[active_drug_set_index].historyarray[i][2] + "<span style='font-weight:normal'>" + drug_sets[active_drug_set_index].infused_units + "</span>";
				document.getElementById("top_infrate").style.display = "inline-block";
				if (!document.getElementById("top_infrate").classList.contains("warningborder")) document.getElementById("top_infrate").classList.add("warningborder");
			} else if ((temp_time1<8) && (drug_sets[active_drug_set_index].historyarray[i-1][2]>0)) {
				document.getElementById("infrate").innerHTML = drug_sets[active_drug_set_index].historyarray[i-1][2] + "<span style='font-weight:normal'>" + drug_sets[active_drug_set_index].infused_units +"</span>";
				document.getElementById("top_infrate").style.display = "inline-block";
				if (!document.getElementById("top_infrate").classList.contains("warningborder")) document.getElementById("top_infrate").classList.add("warningborder");
			} else {
				document.getElementById("top_infrate").classList.remove("warningborder");
				document.getElementById("top_infrate").style.display = "none";
			}
		//if (temp_time1 < 10) {
		//	document.getElementById("top_infrate").classList.remove("warningborder");	
			//if (!document.getElementById("top_infrate").classList.contains("blueshadow")) document.getElementById("top_infrate").classList.add("blueshadow");
		//}
		//document.getElementById("temptimedisplay").innerHTML= temp_time + " / " + temp_time1;

			//need to consider special scenario of CET pause
			prior = drug_sets[active_drug_set_index].historyarray[i-1][0]*1;

			if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
				document.getElementById("prompt_msg2").innerHTML = "Current target: " + drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected + drug_sets[active_drug_set_index].conc_units + "/ml";
			} else {
				document.getElementById("prompt_msg2").innerHTML = "Current target: " + drug_sets[active_drug_set_index].desired + drug_sets[active_drug_set_index].conc_units + "/ml";
			}
			document.getElementById("infusiondescriptor").innerHTML = "Next bolus: " + drug_sets[active_drug_set_index].historyarray[i][2] + drug_sets[active_drug_set_index].infused_units + " in " + converttime(drug_sets[active_drug_set_index].historyarray[i][0]-Math.floor(time_in_s));
		//next = historyarray[i][0]*1;

		//if (Math.abs(Math.round(time_in_s - next)) < 60) { // when next is near, so that no need read DOM many times
			for (j=1; j<historydivs.length; j++) { // j=1 is because first element is the CPT title
				if (historydivs[j].getAttribute("data-time")*1==prior) { //current infusing
					historydivs[j].classList.add("grey");
					historydivs[j].classList.remove("next");
					historydivs[j].classList.remove("past");
				} else if (historydivs[j].getAttribute("data-time")*1<prior) { //past history
					historydivs[j].classList.add("past");
					historydivs[j].classList.remove("grey");
					historydivs[j].classList.remove("next");
				} else {
					historydivs[j].classList.add("next");
					historydivs[j].classList.remove("grey");
					historydivs[j].classList.remove("past");
				}
			}
		//}

		//progressbar code
		tempWidth = (drug_sets[active_drug_set_index].historyarray[i][0]-time_in_s)/(drug_sets[active_drug_set_index].historyarray[i][0] - drug_sets[active_drug_set_index].historyarray[i-1][0]);
		document.getElementById("progressbar").style.width = tempWidth * 100 + "%";

	} //end update IB code

	//target CPT or CET modes
	if ((drug_sets[active_drug_set_index].cpt_active == 1)||((drug_sets[active_drug_set_index].IB_active==0)&&(drug_sets[active_drug_set_index].cet_active ==1))) {
		document.getElementById("displayvolume").innerHTML = Math.round(drug_sets[active_drug_set_index].volinf[Math.floor(time_in_s)]*10)/10;
		var i;
		if (drug_sets[active_drug_set_index].inf_rate_mls > 0) {
			if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag==1) {
				document.getElementById("prompt_msg2").innerHTML = "Current target: " + drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected + drug_sets[active_drug_set_index].conc_units + "/ml";
			} else {
				document.getElementById("prompt_msg2").innerHTML = "Current target: " + drug_sets[active_drug_set_index].desired + drug_sets[active_drug_set_index].conc_units + "/ml";
			}
			document.getElementById("infusiondescriptor").innerHTML = "Running at " + drug_sets[active_drug_set_index].inf_rate_mls + "ml/h (" + Math.round(drug_sets[active_drug_set_index].inf_rate_permass*drug_sets[active_drug_set_index].inf_rate_permass_dp)/drug_sets[active_drug_set_index].inf_rate_permass_dp + drug_sets[active_drug_set_index].inf_rate_permass_unit + ")";
			
			document.getElementById("top_infrate").style.display = "inline-block";
			document.getElementById("infrate").innerHTML = drug_sets[active_drug_set_index].inf_rate_mls;
			document.getElementById("status").innerHTML = "";
		} else { //inf rate = 0
			
			document.getElementById("top_infrate").style.display = "none";

			if (time_in_s<drug_sets[active_drug_set_index].cet_lockdowntime) {
				if (drug_sets[active_drug_set_index].cet_bolus>0) {
					document.getElementById("prompt_msg2").innerHTML = "Last bolus given: " + drug_sets[active_drug_set_index].cet_bolus + drug_sets[active_drug_set_index].infused_units + " at " + converttime(document.querySelector(".schemecet").getAttribute("data-time")*1);
				} else { //otherwise bug if desired CET goes down
					if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag==1) {
						document.getElementById("prompt_msg2").innerHTML = "Current target: " + drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected + drug_sets[active_drug_set_index].conc_units + "/ml";
					} else {
						document.getElementById("prompt_msg2").innerHTML = "Current target: " + drug_sets[active_drug_set_index].desired + drug_sets[active_drug_set_index].conc_units + "/ml";
					}
				}
			}
			document.getElementById("status").innerHTML = "";
			document.getElementById("infusiondescriptor").innerHTML = "Infusion temporarily paused";	
		}

		historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]");
		var i;

		if (drug_sets[active_drug_set_index].historyarray.length>0) {
			i = drug_sets[active_drug_set_index].historyarray.findIndex((element)=>element[0]>time_in_s);
			if (i>0) {
				temp_time = Math.round(drug_sets[active_drug_set_index].historyarray[i][0] - time_in_s);
				if ((temp_time<60) && (drug_sets[active_drug_set_index].historyarray[i][1]>0)) { //1min near next infusion rate
					if (user_hide == 0) {
						document.getElementById("warning").style.display = "flex";
						if (ringactive == 0) ringbell(temp_time*1000/simspeed);
						//console.log(temp_time);
						alert_api(1);
					} else {
						alert_api(0);
					}

					//if (ticker_active == 0) {
							temp_message = "Infuse at " + Math.round(drug_sets[active_drug_set_index].historyarray[i][1]*3600/drug_sets[active_drug_set_index].infusate_concentration*10)/10 + "ml/h";
							document.getElementById("warningcounter").innerHTML = temp_time + "s";
							document.getElementById("warningprompt").innerHTML = temp_message;
					//} else {
					//	document.getElementById("warningcounter").innerHTML = temp_time + "s";
					//	document.getElementById("warningprompt").innerHTML = "Bolus: " + document.getElementById("PP_bolus_display").innerHTML + "mg";
					//	document.getElementById("tickerleft").style.background = "linear-gradient(112deg, rgb(238 238 238) 45%, rgb(239 23 17) 45%)";
					//	document.getElementById("progressinside").style.background = "rgb(239 23 17)";
					//}

					if (temp_time<5) {
						if ((notificationallowed == 1) && (notificationactive == 1)) {
							showNotification(document.getElementById("warningprompt").innerText);
						}
					} 

				} else {
					document.getElementById("warning").style.display = "none";
					alert_api(0);
				}
			} else { //hence i<0, or =-1, means not found, means current time exceeds last element of historyarray
					document.getElementById("warning").style.display = "none";
					alert_api(0);
					//redefine i as the length
					i = drug_sets[active_drug_set_index].historyarray.length;
			}
		}

		temp_time1 = Math.round(time_in_s - prior);
		if ((temp_time<20)||(temp_time1<8)) {
			if (!document.getElementById("top_infrate").classList.contains("warningborder")) document.getElementById("top_infrate").classList.add("warningborder");
		} else {
			document.getElementById("top_infrate").classList.remove("warningborder");
		}
		//if (temp_time1 < 10) {
		//	document.getElementById("top_infrate").classList.remove("warningborder");	
			//if (!document.getElementById("top_infrate").classList.contains("blueshadow")) document.getElementById("top_infrate").classList.add("blueshadow");
		//}
		//document.getElementById("temptimedisplay").innerHTML= temp_time + " / " + temp_time1;

		prior = drug_sets[active_drug_set_index].historyarray[i-1][0]*1;

		//next = historyarray[i][0]*1;

		//if (Math.abs(Math.round(time_in_s - next)) < 60) { // when next is near, so that no need read DOM many times
			for (j=1; j<historydivs.length; j++) { // j=1 is because first element is the CPT title
				if (historydivs[j].getAttribute("data-time")*1==prior) { //current infusing
					historydivs[j].classList.add("grey");
					historydivs[j].classList.remove("next");
					historydivs[j].classList.remove("past");
				} else if (historydivs[j].getAttribute("data-time")*1<prior) { //past history
					historydivs[j].classList.add("past");
					historydivs[j].classList.remove("grey");
					historydivs[j].classList.remove("next");
				} else {
					historydivs[j].classList.add("next");
					historydivs[j].classList.remove("grey");
					historydivs[j].classList.remove("past");
				}
			}
		//}
	} //end cpt-cet active

	if (drug_sets[active_drug_set_index].manualmode_active == 1) {

		alert_api(0);

		document.getElementById("displayvolume").innerHTML = Math.round(drug_sets[active_drug_set_index].volinf[Math.floor(time_in_s)]*10)/10;
		if (drug_sets[active_drug_set_index].inf_rate_mls>0) {
			
			document.getElementById("infusiondescriptor").innerHTML = " at " + drug_sets[active_drug_set_index].inf_rate_mls + "ml/h (" + Math.round(drug_sets[active_drug_set_index].inf_rate_mls*drug_sets[active_drug_set_index].infusate_concentration*drug_sets[active_drug_set_index].inf_rate_permass_factor/mass*drug_sets[active_drug_set_index].inf_rate_permass_dp)/drug_sets[active_drug_set_index].inf_rate_permass_dp + drug_sets[active_drug_set_index].inf_rate_permass_unit + ")";
			document.getElementById("top_infrate").style.display = "inline-block";
			document.getElementById("infrate").innerHTML = drug_sets[active_drug_set_index].inf_rate_mls;
		} else {
			document.getElementById("infusiondescriptor").innerHTML = "";
			document.getElementById("top_infrate").style.display = "none";
		}
	}

	if (drug_sets[active_drug_set_index].firstrun == -1) {
		document.getElementById("prompt_msg2").innerHTML = "Current rate";
		document.getElementById("status").innerHTML = "";
		document.getElementById("infusiondescriptor").innerHTML = "Waiting to start";
		document.getElementById("displayvolume").innerHTML = "0";
		document.getElementById("top_infrate").style.display = "none";
		document.getElementById("historywrapper").innerHTML = "";
	}
	//copy historywrapper text to another wrapper for widescreen
	document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;
}


function userhide() {
	setTimeout(function(){user_hide=0},10000); //hide for 10seconds
}

function alert_api(x) {
	if (x == 0) {
		clearInterval(alertinterval_vibrate);
		alertinterval_vibrate = null;
		clearInterval(alertinterval_sound);
		alertinterval_sound = null;
	} else if (x == 1) {
		if (alert_vibrate_on == 1) {
			if (!alertinterval_vibrate) alertinterval_vibrate = setInterval("window.navigator.vibrate(500)", 3000);
		} else {
			clearInterval(alertinterval_vibrate);
			alertinterval_vibrate = null;
		}
		if (alert_sound_on ==1) {
			if (!alertinterval_sound) alertinterval_sound = setInterval("alert_sound_object.play()", 3000);
		} else {
			clearInterval(alertinterval_sound);
			alertinterval_sound = null;
		}
	}
}


function processhistory() {
	var working_clock = Math.floor(time_in_s);
	var temp_history = "";
	var temp_div = document.createElement("div");
	temp_div.innerHTML = drug_sets[active_drug_set_index].historytext;
	var temp_node = temp_div.querySelectorAll("[data-time]");

	if (temp_node.length>0) {
		temp_history = temp_node[0].outerHTML;
		for (i=1; i<temp_node.length; i++) {
			if (temp_node[i].getAttribute("data-time")*1 <= working_clock) {
				temp_history = temp_history.concat(temp_node[i].outerHTML);
			}
		}
		drug_sets[active_drug_set_index].historytexts.push([working_clock, temp_history]);
	}
	
}

function displaymodalhistory() {
	
	var temp_history = "";
	for (i=0; i<drug_sets[active_drug_set_index].historytexts.length; i++) {
		temp_history = temp_history.concat(drug_sets[active_drug_set_index].historytexts[i][1]);
	}
	document.getElementById("modalHistorytext").innerHTML = temp_history;
	setmodal("modalHistory");
}

function converttime(relativeclock) {
	var outputstring = "";
	var h = Math.floor(relativeclock/(60*60));
	var m = Math.floor(relativeclock%(60*60)/60);
	var s = Math.floor(relativeclock%60);
	if (relativeclock<60) {
		return s + "s";
	} else if (relativeclock>=60 && relativeclock<3600) {
		return m + "m " + s + "s";
	} else if (relativeclock>=3600) {
		return h + "h " + m + "m " + s + "s";
	}
}



function swapCetCodeForFentanyl() {

}
function displayCorrectedChartFentanyl(correction) {
	for (i=0; i<myChart.data.datasets[2].data.length; i++) {
    myChart.data.datasets[2].data[i].y *= correction;
	}
	for (i=0; i<myChart.data.datasets[3].data.length; i++) {
    myChart.data.datasets[3].data[i].y *= correction;
	}
}
function getinfusionrate(x,ind) {
	return Math.round(drug_sets[ind].cpt_rates_real[Math.floor(x)]*3600/drug_sets[ind].infusate_concentration*10)/10;
}
function getcp(x,ind) {
	y = Math.floor(x);
	if (drug_sets[ind].cpt_cp[y]==undefined) {
		return undefined;
	} else {
		z = drug_sets[ind].cpt_cp[y][0] + drug_sets[ind].cpt_cp[y][1] + drug_sets[ind].cpt_cp[y][2];
		return z;
	}
}
function getce(x,ind) {
	y = Math.floor(x);
	if (drug_sets[ind].cpt_ce[y]==undefined) {
		return undefined;
	} else {
		z = drug_sets[ind].cpt_ce[y][0] + drug_sets[ind].cpt_ce[y][1] + drug_sets[ind].cpt_ce[y][2] + drug_sets[ind].cpt_ce[y][3];
		return z;	
	}
}
function runinfusion2() {

	drug_sets[0].inf_rate_mls = getinfusionrate(time_in_s,0);
	//volume_infused = volume_infused + inf_rate_mls/3600;
	//pump_rate_in_amt = cpt_rates_real[Math.floor(time_in_s)];
	//inf_rate_mgperkg = inf_rate_mls*10/mass;
	drug_sets[0].inf_rate_permass = drug_sets[0].inf_rate_mls*drug_sets[0].infusate_concentration*drug_sets[0].inf_rate_permass_factor/mass;

	//p_state[1] = p_state[1] * l1 + p_coef[1] * pump_rate_in_amt * (1 - l1);
	//p_state[2] = p_state[2] * l2 + p_coef[2] * pump_rate_in_amt * (1 - l2);
	//p_state[3] = p_state[3] * l3 + p_coef[3] * pump_rate_in_amt * (1 - l3);

	//e_state[1] = e_state[1] * l1 + e_coef[1] * pump_rate_in_amt * (1 - l1);
	//e_state[2] = e_state[2] * l2 + e_coef[2] * pump_rate_in_amt * (1 - l2);
	//e_state[3] = e_state[3] * l3 + e_coef[3] * pump_rate_in_amt * (1 - l3);
	//e_state[4] = e_state[4] * l4 + e_coef[4] * pump_rate_in_amt * (1 - l4);


	result = Math.round(getcp(time_in_s,0)*100)/100;
	result_e = Math.round(getce(time_in_s,0)*100)/100;
	//result = p_state[1]+p_state[2]+p_state[3];
	//result_e = e_state[1]+e_state[2]+e_state[3]+e_state[4];
	displayresult(result, result_e);
	//if (Math.floor(time_in_s)%10 == 0) {
	//	var corX = Math.round(Math.floor(time_in_s)/60*100)/100;
	//	chartAddData(myChart, {x:corX, y:result}, {x:corX, y:result_e});
	//}
}




function runinfusion_complex() {
	
	if (drug_sets[active_drug_set_index].running > -1) {
		drug_sets[active_drug_set_index].inf_rate_mls = getinfusionrate(time_in_s,active_drug_set_index);
		drug_sets[active_drug_set_index].inf_rate_permass = drug_sets[active_drug_set_index].inf_rate_mls*drug_sets[active_drug_set_index].infusate_concentration*drug_sets[active_drug_set_index].inf_rate_permass_factor/mass;
		result = Math.round(getcp(time_in_s,active_drug_set_index)*10)/10;
		result_e = Math.round(getce(time_in_s,active_drug_set_index)*10)/10;
	
		displayresult(result,result_e) ;
	} else {
		displayresult(0,0);
	}
	//document.getElementById("cp_propo").innerHTML = result;
	//document.getElementById("ce_propo").innerHTML = result_e;
	//document.getElementById("inf_propo").innerHTML = drug_sets[active_drug_set_index].inf_rate_mls;

	//if (drug_sets[active_drug_set_index].manualmode_active == 1) {
	//	displayresult(result, result_e);
	//}
	
	if (drug_sets.length==2) {
		drug_sets[alt_drug_set_index].inf_rate_mls = getinfusionrate(time_in_s,alt_drug_set_index);
		drug_sets[alt_drug_set_index].inf_rate_permass = drug_sets[alt_drug_set_index].inf_rate_mls*drug_sets[alt_drug_set_index].infusate_concentration*drug_sets[alt_drug_set_index].inf_rate_permass_factor/mass;
		alt_result = Math.round(getcp(time_in_s,alt_drug_set_index)*10)/10;
		alt_result_e = Math.round(getce(time_in_s,alt_drug_set_index)*10)/10;
		//document.getElementById("cp_opioid").innerHTML = alt_result;
		//document.getElementById("ce_opioid").innerHTML = alt_result_e;
		//document.getElementById("inf_opioid").innerHTML = drug_sets[alt_drug_set_index].inf_rate_mls;

		//code to target alt drug imminent rate change
		if (drug_sets[alt_drug_set_index].historyarray.length>0) {
			let nextIndex = drug_sets[alt_drug_set_index].historyarray.findIndex((element)=>element[0]>time_in_s);
			if (nextIndex > 0) {
				difference = drug_sets[alt_drug_set_index].historyarray[nextIndex][0] - time_in_s;
				if (difference < 30) { 
					if (ringbell2active == 0) {
						ringbell2(difference*1000/simspeed);
					}
					//ding twice to alert to alert alt drug change
					if (alert_sound_on == 1) {
						if (alert_sound_on == 1) {
							if (!alert_sound_2) {
								alert_sound_2 = setInterval("alert_sound_object2.play()",3000);	
							}
						}   
						if (alert_vibrate_on == 1) {
							if (!alert_vibrate_2) {
								alert_vibrate_2 = setInterval("window.navigator.vibrate(500)",3000);
							}
						} 
					}
				} else if (difference < 5) {
					if ((notificationallowed == 1) && (notificationactive == 1)) {
						if (drug_sets[alt_drug_set_index].IB_active == 1) {
							tempMessage2 = "Next Bolus: " + drug_sets[alt_drug_set_index].historyarray[nextIndex][2] + drug_sets[alt_drug_set_index].infused_units;
						} else {
							tempMessage2 = "Infuse at " + Math.round(drug_sets[alt_drug_set_index].historyarray[nextIndex][1]*3600/drug_sets[alt_drug_set_index].infusate_concentration*10)/10 + "ml/h";
						}

						showNotification(tempMessage2, alt_drug_set_index);
					}
				} else { // not within 30s window
					if (alert_sound_on == 1)		{clearInterval(alert_sound_2); alert_sound_2 = null;}
					if (alert_vibrate_on == 1) 	{clearInterval(alert_vibrate_2); alert_vibrate_2 = null;}
				}
			} else { // to cater for findIndex not found, returns -1, means it is time is past the last of historyarray of alt
					if (alert_sound_on == 1)		{clearInterval(alert_sound_2); alert_sound_2 = null;}
					if (alert_vibrate_on == 1) 	{clearInterval(alert_vibrate_2); alert_vibrate_2 = null;}
			}
		} else { 
			// to account for alt drug may not be CPT/CET; may be manual etc, off notif at this point
					if (alert_sound_on == 1)		{clearInterval(alert_sound_2); alert_sound_2 = null;}
					if (alert_vibrate_on == 1) 	{clearInterval(alert_vibrate_2); alert_vibrate_2 = null;}
		}
	}
}


function ringbell2(duration2) {
	if (active_drug_set_index == 0) {
		ElBell = document.querySelector(".druglabelcontainer.opioid > .druglabelicon.alert");
	} else {
		ElBell = document.querySelector(".druglabelcontainer.propofol > .druglabelicon.alert");
	}
	if (duration2>30*1000) duration2 = 30*1000;
	
	if (ElBell.classList.contains("hide")) {
		
		ElBell.classList.remove("hide");
		ringbell2active = 1;
		clearTimeout(ringbell2timeout);
		ringbell2timeout = setTimeout(ringbell2timeoutcallback, duration2);
	}
}

function ringbell2timeoutcallback() {
	ElBell = document.querySelector(".druglabelcontainer.opioid > .druglabelicon.alert");
	ElBell2 = document.querySelector(".druglabelcontainer.propofol > .druglabelicon.alert");
	ElBell.classList.add("hide");
	ElBell2.classList.add("hide");
	ringbell2active = 0;
	clearTimeout(ringbell2timeout);
	ringbell2timeout = null;
}

function displayresult(x,y) {
	if (drug_sets[active_drug_set_index].drug_name == "Alfentanil") {
		document.getElementById("cp").innerHTML = Math.round(x);
		document.getElementById("ce").innerHTML = Math.round(y);
	} else {
		document.getElementById("cp").innerHTML = Math.round(x*100)/100;
		document.getElementById("ce").innerHTML = Math.round(y*100)/100;
	}
}

function switchpaedimode(arg) {
	if (arg==0) {
		//paedi mode 0
		document.querySelector(".table-Init").classList.remove("paedimode");
		document.getElementById("row_age_paedimode").style.display = "none";
		document.getElementById("row_PMA_paedimode").style.display = "none";
		document.getElementById("row_age_adultmode").style.display = "table-row";
		document.getElementById("paedimode0").classList.add("active");
		document.getElementById("paedimode1").classList.remove("active");
		document.getElementById("select_model_paedi").style.display = "none";
		document.getElementById("select_model").style.display = "block";
		//on or off fentanyl / remifentanil depend on model
		if ((document.getElementById("select_model").value == "Eleveld-Remifentanil") || (document.getElementById("select_model").value == "Minto") || (document.getElementById("select_model").value == "Shafer") || (document.getElementById("select_model").value == "Maitre"))  {
			if (document.getElementById("select_model").value == "Eleveld-Remifentanil") {
				document.getElementById("row_remidilution").style.display = "table-row";
				document.getElementById("row_fendilution").style.display = "none";	
				document.getElementById("row_fen_weightadjusted").style.display = "none";
				document.getElementById("row_alfendilution").style.display = "none";
				document.getElementById("row_height").style.display = "table-row";
			}
			if (document.getElementById("select_model").value == "Minto") {
				document.getElementById("row_remidilution").style.display = "table-row";
				document.getElementById("row_fendilution").style.display = "none";
				document.getElementById("row_fen_weightadjusted").style.display = "none";
				document.getElementById("row_alfendilution").style.display = "none";	
				document.getElementById("row_height").style.display = "table-row";
			}
			if (document.getElementById("select_model").value == "Shafer") {
				document.getElementById("row_remidilution").style.display = "none";
				document.getElementById("row_alfendilution").style.display = "none";
				document.getElementById("row_fendilution").style.display = "table-row";	
				document.getElementById("row_fen_weightadjusted").style.display = "none";
				document.getElementById("row_fen_weightadjusted").style.display = "table-row";
				document.getElementById("row_height").style.display = "none";
			}
			if (document.getElementById("select_model").value == "Maitre") {
				document.getElementById("row_remidilution").style.display = "none";
				document.getElementById("row_fendilution").style.display = "none";
				document.getElementById("row_alfendilution").style.display = "table-row";	
				document.getElementById("row_height").style.display = "none";
			}
		} else {
			//not fentanyl or remi
			document.getElementById("row_alfendilution").style.display = "none";
			document.getElementById("row_remidilution").style.display = "none";
			document.getElementById("row_fendilution").style.display = "none";
			document.getElementById("row_fen_weightadjusted").style.display = "none";
			document.getElementById("row_height").style.display = "table-row";
			document.getElementById("row_fen_weightadjusted").style.display = "none";
			if (document.getElementById("select_model").value == "Eleveld") {
				document.getElementById("row_eleveldopioid").style.display = "table-row";	
			} else {
				document.getElementById("row_eleveldopioid").style.display = "none";	
			}
			

		}
		document.getElementById("rescuebuttons").style.display = "block";
		paedi_mode = 0;
	} else {
		//paedi mode 1
		document.querySelector(".table-Init").classList.add("paedimode");
		document.getElementById("row_age_paedimode").style.display = "table-row";
		if (document.getElementById("select_model_paedi").value == "Eleveld") {
			document.getElementById("row_PMA_paedimode").style.display = "table-row";
		} else {
			document.getElementById("row_PMA_paedimode").style.display = "none";
		}
		document.getElementById("row_age_adultmode").style.display = "none";
		document.getElementById("paedimode0").classList.remove("active");
		document.getElementById("paedimode1").classList.add("active");
		document.getElementById("select_model_paedi").style.display = "block";
		document.getElementById("select_model").style.display = "none";
		//off fentanyl changes
			document.getElementById("row_gender").style.display = "table-row";
			document.getElementById("row_height").style.display = "table-row";
			document.getElementById("row_fendilution").style.display = "none";
			document.getElementById("row_fen_weightadjusted").style.display = "none";
			document.getElementById("row_alfendilution").style.display = "none";
		//on or off remi depend on model paedi
		if (document.getElementById("select_model_paedi").value == "Eleveld-Remifentanil") {
			document.getElementById("row_PMA_paedimode").style.display = "none";
			document.getElementById("row_remidilution").style.display = "table-row";
		}
		if (document.getElementById("select_model_paedi").value == "Eleveld") {
				document.getElementById("row_eleveldopioid").style.display = "table-row";	
			} else {
				document.getElementById("row_eleveldopioid").style.display = "none";	
			}
		document.getElementById("rescuebuttons").style.display = "none";
		paedi_mode = 1;
	}


		El6 = document.getElementById("btn_initProceed");


		El6.classList.add("disabled");
		El6.removeEventListener("click", toPageTwo);
}


//who growth validation
//z score calculated by : ((BMI/M)^L - 1) / (S * L)

function sendToValidate(arg) {
	El1 = document.getElementById("valRightContainer1");
	El2 = document.getElementById("valRightContainer2");
	El3 = document.getElementById("valCard");
	El7 = document.getElementById("valLeft");
	El8 = document.getElementById("patientLeft");
	El9 = document.getElementById("patientRightUp");
	El10 = document.getElementById("patientRightDown");
	Elproceed = document.getElementById("btn_initProceed");
	if (paedi_mode==0) {
		age = document.getElementById("inputAge").value*1;
	} else {
		ageunit = document.getElementById("select_age_unit").value;
		if (ageunit == "d") {
			age = document.getElementById("inputAgePaedi").value*1 / 365;
		} else if (ageunit == "w") {
			age = document.getElementById("inputAgePaedi").value*1 / 52;
		} else if (ageunit == "m") {
			age = document.getElementById("inputAgePaedi").value*1 / 12;
		} else if (ageunit == "y") {
			age = document.getElementById("inputAgePaedi").value*1;
		}
		if (age <= 0.5) {
			document.getElementById("PMA_entry").style.display = "inline-block";
			document.getElementById("PMA_explanation").style.display = "none";
		} else if (age > 0.5) {
			document.getElementById("PMA_entry").style.display = "none";
			document.getElementById("PMA_explanation").style.display = "inline-block";
		}
	}
	weight = document.getElementById("inputBW").value*1;
	height = document.getElementById("inputBH").value*1;
	debounce = (arg == 0) ? 500 : 0; //debounce duration function for timeoutVal
	if (document.getElementById("select_gender").value === "Male") {
		gender = 0;
	} else {
		gender = 1;
	}
	if (gender == 0) {
		ibw = 45.4 + 0.89 * (height - 152.4) + 4.5;
	} else {
		ibw = 45.4 + 0.89 * (height - 152.4);
	}
	AdjBW = ibw + 0.4 * (weight - ibw);

	if (paedi_mode == 0) {
		if ((document.getElementById("select_model").value === "Minto") || (document.getElementById("select_model").value === "Eleveld-Remifentanil")) {
			document.getElementById("row_remidilution").style.display = "table-row";
		} else {
			document.getElementById("row_remidilution").style.display = "none";
		}
		if (document.getElementById("select_model").value == "Eleveld") {
			document.getElementById("row_eleveldopioid").style.display = "table-row";	
		} else {
			document.getElementById("row_eleveldopioid").style.display = "none";	
		}
	} else { //paedi mode 1
		if (document.getElementById("select_model_paedi").value === "Eleveld-Remifentanil") {
			document.getElementById("row_remidilution").style.display = "table-row";
		} else {
			document.getElementById("row_remidilution").style.display = "none";
		}
		if ((document.getElementById("select_model_paedi").value == "Eleveld")||(document.getElementById("select_model_paedi").value == "Complex")) {
			document.getElementById("row_PMA_paedimode").style.display = "table-row";
		} else {
			document.getElementById("row_PMA_paedimode").style.display = "none";
		}
		if (document.getElementById("select_model_paedi").value == "Eleveld") {
			document.getElementById("row_eleveldopioid").style.display = "table-row";	
		} else {
			document.getElementById("row_eleveldopioid").style.display = "none";	
		}
	}
	if (paedi_mode == 0) {
		if (document.getElementById("select_model").value === "Shafer") {
		
			document.getElementById("row_gender").style.display = "none";
			document.getElementById("row_height").style.display = "none";
			document.getElementById("row_fendilution").style.display = "table-row";
			document.getElementById("row_fen_weightadjusted").style.display = "table-row";
		} else {
			document.getElementById("row_fendilution").style.display = "none";
			document.getElementById("row_fen_weightadjusted").style.display = "none";
		} 
		if (document.getElementById("select_model").value === "Maitre") {
			document.getElementById("row_gender").style.display = "none";
			document.getElementById("row_height").style.display = "none";
			document.getElementById("row_alfendilution").style.display = "table-row";
		} else {
			document.getElementById("row_alfendilution").style.display = "none";
			
		}
	}
	if ((paedi_mode == 0) && (document.getElementById("select_model").value != "Shafer") && (document.getElementById("select_model").value != "Maitre")) {
			document.getElementById("row_gender").style.display = "table-row";
			document.getElementById("row_height").style.display = "table-row";
	}
	conditions = (age<0 || age>=100) || (weight<=0 || weight>=200);
	if (conditions)	{
		clearTimeout(timeoutVal);
		El1.classList.remove("valClose");
		El2.classList.add("valClose");
		El3.classList.remove("active");
		
		El7.innerHTML = "";
		El8.innerHTML = "";
		El9.innerHTML = "";
		El10.innerHTML = "";
		Elproceed.classList.add("disabled");
		Elproceed.removeEventListener("click", toPageTwo);
	} else {
		clearTimeout(timeoutVal);
		Elproceed.classList.remove("disabled");
		Elproceed.addEventListener("click", toPageTwo);
		El1.classList.add("valClose");
		El2.classList.remove("valClose");
		El3.classList.add("active");		
		if (age>=18) {
			if (gender == 0) {
				El7.innerHTML = arrBodyIcons[2][1];
			} else {
				El7.innerHTML = arrBodyIcons[3][1];
			}
		} else if (age>=3) {
			El7.innerHTML = arrBodyIcons[1][1];
		} else if (age>=0) {
			El7.innerHTML = arrBodyIcons[0][1];
		} else {
			El7.innerHTML = "";
		}
		El8.innerHTML = El7.innerHTML;
		timeoutVal = setTimeout(function(){
			validateData(age, gender, weight, height, arg);		
		}, debounce);
	}
}


function toPageOne() {
  setTimeout(function(){setmodal("modalInitial")},200);
  document.getElementById("modalScreen2").classList.remove("fadein");
  document.getElementById("modalScreen2content").classList.remove("open");

		El6 = document.getElementById("btn_initProceed");
		El6.classList.add("disabled");
		El6.removeEventListener("click", toPageTwo);

	if (document.getElementById("rescuebuttons").style.display=="none") {
		document.getElementById("rescuebuttons").style.display="block";
	}
}

function toPageTwo() {
	if (myChart == undefined) {
		dynamicLoad();
		createCharts();
	}
	text = validateData(age, gender, weight, height, 1);	
	if (text != undefined) {
		if ((paedi_mode==0) && (bmi>=35) && ((document.getElementById("select_model").value == "Marsh") || (document.getElementById("select_model").value == "Schnider"))) {
			text = "<div style='font-size:0.8rem'>" + text + `<br><b>Alert</b>: Errors may occur when using TCI models such as Marsh and Schnider in obesity with BMI>=35. To improve model performance, 
			using adjusted body weight instead of total body weight can reduce predictive errors. 
			Also, the infusion doses may be erroneously high in severely obese (BMI>42 for males, BMI>37 for females) when using the Schnider 
			model due to the inaccurate lean body mass calculated by the James formula. 
			It is recommended to use adjusted body weight (Adj.BW) instead of total body weight (TBW) in TCI calculations.
			<table style="margin:1rem auto;width:50%">
			<tr class="fr"><td>TBW:</td><td>${weight}</td></tr>
			<tr><td>IBW:</td><td>${Math.round(ibw*10)/10}</td></tr>
			<tr><td>Adj.BW: </td><td>${Math.round(AdjBW*10)/10}</td></tr>
			</table>
			</div>
			<div><a class="button muted right" style="border-color:red" onclick="adjustBW(0);hidewarningmodal();">Keep using TBW</a>
			<a class="button invert" onclick="adjustBW(1);hidewarningmodal();">Use Adj.BW</a><div>
				`;
			displayWarning("Warning",text);
		} else {

			displayWarning("Warning",text + `<br><br>Please check if the data entered is correct; otherwise edit the patient information before proceeding.
				<br><br><div><a class="button muted right" onclick="hidewarningmodal()">OK</a></div>
				`);
		}
	}
	if (initsubmit()==0) {
		//alter the age thing here:
		El9 = document.getElementById("patientRightUp");
		El10 = document.getElementById("patientRightDown");
		if (paedi_mode == 0) {
			El9.innerHTML = "Age: " + age + "years, " + document.getElementById("select_gender").value + "<br> BW: " + weight + "kg";
		} else {
			if (document.getElementById("inputPMA").value*1>0) {
				El9.innerHTML = "Age: " + document.getElementById("inputAgePaedi").value + ageunit + " (PMA: " + document.getElementById("inputPMA").value*1 + "w) " + ", " + document.getElementById("select_gender").value + "<br> BW: " + weight + "kg";
			} else {
				El9.innerHTML = "Age: " + document.getElementById("inputAgePaedi").value + ageunit + ", " + document.getElementById("select_gender").value + "<br> BW: " + weight + "kg";
			}
		}
		if (height>0) {El9.innerHTML = El9.innerHTML.concat(", BH: " + height + "cm")} else {};
		El10.innerHTML = document.getElementById("valRightContainer2").innerHTML;
		
		toPageTwoTransition();
		document.getElementById("rescuebuttons").style.display="none";
		loadoptions();
		if (complex_mode==0) applyoptions();
	} else {
		El6 = document.getElementById("btn_initProceed");
		El6.classList.add("disabled");
		El6.removeEventListener("click", toPageTwo);
	}
}

function toPageTwoTransition() {
  setTimeout(function(){setmodal("modalScreen2")},200);
  document.getElementById("modalInitial").classList.remove("fadein");
  document.getElementById("modalInitialcontent").classList.remove("open");
}

function pageTwoFunction(arg) {
	if (arg == undefined) {
		//arg undefined means reset
		document.getElementById("page2maxrate").classList.remove("show");
		setTimeout(function() {
				document.getElementById("page2cpt").classList.remove("active");
				document.getElementById("page2cet").classList.remove("active");
		},210)

		setTimeout(function() {
			document.getElementById("page2intro").classList.remove("hide");
			document.getElementById("page2cpt").classList.remove("hide");
		  document.getElementById("page2cet").classList.remove("hide");
		  document.getElementById("page2manual").classList.remove("hide");
		  document.getElementById("page2IB").classList.remove("hide");
		},420)

	  
	} else {
	  if (arg == 0) {
	      document.getElementById("page2cpt").classList.add("active");
	      document.getElementById("page2cet").classList.add("hide");
	      document.getElementById("page2manual").classList.add("hide");
	      document.getElementById("page2IB").classList.add("hide");
	      //set the button action
	      document.getElementById("page2proceed").removeEventListener('click', cetevent);
	      document.getElementById("page2proceed").addEventListener('click', cptevent);
	  }
	  if (arg == 1) {
	      document.getElementById("page2cet").classList.add("active");
	      document.getElementById("page2cpt").classList.add("hide");
	      document.getElementById("page2manual").classList.add("hide");
	      document.getElementById("page2IB").classList.add("hide");
	      document.getElementById("page2proceed").addEventListener('click', cetevent);
	      document.getElementById("page2proceed").removeEventListener('click', cptevent);
	  }
	  if (optionsarray[2][0] == 1) {
	  	document.getElementById("page2selectmaintenance").value = "0";
	  } else if (optionsarray[2][1] == 1) {
	  	document.getElementById("page2selectmaintenance").value = "1";
	  } else if (optionsarray[2][2] == 1) {
	  	document.getElementById("page2selectmaintenance").value = "2";
	  }
	  document.getElementById("page2intro").classList.add("hide");
	  setTimeout(function() {
	  document.getElementById("page2maxrate").classList.add("show");
	  },210);
	}
}

function sendToUpdateMax(input) {
	input = input *1;
	if (input == 0) {
		maxtext = "Flash: assume bolus given instantaneously. Ideal for manual rapid bolus.";
	} else if (input == 300) {
		maxtext = "Set syringe pump rate to 300ml/h to deliver programmed bolus. Note: slow bolus rate causes slower onset.";
	} else if (input == 400) {
		maxtext = "Set syringe pump rate to 400ml/h to deliver programmed bolus. Note: slow bolus rate causes slower onset.";
	} else if (input == 500) {
		maxtext = "Set syringe pump rate to 500ml/h to deliver programmed bolus. Note: slow bolus rate causes slower onset."
	} else if (input == 600) {
		maxtext = "For programmed bolus: set your syringe pump rate to 600ml/h to deliver the calculated volume.";
	} else if (input == 700) {
		maxtext = "For programmed bolus: set your syringe pump rate to 700ml/h to deliver the calculated volume.";
	} else if (input == 800) {
		maxtext = "For programmed bolus: set your syringe pump rate to 800ml/h to deliver the calculated volume.";
	} else if (input == 900) {
		maxtext = "For programmed bolus: set your syringe pump rate to 900ml/h to deliver the calculated volume.";
	} else if (input == 1000) {
		maxtext = "For programmed bolus: set your syringe pump rate to 1000ml/h to deliver the calculated volume.";
	} else if (input == 1100) {
		maxtext = "For programmed bolus: set your syringe pump rate to 1100ml/h to deliver the calculated volume.";
	} else if (input == 1200) {
		maxtext = "For programmed bolus: set your syringe pump rate to 1200ml/h to deliver the calculated volume.";
	} else if (input == 1300) {
		maxtext = "For programmed bolus: set your syringe pump rate to 1300ml/h to deliver the calculated volume.";
	} else if (input == 1400) {
		maxtext = "For programmed bolus: set your syringe pump rate to 1400ml/h to deliver the calculated volume.";
	} else if (input == 1500) {
		maxtext = "For programmed bolus: set your syringe pump rate to 1500ml/h to deliver the calculated volume.";
	}
	document.getElementById("page2bolustext").innerText = maxtext;
}

function cptevent() {
	initcpt();
	drug_sets[0].max_rate = document.getElementById("page2selectmaxrate").value *1;
	x = document.getElementById("page2selectmaintenance").value * 1;
	document.getElementById("select_threshold").value = x;
	applyoptions();
	hideallmodal();document.getElementById('card_controlpanel').style.display='block';
	updateBolusSpeedOptions()
}

function cetevent() {
	initcet();
	drug_sets[0].max_rate = document.getElementById("page2selectmaxrate").value *1;
	x = document.getElementById("page2selectmaintenance").value * 1;
	document.getElementById("select_threshold").value = x;
	applyoptions();
	hideallmodal();document.getElementById('card_controlpanel').style.display='block';
	updateBolusSpeedOptions()
}

function updateBolusSpeedOptions() {
	if (drug_sets[active_drug_set_index].max_rate != undefined) {
		document.getElementById("select_bolusspeed").value = drug_sets[active_drug_set_index].max_rate;
		document.getElementById("option_bolusspeed_row").style.display = "table-row";
		document.getElementById("option_threshold_row").classList.remove("fr");
	} else {
		document.getElementById("option_bolusspeed_row").style.display = "none";
		document.getElementById("option_threshold_row").classList.add("fr");
	}
}

function applybolusspeed() {
	value = document.getElementById("select_bolusspeed").value * 1;
	drug_sets[active_drug_set_index].max_rate = value;
}

function toLoadTransition() {
  setTimeout(function(){setmodal("modalLoad")},200);
  document.getElementById("modalInitial").classList.remove("fadein");
  document.getElementById("modalInitialcontent").classList.remove("open");
}

function toPageOneFromLoad() {
	setTimeout(function(){
		setmodal("modalInitial");
		//reset styles
	  	document.getElementById("modalLoadDescription").innerHTML = "Select a SIM-FILE to load:";
	  	document.getElementById("modalLoadDescription").style.display = "none";
	  	document.getElementById("fileselection").style.display = "none";
	  	document.getElementById("loadfile_container").style.display = "none";
	  	document.getElementById("modalLoadHugeButtons").style.display = "block";
	  	document.getElementById("modalLoadImportButtons").style.display = "none";
	  	document.getElementById("modalLoadNormalButtons").style.display = "none";
	  	document.getElementById("loadfile_container").innerHTML = "";
	  	document.getElementById("btn_load_import").classList.add("disabled");
	  	document.getElementById("loadfile_container").classList.remove("compress");
	  	document.getElementById("loadfile_container").classList.remove("collapse");
	},200);
  	document.getElementById("modalLoad").classList.remove("fadein");
  	document.getElementById("modalLoadcontent").classList.remove("open");
  	document.getElementById("rescuebuttons").style.display="block";

  	if (manageFileListState == 1) {
  		manageFileList();
  	}
}

function displayDisclaimer() {
	text = "<span style='font-size:85%'>SimTIVA is a simulation program for educational purposes only. The information presented is not medical advice. All reasonable precautions have been taken to verify the calculations in this app. However, the accuracy cannot be guaranteed and the information is provided without warranty of any kind, either express or implied. The responsibility for the use and interpretation of the information provided lies with the user. In no event shall the author be liable for damages arising from using this app. Do not proceed if you do not agree to this disclaimer.</span>"
	displayWarning("Disclaimer", text);
}

function displayAbout() {
	//obsolete
	text = "<h1>SimTIVA is a computer simulation program to simulate delivery of total intravenous anaesthesia (TIVA) using a target-controlled infusion (TCI) pump. This progressive web app (PWA) is designed for use on smartphones, tablets and computers.</h1><br><b>Written by Terence Luk, 2024</b>. This work is licensed under GNU General Public License v3.0. Read more about the project <a href='https://simtiva.blogspot.com/2021/10/welcome.html' target='_blank'>here</a>, or contact me on <a href='https://twitter.com/simtiva_app' target='_blank'>Twitter/X</a> for ideas, suggestions or comments. Your advice is greatly appreciated!<br><br>This is an open source project and the source code is published on <a href='https://github.com/luktinghin/simtiva/' target='_blank'>GitHub</a>.<br>Last updated 1/11/2024 (V4.85) Build 122.<br><br>The purposes are: (1) <i> To simulate TCI/TIVA for educational purposes</i>, and (2) <i>Potentially, to help deliver TCI/TIVA in a low resource setting with no TCI pumps available.</i><br>Coding is done in Javascript. The code to the mathematical calculations are based on 'STANPUMP', which is freely available from the link below. The pharmacokinetic models available in this program are Marsh, Schnider, Paedfusor and Eleveld for propofol, and Minto and Eleveld for remifentanil. For instructions on using this app, visit the 'Help' page. For documentation of the pharmacological details, visit the 'Documentation' page.<br><br>Contact us via our <a href='https://simtiva.blogspot.com/p/feedback.html' target='_blank'>blog</a> page; or get in touch on <a href='https://twitter.com/simtiva_app' target='_blank'>Twitter/X</a>.<div class='' style='width:100%; margin-top:2rem; margin-bottom:1rem; background:rgba(128,128,128,0.4); border-bottom:1px solid #198964; font-weight:bold'>Licenses & Legal</div><div class=''>Acknowledgments: this project is made possible with the following-<br><br><b>STANPUMP by Steven L. Shafer</b><br>Freely available at <a href='http://opentci.org/code/stanpump' target='_blank'>OpenTCI-STANPUMP</a><br><br><b>Chart.js</b><br><a href='http://chartjs.org'  target='_blank'>Chart.js</a> is open source and available under the MIT license.<br><br><b>Font Awesome Free</b><br>SIL OFL 1.1 license applies to all icons packaged as font files. <a href='https://github.com/FortAwesome/Font-Awesome' target='_blank'>Source/License</a><br><br><b>WHO Child Growth Standards</b><br>Copyright World Health Organization (WHO), 2021; all rights reserved. Growth chart data (weight & length for age and BMI) from <a href='https://www.who.int/tools/child-growth-standards/standards' target='_blank'>WHO website</a> used for data validation. Computational method using LMS method described <a href='https://www.who.int/growthref/computation.pdf' target='_blank'>here</a>.<br><br><b>LZ-String</b><br>Copyright Pieroxy (2013) under MIT license, from <a href='https://pieroxy.net/blog/pages/lz-string/index.html' target='_blank'>pieroxy.net</a>, used for Javascript string compression.<br><br><span style='color:#ccc'>Source Sans font: Copyright 2010, 2012 Adobe Systems Incorporated (http://www.adobe.com/), with Reserved Font Name 'Source'. All Rights Reserved. Source is a trademark of Adobe Systems Incorporated in the United States and/or other countries, licensed under the SIL Open Font License, Version 1.1 (http://scripts.sil.org/OFL).</span></div><div style='padding-top:1rem;'></div>";
	displayWarning("About", text);
}

function displayAbout2() {
	let El1 = document.createElement("div");
	El1.classList.add("customAboutContainer");
	El1.innerHTML = `
		<div class="customAboutItem" id="customAbout1" onclick="
				document.querySelector('.customAboutText').style.display = 'block';
				document.querySelector('.customAboutQuickGuideText').style.display = 'none';
				document.getElementById('customAbout1').classList.add('active');
				document.getElementById('customAbout2').classList.remove('active');
				document.querySelector('.customAboutContainer').classList.add('active');
			">
			<span class="customAboutIcon"><i class="fas fa-info-circle fa-fw"></i></span>
			<span>About</span>
		</div>
		<div class="customAboutItem" id="customAbout2" onclick="
				document.querySelector('.customAboutText').style.display = 'none';
				document.querySelector('.customAboutQuickGuideText').style.display = 'block';
				document.getElementById('customAbout1').classList.remove('active');
				document.getElementById('customAbout2').classList.add('active');
				document.querySelector('.customAboutContainer').classList.add('active');
			">
			<span class="customAboutIcon"><i class="fas fa-question fa-fw"></i></span>
			<span>Quick Start Guide</span>
		</div>
		<div class="customAboutItem" onclick="
				window.open('https://manual.simtiva.app', '_blank');
				document.getElementById('customAbout1').classList.remove('active');
				document.getElementById('customAbout2').classList.remove('active');
				document.querySelector('.customAboutQuickGuideText').style.display = 'none';
				document.querySelector('.customAboutText').style.display = 'none';
				document.querySelector('.customAboutContainer').classList.remove('active');

			">
			<span class="customAboutIcon"><i class="fas fa-book-open fa-fw"></i></span>
			<span>User Manual</span>
		</div>
	`;
	let El0 = document.createElement("div");
	let ElAbout = document.createElement("div");
	ElAbout.classList.add("customAboutText");
	ElAbout.innerHTML = `<h1>SimTIVA is a computer simulation program to simulate delivery of total intravenous anaesthesia (TIVA) using a target-controlled infusion (TCI) pump. This progressive web app (PWA) is designed for use on smartphones, tablets and computers.</h1>
		<br><b>Written by Terence Luk, 2024</b>. This work is licensed under GNU General Public License v3.0. Read more about the project <a href='https://simtiva.blogspot.com/2021/10/welcome.html' target='_blank'>here</a>, or contact me on <a href='https://twitter.com/simtiva_app' target='_blank'>Twitter/X</a> for ideas, suggestions or comments. Your advice is greatly appreciated!
		<br><br>Contributed by:
		<br> - George Zhong (@propofoldream)
		<br> - Eric Ng 
		<br> - David Lam
		<br><br>This is an open source project and the source code is published on <a href='https://github.com/luktinghin/simtiva/' target='_blank'>GitHub</a>.
		<br>Last updated 1/11/2024 (V4.85) Build 122.
		<br><br>The purposes are: (1) <i> To simulate TCI/TIVA for educational purposes</i>, and (2) <i>Potentially, to help deliver TCI/TIVA in a low resource setting with no TCI pumps available.</i>
		<br>Coding is done in Javascript. The code to the mathematical calculations are based on 'STANPUMP', which is freely available from the link below. The pharmacokinetic models available in this program are Marsh, Schnider, Paedfusor and Eleveld for propofol, and Minto and Eleveld for remifentanil. For instructions on using this app, visit the 'Help' page. For documentation of the pharmacological details, visit the 'Documentation' page.
		<br><br>Contact us via our <a href='https://simtiva.blogspot.com/p/feedback.html' target='_blank'>blog</a> page; or get in touch on <a href='https://twitter.com/simtiva_app' target='_blank'>Twitter/X</a>.<div class='' style='width:100%; margin-top:2rem; margin-bottom:1rem; background:rgba(128,128,128,0.4); border-bottom:1px solid #198964; font-weight:bold'>Licenses & Legal</div><div class=''>Acknowledgments: this project is made possible with the following-<br><br><b>STANPUMP by Steven L. Shafer</b><br>Freely available at <a href='http://opentci.org/code/stanpump' target='_blank'>OpenTCI-STANPUMP</a><br><br><b>Chart.js</b><br><a href='http://chartjs.org'  target='_blank'>Chart.js</a> is open source and available under the MIT license.<br><br><b>Font Awesome Free</b><br>SIL OFL 1.1 license applies to all icons packaged as font files. <a href='https://github.com/FortAwesome/Font-Awesome' target='_blank'>Source/License</a><br><br><b>WHO Child Growth Standards</b><br>Copyright World Health Organization (WHO), 2021; all rights reserved. Growth chart data (weight & length for age and BMI) from <a href='https://www.who.int/tools/child-growth-standards/standards' target='_blank'>WHO website</a> used for data validation. Computational method using LMS method described <a href='https://www.who.int/growthref/computation.pdf' target='_blank'>here</a>.<br><br><b>LZ-String</b><br>Copyright Pieroxy (2013) under MIT license, from <a href='https://pieroxy.net/blog/pages/lz-string/index.html' target='_blank'>pieroxy.net</a>, used for Javascript string compression.<br><br><span style='color:#ccc'>Source Sans font: Copyright 2010, 2012 Adobe Systems Incorporated (http://www.adobe.com/), with Reserved Font Name 'Source'. All Rights Reserved. Source is a trademark of Adobe Systems Incorporated in the United States and/or other countries, licensed under the SIL Open Font License, Version 1.1 (http://scripts.sil.org/OFL).</span></div><div style='padding-top:1rem;'></div>`;
	let ElQuickGuide = document.createElement("div");
	ElQuickGuide.classList.add("customAboutQuickGuideText");
	ElQuickGuide.innerHTML = `
	<b>Instructions for use</b>
					<br>This is the Quick Start Guide. For details, please visit the separate User Manual.
					<br><b>1.</b> Enter patient data on the first screen you see.
					<br><b>2.</b> Choose a model
					<br><b>3.</b> There are four modes: CP targeting, CE targeting, manual infusion, and intermittent bolus.
					<br><b>4.</b> In addition, there is a Complex mode, which allows simultaneous simulation of propofol and an opioid.
					<br>
					<br><b>CP/CE targeting mode</b>
					<br><b>1.</b> Enter desired CP/CE target.
					<br><img src="preview.gif" style="width:100%; max-width:600px" loading="lazy">
					<br><b>2.</b> While you are entering your target, a <span style="color:blue">blue</span> preview box will appear. This will guide your initial bolus and infusion rate.
					<br><b>3.</b> Press Start, when your syringe pump setup is ready to go.
					<br><b>4.</b> The predicted CP and CE will appear on top part of the screen. The 'Graph' section will preview CP/CE of the infusion regimen and the 'Scheme' section will guide you through the next rate changes to achieve and maintain your desired target concentration.
					<br><img src="preview2.gif" style="width:100%; max-width:600px" loading="lazy">
					<br><b>5.</b> When the next rate change is imminent, a <span style="color:red">red</span> reminder box will appear to notify you of the changes. Make the necessary change on your syringe pump.
					<br>
					<br><b>Intermittent Bolus Mode</b>
					<br>In some settings, such as a short case in a remote location, or in low resource environment, it may not be possible to use any syringe pump at all. With the intermittent bolus mode, a series of repeated small manual boluses are generated, to simulate a target-controlled infusion as close as possible. The accuracy of the repeated intermittent manual bolus scheme is affected by the fluctuation of CE.
					<br>
					<br><b>Complex mode</b>
					<br>In this mode, you may run two-drug simulations simultaneously. For each drug, the functions for CP or CE targeting, manual infusion, or intermittent bolus mode are preserved. In addition, you may explore the pharmacodynamic (PD) interaction between propofol and opioid, as propofol and opioid demonstrate intense synergism. Probability of tolerance to laryngoscopy (PTOL) is used as a measure of potency of propofol-opioid combination. Isobologram charts illustrate the propofol-opioid combinations to achieve the same pharmacodynamic effect.
					<br>
					<br><b>NB.</b> For the <span style="color:blue">blue</span> preview box, dosage recommendations may be slightly inaccurate because TCI is time-dependent: the moment you enter the target concentration, the preview starts to calculate; but this moment lags behind the moment of real target delivery when you click the 'Update Cpt/Cet' button.
	`
	let ElBanner = document.createElement("div");
	ElBanner.innerHTML = `
		<div class="customAboutBanner">
			<div class='banneritem' style='background:#afcae1'>
					<div class='bannericon' style='background:#5270AD'><img class='' src="pwa.webp"></div>
					<div class='bannertextouter'>
						<div class='bannertextinner1'>Progressive <b>Web App</b></div>
						<div class='bannertextinner2'>SimTIVA is a TIVA/TCI simulator that runs on a web browser</div>
					</div>
			</div>
			<div class='banneritem' style='background:#c8c0f2'>
				<div class='bannericon' style='background:#6e43be'><img class='' src="offermoney.webp"></div>
					<div class='bannertextouter'>
						<div class='bannertextinner1'><b>Free</b> & Open Source</div>
						<div class='bannertextinner2'>Actively developed project hosted on GitHub</div>
					</div>
			</div>
			<div class='banneritem' style='background:#a5d0a8'>
				<div class='bannericon' style='background:#356038'><img class='' src="users.webp"></div>
					<div class='bannertextouter'>
						<div class='bannertextinner1'><b>3623</b> Monthly Users</div>
						<div class='bannertextinner2'>Total 11084 simulations performed in October 2024</div>
					</div>
		</div>
	`
	El0.appendChild(El1);
	El0.appendChild(ElAbout);
	El0.appendChild(ElQuickGuide);
	El0.appendChild(ElBanner);
	displayWarning("Help", El0.innerHTML);

}

function ptolwarning() {
	if (PD_mode > 1) {
    displayWarning("PD interaction in paediatrics","PTOL and NSRI information provided is based on Bouillon interaction model. The study population in that study was an adult population. There is paucity of data on remifentanil pharmacodynamics in children, especially in young children. The dataset in remifentanil pharmacodynamics provided by the Eleveld-remifentanil model is also extrapolated from adult data. <br> <br> <b> Interpret the PTOL and NSRI data with caution.");
	} else {
		displayWarning("Estimated BIS","Estimated BIS value calculated based on age-dependent Ce50 values (Eleveld BJA 2018). This was validated in a PK-PD study which included children (Vellinga BJA 2021).");
	}
}

function displayloadabout() {
	text = "The sim-files are saved automatically when simulation is running. To save with a file name for easier access later on, simply type a file name in the share/save popup module. All the data in the sim-files are stored locally on your device via the local-storage API and will never be accessed or stored by our server in any way.<br><br><b>Exporting sim-file database</b><br>You may export local sim-files by clicking 'Manage' -> 'Export all'. This will generate a .CSV (comma-seperated values) file which you may access with a spreadsheet program or with SimTIVA.<br><br><b>Importing database (.CSV)</b><br>You may import a previously exported database file by choosing this option in the 'Load' menu. The database will be loaded and the sim-files stored in the database can be accessed.";
	displayWarning("About Sim-Files", text);
}

function displayIBabout() {
	temp_1 = Math.round((1+IB_swing)*1000)/100*10;
	temp_2 = Math.round((1-IB_swing)*1000)/100*10;
	text = `<div>This mode generates a scheme of repeated intermittent boluses to achieve and maintain a desired CE target. The bolus amount and time interval will vary according to the CE target as well as the anticipated level of fluctuation of CE - described as peak/trough levels in this app.</div>
	<div>The peak/trough levels represent the magnitude of fluctuation for Ce. For example, when set to ±${IB_swing*100}%, the Ce will reach a maximum of ${temp_1}% of target and then drop to a minimum of ${temp_2}% of target. At the trough level, another bolus will be administered, and the cycle repeats.
	</div>`;
	displayWarning("Intermittent Bolus Mode", text);	
}

function validateData(age,sex,weight,height,arg) {
	isAbnormal = 0;
	isAbnormalText = "";
	bmi = weight / Math.pow((height/100),2);
	bmiConverted = bmiConvert(bmi, age, sex);
	document.getElementById("valCard").classList.remove("obese");
	if (height>0) {
		if (bmi>0 && bmi<99) {
			document.getElementById("bmiDisplay").innerHTML = Math.round(bmi * 10)/10;
		} else {
			document.getElementById("bmiDisplay").innerHTML = "N/A";
			document.getElementById("bmiForAgeDisplay").innerHTML = "";
		}
		if (Array.isArray(bmiConverted)) {
			bmiZ = bmiConverted[0];
			bmiCentile = bmiConverted[1];
			if ((bmiCentile >= 0) && (bmiCentile <= 100)) {
				document.getElementById("bmiForAgeDisplay").innerHTML = " (Z-score: " + Math.round(bmiZ * 10)/10 + ", Percentile: " + bmiCentile + ")";
			} else {
				document.getElementById("bmiForAgeDisplay").innerHTML = "";
			}
			if (bmiZ < -2) {
				isAbnormal = 1;
				isAbnormalText = "Patient is thin based on BMI-for-age.";
			} else if ((bmiZ>=2) && (bmiZ<3)) {
				isAbnormal = 1;
				isAbnormalText = "Patient is overweight based on BMI-for-age.";
			} else if ((bmiZ>=3)) {
				isAbnormal = 1;
				isAbnormalText = "Patient is obese based on BMI-for-age.";
			}
		} else if (bmiConverted == -1) {
			document.getElementById("bmiForAgeDisplay").innerHTML = " (not validated as age<2)";
		} else if (bmiConverted == 0) {
			if (bmi<18.5) { 
				document.getElementById("bmiForAgeDisplay").innerHTML = " (underweight)";
			} else if ((bmi>=25) && (bmi<29.9)) {
				document.getElementById("bmiForAgeDisplay").innerHTML = " (overweight)";
			} else if ((bmi>30) && (bmi<35)) {
				document.getElementById("bmiForAgeDisplay").innerHTML = " (obese)";
			} else if (bmi>=35) {
				document.getElementById("bmiForAgeDisplay").innerHTML = " (obese)";
				isAbnormal = 1;
				isAbnormalText = "Patient is obese with BMI>=35.";
				document.getElementById("valCard").classList.add("obese");
			} else {
				document.getElementById("bmiForAgeDisplay").innerHTML = " (normal)";
			}
		}
	} else {
			document.getElementById("bmiDisplay").innerHTML = "N/A";
			document.getElementById("bmiForAgeDisplay").innerHTML = "";
	}

	weightConverted = weightConvert(weight, age, sex);
	if (Array.isArray(weightConverted)) {
		weightZ = weightConverted[0];
		weightCentile = weightConverted[1];
		document.getElementById("wfaDisplay").innerHTML = "Z-score: " + Math.round(weightZ *10)/10 + ", Percentile: " + weightCentile;
		document.getElementById("wfaDiv").style.display = "block";
		if (weightCentile<5) {
			isAbnormal = 1;
			isAbnormalText = isAbnormalText.concat("<br>" + "Weight for age less than 5th percentile.");
		} else if (weightCentile>95) {
			isAbnormal = 1;
			isAbnormalText = isAbnormalText.concat("<br>" + "Weight for age larger than 95th percentile.");
		}
	} else {
		document.getElementById("wfaDiv").style.display = "none";
		document.getElementById("wfaDisplay").innerHTML = "";
	}

	if ((isAbnormal == 1) && (arg == 0)) {

	}
	if ((isAbnormal == 1) && (arg == 1)) {
		return isAbnormalText;
	}
}

function adjustBW(arg) {
	if (arg == 1) {
		useAdjBW = 1;	
		initsubmit();
		drug_sets[0].modeltext = drug_sets[0].modeltext + "<br>Adjusted BW was used in calculations.";
		document.getElementById("modeldescription").innerHTML = drug_sets[0].modeltext;
		document.getElementById("patientRightDown").innerHTML = "BMI: " + Math.round(bmi*10)/10 + ", Adjusted BW: " + Math.round(AdjBW*10/10) + "kg";
		document.getElementById("bw").innerHTML = mass + "kg (Adj.BW:" + Math.round(AdjBW*10)/10 + "kg)";
	} else {
		useAdjBW = 0;
		initsubmit();
		document.getElementById("modeldescription").innerHTML = drug_sets[0].modeltext;
		document.getElementById("bw").innerHTML = mass + "kg";
	}
}

function bmiConvert(bmi, age, sex) {
	
	age = Math.round(age);
	arrBMI = [
				[
					[], //age 0
					[], //age 1
					[-0.6187,16.0189,0.07785], //age 2
					[-0.3101,15.5988,0.07931], //age 3
					[-0.3622,15.3326,0.08238], //age 4
					[-0.7387,15.2641,0.08390], //age 5
					[-1.0144,15.3169,0.08711], //age 6
					[-1.2656,15.5019,0.09103], //age 7
					[-1.4790,15.7606,0.09567], //age 8
					[-1.6433,16.0781,0.10082], //age 9
					[-1.7468,16.4807,0.10609], //age 10
					[-1.7873,16.9850,0.11110], //age 11
					[-1.7719,17.5877,0.11556], //age 12
					[-1.7102,18.2955,0.11925], //age 13
					[-1.6116,19.0701,0.12212], //age 14
					[-1.4848,19.8367,0.12428], //age 15
					[-1.3403,20.5521,0.12591], //age 16
					[-1.1826,21.1925,0.12726], //age 17
				], //space for males
				[ //for females
					[], //age 0
					[], //age 1
					[-0.5684,15.6881,0.08454], //age 2
					[-0.5684,15.3968,0.08535], //age 3
					[-0.5684,15.2602,0.09168], //age 4
					[-0.8886,15.2441,0.09692], //age 5
					[-1.0956,15.2760,0.10241], //age 6
					[-1.2693,15.4211,0.10792], //age 7
					[-1.3966,15.7107,0.11335], //age 8
					[-1.4688,16.1358,0.11859], //age 9
					[-1.4859,16.6612,0.12346], //age 10
					[-1.4567,17.3044,0.12782], //age 11
					[-1.3945,18.0630,0.13158], //age 12
					[-1.3121,18.8675,0.13469], //age 13
					[-1.2186,19.6240,0.13719], //age 14
					[-1.1232,20.2595,0.13920], //age 15
					[-1.0290,20.7344,0.14082], //age 16
					[-0.9344,21.0587,0.14219], //age 17
				]
			];

	if ((age>=2) && (age<=17)) {

		L = arrBMI[sex][age][0];
		M = arrBMI[sex][age][1];
		S = arrBMI[sex][age][2];

		Z = (Math.pow((bmi/M),L) - 1) / (S*L);
		centile = Math.round(normalcdf(Z)*100);
		return [Z, centile];
	} else if (age<2) {
		return -1; // -1 is the escape code for age below 2
	} else {
		return 0; // 0 is the escape code for age above 17
	}

 
}

function weightConvert(weight,age,sex) {
	//add code for age under 2, young infant, finer data
	if ((age>=0)&&(age<=2)) {
		//ref who weight for age boys & girls  0-5y
		ageInMonths = Math.round(age*12);
		arrWEIGHTmonths = [
			[//boys
					[ 0.3487, 3.3464,0.14602],//age0
					[ 0.2297, 4.4709,0.13395],//age1
					[ 0.1970, 5.5675,0.12385],//age2
					[ 0.1738, 6.3762,0.11727],//age3
					[ 0.1553, 7.0023,0.11316],//age4
					[ 0.1395, 7.5105,0.11080],//age5
					[ 0.1257, 7.9340,0.10958],//age6
					[ 0.1134, 8.2970,0.10902],//age7
					[ 0.1021, 8.6151,0.10882],//age8
					[ 0.0917, 8.9014,0.10881],//age9
					[ 0.0820, 9.1649,0.10891],//age10
					[ 0.0730, 9.4122,0.10906],//age11
					[ 0.0644, 9.6479,0.10925],//age12
					[ 0.0563, 9.8749,0.10949],//age13
					[ 0.0487,10.0953,0.10976],//age14
					[ 0.0413,10.3108,0.11007],//age15
					[ 0.0343,10.5228,0.11041],//age16
					[ 0.0275,10.7319,0.11079],//age17
					[ 0.0211,10.9385,0.11119],//age18
					[ 0.0148,11.1430,0.11164],//age19
					[ 0.0087,11.3462,0.11211],//age20
					[ 0.0029,11.5486,0.11261],//age21
					[-0.0028,11.7504,0.11314],//age22
					[-0.0083,11.9514,0.11369],//age23
					[-0.0137,12.1515,0.11426]//age24
			],
			[//girls
					[ 0.3809,3.2322,0.14171],//age0
					[ 0.1714,4.1873,0.13724],//age1
					[ 0.0962,5.1282,0.13],//age2
					[ 0.0402,5.8458,0.12619],//age3
					[-0.0050,6.4237,0.12402],//age4
					[-0.0430,6.8985,0.12274],//age5
					[-0.0756,7.2970,0.12204],//age6
					[-0.1039,7.6422,0.12178],//age7
					[-0.1288,7.9487,0.12181],//age8
					[-0.1507,8.2254,0.12199],//age9
					[-0.1700,8.4800,0.12223],//age10
					[-0.1872,8.7192,0.12247],//age11
					[-0.2024,8.9481,0.12268],//age12
					[-0.2158,9.1699,0.12283],//age13
					[-0.2278,9.3870,0.12294],//age14
					[-0.2384,9.6008,0.12299],//age15
					[-0.2478,9.8124,0.12303],//age16
					[-0.2562,10.0226,0.12306],//age17
					[-0.2637,10.2315,0.12309],//age18
					[-0.2703,10.4393,0.12315],//age19
					[-0.2762,10.6464,0.12323],//age20
					[-0.2815,10.8534,0.12335],//age21
					[-0.2862,11.0608,0.12350],//age22
					[-0.2903,11.2688,0.12369],//age23
					[-0.2941,11.4775,0.12390]//age24
			]
		];
		L = arrWEIGHTmonths[sex][ageInMonths][0];
		M = arrWEIGHTmonths[sex][ageInMonths][1];
		S = arrWEIGHTmonths[sex][ageInMonths][2];
	} else if ((age>2)&&(age<=10)) {
		age = Math.round(age);
		arrWEIGHT = [
			//who growth standards weight for age for boys / girls 5-10years old
					[ //boys
						[],
						[0.0563,9.8749,0.10949],//age1
						[-0.0189,12.3502,0.11485],//age2
						[-0.0729,14.5113,0.12168],//age3
						[-0.1165,16.5150,0.12819],//age4
						[-0.2026,18.5057,0.12988],//age5
						[-0.3285,20.7052,0.13402],//age6
						[-0.4499,23.0968,0.13797],//age7
						[-0.5564,25.6332,0.14407],//age8
						[-0.6393,28.3459,0.15319],//age9
						[-0.6764,31.1586,0.16305],//age10
					],
					[ //girls
					
						[],
						[-0.2158,9.1699,0.12283],//age 1 (13 months)
						[-0.2975,11.6864,0.12414],//age 2 (25months)
						[-0.3216,14.0385,0.12988],//age 3 (37 monnths)
						[-0.3374,16.2511,0.13968],//age 4 (49 months, birth -5y)
						[-0.4681,18.2579,0.14295],//age 5 (61 months for 5-10y table)
						[-0.5043,20.3377,0.14955],//age 6
						[-0.5372,22.5762,0.1561],//age 7
						[-0.5647,25.271,0.16237],//age 8
						[-0.5847,28.4901,0.16809],//age 9
						[-0.5958,31.8578,0.17262] //age10 (120 months)
					
					]
				];

		L = arrWEIGHT[sex][age][0];
		M = arrWEIGHT[sex][age][1];
		S = arrWEIGHT[sex][age][2];
	}

	if ((age>=0) && (age<=10)) {
		Z = (Math.pow((weight/M),L) - 1) / (S*L);
		centile = Math.round(normalcdf(Z)*100);
		return [Z, centile];
	} else if (age<1) {
		return -1; // -1 is the escape code for age below 0
	} else {
		return 0; // 0 is the escape code for age above 10
	}
}

	function normalcdf(X){   //HASTINGS.  MAX ERROR = .000001, https://www.math.ucla.edu/~tom/distributions/normal.html
		var T=1/(1+.2316419*Math.abs(X));
		var D=.3989423*Math.exp(-X*X/2);
		var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
		if (X>0) {
			Prob=1-Prob
		}
		return Prob
	}  

function init_rescue(input_uid,external_flag) {
	loadoptions();
	hideallmodal();
	hidemodal("modalInitial");
	hidemodal("modalLoad");
	document.getElementById("card_cpt0").classList.add("hide");
	document.getElementById("card_cet0").classList.add("hide");
	document.getElementById("card_cet0_new").classList.add("hide");
	document.getElementById("card_infusion0").classList.add("hide");
	document.getElementById("status").innerHTML = "";
	if (external_flag) {
		tempFileIndex = importDataArray.findIndex((elem) => elem[0]==input_uid);
		if (tempFileIndex != -1) {
			parseobject(null,true,importDataArray[tempFileIndex][1]);	
		}
	} else {
		parseobject(input_uid);
	}
	var timestamp_lastdatadate = new Date(input_uid*1000 + time_in_s*1000);
	var timestamp_lastdatatime = timestamp_lastdatadate.toLocaleDateString() + " " + timestamp_lastdatadate.toLocaleTimeString();
	setTimeout(function() {
					document.getElementById("card_reanimate").style.display = "block";
					document.getElementById("timestamp_lastdata").innerHTML = timestamp_lastdatatime;
	},500);
}

function displayModalOptions() {
	loadoptions();
	temp_unit = document.getElementById("select_defaultrateunit").options[1].textContent;
	temp_unit_bolus = document.getElementById("select_defaultbolusunit").options[0].textContent;
	text = `
		<table class="table-control">
					<tr class="fr" id=""><td>Unit <i class="far fa-question-circle tooltip2"><span class="tooltiptext">Preferred secondary unit for propofol infusion.</span></i></td>
						<td>
							<select id="" onchange="document.getElementById('select_unit').value=this.value">
								<option value="mgh" ${(optionsarray[0][0]==1) ? 'selected':''}>mg/kg/h</option>
								<option value="mcgmin" ${(optionsarray[0][1]==1) ? 'selected':''}>mcg/kg/m</option>
							</select>
						</td>
					<tr class="" id=""><td>Default rate unit  <i class="far fa-question-circle tooltip background"><span class="tooltiptext" style="width:160px">Unit for entering manual mode infusion rate, e.g. "ml/h" vs "mg/kg/h" (or appropriate units)</span></i></td>
						<td>
							<select id="" onchange="document.getElementById('select_defaultrateunit').value=this.value">
								<option value="mlh" ${(optionsarray_infusionunit[0][0]==1) ? 'selected':''}>ml/h</option>
								<option value="unitkgtime" ${(optionsarray_infusionunit[0][0]!=1) ? 'selected':''}>${temp_unit}</option>
							</select>
						</td>
					</tr>
					<tr class="" id=""><td>Default bolus unit  <i class="far fa-question-circle tooltip background"><span class="tooltiptext" style="width:160px">Unit for entering manual mode bolus, e.g. "mg" vs "mg/kg" vs "ml" (or appropriate units)</span></i></td>
						<td>
							<select id="" onchange="document.getElementById('select_defaultbolusunit').value=this.value">
								<option value="mg" ${(optionsarray_infusionunit[1][0]==1) ? 'selected':''}>${temp_unit_bolus}</option>
								<option value="mgkg" ${(optionsarray_infusionunit[1][1]==1) ? 'selected':''}>${temp_unit_bolus}/kg</option>
								<option value="ml" ${(optionsarray_infusionunit[1][2]==1) ? 'selected':''}>ml</option>
							</select>
						</td>
					</tr>
					<tr id=""><td>Simspeed</td>
						<td>
							<select id="" onchange="document.getElementById('select_simspeed').value=this.value">
								<option value="1 ${(optionsarray[1][0]==1) ? 'selected':''}">1x (Normal)</option>
								<option value="5" ${(optionsarray[1][1]==1) ? 'selected':''}>5x (Fast)</option>
								<option value="25" ${(optionsarray[1][2]==1) ? 'selected':''}>25x (Very fast)</option>
								<option value="50" ${(optionsarray[1][3]==1) ? 'selected':''}>50x (Super fast)</option>
							</select>
						</td>
					</tr>

					<tr id=""><td>Threshold <i class="far fa-question-circle tooltip2"><span class="tooltiptext">Accurate mode: more frequent rate changes for CPT/CET schemes.</span></i></td>
						<td>
							<select id="" onchange="document.getElementById('select_threshold').value=this.value">
								<option value="0" ${(optionsarray[2][0]==1) ? 'selected':''}>Auto</option>
								<option value="1" ${(optionsarray[2][1]==1) ? 'selected':''}>Lazy</option>
								<option value="2" ${(optionsarray[2][2]==1) ? 'selected':''}>Accurate</option> <!--0.13, 0.565-->
							</select>
						</td>
					</tr>
					<tr><td>Wakelock <i class="far fa-question-circle tooltip2"><span class="tooltiptext">Keeps screen on. Android/some desktop devices only.</span></i></td>
						<td>
							<select id="" onchange="document.getElementById('select_wakelock').value=this.value">
								<option value="off" ${(optionsarray[3][0]==1) ? 'selected':''}>Off</option>
								<option value="on" ${(optionsarray[3][1]==1) ? 'selected':''}>On</option>
							</select>
						</td>
					</tr>
					<tr><td>Vibrate</td>
						<td>
							<select id="" onchange="document.getElementById('select_vibrate').value=this.value">
								<option value="off" ${(optionsarray[4][0]==1) ? 'selected':''}>Off</option>
								<option value="on" ${(optionsarray[4][1]==1) ? 'selected':''}>On</option>
							</select>
						</td>
					</tr>
					<tr><td>Sound</td>
						<td>
							<select id="" onchange="document.getElementById('select_sound').value=this.value">
								<option value="off" ${(optionsarray[5][0]==1) ? 'selected':''}>Off</option>
								<option value="on" ${(optionsarray[5][1]==1) ? 'selected':''}>On</option>
							</select>
						</td>
					</tr>

					<tr><td>Notifications</td>
						<td>
							<select id="" onchange="document.getElementById('select_notification').value=this.value">
								<option value="off" ${(optionsarray[6][0]==1) ? 'selected':''}>Off</option>
								<option value="on" ${(optionsarray[6][1]==1) ? 'selected':''}>On</option>
							</select>
						</td>
					</tr>
				</table>
				<a class="button invert" id="" onclick="applyoptions();hidewarningmodal();">Apply</a>
				<a class="button right muted" id="" onclick="loadoptions('default');displayModalOptions();loadoptions();applyoptions();">Reset settings</a>
	`
	displayWarning("Options", text);

}

function togglemenu() {
  document.getElementById("hamburger").classList.toggle("change");
  if (document.getElementById("hamburger").classList.contains("change")) {
    document.getElementById("menu").classList.add("open");
    //document.getElementById("bodywrapper").classList.add("blurry");
    //navscrollable = false;
  } else {
    document.getElementById("menu").classList.remove("open");
    //document.getElementById("bodywrapper").classList.remove("blurry");
    //navscrollable = true;
  }

}

function hide_prompts(object) {
	object.style.display="none";
	if (document.getElementById("prompts_container").classList.contains("expand")) {
		document.getElementById("preview-expand-button").classList.remove("animate2");
		document.getElementById("preview-expand-button").style.display = "none";
		document.getElementById("prompts_container").classList.remove("expand");
		document.getElementById("preview").classList.remove("expand");
		document.getElementById("preview-expand-box").classList.remove("expand");
		document.getElementById("preview-expand-button").innerHTML = `<i class="fas fa-angle-double-down"></i> &nbsp; <span>EXPAND</span>`;
		document.getElementById("preview-expand-button").setAttribute("onclick","displaypreview_expand()");

	}
}

function hideallmodal() {
	//document.getElementById("bodywrapper").classList.remove("blurry");
	if (modal != undefined) {
	  if (modal.id == "modalShare") {
	  	clearInterval(canvasUpdateInterval);
	  	canvasUpdateInterval = null;
	  }
		modalcontent = document.getElementById(modal.id + "content");
	  modal.classList.remove("fadein");
	  modalcontent.classList.remove("open");
	  modal = undefined;

	}
}
function hidemodal(param) {
		if (param == "modalShare") {
	  	clearInterval(canvasUpdateInterval);
	  	canvasUpdateInterval = null;
	  }
	document.getElementById(param + "content").classList.remove("open");
	document.getElementById(param).classList.remove("fadein");
	modal = undefined;
}
function hidewarningmodal() {
  document.getElementById("modalWarning").classList.remove("fadein");
  document.getElementById("modalWarningcontent").classList.remove("open");
}
function setmodal(modalname) {
  modal = document.getElementById(modalname);
  modalcontent = document.getElementById(modalname + "content");
  modal.classList.add("fadein");
  modalcontent.classList.add("open");
  //document.getElementById("bodywrapper").classList.add("blurry");
}

window.onclick = function(event) {
  if ((event.target == modal) && (modal.id != "modalInitial") && (modal.id != "modalScreen2") && (modal.id != "modalLoad")) {
    //document.getElementById("bodywrapper").classList.remove("blurry");

    if (modal.id == "modalShare") {
	  	clearInterval(canvasUpdateInterval);
	  	canvasUpdateInterval = null;
	  }

    modalcontent = document.getElementById(modal.id + "content");
    modal.classList.remove("fadein");
    modalcontent.classList.remove("open");
    modal = undefined;
    
  }
}
document.addEventListener('touchstart', function(event){
  if ((event.target == modal) && (modal.id != "modalInitial") && (modal.id != "modalScreen2") && (modal.id != "modalLoad")) {
    //document.getElementById("bodywrapper").classList.remove("blurry");

    if (modal.id == "modalShare") {
	  	clearInterval(canvasUpdateInterval);
	  	canvasUpdateInterval = null;
	  }
    modalcontent = document.getElementById(modal.id + "content");
    modal.classList.remove("fadein");
    modalcontent.classList.remove("open");
    modal = undefined;
    //document.getElementById("bodywrapper").classList.remove("blurry");
  }
});

function show_graph() {
	document.getElementById("chartwrapper").classList.remove("hide");
	document.getElementById("historywrapper2").classList.remove("open");
	document.getElementById("outputcontainer").classList.remove("showscheme");
	document.getElementById("btn_displayhistory").classList.remove("active");
	document.getElementById("btn_displaychart").classList.add("active");
}
function show_history() {
	document.getElementById("chartwrapper").classList.add("hide");
	document.getElementById("historywrapper2").classList.add("open");
	document.getElementById("outputcontainer").classList.add("showscheme");
	document.getElementById("btn_displayhistory").classList.add("active");
	document.getElementById("btn_displaychart").classList.remove("active");
}
function show_isobologram() {
	document.getElementById("chart2wrapper").classList.remove("hide");
	document.getElementById("legendwrapper").classList.remove("open");
	//document.getElementById("outputcontainer").classList.remove("showscheme");
	document.getElementById("btn_displaylegend").classList.remove("active");
	document.getElementById("btn_displayisobologram").classList.add("active");
}
function show_legend() {
	document.getElementById("chart2wrapper").classList.add("hide");
	document.getElementById("legendwrapper").classList.add("open");
	//document.getElementById("outputcontainer").classList.add("showscheme");
	document.getElementById("btn_displaylegend").classList.add("active");
	document.getElementById("btn_displayisobologram").classList.remove("active");
}



//other options code goes here

function loadoptions(reset) {
	if ((localStorage.getItem("OPTIONS") === null) || (reset == "default")) {
		optionsarray = 
			[
					[1,0],
					[1,0,0,0],
					[1,0,0],
					[1,0],
					[1,0],
					[1,0],
					[1,0]
			];
		localStorage.setItem("OPTIONS",JSON.stringify(optionsarray));
	} else {
		optionsarray = JSON.parse(localStorage.getItem("OPTIONS"));
		if (optionsarray[0].indexOf(1) == 0) {
			//secondaryunit = 0;
			document.getElementById("select_unit").value ="mgh";
		} else if (optionsarray[0].indexOf(1) == 1) {
			//secondaryunit = 1;
			document.getElementById("select_unit").value ="mcgmin";
		}

		if (optionsarray[1].indexOf(1) == 0) {
			simspeed = 1;
		} else if (optionsarray[1].indexOf(1) == 1) {
			simspeed = 5;
		} else if (optionsarray[1].indexOf(1) == 2) {
			simspeed = 25;
		} else if (optionsarray[1].indexOf(1) == 3) {
			simspeed = 50;
		}
		document.getElementById("select_simspeed").value = simspeed;

		if (optionsarray[2].indexOf(1) == 0) {
			cpt_threshold_auto = 1;
			cpt_threshold = 0.05;
			cpt_avgfactor = 0.62;
			document.getElementById("select_threshold").value = 0;
		} else if (optionsarray[2].indexOf(1) == 1) {
			cpt_threshold_auto = 0;
			cpt_threshold = 0.08;
			cpt_avgfactor = 0.667;		
			document.getElementById("select_threshold").value = 1;
		} else if (optionsarray[2].indexOf(1) == 2) {
			cpt_threshold_auto = 0;
			cpt_threshold = 0.05;
			cpt_avgfactor = 0.62;
			document.getElementById("select_threshold").value = 2;
		}

		if (optionsarray[3].indexOf(1) == 0) {
			if (wakeLock) {
				wakeLock.release()
	  			.then(() => {
	    			wakeLock = null;
	  			});
	  		}
	  	document.getElementById("select_wakelock").value="off";
		} else if (optionsarray[3].indexOf(1) == 1) {
			wakeLock = null;
			requestWakeLock();
			document.getElementById("select_wakelock").value="on";
		}

		if (optionsarray[4].indexOf(1) == 0) {
			alert_vibrate_on = 0;
			document.getElementById("select_vibrate").value = "off";
		} else if (optionsarray[4].indexOf(1) == 1) {
			alert_vibrate_on = 1;
			document.getElementById("select_vibrate").value = "on";			
		}

		if (optionsarray[5].indexOf(1) == 0) {
			alert_sound_on = 0;
			document.getElementById("select_sound").value = "off";
		} else if (optionsarray[5].indexOf(1) == 1) {
			alert_sound_on = 1;
			document.getElementById("select_sound").value = "on";			
		}

		if (optionsarray[6].indexOf(1) == 0) {
			document.getElementById("select_notification").value = "off";
			notificationactive = 0;	
		} else if (optionsarray[6].indexOf(1) == 1) {
			document.getElementById("select_notification").value = "on";
			notificationactive = 1;
		}
	}
	if ((localStorage.getItem("OPTIONSINFUSIONUNIT")==null) || (JSON.parse(localStorage.getItem("OPTIONSINFUSIONUNIT")).length!=2) || (reset == "default")) {
		optionsarray_infusionunit = [[1,0],[1,0,0]];
		localStorage.setItem("OPTIONSINFUSIONUNIT",JSON.stringify(optionsarray_infusionunit));
	} else {
		optionsarray_infusionunit = JSON.parse(localStorage.getItem("OPTIONSINFUSIONUNIT"));
		//make a guess for infusion unit
		guessInfusionUnit();
	}	
}

function guessInfusionUnit() {
	let temp_unit = "mg/kg/h";
	let temp_unit_bolus = "mg";
	//first, determine the context. is drug_sets initialized?
	//if yes, use initialized variables.
	//if not, get model name from startscreen.
	if (drug_sets.length == 0) {
		//un-initialized
		if (
			 (paedi_mode == 0 
			  &&
			  (document.getElementById("select_model").value == "Marsh"
			   || document.getElementById("select_model").value == "Schnider"
			   || document.getElementById("select_model").value == "Eleveld"
			   || document.getElementById("select_model").value == "Paedfusor"
			  )
			 ) || (
			  paedi_mode == 1
			  &&
			  (document.getElementById("select_model_paedi").value == "Paedfusor"
			   || document.getElementById("select_model_paedi").value == "Eleveld"
			  )
			 )
			) { // this is propofol
			temp_unit = "mg/kg/h";
			temp_unit_bolus = "mg";
			if (document.getElementById("select_unit").value == "mcgmin") temp_unit = "mcg/kg/m";
		} else if (paedi_mode == 0 && document.getElementById("select_model").value == "Shafer") {
			temp_unit = "mcg/kg/h";
			temp_unit_bolus = "mcg";
		} else if ((paedi_mode == 0 && document.getElementById("select_model").value == "Complex") ||
				   (paedi_mode == 1 && document.getElementById("select_model_paedi").value == "Complex")) {
			//this is complex mode
			//assume this is like propofol
			if (document.getElementById("select_unit").value == "mcgmin") {
				temp_unit = "mcg/kg/m";
			} else {
				temp_unit = "mg/kg/h";
			}
			temp_unit_bolus = "mg";
		} else {
			//all others is mcg/kg/m
			temp_unit = "mcg/kg/m";
			temp_unit_bolus = "mcg";
		}
	} else {
		//this has already been initiated.
		temp_unit = drug_sets[0].inf_rate_permass_unit;
		temp_unit_bolus = drug_sets[0].infused_units;
	}
	//if there's complex mode and see if it's been initiated.
	if (complex_mode == 1 && drug_sets.length>0) {
		temp_unit1 = drug_sets[1].inf_rate_permass_unit;
		temp_unit_bolus1 = "mcg";	
	} else if (complex_mode == 1 && drug_sets.length==0) {
		temp_unit1 = "mcg/kg/m";
		temp_unit_bolus1 = "mcg";
	}
	//get whether mode is ml/h or unit/kg/time mode.
	//write temp_unit to (1) infusion0 box and infusion1 box descriptions, (2) option item of options dialog
	if (optionsarray_infusionunit[0][0] == 1) {
		document.getElementById("select_defaultrateunit").value = "mlh";
		if (complex_mode == 0) {
			document.getElementById("infusionratedescription0").innerHTML = "Infusion rate (ml/h)";
			document.getElementById("select_defaultrateunit").options[1].textContent = temp_unit;	
		} else {
			document.getElementById("infusionratedescription0").innerHTML = "Infusion rate (ml/h)";
			document.getElementById("infusionratedescription1").innerHTML = "Infusion rate (ml/h)";
			if (active_drug_set_index == 0) {
				document.getElementById("select_defaultrateunit").options[1].textContent = temp_unit;	
			} else {
				document.getElementById("select_defaultrateunit").options[1].textContent = temp_unit1;	
			}
		}
	} else {
		//this is unitkgtime
		document.getElementById("select_defaultrateunit").value = "unitkgtime";
		if (complex_mode == 0) {
			document.getElementById("infusionratedescription0").innerHTML = "Infusion rate (" + temp_unit + ")";
			document.getElementById("select_defaultrateunit").options[1].textContent = temp_unit;	
		} else {
			document.getElementById("infusionratedescription0").innerHTML = "Infusion rate (" + temp_unit + ")";
			document.getElementById("infusionratedescription1").innerHTML = "Infusion rate (" + temp_unit1 + ")";
			if (active_drug_set_index == 0) {
				document.getElementById("select_defaultrateunit").options[1].textContent = temp_unit;	
			} else {
				document.getElementById("select_defaultrateunit").options[1].textContent = temp_unit1;	
			}
		}
	}
	//then deal with bolus modes
	if (optionsarray_infusionunit[1][0] == 1) {
		document.getElementById("select_defaultbolusunit").value = "mg";
		if (complex_mode == 0) {
			document.getElementById("bolusdescription0").innerHTML = "Initial bolus (" + temp_unit_bolus + ")";
			document.getElementById("bolusdescriptioncopy0").innerHTML = "Custom bolus (" + temp_unit_bolus + ")";
			document.getElementById("select_defaultbolusunit").options[0].textContent = temp_unit_bolus;
			document.getElementById("select_defaultbolusunit").options[1].textContent = temp_unit_bolus + "/kg";
		} else {
			document.getElementById("bolusdescription0").innerHTML = "Initial bolus (" + temp_unit_bolus + ")";
			document.getElementById("bolusdescriptioncopy0").innerHTML = "Custom bolus (" + temp_unit_bolus + ")";
			document.getElementById("bolusdescription1").innerHTML = "Initial bolus (" + temp_unit_bolus1 + ")";
			document.getElementById("bolusdescriptioncopy1").innerHTML = "Custom bolus (" + temp_unit_bolus1 + ")";
			if (active_drug_set_index == 0) {
				document.getElementById("select_defaultbolusunit").options[0].textContent = temp_unit_bolus;
				document.getElementById("select_defaultbolusunit").options[1].textContent = temp_unit_bolus + "/kg";
			} else {
				document.getElementById("select_defaultbolusunit").options[0].textContent = temp_unit_bolus1;
				document.getElementById("select_defaultbolusunit").options[1].textContent = temp_unit_bolus1 + "/kg";
			}
		}
	} else if (optionsarray_infusionunit[1][1] == 1) {
		document.getElementById("select_defaultbolusunit").value = "mgkg";
		if (complex_mode == 0) {
			document.getElementById("bolusdescription0").innerHTML = "Initial bolus (" + temp_unit_bolus + "/kg)";
			document.getElementById("bolusdescriptioncopy0").innerHTML = "Custom bolus (" + temp_unit_bolus + "/kg)";
			document.getElementById("select_defaultbolusunit").options[0].textContent = temp_unit_bolus;
			document.getElementById("select_defaultbolusunit").options[1].textContent = temp_unit_bolus + "/kg";
		} else {
			document.getElementById("bolusdescription0").innerHTML = "Initial bolus (" + temp_unit_bolus + "/kg)";
			document.getElementById("bolusdescriptioncopy0").innerHTML = "Custom bolus (" + temp_unit_bolus + "/kg)";
			document.getElementById("bolusdescription1").innerHTML = "Initial bolus (" + temp_unit_bolus1 + "/kg)";
			document.getElementById("bolusdescriptioncopy1").innerHTML = "Custom bolus (" + temp_unit_bolus1 + "/kg)";
			if (active_drug_set_index == 0) {
				document.getElementById("select_defaultbolusunit").options[0].textContent = temp_unit_bolus;
				document.getElementById("select_defaultbolusunit").options[1].textContent = temp_unit_bolus + "/kg";
			} else {
				document.getElementById("select_defaultbolusunit").options[0].textContent = temp_unit_bolus1;
				document.getElementById("select_defaultbolusunit").options[1].textContent = temp_unit_bolus1 + "/kg";
			}
		}
	} else {
		document.getElementById("select_defaultbolusunit").value = "ml";
		if (complex_mode == 0) {
			document.getElementById("bolusdescription0").innerHTML = "Initial bolus (ml)";
			document.getElementById("bolusdescriptioncopy0").innerHTML = "Custom bolus (ml)";
			document.getElementById("select_defaultbolusunit").options[0].textContent = temp_unit_bolus;
			document.getElementById("select_defaultbolusunit").options[1].textContent = temp_unit_bolus + "/kg";
		} else {
			document.getElementById("bolusdescription0").innerHTML = "Initial bolus (ml)";
			document.getElementById("bolusdescriptioncopy0").innerHTML = "Custom bolus (ml)";
			document.getElementById("bolusdescription1").innerHTML = "Initial bolus (ml)";
			document.getElementById("bolusdescriptioncopy1").innerHTML = "Custom bolus (ml)";
			if (active_drug_set_index == 0) {
				document.getElementById("select_defaultbolusunit").options[0].textContent = temp_unit_bolus;
				document.getElementById("select_defaultbolusunit").options[1].textContent = temp_unit_bolus + "/kg";
			} else {
				document.getElementById("select_defaultbolusunit").options[0].textContent = temp_unit_bolus1;
				document.getElementById("select_defaultbolusunit").options[1].textContent = temp_unit_bolus1 + "/kg";
			}
		}
	}
}

function applyoptions() {
	//PP_interval = document.getElementById("select_PPinterval").value*1;
	//if (ticker_active == 1) {
	//	deliver_cet(desired);
	//	setTimeout(function(){postprocessing(1);document.getElementById("ticker").style.display = "block";},1100);
	//}
	optionsarray.length = 0; //reset zero
	if (document.getElementById("select_unit").value =="mgh") {
		if (drug_sets.length>0) {
			if (drug_sets[0].drug_name=="Propofol") {
				drug_sets[0].inf_rate_permass_factor = 1;
				drug_sets[0].inf_rate_permass_unit = "mg/kg/h";
				drug_sets[0].inf_rate_permass_dp = 100;
			}
		}
		optionsarray.push([1,0]);
	} else {
		if (drug_sets.length>0) {
			if (drug_sets[0].drug_name=="Propofol") {
				drug_sets[0].inf_rate_permass_factor = 1/60*1000;
				drug_sets[0].inf_rate_permass_unit = "mcg/kg/m";
				drug_sets[0].inf_rate_permass_dp = 1;
			}	
		}
		optionsarray.push([0,1]);
	}
	simspeed = document.getElementById("select_simspeed").value*1;
	if (simspeed == 1) {
		optionsarray.push([1,0,0,0]);
	} else if (simspeed == 5) {
		optionsarray.push([0,1,0,0]);
	} else if (simspeed == 25) {
		optionsarray.push([0,0,1,0]);
	} else if (simspeed == 50) {
		optionsarray.push([0,0,0,1]);
	}

	x = document.getElementById("select_threshold").value * 1;
	if (x==0) {
		cpt_threshold_auto = 1;
		cpt_threshold = 0.05;
		cpt_avgfactor = 0.62;
		optionsarray.push([1,0,0]);
	} else if (x==1) {
		cpt_threshold_auto = 0;
		cpt_threshold = 0.08;
		cpt_avgfactor = 0.667;		
		optionsarray.push([0,1,0]);
	} else if (x==2) {
		cpt_threshold_auto = 0;
		cpt_threshold = 0.05;
		cpt_avgfactor = 0.62;
		optionsarray.push([0,0,1]);
	}

	if (document.getElementById("select_wakelock").value == "off") {
		optionsarray.push([1,0]);
		if (wakeLock) {
			wakeLock.release()
	  			.then(() => {
	    			wakeLock = null;
	  			});
  	}
	} else {
		optionsarray.push([0,1]);
		wakeLock = null;
		requestWakeLock();
	}	

	alert_vibrate_on = (document.getElementById("select_vibrate").value == "off") ? 0 : 1;
	if (alert_vibrate_on == 0) {
		optionsarray.push([1,0]);
		clearInterval(alertinterval_vibrate);
		alertinterval_vibrate = null;
		clearInterval(alert_vibrate_2);
		alert_vibrate_2 = null;
	} else {
		optionsarray.push([0,1]);
	}

	alert_sound_on = (document.getElementById("select_sound").value == "off") ? 0 : 1;
	if (alert_sound_on == 0) {
		optionsarray.push([1,0]);
		clearInterval(alertinterval_sound);
		alertinterval_sound = null;
		clearInterval(alert_sound_2);
		alert_sound_2 = null;
	} else {
		optionsarray.push([0,1]);
	}

	
	notificationactive = (document.getElementById("select_notification").value == "off") ? 0 : 1;
	if (notificationactive == 0) {
		optionsarray.push([1,0]);
	} else {
		askNotificationPermission();
		optionsarray.push([0,1]);
	}
	localStorage.setItem("OPTIONS",JSON.stringify(optionsarray));
	
	if (document.getElementById("select_defaultrateunit").value == "mlh") {
		setInfusionUnit(0);
	} else {
		setInfusionUnit(1);
	}
	if (document.getElementById("select_defaultbolusunit").value == "mg") {
		setBolusUnit(0)
	} else if (document.getElementById("select_defaultbolusunit").value == "mgkg") {
		setBolusUnit(1)
	} else {
		setBolusUnit(2)
	}
	localStorage.setItem("OPTIONSINFUSIONUNIT",JSON.stringify(optionsarray_infusionunit));
}

function activateWakeLock() {

}

function testalert() {
	alert_api(1);
}

function testalertoff() {
	alert_api(0);
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


function ringbell(duration) {
	let El1 = document.querySelector(".topleft");
	if (duration>60*1000) duration = 60*1000;
	if (!El1.classList.contains("notif")) {
		El1.dataOrig = El1.innerHTML;
		El1.classList.add("notif");
		El1.innerHTML = "<i class='fas fa-bell fa-lg'></i>"
		clearTimeout(ringtimeout);
		ringactive = 1;
		ringtimeout = setTimeout(ringtimeoutcallback, duration);
	}
}

function ringtimeoutcallback() {
	let El1 = document.querySelector(".topleft");
				El1.classList.remove("notif");
				El1.innerHTML = El1.dataOrig;
				clearTimeout(ringtimeout);
				ringtimeout = null;
				ringactive = 0;
			
}

function readURL() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const inputString = LZString.decompressFromEncodedURIComponent(urlParams.get("P"));
	if (inputString == "") {
		document.getElementById("viewmsg").innerHTML = "SimTIVA Viewer: No data loaded."
	}
	var object = JSON.parse(inputString);
	console.log(object);
	return object;
}

function readExternal(extString) {
	const inputString = LZString.decompressFromEncodedURIComponent(extString);
	var object = JSON.parse(inputString);
	//console.log(inputString);
	if (typeof object === 'object' &&
    object !== null &&
    !Array.isArray(object)) {
		return object;
	} else {
		return -1;
	}
}

function createfile() { 
	uid = Date.parse(d)/1000;

	if (localStorage.getItem("keys") === null) {
		newkey = new Array();
		newkey.push(uid);
		localStorage.setItem("keys",JSON.stringify(uid));
	} else {
		newkey = JSON.parse(localStorage.getItem("keys"));
		if (typeof newkey == "number") {
			newkey2 = new Array();
			newkey2.push(newkey);
			newkey2.push(uid);
			localStorage.setItem("keys",JSON.stringify(newkey2));
		} else {
			if (!newkey.includes(uid)) {
				newkey.push(uid);
				localStorage.setItem("keys",JSON.stringify(newkey));
			}
		}
	}
	keysarray = new Array();

	localStorage.setItem("lastkey",uid);
	localStorage.setItem(uid + "DATA","");
	localStorage.setItem(uid + "PATIENT","");
	localStorage.setItem(uid + "TIME","0");
}

function loadobject(input_uid) {
	console.log(input_uid);
	if ((localStorage.getItem(input_uid + "DATA") == "") || (localStorage.getItem(input_uid + "PATIENT")=="") || (localStorage.getItem(input_uid + "TIME")*1 == 0)) {
		console.log("error");
		outputobject = -1;
	} else {
		object1 = JSON.parse(localStorage.getItem(input_uid + "PATIENT"));
		object2 = JSON.parse(localStorage.getItem(input_uid + "DATA"));
		object3 = {P_time: localStorage.getItem(input_uid + "TIME")*1};
		outputobject = {
			...object1,
			...object2,
			...object3
		}
	}
	return outputobject;
}

function load() {
	if (myChart == undefined) {
		createCharts();
	}
	toLoadTransition();
}


function loadSourceExt() {
	document.getElementById("rescuebuttons").style.display = "none";
	document.getElementById("modalLoadHugeButtons").style.display = "none";
	document.getElementById("modalLoadImportButtons").style.display = "block";
	document.getElementById("fileselection").style.display = "block";
	document.getElementById("modalLoadDescription").style.display = "inline";
	document.getElementById("modalLoadDescription").innerHTML = "Import from external .CSV file:";
	document.getElementById("loadfile_container").classList.add("collapse");
	document.getElementById("loadfile_container").classList.remove("compress");
	document.getElementById("loadfile_container").style.display = "block";
	document.getElementById("loadfile_container").innerHTML = 
	`
		<div>After loading, the database of external sim-files will appear here.</div>
	`
	//document.getElementById("loadfile_container").style.display = "block";
	//importDialog();
}

function loadSourceLocal() {
	if ((localStorage.getItem("keys") == null) || (JSON.parse(localStorage.getItem("keys")).length == 0)) {
		displayWarning("No saved data", "No previously saved sim-file data.")
	} else {
		generateFileKeys();
		document.getElementById("rescuebuttons").style.display = "none";
		document.getElementById("modalLoadHugeButtons").style.display = "none";
		document.getElementById("fileselection").style.display = "none";
		document.getElementById("modalLoadNormalButtons").style.display = "block";
		document.getElementById("modalLoadDescription").style.display = "inline";
		document.getElementById("loadfile_container").classList.remove("collapse");
		document.getElementById("loadfile_container").classList.remove("compress");
		document.getElementById("loadfile_container").style.display = "block";

		importDataArray.length = 0;

	}

}

function rescue() {
	if (localStorage.getItem("lastkey") == null) {
		displayWarning("No saved data", "No previously saved sim-file data.")
	} else {
		x = localStorage.getItem("lastkey");
		init_rescue(x);
		document.getElementById("rescuebuttons").style.display = "none";
	}
}

function loadSelectedFile() {
	hideallmodal();
	parseobject(selected_uid);
}

function generateFileKeys() {
	document.getElementById("loadfile_container").innerHTML = "";
	tempKeysArray = JSON.parse(localStorage.getItem("keys"));
	renderFileList(tempKeysArray);
}

function renderImportList() {
	let El1 = document.getElementById("loadfile_container");
	for (impcountr = 0; impcountr<importDataArray.length; impcountr++) {
		createfileelement(importDataArray[impcountr][1],importDataArray[impcountr][0],El1);	
	}
	let tempFileBoxes = document.getElementsByClassName("file_outerbox");

	if (tempFileBoxes.length == 1) {
		document.querySelector(".file_outerbox").classList.add("active");
		selected_uid = document.querySelector(".file_outerbox").id;
	} else {
		for (i=0; i<tempFileBoxes.length; i++) {
			tempFileBoxes[i].classList.remove("active");
			tempFileBoxes[i].addEventListener('click', function () {
				selectFileBox(this.id);
			});
		}
		tempFileBoxes[0].classList.add("active");
		selected_uid = tempFileBoxes[0].id;
	}
}

function renderFileList(inputkeysarray) {
	let El1 = document.getElementById("loadfile_container");

	if (typeof inputkeysarray == "number") { //this means only 1 key, not an array of keys
			tempObject = loadobject(inputkeysarray);
			if (tempObject != -1) createfileelement(tempObject,inputkeysarray,El1);
	} else {
		for (i=inputkeysarray.length-1; i>=0; i--) {
			tempObject = loadobject(inputkeysarray[i]);
			if (tempObject != -1) { //-1 is escape code for error in parsing
				createfileelement(tempObject,inputkeysarray[i],El1);
			} else {
				console.log("error occured; UID " + inputkeysarray[i]);
			}
		}
	}

	let tempFileBoxes = document.getElementsByClassName("file_outerbox");

	if (tempFileBoxes.length == 1) {
		document.querySelector(".file_outerbox").classList.add("active");
		selected_uid = document.querySelector(".file_outerbox").id;
	} else {
		for (i=0; i<tempFileBoxes.length; i++) {
			tempFileBoxes[i].classList.remove("active");
			tempFileBoxes[i].addEventListener('click', function () {
				selectFileBox(this.id);
			});
		}
		tempFileBoxes[0].classList.add("active");
		selected_uid = tempFileBoxes[0].id;
	}
}


	function createfileelement(tempObject,tempId,parentEl) {
		
		//console.log(tempObject);

		//render correct age
		if (typeof tempObject.P_patient[6] == "number") {
			tempAge = tempObject.P_patient[6];
			tempAgeString = tempAge + "years";
		} else {
			if (tempObject.P_patient[6][1] == "y") {
				tempAge = tempObject.P_patient[6][0];
			} else if (tempObject.P_patient[6][1] == "m") {
				tempAge = tempObject.P_patient[6][0]/12;
			} else if (tempObject.P_patient[6][1] == "w") {
				tempAge = tempObject.P_patient[6][0]/52;
			} else if (tempObject.P_patient[6][1] == "d") {
				tempAge = tempObject.P_patient[6][0]/365;
			}
			if (tempObject.P_patient[6][2]>0) {
				tempAgeString = tempObject.P_patient[6][0] + tempObject.P_patient[6][1] + " (PMA:" + tempObject.P_patient[6][2] + "w)";	
			} else {
				tempAgeString = tempObject.P_patient[6][0] + tempObject.P_patient[6][1];	
			}		
		}

		if (tempAge>=18) { //age
			if (tempObject.P_patient[7] === "Male") {
				tempIcon = "<i class='fas fa-male fa-fw'></i>";
			} else {
				tempIcon = "<i class='fas fa-female fa-fw'></i>";
			}
		} else if (tempAge>=3) {
			tempIcon = "<i class='fas fa-child fa-fw'></i>";
		} else if (tempAge>0) {
			tempIcon = "<i class='fas fa-baby fa-fw'></i>";
		} else {
			tempIcon = "";
		}
		
		tempDuration = converttime(tempObject.P_time);
		console.log(tempDuration);

		if (typeof tempObject.P_length == "number") {
			isComplex = 0;
		} else {
			isComplex = 1;
		}
		if (isComplex == 0) {
			tempMode = tempObject.P_hx[0][0];
			if (tempMode == 0) {tempMode2 = "Manual mode"; tempIconMode = "<i class='fas fa-syringe fa-fw' style='color:rgb(81,203,238);font-size:14px;transform:translateY(-15px)'></i>";};
			if (tempMode == 1) {tempMode2 = "CPT mode"; tempIconMode = "<i class='fas fa-tint fa-fw' style='color:LightCoral;font-size:14px;transform:translateY(-15px)'></i>";};
			if (tempMode == 2) {
				if (tempObject.P_hx[0][4] == 1) {
					tempMode2 = "Intermittent Bolus";
					tempIconMode = "<i class='fas fa-hourglass-half fa-fw' style='color:#c19f14;font-size:14px;transform:translateY(-15px)'></i>";
				} else {
					tempMode2 = "CET mode"
					tempIconMode = "<i class='fas fa-brain fa-fw' style='color:green;font-size:14px;transform:translateY(-15px)'></i>";
				}
			}
		} else {
			tempIconMode = "<i class='fas fa-random fa-fw' style='color:rgb(128,128,128);font-size:14px;transform:translateY(-15px)'></i>"
			if (tempObject.P_hx[0].length == 0) {
				tempMode1 = "Error";
			} else {
				tempMode = tempObject.P_hx[0][0][0];
				if (tempMode == 0) {tempMode1 = "Manual mode"};
				if (tempMode == 1) {tempMode1 = "CPT mode"};
				if (tempMode == 2) {
					if (tempObject.P_hx[0][0][4] == 1) {
						tempMode1 = "Intermittent Bolus";
					} else {
						tempMode1 = "CET mode"; 
					}
				}
			}
			if (tempObject.P_hx[1].length == 0) {
				tempMode2 = "Error";
			} else {
				tempMode = tempObject.P_hx[1][0][0];
				if (tempMode == 0) {tempMode2 = "Manual mode"};
				if (tempMode == 1) {tempMode2 = "CPT mode"};
				if (tempMode == 2) {
					if (tempObject.P_hx[1][0][4] == 1) {
						tempMode2 = "Intermittent Bolus";
					} else {
						tempMode2 = "CET mode"
					}
				}
			}
		}
		let El2 = document.createElement("div");
		El2.setAttribute('class', 'file_outerbox');
		El2.setAttribute('id', tempId);
		El2.setAttribute('data-timestamp', tempObject.P_d);
		El2.setAttribute('data-duration', tempDuration);
		if (isComplex == 0) {
			if (tempObject.name != "") {
				El2.setAttribute('style', 'height:90px');
			}
		} else {
			if (tempObject.name != "") {
				El2.setAttribute('style', 'height:107px');
			} else {
				El2.setAttribute('style', 'height:90px');	
			}
		}
		if (isComplex == 0) {
			if ((tempObject.P_patient[1] == "Remifentanil") && (tempObject.P_patient[0] == "Eleveld-Remifentanil")) {
				tempObject.P_patient[0] = "Eleveld";
			}
			El2.innerHTML = `
							<div class="file_innerleft">
								${tempIcon}
								<br>
								${tempIconMode} 
							</div>
							<div class="file_innerright">
								<div class="file_content_line1">Started on ${tempObject.P_d} <div class="loadduration">${tempDuration}</div></div>
								<div class="file_name">${tempObject.name}</div>
								<div class="file_content_line2">${tempObject.P_patient[1]} (${tempObject.P_patient[0]}) - ${tempMode2}</div>
								<div class="file_content_line3">${tempObject.P_patient[7]}/${tempAgeString}, BW:${(Array.isArray(tempObject.P_patient[4]))?tempObject.P_patient[4][0]:tempObject.P_patient[4]}kg, BH: ${tempObject.P_patient[5]}cm</div>
							</div>
							<div class="deleteFileIcon" onclick="deleteFile(this.parentElement.id, this.parentElement.dataset.timestamp, this.parentElement.dataset.duration);">
								<span class="fa-stack fa-2x">
									<i class="fas fa-circle fa-stack-2x"></i>
									<i class="fas fa-trash-alt fa-stack-1x fa-inverse"></i>
								</span>
							</div>
			`
		} else {
			if ((tempObject.P_patient[11] == "Remifentanil") && (tempObject.P_patient[10] == "Eleveld-Remifentanil")) {
				tempObject.P_patient[10] = "Eleveld";
			}
			El2.innerHTML = `
							<div class="file_innerleft">
								${tempIcon}
								<br>
								${tempIconMode} 
							</div>
							<div class="file_innerright">
								<div class="file_content_line1">Started on ${tempObject.P_d} <div class="loadduration">${tempDuration}</div></div>
								<div class="file_name">${tempObject.name}</div>
								<div class="file_content_complex"><i class="fa-solid fa-shuffle"></i>COMPLEX</div>
								<div class="file_content_line2">
									1. ${tempObject.P_patient[1]} (${tempObject.P_patient[0]}) - ${tempMode1}
									<br>
									2. ${tempObject.P_patient[11]} (${tempObject.P_patient[10]}) - ${tempMode2}
								</div>
								<div class="file_content_line3">${tempObject.P_patient[7]}/${tempAgeString}, BW:${tempObject.P_patient[4]}kg, BH: ${tempObject.P_patient[5]}cm</div>
							</div>
							<div class="deleteFileIcon" onclick="deleteFile(this.parentElement.id, this.parentElement.dataset.timestamp, this.parentElement.dataset.duration);">
								<span class="fa-stack fa-2x">
									<i class="fas fa-circle fa-stack-2x"></i>
									<i class="fas fa-trash-alt fa-stack-1x fa-inverse"></i>
								</span>
							</div>
			`
		} 
		parentEl.appendChild(El2);	
	}

function manageFileList() {

	if (manageFileListState == 0) {
		document.getElementById("btn_load").classList.add("hide");
		document.getElementById("btn_export").classList.remove("hide");
		document.getElementById("btn_manageFiles").innerHTML = "Exit Manager";
		unselectFileBox();
		showDeleteIcons();
	} else {
		document.getElementById("btn_load").classList.remove("hide");
		document.getElementById("btn_export").classList.add("hide");
		document.getElementById("btn_manageFiles").innerHTML = "Manage";
		hideDeleteIcons();
		unselectFileBox();
		var tempKeys = JSON.parse(localStorage.getItem("keys"));
		selectFileBox(tempKeys[tempKeys.length-1]);
	}

	//toggle managefilestate
	if (manageFileListState == 0) {
		manageFileListState = 1;
	} else {
		manageFileListState = 0;
	}
}

function deleteFile(input_uid,input_timestamp,input_duration) {
	var testArr = JSON.parse(localStorage.getItem("keys"));
	var todelete = testArr.indexOf(input_uid*1);
	if (confirm("Confirm delete sim-file: " + input_timestamp + ", duration " + input_duration + "?")) {
		if (todelete != -1) {
				document.getElementById(input_uid).classList.add("hideanimation");
				setTimeout(function() {document.getElementById(input_uid).style.display="none"},1100);
				console.log(input_uid);
				console.log(todelete);
				testArr.splice(todelete,1);
				localStorage.setItem("keys",JSON.stringify(testArr));
				console.log(testArr);


				//update file list and selectuid
				let tempFileBoxes = document.getElementsByClassName("file_outerbox");
				if (tempFileBoxes.length == 1) {
					document.querySelector(".file_outerbox").classList.add("active");
					selected_uid = document.querySelector(".file_outerbox").id;
				} else {
					for (i=0; i<tempFileBoxes.length; i++) {
						tempFileBoxes[i].classList.remove("active");
					}
					tempFileBoxes[0].classList.add("active");
					selected_uid = tempFileBoxes[0].id;
				}
		}
		//alert("finalArr" + testArr);
		//alert("keys in local" + JSON.parse(localStorage.getItem("keys")));
	}
}


function exportFunction() {
	//reset inputname
	inputname = "";
	testKeys = JSON.parse(localStorage.getItem("keys"));
	if (testKeys.length>=1) {
		displayWarning("Export sim-files to CSV",
		`
			<div>This will export all ${testKeys.length} sim-files on device to a .csv (comma-separated values) file. You can then open this file in Excel or other spreadsheet application. You may also import this database file into SimTIVA for viewing.</div>
			<div style='height:40px'></div>
			<div id='fileexportblock'>
				<div style='display:inline-block;font-size:250%;width:15%;text-align:right;padding-right:10px;color:#ccc'><i class='fas fa-file-csv'></i></div>
				<div style='display:inline-block;width:84%'>
					<i>Save as file name:</i><br>
					<input id='inputnamefield' placeholder='export' style='width:80%;border:2px solid #ccc;border-radius:4px' onkeyup='inputname=this.value'>.csv
				</div>
			</div>
			<div style='height:50px'></div>
			<div><a class='button invert' onclick='exportKeys(inputname,testKeys)' id='btn_exportProceed'>Proceed</a><a class='button muted right' onclick='hidewarningmodal()'>Cancel</a></div>
		`)
	}
}

function exportDataFile(input_uid) {
	outputDataObject = loadobject(input_uid);
	if (outputDataObject != -1) {
		if (typeof outputDataObject.P_patient[6] == "number") {
			tempAge = outputDataObject.P_patient[6];
			tempAgeString = tempAge + "years";
		} else {
			if (outputDataObject.P_patient[6][1] == "y") {
				tempAge = outputDataObject.P_patient[6][0];
			} else if (outputDataObject.P_patient[6][1] == "m") {
				tempAge = outputDataObject.P_patient[6][0]/12;
			} else if (outputDataObject.P_patient[6][1] == "w") {
				tempAge = outputDataObject.P_patient[6][0]/52;
			} else if (outputDataObject.P_patient[6][1] == "d") {
				tempAge = outputDataObject.P_patient[6][0]/365;
			}
			if (outputDataObject.P_patient[6][2]>0) {
				tempAgeString = outputDataObject.P_patient[6][0] + outputDataObject.P_patient[6][1] + " (PMA:" + outputDataObject.P_patient[6][2] + "w)";	
			} else {
				tempAgeString = outputDataObject.P_patient[6][0] + outputDataObject.P_patient[6][1];	
			}		
		}
		//patientstring = outputDataObject.P_patient[7] + "," + tempAgeString;
		modestring = "";
		modelstring = "";
		if (typeof outputDataObject.P_length == "number") {
			if (outputDataObject.P_hx[0][0] == 0) modestring = "Manual Mode";
			if (outputDataObject.P_hx[0][0] == 1) modestring = "CPT Mode";
			if (outputDataObject.P_hx[0][0] == 2) {
				if (outputDataObject.P_hx[0][4] == 1) {
					modestring = "Intermittent Bolus";	
				} else {
					modestring = "CET mode";	
				}
			}
			modelstring = outputDataObject.P_patient[1] + "(" + outputDataObject.P_patient[0] + ")";
		} else {
			modestring = "Complex";
			modelstring = outputDataObject.P_patient[1] + "(" + outputDataObject.P_patient[0] + ") & " + outputDataObject.P_patient[11] + "(" + outputDataObject.P_patient[10] + ")";
		}

		outputDataString1 = input_uid + "," + 
				outputDataObject.P_d + "," + 
				outputDataObject.P_time + "," + 
				"\"" + outputDataObject.name + "\"," + 
				tempAgeString + "," +  
				outputDataObject.P_patient[7] + "," + //sex
				outputDataObject.P_patient[4] + "," +  //bw
				outputDataObject.P_patient[5] + "," +  //bh
				modestring + "," + 
				modelstring + "," + 
				"https://simtiva.app/view.html?P=" + LZString.compressToEncodedURIComponent(JSON.stringify(outputDataObject)) + "\n" ;
				// JSON.stringify(outputDataObject) + "\"\n" ;
		return outputDataString1;
	}
}

function exportKeys(filenameentry,testKeys) {
	
	testString = "UID,Timestamp,Duration,Name,Age,Sex,BW,BH,Mode,Model description,Weblink\n";
	for (kc = 0; kc < testKeys.length; kc++) {
		temp = exportDataFile(testKeys[kc]);
		if (temp != undefined) testString += temp;
	}
	exportGenerateDownload(testString,filenameentry);
}


function previewFile() {
	
  const content = document.getElementById("loadfile_container");
  const [file] = document.getElementById("myFile").files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      //crosschecking code to see whether file type is correct
      errorMessage = "";
      console.log(reader.fileName);
      if (!(reader.fileName.slice(-4) == ".csv" || reader.fileName.slice(-4) == ".CSV" )) {
      	errorMessage += "Not a CSV file." + "<br>";
      	console.log(errorMessage);
      }
      if (errorMessage != "") {
      	let tempRaw = reader.result.split("\n"); //last record is 2nd last line. last line is an empty line.
      	
      	if (tempRaw != undefined) {
		      if (reader.result.slice(0,26) != "UID,Timestamp,Duration,Nam") {
		      	errorMessage += "Cannot read file. Does not seem to be a SimTIVA .csv database file." + "<br>";
		      } else {
		      	//preview first record and see if it's fine
		      	let parseArrayComma = parseArrayRaw[1].split(",");
		      	let parseArrayURL = parseArrayComma[parseArrayComma.length-1];
		      	if (parseArrayURL.slice(0,19) != "https://simtiva.app") {
		      		errorMessage += "Wrong weblink reference. Possible corrupted database.";
		      	}
		      }
      	} else {
      		errorMessage += "Cannot read file. Does not seem to be a SimTIVA .csv database file.";
      	}
      }
      console.log(errorMessage);
      if (errorMessage != "") {
      	displayWarning("Failed import",errorMessage);
      } else {
	      errorCount = 0;

	      //iterate through CSV file
	      let parseArrayRaw = reader.result.split("\n");
	      let impcount;
	      //pop importDataArray
	      importDataArray.length = 0;
	      for (impcount = 1; impcount<parseArrayRaw.length-1; impcount++) { //last line is empty line. so impcount max is -1
	      	let parseArrayComma = parseArrayRaw[impcount].split(",");
	      	let parseID = parseArrayComma[0]*1;
	      	let parseArrayURL = parseArrayComma[parseArrayComma.length-1];
	      	let parseArrayObj = parseArrayURL.slice(32);
	      	obj = readExternal(parseArrayObj);
	      	if (obj != -1) {
	      		importDataArray.push([parseID,obj]);	
	      	} else {
	      		errorCount += 1;
	      	}
	      }
	      impcount -= 1;
	      displayWarning("Database Imported","Total " + impcount + " records retrieved. <br>" + 
	      	importDataArray.length + " records read successfully. <br>" + 
	      	errorCount + " records failed to load.");
	      document.getElementById("btn_load_import").classList.remove("disabled");
	      document.getElementById("loadfile_container").classList.remove("collapse");
	      document.getElementById("loadfile_container").classList.add("compress");
	      document.getElementById("loadfile_container").innerHTML = '';
	      renderImportList();
      }
    },
    false,
  );

  if (file) {
    reader.readAsText(file);
    reader.fileName = file.name;
  }
}

function exportGenerateDownload(input_string,expFileName) {
	jsonObject = "data:text/csv;charset=utf-8," + encodeURIComponent(input_string);
	if (expFileName.length>0) {
		expFileName += ".csv";
	} else {
		expFileName = "export.csv";
	}
		const link2 = document.createElement('a');
			link2.target = "_blank";
			link2.download = expFileName;
	  	link2.href = jsonObject;
	  	link2.click();
	  	link2.delete;

	  	document.getElementById("fileexportblock").innerHTML = "<i>File export complete. You may close this window. Click <a id='herelink'>here</a> if you can't find the file in your downloads folder.</i>";
	  	herelink.target="_blank";
	  	herelink.download = expFileName;
	  	herelink.href = jsonObject;
	  	document.getElementById("btn_exportProceed").classList.add("disabled");
	  	
}

function selectFileBox(input_uid) {
	selected_uid = input_uid;
	let tempFileBoxes = document.getElementsByClassName("file_outerbox");
	for (i=0; i<tempFileBoxes.length; i++) {
		tempFileBoxes[i].classList.remove("active");
		};
	document.getElementById(selected_uid).classList.add("active");
}

function unselectFileBox() {

	let tempFileBoxes = document.getElementsByClassName("file_outerbox");
	
		for (i=0; i<tempFileBoxes.length; i++) {
			tempFileBoxes[i].classList.remove("active");
			};
		selected_uid = "";
	
}

function showDeleteIcons() {
	let tempDeleteIcons = document.getElementsByClassName("deleteFileIcon");
		for (i=0; i<tempDeleteIcons.length; i++) {
			tempDeleteIcons[i].classList.add("show");
		};
}

function hideDeleteIcons() {
	let tempDeleteIcons = document.getElementsByClassName("deleteFileIcon");
		for (i=0; i<tempDeleteIcons.length; i++) {
			tempDeleteIcons[i].classList.remove("show");
		};
}

function parseobject(input_uid,external,extObject) {
	parseloading = 1;
	document.getElementById("status").innerHTML = "Loading PK data...";
	if (external == true) {
		object = extObject;
	} else {
		if (input_uid != null) {
			object = loadobject(input_uid);
		} else {
			object = readURL(); //else, read from URL	
		}
	}
	//determine complex mode and read params
	if (typeof object.P_length == "number") {
		complex_mode = 0;
		console.log('complex mode 0');
		parse_historyarray = object.P_hx;
	} else {
		complex_mode = 1;
		console.log('complex mode 1');
		parse_historyarray = object.P_hx[0];
		parse_historyarray1 = object.P_hx[1];
	}

	
	d = object.P_d;
	working_clock = object.P_time;
	//read general params
	//detect adult vs paedimode. position 6 is array for paedi mode.
	if (typeof object.P_patient[6] == "number") {
		paedi_mode = 0;
		age = object.P_patient[6];
	} else {
		paedi_mode = 1;
		ageunit = object.P_patient[6][1];
		if (ageunit == "d") {
			age = object.P_patient[6][0] / 365;
		} else if (ageunit == "w") {
			age = object.P_patient[6][0] / 52;
		} else if (ageunit == "m") {
			age = object.P_patient[6][0] / 12;
		} else if (ageunit == "y") {
			age = object.P_patient[6][0];
		}
		PMA = object.P_patient[6][2];
		//also need to render the inputPMA because otherwise readmodel will result in error
		document.getElementById("inputPMA").value=PMA;
	}
	height = object.P_patient[5];
	if (!Array.isArray(object.P_patient[4])) {
		mass = object.P_patient[4];	
	} else {
		mass = object.P_patient[4][0];
		AdjBW = object.P_patient[4][1];
		useAdjBW = 1;
	}
	
	
	//drug_sets[0].infusate_concentration = object.P_patient[2];
	//drug_sets[0].conc_units = object.P_patient[3];
	//if (object.P_patient[8]!=undefined) drug_sets[0].infused_units = object.P_patient[8];
	
	if (object.name != undefined) {
		if (object.name.length>0) document.getElementById("top_subtitle2").innerHTML = object.name;
	}
	if (object.P_patient[7] === "Male") {
		gender = 0;
	} else {
		gender = 1;
	}
	if (height>0) {
		if (gender == 0) 
			{lbm = 1.1 * mass - 128 * (mass/height) * (mass/height);}
		else
			{lbm = 1.07 * mass - 148 * (mass/height) * (mass/height);}
	} else {
	}


	if ((object.P_patient[0] == "Eleveld") && (object.P_patient[1] == "Remifentanil")) {
		object.P_patient[0] = "Eleveld-Remifentanil";
	}

	if ((object.P_patient[0] == "Eleveld") && (complex_mode == 0)) {
		if (object.P_patient[10] != undefined) {
			if (object.P_patient[10] == 0) {
				opioid = 0;
			} else {
				opioid = 1;
			}
		}
	}

	readmodel(object.P_patient[0],0);

	if (object.P_patient[0]=="Shafer") {
		if (object.P_patient[10] == 0) {
			drug_sets[0].fentanyl_weightadjusted_flag = 0;
			drug_sets[0].modeltext = `
			Shafer (no coparameters) (Anesthesiology 1990;73(6):1091-1102) <br>
			PK model adjusted for body weight using formulas by Shibutani (Anesthesiology 2004;101:603-13) <br>
			vc = ${drug_sets[0].vc} <br>
			v2 = 28.1 <br>
			v3 = 228 <br>
			k10 = ${drug_sets[0].k10} <br>
			k12 = ${drug_sets[0].k12} <br>
			k13 = ${drug_sets[0].k13} <br>
			k21 = ${drug_sets[0].k21} <br>
			k31 = ${drug_sets[0].k31} <br>
			ke0 = ${drug_sets[0].k41} <br>
			ke0 derived from t1/2ke0 of 6.6min (Scott & Stanski, Anesthesiology 1991;74:34042)
			`;
		} else {
			drug_sets[0].fentanyl_weightadjusted_flag = 1;
			drug_sets[0].fentanyl_weightadjusted_factor = object.P_patient[11] * 1;
			drug_sets[0].modeltext = `
			Shafer (Anesthesiology 1990;73(6):1091-1102) <br>
			PK model adjusted for body weight using formulas by Shibutani (Anesthesiology 2004;101:603-13) <br>
			vc = ${drug_sets[0].vc} <br>
			v2 = 28.1 <br>
			v3 = 228 <br>
			k10 = ${drug_sets[0].k10} <br>
			k12 = ${drug_sets[0].k12} <br>
			k13 = ${drug_sets[0].k13} <br>
			k21 = ${drug_sets[0].k21} <br>
			k31 = ${drug_sets[0].k31} <br>
			ke0 = ${drug_sets[0].k41} <br>
			ke0 derived from t1/2ke0 of 6.6min (Scott & Stanski, Anesthesiology 1991;74:34042)
			`;
		}
		document.getElementById("modeldescription").innerHTML = drug_sets[0].modeltext;
	}


	//drug_sets[0].drug_name = object.P_patient[1];
	if (object.P_patient[9]!=undefined) drug_sets[0].infusate_concentration = object.P_patient[9];


	if ((object.P_patient[0] === "Minto") || (object.P_patient[0] === "Eleveld-Remifentanil")) {
  	document.getElementById("drugname").innerHTML = "Remifentanil <span style='opacity:0.5'>(" + drug_sets[0].infusate_concentration + "mcg/ml)</span>";
  }

	if (object.P_patient[0] === "Shafer")  {
  	document.getElementById("drugname").innerHTML = "Fentanyl <span style='opacity:0.5'>(" + drug_sets[0].infusate_concentration + "mcg/ml)</span>";
  }

	if (object.P_patient[0] === "Maitre")  {
  	document.getElementById("drugname").innerHTML = "Alfentanil <span style='opacity:0.5'>(" + drug_sets[0].infusate_concentration + "mcg/ml)</span>";
  }

	//from initcpt etc	
		drug_sets[0].cpt_active = 0.5;
		drug_sets[0].firstrun = -1;
		calculate_udfs(0);  

		drug_sets[0].p_state = new Array();
		drug_sets[0].e_state = new Array();

			// initialize params
			drug_sets[0].cpt_rates = new Array();
			drug_sets[0].cpt_times = new Array();
			drug_sets[0].cpt_cp = new Array();
			drug_sets[0].cpt_ce = new Array();
			drug_sets[0].cpt_rates_real = new Array();
			drug_sets[0].volinf = new Array();
			drug_sets[0].historyarray = new Array();
			drug_sets[0].historyarrays = new Array();
			drug_sets[0].historytexts = new Array();
			drug_sets[0].cpt_bolus = 0;
			drug_sets[0].cet_bolus = 0;
			drug_sets[0].cpt_pause = 0;
			drug_sets[0].p_state = new Array();
			drug_sets[0].e_state = new Array();

		p_state[1] = 0;
		p_state[2] = 0;
		p_state[3] = 0;
		e_state[1] = 0;
		e_state[2] = 0;
		e_state[3] = 0;
		e_state[4] = 0;

		//l1 = Math.exp(-lambda[1] ); 
		//l2 = Math.exp(-lambda[2] );
		//l3 = Math.exp(-lambda[3] );
		//l4 = Math.exp(-lambda[4] );
	
	document.getElementById("status").innerHTML = "Loading simulation data...";

	//assume this is simple mode

	if (complex_mode == 0) {
		if (((object.P_patient[0] == "Marsh") || (object.P_patient[0] == "Schnider")) && height>0) {
			//emulate on
			document.getElementById("emulatecard").style.display = "block";
		} else {
			document.getElementById("emulatecard").style.display = "none";
		}
	}

	if (parse_historyarray[0][0] == 1) { // CPT mode
		mode = "CPT mode";
		for (count=0; count<parse_historyarray.length; count++) {
			if (parse_historyarray[count][1] == 0) { //this is desired
				time_in_s = parse_historyarray[count][2];
				if (count > 0) {
					result = getcp(time_in_s,0);
					result_e = getce(time_in_s,0);
					console.log("states retrieved, time " + time_in_s);
					historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]"); 
					if (parse_historyarray[count][3]>0) {
						if (parse_historyarray[count].length>4) {
							//normal CPT target array has 4 items, the fifth will denote the max rate
							drug_sets[0].max_rate = parse_historyarray[count][4];
							deliver_cpt(parse_historyarray[count][3],0,0,0);
						} else {
							drug_sets[0].max_rate = 0;
							deliver_cpt(parse_historyarray[count][3],0,0,0); //for cpt mode effect flag is 0, third param is for compen, 4th param is drug_set
						}
					} else {
						pauseCpt(0);
					}
				} else {
					if (parse_historyarray[count][3]>0) {
						if (parse_historyarray[count].length>4) {
							drug_sets[0].max_rate = parse_historyarray[count][4];
							deliver_cpt(parse_historyarray[count][3],0,0,0);
						} else {
							drug_sets[0].max_rate = 0;
							deliver_cpt(parse_historyarray[count][3],0,0,0); //for cpt mode effect flag is 0	
						}
						
					} else {
						pauseCpt(0);
					}
					drug_sets[0].firstrun=0;
					drug_sets[0].running=1;
				}
			}
		}
		document.getElementById("pastscheme").classList.add("show");
		document.getElementById("btn_displayhistory").innerHTML = "Scheme";
		document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;

	}

	if (parse_historyarray[0][0] == 2) { //CET mode or IB mode
		if (parse_historyarray[0][4] == 1) { //IB mode active
			mode = "Intermittent Bolus";
			//additional cet bolus params
			drug_sets[0].cpt_active = 0;
			drug_sets[0].cet_active = 0.5;
			drug_sets[0].IB_active = 1;
			drug_sets[0].IB_swing = 0.05;
			drug_sets[0].firstrun = -1;
			drug_sets[0].cpt_pause = 0;
			drug_sets[0].cet_pause = 0;
			drug_sets[0].cet_lockdowntime = 0;
			for (count=0; count<parse_historyarray.length; count++) {
				if (parse_historyarray[count][1] == 0) {
					drug_sets[0].desired = 0;
					drug_sets[0].IB_swing = parse_historyarray[count][5];
					drug_sets[0].IB_active = 1;
					drug_sets[0].firstrun = 0;
					drug_sets[0].running = 1;
					time_in_s = parse_historyarray[count][2];
					if (count > 0) {
						result = getcp(time_in_s,0);
						result_e = getce(time_in_s,0);
						console.log("states retrieved, time " + time_in_s);
						historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]"); 
						if (parse_historyarray[count][3]>0) {
							deliver_cet_alt(parse_historyarray[count][3],0); 
						} else {
							pauseCpt(0);
						}
					} else {
						if (parse_historyarray[count][3]>0) {
							deliver_cet_alt(parse_historyarray[count][3],0); 
						} else {
							pauseCpt(0);
						}
						drug_sets[0].firstrun=0;
						drug_sets[0].running=1;
					}
				}
			}
			document.getElementById("pastscheme").classList.add("show");
			document.getElementById("btn_displayhistory").innerHTML = "Scheme";
			document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;
		} else { //normal CET mode
			mode = "CET mode";
			//in addition, add CET init params
			drug_sets[0].cpt_active = 0;
			drug_sets[0].cet_active = 0.5;
			drug_sets[0].IB_active = 0;
			drug_sets[0].cpt_pause = 0;
			drug_sets[0].cet_pause = 0;
			drug_sets[0].cet_lockdowntime = 0;
			for (count=0; count<parse_historyarray.length; count++) {
				if (parse_historyarray[count][1] == 0) {
					drug_sets[0].desired = 0;
					drug_sets[0].firstrun = 0;
					drug_sets[0].running = 1;
					time_in_s = parse_historyarray[count][2];
					if (count > 0) {
						result = getcp(time_in_s,0);
						result_e = getce(time_in_s,0);
						console.log("states retrieved, time " + time_in_s);
						historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]"); 
						if (parse_historyarray[count][3]>0) {
							if (parse_historyarray[count].length>4) {
								drug_sets[0].max_rate = parse_historyarray[count][4];
								deliver_cet(parse_historyarray[count][3],0); 	
							} else {
								drug_sets[0].max_rate = 0;
								deliver_cet(parse_historyarray[count][3],0); 
							}
						} else {
							pauseCpt(0);
						}
					} else {
						if (parse_historyarray[count][3]>0) {
							if (parse_historyarray[count].length>4) {
								drug_sets[0].max_rate = parse_historyarray[count][4];
								deliver_cet(parse_historyarray[count][3],0); 	
							} else {
								drug_sets[0].max_rate = 0;
								deliver_cet(parse_historyarray[count][3],0); 
							}
						} else {
							pauseCpt(0);
						}
						//firstrun=0;
						//running=1;
					}
				}
			}
			document.getElementById("pastscheme").classList.add("show");
			document.getElementById("btn_displayhistory").innerHTML = "Scheme";
			document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;

		}

	}

	if (parse_historyarray[0][0] == 0) { //manual mode
		mode = "Manual mode";
		//extra params init
		drug_sets[0].cpt_active = 0;
		drug_sets[0].historytext = "";
		drug_sets[0].desired = 0;
		for (count = 0; count<parse_historyarray.length; count++) {
			if (count == 0) {
				drug_sets[0].firstrun = 0;
				drug_sets[0].running = 1;
				drug_sets[0].manualmode_active =1;
				//special code to account for "lost time" for delayed start in complex mode
				if (complex_mode == 1) {
					time_in_s = parse_historyarray[count][2];
					working_clock = Math.floor(time_in_s);
					for (i=0; i<working_clock; i++) {
						drug_sets[0].cpt_rates_real.push(0);
						drug_sets[0].cpt_cp.push([0,0,0]);
						drug_sets[0].cpt_ce.push([0,0,0,0]);
						drug_sets[0].volinf.push(0)
					}
					myChart.data.datasets[2].data.push({x:(working_clock-1)/60, y:0});
					myChart.data.datasets[3].data.push({x:(working_clock-1)/60, y:0});
				}
			}
			console.log(count);



			if (parse_historyarray[count][1] == 1) {  //this is bolus
				if (count+2 < parse_historyarray.length) { //this is not last
					duration = parse_historyarray[count+2][2] + 180;
				} else {
					duration = parse_historyarray[count][2] + 21600;
				}
				time_in_s = parse_historyarray[count][2];
				console.log("now is " + time_in_s);
				drug_sets[0].inf_rate_mls = parse_historyarray[count+1][3];
				parsebolusadmin(parse_historyarray[count][3],0); 
				lookahead(1,duration,0);
				console.log("infusingafterbolus");
				
			}

			if (count>0) {
				if (parse_historyarray[count-1][1] == 1) { //bolus just given
					console.log("bolusskip");

				} else if (parse_historyarray[count][1] == 2) { // this is infusion and not after a bolus
					if (count+1 < parse_historyarray.length) { //this is not last
						duration = parse_historyarray[count+1][2] + 180;
					} else {
						duration = parse_historyarray[count][2] + 21600;
					}
					time_in_s = parse_historyarray[count][2];
					drug_sets[0].inf_rate_mls = parse_historyarray[count][3];
					lookahead(0,duration,0);
					console.log("infusing");

				}
			}

			if ((count == 0) && (parse_historyarray[count][1] == 2)) {
					if (count+1 < parse_historyarray.length) { //this is last
						duration = parse_historyarray[count+1][2] + 180;
					} else {
						duration = parse_historyarray[count][2] + 21600;
					}
					drug_sets[0].inf_rate_mls = parse_historyarray[count][3];
					lookahead(0,duration,0);
					console.log("infusing");

			}



		}//end for loop
		document.getElementById("historywrapper").innerHTML = drug_sets[0].historytext;
		document.getElementById("schemecopytitle").innerHTML = "HISTORY";
		document.getElementById("pastschemeCOPY").style.display = "none";
		document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;

	}//end manual


	//add complex mode parsing block
	if (complex_mode == 1) {
		active_drug_set_index = 1;
		
		//need special precaution for eleveld-remifentanil?
		readmodel(object.P_patient[10],1);

		if (object.P_patient[10]=="Shafer") {

			//from proceedcomplex
			document.querySelector(".druglabelicon.opioid").innerText = "F";
	  	document.querySelector(".druglabeltext.opioid>.line1").innerText = "FENTANYL";
	  	myChart.data.datasets[4].label = 'Cp-Fen';
	  	myChart.data.datasets[5].label = 'Ce-Fen';
	  	myChart2.options.scales.x.title.text = 'Fentanyl Ce (ng/ml)';
	  	//transform chart2 x axis
			for (count1 = 0; count1<9; count1++) {
			    for (count = 0; count<myChart2.data.datasets[count1+11].data.length; count++) {
			        myChart2.data.datasets[count1+11].data[count].x *= 1/2.3;
			    }
			}
			myChart2.options.scales.x.max = 4;
			myChart2.options.scales.x.ticks.stepSize = '0.5';

			if (object.P_patient[15] == 0) {
				drug_sets[1].fentanyl_weightadjusted_flag = 0;
				drug_sets[1].modeltext = `
				Shafer (no coparameters) (Anesthesiology 1990;73(6):1091-1102) <br>
				PK model adjusted for body weight using formulas by Shibutani (Anesthesiology 2004;101:603-13) <br>
				vc = ${drug_sets[1].vc} <br>
				v2 = 28.1 <br>
				v3 = 228 <br>
				k10 = ${drug_sets[1].k10} <br>
				k12 = ${drug_sets[1].k12} <br>
				k13 = ${drug_sets[1].k13} <br>
				k21 = ${drug_sets[1].k21} <br>
				k31 = ${drug_sets[1].k31} <br>
				ke0 = ${drug_sets[1].k41} <br>
				ke0 derived from t1/2ke0 of 6.6min (Scott & Stanski, Anesthesiology 1991;74:34042)
				`;
			} else {
				drug_sets[1].fentanyl_weightadjusted_flag = 1;
				drug_sets[1].fentanyl_weightadjusted_factor = object.P_patient[16] * 1;
				drug_sets[1].modeltext = `
				Shafer (Anesthesiology 1990;73(6):1091-1102) <br>
				PK model adjusted for body weight using formulas by Shibutani (Anesthesiology 2004;101:603-13) <br>
				vc = ${drug_sets[1].vc} <br>
				v2 = 28.1 <br>
				v3 = 228 <br>
				k10 = ${drug_sets[1].k10} <br>
				k12 = ${drug_sets[1].k12} <br>
				k13 = ${drug_sets[1].k13} <br>
				k21 = ${drug_sets[1].k21} <br>
				k31 = ${drug_sets[1].k31} <br>
				ke0 = ${drug_sets[1].k41} <br>
				ke0 derived from t1/2ke0 of 6.6min (Scott & Stanski, Anesthesiology 1991;74:34042)
				`;
			}
		}//end shafer

		if (object.P_patient[10] == "Maitre") {
	  	document.querySelector(".druglabelicon.opioid").innerText = "A";
	  	document.querySelector(".druglabeltext.opioid>.line1").innerText = "ALFENTANIL";
	  	myChart.data.datasets[4].label = 'Cp-Alfen';
	  	myChart.data.datasets[5].label = 'Ce-Alfen';
	  	myChart2.options.scales.x.title.text = 'Alfentanil Ce (ng/ml)';
			myChart2.options.scales.x.max = 300;
			myChart2.options.scales.x.ticks.stepSize = '50';
	  	//transform chart2 x axis
			for (count1 = 0; count1<9; count1++) {
			    for (count = 0; count<myChart2.data.datasets[count1+11].data.length; count++) {
			        myChart2.data.datasets[count1+11].data[count].x *= 70/2.3;
			    }
			}
	  	document.querySelector("#bolus3_1>.bolus_inside").innerHTML = "300" + "<span class='infused_units'></span>";
			document.querySelector("#bolus3_1").setAttribute("onclick","bolusadmin(300,1)");
			document.querySelector("#bolus2_1>.bolus_inside").innerHTML = "200" + "<span class='infused_units'></span>";
			document.querySelector("#bolus2_1").setAttribute("onclick","bolusadmin(200,1)");
			document.querySelector("#bolus1_1>.bolus_inside").innerHTML = "100" + "<span class='infused_units'></span>";
			document.querySelector("#bolus1_1").setAttribute("onclick","bolusadmin(100,1)");
		}
		drug_sets[1].infusate_concentration = object.P_patient[12];
		if (parse_historyarray1.length>0) {
			console.log('entering complex mode parsing block...');		
			drug_sets[1].cpt_active = 0.5;
			drug_sets[1].firstrun = -1;
			calculate_udfs(1);  

			drug_sets[1].p_state = new Array();
			drug_sets[1].e_state = new Array();

			// initialize params
			drug_sets[1].cpt_rates = new Array();
			drug_sets[1].cpt_times = new Array();
			drug_sets[1].cpt_cp = new Array();
			drug_sets[1].cpt_ce = new Array();
			drug_sets[1].cpt_rates_real = new Array();
			drug_sets[1].volinf = new Array();
			drug_sets[1].historyarray = new Array();
			drug_sets[1].historyarrays = new Array();
			drug_sets[1].historytexts = new Array();
			drug_sets[1].cpt_bolus = 0;
			drug_sets[1].cet_bolus = 0;
			drug_sets[1].cpt_pause = 0;
			drug_sets[1].p_state = new Array();
			drug_sets[1].e_state = new Array();

			p_state[1] = 0;
			p_state[2] = 0;
			p_state[3] = 0;
			e_state[1] = 0;
			e_state[2] = 0;
			e_state[3] = 0;
			e_state[4] = 0;
	
			document.getElementById("status").innerHTML = "Loading simulation data...";

	

			if (parse_historyarray1[0][0] == 1) { // CPT mode
				mode1 = "CPT mode";
				for (count=0; count<parse_historyarray1.length; count++) {
					if (parse_historyarray1[count][1] == 0) { //this is desired
						time_in_s = parse_historyarray1[count][2];
						if (count > 0) {
							result = getcp(time_in_s,1);
							result_e = getce(time_in_s,1);
							console.log("states retrieved, time " + time_in_s);
							historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]"); 
							if (parse_historyarray1[count][3]>0) {
								if (parse_historyarray1[count].length>4) {
									drug_sets[1].max_rate = parse_historyarray1[count][4];
									deliver_cpt(parse_historyarray1[count][3],0,0,1); 
								} else {
									drug_sets[1].max_rate = 0;
									deliver_cpt(parse_historyarray1[count][3],0,0,1); //for cpt mode effect flag is 0, third param is for compen, 4th param is drug_set	
								}
							} else {
								pauseCpt(1);
							}
						} else {
							if (parse_historyarray1[count][3]>0) {
								if (parse_historyarray1[count].length>4) {
									drug_sets[1].max_rate = parse_historyarray1[count][4];
									deliver_cpt(parse_historyarray1[count][3],0,0,1); 
								} else {
									drug_sets[1].max_rate = 0;
									deliver_cpt(parse_historyarray1[count][3],0,0,1); //for cpt mode effect flag is 0, third param is for compen, 4th param is drug_set	
								}
							} else {
								pauseCpt(1);
							}
							drug_sets[1].firstrun=0;
							drug_sets[1].running=1;
						}
					}
				}
				//document.getElementById("pastscheme").classList.add("show");
				//document.getElementById("btn_displayhistory").innerHTML = "Scheme";
				//document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;

			} //end cpt mode

			if (parse_historyarray1[0][0] == 2) { //CET mode or IB mode
				if (parse_historyarray1[0][4] == 1) { //IB mode active
					mode1 = "Intermittent Bolus";
					//additional cet bolus params
					drug_sets[1].cpt_active = 0;
					drug_sets[1].cet_active = 0.5;
					drug_sets[1].IB_active = 1;
					drug_sets[1].IB_swing = 0.05;
					drug_sets[1].firstrun = -1;
					drug_sets[1].cpt_pause = 0;
					drug_sets[1].cet_pause = 0;
					drug_sets[1].cet_lockdowntime = 0;
					for (count=0; count<parse_historyarray1.length; count++) {
						if (parse_historyarray1[count][1] == 0) {
							drug_sets[1].desired = 0;
							drug_sets[1].IB_swing = parse_historyarray1[count][5];
							drug_sets[1].IB_active = 1;
							drug_sets[1].firstrun = 0;
							drug_sets[1].running = 1;
							time_in_s = parse_historyarray1[count][2];
							if (count > 0) {
								result = getcp(time_in_s,1);
								result_e = getce(time_in_s,1);
								console.log("states retrieved, time " + time_in_s);
								historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]"); 
								if (parse_historyarray1[count][3]>0) {
									deliver_cet_alt(parse_historyarray1[count][3],1); 
								} else {
									pauseCpt(1);
								}
							} else {
								if (parse_historyarray1[count][3]>0) {
									deliver_cet_alt(parse_historyarray1[count][3],1); 
								} else {
									pauseCpt(1);
								}
								drug_sets[1].firstrun=0;
								drug_sets[1].running=1;
							}
						}
					}
					//document.getElementById("pastscheme").classList.add("show");
					//document.getElementById("btn_displayhistory").innerHTML = "Scheme";
					//document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;
				} else { //normal CET mode
					mode1 = "CET mode";
					//in addition, add CET init params
					drug_sets[1].cpt_active = 0;
					drug_sets[1].cet_active = 0.5;
					drug_sets[1].IB_active = 0;
					drug_sets[1].cpt_pause = 0;
					drug_sets[1].cet_pause = 0;
					drug_sets[1].cet_lockdowntime = 0;
					for (count=0; count<parse_historyarray1.length; count++) {
						if (parse_historyarray1[count][1] == 0) {
							drug_sets[1].desired = 0;
							drug_sets[1].firstrun = 0;
							drug_sets[1].running = 1;
							time_in_s = parse_historyarray1[count][2];
							if (count > 0) {
								result = getcp(time_in_s,1);
								result_e = getce(time_in_s,1);
								console.log("states retrieved, time " + time_in_s);
								historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]"); 
								if (parse_historyarray1[count][3]>0) {
									if (parse_historyarray1[count].length>4) {
										drug_sets[1].max_rate = parse_historyarray1[count][4];
										deliver_cet(parse_historyarray1[count][3],1); 	
									} else {
										drug_sets[1].max_rate = 0;
										deliver_cet(parse_historyarray1[count][3],1); 	
									}
								} else {
									pauseCpt(1);
								}
							} else {
								if (parse_historyarray1[count][3]>0) {
									if (parse_historyarray1[count].length>4) {
										drug_sets[1].max_rate = parse_historyarray1[count][4];
										deliver_cet(parse_historyarray1[count][3],1); 	
									} else {
										drug_sets[1].max_rate = 0;
										deliver_cet(parse_historyarray1[count][3],1); 	
									}
								} else {
									pauseCpt(1);
								}
								//firstrun=0;
								//running=1;
							}
						}
					}
					//document.getElementById("pastscheme").classList.add("show");
					//document.getElementById("btn_displayhistory").innerHTML = "Scheme";
					//document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;

				}

			}//end cet / ib mode

	if (parse_historyarray1[0][0] == 0) { //manual mode
		mode1 = "Manual mode";
		//extra params init
		drug_sets[1].cpt_active = 0;
		drug_sets[1].historytext = "";
		drug_sets[1].desired = 0;
		for (count = 0; count<parse_historyarray1.length; count++) {
			if (count == 0) {
				drug_sets[1].firstrun = 0;
				drug_sets[1].running = 1;
				drug_sets[1].manualmode_active =1;
				//special code to account for "lost time" for delayed start in complex mode
				if (complex_mode == 1) {
					time_in_s = parse_historyarray1[count][2];
					working_clock = Math.floor(time_in_s);
					for (i=0; i<working_clock; i++) {
						drug_sets[1].cpt_rates_real.push(0);
						drug_sets[1].cpt_cp.push([0,0,0]);
						drug_sets[1].cpt_ce.push([0,0,0,0]);
						drug_sets[1].volinf.push(0)
					}
					myChart.data.datasets[4].data.push({x:(working_clock-1)/60, y:0});
					myChart.data.datasets[5].data.push({x:(working_clock-1)/60, y:0});
				}
			}
			console.log(count);



			if (parse_historyarray1[count][1] == 1) {  //this is bolus
				if (count+2 < parse_historyarray1.length) { //this is not last
					duration = parse_historyarray1[count+2][2] + 180;
				} else {
					duration = parse_historyarray1[count][2] + 21600;
				}
				time_in_s = parse_historyarray1[count][2];
				console.log("now is " + time_in_s);
				drug_sets[1].inf_rate_mls = parse_historyarray1[count+1][3];
				parsebolusadmin(parse_historyarray1[count][3],1); 
				lookahead(1,duration,1);
				console.log("infusingafterbolus");
				
			}

			if (count>0) {
				if (parse_historyarray1[count-1][1] == 1) { //bolus just given
					console.log("bolusskip");

				} else if (parse_historyarray1[count][1] == 2) { // this is infusion and not after a bolus
					if (count+1 < parse_historyarray1.length) { //this is not last
						duration = parse_historyarray1[count+1][2] + 180;
					} else {
						duration = parse_historyarray1[count][2] + 21600;
					}
					time_in_s = parse_historyarray1[count][2];
					drug_sets[1].inf_rate_mls = parse_historyarray1[count][3];
					lookahead(0,duration,1);
					console.log("infusing");

				}
			}

			if ((count == 0) && (parse_historyarray1[count][1] == 2)) {
					if (count+1 < parse_historyarray1.length) { //this is last
						duration = parse_historyarray1[count+1][2] + 180;
					} else {
						duration = parse_historyarray1[count][2] + 21600;
					}
					drug_sets[1].inf_rate_mls = parse_historyarray1[count][3];
					lookahead(0,duration,1);
					console.log("infusing");
			}
		}//end for loop
		//document.getElementById("historywrapper").innerHTML = drug_sets[0].historytext;
		//document.getElementById("schemecopytitle").innerHTML = "HISTORY";
		//document.getElementById("pastschemeCOPY").style.display = "none";
		//document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;

	}//end manual
	}//end parsing block
		active_drug_set_index = 0;
	}	//end of complex mode


	//add ptol generation for complex mode
	//add ebis update for simple mode
	if (complex_mode == 1) {
		PD_mode = 2; // PD mode set to PTOL by default
		document.getElementById("chartoverlayoptionscontent").classList.add("PDoptions");
		document.getElementById("select_effect_measure").value = "ptol";
		ptol_generate_margins(0,0.9,0.5);
		//BIS charting already incorporated into PD_mode 2 and PTOL generate margins
	} else {
		//off complex interface displays
		document.getElementById("ptolcard").style.display = "none";
		document.getElementById("ptolcardoptions").style.display = "none";
		document.getElementById("interactionscontainer").style.display = "none";
		document.getElementById("ptolcard_switch").style.display = "none";
		if (object.P_patient[0] == "Eleveld") {
			//styling for eBIS
			PD_mode = 1;
			
			document.getElementById("chartoverlayoptionscontent").classList.add("PDoptions");
			document.getElementById("select_effect_measure").value = "bis";
			document.getElementById("select_effect_measure2").value = "bis";
			document.getElementById("select_effect_measure").disabled = true;
			document.getElementById("select_effect_measure2").disabled = true;
			BIS40 = BIS_Ce_for_BIS(40);
			BIS60 = BIS_Ce_for_BIS(60);
			//myChart.data.datasets[11].data = [{x:0, y:BIS60},{x:7200, y:BIS60}];
			//myChart.data.datasets[10].data = [{x:0, y:BIS40},{x:7200, y:BIS40}];
			myChart.data.datasets[10].backgroundColor = yellowPri30;
			myChart.data.datasets[10].borderColor = yellowPri50;
			myChart.data.datasets[11].borderColor = yellowPri50;

			BIS_charting();

			myChart.data.datasets[10].hidden = false;
			myChart.data.datasets[11].hidden = false;
			document.getElementById("ptolcard").style.display = "flex";
			document.getElementById("ptoltitle").innerHTML = "eBIS";
			document.getElementById("ptoldesc").innerHTML = "Estimated BIS from Eleveld PD model";
			document.getElementById("ptolcard_right").innerHTML = BIS_array[Math.floor(time_in_s)];
			myChart.update();
		}
	}
	document.getElementById("status").innerHTML = "Drawing chart...";

	// modified slightly after charting engine improved
	/*
	for (count=0; count<working_clock; count++) {
		if (count%600 == 0) {
			time_in_s = count;
			updatechart();
		}
	}
	*/
	myChart.data.datasets[2].backgroundColor = "rgba(0,0,0,0)";
	myChart.data.datasets[3].backgroundColor = "rgba(0,0,0,0)";


	working_clock = object.P_time;
	time_in_s = object.P_time;
	

	if (complex_mode == 0) {

		myChart.data.datasets[2].backgroundColor = context => {
		    			const chart = context.chart;
		    			const { ctx, chartArea, scales } = chart;
		    			if (!chartArea) {
		    				return null ;
		    			}
		    			return getGradientRed(ctx, chartArea, scales);
		    		}
		myChart.data.datasets[3].backgroundColor = context => {
		    			const chart = context.chart;
		    			const { ctx, chartArea, scales } = chart;
		    			if (!chartArea) {
		    				return null ;
		    			}
		    			return getGradientGreen(ctx, chartArea, scales);
		    		}


		
	}
	//console.log(outputscheme(1,d));

	//parsefilldisplay
	VI = Math.round(drug_sets[0].volinf[working_clock]*10)/10;

	//update view
	parsedisplay(working_clock,object.P_patient[7],object.P_patient[0],VI,d,mode);


		//off chart legend
		myChart.legend.options.display = false;

	//change historywrapper back to zero
	if (complex_mode == 1) {
		document.getElementById("historywrapper").innerHTML = drug_sets[0].historytext;
		document.getElementById("historywrapperCOPY").innerHTML = document.getElementById("historywrapper").innerHTML;

	}

	updatechart(myChart);

	if (object.P_ev != undefined) {
			parse_eventArray = object.P_ev;
			console.log(parse_eventArray);
			parseevents();
	}

	//finishing touches for complex mode
	if (complex_mode == 1) {
		add_ptol_label(90);
	  add_ptol_label(50);
	  add_ptol_label(10);
	  setTimeout(alignPtolLabels,600);
	  complexinterface_init();

		//this is to update the chart2 red dot current point, and populate green margins for mychart
		setTimeout(function(){
			runinfusion_complex();
			updatechart(myChart);
			updatechart2();
		},600);
	}

	trk();

	function parsebolusadmin(x,ind) {
		var working_clock2 = Math.floor(time_in_s);
		l1 = Math.exp(-drug_sets[ind].lambda[1]);
		l2 = Math.exp(-drug_sets[ind].lambda[2]);
		l3 = Math.exp(-drug_sets[ind].lambda[3]);
		l4 = Math.exp(-drug_sets[ind].lambda[4]);
			
		if ((drug_sets[ind].cpt_cp.length>0) && (drug_sets[ind].cpt_cp[drug_sets[ind].cpt_cp.length-1][0]>0)) {
			p_state[1] = drug_sets[ind].cpt_cp[working_clock2-1][0];
			p_state[2] = drug_sets[ind].cpt_cp[working_clock2-1][1];
			p_state[3] = drug_sets[ind].cpt_cp[working_clock2-1][2];
			e_state[1] = drug_sets[ind].cpt_ce[working_clock2-1][0];
			e_state[2] = drug_sets[ind].cpt_ce[working_clock2-1][1];
			e_state[3] = drug_sets[ind].cpt_ce[working_clock2-1][2];
			e_state[4] = drug_sets[ind].cpt_ce[working_clock2-1][3];

			if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
				p_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				p_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				p_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[4] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			}

			drug_sets[ind].cpt_cp.length = working_clock2;
			drug_sets[ind].cpt_ce.length = working_clock2;
			drug_sets[ind].volinf.length = working_clock2;
			drug_sets[ind].cpt_rates_real.length = working_clock2;	

			drug_sets[ind].cpt_rates_real.push(drug_sets[ind].cpt_rates_real[working_clock2-1]);

			
				myChart.data.datasets[ind*2+2].data.length = myChart.data.datasets[ind*2+2].data.findIndex((element)=>element.x>time_in_s/60);
				myChart.data.datasets[ind*2+3].data.length = myChart.data.datasets[ind*2+3].data.findIndex((element)=>element.x>time_in_s/60);
			
			

			temp_vol = drug_sets[ind].volinf[working_clock2-1];
		} else {
			temp_vol = 0;
			drug_sets[ind].cpt_rates_real.push(0);
		}
		

		p_state[1] = p_state[1] * l1 + drug_sets[ind].p_coef[1] * x * (1 - l1);
		p_state[2] = p_state[2] * l2 + drug_sets[ind].p_coef[2] * x * (1 - l2);
		p_state[3] = p_state[3] * l3 + drug_sets[ind].p_coef[3] * x * (1 - l3);

		e_state[1] = e_state[1] * l1 + drug_sets[ind].e_coef[1] * x * (1 - l1);
		e_state[2] = e_state[2] * l2 + drug_sets[ind].e_coef[2] * x * (1 - l2);
		e_state[3] = e_state[3] * l3 + drug_sets[ind].e_coef[3] * x * (1 - l3);
		e_state[4] = e_state[4] * l4 + drug_sets[ind].e_coef[4] * x * (1 - l4);


		
			drug_sets[ind].cpt_cp.push([p_state[1],p_state[2],p_state[3]]);
			drug_sets[ind].cpt_ce.push([e_state[1],e_state[2],e_state[3],e_state[4]]);
			drug_sets[ind].volinf.push(temp_vol+x/drug_sets[ind].infusate_concentration);
			drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div><div class='timespan'>" + converttime(working_clock2) + "</div> Bolus: " + x + drug_sets[ind].infused_units + "</div>");
			drug_sets[ind].historyarrays.push([0,1,working_clock2,x]);
			document.getElementById("historywrapper").innerHTML = drug_sets[ind].historytext;
		
	}

	function parseevents() {
		for (q=0; q<parse_eventArray.length; q++) {
			createEvent(parse_eventArray[q][0],parse_eventArray[q][1],-1);
		}
	}
}

function parsedisplay(t,sex,model,VI,d,mode) {
	
	document.getElementById("status").innerHTML = mode + ": data loaded";
	document.getElementById("prompt_msg2").innerHTML = "Started at " + d;
	document.querySelector(".cardscontainer").style.paddingTop = "1rem";
	document.getElementById("clock").innerHTML = converttime(t);
	if (useAdjBW == 1) {
		document.getElementById("bw").innerHTML = mass + "kg (Adj.BW:" + Math.round(AdjBW*10)/10 + "kg)";	
		drug_sets[0].modeltext = drug_sets[0].modeltext + "<br>Adjusted BW was used in calculations.";
		document.getElementById("modeldescription").innerHTML = drug_sets[0].modeltext;
	} else {
		document.getElementById("bw").innerHTML = mass + "kg";	
	}
	
	if (height>0) {
		document.getElementById("bh").innerHTML = height + "cm";
	} else {
		document.getElementById("bh").innerHTML = "?";
	}
	//populate age display
	if (paedi_mode == 0) {
		if (age>=0) {
			document.getElementById("age").innerHTML = age + "y";
		} else {
			document.getElementById("age").innerHTML = "?";
		}
	} else {
		document.getElementById("age").innerHTML = object.P_patient[6][0] + ageunit;
		if (object.P_patient[6][2]>0) { //PMA will always be something, because of readmodel. use original P_patient data to check if PMA is there or not
			document.getElementById("age").innerHTML = document.getElementById("age").innerHTML +
				" (PMA: " + PMA + "w)";
		}
	}
	document.getElementById("gender").innerHTML = sex;
	document.getElementById("modelname").innerHTML = drug_sets[0].model_name;
	document.getElementById("displayvolume").innerHTML = VI;

		document.getElementById("drugname").innerHTML = drug_sets[0].drug_name;
		document.getElementById("modelname").innerHTML = drug_sets[0].model_name;
		document.getElementById("modeldescription").innerHTML = drug_sets[0].modeltext;

	if (drug_sets[0].drug_name == "Remifentanil") {
  	document.getElementById("drugname").innerHTML = "Remifentanil <span style='opacity:0.5'>(" + drug_sets[0].infusate_concentration + "mcg/ml)</span>";
		if (drug_sets[0].model_name == "Eleveld-Remifentanil") {
			document.getElementById("modelname").innerHTML = "Eleveld";
		}
  }

  if (drug_sets[0].drug_name == "Fentanyl") {
  	document.getElementById("drugname").innerHTML = "Fentanyl <span style='opacity:0.5'>(" + drug_sets[0].infusate_concentration + "mcg/ml)</span>";
  }


  if (drug_sets[0].drug_name == "Alfentanil") {
  	document.getElementById("drugname").innerHTML = "Alfentanil <span style='opacity:0.5'>(" + drug_sets[0].infusate_concentration + "mcg/ml)</span>";
  }

  	if (drug_sets[0].drug_name == "Propofol") {
		myChart.options.scales.y.title.text = "Concentration (mcg/ml)";
	} else {
		myChart.options.scales.y.title.text = "Concentration (ng/ml)";
	}
  if (modal != undefined) hideallmodal();
}


	function behindPosition(ctx, value) {
		if (ctx.p0.parsed.x < time_in_s/60) {
			return value;
		} else {
			return undefined;
		}
	}

	function behindPosition2(ctx, value) {
		if (ctx.p0.parsed.x < time_in_s/60) {
			return value;
		} else {
			return undefined;
		}
	}





function clearInput(x) {
	obj=document.getElementById(x);
	obj.value='';
	obj.focus();
}

/*
function bolusconverter() {
	if ((document.getElementById("inputDesiredCe").value*1) != cet_priordesired) {
		start_cet();
		setTimeout(function(){postprocessing(1)},1100);
	} else {
		postprocessing(0);
	}

	
	document.getElementById("ticker").style.display = "block";
	document.getElementById("pastscheme").style.display = "none";
	document.getElementById("pastschemeCOPY").style.display = "none";
}
*/

function displayWarning(dialogTitle, dialogContent) {
	const ElTitle = document.querySelector("#modalWarning .title");
	const ElContent = document.querySelector("#modalWarning .modal-body");
	ElTitle.innerHTML = dialogTitle;
	ElContent.innerHTML = dialogContent;
	setmodal("modalWarning");
}

function getStorageItems() {
	var ul = document.createElement("ul");
	ul.innerHTML = "";

}

function askNotificationPermission() {
  // function to actually ask the permissions
  //function handlePermission(permission) {
    // set the button to shown or hidden, depending on what the user answers
    //if(Notification.permission === 'denied' || Notification.permission === 'default') {
    //  notificationBtn.style.display = 'block';
    //} else {
    //  notificationBtn.style.display = 'none';
    //}
  //}

  // Let's check if the browser supports notifications
  if (notificationallowed == 1) {

  } else {
	  if (!('Notification' in window)) {
	    console.log("This browser does not support notifications.");
	  } else {
	    if(checkNotificationPromise()) {
	      Notification.requestPermission()
	      .then((permission) => {
	      	console.log(permission);
	        notificationallowed = 1;
	      })
	    } else {
	      Notification.requestPermission(function(permission) {
	        console.log(permission);
	        notificationallowed = 1;
	      });
	    }
	  }
	}
}

function notificationapi(arg) {
	if (notificationallowed == 1) {
		notificationactive = arg;
	} else {
		notificationactive = 0;
	}
}

function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
}

function showNotification(text,indicator) {
	navigator.serviceWorker.getRegistrations().then(
		function(registrations) {
			if (complex_mode == 0) {
				registrations[0].showNotification(text);
			} else {
				if (indicator == undefined) {
					registrations[0].showNotification(drug_sets[active_drug_set_index].drug_name + " - " + text);	
				} else {
					registrations[0].showNotification(drug_sets[indicator].drug_name + " - " + text);
				}
			}
		})
	notificationactive = 0;
	setTimeout(function(){notificationactive = 1}, 5500);
}

function goDark(arg) {


	isDark = document.body.classList.contains("dark");


	if (!isDark) {
		var metaThemeColor = document.querySelector("meta[name=theme-color]");
		metaThemeColor.setAttribute("content", "#000");
		document.getElementById("darkmodebutton").innerHTML = "<i class='fas fa-adjust fa-fw'></i>";
		document.getElementById("windowbody").classList.add("dark");
		if (myChart != undefined) {
				myChart.options.scales.x.grid.color = "rgba(255,255,255,0.2)";
				myChart.options.scales.y.grid.color = "rgba(255,255,255,0.2)";
				myChart.options.scales.x.grid.borderColor = "rgba(255,255,255,0.6)";
				myChart.options.scales.y.grid.borderColor = "rgba(255,255,255,0.6)";
				myChart.options.scales.x.ticks.color = "rgba(255,255,255,0.6)";
				myChart.options.scales.y.ticks.color = "rgba(255,255,255,0.6)";
				if (complex_mode == 1) {
					myChart2.options.scales.x.grid.color = "rgba(255,255,255,0.2)";
					myChart2.options.scales.y.grid.color = "rgba(255,255,255,0.2)";
					myChart2.options.scales.x.grid.borderColor = "rgba(255,255,255,0.6)";
					myChart2.options.scales.y.grid.borderColor = "rgba(255,255,255,0.6)";
					myChart2.options.scales.x.ticks.color = "rgba(255,255,255,0.6)";
					myChart2.options.scales.y.ticks.color = "rgba(255,255,255,0.6)";
					myChart2.data.datasets[1].pointBackgroundColor = dotColor0dark;
					myChart2.data.datasets[1].pointBorderColor = dotColor0dark;
					myChart2.data.datasets[2].pointBackgroundColor = dotColor1dark;
					myChart2.data.datasets[2].pointBorderColor = dotColor1dark;
					myChart2.data.datasets[3].pointBackgroundColor = dotColor2dark;
					myChart2.data.datasets[3].pointBorderColor = dotColor2dark;
					myChart2.data.datasets[4].pointBackgroundColor = dotColor3dark;
					myChart2.data.datasets[4].pointBorderColor = dotColor3dark;
					myChart2.data.datasets[5].pointBackgroundColor = dotColor4dark;
					myChart2.data.datasets[5].pointBorderColor = dotColor4dark;
					myChart2.data.datasets[6].pointBackgroundColor = dotColor5dark;
					myChart2.data.datasets[6].pointBorderColor = dotColor5dark;
					myChart2.data.datasets[7].pointBackgroundColor = dotColor6dark;
					myChart2.data.datasets[7].pointBorderColor = dotColor6dark;
					myChart2.data.datasets[8].pointBackgroundColor = dotColor7dark;
					myChart2.data.datasets[8].pointBorderColor = dotColor7dark;
					myChart2.data.datasets[9].pointBackgroundColor = dotColor8dark;
					myChart2.data.datasets[9].pointBorderColor = dotColor8dark;
					myChart2.data.datasets[10].pointBorderColor = lineColor1dark;
					myChart2.data.datasets[10].pointBackgroundColor = lineColor1dark;
					myChart2.data.datasets[10].borderColor = lineColor1dark;
					myChart2.update();
				}
				if (emulateOn == true) {
				myChartEmulate.options.scales.x.grid.color = "rgba(255,255,255,0.2)";
				myChartEmulate.options.scales.y.grid.color = "rgba(255,255,255,0.2)";
				myChartEmulate.options.scales.x.grid.borderColor = "rgba(255,255,255,0.6)";
				myChartEmulate.options.scales.y.grid.borderColor = "rgba(255,255,255,0.6)";
				myChartEmulate.options.scales.x.ticks.color = "rgba(255,255,255,0.6)";
				myChartEmulate.options.scales.y.ticks.color = "rgba(255,255,255,0.6)";
				myChartEmulate.options.scales.x.title.color = "rgb(255,255,255,0.6)";
				myChartEmulate.options.scales.y.title.color = "rgb(255,255,255,0.6)";
				myChartEmulate.options.plugins.legend.labels.color = "rgb(255,255,255,0.8)";
				myChartEmulate.update();
				}
			myChart.update();
		}
			isDark = true;
	} else {
		var metaThemeColor = document.querySelector("meta[name=theme-color]");
		metaThemeColor.setAttribute("content", "#7B8092");
		document.getElementById("darkmodebutton").innerHTML = "<i class='fas fa-moon fa-fw'></i>";
		document.getElementById("windowbody").classList.remove("dark");
		if (myChart != undefined) {
				myChart.options.scales.x.grid.color = "rgba(0,0,0,0.1)";
				myChart.options.scales.y.grid.color = "rgba(0,0,0,0.1)";
				myChart.options.scales.x.grid.borderColor = "rgba(0,0,0,0.25)";
				myChart.options.scales.y.grid.borderColor = "rgba(0,0,0,0.25)";
				myChart.options.scales.x.ticks.color = "rgba(102,102,102,1)";
				myChart.options.scales.y.ticks.color = "rgba(102,102,102,1)";
				if (complex_mode == 1) {
					myChart2.options.scales.x.grid.color = "rgba(0,0,0,0.1)";
					myChart2.options.scales.y.grid.color = "rgba(0,0,0,0.1)";
					myChart2.options.scales.x.grid.borderColor = "rgba(0,0,0,0.25)";
					myChart2.options.scales.y.grid.borderColor = "rgba(0,0,0,0.25)";
					myChart2.options.scales.x.ticks.color = "rgba(102,102,102,1)";
					myChart2.options.scales.y.ticks.color = "rgba(102,102,102,1)";
					myChart2.data.datasets[1].pointBackgroundColor = dotColor0;
					myChart2.data.datasets[1].pointBorderColor = dotColor0;
					myChart2.data.datasets[2].pointBackgroundColor = dotColor1;
					myChart2.data.datasets[2].pointBorderColor = dotColor1;
					myChart2.data.datasets[3].pointBackgroundColor = dotColor2;
					myChart2.data.datasets[3].pointBorderColor = dotColor2;
					myChart2.data.datasets[4].pointBackgroundColor = dotColor3;
					myChart2.data.datasets[4].pointBorderColor = dotColor3;
					myChart2.data.datasets[5].pointBackgroundColor = dotColor4;
					myChart2.data.datasets[5].pointBorderColor = dotColor4;
					myChart2.data.datasets[6].pointBackgroundColor = dotColor5;
					myChart2.data.datasets[6].pointBorderColor = dotColor5;
					myChart2.data.datasets[7].pointBackgroundColor = dotColor6;
					myChart2.data.datasets[7].pointBorderColor = dotColor6;
					myChart2.data.datasets[8].pointBackgroundColor = dotColor7;
					myChart2.data.datasets[8].pointBorderColor = dotColor7;
					myChart2.data.datasets[9].pointBackgroundColor = dotColor8;
					myChart2.data.datasets[9].pointBorderColor = dotColor8;
					myChart2.data.datasets[10].pointBorderColor = lineColor1;
					myChart2.data.datasets[10].pointBackgroundColor = lineColor1;
					myChart2.data.datasets[10].borderColor = lineColor1;
					myChart2.update();
				}
				myChart.update();
				if (emulateOn == true) {
				myChartEmulate.options.scales.x.grid.color = "rgba(0,0,0,0.1)";
				myChartEmulate.options.scales.y.grid.color = "rgba(0,0,0,0.1)";
				myChartEmulate.options.scales.x.grid.borderColor = "rgba(0,0,0,0.25)";
				myChartEmulate.options.scales.y.grid.borderColor = "rgba(0,0,0,0.25)";
				myChartEmulate.options.scales.x.ticks.color = "rgba(102,102,102,1)";
				myChartEmulate.options.scales.y.ticks.color = "rgba(102,102,102,1)";
				myChartEmulate.options.scales.x.title.color = "#666";
				myChartEmulate.options.scales.y.title.color = "#666";
				myChartEmulate.options.plugins.legend.labels.color = "#666";
				myChartEmulate.update();
				}
			}
				isDark = false;
	}

	if (document.body.classList.contains("dark")) {
		localStorage.setItem("colourMode", "dark");
	} else {
		localStorage.setItem("colourMode", "");
	}
}

/* green functions here */

function timeEstimation(inputVolume) {
	var currenttime = Math.floor(time_in_s);
	var futureVolume = inputVolume + drug_sets[active_drug_set_index].volinf[currenttime];
	var lastTill = drug_sets[active_drug_set_index].volinf.findIndex((element) => element > futureVolume);
  return (lastTill-currenttime);
}

function displayTimeEstimation() {
	var x = document.getElementById("inputVolume").value*1;
	var y = timeEstimation(x);
	if (y>0) {
		document.getElementById("timeEstimation_output").innerHTML = converttime(y);
	} else {
		document.getElementById("timeEstimation_output").innerHTML = "Error";
	}
}

function volumeEstimation(inputTime) {
	var currenttime = Math.floor(time_in_s);
	return Math.round((drug_sets[active_drug_set_index].volinf[inputTime+currenttime] - drug_sets[active_drug_set_index].volinf[currenttime])*10)/10;
}

function displayVolumeEstimation() {
	var x = document.getElementById("inputTime").value*60;
	var y = volumeEstimation(x);
	if (y>0) {
		document.getElementById("volumeEstimation_output").innerHTML = y + "mls";
	} else {
		document.getElementById("volumeEstimation_output").innerHTML = "Error";
	}
}

function outputimage(arg, filename) { //if arg ==1 force share
	//off tooltipfirst
	//myChart.options.plugins.tooltip.enabled = false;

	if ((navigator.canShare) && (arg==1)) {
		if (filename.length > 0) {

		} else {
			filename = "picture";
		}
		if (newCanvasReady == 2) {
			outputimage2(filename);
		}
	} else {
		var canvas = document.getElementById("myChart");  
		var outputimage = newCanvas.toDataURL();
		if (filename.length > 0) {

		} else {
			filename = "download";
		}
	  console.log(`Your system doesn't support sharing files.`);
		const link = document.createElement('a');
		if (newCanvasReady == 2) {
	  	link.download = filename + '.png';
	  	link.href = newCanvas.toDataURL();
	  	link.click();
	  	link.delete;
	  }
	}
	//myChart.options.plugins.tooltip.enabled = true;
	myChart.update;
}

function previewshareoutput() {
	
		var canvas = document.getElementById("myChart"); 
		canvasUpdate(canvas); 
		clearInterval(canvasUpdateInterval);
		canvasUpdateInterval = null;
		canvasUpdateInterval = setInterval(canvasUpdate, 2999, canvas);

	document.getElementById("sharedatatext").value = 'https://simtiva.app/view.html?P=' + LZString.compressToEncodedURIComponent(outputstring());
}

function updatedatatext() {
	clearTimeout(texttimeout);
	texttimeout = setTimeout(function() {
		savefile_patient();
		document.getElementById("sharedatatext").value = 'https://simtiva.app/view.html?P=' + LZString.compressToEncodedURIComponent(outputstring());	
	},500);
}

async function outputimage2(filename) { //arg is to write the image to share box
	var canvas = document.getElementById("myChart");  
	var outputimage = newCanvas.toDataURL();
	const blob = await (await fetch(outputimage)).blob(); 
		var file = new File([blob], "picture.png", {type: "image/png", lastModified: new Date().getTime()});
		var filesArray = [file];
		
		  navigator.share({
		    files: filesArray,
		    title: filename,
		    text: 'From SimTIVA: https://simtiva.app',
		  });

}



function copyfunction() {
    //if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    //    return window.clipboardData.setData("Text", document.getElementById("sharedatatext").value);

    //}
    //else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = document.getElementById("sharedatatext").value;
        //alert(textarea.textContent);
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
        		document.getElementById("sharedatatext").focus();
        		document.getElementById("sharedatatext").select();
        		document.getElementById("copycheckmark").classList.toggle("translate");
        		setTimeout(function() {document.getElementById("copycheckmark").classList.toggle("translate")}, 3000);
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.

        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return prompt("Copy to clipboard: Ctrl+C, Enter", text);
        }
        finally {
            document.body.removeChild(textarea);
        }
    //}
}


function sharefunction() {
	if (document.getElementById('sharebutton').style.display == "block") {
		if (navigator.canShare) {

		} else {
			document.getElementById("btn_shareimg").style.display="none";
			document.getElementById("btn_shareweblink").style.display="none";
		}

		//to prevent pop-under another modal bug
		if (modal == undefined) {
			previewshareoutput();
			setmodal("modalShare");
		}
	}
}

async function shareViewURL() {
	const url = 'https://simtiva.app/view.html?P=' + LZString.compressToEncodedURIComponent(outputstring());
	name = document.getElementById("inputFileName").value;
	if ((name != undefined) && (name.length>0)) {

	} else {
		name = "SimTIVA";
	}
	const shareData = {
		title: name,
		text: "Results available on SimTIVA viewer app",
		url: url
	}
	try {
		await navigator.share(shareData);
	} catch(err) {
		console.log(err);
	}
}



function canvasUpdate(oldCanvas, filename) {
	newCanvas = cloneCanvas(oldCanvas,filename);
	newCanvasReady = 0;
	context = newCanvas.getContext('2d');

	if (complex_mode == 1) {

		//draw something old
		myChart.options.animation = false;
    myChart.legend.options.display = true;
    	
  	myChart.data.datasets[2].hidden=false;
  	myChart.data.datasets[3].hidden=false;
  	if (PD_mode>1) {
  		myChart.data.datasets[6].hidden=false;
  		myChart.data.datasets[7].hidden=false;
  		myChart.data.datasets[8].hidden=true;
  		myChart.data.datasets[9].hidden=true;
  	} else if (PD_mode == 1) {
			myChart.data.datasets[10].hidden=false;
  		myChart.data.datasets[11].hidden=false;
  	}
  	myChart.data.datasets[4].hidden=true;
  	myChart.data.datasets[5].hidden=true;
  	if (active_drug_set_index == 0) { corY = result_e } else { corY = alt_result_e };
		if (corY>0.1 && corY<=1.6) {
				myChart.options.scales.y.max = 5;
				myChart.options.scales.y.ticks.stepSize = 0.5;
			
		} else if (corY>1.6 && corY<=4) {
			myChart.options.scales.y.max = 5;
			myChart.options.scales.y.ticks.stepSize = 0.5;
		} else if (corY>4 && corY<=7) {
			myChart.options.scales.y.max = 8;
			myChart.options.scales.y.ticks.stepSize = 1;		
		} else if (corY>7 && corY<=11) {
			myChart.options.scales.y.max = 12;
			myChart.options.scales.y.ticks.stepSize = 1;		
		} else if (corY>11) {
			myChart.options.scales.y.max = 15;
			myChart.options.scales.y.ticks.stepSize = 1;				
		} 

  	myChart.update();
    	
    	
		//draw something new here


		setTimeout(function() {

			context.drawImage(document.getElementById('myChart'), 0, textheight);
			newCanvasReady = 1;
			myChart.options.animation = false;
    		
    	myChart.data.datasets[2].hidden=true;
    	myChart.data.datasets[3].hidden=true;
    	if (PD_mode>1) {
    		myChart.data.datasets[6].hidden=true;
    		myChart.data.datasets[7].hidden=true;
    		myChart.data.datasets[8].hidden=false;
    		myChart.data.datasets[9].hidden=false;
    	} else if (PD_mode == 1) {
				myChart.data.datasets[10].hidden=true;
  			myChart.data.datasets[11].hidden=true;
    	}
    	myChart.data.datasets[4].hidden=false;
    	myChart.data.datasets[5].hidden=false;
    	if (active_drug_set_index == 0) { corY = alt_result_e } else { corY = result_e };
			if (drug_sets[1].drug_name == "Alfentanil") {
				if (corY<=70) {
					myChart.options.scales.y.max = 100;
					myChart.options.scales.y.ticks.stepSize = 20;
				} else if (corY>70 && corY<=120) {
					myChart.options.scales.y.max = 160;
					myChart.options.scales.y.ticks.stepSize = 20;
				} else if (corY>120 && corY<=180) {
					myChart.options.scales.y.max = 200;
					myChart.options.scales.y.ticks.stepSize = 20;
				} else if (corY>180 && corY<=280) {
					myChart.options.scales.y.max = 300;
					myChart.options.scales.y.ticks.stepSize = 50;
				} else if (corY>280 && corY<400) {
					myChart.options.scales.y.max = 500;
					myChart.options.scales.y.ticks.stepSize = 50;
				} else {
					myChart.options.scales.y.max = 600;
					myChart.options.scales.y.ticks.stepSize = 50;
				}
			} else {
				if (corY>0.1 && corY<=1.6) {
						myChart.options.scales.y.max = 5;
						myChart.options.scales.y.ticks.stepSize = 0.5;
					
				} else if (corY>1.6 && corY<=4) {
					myChart.options.scales.y.max = 5;
					myChart.options.scales.y.ticks.stepSize = 0.5;
				} else if (corY>4 && corY<=7) {
					myChart.options.scales.y.max = 8;
					myChart.options.scales.y.ticks.stepSize = 1;		
				} else if (corY>7 && corY<=11) {
					myChart.options.scales.y.max = 12;
					myChart.options.scales.y.ticks.stepSize = 1;		
				} else if (corY>11) {
					myChart.options.scales.y.max = 15;
					myChart.options.scales.y.ticks.stepSize = 1;				
				} 
			}
    	myChart.update();
    },40);
    		
    	
    setTimeout(function() {
    	context.drawImage(document.getElementById('myChart'), oldCanvas.width, textheight);
    	newCanvasReady = 2;
    	myChart.options.animation = true;
    	myChart.legend.options.display = false;
    },80);
	} else {
		newCanvasReady = 2;
	}

	setTimeout(function() {

		document.getElementById("shareimage").src = newCanvas.toDataURL();
		//minitabswitch
		if (complex_mode == 1) {
			if (active_drug_set_index == 0) {
	    	myChart.data.datasets[2].hidden=false;
	    	myChart.data.datasets[3].hidden=false;
	    	if (PD_mode>1) {
	    		myChart.data.datasets[6].hidden=false;
	    		myChart.data.datasets[7].hidden=false;
	    		myChart.data.datasets[8].hidden=true;
	    		myChart.data.datasets[9].hidden=true;
	    	} else if (PD_mode == 1) {
					myChart.data.datasets[10].hidden=false;
  				myChart.data.datasets[11].hidden=false;
	    	}
	    	myChart.data.datasets[4].hidden=true;
	    	myChart.data.datasets[5].hidden=true;
	    	myChart.update();
			} else {
	    	myChart.data.datasets[2].hidden=true;
	    	myChart.data.datasets[3].hidden=true;
	    	if (PD_mode>1) {
	    		myChart.data.datasets[6].hidden=true;
	    		myChart.data.datasets[7].hidden=true;
	    		myChart.data.datasets[8].hidden=false;
	    		myChart.data.datasets[9].hidden=false;
	    	} else if (PD_mode == 1) {
					myChart.data.datasets[10].hidden=true;
  				myChart.data.datasets[11].hidden=true;
	    	}
	    	myChart.data.datasets[4].hidden=false;
	    	myChart.data.datasets[5].hidden=false;
	    	myChart.update();
			}
		}
	},120);

	//also update data-text
	document.getElementById("sharedatatext").value = 'https://simtiva.app/view.html?P=' + LZString.compressToEncodedURIComponent(outputstring());
}

function cloneCanvas(oldCanvas, filename) {
		console.log('entering clonecanvas');
    //create a new canvas
    context = newCanvas.getContext('2d');
    context.clearRect(0,0,newCanvas.width,newCanvas.height);

    var textcontent = outputscheme();

    //trick to destroy chart tooltip
    myChart.canvas.dispatchEvent(new Event("mouseout"));

    //note: myChart is the javascript chart object, oldCanvas is the canvas object
    var correctionfactor = oldCanvas.width/myChart.width;
    var textsize = 12 * correctionfactor;
    textheight = textcontent[0].length * textsize * 1.2 + textsize * 4;
    if (textcontent.length>1) {
    	var textheight0 = textcontent[0].length * textsize * 1.2 + textsize * 4;
    	var textheight1 = textcontent[1].length * textsize * 1.2 + textsize * 4;
    	if (textheight1>textheight0) {
    		textheight = textheight1;
    	} else {
    		textheight = textheight0;
    	}
    }

    if (eventArray.length > 0) {
    	textheight2 = eventArray.length * textsize * 1.2 + textsize;
    } else {
    	textheight2 = 0;
    }

    //set dimensions
    newCanvas.width = oldCanvas.width;
    if (textcontent.length>1) {
    	newCanvas.width = oldCanvas.width * 2;
    }
    newCanvas.height = oldCanvas.height + textheight + textheight2;




    if (textcontent.length>1) {
   		//complex mode
			//add isobologram
			var isoCanvas = document.getElementById("myChart2");
			newCanvas.height = newCanvas.height+isoCanvas.height;
    	if (!isDark) {
    		context.fillStyle = "white";
    	} else {
    		context.fillStyle = "black";
    	}
    	context.fillRect(0, 0, newCanvas.width, newCanvas.height);
			context.drawImage(isoCanvas,0,newCanvas.height-isoCanvas.height);

			//add isobologram legend
			var isoText = "Isobologram Legend";
			context.font = "bold " + textsize * 1.75 + "px SourceSans";
    	if (!isDark) {
    		context.fillStyle = "black";
    	} else {
    		context.fillStyle = "white";
    	}
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+textsize * 2.2);

    	context.font = textsize + "px SourceSans";
    	if (!isDark) {
    		context.fillStyle = "black";
    	} else {
    		context.fillStyle = "white";
    	}
    	isoText = "Probability of tolerance to laryngoscopy (PTOL) isoboles:";
    	y = textsize * (2.2 + 1.2 + 0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	isoText = "PTOL10 to PTOL90 isoboles are drawn";
    	y = textsize * (2.2 + 1.2 + 1.2 + 0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	isoText = "according to Bouillon interaction model;";
    	y = textsize * (2.2 + 1.2 + 1.2 + 1.2 + 0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	isoText = "These are the equi-effective CE-propofol and CE-opioid";
    	y = textsize * (2.2 + 1.2 + 1.2 + 1.2 + 1.2 + 0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	isoText = "value pairs to achieve the identical PD effect.";
    	y = textsize * (2.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	//add rows to explain the curve
    	isoText = "Infusion regimens in use are visualized by";
    	y = textsize * (2.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	isoText = "plotting CE values over time, yielding a curve";
    	y = textsize * (2.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 +  1.2 + 1.2 + 0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	isoText = "that shows the past, present & future of hypnotic-";
    	y = textsize * (2.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 +  1.2 + 1.2 + 1.2 + 0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	isoText = "opioid interaction in the 2D space.";
    	y = textsize * (2.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	isoText = "Grey dots: 1min intervals before/after current";
    	y = textsize * (2.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 +  1.2 + 1.2 + 1.2 + 1.2 + 1.2 +0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	isoText = "Red dot: current CE of hypnotic/opioid";
    	y = textsize * (2.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 +  1.2 + 1.2 + 1.2 + 1.2 + 1.2 +0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
    	isoText = "Arrow: 20mins in the future";
    	y = textsize * (2.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 + 1.2 +  1.2 + 1.2 + 1.2 + 1.2 + 1.2 +0.5);
    	context.fillText(isoText, isoCanvas.width+20, newCanvas.height-isoCanvas.height+y);
			//end add isobologram
    } else {
    	//simple mode
    	if (!isDark) {
    		context.fillStyle = "white";
    	} else {
    		context.fillStyle = "black";
    	}
    	context.fillRect(0, 0, newCanvas.width, newCanvas.height);
    	context.drawImage(oldCanvas, 0, textheight);
    }

    //write text to top of the frame

		context.font = "bold " + textsize * 1.75 + "px SourceSans";
    if (!isDark) {
    	context.fillStyle = "black";
    } else {
    	context.fillStyle = "white";
    }
    if ((filename != undefined) && (filename.length > 0)) {
    	if ((filename == "download") || (filename == "picture")) {
    		filename = "SimTIVA Simulation Result";
    	} else {
    		filename = filename + " (SimTIVA Result)";
    	}
    } else {
    	if (document.getElementById("inputFileName").value == '') {
    		filename = "SimTIVA Simulation Result";	
    	} else {
    		filename = document.getElementById("inputFileName").value + " (SimTIVA Result)";
    	}
    	
    }
		context.fillText(filename,50,textsize * 2.2);

    //apply the old canvas to the new one
    context.font = textsize + "px SourceSans";
    if (!isDark) {
    	context.fillStyle = "black";
    } else {
    	context.fillStyle = "white";
    }
    var y = textsize * (2.2 + 1.2 + 0.5);
    for (i=0; i<textcontent[0].length; i++) {
    	context.fillText(textcontent[0][i],50,y+textsize*1.2*i);
    }
    if (textcontent.length>1) {
    	//complex mode write text
    	//drop two lines because textcontent[0][0] and [1] are titles/patient info
    	y = y + textsize*2.4;
    	for (i=0; i<textcontent[1].length; i++) {
    		context.fillText(textcontent[1][i],oldCanvas.width+50,y+textsize*1.2*i);
    	}
    }

    //add events
    if (eventArray.length>0) {
    	y = textheight + oldCanvas.height + 0.5 * textsize;
    	for (evarraycount = 0; evarraycount<eventArray.length; evarraycount++) {
    		context.fillText(
    			converttime(eventArray[evarraycount][0]) + " - " + eventArray[evarraycount][1],
    			50,
    			y+textsize*1.2*evarraycount
    		);
    	}
    }
    
    //add some remarks to picture
    context.textAlign = "right";
    context.fillText("SimTIVA Simulation Result", oldCanvas.width-50, textheight + textsize * 4);
    context.fillText("From http://simtiva.app", oldCanvas.width-50, textheight + textsize * 5.2);
    context.fillText("Time elapsed = " + converttime(time_in_s), oldCanvas.width-50, textheight + textsize * 6.4);
    //context.fillText("Cp " + Math.round(getcp(time_in_s)*100)/100, oldCanvas.width-50, textheight + textsize * 7.6);
    //context.fillText("Ce " + Math.round(getce(time_in_s)*100)/100, oldCanvas.width-50, textheight + textsize * 8.8);
    //context.fillText("Inf rate " + Math.round(inf_rate_mls*100)/100, oldCanvas.width-50, textheight + textsize * 10);
    context.fillText("Drug 1: " + drug_sets[0].drug_name, oldCanvas.width-50, textheight + textsize * 7.6);

    if (textcontent.length>1) {
    	context.fillText("SimTIVA Simulation Result", oldCanvas.width*2-50, textheight + textsize * 4);
    	context.fillText("From http://simtiva.app", oldCanvas.width*2-50, textheight + textsize * 5.2);
    	context.fillText("Time elapsed = " + converttime(time_in_s), oldCanvas.width*2-50, textheight + textsize * 6.4);
    	//context.fillText("Cp " + Math.round(getcp(time_in_s)*100)/100, oldCanvas.width-50, textheight + textsize * 7.6);
    	//context.fillText("Ce " + Math.round(getce(time_in_s)*100)/100, oldCanvas.width-50, textheight + textsize * 8.8);
    	//context.fillText("Inf rate " + Math.round(inf_rate_mls*100)/100, oldCanvas.width-50, textheight + textsize * 10);
    	context.fillText("Drug 2: " + drug_sets[1].drug_name, oldCanvas.width*2-50, textheight+ textsize * 7.6);

    	
    }
    //return the new canvas
    return newCanvas;
}


function toggleshowevents() {
	ElCon = document.getElementById("eventscontainer");
	if (ElCon.style.display == "block") {
		document.getElementById("annotatebutton").style.display = "none";
		ElCon.style.display = "none";
		var EvDivs = document.querySelectorAll(".charteventicon");
		for (evcount = 0; evcount<EvDivs.length; evcount++) {
			EvDivs[evcount].style.display = "none";
		}
	} else {
		document.getElementById("annotatebutton").style.display = "block";
		ElCon.style.display = "block";
		var EvDivs = document.querySelectorAll(".charteventicon");
		for (evcount = 0; evcount<EvDivs.length; evcount++) {
			EvDivs[evcount].style.display = "block";
		}
	}
}

function toggleautotime() {
	if (chartprofile == 2) {
		chartprofile = 0;
		updatechart(myChart);
		if (popupon == true) {
			updatechart(popupchart);
		}
	} else {
		chartprofile = 2;
		processrange(0);
		processrange(1);
	}
	alignEvents();
}

function toggleEffectEst() {
	if (isEffectEstimationOn.checked == true) {
		if (select_effect_measure.value == "bis") {
			PD_mode = 1;
			BIS_charting();
			myChart.data.datasets[6].hidden = true;
			myChart.data.datasets[7].hidden = true;
			myChart.data.datasets[8].hidden = true;
			myChart.data.datasets[9].hidden = true;
			if (active_drug_set_index == 0) {
				myChart.data.datasets[10].hidden = false;
				myChart.data.datasets[11].hidden = false;
			}
			if (popupon == true) {
				popupchart.data.datasets[6].hidden = true;
				popupchart.data.datasets[7].hidden = true;
				popupchart.data.datasets[8].hidden = true;
				popupchart.data.datasets[9].hidden = true;
				if (active_drug_set_index == 0) {
					popupchart.data.datasets[10].hidden = false;
					popupchart.data.datasets[11].hidden = false;
				}
			}
			document.getElementById("ptolcard").style.display = "flex";
			
			document.getElementById("ptoltitle").innerHTML = "eBIS";
			document.getElementById("ptoldesc").innerHTML = "Estimated BIS from Eleveld PD model";
			document.getElementById("ptolcard_right").innerHTML = "";
			document.getElementById("ptolcard").classList.add("greenborder");
			setTimeout(function() {
						document.getElementById("ptolcard").classList.remove("greenborder");
					},1100);
			if (updateBIS == null) {
				if (BIS_array.length > 0) {
					BIS_update(1000);
				} else {
					//this is when BIS array not yet started i.e. no BIS data
					document.getElementById("ptolcard_right").innerHTML = "";
				}
			}
		} else if (select_effect_measure.value == "ptol") {
			PD_mode = 2;
			if (active_drug_set_index == 0) {
				myChart.data.datasets[6].hidden = false;
				myChart.data.datasets[7].hidden = false;
			} else {
				myChart.data.datasets[8].hidden = false;
				myChart.data.datasets[9].hidden = false;
			}
			myChart.data.datasets[10].hidden = true;
			myChart.data.datasets[11].hidden = true;
			if (popupon == true) {
				if (active_drug_set_index == 0) {
					popupchart.data.datasets[6].hidden = false;
					popupchart.data.datasets[7].hidden = false;
				} else {
					popupchart.data.datasets[8].hidden = false;
					popupchart.data.datasets[9].hidden = false;
				}
				popupchart.data.datasets[10].hidden = true;
				popupchart.data.datasets[11].hidden = true;
			}
			document.getElementById("ptolcard").style.display = "flex";
			
			document.getElementById("ptoltitle").innerHTML = "PTOL";
			document.getElementById("ptoldesc").innerHTML = "Probability of tolerance to laryngoscopy (%)";
			clearInterval(updateBIS);
			updateBIS = null;
			document.getElementById("ptolcard_right").innerHTML = "";
			document.getElementById("ptolcard").classList.add("greenborder");
			setTimeout(function() {
						document.getElementById("ptolcard").classList.remove("greenborder");
					},1100);
			setTimeout(ptol_fill_history_future_dots, 375);
			resetPtolLabels();
		} else if (select_effect_measure.value == "nsri") {
			PD_mode = 3;
			if (active_drug_set_index == 0) {
				myChart.data.datasets[6].hidden = false;
				myChart.data.datasets[7].hidden = false;
			} else {
				myChart.data.datasets[8].hidden = false;
				myChart.data.datasets[9].hidden = false;
			}
			myChart.data.datasets[10].hidden = true;
			myChart.data.datasets[11].hidden = true;
			if (popupon == true) {
				if (active_drug_set_index == 0) {
					popupchart.data.datasets[6].hidden = false;
					popupchart.data.datasets[7].hidden = false;
				} else {
					popupchart.data.datasets[8].hidden = false;
					popupchart.data.datasets[9].hidden = false;
				}
				popupchart.data.datasets[10].hidden = true;
				popupchart.data.datasets[11].hidden = true;
			}
			document.getElementById("ptolcard").style.display = "flex";
			document.getElementById("ptoltitle").innerHTML = "NSRI";
			document.getElementById("ptoldesc").innerHTML = "Noxious Stimulation Response Index";
			clearInterval(updateBIS);
			updateBIS = null;
			document.getElementById("ptolcard_right").innerHTML = "";
			document.getElementById("ptolcard").classList.add("greenborder");
			setTimeout(function() {
						document.getElementById("ptolcard").classList.remove("greenborder");
					},1100);
			setTimeout(ptol_fill_history_future_dots, 375);
			resetPtolLabels();
		} 
	} else {
		PD_mode = 0;
		clearInterval(updateBIS);
		updateBIS = null;
		myChart.data.datasets[6].hidden = true;
		myChart.data.datasets[7].hidden = true;
		myChart.data.datasets[8].hidden = true;
		myChart.data.datasets[9].hidden = true;
		myChart.data.datasets[10].hidden = true;
		myChart.data.datasets[11].hidden = true;
		if (popupon == true) {
			popupchart.data.datasets[6].hidden = true;
			popupchart.data.datasets[7].hidden = true;
			popupchart.data.datasets[8].hidden = true;
			popupchart.data.datasets[9].hidden = true;
			popupchart.data.datasets[10].hidden = true;
			popupchart.data.datasets[11].hidden = true;
		}
		document.getElementById("ptolcard").style.display = "none";
	}
	myChart.update();
	if (popupon == true) popupchart.update();

}

function cycleEffectEst() {
	if (PD_mode == 1) {
		PD_mode = 2;
		select_effect_measure.value = "ptol";
		toggleEffectEst();
	} else if (PD_mode == 2) {
		PD_mode = 3;
		select_effect_measure.value = "nsri";
		toggleEffectEst();
	} else if (PD_mode == 3) {
		PD_mode = 1;
		select_effect_measure.value = "bis";
		toggleEffectEst();
	}
}

function change_fendilution(paramfen) {
	if (paramfen=="custom") {
		document.getElementById("custom_fendilution").style.display = 'inline-block';
		popup_dilution('fendilution','fentanyl');
	} else {
		document.getElementById("custom_fendilution").style.display = 'none';
	}
}

function change_remidilution(paramremi) {
	if (paramremi=="custom") {
		document.getElementById("custom_remidilution").style.display = 'inline-block';
		popup_dilution('remidilution','remifentanil');
	} else {
		document.getElementById("custom_remidilution").style.display = 'none';
	}
}

function change_alfendilution(paramalfen) {
	if (paramalfen=="custom") {
		document.getElementById("custom_alfendilution").style.display = 'inline-block';
		popup_dilution('alfendilution','alfentanil');
	} else {
		document.getElementById("custom_alfendilution").style.display = 'none';
	}
}

function change_opioiddilution(paramo) {
	if (paramo=="custom") {
		document.getElementById("custom_opioiddilution").style.display = 'inline-block';
		
											if (document.getElementById('model_opioid').value == 'Shafer') {
												popup_dilution('opioiddilution','fentanyl');
											} else if (document.getElementById('model_opioid').value == "Maitre") {
												popup_dilution('opioiddilution','alfentanil');
											} else {
												popup_dilution('opioiddilution','remifentanil');
											}
	} else {
		document.getElementById("custom_opioiddilution").style.display = 'none';
	}
}

function popup_dilution(targetid,targetname) {
	
	let lowerlimit = 0.1;
	let upperlimit;
	if (targetname == "fentanyl") {
		targetnamecaps = "Fentanyl";
		upperlimit = 100;
	} else if (targetname == "remifentanil") {
		targetnamecaps = "Remifentanil";
		upperlimit = 100;
	} else {
		targetnamecaps = "Alfentanil";
		upperlimit = 500;
	}
	displayWarning(`Custom ${targetname} dilution`,
		`
			<table style='width:70%'>
				<tr class='fr'>
					<td>${targetnamecaps} dilution (mcg/ml)</td>
					<td><input type='number' step='0.001' oninput='' id='popup_dilution_input'></td>
				</tr>
			</table>
			<div><span id='popup_dilution_message' style='padding-top:6px;padding-bottom:6px;opacity:0.7;font-size:0.8rem;font-style:italic'>&nbsp;</span></div>
			<div style='text-align:right'>
			<a class='button muted' onclick='popup_dilution_validate("${targetname}",${lowerlimit},${upperlimit},"${targetid}")'>OK</a>
			</div>
		`)

}

	function popup_dilution_validate(targetname,lowerlimit,upperlimit,targetid) {
		ElTarget = document.getElementById(targetid);
		temp = document.getElementById("popup_dilution_input").value * 1;
		if ((temp > upperlimit) || (temp < lowerlimit)) {
			text = `Invalid entry, value must be ${lowerlimit}-${upperlimit}`;
			if (targetid == "opioiddilution") { //this is complex mode
				if (targetname == "fentanyl") {
					document.getElementById("select_opioiddilution").value = "10";
					document.getElementById("custom_opioiddilution").style.display = "none";
				} else if (targetname == "remifentanil") {
					document.getElementById("select_opioiddilution").value = "20";
					document.getElementById("custom_opioiddilution").style.display = "none";
				} else if (targetname == "alfentanil") {
					document.getElementById("select_opioiddilution").value = "100";
					document.getElementById("custom_opioiddilution").style.display = "none";
				}
			} else {
				if (targetname == "fentanyl") {
					document.getElementById("select_fendilution").value = "10";
					document.getElementById("custom_fendilution").style.display = "none";
				} else if (targetname == "remifentanil") {
					document.getElementById("select_remidilution").value = "20";
					document.getElementById("custom_remidilution").style.display = "none";
				} else if (targetname == "alfentanil") {
					document.getElementById("select_alfendilution").value = "100";
					document.getElementById("custom_alfendilution").style.display = "none";
				}
			}
			document.getElementById("popup_dilution_message").innerText = text;
		} else {
			if (targetid == "opioiddilution") { 
					document.getElementById("select_opioiddilution").value = "custom";
					document.getElementById("custom_opioiddilution").style.display = "inline-block";
			} else {
				if (targetname == "fentanyl") {
					document.getElementById("select_fendilution").value = "custom";
					document.getElementById("custom_fendilution").style.display = "inline-block";
				} else if (targetname == "remifentanil") {
					document.getElementById("select_remidilution").value = "custom";
					document.getElementById("custom_remidilution").style.display = "inline-block";
				} else if (targetname == "alfentanil") {
					document.getElementById("select_alfendilution").value = "custom";
					document.getElementById("custom_alfendilution").style.display = "inline-block";
				}
			}
			document.getElementById("popup_dilution_message").innerText = "&nbsp;";
			ElTarget.innerHTML = temp;
			hidemodal('modalWarning')
		}
	}

function popup_reset() {
	displayWarning(`Quick Reset`,
		`
			<div>Proceed with caution. This will reset infusion data and return to start while keeping patient characteristics.<br>&nbsp;</div>
			<div>
			<a class='button invert' onclick='timeFxReset();hideallmodal();'>Confirm</a>
			<a class='button muted right' onclick='hideallmodal()'>Cancel</a>
			</div>
		`)
}




//custom select dropdown code

function dropdownshow(ind) {
	dropdownhide();

	//load option and load unit
	temp_unit = drug_sets[active_drug_set_index].inf_rate_permass_unit;
	temp_parameter = (optionsarray_infusionunit[0][0] == 1) ? 0 : 1;
	if (ind == 0) {
		if (temp_parameter == 0) { // this means ml/h
			document.getElementById("infusionrateoption0").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ml/h';
			document.getElementById("infusionrateoption1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
		} else {
			document.getElementById("infusionrateoption0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml/h';
			document.getElementById("infusionrateoption1").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit;
		}
	} else {
		if (temp_parameter == 0) { // this means ml/h
			document.getElementById("infusionrateoptioncopy0").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ml/h';
			document.getElementById("infusionrateoptioncopy1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
		} else {
			document.getElementById("infusionrateoptioncopy0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml/h';
			document.getElementById("infusionrateoptioncopy1").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit;
		}
	}
	document.getElementById("infusionrateselector" + ind).classList.add("active");
	document.getElementById("infusionratedropdown" + ind).style.display = "block";	
	document.getElementById("infusionrateselector" + ind).setAttribute("onclick", "dropdownhide()");
}

function dropdownshowbolus(ind, source) {
	dropdownhide();

	//load option and load unit
	temp_unit = drug_sets[active_drug_set_index].infused_units;
	if (optionsarray_infusionunit[1][0] == 1) {
		temp_parameter = 0;
	} else if (optionsarray_infusionunit[1][1] == 1) {
		temp_parameter = 1;
	} else {
		temp_parameter = 2;
	}
	if (ind == 0) {
		if (temp_parameter == 0) { // this means mg
			document.getElementById("bolusoption" + source + "0_" + ind).innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			document.getElementById("bolusoption" + source + "1_" + ind).innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
			document.getElementById("bolusoption" + source + "2_" + ind).innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml';
		} else if (temp_parameter == 1) {
			document.getElementById("bolusoption" + source + "0_" + ind).innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			document.getElementById("bolusoption" + source + "1_" + ind).innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
			document.getElementById("bolusoption" + source + "2_" + ind).innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml';
		} else {
			document.getElementById("bolusoption" + source + "0_" + ind).innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			document.getElementById("bolusoption" + source + "1_" + ind).innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
			document.getElementById("bolusoption" + source + "2_" + ind).innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ml';
		}
	} 
	document.getElementById("bolusselector" + source + ind).classList.add("active");
	document.getElementById("bolusdropdown" + source + ind).style.display = "block";	
	document.getElementById("bolusselector" + source + ind).setAttribute("onclick", "dropdownhide()");
}

function dropdownhide() {
	document.getElementById("infusionrateselector0").classList.remove("active");
    document.getElementById("infusionratedropdown0").style.display = "none";
    document.getElementById("infusionrateselector0").setAttribute("onclick", "dropdownshow(0)");
    //hide bolus
	document.getElementById("bolusselector0").classList.remove("active");
	document.getElementById("bolusdropdown0").style.display = "none";	
	document.getElementById("bolusselector0").setAttribute("onclick", "dropdownshowbolus(0,'')");
	document.getElementById("bolusselectorcopy0").classList.remove("active");
	document.getElementById("bolusdropdowncopy0").style.display = "none";	
	document.getElementById("bolusselectorcopy0").setAttribute("onclick", "dropdownshowbolus(0,'copy')");

    if (complex_mode == 1) {
		document.getElementById("infusionrateselector1").classList.remove("active");
    	document.getElementById("infusionratedropdown1").style.display = "none";
    	document.getElementById("infusionrateselector1").setAttribute("onclick", "dropdownshow(1)");
		document.getElementById("bolusselector1").classList.remove("active");
		document.getElementById("bolusdropdown1").style.display = "none";	
		document.getElementById("bolusselector1").setAttribute("onclick", "dropdownshowbolus(1,'')");
		document.getElementById("bolusselectorcopy1").classList.remove("active");
		document.getElementById("bolusdropdowncopy1").style.display = "none";	
		document.getElementById("bolusselectorcopy1").setAttribute("onclick", "dropdownshowbolus(1,'copy')");
    }	
}

function setInfusionUnit(parameter) {
	//parameter is ml/h vs unit/kg/time
	//optionsarray_infusionunit[0] is [1,0] when ml/h

	//only perform the change if the param is different from existing param
	if (optionsarray_infusionunit[0][parameter] != 1) {

		//set the option & write to storage
		optionsarray_infusionunit[0] = (parameter == 0) ? [1,0] : [0,1];
		localStorage.setItem("OPTIONSINFUSIONUNIT",JSON.stringify(optionsarray_infusionunit));

		//get drug_sets infusion unit, if available, if not, get it from the option value
		if (drug_sets.length>0) {
			temp_unit = drug_sets[0].inf_rate_permass_unit;	
		} else {
			temp_unit = document.getElementById("select_defaultrateunit").options[1].textContent;
		}
		
		if (parameter == 0) {
			//make sure the display of the select dropdown in options is correct, otherwise bug
			document.getElementById("select_defaultrateunit").value = "mlh";
			//visual changes
			document.getElementById("infusionrateoption0").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ml/h';
			document.getElementById("infusionrateoption1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			//change description
			document.getElementById("infusionratedescription0").innerHTML = "Infusion rate (ml/h)";
			if (complex_mode == 1) {
				document.getElementById("infusionrateoptioncopy0").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ml/h';
				document.getElementById("infusionrateoptioncopy1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + drug_sets[1].inf_rate_permass_unit;
				document.getElementById("infusionratedescription1").innerHTML = "Infusion rate (ml/h)";
			}
			//update the input field(s)
			elem = document.getElementById("inputInfusion" + active_drug_set_index);
			if (elem.value*1 > 0) {
				elem.value = Math.round(elem.value/drug_sets[active_drug_set_index].infusate_concentration/drug_sets[active_drug_set_index].inf_rate_permass_factor*mass*10)/10;
			}
			if (complex_mode == 1) {
				elem = document.getElementById("inputInfusion" + alt_drug_set_index);
				if (elem.value > 0) elem.value = Math.round(elem.value/drug_sets[alt_drug_set_index].infusate_concentration/drug_sets[alt_drug_set_index].inf_rate_permass_factor*mass*10)/10;
			}
		} else {
			document.getElementById("select_defaultrateunit").value = "unitkgtime";
			document.getElementById("infusionrateoption0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml/h';
			document.getElementById("infusionrateoption1").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			document.getElementById("infusionratedescription0").innerHTML = "Infusion rate (" + temp_unit + ")";
			if (complex_mode == 1) {
				document.getElementById("infusionrateoptioncopy0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml/h';
				document.getElementById("infusionrateoptioncopy1").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + drug_sets[1].inf_rate_permass_unit;
				document.getElementById("infusionratedescription1").innerHTML = "Infusion rate (" + drug_sets[1].inf_rate_permass_unit + ")";
			}
			//update the input field(s)
			elem = document.getElementById("inputInfusion" + active_drug_set_index);
			if (elem.value*1 > 0) {
				elem.value = Math.round(elem.value*drug_sets[active_drug_set_index].infusate_concentration*drug_sets[active_drug_set_index].inf_rate_permass_factor/mass*drug_sets[active_drug_set_index].inf_rate_permass_dp)/drug_sets[active_drug_set_index].inf_rate_permass_dp;
			}
			if (complex_mode == 1) {
				elem = document.getElementById("inputInfusion" + alt_drug_set_index);
				if (elem.value > 0) elem.value = Math.round(elem.value*drug_sets[alt_drug_set_index].infusate_concentration*drug_sets[alt_drug_set_index].inf_rate_permass_factor/mass*drug_sets[alt_drug_set_index].inf_rate_permass_dp)/drug_sets[alt_drug_set_index].inf_rate_permass_dp;
			}
		}
	}
	//close the dropdown
	dropdownhide();
}

function setBolusUnit(parameter) {
	//parameter is mg vs mg/kg vs ml
	//optionsarray_infusionunit[1] is [1,0,0] when mg

	//get original parameter
	if (optionsarray_infusionunit[1][0] == 1) {
		orig_param = 0;
	} else if (optionsarray_infusionunit[1][1] == 1) {
		orig_param = 1;
	} else {
		orig_param = 2;
	}

	//only perform the change if the param is different from existing param
	if (optionsarray_infusionunit[1][parameter] != 1) {

		//set the option & write to storage
		if (parameter == 0) {
			optionsarray_infusionunit[1] = [1,0,0];
		} else if (parameter == 1) {
			optionsarray_infusionunit[1] = [0,1,0];
		} else {
			optionsarray_infusionunit[1] = [0,0,1];
		}
		localStorage.setItem("OPTIONSINFUSIONUNIT",JSON.stringify(optionsarray_infusionunit));

		//get drug_sets infusion unit, if available, if not, get it from the option value
		if (drug_sets.length>0) {
			temp_unit = drug_sets[active_drug_set_index].infused_units;	
		} else {
			temp_unit = document.getElementById("select_defaultbolusunit").options[0].textContent;
		}
		
		if (parameter == 0) {
			//this is mg
			//make sure the display of the select dropdown in options is correct, otherwise bug
			document.getElementById("select_defaultbolusunit").value = "mg";
			//visual changes
			document.getElementById("bolusoption0_0").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			document.getElementById("bolusoption1_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
			document.getElementById("bolusoption2_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml';
			document.getElementById("bolusoptioncopy0_0").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			document.getElementById("bolusoptioncopy1_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
			document.getElementById("bolusoptioncopy2_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml';
			//change description
			document.getElementById("bolusdescription0").innerHTML = "Initial bolus (" + temp_unit + ")";
			document.getElementById("bolusdescriptioncopy0").innerHTML = "Custom bolus (" + temp_unit + ")";
			if (complex_mode == 1) {
				temp_unit = drug_sets[1].infused_units;
				document.getElementById("bolusoption0_1").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit;
				document.getElementById("bolusoption1_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
				document.getElementById("bolusoption2_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml';
				document.getElementById("bolusoptioncopy0_1").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit;
				document.getElementById("bolusoptioncopy1_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
				document.getElementById("bolusoptioncopy2_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml';
				document.getElementById("bolusdescription1").innerHTML = "Initial bolus (" + temp_unit + ")";
				document.getElementById("bolusdescriptioncopy1").innerHTML = "Custom bolus (" + temp_unit + ")";
			}
			//update the input field(s)
			if (document.getElementById("tableInitialBolus0").style.display != "none") {
				//initial bolus not yet hidden
				elem = document.getElementById("inputBolus_initial0");
			} else {
				elem = document.getElementById("inputBolus0");
			}
			if (elem.value*1 > 0) {
				if (orig_param == 1) {
					//from mg/kg to mg
					elem.value = Math.round(elem.value * mass * 100)/100;
				} else {
					//from ml to mg
					elem.value = Math.round(elem.value * drug_sets[0].infusate_concentration * 100)/100;
				}
			}
			if (complex_mode == 1) {
				if (document.getElementById("tableInitialBolus1").style.display != "none") {
					//initial bolus not yet hidden
					elem = document.getElementById("inputBolus_initial1");
				} else {
					elem = document.getElementById("inputBolus1");
				}
				if (elem.value > 0) {
					if (orig_param == 1) {
						//from mg/kg to mg
						elem.value = Math.round(elem.value * mass * 100)/100;
					} else {
						//from ml to mg
						elem.value = Math.round(elem.value * drug_sets[1].infusate_concentration * 100)/100;
					}
				}
			}
		} else if (parameter == 1) {
			//this is mg/kg
			//make sure the display of the select dropdown in options is correct, otherwise bug
			document.getElementById("select_defaultbolusunit").value = "mgkg";
			//visual changes
			document.getElementById("bolusoption0_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			document.getElementById("bolusoption1_0").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
			document.getElementById("bolusoption2_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml';
			document.getElementById("bolusoptioncopy0_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			document.getElementById("bolusoptioncopy1_0").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
			document.getElementById("bolusoptioncopy2_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml';
			//change description
			document.getElementById("bolusdescription0").innerHTML = "Initial bolus (" + temp_unit + "/kg)";
			document.getElementById("bolusdescriptioncopy0").innerHTML = "Custom bolus (" + temp_unit + "/kg)";
			if (complex_mode == 1) {
				temp_unit = drug_sets[1].infused_units;
				document.getElementById("bolusoption0_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
				document.getElementById("bolusoption1_1").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
				document.getElementById("bolusoption2_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml';
				document.getElementById("bolusoptioncopy0_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
				document.getElementById("bolusoptioncopy1_1").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
				document.getElementById("bolusoptioncopy2_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ml';
				document.getElementById("bolusdescription1").innerHTML = "Initial bolus (" + temp_unit + "/kg)";
				document.getElementById("bolusdescriptioncopy1").innerHTML = "Custom bolus (" + temp_unit + "/kg)";
			}
			//update the input field(s)
			if (document.getElementById("tableInitialBolus0").style.display != "none") {
				//initial bolus not yet hidden
				elem = document.getElementById("inputBolus_initial0");
			} else {
				elem = document.getElementById("inputBolus0");
			}
			if (elem.value*1 > 0) {
				if (orig_param == 0) {
					//from mg to mg/kg
					elem.value = Math.round(elem.value / mass * 100)/100;
				} else {
					//from ml to mg/kg
					elem.value = Math.round(elem.value * drug_sets[0].infusate_concentration / mass * 100)/100;
				}
			}
			if (complex_mode == 1) {
				if (document.getElementById("tableInitialBolus1").style.display != "none") {
					//initial bolus not yet hidden
					elem = document.getElementById("inputBolus_initial1");
				} else {
					elem = document.getElementById("inputBolus1");
				}
				if (elem.value > 0) {
					if (orig_param == 0) {
						//from mg to mg/kg
						elem.value = Math.round(elem.value / mass * 100)/100;
					} else {
						//from ml to mg/kg
						elem.value = Math.round(elem.value * drug_sets[1].infusate_concentration / mass * 100)/100;
					}
				}
			}
		} else {
			//this is ml
			//make sure the display of the select dropdown in options is correct, otherwise bug
			document.getElementById("select_defaultbolusunit").value = "ml";
			//visual changes
			document.getElementById("bolusoption0_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			document.getElementById("bolusoption1_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
			document.getElementById("bolusoption2_0").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ml';
			document.getElementById("bolusoptioncopy0_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
			document.getElementById("bolusoptioncopy1_0").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
			document.getElementById("bolusoptioncopy2_0").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ml';
			//change description
			document.getElementById("bolusdescription0").innerHTML = "Initial bolus (ml)";
			document.getElementById("bolusdescriptioncopy0").innerHTML = "Custom bolus (ml)";
			if (complex_mode == 1) {
				temp_unit = drug_sets[1].infused_units;
				document.getElementById("bolusoption0_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
				document.getElementById("bolusoption1_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
				document.getElementById("bolusoption2_1").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ml';
				document.getElementById("bolusoptioncopy0_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit;
				document.getElementById("bolusoptioncopy1_1").innerHTML = '<i class="far fa-circle infusioncheck"></i>&nbsp; ' + temp_unit + "/kg";
				document.getElementById("bolusoptioncopy2_1").innerHTML = '<i class="far fa-check-circle infusioncheck"></i>&nbsp; ml';
				document.getElementById("bolusdescription1").innerHTML = "Initial bolus (ml)";
				document.getElementById("bolusdescriptioncopy1").innerHTML = "Custom bolus (ml)";
			}
			//update the input field(s)
			if (document.getElementById("tableInitialBolus0").style.display != "none") {
				//initial bolus not yet hidden
				elem = document.getElementById("inputBolus_initial0");
			} else {
				elem = document.getElementById("inputBolus0");
			}
			if (elem.value*1 > 0) {
				if (orig_param == 0) {
					//from mg to ml
					elem.value = Math.round(elem.value / drug_sets[0].infusate_concentration * 100)/100;
				} else {
					//from mg/kg to ml
					elem.value = Math.round(elem.value * mass / drug_sets[0].infusate_concentration * 100)/100;
				}
			}
			if (complex_mode == 1) {
				if (document.getElementById("tableInitialBolus1").style.display != "none") {
					//initial bolus not yet hidden
					elem = document.getElementById("inputBolus_initial1");
				} else {
					elem = document.getElementById("inputBolus1");
				}
				if (elem.value > 0) {
					if (orig_param == 0) {
						//from mg to ml
						elem.value = Math.round(elem.value / drug_sets[1].infusate_concentration * 100)/100;
					} else {
						//from mg/kg to ml
						elem.value = Math.round(elem.value * mass / drug_sets[1].infusate_concentration * 100)/100;
					}
				}
			}
		}
	}
	//close the dropdown
	dropdownhide();
}

function displayWarningBanner() {
	//loop7 checks whether sim session expires. Q2mins.
	will_end_drug_set = 0;
	max_time = drug_sets[0].cpt_rates_real.length;
	if (complex_mode == 1) {
		if (drug_sets[1].cpt_rates_real.length < max_time) {
			max_time = drug_sets[1].cpt_rates_real.length;
			will_end_drug_set = 1;
		}
	}

	
	if (Math.floor(time_in_s) > max_time - 60*7) {
		//really the end (~7mins), attempt to recover
		//console.log("will end drug set" + will_end_drug_set + " - condition 7mins");
		extendSession(will_end_drug_set);
		hideWarningBanner();
	} else if (Math.floor(time_in_s) > max_time - 60*20) {
		//console.log("will end drug set" + will_end_drug_set + " - condition 20mins");
		//check if near the end, i.e. 600s before end i.e. 15 mins /20mins
		hideallmodal();
		//display the banner
		document.getElementById("warningBanner").style.display = "flex";
		document.querySelector(".warningbanner_up").innerHTML = `<b>WARNING</b> - Time's up!`;
		document.getElementById("warningmessage").innerHTML = `Simulation session expiring in <15 mins. Do you want to continue using SimTIVA?`;
		document.getElementById("warningbutton").innerHTML = "Yes";
		document.getElementById("warningbutton").setAttribute("onclick", `extendSession(${will_end_drug_set});document.getElementById('warningBanner').style.display='none'`)
	} else if (Math.floor(time_in_s) > max_time - 60*60) {
		//console.log("will end drug set" + will_end_drug_set + " - condition 60mins");
		//one hour left for infusions
		hideallmodal();
		document.getElementById("warningBanner").style.display = "flex";
		document.querySelector(".warningbanner_up").innerHTML = `<b>ATTENTION</b> - Session inactivity`;
		document.getElementById("warningmessage").innerHTML = `Current session will expire in 1h. Please update your infusion scheme to prevent data loss.`;
		document.getElementById("warningbutton").innerHTML = "OK";
		document.getElementById("warningbutton").setAttribute("onclick", `document.getElementById('warningBanner').style.display='none'`);

	} else {
		//console.log("displayrwarningbanner fired conditions not met, will end drug set" + will_end_drug_set)
	}


}


function hideWarningBanner() {
	document.getElementById("warningBanner").style.display = "none";
}

function extendSession(ind) {
	//first see if the target is zero or the inf rate is zero
	if ((drug_sets[ind].cpt_active == 1) && (drug_sets[ind].desired > 0)) {
		deliver_cpt(drug_sets[ind].desired,0,0,ind);
	}
	if ((drug_sets[ind].cet_active == 1) && (drug_sets[ind].IB_active==0) && (drug_sets[ind].desired > 0)) {
		deliver_cet(drug_sets[ind].desired,ind);
	}
	if ((drug_sets[ind].manualmode_active == 1) && (drug_sets[ind].inf_rate_mls>0)) {
		lookahead(0,21600,ind);
	}
}
