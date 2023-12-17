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

var ptolcouplesarray = new Array(); //ptol couples over time
//var ptol0overtime = new Array(); //ptol chart data for 0 over time, series based on chart data
//var ptol1overtime = new Array(); //ptol chart data for 1 over time

var loop6 = null; //this is setinterval function


var eventArray = new Array();

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


//charting scripts


	setTimeout(
		function() {
			var ctx = document.getElementById('myChart2').getContext('2d');
			myChart2 = new Chart(ctx, {
				type: 'line',
				data: {
					datasets: [{ //dataset 0 - current dot
						label:'Current Dot',
						data: [{x:0,y:0}],
						borderWidth:0,
						pointRadius:7,
						pointBorderColor:'red',
						pointBackgroundColor:'red'
					},{ // dataset 1
						label:'History dot 4',
						data: [],
						borderWidth:0,
						pointRadius:2,
						borderColor:'grey',
						pointBorderColor:dotColor0,
						pointBackgroundColor:dotColor0,
					},{ // dataset 2
						label:'History dot 3',
						data: [],
						borderWidth:0,
						pointRadius:3,
						borderColor:'grey',
						pointBorderColor:dotColor1,
						pointBackgroundColor:dotColor1,
					},{ // dataset 3
						label:'History dot 2',
						data: [],
						borderWidth:0,
						pointRadius:4,
						borderColor:'grey',
						pointBorderColor:dotColor2,
						pointBackgroundColor:dotColor2,
					},{ // dataset 4
						label:'History dot 1',
						data: [],
						borderWidth:0,
						pointRadius:5,
						borderColor:'grey',
						pointBorderColor:dotColor3,
						pointBackgroundColor:dotColor3,
					},{ // dataset 5
						label:'current, actually',
						data: [],
						borderWidth:0,
						pointRadius:5,
						borderColor:'red',
						pointBorderColor:dotColor4,
						pointBackgroundColor:dotColor4,
					},{ // dataset 6
						label:'Future dot 1',
						data: [],
						borderWidth:0,
						pointRadius:5,
						borderColor:'blue',
						pointBorderColor:dotColor5,
						pointBackgroundColor:dotColor5,
					},{ // dataset 7
						label:'Future dot 2',
						data: [],
						borderWidth:0,
						pointRadius:4,
						borderColor:'blue',
						pointBorderColor:dotColor6,
						pointBackgroundColor:dotColor6,
					},{ // dataset 8
						label:'Future dot 3',
						data: [],
						borderWidth:0,
						pointRadius:3,
						borderColor:'blue',
						pointBorderColor:dotColor7,
						pointBackgroundColor:dotColor7,
					},{ // dataset 9
						label:'Future dot 4',
						data: [],
						borderWidth:0,
						pointRadius:2,
						borderColor:'blue',
						pointBorderColor:dotColor8,
						pointBackgroundColor:dotColor8,
					},{ //dataset 10
						label:'trend line',
						data: [],
						borderWidth:1,
						pointRadius:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
						             0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],
						pointStyle:['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',
						            '','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',
						            'triangle'],
						borderColor:lineColor1,
						pointBorderColor:lineColor1,
						pointBackgroundColor:lineColor1,
						tension:0.4
					},{ //dataset 11
						label: 'PTOL90',
						data: [
							{x: 0.1, y: 14.732482339267616},
							{x: 0.2, y: 13.649211579027352},
							
							{x: 0.6, y: 10.547118038339317},
							{x: 0.8, y: 9.470881503814896},
							{x: 1, y: 8.593948031239442},
							{x: 1.2, y: 7.865647350625931},
							
							{x: 1.6, y: 6.725698459230869},
							{x: 1.8, y: 6.271259374147702},
							{x: 2, y: 5.874344223885188},
							{x: 2.2, y: 5.5246808772253555},
							
							{x: 2.6, y: 4.936948869009893},
							{x: 2.8, y: 4.687608017039696},
							{x: 3, y: 4.46224224698971},
							{x: 3.2, y: 4.257552235659907},
							
							{x: 3.6, y: 3.8997747368649573},
							{x: 3.8, y: 3.7425257555397575},
							{x: 4, y: 3.5974666177281387},
							{x: 4.2, y: 3.463232788708432},
							
							{x: 4.6, y: 3.2227305117147913},
							{x: 4.8, y: 3.114585192529731},
							{x: 5, y: 3.013462296668376},
							{x: 5.2, y: 2.918699331364339},
							
							{x: 5.6, y: 2.7459952289167453},
							{x: 5.8, y: 2.667087320039827},
							{x: 6, y: 2.5925876742286587},
							{x: 6.2, y: 2.5221369222115757},
							
							{x: 6.6, y: 2.3921298643656184},
							{x: 6.8, y: 2.3320260989292962},
							{x: 7, y: 2.2748685965045583},
							{x: 7.2, y: 2.2204459028082772},
							
							{x: 7.6, y: 2.1190556789357533},
							{x: 7.8, y: 2.071755328959509},
							{x: 8, y: 2.0265204964494754},
							{x: 8.2, y: 1.9832187764398717},
							
							{x: 8.6, y: 1.9019393183890572},
							{x: 8.8, y: 1.8637477658109634},
							{x: 9, y: 1.8270598176650783},
							{x: 9.2, y: 1.791788392613629},
							
							{x: 9.6, y: 1.7251791586874718},
							{x: 9.8, y: 1.693697787178576},
							{x: 10, y: 1.6633447802398922}
						],
						borderWidth:3,
						pointRadius:0,
						borderJoinStyle:'round',
						borderColor: lineColor1,
						backgroundColor: bandColor0,
						fill:'+1'
					},{ //12
						label: 'PTOL80',
						data: [
							{x: 0.1, y: 11.654377308880333},
							{x: 0.2, y: 10.797437800874429},
							{x: 0.4, y: 9.413150903326423},
							
							{x: 0.8, y: 7.492099698565929},
							{x: 1, y: 6.798386763513528},
							{x: 1.2, y: 6.222252292029331},
							{x: 1.4, y: 5.73613883171454},
							
							{x: 1.8, y: 4.9609849355368985},
							{x: 2, y: 4.646998547211778},
							{x: 2.2, y: 4.370391490830125},
							{x: 2.4, y: 4.124863878985736},
							
							{x: 2.8, y: 3.70821096191647},
							{x: 3, y: 3.5299315887474085},
							{x: 3.2, y: 3.3680081213736743},
							{x: 3.4, y: 3.2202884669274607},
							
							{x: 3.8, y: 2.96058778411073},
							{x: 4, y: 2.845836319610314},
							{x: 4.2, y: 2.739648397236795},
							{x: 4.4, y: 2.641099893739068},
							
							{x: 4.8, y: 2.4638448673136275},
							{x: 5, y: 2.383849904089159},
							{x: 5.2, y: 2.308886070627236},
							{x: 5.4, y: 2.2384932026203077},
							
							{x: 5.8, y: 2.109844167986957},
							{x: 6, y: 2.05090997335045},
							{x: 6.2, y: 1.9951787240746222},
							{x: 6.4, y: 1.9423962181467223},
							
							{x: 6.8, y: 1.8447883679885955},
							{x: 7, y: 1.7995729668124045},
							{x: 7.2, y: 1.7565209819604333},
							{x: 7.4, y: 1.7154807721015444},
							
							{x: 7.8, y: 1.6388968090612972},
							{x: 8, y: 1.6031130359376877},
							{x: 8.2, y: 1.5688584838877373},
							{x: 8.4, y: 1.536037176693433},
							
							{x: 8.8, y: 1.4743489366655842},
							{x: 9, y: 1.4453263198020887},
							{x: 9.2, y: 1.417424267296257},
							{x: 9.4, y: 1.390579110718676},
							
							{x: 9.8, y: 1.339828048283688},
							{x: 10, y: 1.3158167929381022}
						],
						borderWidth:1,
						pointRadius:0,
						borderJoinStyle:'round',
						backgroundColor: bandColor2,
						borderColor: lineColor0,
						fill:'+1'
					},{ //13
						label: 'PTOL70',
						data: [
							{x: 0.1, y: 9.973210105571793},
							{x: 0.2, y: 9.23988583310328},
							{x: 0.4, y: 8.055285085269524},
							
							{x: 0.8, y: 6.411349353581867},
							{x: 1, y: 5.817705894916879},
							{x: 1.2, y: 5.324679971618839},
							
							{x: 1.6, y: 4.552987222108863},
							{x: 1.8, y: 4.24535295034475},
							{x: 2, y: 3.9766597256393856},
							
							{x: 2.4, y: 3.529844026129343},
							{x: 2.6, y: 3.342086365165016},
							{x: 2.8, y: 3.1732941245001163},
							
							{x: 3.2, y: 2.88216622316983},
							{x: 3.4, y: 2.7557554239079955},
							{x: 3.6, y: 2.6399673808866515},

							{x: 4, y: 2.4353187467093913},
							{x: 4.2, y: 2.344448644220235},
							{x: 4.4, y: 2.2601159591763413},
							
							{x: 4.8, y: 2.108430324332292},
							{x: 5, y: 2.039974794321503},
							{x: 5.2, y: 1.975824643556676},
							
							{x: 5.6, y: 1.858911942754506},
							{x: 5.8, y: 1.8054949329052385},
							{x: 6, y: 1.7550621135503435},
							
							{x: 6.4, y: 1.6622016842619654},
							{x: 6.6, y: 1.619361434667585},
							{x: 6.8, y: 1.5786739614347312},
							
							{x: 7.2, y: 1.503139322131634},
							{x: 7.4, y: 1.468019244511736},
							{x: 7.6, y: 1.4345028234041621},
							
							{x: 8, y: 1.371860778714024},
							{x: 8.2, y: 1.3425475142115877},
							{x: 8.4, y: 1.3144607461318472},
							
							{x: 8.8, y: 1.261671157933781},
							{x: 9, y: 1.2368351115177618},
							{x: 9.2, y: 1.2129579858127857},
							
							{x: 9.6, y: 1.1678666108755074},
							{x: 9.8, y: 1.1465551763704798},
							{x: 10, y: 1.1260075925645574}],
						borderWidth:1,
						pointRadius:0,
						borderJoinStyle:'round',
						borderColor: lineColor0,
						backgroundColor: bandColor4,
						fill:'+1'
					},{ //14
						label: 'PTOL60',
						data: [
							{x: 0.1, y: 8.777618956368189},
							{x: 0.2, y: 8.132205797811704},
							{x: 0.4, y: 7.089615310912767},
							
							{x: 0.8, y: 5.64275504337955},
							{x: 1, y: 5.120277724548109},
							{x: 1.2, y: 4.686355883484711},
							
							{x: 1.6, y: 4.007173871385477},
							{x: 1.8, y: 3.736418880075648},
							{x: 2, y: 3.499936672475923},
							
							{x: 2.4, y: 3.106685360961775},
							{x: 2.6, y: 2.9414361396340207},
							{x: 2.8, y: 2.7928787588444237},
							
							{x: 3.2, y: 2.5366513497761276},
							{x: 3.4, y: 2.4253947116280523},
							{x: 3.6, y: 2.323487370803344},
							
							{x: 4, y: 2.1433720707410693},
							{x: 4.2, y: 2.0633955009372977},
							{x: 4.4, y: 1.9891726411913517},
							
							{x: 4.8, y: 1.8556711216483082},
							{x: 5, y: 1.7954220592571293},
							{x: 5.2, y: 1.7389622460729428},
							
							{x: 5.6, y: 1.6360650717491003},
							{x: 5.8, y: 1.589051707618379},
							{x: 6, y: 1.5446647884111615},
							
							{x: 6.4, y: 1.4629364927280313},
							{x: 6.6, y: 1.4252319439463812},
							{x: 6.8, y: 1.3894220961085324},
							
							{x: 7.2, y: 1.3229425699789374},
							{x: 7.4, y: 1.2920326968485885},
							{x: 7.6, y: 1.262534233450219},
							
							{x: 8, y: 1.2074017341729166},
							{x: 8.2, y: 1.1816025518187947},
							{x: 8.4, y: 1.1568828331614975},
							
							{x: 8.8, y: 1.1104216752032043},
							{x: 9, y: 1.0885629808094406},
							{x: 9.2, y: 1.067548251450185},
							
							{x: 9.6, y: 1.027862442846089},
							{x: 9.8, y: 1.00910582892554},
							{x: 10, y: 0.9910214950738276}],
						borderWidth:1,
						pointRadius:0,
						borderJoinStyle:'round',
						borderColor: lineColor0,
						backgroundColor: bandColor6,
						fill:'+1'
					},{ //15
						label: 'PTOL50',
						data: [
							{x: 0.1, y: 7.806984126984127},
							{x: 0.2, y: 7.232941176470589},
							{x: 0.4, y: 6.305641025641026},
							
							{x: 0.8, y: 5.018775510204081},
							{x: 1, y: 4.554074074074074},
							{x: 1.2, y: 4.168135593220339},
							
							{x: 1.6, y: 3.5640579710144933},
							{x: 1.8, y: 3.3232432432432435},
							{x: 2, y: 3.112911392405063},
							
							{x: 2.4, y: 2.7631460674157307},
							{x: 2.6, y: 2.6161702127659576},
							{x: 2.8, y: 2.484040404040404},
							
							{x: 3.2, y: 2.2561467889908258},
							{x: 3.4, y: 2.1571929824561407},
							{x: 3.6, y: 2.0665546218487396},
							
							{x: 4, y: 1.906356589147287},
							{x: 4.2, y: 1.835223880597015},
							{x: 4.4, y: 1.769208633093525},
							
							{x: 4.8, y: 1.6504697986577181},
							{x: 5, y: 1.5968831168831168},
							{x: 5.2, y: 1.5466666666666666},
							
							{x: 5.6, y: 1.455147928994083},
							{x: 5.8, y: 1.4133333333333333},
							{x: 6, y: 1.3738547486033519},
							
							{x: 6.4, y: 1.3011640211640212},
							{x: 6.6, y: 1.2676288659793815},
							{x: 6.8, y: 1.2357788944723618},
							
							{x: 7.2, y: 1.1766507177033494},
							{x: 7.4, y: 1.149158878504673},
							{x: 7.6, y: 1.1229223744292238},
							
							{x: 8, y: 1.073886462882096},
							{x: 8.2, y: 1.0509401709401711},
							{x: 8.4, y: 1.0289539748953975},
							
							{x: 8.8, y: 0.9876305220883533},
							{x: 9, y: 0.9681889763779528},
							{x: 9.2, y: 0.9494980694980696},
							
							{x: 9.6, y: 0.9142007434944238},
							{x: 9.8, y: 0.8975182481751824},
							{x: 10, y: 0.8814336917562724}],
						borderWidth:3,
						pointRadius:0,
						borderJoinStyle:'round',
						borderColor: lineColor1,
						backgroundColor: bandColor8,
						fill:'+1'
					},{ //16
						label: 'PTOL40',
						data: [
							{x: 0.1, y: 6.943682730128474},
							{x: 0.2, y: 6.433117823501381},
							{x: 0.4, y: 5.60835912818069},
							
							{x: 0.8, y: 4.463796040796876},
							{x: 1, y: 4.0504815925749424},
							{x: 1.2, y: 3.7072204406618123},
							
							{x: 1.6, y: 3.1699421159282166},
							{x: 1.8, y: 2.9557568378249583},
							{x: 2, y: 2.7686836202411},
							
							{x: 2.4, y: 2.4575955730229992},
							{x: 2.6, y: 2.3268724042451803},
							{x: 2.8, y: 2.209353595949969},
							
							{x: 3.2, y: 2.0066606054958434},
							{x: 3.4, y: 1.9186491754302364},
							{x: 3.6, y: 1.8380336638575372},
							
							{x: 4, y: 1.695550434101139},
							{x: 4.2, y: 1.632283626858559},
							{x: 4.4, y: 1.573568388482352},
							
							{x: 4.8, y: 1.467959771805684},
							{x: 5, y: 1.4202987402535514},
							{x: 5.2, y: 1.375635257855641},
							
							{x: 5.6, y: 1.2942367218878517},
							{x: 5.8, y: 1.2570460114887754},
							{x: 6, y: 1.2219329944080835},
							
							{x: 6.4, y: 1.1572804550214122},
							{x: 6.6, y: 1.127453639170345},
							{x: 6.8, y: 1.099125658286668},
							
							{x: 7.2, y: 1.046535913871038},
							{x: 7.4, y: 1.0220841401824623},
							{x: 7.6, y: 0.9987488858403969},
							
							{x: 8, y: 0.9551353973757507},
							{x: 8.2, y: 0.9347265213634485},
							{x: 8.4, y: 0.9151715732177695},
							
							{x: 8.8, y: 0.8784176947752887},
							{x: 9, y: 0.8611260078702635},
							{x: 9.2, y: 0.8445019536642738},
							
							{x: 9.6, y: 0.8131078289927395},
							{x: 9.8, y: 0.7982700948870325},
							{x: 10, y: 0.7839641792080535}],
						borderWidth:1,
						pointRadius:0,

						borderJoinStyle:'round',
						borderColor: lineColor0,
						backgroundColor: bandColor10,
						fill:'+1'
					},{ //17
						label: 'PTOL30',
						data: [
							{x: 0.1, y: 6.1112721494688405},
							{x: 0.2, y: 5.6619139031843675},
							{x: 0.4, y: 4.936027505340218},
							
							{x: 0.8, y: 3.928674953229969},
							{x: 1, y: 3.5649087538568236},
							{x: 1.2, y: 3.2627978425130255},
							
							{x: 1.6, y: 2.789928589974906},
							{x: 1.8, y: 2.6014199014630877},
							{x: 2, y: 2.436773072256563},
							
							{x: 2.4, y: 2.162978345036725},
							{x: 2.6, y: 2.0479263054071115},
							{x: 2.8, y: 1.9444956839219039},
							
							{x: 3.2, y: 1.7661015844795274},
							{x: 3.4, y: 1.688640988669022},
							{x: 3.6, y: 1.617689686624105},
							
							{x: 4, y: 1.4922873853354146},
							{x: 4.2, y: 1.4366050202109588},
							{x: 4.4, y: 1.3849285806350249},
							
							{x: 4.8, y: 1.2919803537467685},
							{x: 5, y: 1.250032939664081},
							{x: 5.2, y: 1.210723727724959},
							
							{x: 5.6, y: 1.139083270463127},
							{x: 5.8, y: 1.1063509925762556},
							{x: 6, y: 1.0754473335657457},
							
							{x: 6.4, y: 1.0185453582448067},
							{x: 6.6, y: 0.9922941892178788},
							{x: 6.8, y: 0.9673621744134094},
							
							{x: 7.2, y: 0.9210769029103756},
							{x: 7.4, y: 0.8995564145246191},
							{x: 7.6, y: 0.8790185968414086},
							
							{x: 8, y: 0.8406335052762816},
							{x: 8.2, y: 0.8226712508900363},
							{x: 8.4, y: 0.8054605552647217},
							
							{x: 8.8, y: 0.773112741800275},
							{x: 9, y: 0.7578939870404271},
							{x: 9.2, y: 0.7432628289894536},
							
							{x: 9.6, y: 0.715632240551184},
							{x: 9.8, y: 0.702573258059374},
							{x: 10, y: 0.6899823394561595},

						],
						borderWidth:1,
						pointRadius:0,
						borderJoinStyle:'round',
						borderColor: lineColor0,
						backgroundColor: bandColor12,
						fill:'+1'
					},{ //18
						label: 'PTOL20',
						data: [
{x: 0.1, y: 5.229708936275862},
{x: 0.2, y: 4.845171514490873},
{x: 0.4, y: 4.223995679299734},

{x: 0.8, y: 3.3619557447487685},
{x: 1, y: 3.0506635461609193},
{x: 1.2, y: 2.7921327371642315},

{x: 1.6, y: 2.3874758187346328},
{x: 1.8, y: 2.2261598850363464},
{x: 2, y: 2.0852636897808816},

{x: 2.4, y: 1.8509643987942659},
{x: 2.6, y: 1.7525088456669111},
{x: 2.8, y: 1.663998297905956},

{x: 3.2, y: 1.511337903602657},
{x: 3.4, y: 1.4450511534446462},
{x: 3.6, y: 1.3843347184259636},

{x: 4, y: 1.2770219495557336},
{x: 4.2, y: 1.2293718768111166},
{x: 4.4, y: 1.1851498668538822},

{x: 4.8, y: 1.1056096073334876},
{x: 5, y: 1.0697131915109717},
{x: 5.2, y: 1.0360744119037084},

{x: 5.6, y: 0.9747682336845541},
{x: 5.8, y: 0.9467576522568371},
{x: 6, y: 0.9203119077803891},

{x: 6.4, y: 0.8716181560459769},
{x: 6.6, y: 0.8491537705808745},
{x: 6.8, y: 0.8278182487069832},

{x: 7.2, y: 0.7882097200607161},
{x: 7.4, y: 0.7697936051060263},
{x: 7.6, y: 0.7522184086424185},

{x: 8, y: 0.719370443199518},
{x: 8.2, y: 0.7039992798832891},
{x: 8.4, y: 0.6892712614756888},

{x: 8.8, y: 0.6615896847095969},
{x: 9, y: 0.6485662657192506},
{x: 9.2, y: 0.6360456814389562},

{x: 9.6, y: 0.6124008605676196},
{x: 9.8, y: 0.601225662382079},
{x: 10, y: 0.5904510089343715}
						],
						borderWidth:1,
						pointRadius:0,
						borderJoinStyle:'round',
						borderColor: lineColor0,
						backgroundColor: bandColor14,
						fill:'+1'
					},{ //19
						label: 'PTOL10',
						data: [
{x: 0.1, y: 4.137048988447118},
{x: 0.2, y: 3.83285420988483},
{x: 0.4, y: 3.3414626445149795},

{x: 0.8, y: 2.659531492573147},
{x: 1, y: 2.413278576594152},
{x: 1.2, y: 2.2087634429844782},

{x: 1.6, y: 1.8886527990736843},
{x: 1.8, y: 1.7610411234605974},
{x: 2, y: 1.649582824507395},

{x: 2.4, y: 1.4642364397312835},
{x: 2.6, y: 1.3863515227243002},
{x: 2.8, y: 1.3163337690513557},

{x: 3.2, y: 1.1955692030833414},
{x: 3.4, y: 1.1431319573340721},
{x: 3.6, y: 1.095101202824237},

{x: 4, y: 1.0102096367138311},
{x: 4.2, y: 0.9725152472842105},
{x: 4.4, y: 0.9375326844322605},

{x: 4.8, y: 0.8746110277589544},
{x: 5, y: 0.8462145658187286},
{x: 5.2, y: 0.8196040448810328},

{x: 5.6, y: 0.7711067641188415},
{x: 5.8, y: 0.748948523770599},
{x: 6, y: 0.7280281739446045},

{x: 6.4, y: 0.6895081647411863},
{x: 6.6, y: 0.6717373357530114},
{x: 6.8, y: 0.6548595132466544},

{x: 7.2, y: 0.6235265221822212},
{x: 7.4, y: 0.6089581454957206},
{x: 7.6, y: 0.595054991488969},

{x: 8, y: 0.5690700573628131},
{x: 8.2, y: 0.5569104407524966},
{x: 8.4, y: 0.5452595947116494},

{x: 8.8, y: 0.5233616190204184},
{x: 9, y: 0.5130592249452134},
{x: 9.2, y: 0.5031546067030279},

{x: 9.6, y: 0.48444997448358446},
{x: 9.8, y: 0.4756096464820591},
{x: 10, y: 0.46708617611499714}],
						borderWidth:3,
						pointRadius:0,
						borderJoinStyle:'round',
						borderColor: lineColor1,
						fill:false
					},{ //dataset 9 - for animation
					},]
				},//end data
				options: {

		    	maintainAspectRatio: false,
		    	interaction: {

		    	},
	        animation: {
	            duration: 0 // general animation time
	        },
	        hover: {
	            animationDuration: 0.1 // duration of animations when hovering an item
	        },
	        responsiveAnimationDuration: 0, // animation duration after a resize

		    	scales: {
		    		y: {
		    			display: true,
		    			min: 0,
		    			max: 10,
		    			title: {
		    				display: true,
		    				text: "Propofol Ce (mcg/ml)"
		    			}
		    		},
		    		x: {
		    			type: 'linear',
		    			display: true,
		    			position:'bottom',
		    			min:0,
		    			max:10,
		    			title: {
		    				display: true,
		    				text: "Remifentanil Ce (ng/ml)"
		    			}
		    			
		    		}
		    	},
		    	plugins: {
		    		tooltip: {
		    			enabled:false,
		    			//mode: 'nearest',
		    			//intersect: false
		    		},
		    		legend: {
		    			display:false
		    		},
			    	crosshair: {
			    		line: {
			    			color: 'rgb(0,0,0,0)',
			    			width: 0,
			    			//dashPattern: [20,5]
			    		},
				        sync: {
				          enabled: true,            // enable trace line syncing with other charts
				          group: 1,                 // chart group
				          suppressTooltips: false   // suppress tooltips when showing a synced tracer
				        },
				        zoom: {
				        	enabled: false,
				        }
			    	}
			    	
		    	}
				}
			})


	/*

			myChart2.canvas.addEventListener('mousemove', (e) => {
				crosshair(myChart2, e);
			})

			function crosshair(chart, mousemove) {
				chart.update('none');
				//const x = mousemove.offsexX;
				//const y = mousemove.offsetY;
				const {ctx, chartArea: {top, bottom, left, right, width, height}} = chart;


				if (mousemove.offsetX >= left && mousemove.offsetX <= right && mousemove.offsetY >= top && mousemove.offsetY <= bottom) {

					y = Math.round((mousemove.offsetY - bottom)/(top-bottom) * 10 *10)/10;
					x = Math.round((mousemove.offsetX - left)/(right-left) * 10 *10)/10;
					document.getElementById('isobole_chart_description').innerHTML = "CeProp " + y + ", CeRemi " + x + ", PTOL: " + ptol_calculate_pair(y,x);
				}

			}
	*/

			function behindPositionDot1(ctx, value) {
		console.log(myChart2.data.datasets[1].data(p0DataIndex).meta_minute);
	}

		},600)

	setTimeout(

		function() {


		var ctx = document.getElementById('myChart').getContext('2d');

		var y = document.getElementById('chartwrapper').offsetHeight*0.6;

		/*
		var gradientGreen = ctx.createLinearGradient(0, 100, 0, y+100);  //x0y0x1y1  //y+100 last param
			gradientGreen.addColorStop(0.4, 'rgba(9, 203, 93,0.4)');   
			gradientGreen.addColorStop(1, 'rgba(9, 203, 93,0.05)');

			console.log(gradientGreen);
			*/


		/*
		var gradientRed = ctx.createLinearGradient(0, 0, 0, y); // y last param
			gradientRed.addColorStop(0.4, 'rgba(231, 50, 39,0.4)');   
			gradientRed.addColorStop(1, 'rgba(231, 50, 39,0)');

			*/


		myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	    	datasets: [{
	    		label: 'Cp_', //obsolete
	    		data: [{x: 0, y: 0}],
	    		borderWidth:7,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: 'rgb(231, 50, 39,0.7)',
	    		backgroundColor: 'rgb(231, 50, 39,0.4)',
	    		pointBorderColor: 'rgb(231, 50, 39,0.8)',
	    		pointBackgroundColor: 'rgb(231, 50, 39,0.8)',
	    		fill: true,
	    		parsing: false
	    	},{
	    		label: 'Ce_', //obsolete
	    		data: [{x:0, y:0}],
	    		borderWidth:7,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: 'rgb(9, 203, 93,0.7)',
	    		backgroundColor: 'rgb(9, 203, 93,0.4)',
	    		pointBorderColor: 'rgb(9, 203, 93,0.8)',
	    		pointBackgroundColor: 'rgb(9, 203, 93,0.8)',
	    		fill: true,
	    		parsing: false
	    	},{
	    		label: 'Cp-Prop',
	    		data: [{x: 0, y: 0}],
	    		borderWidth:3,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: 'rgb(231, 50, 39,0.5)',
	    		//borderDash: [2,2],
	    		//borderColor: yellowSec,
	    		//backgroundColor: gradientRed,//'rgb(100, 90, 90,0.1)',
	    		
	    		backgroundColor: context => {
	    			const chart = context.chart;
	    			const { ctx, chartArea, scales } = chart;
	    			if (!chartArea) {
	    				return null ;
	    			}
	    			return getGradientRed(ctx, chartArea, scales);
	    		},
	    		
	    		//backgroundColor: 'rgb(0,0,0,0)',
	    		segment: {
	    			borderColor: ctx => behindPosition(ctx, 'rgb(231,50,39,0.7)'),
	    			borderWidth: ctx => behindPosition2(ctx, 8)
	    		},
	    		
	    		fill: true,
	    		hidden: false,
	    		parsing: false
	    	},{
	    		label: 'Ce-Prop',
	    		data: [{x:0, y:0}],
	    		borderWidth:3,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: 'rgb(9, 203, 93,0.5)',
	    		//borderColor: yellowPri50,
	    		//backgroundColor: gradientGreen,//'rgb(90, 100, 90,0.1)',
	    		
	    		backgroundColor: context => {
	    			const chart = context.chart;
	    			const { ctx, chartArea, scales } = chart;
	    			if (!chartArea) {
	    				return null ;
	    			}
	    			return getGradientGreen(ctx, chartArea, scales);
	    		},
	    		
	    		//backgroundColor: 'rgb(0,0,0,0)',
	    		segment: {
	    			borderColor: ctx => behindPosition(ctx, 'rgb(9,203,93,0.7)'),
	    			borderWidth: ctx => behindPosition2(ctx, 8)
	    		},
	    		fill: true,
	    		hidden: false,
	    		parsing: false
	    	},{
	    		label: 'Cp-Remi',
	    		data: [{x: 0, y: 0}],
	    		borderWidth:3,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		//borderDash: [2,2],
	    		borderColor: bluePri,
	    		//backgroundColor: gradientRed,//'rgb(100, 90, 90,0.1)',
	    		/*
	    		backgroundColor: context => {
	    			const chart = context.chart;
	    			const { ctx, chartArea, scales } = chart;
	    			if (!chartArea) {
	    				return null ;
	    			}
	    			return getGradientRed(ctx, chartArea, scales);
	    		},
	    		*/
	    		//backgroundColor: 'rgb(0,0,0,0)',
	    		segment: {
	    			borderColor: ctx => behindPosition(ctx, blueLight),
	    			borderWidth: ctx => behindPosition2(ctx, 8)
	    		},
	    		fill: false,
	    		hidden: true,
	    		parsing: false
	    	},{
	    		label: 'Ce-Remi',
	    		data: [{x:0, y:0}],
	    		borderWidth:3,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: blueLight,
	    		//backgroundColor: gradientGreen,//'rgb(90, 100, 90,0.1)',
	    		
	    		backgroundColor: context => {
	    			const chart = context.chart;
	    			const { ctx, chartArea, scales } = chart;
	    			if (!chartArea) {
	    				return null ;
	    			}
	    			return getGradientBlue(ctx, chartArea, scales);
	    		},
	    		
	    		
	    		segment: {
	    			borderColor: ctx => behindPosition(ctx, blueSec),
	    			borderWidth: ctx => behindPosition2(ctx, 8)
	    		},
	    		fill: true,
	    		hidden: true,
	    		parsing: false
	    	},{    //index = 6 for propofol margins
	    		label: 'P(upper)',
	    		data: [{x:0, y:0}],
	    		borderWidth:1,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: greenShadeDark,
	    		backgroundColor: greenShade,
	    		fill: '+1',
	    		parsing: false
	    	},{
	    		label: 'P(lower)',
	    		data: [{x:0, y:0}],
	    		borderWidth:1,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: greenShadeDark,
	    		fill: false,
	    		parsing: false
	    	},{     //index = 8 for remi margins
	    		label: 'P(upper)',
	    		data: [{x:0, y:0}],
	    		borderWidth:1,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: greenShadeDark,
	    		backgroundColor: greenShade,
	    		fill: '+1',
	    		parsing: false
	    	},{
	    		label: 'P(lower)',
	    		data: [{x:0, y:0}],
	    		borderWidth:1,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: greenShadeDark,
	    		fill: false,
	    		parsing: false
	    	},{    //index = 10 for BIS margins
	    		label: 'P(upper)',
	    		data: [{x:0, y:0}],
	    		borderWidth:1,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: greenShadeDark,
	    		backgroundColor: greenShade,
	    		fill: '+1',
	    		parsing: false
	    	},{
	    		label: 'P(lower)',
	    		data: [{x:0, y:0}],
	    		borderWidth:1,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: greenShadeDark,
	    		fill: false,
	    		parsing: false
	    	}]
	    }, //end data
	    options: {
	    	maintainAspectRatio: false,
	    	interaction: {

	    	},
	    	scales: {
	    		y: {
	    			display: true,
	    			min: 0,
	    			max: 5,
					title: {
						display: true,
						text:'Concentration'
					}
	    		},
	    		x: {
	    			type: 'linear',
	    			display: true,
	    			position:'bottom',
	    			min:0,
	    			max:20,
					title: {
						display: true,
						text:'Time (minutes)'
					}
	    		}
	    	},
	        animation: {
	        	duration: 200
	        },
	        transitions: {
	        	active: {
	        		animation: {
	        			duration: 200
	        		}
	        	}
	        },

		    plugins: { //start plugins
		    	//shadingArea,
			    legend: {
			    		onClick: null,
				    	labels: {
				    	boxWidth: 20,
				    	filter: function(item, chart) {
				    		var index = item.datasetIndex;
				    		if ((index <= 1) || (index >= drug_sets.length*2+2)) {
				    			return false;
				    		} else {
				    			return true;
				    		}
				    	}
			    	}
			    },
			    tooltip: {
			    	mode: 'index',
			    	intersect: false,
			    	footerFont: {
			    		weight: 'normal',
			    		size: 10
			    	},
	            	filter: function(tooltipItem, data) {
	            		var index = tooltipItem.datasetIndex;
	            		if ((index >= 2) && (index <=5)) {
	            			return true;
	            		} else {
	            			return false;
	            		}
	            	},
	            	position: 'nearest',
	            	caretSize: 0,
	            	backgroundColor: 'rgba(0,0,0,0.5)',
					callbacks: {
						title: function(context) {
							var title = context[0].parsed.x || "";
							if (title) {
								title = title*60; //to s
								return converttime(title);
							}
						},
						
	                	label: function(context) {
	                		
	                    	var label = context.dataset.label || '';

	                    	if (label) {
	                    		if ((label == "Cp-Prop") || (label == "Cp-Remi") || (label == "Cp-Fen") || (label == "Cp-Alfen")) label = "Cp:";
	                    		if ((label == "Ce-Prop") || (label == "Ce-Remi") || (label == "Ce-Fen") || (label == "Ce-Alfen")) label = "Ce:";
		                    	label += Math.round(context.parsed.y * 100) / 100;
		                    	return label;
	                    	}
	                	},

	                	footer: function(tooltipItems) {

	                		var infrate = "Inf rate: ";

	                		var vitext = "VI: ";

	                		var parsedx = tooltipItems[0].parsed.x;

	                		infrate = infrate + getinfusionrate(parsedx * 60,active_drug_set_index) + "ml/h";

	                		vitext = vitext + Math.round(drug_sets[active_drug_set_index].volinf[Math.round(parsedx*60)]*10)/10 + "ml";

	                		if ((PD_mode == 1) && (active_drug_set_index == 0)) {
	                			PD_text = "eBIS: " + BIS_array[Math.round(parsedx*60)];
	                			return [infrate, vitext, PD_text];
	                		} else if ((PD_mode == 2) && (ptolcouplesarray.length>0)) {
	                			temp_ptol_elem = ptolcouplesarray[Math.round(parsedx*2)];
	                			if (temp_ptol_elem == undefined) {
	                				PD_text = "";
	                			} else {
	                				PD_text = "PTOL: " + Math.round(temp_ptol_elem.meta_ptol * 100);
	                			}
	                			return [infrate, vitext, PD_text];
	                		} else {
	                			return [infrate, vitext];	
	                		}

	                		

	                	}
	                	
	                }
			    },
		    	crosshair: {
		    		line: {
		    			color: '#66F',
		    			width: 1,
		    			//dashPattern: [20,5]
		    		},
			        sync: {
			          enabled: true,            // enable trace line syncing with other charts
			          group: 1,                 // chart group
			          suppressTooltips: false   // suppress tooltips when showing a synced tracer
			        },
			        zoom: {
			        	enabled: false,
			        }
		    	},
		    	/*
		    	annotation: {
		    		annotations: {
		    			line0: {
		    				type: 'line',
		    				drawTime: 'beforeDatasetsDraw',
		    				xMin: getEventLine(0),
		    				xMax: getEventLine(0),
		    				borderColor: 'rgba(255,0,0,0.2)',
		    				borderWidth: 2,
		    				label: {
		    					content: getEventLabel(0),
		    					enabled: true
		    				}
		    			}
		    		}
		    	}
		    	*/
		    } //endplugins
	    } //end options
	    //, plugins: [multiply],


	}//end charting function
	);





		//dark mode for chart activation here
		if (isDark) {
				myChart.options.scales.x.grid.color = "rgba(255,255,255,0.2)";
				myChart.options.scales.y.grid.color = "rgba(255,255,255,0.2)";
				myChart.options.scales.x.grid.borderColor = "rgba(255,255,255,0.6)";
				myChart.options.scales.y.grid.borderColor = "rgba(255,255,255,0.6)";
				myChart.options.scales.x.ticks.color = "rgba(255,255,255,0.6)";
				myChart.options.scales.y.ticks.color = "rgba(255,255,255,0.6)";
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

			}

	},1000);



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
    		myChart.canvas.dispatchEvent(new Event("mouseout"));	
    	}
        
    }
})


/*
window.addEventListener('hashchange', function(event) {
    // The popstate event is fired each time when the current history entry changes.

    var r = confirm("You pressed a Back button! Are you sure?!");

    if (r == true) {
        // Call Back button programmatically as per user confirmation.
        history.back();

    } else {
        // Stay on the current page.
        history.pushState(null, null, window.location.pathname);
    }

    history.pushState(null, null, window.location.pathname);

}, false);
*/


//dark mode activation
	var isDark = false;
	if (localStorage.getItem("colourMode") == "dark") {
		isDark = true;
		var metaThemeColor = document.querySelector("meta[name=theme-color]");
		metaThemeColor.setAttribute("content", "#000");
		document.body.classList.add("dark");
		document.getElementById("darkmodebutton").innerHTML = "<i class='fas fa-adjust fa-fw'></i>";
	}




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
		readmodel(ElModel.value,0);
		//infusate_concentration goes here
		drug_sets[0].infusate_concentration = 10; //defaults 10 for propofol

		if ((paedi_mode == 0 && document.getElementById("select_model").value == "Eleveld") || (paedi_mode == 1 && document.getElementById("select_model_paedi").value == "Eleveld")) {
			PD_mode = 1;
			document.getElementById("chartoverlayoptionscontent").classList.add("PDoptions");
			document.getElementById("select_effect_measure").value = "bis";
			document.getElementById("select_effect_measure").options[1].remove(); //removes PTOL option
			setTimeout(function() {document.getElementById("select_effect_measure").options[1].remove();},100);//removes NSRI
			 
			BIS40 = BIS_Ce_for_BIS(40);
			BIS60 = BIS_Ce_for_BIS(60);
			myChart.data.datasets[11].data = [{x:0, y:BIS60},{x:7200, y:BIS60}];
			myChart.data.datasets[10].data = [{x:0, y:BIS40},{x:7200, y:BIS40}];
			myChart.data.datasets[10].backgroundColor = yellowPri30;
			myChart.data.datasets[10].borderColor = yellowPri50;
			myChart.data.datasets[11].borderColor = yellowPri50;
			myChart.data.datasets[10].hidden = false;
			myChart.data.datasets[11].hidden = false;
			document.getElementById("ptolcard").style.display = "flex";
			document.getElementById("ptoltitle").innerHTML = "eBIS";
			document.getElementById("ptoldesc").innerHTML = "Estimated BIS from Eleveld PD model";
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
			}
			document.getElementById("select_remidilution").value = "20";
			document.getElementById("custom_remidilution").style.display = "none";
		}
		if (document.getElementById("select_fendilution").value == "custom") {
			temp = document.getElementById("fendilution").innerHTML * 1 ;
			if (temp > 100 || temp < 0.1) {
				validateText = validateText.concat("Invalid fentanyl dilution: must be within 0.1-100mcg/ml" + "<br>");
			}
			document.getElementById("select_fendilution").value = "10";
			document.getElementById("custom_fendilution").style.display = "none";
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
	document.getElementById("card_cet" + drug_sets_index).style.display = "";
	document.getElementById("card_cet" + drug_sets_index).classList.add("hide");
	document.getElementById("card_infusion" + drug_sets_index).style.display = "none";
	document.getElementById("card_cpt" + drug_sets_index).style.display = "none";
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
			bolusadmin(document.getElementById("inputBolus_initial" + ind).value * 1,ind);
		} else {
			lookahead(0,7200,ind);
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
		
		lookahead(0,7200,ind);//start button name already changed to "updaterate"	
		
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
			document.getElementById("btn_startCpt0").innerHTML = "Update Cpt";
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

		initshare();
}

function start_cet() {
	active_drug_set_index = 0;

	if (complex_mode == 1) {
		if ((drug_sets[active_drug_set_index].firstrun == -1) && (drug_sets[alt_drug_set_index].firstrun == -1)) {
			common_start_calls();
		}
	} else if (drug_sets[active_drug_set_index].firstrun == -1) {
		common_start_calls();
	}

	if (drug_sets[active_drug_set_index].firstrun == -1) {
		if (document.getElementById("inputDesiredCe0").value>0) {
			drug_sets[active_drug_set_index].desired = 0;
			drug_sets[active_drug_set_index].firstrun = 0;
			drug_sets[active_drug_set_index].running = 1;

			offset = Date.now();
			if (document.getElementById("inputDesiredCe0").value>0) {
				desired = document.getElementById("inputDesiredCe0").value *1;
			}
			drug_sets[active_drug_set_index].cet_active = 1;

			deliver_cet(desired, active_drug_set_index);
			
			//UI code goes here
			drug_sets[active_drug_set_index].running = 1;
			document.getElementById("status").innerHTML="";
			document.getElementById("btn_startCet0").innerHTML = "Update Cet";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("pastscheme").classList.add("show");
		} else {
			displayWarning("Warning","CE Target Invalid.");
			document.getElementById("inputDesiredCe0").value = "";
		}
	} else {
		if (document.getElementById("inputDesiredCe0").value>0) {
			desired = document.getElementById("inputDesiredCe0").value *1;
			drug_sets[active_drug_set_index].running = 1;
			document.getElementById("status").innerHTML="";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			drug_sets[active_drug_set_index].cet_active = 1;
			deliver_cet(desired,0);
		} else {
			displayWarning("Warning","CE Target Invalid.");
			document.getElementById("inputDesiredCe0").value = "";
		}
	}
	alert_api(0);
}

function start_cpt_complex(cpt_complex_desired, active_drug_set_index) {
	if ((drug_sets[active_drug_set_index].firstrun == -1) && (drug_sets[alt_drug_set_index].firstrun == -1)) {
		common_start_calls();
	}
	if (drug_sets[active_drug_set_index].firstrun == -1) {
		if (cpt_complex_desired > 0) {
			offset = Date.now();
		
			desired = document.getElementById("inputDesired1").value *1;
		
			drug_sets[active_drug_set_index].cpt_active = 1;

			drug_sets[active_drug_set_index].desired = desired;
			drug_sets[active_drug_set_index].firstrun = 0;
			drug_sets[active_drug_set_index].running = 1;


			// initialize params (moved away to initcpt)


			deliver_cpt(desired, 0, 0, 1); // 4th argument is drug set index (3rd arg is compensation)

		//UI code goes here
			
			document.getElementById("status").innerHTML="";
			document.getElementById("btn_startCpt1").innerHTML = "Update Cpt";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("pastscheme").classList.add("show");

			loop4 = setInterval(updatechart2, 5000);
			loop5 = setInterval(updatechart3, 1000);
			setTimeout(function(){
				updatechart3(1);
			},500);
		} else {
			displayWarning("Warning","CP Target Invalid.");
			document.getElementById("inputDesired1").value = "";
		}
	} else {
		if (document.getElementById("inputDesired1").value>0) {
			//desired = document.getElementById("inputDesired1").value *1;
			drug_sets[active_drug_set_index].running = 1;
			document.getElementById("status").innerHTML="";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			drug_sets[active_drug_set_index].cpt_active = 1;
			deliver_cpt(cpt_complex_desired, 0, 0, 1);
			setTimeout(function(){
				updatechart3(1);
			},500);
		} else {
			displayWarning("Warning","CP Target Invalid.");
			document.getElementById("inputDesired1").value = "";
		}
	}

}

function start_cet_complex(cet_complex_desired, active_drug_set_index) {

	if ((drug_sets[active_drug_set_index].firstrun == -1) && (drug_sets[alt_drug_set_index].firstrun == -1)) {
		common_start_calls();
	}
	if (drug_sets[active_drug_set_index].firstrun == -1) {
		/*
		document.getElementById("top_subtitle").classList.add("topClose");
		document.getElementById("top_title").classList.add("topOpen");
		initshare();
		*/

		//if (document.getElementById("inputDesiredCe").value>0) {

		if (cet_complex_desired>0) {
			
			loop4 = setInterval(updatechart2, 5000);
			loop5 = setInterval(updatechart3, 1000);

			drug_sets[active_drug_set_index].desired = 0;
			drug_sets[active_drug_set_index].firstrun = 0;
			drug_sets[active_drug_set_index].running = 1;

			offset = Date.now();
			/*
			if (document.getElementById("inputDesiredCe").value>0) {
				desired = document.getElementById("inputDesiredCe").value *1;
			}
			*/
			drug_sets[active_drug_set_index].cet_active = 1;

			
			// initialize params
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

			deliver_cet(cet_complex_desired, active_drug_set_index);

			
			//loop1 = setInterval(update, 500);
			//loop2 = setInterval(runinfusion2, refresh_interval);
			//loop3 = setInterval(updatechart, 5000);
			
			//UI code goes here
			drug_sets[active_drug_set_index].running = 1;
			setTimeout(function(){
				updatechart3(1);
			},500);
			document.getElementById("status").innerHTML="";
			document.getElementById("btn_startCet1").innerHTML = "Update Cet";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("pastscheme").classList.add("show");
		} else {
			displayWarning("Warning","CE Target Invalid.");
			document.getElementById("inputDesiredCe1").value = "";
		}
	} else {
		// if (document.getElementById("inputDesiredCe").value>0) {
		if (cet_complex_desired>0) {
			//desired = document.getElementById("inputDesiredCe").value *1;
			drug_sets[active_drug_set_index].running = 1;
			document.getElementById("status").innerHTML="";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			drug_sets[active_drug_set_index].cet_active = 1;
			deliver_cet(cet_complex_desired,active_drug_set_index);
			setTimeout(function(){
				updatechart3(1);
			},500);
		} else {
			displayWarning("Warning","CE Target Invalid.");
			document.getElementById("inputDesiredCe1").value = "";
		}
	}
}

function start_cet_bolus() {
	if (complex_mode ==1) {
		if ((drug_sets[active_drug_set_index].firstrun == -1) && (drug_sets[alt_drug_set_index].firstrun == -1)) {
			common_start_calls();
		}
	} else if (drug_sets[active_drug_set_index].firstrun == -1) {
		common_start_calls();
	}
	if (drug_sets[active_drug_set_index].firstrun == -1) {
		if (document.getElementById("inputDesiredCe" + active_drug_set_index).value>0) {
			drug_sets[active_drug_set_index].desired = 0;
			drug_sets[active_drug_set_index].firstrun = 0;
			drug_sets[active_drug_set_index].running = 1;

			offset = Date.now();
			if (document.getElementById("inputDesiredCe" + active_drug_set_index).value>0) {
				drug_sets[active_drug_set_index].desired = document.getElementById("inputDesiredCe" + active_drug_set_index).value *1;
			}
			drug_sets[active_drug_set_index].cet_active = 1;

			// initialize params
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


			deliver_cet_alt(drug_sets[active_drug_set_index].desired);


			document.getElementById("status").innerHTML="";
			document.getElementById("btn_startCet" + active_drug_set_index).innerHTML = "Update Cet";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("pastscheme").classList.add("show");

		if ((complex_mode == 1) && (drug_sets[0].firstrun > -1) && (drug_sets[1].firstrun>-1)) {
			loop4 = setInterval(updatechart2, 5000);
			loop5 = setInterval(updatechart3, 1000);
			setTimeout(function(){
				updatechart3(1);
			},500);
		}

		} else {
			displayWarning("Warning","CE Target Invalid.");
			document.getElementById("inputDesiredCe" + active_drug_set_index).value = "";
		}
	} else {
		if (document.getElementById("inputDesiredCe" + active_drug_set_index).value>0) {
			drug_sets[active_drug_set_index].desired = document.getElementById("inputDesiredCe" + active_drug_set_index).value *1;
			drug_sets[active_drug_set_index].running = 1;
			document.getElementById("status").innerHTML="";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			drug_sets[active_drug_set_index].cet_active = 1;
			deliver_cet_alt(drug_sets[active_drug_set_index].desired);
		} else {
			displayWarning("Warning","CE Target Invalid.");
			document.getElementById("inputDesiredCe" + active_drug_set_index).value = "";
		}
	}
	alert_api(0);
}

function preview_cpt(x,ind) {
	drug_sets[ind].desired = x;
	drug_sets[ind].preview_bolus = 0;
	drug_sets[ind].preview_rate = 0;
	if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
		drug_sets[ind].fentanyl_weightadjusted_target_uncorrected = drug_sets[ind].desired;
		drug_sets[ind].desired = drug_sets[ind].desired * 1/drug_sets[ind].fentanyl_weightadjusted_factor;
	}
	var working_clock = Math.floor(time_in_s); //backup the time at this point, in S
	if (drug_sets[ind].cpt_cp.length>0) {
		p_state[1] = drug_sets[ind].cpt_cp[working_clock-1][0];
		p_state[2] = drug_sets[ind].cpt_cp[working_clock-1][1];
		p_state[3] = drug_sets[ind].cpt_cp[working_clock-1][2];
		if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
			p_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			p_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			p_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
		}
	}
	p_state2[1] = p_state[1];
	p_state2[2] = p_state[2];
	p_state2[3] = p_state[3];

	var test_rate; //real rate entered into virtual state
	var trial_rate; //future rate
	var trial_cp; //future CP
	var est_cp; //last available CP

	est_cp = p_state2[1]+p_state2[2]+p_state2[3];

	if (drug_sets[ind].cpt_rates_real.length == 0) {
		drug_sets[ind].cpt_bolus = (drug_sets[ind].desired-est_cp) * drug_sets[ind].vc;  //bolus round up to 10mg
		test_rate = 0;
	} else {
		drug_sets[ind].cpt_bolus = (drug_sets[ind].desired-est_cp)/drug_sets[ind].p_udf[1];
		test_rate = drug_sets[ind].cpt_rates_real[working_clock-1];
	}
	if (cpt_bolus>=70) {
		drug_sets[ind].cpt_bolus = Math.round(drug_sets[ind].cpt_bolus/10)*10;
	} else if (drug_sets[ind].cpt_bolus>1) {
			if ((mass>15) && (drug_sets[ind].cpt_bolus>=15)) {
				drug_sets[ind].cpt_bolus = Math.ceil(drug_sets[ind].cpt_bolus/5)*5; //round up to nearest 5mg
			} else {
				drug_sets[ind].cpt_bolus = Math.ceil(drug_sets[ind].cpt_bolus) + 1;
			}
	} else {
		drug_sets[ind].cpt_bolus = 0;
	}

	cpt_interval = 120; //set to 120seconds

	var look_l1 = Math.exp(-drug_sets[ind].lambda[1] * cpt_interval); 
	var look_l2 = Math.exp(-drug_sets[ind].lambda[2] * cpt_interval);
	var look_l3 = Math.exp(-drug_sets[ind].lambda[3] * cpt_interval);
	var look_l4 = Math.exp(-drug_sets[ind].lambda[4] * cpt_interval);

	//pop the arrays
	drug_sets[ind].cpt_rates.length = 0;
	drug_sets[ind].cpt_times.length = 0;

	for (i=0; i<30; i++) {
		//if ((p_state2[1] == 0) || (skip == 1)) {
			console.log(i*120);
		if (p_state2[1] == 0) {
				test_rate = drug_sets[ind].desired / drug_sets[ind].p_udf[cpt_interval];
				
				drug_sets[ind].cpt_rates.push(test_rate);
				console.log("testrate" + test_rate);
		//	}
		//	if (skip == 1) {
		//		test_rate = cpt_rates_real[Math.floor(working_clock)-1];
		//		cpt_times.push(i);
		//		cpt_rates.push(test_rate);
		//		skip = 0;
		//		alert(test_rate);
		//	}
		} else { // taken from line 1970, double model(...
			
				est_cp = p_state2[1] + p_state2[2] + p_state2[3];

				console.log("-----" + converttime(i*120) + "------");

				trial_cp = virtual_model( //need real lambda
				 p_state2[1] * Math.exp(-drug_sets[ind].lambda[1]) + drug_sets[ind].p_coef[1] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[1])),
				 p_state2[2] * Math.exp(-drug_sets[ind].lambda[2]) + drug_sets[ind].p_coef[2] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[2])),
				 p_state2[3] * Math.exp(-drug_sets[ind].lambda[3]) + drug_sets[ind].p_coef[3] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[3])),0,cpt_interval,0,ind);

				if (drug_sets[ind].desired > trial_cp) {
					trial_rate = (drug_sets[ind].desired - trial_cp)/drug_sets[ind].p_udf[cpt_interval];
				} else { trial_rate = 0;}

				//var old_rate_pred_cp = p_state2[1] * look_l1 + p_coef[1] * test_rate * (1 - look_l1)
				// + p_state2[2] * look_l2 + p_coef[2] * test_rate * (1 - look_l2)
				// + p_state2[3] * look_l3 + p_coef[3] * test_rate * (1 - look_l3);

				//var is_steady = (old_rate_pred_cp < (desired*1.05)) && (old_rate_pred_cp > (desired * 0.99));

				console.log("estCp" + est_cp);
				console.log("trialcp" + trial_cp);
				console.log("testrate" + test_rate);
				console.log("trialrate" + trial_rate);
				//console.log("--> oldratepredcp = " + old_rate_pred_cp);
				//console.log("--> is_steady = " + is_steady);
				
				test_rate = trial_rate;
				drug_sets[ind].cpt_rates.push(test_rate);

		}

			p_state2[1] = p_state2[1] * look_l1 + drug_sets[ind].p_coef[1] * test_rate * (1 - look_l1);
			p_state2[2] = p_state2[2] * look_l2 + drug_sets[ind].p_coef[2] * test_rate * (1 - look_l2);
			p_state2[3] = p_state2[3] * look_l3 + drug_sets[ind].p_coef[3] * test_rate * (1 - look_l3);
			//est_cp = p_state2[1] + p_state2[2] + p_state2[3];
			//console.log("est cp" + est_cp);
	}

	if (drug_sets[ind].drug_name == "Alfentanil") {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 > 100) {
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.63;
			} else {
				cpt_threshold = 0.25;
				cpt_avgfactor = 0.44;
				//if (cpt_bolus>0) cpt_bolus = cpt_bolus +5; // up the bolus
			}
		}
	} else {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 > 25) {
				cpt_threshold = 0.08;
				cpt_avgfactor = 0.667;
			} else {
				cpt_threshold = 0.13;
				cpt_avgfactor = 0.55;
				//if (cpt_bolus>0) cpt_bolus = cpt_bolus +5; // up the bolus
			}
		}
	}


	//second pass

	//automatically determine high or low rounding factor (3600->round to 0.1, 360->round to 1)
	if ((paedi_mode == 1) || (drug_sets[ind].cpt_rates[5]<16/360)) {
		var roundingfactor = 3600;
	} else {
		if (drug_sets[ind].drug_name == "Propofol") {
			var roundingfactor = 360;
		} else {
			var roundingfactor = 3600;
		}
	}

	prior_test_rate = 0;
	var prior_timestamp = 0; //unit is iteration number (1=120s)
	test_rate = Math.round(cpt_rates[0]*roundingfactor)/roundingfactor;
	var firstcycle = -1;
	var wait_peak = 0;
	var wait_cpt_avg = 0;

	for (j=0; j<30; j++) {
		
		//temp_test_rate = cpt_rates[j/60];
		if (firstcycle == -1) {
			if ((drug_sets[ind].cpt_rates[0] > 0) && (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1])) {
				prior_test_rate = drug_sets[ind].cpt_rates[1];
				drug_sets[ind].cpt_times.push(1);
			} else if ((drug_sets[ind].cpt_rates[0] > 0) && (drug_sets[ind].cpt_rates[1]>drug_sets[ind].cpt_rates[0])) { //special scenario where there is slow rise in inf rate to peak then falls
				prior_test_rate = drug_sets[ind].cpt_rates[1];
				console.log('enter special WAIT-PEAK cycle as cpt_rates fall into inc-peak-dec pattern');
				INNER_LOOP: for (k=1; k<60; k++) {
					if (drug_sets[ind].cpt_rates[k] > drug_sets[ind].cpt_rates[k-1]) {
						wait_peak = k;
					} else {
						break INNER_LOOP;
					}
				}
				
				console.log('wait peak (cycle)' + wait_peak);

				const one_of_360 = 1/360;
				const half_of_360 = 0.5/360;

				//if it is a long wait_peak (>5 cycles), let's break the averaging rates into segments
				//or else we just stick to one rate 

				if (wait_peak > 5) {
					wait_temp1 = Math.round(drug_sets[ind].cpt_rates[1]*roundingfactor)/roundingfactor; 
					wait_temp2 = Math.round(drug_sets[ind].cpt_rates[wait_peak]*roundingfactor)/roundingfactor; 
					console.log("enter long wait peak mode------------");
					console.log("wait_temp1 = " + wait_temp1*360);
					//console.log("wait_temp2 = " + wait_temp2*360);
					var breakpoint = 2; // this is the breakpoint between 2 segments
					// if wait_temp1 and wait_temp2 are not different by more than 1 then there is no meaning to separate segments
					if (wait_temp2 > wait_temp1 + one_of_360) {
						
						INNER_LOOP2: for (k = wait_peak; k > 1; k--) { //this loops from end back to beginning and determines breakpoint when it is no longer in steady state
							if ((wait_temp2 - drug_sets[ind].cpt_rates[k-1]) > one_of_360) {
								breakpoint = k;
								break INNER_LOOP2;
							}
						}

						INNER_LOOP3: for (k = 1; k < breakpoint-1; k++) {
							console.log(k);
							wait_temp1 = wait_temp1 + drug_sets[ind].cpt_rates[k+1];
						}

						wait_temp1 = Math.round(wait_temp1/(breakpoint-1)*roundingfactor)/roundingfactor;
						console.log("wait_temp1 (INNERLOOP3) average = " + wait_temp1*360);


						test_rate = wait_temp1;
					} else {
						// use the higher rate
						test_rate = wait_temp2;
						
					}
				} else { // so this is then wait_peak <=5
					// take average and round to nearest 0.5
					wait_temp1 = Math.round((drug_sets[ind].cpt_rates[wait_peak] + drug_sets[ind].cpt_rates[1])/2*roundingfactor)/roundingfactor;
					console.log("enter short wait peak mode-------------");
					//console.log("wait_temp1 = " + wait_temp1*360);

					test_rate=wait_temp1;
					break;
				}
			} else { // this means cpt_rates[0] is zero -> infusion stopped for 2 min
				test_rate = 0;
				break;
			} 
			firstcycle = 0;

		} else if (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1]) {
			console.log(prior_test_rate);
			if (((prior_test_rate-drug_sets[ind].cpt_rates[j])/prior_test_rate > cpt_threshold) && (j>wait_peak)) { 
				//if ((cpt_bolus == 0) && (cpt_times.length == 1)) { //upscale inf rate if no bolus
				//	test_rate = Math.ceil((cpt_rates[0]+cpt_rates[1])/2*360)/360;
				//} else { //normal scenario
				test_rate = Math.round(((drug_sets[ind].cpt_rates[drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]]-drug_sets[ind].cpt_rates[j])*cpt_avgfactor+drug_sets[ind].cpt_rates[j])*roundingfactor)/roundingfactor;
				//}
				/*if (cpt_times[cpt_times.length-1] == 1) {
					for (k=0; k<120; k++) {cpt_rates_real.push(test_rate);}
				}
				for (k=cpt_times[cpt_times.length-1]*120; k<j*120; k++) {
						cpt_rates_real.push(test_rate);
				}*/
				console.log(test_rate*3600/10 + " - from " + drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120 + " to " + j*120 + "s");
				/*
				relativetime = working_clock+cpt_times[cpt_times.length-1]*120;
				if (cpt_times[cpt_times.length-1] == 1) {
					historytext = historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "Time: " + converttime(working_clock) + " - Rate: " + Math.round(test_rate*360) + "ml/h</div>");	
					historyarray.push([working_clock, test_rate]);
				} else {
					historytext = historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "Time: " + converttime(relativetime) + " - Rate: " + Math.round(test_rate*360) + "ml/h</div>");	
					historyarray.push([relativetime, test_rate]);
				}

				cpt_times.push(j);
				prior_test_rate = cpt_rates[j];*/
				break;
			}
			//if (cpt_rates[j]*0.99>prior_test_rate) { //increasing infusion rate, should get higher rate
			//	test_rate = Math.round(cpt_rates[j])/360; 
			//	console.log(test_rate*3600/10 + " - at " + j*120 + "s");
			//	relativetime = working_clock+cpt_times[cpt_times.length-1]*120;
			//	if ((cpt_times[cpt_times.length-1] == 1) && (prior_test_rate == 0)) {
			//		for (k=0; k<120; k++) {cpt_rates_real.push(0);}
			//	}
			//	for (k=cpt_times[cpt_times.length-1]*120; k<j*120; k++) {
			//			cpt_rates_real.push(test_rate);
			//	}
			//	historytext = historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "Time: " + converttime(relativetime) + " - Rate: " + Math.round(test_rate*360) + "ml/h</div>");
			//	cpt_times.push(j);
			//	prior_test_rate = cpt_rates[j];
			//}
	
		}

	}
	drug_sets[ind].preview_bolus = drug_sets[ind].cpt_bolus;
	drug_sets[ind].preview_rate = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
	drug_sets[ind].preview_downtrend = (drug_sets[ind].cpt_rates_real[working_clock-1] > test_rate);
}

function displaypreview(x,ind) {
	clearTimeout(timeout2);
	timeout2 = setTimeout(function(){displaypreview2(x,ind);},600);
}

function displaypreview2(x,ind) {
	if (previewtimeout != null) {clearTimeout(previewtimeout);}
	var object = document.getElementById("preview");
	object.style.display="flex";
	if (object.classList.contains('animate')) {object.classList.remove('animate');}
	setTimeout(function(){object.classList.add('animate')},400);
	previewtimeout = setTimeout(function(){
		object.style.display="none"},12000);
	x=x*1;

	if (drug_sets[ind].cpt_active > 0) {
		if (x>0) {
			preview_cpt(x,ind);
			document.getElementById("preview_cpt").innerHTML = "CP " + x + drug_sets[ind].conc_units + "/ml";
			if (drug_sets[ind].preview_bolus>0) {
				document.getElementById("preview_msg").innerHTML = "Bolus " + drug_sets[ind].preview_bolus + drug_sets[ind].infused_units + " (" + Math.round(drug_sets[ind].preview_bolus / drug_sets[ind].infusate_concentration * 10)/10 +  "ml) " + "<i class='fas fa-arrow-alt-circle-right'></i>" + " Infuse at " + drug_sets[ind].preview_rate + "ml/h";
				document.getElementById("previewicon").className = "fas fa-arrow-circle-up";
			} else if (drug_sets[ind].preview_rate>0) {
				document.getElementById("preview_msg").innerHTML = "Change infusion rate to " + drug_sets[ind].preview_rate + "ml/h";
				if (drug_sets[ind].preview_downtrend == true) {
					document.getElementById("previewicon").className = "fas fa-arrow-circle-down";
				} else {
					document.getElementById("previewicon").className = "fas fa-arrow-circle-up";
				}
			} else {
				document.getElementById("preview_msg").innerHTML = "Pause infusion";
				document.getElementById("previewicon").className = "fas fa-pause-circle";
			}
		} else {
			document.getElementById("preview_cpt").innerHTML = "...";
			document.getElementById("preview_msg").innerHTML = "Waiting for user input"
		}
	} else if ((drug_sets[ind].cet_active > 0) && (drug_sets[ind].IB_active==0)) {
		if (x>0) {
			preview_cet(x,ind);
			document.getElementById("preview_cpt").innerHTML = "CE " + x + drug_sets[ind].conc_units + "/ml";
			if (drug_sets[ind].preview_bolus > 0) {
				document.getElementById("preview_msg").innerHTML = "Bolus " + drug_sets[ind].preview_bolus + drug_sets[ind].infused_units + " (" + Math.round(drug_sets[ind].preview_bolus / drug_sets[ind].infusate_concentration * 10)/10 +  "ml) then pause infusion";
				document.getElementById("previewicon").className = "fas fa-arrow-circle-up";
			} else if (drug_sets[ind].preview_rate>0) {
				document.getElementById("preview_msg").innerHTML = "Change infusion rate to " + drug_sets[ind].preview_rate + "ml/h";
				document.getElementById("previewicon").className = "fas fa-chevron-circle-right";
			} else {
				document.getElementById("preview_msg").innerHTML = "Pause infusion";
				document.getElementById("previewicon").className = "fas fa-pause-circle";
			}
		} else {
			document.getElementById("preview_cpt").innerHTML = "...";
			document.getElementById("preview_msg").innerHTML = "Waiting for user input"
		}
	} else if ((drug_sets[ind].cet_active>0) && (drug_sets[ind].IB_active==1)) {
		if (x>0) {
			preview_cetbolus(x,ind);
			document.getElementById("preview_cpt").innerHTML = "CE " + x + drug_sets[ind].conc_units + "/ml";
			if (drug_sets[ind].preview_bolus>0) {
				document.getElementById("preview_msg").innerHTML = "Bolus: " + drug_sets[ind].preview_bolus + drug_sets[ind].infused_units;
				document.getElementById("previewicon").className = "fas fa-arrow-circle-up";				
			} else {
				document.getElementById("preview_msg").innerHTML = "Pause & wait for next bolus";
				document.getElementById("previewicon").className = "fas fa-pause-circle";
			}
		}
	}
}
function hidepreview() {
	document.getElementById("preview").style.display="none";
}
function deliver_cpt(x, effect_flag, compensation, ind, continuation_fen_weightadj_flag) {
	//compensation is for compensating "lost CE" with CE downtrend and CP undershoot
	drug_sets[ind].desired = x;
	//backup the time at this point, in S
	if (effect_flag == 0) {
		drug_sets[ind].cpt_active = 1;
		var working_clock = Math.floor(time_in_s); 
		//process history to storage
		processhistory();

		//pop the arrays
		drug_sets[ind].cpt_rates.length = 0;
		drug_sets[ind].cpt_times.length = 0;
		drug_sets[ind].historyarray.length = 0;
		//set the real rates delivery array to current length in time_in_s

		if (drug_sets[ind].cpt_cp.length > 0) {
			drug_sets[ind].cpt_rates_real.length = working_clock;
			drug_sets[ind].cpt_cp.length = working_clock;
			drug_sets[ind].cpt_ce.length = working_clock;
			drug_sets[ind].volinf.length = working_clock;
			myChart.data.datasets[ind*2+2].data.length = myChart.data.datasets[ind*2+2].data.findIndex((element)=>element.x>time_in_s/60);
			myChart.data.datasets[ind*2+3].data.length = myChart.data.datasets[ind*2+3].data.findIndex((element)=>element.x>time_in_s/60);
		} else {
				myChart.data.datasets[ind*2+2].data.push({x:(working_clock)/60, y:0});
				myChart.data.datasets[ind*2+3].data.push({x:(working_clock)/60, y:0});
		}

		if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
			drug_sets[ind].fentanyl_weightadjusted_target_uncorrected = drug_sets[ind].desired;
			drug_sets[ind].desired = drug_sets[ind].desired * 1/drug_sets[ind].fentanyl_weightadjusted_factor;
		}
	} else {
		//working_clock starts not from real time, but from "next time"
		var working_clock = next_time;
		console.log("CET mode next_time: " + next_time);
		drug_sets[ind].cpt_rates.length = 0;
		drug_sets[ind].cpt_times.length = 0;
	}



	//backup current P state and E state s
	if (drug_sets[ind].cpt_cp.length>0) {
		p_state[1] = drug_sets[ind].cpt_cp[working_clock-1][0];
		p_state[2] = drug_sets[ind].cpt_cp[working_clock-1][1];
		p_state[3] = drug_sets[ind].cpt_cp[working_clock-1][2];

		e_state[1] = drug_sets[ind].cpt_ce[working_clock-1][0];
		e_state[2] = drug_sets[ind].cpt_ce[working_clock-1][1];
		e_state[3] = drug_sets[ind].cpt_ce[working_clock-1][2];
		e_state[4] = drug_sets[ind].cpt_ce[working_clock-1][3];
		//for fentanyl correction:
		//since we have downscaled CP/CE from original, then we now need to revert CP/CE back to its actual form 
		//by upscaling it using *1/correction_factor
		if ((effect_flag==0) && (drug_sets[ind].fentanyl_weightadjusted_flag==1)) {
			p_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			p_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			p_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[4] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
		}
	}

	//special scenario when CPT is invoked from CP approximates CE in CET mode of Fen-Wt adjusted program
	//here the p_ and e_states are continued from next_time and these need to be upscaled before use
	if (continuation_fen_weightadj_flag==1) {
			p_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			p_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			p_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[4] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
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



	var test_rate;
	var temp1, temp2, temp3, temp1e, temp2e, temp3e, temp4e;
	//var firstrun = -1;

	//prelim rate

	//for (outerloop=0; outerloop<100; outerloop++) { //200 dimensionless iterations
	//	temp1 = p_state2[1];
	//	temp2 = p_state2[2];
	//	temp3 = p_state2[3];
	//	temp1e = e_state2[1];
	//	temp2e = e_state2[2];
	//	temp3e = e_state2[3];
	//	temp4e = e_state2[4];

	var test_rate; //real rate entered into virtual state
	var trial_rate; //future rate
	var trial_cp; //future CP
	var est_cp; //last available CP


	cpt_interval = 120; //set to 120seconds

	var look_l1 = Math.exp(-drug_sets[ind].lambda[1] * cpt_interval); 
	var look_l2 = Math.exp(-drug_sets[ind].lambda[2] * cpt_interval);
	var look_l3 = Math.exp(-drug_sets[ind].lambda[3] * cpt_interval);
	var look_l4 = Math.exp(-drug_sets[ind].lambda[4] * cpt_interval);



	//debug: log current state
	console.log("--debug--");
	console.log("time is " + working_clock);
	console.log("pstate1 - " + p_state2[1]);
	console.log("pstate2 - " + p_state2[2]);
	console.log("pstate3 - " + p_state2[3]);
	console.log("infratemls - " + inf_rate_mls);

	if (effect_flag == 1) {
		console.log("estate1 - " + e_state2[1]);
		console.log("estate2 - " + e_state2[2]);
		console.log("estate3 - " + e_state2[3]);
		console.log("estate4 - " + e_state2[4]);
		console.log(e_state2[1]+ e_state2[2] + e_state2[3] + e_state2[4]);
	}
	

	if (drug_sets[active_drug_set_index].running == 1) {
		test_rate = drug_sets[ind].cpt_rates_real[working_clock-1];
		console.log("cpt_rates_real retrieved to be" + test_rate*3600/10);
	}




	//if (drug_sets[ind].firstrun == -1) { //sample bolus code
		//scheme_bolusadmin(Math.ceil(desired * vc /10)*10); // round up to the next 10mg for bolus
		if (drug_sets[ind].cpt_rates_real.length == 0) {
			drug_sets[ind].cpt_bolus = (drug_sets[ind].desired-(p_state[1]+p_state[2]+p_state[3])) * drug_sets[ind].vc;  //bolus round up to 10mg
		} else {
			drug_sets[ind].cpt_bolus = (drug_sets[ind].desired-(p_state[1]+p_state[2]+p_state[3]))/drug_sets[ind].p_udf[1];
		}
		if (drug_sets[ind].cpt_bolus>=70) {
			drug_sets[ind].cpt_bolus = Math.round(drug_sets[ind].cpt_bolus/10)*10;
		} else if (drug_sets[ind].cpt_bolus>1) {
			if ((mass>15) && (drug_sets[ind].cpt_bolus>=15)) {
				drug_sets[ind].cpt_bolus = Math.ceil(drug_sets[ind].cpt_bolus/5)*5; //round up to nearest 5mg
			} else {
				drug_sets[ind].cpt_bolus = Math.ceil(drug_sets[ind].cpt_bolus) + 1;
			}
		} else {
			drug_sets[ind].cpt_bolus = 0;
		}
		console.log("bolus mg " + drug_sets[ind].cpt_bolus + "entered into virtualstate");
		//drug_sets[ind].firstrun = 0;
		//myChart.data.datasets[2].data.push({x:working_clock/60, y:trial_result});
	//}

	//first pass
	for (i=0; i<60; i++) {
		//if ((p_state2[1] == 0) || (skip == 1)) {
			console.log(i*120);
		if (p_state2[1] == 0) {
				test_rate = drug_sets[ind].desired / drug_sets[ind].p_udf[cpt_interval];
				
				drug_sets[ind].cpt_rates.push(test_rate);
				console.log("testrate" + test_rate);
		//	}
		//	if (skip == 1) {
		//		test_rate = cpt_rates_real[Math.floor(working_clock)-1];
		//		cpt_times.push(i);
		//		cpt_rates.push(test_rate);
		//		skip = 0;
		//		alert(test_rate);
		//	}
		} else { // taken from line 1970, double model(...
			
				est_cp = p_state2[1] + p_state2[2] + p_state2[3];

				console.log("-----" + converttime(i*120) + "------");

				trial_cp = virtual_model( //need real lambda
				 p_state2[1] * Math.exp(-drug_sets[ind].lambda[1]) + drug_sets[ind].p_coef[1] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[1])),
				 p_state2[2] * Math.exp(-drug_sets[ind].lambda[2]) + drug_sets[ind].p_coef[2] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[2])),
				 p_state2[3] * Math.exp(-drug_sets[ind].lambda[3]) + drug_sets[ind].p_coef[3] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[3])),0,cpt_interval,0,ind);

				if (drug_sets[ind].desired > trial_cp) {
					trial_rate = (drug_sets[ind].desired - trial_cp)/drug_sets[ind].p_udf[cpt_interval];
				} else { trial_rate = 0;}

				//var old_rate_pred_cp = p_state2[1] * look_l1 + p_coef[1] * test_rate * (1 - look_l1)
				// + p_state2[2] * look_l2 + p_coef[2] * test_rate * (1 - look_l2)
				// + p_state2[3] * look_l3 + p_coef[3] * test_rate * (1 - look_l3);

				//var is_steady = (old_rate_pred_cp < (desired*1.05)) && (old_rate_pred_cp > (desired * 0.99));

				console.log("estCp" + est_cp);
				console.log("trialcp" + trial_cp);
				console.log("testrate" + test_rate);
				console.log("trialrate" + trial_rate);
				//console.log("--> oldratepredcp = " + old_rate_pred_cp);
				//console.log("--> is_steady = " + is_steady);
				
				test_rate = trial_rate;
				drug_sets[ind].cpt_rates.push(test_rate);

			
		}


			p_state2[1] = p_state2[1] * look_l1 + drug_sets[ind].p_coef[1] * test_rate * (1 - look_l1);
			p_state2[2] = p_state2[2] * look_l2 + drug_sets[ind].p_coef[2] * test_rate * (1 - look_l2);
			p_state2[3] = p_state2[3] * look_l3 + drug_sets[ind].p_coef[3] * test_rate * (1 - look_l3);
			//est_cp = p_state2[1] + p_state2[2] + p_state2[3];
			//console.log("est cp" + est_cp);
	}
	/*	
	for (i=0; i<3600; i++) { 
			if (desired > trial_result) { //test_rate is unit amount /sec, code copied from model()
				test_rate = (desired - trial_result)/p_udf[cpt_interval]; //rate is unit per second
			} else { test_rate = 0;}
		
		
			p_state2[1] = p_state2[1] * look_l1 + p_coef[1] * test_rate * (1 - look_l1);
			p_state2[2] = p_state2[2] * look_l2 + p_coef[2] * test_rate * (1 - look_l2);
			p_state2[3] = p_state2[3] * look_l3 + p_coef[3] * test_rate * (1 - look_l3);
			//if (effect_data)
			//	{
			e_state2[1] = e_state2[1] * look_l1 + e_coef[1] * test_rate * (1 - look_l1);
			e_state2[2] = e_state2[2] * look_l2 + e_coef[2] * test_rate * (1 - look_l2);
			e_state2[3] = e_state2[3] * look_l3 + e_coef[3] * test_rate * (1 - look_l3);
			e_state2[4] = e_state2[4] * look_l4 + e_coef[4] * test_rate * (1 - look_l4);
		
		//console.log(p_state2[1] + p_state2[2] + p_state2[3]);
		trial_result = virtual_model(p_state2[1], p_state2[2], p_state2[3], 0, 1, 0);
		if ((i>0) && (i%60 ==0)) {
			//write rate and time every minute to array
			test_rate = Math.round(test_rate*360)/360; 
			cpt_rates.push(test_rate);
			cpt_times.push(i);
		}
		if (i%60 == 0) {console.log(i + ":" + "rate " + test_rate*3600/10 + "Cp " + trial_result);}
	}
		//scheme_rates[i] = test_rate;
		//myChart.data.datasets[2].data.push({x:working_clock/60, y:trial_result});
		//working_clock = working_clock + 1;	
	//}
	*/

	//determine threshold
	if (drug_sets[ind].drug_name == "Alfentanil") {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 > 100) {
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.63;
			} else {
				cpt_threshold = 0.25;
				cpt_avgfactor = 0.44;
				//if (cpt_bolus>0) cpt_bolus = cpt_bolus +5; // up the bolus
			}
		}
	} else {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 > 25) {
				cpt_threshold = 0.08;
				cpt_avgfactor = 0.667;
			} else {
				cpt_threshold = 0.13;
				cpt_avgfactor = 0.55;
				//if (cpt_bolus>0) cpt_bolus = cpt_bolus +5; // up the bolus
			}
		}
	}


	if (effect_flag == 0) {
		scheme_bolusadmin(drug_sets[ind].cpt_bolus, ind);
		if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
			drug_sets[ind].historytext = "<div class='schemecpt' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Cp target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";
		} else {
			drug_sets[ind].historytext = "<div class='schemecpt' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Cp target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].desired + "</div>";
		}
		if (drug_sets[ind].cpt_bolus > 0) drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemebolus' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Bolus: " + drug_sets[ind].cpt_bolus + drug_sets[ind].infused_units + " <span style='opacity:0.5'>(" + Math.round(drug_sets[ind].cpt_bolus/drug_sets[ind].infusate_concentration*10)/10 + "ml)</span></div>");

		if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
			drug_sets[ind].historyarrays.push([1,0,working_clock,drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);
		} else {
			drug_sets[ind].historyarrays.push([1,0,working_clock,drug_sets[ind].desired]);
		}
		drug_sets[ind].historyarrays.push([1,1,working_clock,drug_sets[ind].cpt_bolus]);
	}
	

	//new second pass (downsample infusion rates from cpt_rates and write to cpt_rates_real)

	
	//automatically determine high or low rounding factor (3600->round to 0.1, 360->round to 1)
	if ((paedi_mode == 1) || (drug_sets[ind].cpt_rates[5]<16/360)) {
		var roundingfactor = 3600;
	} else {
		if (drug_sets[ind].drug_name == "Propofol") {
			var roundingfactor = 360;
		} else {
			var roundingfactor = 3600;
		}
	}
	prior_test_rate = 0;
	var prior_timestamp = 0; //unit is iteration number (1=120s)
	test_rate = Math.round(drug_sets[ind].cpt_rates[0]*roundingfactor)/roundingfactor;
	var firstcycle = -1;
	var wait = 0; // this stores total wait time before normal algorithm resumes
	var wait_pause = 1; // this stores how many cycles (*120=s) to pause
	var wait_rate_avg_begin = 0; // this stores the averaging rate after the pause, in the beginning
	var wait_rate_avg_end = 0; // this stores the averaging rate after the pause, in the end
	var wait_peak = 0; // this stores the time at the peak rate, out of the 60 cycles
	var wait_temp1, wait_temp2, wait_temp3; //used in breakpoint analysis


	
	if (effect_flag == 1) { //CET mode
		for (j=0; j<60; j++) {
			if (firstcycle == -1) {
				//if (cpt_rates[0] > 0) {
					wait_peak = 0;
					prior_test_rate = drug_sets[ind].cpt_rates[1];
					drug_sets[ind].cpt_times.push(1);
				//} else if ((cpt_rates[0] > 0) && (cpt_rates[1]>cpt_rates[0])) {
					//inc-dec code
				//} else {
					//dec code
				//}// end else
				firstcycle =0;
			} else { //not first cycle, CET mode
				if ((Math.abs(prior_test_rate-drug_sets[ind].cpt_rates[j])/prior_test_rate > cpt_threshold) && (j>wait_peak)) { 
					if (prior_test_rate>drug_sets[ind].cpt_rates[j]) {
						test_rate = Math.round(((drug_sets[ind].cpt_rates[drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]]-drug_sets[ind].cpt_rates[j])*cpt_avgfactor+drug_sets[ind].cpt_rates[j])*roundingfactor)/roundingfactor;
					} else {
						test_rate = Math.round((prior_test_rate + drug_sets[ind].cpt_rates[j])/2 *roundingfactor)/roundingfactor;
					}

					if ((drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1) && (drug_sets[ind].cpt_rates[0]>0)) {
						if (compensation>0) {
							compensation = compensation / (120*j);
							test_rate = Math.round((test_rate + compensation)*roundingfactor)/roundingfactor;
						}
						for (k=0; k<120; k++) {drug_sets[ind].cpt_rates_real.push(test_rate);}
					}
					for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<j*120; k++) {
							drug_sets[ind].cpt_rates_real.push(test_rate);
					}

					console.log(test_rate*3600/10 + " - from " + drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120 + " to " + j*120 + "s");

					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;

					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;
					if ((drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1)) {
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
						drug_sets[ind].historyarray.push([working_clock, test_rate]);
					} else {
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].historyarray.push([relativetime, test_rate]);
					}

					drug_sets[ind].cpt_times.push(j);
					prior_test_rate = drug_sets[ind].cpt_rates[j];
				}

				if (j==59) {
					test_rate = Math.round((drug_sets[ind].cpt_rates[drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]]+drug_sets[ind].cpt_rates[j])/2*roundingfactor)/roundingfactor;
					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;
					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;
					if ((drug_sets[ind].cpt_times.length == 1) && (drug_sets[ind].cpt_times[0] == 1)) { //special scenario for 1 rate till the end, need to fill up first 2mins
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].historyarray.push([working_clock, test_rate]);
						for (k=0; k<7200; k++) {
								drug_sets[ind].cpt_rates_real.push(test_rate);
						}
					} else {
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].historyarray.push([relativetime, test_rate]);
						for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<7200; k++) {
								drug_sets[ind].cpt_rates_real.push(test_rate);
						}
					}

					var tempArray = new Array();
					for (i=0; i<drug_sets[ind].historyarray.length; i++) {
						tempArray.push(drug_sets[ind].historyarray[i]);
					}
					drug_sets[ind].historyarrays.push([2,2,working_clock,tempArray]);
				}
			}
		} //end for
	} else { //CPT mode
		
		for (j=0; j<60; j++) {
			
			//temp_test_rate = cpt_rates[j/60];
			if (firstcycle == -1) {
				if ((drug_sets[ind].cpt_rates[0] > 0) && (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1])) { //this is a type of decremental infusion rates - can use normal algorithm
					wait_peak = 0; //reset wait peak to zero to avoid bug
					prior_test_rate = drug_sets[ind].cpt_rates[1];
					drug_sets[ind].cpt_times.push(1);
				} else if ((drug_sets[ind].cpt_rates[0] > 0) && (drug_sets[ind].cpt_rates[1]>drug_sets[ind].cpt_rates[0])) { //special scenario where there is slow rise in inf rate to peak then falls
					prior_test_rate = drug_sets[ind].cpt_rates[1];
					console.log('enter special WAIT-PEAK cycle as cpt_rates fall into inc-peak-dec pattern');
					INNER_LOOP: for (k=1; k<60; k++) {
						if (drug_sets[ind].cpt_rates[k] > drug_sets[ind].cpt_rates[k-1]) {
							wait_peak = k;
						} else {
							break INNER_LOOP;
						}
					}
					
					console.log('wait peak (cycle)' + wait_peak);

					const one_of_360 = 1/360;
					const half_of_360 = 0.5/360;

					//if it is a long wait_peak (>5 cycles), let's break the averaging rates into segments
					//or else we just stick to one rate 

					if (wait_peak > 5) {
						wait_temp1 = Math.round(drug_sets[ind].cpt_rates[1]*roundingfactor)/roundingfactor; // round to nearest 0.5
						wait_temp2 = Math.round(drug_sets[ind].cpt_rates[wait_peak]*roundingfactor)/roundingfactor; // round to nearest 0.5
						console.log("enter long wait peak mode------------");
						//console.log("wait_temp1 = " + wait_temp1*360);
						//console.log("wait_temp2 = " + wait_temp2*360);
						var breakpoint = 2; // this is the breakpoint between 2 segments
						// if wait_temp1 and wait_temp2 are not different by more than 1 then there is no meaning to separate segments
						if (wait_temp2 > wait_temp1 + one_of_360) {
							
							INNER_LOOP2: for (k = wait_peak; k > 1; k--) { //this loops from end back to beginning and determines breakpoint when it is no longer in steady state
								if ((wait_temp2 - drug_sets[ind].cpt_rates[k-1]) > one_of_360) {
									breakpoint = k;
									break INNER_LOOP2;
								}
							}

							INNER_LOOP3: for (k = 1; k < breakpoint-1; k++) {
								console.log(k);
								wait_temp1 = wait_temp1 + drug_sets[ind].cpt_rates[k+1];
							}

							wait_temp1 = Math.round(wait_temp1/(breakpoint-1)*roundingfactor)/roundingfactor;
							//console.log("wait_temp1 (INNERLOOP3) average = " + wait_temp1*360);


							wait_rate_avg_begin = wait_temp1; 
							wait_rate_avg_end = wait_temp2;
						} else {
							// use the higher rate
							wait_rate_avg_begin = wait_temp2;
							wait_rate_avg_end = wait_temp2;
							// floor the breakpoint to the beginning
							breakpoint = 2;
						}
						console.log("breakpoint = " + breakpoint);
						//console.log("wait_rate avg begin = " + wait_rate_avg_begin*360);
						//console.log("wait_rate avg end = " + wait_rate_avg_end*360);

						// write to real system
						for (k=0; k<breakpoint*120; k++) {
							drug_sets[ind].cpt_rates_real.push(wait_rate_avg_begin);
						}
						for (k=breakpoint; k<wait_peak*120; k++) {
							drug_sets[ind].cpt_rates_real.push(wait_rate_avg_end);
						}

						prior_test_rate = drug_sets[ind].cpt_rates[wait_peak];
						drug_sets[ind].cpt_times.push(wait_peak);
						
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + Math.round(wait_rate_avg_begin*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_rate_avg_begin*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].historyarray.push([working_clock, wait_rate_avg_begin]);
						

						if (wait_rate_avg_end > wait_rate_avg_begin) {
							relativetime = working_clock + breakpoint*120;
							drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + Math.round(wait_rate_avg_end*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_rate_avg_end*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
							drug_sets[ind].historyarray.push([relativetime, wait_rate_avg_end]);
						}

					} else { // so this is then wait_peak <=5
						// take average and round to nearest 0.5
						wait_temp1 = Math.round((drug_sets[ind].cpt_rates[wait_peak] + drug_sets[ind].cpt_rates[1])/2*roundingfactor)/roundingfactor;
						console.log("enter short wait peak mode-------------");
						//console.log("wait_temp1 = " + wait_temp1*360);

						for (k=0; k<wait_peak*120; k++) {
							drug_sets[ind].cpt_rates_real.push(wait_temp1);
						}
						prior_test_rate = drug_sets[ind].cpt_rates[wait_peak];
						drug_sets[ind].cpt_times.push(wait_peak);
						
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + Math.round(wait_temp1*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_temp1*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].historyarray.push([working_clock, wait_temp1]);
					}

				} else { // this means cpt_rates[0] is zero -> infusion stopped for 2 min
					prior_test_rate = 0;
					// determine how long is the pause and determine the time of peak
					INNER_LOOP: for (k=1; k<60; k++) {
						if (drug_sets[ind].cpt_rates[k] == 0) {
							wait_pause = k;
						} else if (drug_sets[ind].cpt_rates[k] > drug_sets[ind].cpt_rates[k-1]) {
							wait_peak = k;
						} else {
							break INNER_LOOP;
						}
					}
					console.log('wait pause (cycle)' + wait_pause);
					console.log('wait peak (cycle)' + wait_peak);

					const one_of_360 = 1/360;
					const half_of_360 = 0.5/360;

					//if it is a long wait_peak (>5 cycles), let's break the averaging rates into segments
					//or else we just stick to one rate 

					if (wait_peak > 5) {
						wait_temp1 = Math.round(drug_sets[ind].cpt_rates[wait_pause+1]*roundingfactor)/roundingfactor; // round to nearest 0.5
						wait_temp2 = Math.round(drug_sets[ind].cpt_rates[wait_peak]*roundingfactor)/roundingfactor; // round to nearest 0.5
						console.log("enter long wait peak mode------------");
						//console.log("wait_temp1 = " + wait_temp1*360);
						//console.log("wait_temp2 = " + wait_temp2*360);
						var breakpoint = wait_pause+1; // this is the breakpoint between 2 segments
						// if wait_temp1 and wait_temp2 are not different by more than 1 then there is no meaning to separate segments
						if (wait_temp2 > wait_temp1 + one_of_360) {
							
							INNER_LOOP2: for (k = wait_peak; k > wait_pause; k--) { //this loops from end back to beginning and determines breakpoint when it is no longer in steady state
								if ((wait_temp2 - drug_sets[ind].cpt_rates[k-1]) > one_of_360) {
									breakpoint = k;
									break INNER_LOOP2;
								}
							}

							INNER_LOOP3: for (k = 1; k < breakpoint-wait_pause; k++) {
								console.log(k);
								wait_temp1 = wait_temp1 + drug_sets[ind].cpt_rates[wait_pause+1+k];
							}

							wait_temp1 = Math.round(wait_temp1/(breakpoint-wait_pause)*roundingfactor)/roundingfactor;
							//console.log("wait_temp1 (INNERLOOP3) average = " + wait_temp1*360);


							wait_rate_avg_begin = wait_temp1; 
							wait_rate_avg_end = wait_temp2;
						} else {
							// use the higher rate
							wait_rate_avg_begin = wait_temp2;
							wait_rate_avg_end = wait_temp2;
							// floor the breakpoint to the beginning
							breakpoint = wait_pause+1;
						}
						console.log("breakpoint = " + breakpoint);
						//console.log("wait_rate avg begin = " + wait_rate_avg_begin*360);
						//console.log("wait_rate avg end = " + wait_rate_avg_end*360);

						// write to real system
						for (k=0; k<wait_pause*120; k++) {
							drug_sets[ind].cpt_rates_real.push(0);
						}
						for (k=wait_pause; k<breakpoint*120; k++) {
							drug_sets[ind].cpt_rates_real.push(wait_rate_avg_begin);
						}
						for (k=breakpoint; k<wait_peak*120; k++) {
							drug_sets[ind].cpt_rates_real.push(wait_rate_avg_end);
						}

						prior_test_rate = cpt_rates[wait_peak];
						drug_sets[ind].cpt_times.push(wait_peak);
						relativetime = working_clock + wait_pause*120;
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Paused for " + wait_pause*2 + " mins </div>");
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + Math.round(wait_rate_avg_begin*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_rate_avg_begin*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].historyarray.push([working_clock, 0]);
						drug_sets[ind].historyarray.push([relativetime, wait_rate_avg_begin]);

						if (wait_rate_avg_end > wait_rate_avg_begin) {
							relativetime = working_clock + breakpoint*120;
							drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" +  converttime(relativetime) + "</div>" + Math.round(wait_rate_avg_end*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_rate_avg_end*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
							drug_sets[ind].historyarray.push([relativetime, wait_rate_avg_end]);
						}

					} else { // so this is then wait_peak <=5
						// take average and round to nearest 0.5
						wait_temp1 = Math.round((drug_sets[ind].cpt_rates[wait_peak] + drug_sets[ind].cpt_rates[wait_pause+1])/2*roundingfactor)/roundingfactor;
						console.log("enter short wait peak mode-------------");
						//console.log("wait_temp1 = " + wait_temp1*360);
						for (k=0; k<wait_pause*120; k++) {
							drug_sets[ind].cpt_rates_real.push(0);
						}
						for (k=wait_pause; k<wait_peak*120; k++) {
							drug_sets[ind].cpt_rates_real.push(wait_temp1);
						}
						prior_test_rate = drug_sets[ind].cpt_rates[wait_peak];
						drug_sets[ind].cpt_times.push(wait_peak);
						relativetime = working_clock + wait_pause*120;
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" +  converttime(working_clock) + "</div>Paused for " + wait_pause*2 + " mins </div>");
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" +  converttime(relativetime) + "</div>" + Math.round(wait_temp1*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_temp1*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].historyarray.push([working_clock, 0]);
						drug_sets[ind].historyarray.push([relativetime, wait_temp1]);
					}

				}// end else - the wait-pause wait-peak algorithm
				firstcycle = 0;
			} else { //not first cycle
				//console.log("--debug-- normal algorithm, 2nd pass--, wait_peak=" + wait_peak);
				//console.log("cycle " + j);
				//console.log("prior test rate" + prior_test_rate);
				//console.log("cpt_rates[j]" + cpt_rates[j]);
				if (((prior_test_rate-drug_sets[ind].cpt_rates[j])/prior_test_rate > cpt_threshold) && (j>wait_peak)) { 
					//if ((cpt_bolus == 0) && (cpt_times.length == 1)) { //upscale inf rate if no bolus
					//	test_rate = Math.ceil((cpt_rates[0]+cpt_rates[1])/2*360)/360;
					//} else { //normal scenario
					test_rate = Math.round(((drug_sets[ind].cpt_rates[drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]]-drug_sets[ind].cpt_rates[j])*cpt_avgfactor+drug_sets[ind].cpt_rates[j])*roundingfactor)/roundingfactor;
					//}
					if ((drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1) && (drug_sets[ind].cpt_rates[0]>0) && (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1])) {
						for (k=0; k<120; k++) {drug_sets[ind].cpt_rates_real.push(test_rate);}
					}
					for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<j*120; k++) {
							drug_sets[ind].cpt_rates_real.push(test_rate);
					}
					console.log(test_rate*3600/10 + " - from " + drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120 + " to " + j*120 + "s");

					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;

					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;

					if ((drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1) && (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1])) {
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
						drug_sets[ind].historyarray.push([working_clock, test_rate]);
					} else {
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
						drug_sets[ind].historyarray.push([relativetime, test_rate]);
					}

					drug_sets[ind].cpt_times.push(j);
					prior_test_rate = drug_sets[ind].cpt_rates[j];
				}

				if (j==59) {
					test_rate = Math.round((drug_sets[ind].cpt_rates[drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]]+drug_sets[ind].cpt_rates[j])/2*roundingfactor)/roundingfactor;
					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;
					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;
					drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
					drug_sets[ind].historyarray.push([relativetime, test_rate]);
					for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<7200; k++) {
							drug_sets[ind].cpt_rates_real.push(test_rate);
					}

					var tempArray = new Array();
					for (i=0; i<drug_sets[ind].historyarray.length; i++) {
						tempArray.push(drug_sets[ind].historyarray[i]);
					}
					drug_sets[ind].historyarrays.push([1,2,working_clock,tempArray]);
				}
			}
		}//end for 1-60
	}//end else [CPT mode]
	
	//real delivery

	var look_l1 = Math.exp(-drug_sets[ind].lambda[1] ); 
	var look_l2 = Math.exp(-drug_sets[ind].lambda[2] );
	var look_l3 = Math.exp(-drug_sets[ind].lambda[3] );
	var look_l4 = Math.exp(-drug_sets[ind].lambda[4] );
	var temp_result, temp_result_e, temp_vol;

	if (drug_sets[ind].volinf.length==0) {
		temp_vol = 0;
	} else {
		temp_vol = drug_sets[ind].volinf[working_clock-1];
	};

	//you've got to deliver the real bolus at this point too
	bolusadmin(drug_sets[0].cpt_bolus,ind);

	for (j=0; j<7200; j++) {

		test_rate = drug_sets[ind].cpt_rates_real[j+working_clock];
		temp_vol = temp_vol+test_rate/drug_sets[ind].infusate_concentration;

		p_state3[1] = p_state3[1] * look_l1 + drug_sets[ind].p_coef[1] * test_rate * (1 - look_l1);
		p_state3[2] = p_state3[2] * look_l2 + drug_sets[ind].p_coef[2] * test_rate * (1 - look_l2);
		p_state3[3] = p_state3[3] * look_l3 + drug_sets[ind].p_coef[3] * test_rate * (1 - look_l3);
		//if (effect_data)
		//	{
		e_state3[1] = e_state3[1] * look_l1 + drug_sets[ind].e_coef[1] * test_rate * (1 - look_l1);
		e_state3[2] = e_state3[2] * look_l2 + drug_sets[ind].e_coef[2] * test_rate * (1 - look_l2);
		e_state3[3] = e_state3[3] * look_l3 + drug_sets[ind].e_coef[3] * test_rate * (1 - look_l3);
		e_state3[4] = e_state3[4] * look_l4 + drug_sets[ind].e_coef[4] * test_rate * (1 - look_l4);
		
		//prior_test_rate = test_rate;
		temp_result = p_state3[1] + p_state3[2] + p_state3[3];
		temp_result_e = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];

		drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
		drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
		if ((j==0) && (drug_sets[ind].cpt_bolus>0)) { //detect bolus given and update VI
			temp_vol += drug_sets[ind].cpt_bolus/10;
			drug_sets[ind].volinf.push(temp_vol);
		} else {
			drug_sets[ind].volinf.push(temp_vol);
		}
		//charting engine: if before first 15mins then higher resolution
		if ((j<15*60) && (j%10==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+j)/60, y:temp_result});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+j)/60, y:temp_result_e});
		}
		if ((j>=15*60) && (j%60==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+j)/60, y:temp_result});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+j)/60, y:temp_result_e});			
		}
	}
	
	
	//myChart.data.datasets[ind*2+2].hidden = false;
	//myChart.data.datasets[ind*2+3].hidden = false;
	//myChart.update();
	document.getElementById("historywrapper").innerHTML = drug_sets[ind].historytext;
	if (parseloading == 0) savefile_data();
	
	if ((effect_flag == 0) && (drug_sets[ind].fentanyl_weightadjusted_flag==1)) {
		apply_fentanyl_correction(ind);
	} else {
		myChart.update();
	}
	if (effect_flag == 0) {
		if (parseloading == 0) ptol_generate_margins(ind,0.9,0.5);
	}
}


function preview_cetbolus(x,ind) {
	drug_sets[ind].desired = x;
	if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
		drug_sets[ind].fentanyl_weightadjusted_target_uncorrected = drug_sets[ind].desired;
		drug_sets[ind].desired = drug_sets[ind].desired * 1/drug_sets[ind].fentanyl_weightadjusted_factor;
	}
	var working_clock = Math.floor(time_in_s);
	drug_sets[ind].preview_bolus = 0;

	if (drug_sets[ind].firstrun > -1) {
		if (drug_sets[ind].cpt_cp.length>0) {
			p_state[1] = drug_sets[ind].cpt_cp[working_clock-1][0];
			p_state[2] = drug_sets[ind].cpt_cp[working_clock-1][1];
			p_state[3] = drug_sets[ind].cpt_cp[working_clock-1][2];
			e_state[1] = drug_sets[ind].cpt_ce[working_clock-1][0];
			e_state[2] = drug_sets[ind].cpt_ce[working_clock-1][1];
			e_state[3] = drug_sets[ind].cpt_ce[working_clock-1][2];
			e_state[4] = drug_sets[ind].cpt_ce[working_clock-1][3];
			if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
				p_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				p_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				p_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[4] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			}
		}
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

	var test_rate;
	var temp1, temp2, temp3, temp1e, temp2e, temp3e, temp4e;
	var firstrun = -1;
	var trial_rate; //future rate
	var trial_cp; //future CP
	var est_cp; //last available CP
	var est_ce; //last available CE

	//next_time = 0;

	if (p_state[1] == 0) {
		drug_sets[ind].prior_peak_time = drug_sets[ind].peak_time;
		drug_sets[ind].preview_bolus = drug_sets[ind].desired / drug_sets[ind].e_udf[drug_sets[ind].peak_time];
		//drug_sets[ind].preview_rate = 0;
	}

	if ((drug_sets[ind].cet_lockdowntime>working_clock) && (drug_sets[ind].desired<drug_sets[ind].cet_priordesired)) {
		//in lockdown phase
		drug_sets[ind].preview_bolus = 0;
		//drug_sets[ind].preview_rate = 0;
	}

	temp_peak = drug_sets[active_drug_set_index].prior_peak_time;
	var min_dif = desired *0.0001;

	//first check if previous cet_lockdowntime is active , write CP and CE until CETpeak 
	//if ((cet_lockdowntime>working_clock) && (desired<=cet_priordesired)) {
	//
	//}

	/* t6 additions, to make CET in this algorithm analogous to stanpump lines 2002-*/
	temp1e = e_state2[1] * Math.exp(-drug_sets[active_drug_set_index].lambda[1]) ;
	temp2e = e_state2[2] * Math.exp(-drug_sets[active_drug_set_index].lambda[2]) ;
	temp3e = e_state2[3] * Math.exp(-drug_sets[active_drug_set_index].lambda[3]) ;
	temp4e = e_state2[4] * Math.exp(-drug_sets[active_drug_set_index].lambda[4]) ;

	est_ce = e_state2[1]+e_state2[2]+e_state2[3]+e_state2[4];
	est_cp = p_state2[1]+p_state2[2]+p_state2[3];

	//if CET gets very close to desired, it is better to target CPT (STANPUMP 1952)
	//let's omit this part for CET IB mode


	//if ((Math.abs(desired - est_ce) < desired * 0.05) && (Math.abs(est_ce-est_cp) < est_ce * 0.1) && (working_clock>cet_lockdowntime)) {
	//	console.log("CET gets too close to Desired; escaped; to CPT -----");
	//	historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + conc_units + "/ml): " + desired + "</div>";
	//	next_time = working_clock ; 
	//	historyarrays.push([2,0,working_clock,desired]);
	//	bolusconversion();
	//	//deliver_cpt(desired,1,0);
	//} else { //normal CET mode 

		/* should the pump be off? until after this drops below Ce*/
		if (est_ce >= drug_sets[ind].desired) {
			drug_sets[active_drug_set_index].preview_bolus = 0;
		} else {	//for est CE not higher than desired
			/* Initial settings */
			console.log("previewCET calculating bolus");
			//if (temp_peak <= delta_seconds) temp_peak = delta_seconds + 1;
			trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index)) / drug_sets[active_drug_set_index].e_udf[temp_peak];
			temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, active_drug_set_index);
			current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index) + drug_sets[active_drug_set_index].e_udf[temp_peak] * trial_rate;

			/* Iterate until solution is found [ln 2009] */
			while (Math.abs(current - drug_sets[ind].desired) > min_dif)
				{
				trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index)) / drug_sets[active_drug_set_index].e_udf[temp_peak];
				temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, active_drug_set_index);
				current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index) + drug_sets[active_drug_set_index].e_udf[temp_peak] * trial_rate;
				}
			drug_sets[active_drug_set_index].prior_peak_time = temp_peak;
			next_time = working_clock + temp_peak;

			if (drug_sets[active_drug_set_index].cpt_rates_real.length > 0) {
				drug_sets[active_drug_set_index].preview_bolus = trial_rate;
			}
			if (mass>15)  {
				drug_sets[active_drug_set_index].preview_bolus = Math.ceil(drug_sets[active_drug_set_index].preview_bolus/5)*5
			} else {
				drug_sets[active_drug_set_index].preview_bolus = Math.ceil(drug_sets[active_drug_set_index].preview_bolus);
			}; // round up to the next 5mg bolus if bw big 
	}//end else of NORMAL CET algorithm
	//}//end normal CET algorithm
	//ticker_active = 0;
	//document.getElementById('ticker').style.display='none';


}

function preview_cet(x,ind) {
	drug_sets[ind].desired = x;
	drug_sets[ind].preview_bolus = 0;
	drug_sets[ind].preview_rate = 0;
	if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
		drug_sets[ind].fentanyl_weightadjusted_target_uncorrected = drug_sets[ind].desired;
		drug_sets[ind].desired = drug_sets[ind].desired * 1/drug_sets[ind].fentanyl_weightadjusted_factor;
	}
	var working_clock = Math.floor(time_in_s); 
	if (drug_sets[ind].firstrun > -1) {
		if (drug_sets[ind].cpt_cp.length>0) {
			p_state[1] = drug_sets[ind].cpt_cp[working_clock-1][0];
			p_state[2] = drug_sets[ind].cpt_cp[working_clock-1][1];
			p_state[3] = drug_sets[ind].cpt_cp[working_clock-1][2];
			e_state[1] = drug_sets[ind].cpt_ce[working_clock-1][0];
			e_state[2] = drug_sets[ind].cpt_ce[working_clock-1][1];
			e_state[3] = drug_sets[ind].cpt_ce[working_clock-1][2];
			e_state[4] = drug_sets[ind].cpt_ce[working_clock-1][3];
			if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
				p_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				p_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				p_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[4] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			}
		}
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

	var test_rate;
	var temp1, temp2, temp3, temp1e, temp2e, temp3e, temp4e;
	var firstrun = -1;
	var trial_rate; //future rate
	var trial_cp; //future CP
	var est_cp; //last available CP
	var est_ce; //last available CE
	var cet_pause =0; //if Ce goes down, needs a pause
	var cpt_pause =0; //CPT pause is less than CET pause
	var breakpoint =0; //this determines the time of restarting infusion
	var remaining=0;


	//copied from CPT PREVIEW
	cpt_interval = 120; //set to 120seconds

	var look_l1 = Math.exp(-drug_sets[ind].lambda[1] * cpt_interval); 
	var look_l2 = Math.exp(-drug_sets[ind].lambda[2] * cpt_interval);
	var look_l3 = Math.exp(-drug_sets[ind].lambda[3] * cpt_interval);
	var look_l4 = Math.exp(-drug_sets[ind].lambda[4] * cpt_interval);


	if (p_state[1] == 0) {
		drug_sets[ind].prior_peak_time = drug_sets[ind].peak_time;
		drug_sets[ind].preview_bolus = drug_sets[ind].desired / drug_sets[ind].e_udf[drug_sets[ind].peak_time];
		drug_sets[ind].preview_rate = 0;
	}

	if ((drug_sets[ind].cet_lockdowntime>working_clock) && (drug_sets[ind].desired<drug_sets[ind].cet_priordesired)) {
		//in lockdown phase
		drug_sets[ind].preview_bolus = 0;
		drug_sets[ind].preview_rate = 0;
	}
	//END COPY from CPT PREVIEW

	temp_peak = drug_sets[ind].prior_peak_time;
	var min_dif = drug_sets[ind].desired *0.0001;


	/* t6 additions, to make CET in this algorithm analogous to stanpump lines 2002-*/
	temp1e = e_state2[1] ;
	temp2e = e_state2[2] ;
	temp3e = e_state2[3] ;
	temp4e = e_state2[4] ;

	est_ce = e_state2[1]+e_state2[2]+e_state2[3]+e_state2[4];
	est_cp = p_state2[1]+p_state2[2]+p_state2[3];


	if ((Math.abs(drug_sets[ind].desired - est_ce) < drug_sets[ind].desired * 0.05) && (Math.abs(est_ce-est_cp) < est_ce * 0.1) && (working_clock>drug_sets[ind].cet_lockdowntime)) {
		//ce too close to desired
		console.log("entering CPT mode as CE close to desired and CP close to CE");
		test_rate = drug_sets[ind].cpt_rates_real[working_clock-1];
		//pop the arrays
		drug_sets[ind].cpt_rates.length = 0;
		drug_sets[ind].cpt_times.length = 0;
		cpt_interval = 120; //set to 120seconds

		for (i=0; i<60; i++) {
			
			est_cp = p_state2[1] + p_state2[2] + p_state2[3];

			trial_cp = virtual_model( //need real lambda
			 p_state2[1] * Math.exp(-drug_sets[ind].lambda[1]) + drug_sets[ind].p_coef[1] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[1])),
			 p_state2[2] * Math.exp(-drug_sets[ind].lambda[2]) + drug_sets[ind].p_coef[2] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[2])),
			 p_state2[3] * Math.exp(-drug_sets[ind].lambda[3]) + drug_sets[ind].p_coef[3] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[3])),0,cpt_interval,0,ind);

			if (drug_sets[ind].desired > trial_cp) {
				trial_rate = (drug_sets[ind].desired - trial_cp)/drug_sets[ind].p_udf[cpt_interval];
			} else { trial_rate = 0;}

				console.log("estCp" + est_cp);
				console.log("trialcp" + trial_cp);
				console.log("testrate" + test_rate);
				console.log("trialrate" + trial_rate);

			test_rate = trial_rate;
			drug_sets[ind].cpt_rates.push(test_rate);

			p_state2[1] = p_state2[1] * look_l1 + drug_sets[ind].p_coef[1] * test_rate * (1 - look_l1);
			p_state2[2] = p_state2[2] * look_l2 + drug_sets[ind].p_coef[2] * test_rate * (1 - look_l2);
			p_state2[3] = p_state2[3] * look_l3 + drug_sets[ind].p_coef[3] * test_rate * (1 - look_l3);
		}

	//determine threshold
	if (drug_sets[ind].drug_name == "Alfentanil") {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 > 100) {
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.63;
			} else {
				cpt_threshold = 0.25;
				cpt_avgfactor = 0.44;
				//if (cpt_bolus>0) cpt_bolus = cpt_bolus +5; // up the bolus
			}
		}
	} else {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 > 25) {
				cpt_threshold = 0.08;
				cpt_avgfactor = 0.667;
			} else {
				cpt_threshold = 0.13;
				cpt_avgfactor = 0.55;
				//if (cpt_bolus>0) cpt_bolus = cpt_bolus +5; // up the bolus
			}
		}
	}

		//secondpass

	//automatically determine high or low rounding factor (3600->round to 0.1, 360->round to 1)
	if ((paedi_mode == 1) || (drug_sets[ind].cpt_rates[5]<16/360)) {
		var roundingfactor = 3600;
	} else {
		if (drug_sets[ind].drug_name == "Propofol") {
			var roundingfactor = 360;
		} else {
			var roundingfactor = 3600;
		}
	}
		prior_test_rate = drug_sets[ind].cpt_rates[1];

		//cpt_times.push(1);
		for (j=1; j<30; j++) {
			if (Math.abs(prior_test_rate-drug_sets[ind].cpt_rates[j])/prior_test_rate > cpt_threshold) { 
				//if ((cpt_bolus == 0) && (cpt_times.length == 1)) { //upscale inf rate if no bolus
				//	test_rate = Math.ceil((cpt_rates[0]+cpt_rates[1])/2*360)/360;
				//} else { //normal scenario
				if (prior_test_rate>drug_sets[ind].cpt_rates[j]) {
					test_rate = Math.round(((prior_test_rate-drug_sets[ind].cpt_rates[j])*cpt_avgfactor+drug_sets[ind].cpt_rates[j])*roundingfactor)/roundingfactor;
					break;
				} else {
					test_rate = Math.round((prior_test_rate + drug_sets[ind].cpt_rates[j])/2 *roundingfactor)/roundingfactor;
					break;
				}
			}
		}

		drug_sets[ind].preview_bolus = 0;
		drug_sets[ind].preview_rate = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
		drug_sets[ind].preview_downtrend = (drug_sets[ind].cpt_rates_real[working_clock-1] > test_rate);
	} else {
		//normal CET algorithm
		if (est_ce >= drug_sets[ind].desired) {
			drug_sets[ind].preview_rate = 0;
			drug_sets[ind].preview_bolus = 0;
			//preview_cetpause = 0;
			//not yet finish code;
			console.log("CE >= desired ");
		} else {
			// this is for est_ce not higher than desired
			//if (temp_peak <= delta_seconds) temp_peak = delta_seconds + 1;
			trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind)) / drug_sets[ind].e_udf[temp_peak];
			temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
			current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind) + drug_sets[ind].e_udf[temp_peak] * trial_rate;
			console.log(trial_rate);
			console.log(temp_peak);
			console.log(current);
			/* Iterate until solution is found [ln 2009] */

			while (Math.abs(current - drug_sets[ind].desired) > min_dif)
				{
				trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind)) / drug_sets[ind].e_udf[temp_peak];
				temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
				current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1,ind) + e_udf[temp_peak] * trial_rate;
				}
			drug_sets[ind].prior_peak_time = temp_peak;
			//next_time = working_clock + temp_peak;

			if (drug_sets[ind].cpt_rates_real.length > 0) {
				drug_sets[ind].preview_bolus = trial_rate;
			}
			if (mass>15)  {
				drug_sets[ind].preview_bolus = Math.ceil(drug_sets[ind].preview_bolus/5)*5
			} else {
				drug_sets[ind].preview_bolus = Math.ceil(drug_sets[ind].preview_bolus)
			}; // round up to the next 5mg bolus if bw big 

			preview_cetpause = temp_peak;

			console.log(temp1e + " " + temp2e + " " + temp3e + " " + temp4e);
			console.log("debug cet, virtualmodel = " + virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1,ind));
			console.log("debug cet, trialrate= " + trial_rate);
			console.log("debug cet, cet_bolus= " + drug_sets[ind].preview_bolus);
			console.log("debug cet, temp_peak= " + temp_peak);
			console.log("debug cet, current= " + current);

			//scheme_bolusadmin(cet_bolus);
			//historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (mcg/ml): " + desired + "</div>";
			//if (cet_bolus > 0) {
			//	cet_lockdowntime = working_clock + temp_peak -1;
			//	historytext = historytext.concat("<div class='schemeboluscet' data-time='" + working_clock + "'>" + "Time: " + converttime(working_clock) + " - Bolus: " + cet_bolus + "mg</div>");
			//	historytext = historytext.concat("<div class='schemepausecet' data-time='" + working_clock + "'>" + "Time: " + converttime(working_clock) + " - pause for " + converttime(temp_peak) + "</div>");
			//}


			//real delivery
			/*
			var look_l1 = Math.exp(-lambda[1] ); 
			var look_l2 = Math.exp(-lambda[2] );
			var look_l3 = Math.exp(-lambda[3] );
			var look_l4 = Math.exp(-lambda[4] );
			var temp_result, temp_result_e;

			for (j=0; j<temp_peak; j++) {

				test_rate = 0;

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
				cpt_rates_real.push(0);
				cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
				cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
				//if (j%60 ==0) {console.log(j + "real rate " + test_rate*3600/10 + " real Cp " + result);}
				if (j%10==0) {
					myChart.data.datasets[2].data.push({x:(working_clock+j)/60, y:temp_result});
					myChart.data.datasets[3].data.push({x:(working_clock+j)/60, y:temp_result_e});
				}
			}
			myChart.data.datasets[2].hidden = false;
			myChart.data.datasets[3].hidden = false;
			myChart.update();
			document.getElementById("historywrapper").innerHTML = historytext;
			//you've got to deliver the real bolus at this point too
			bolusadmin(cet_bolus);
			historyarray.push([0,0]); //write 0,0 first as I don't know what to write
			deliver_cpt(desired, 1, 0);
			*/
		
		}
	}
}

function deliver_cet(x, active_drug_set_index) {
	//provides validation
	if (x>0) deliver_cet_real(x, active_drug_set_index);
}
function deliver_cet_real(x, ind) {
	drug_sets[ind].cet_active = 1;

	drug_sets[ind].desired = x;

	//fentanyl weight adjusted code
	if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
		drug_sets[ind].fentanyl_weightadjusted_target_uncorrected = drug_sets[ind].desired;
		drug_sets[ind].desired = drug_sets[ind].desired * 1/drug_sets[ind].fentanyl_weightadjusted_factor;
	}

	var working_clock = Math.floor(time_in_s);

	var temp_vol = 0;
	//backup current P state and E state s

	if (drug_sets[ind].cpt_cp.length>0) {
		p_state[1] = drug_sets[ind].cpt_cp[working_clock-1][0];
		p_state[2] = drug_sets[ind].cpt_cp[working_clock-1][1];
		p_state[3] = drug_sets[ind].cpt_cp[working_clock-1][2];

		e_state[1] = drug_sets[ind].cpt_ce[working_clock-1][0];
		e_state[2] = drug_sets[ind].cpt_ce[working_clock-1][1];
		e_state[3] = drug_sets[ind].cpt_ce[working_clock-1][2];
		e_state[4] = drug_sets[ind].cpt_ce[working_clock-1][3];
		// for VI calculation - truncate back to prev


		if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
			p_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			p_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			p_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			e_state[4] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
		}
		temp_vol = drug_sets[ind].volinf[working_clock-1];
		myChart.data.datasets[ind*2+2].data.length = myChart.data.datasets[ind*2+2].data.findIndex((element)=>element.x>time_in_s/60);
		myChart.data.datasets[ind*2+3].data.length = myChart.data.datasets[ind*2+3].data.findIndex((element)=>element.x>time_in_s/60);
	} else {
				myChart.data.datasets[ind*2+2].data.push({x:(working_clock)/60, y:0});
				myChart.data.datasets[ind*2+3].data.push({x:(working_clock)/60, y:0});

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

	var test_rate;
	var temp1, temp2, temp3, temp1e, temp2e, temp3e, temp4e;
	var firstrun = -1;
	var trial_rate; //future rate
	var trial_cp; //future CP
	var est_cp; //last available CP
	var est_ce; //last available CE
	var cet_pause =0; //if Ce goes down, needs a pause
	var cpt_pause =0; //CPT pause is less than CET pause
	var breakpoint =0; //this determines the time of restarting infusion
	var remaining=0;

	next_time = 0;

	//process history to storage
	processhistory();

	//pop the arrays
	drug_sets[ind].cpt_rates.length = 0;
	drug_sets[ind].cpt_times.length = 0;
	drug_sets[ind].historyarray.length = 0;
	//set the real rates delivery array to current length in time_in_s
	drug_sets[ind].cpt_rates_real.length = working_clock;
	drug_sets[ind].cpt_cp.length = working_clock;
	drug_sets[ind].cpt_ce.length = working_clock;
	drug_sets[ind].volinf.length = working_clock;

	//debug: log current state
	console.log("--debug-- CET delivery");
	console.log("time is " + working_clock);
	console.log("pstate1 - " + p_state2[1]);
	console.log("pstate2 - " + p_state2[2]);
	console.log("pstate3 - " + p_state2[3]);
	console.log("estate1 - " + e_state2[1]);
	console.log("estate2 - " + e_state2[2]);
	console.log("estate3 - " + e_state2[3]);
	console.log("estate4 - " + e_state2[4]);
	console.log("infratemls - " + drug_sets[ind].inf_rate_mls);

	if (drug_sets[ind].running == 1) {
		test_rate = drug_sets[ind].cpt_rates_real[working_clock-1];
		console.log("cpt_rates_real retrieved to be" + test_rate*3600/10);
	}

	if (p_state[1] == 0) {
		drug_sets[ind].prior_peak_time = drug_sets[ind].peak_time;
		drug_sets[ind].cet_bolus = drug_sets[ind].desired / drug_sets[ind].e_udf[drug_sets[ind].peak_time];
	}

	temp_peak = drug_sets[ind].prior_peak_time;
	var min_dif = drug_sets[ind].desired *0.0001;

	console.log("###");
	console.log(drug_sets[ind].cpt_rates_real.length);
	console.log(temp_peak);

	//first check if previous cet_lockdowntime is active , write CP and CE until CETpeak 
	if ((drug_sets[ind].cet_lockdowntime>working_clock) && (drug_sets[ind].desired<=drug_sets[ind].cet_priordesired)) {
		remaining = drug_sets[ind].cet_lockdowntime-working_clock;
		for (i=0; i<remaining; i++) {
			p_state3[1] = p_state3[1] * Math.exp(-drug_sets[ind].lambda[1]);
			p_state3[2] = p_state3[2] * Math.exp(-drug_sets[ind].lambda[2]);
			p_state3[3] = p_state3[3] * Math.exp(-drug_sets[ind].lambda[3]);
			e_state3[1] = e_state3[1] * Math.exp(-drug_sets[ind].lambda[1]);
			e_state3[2] = e_state3[2] * Math.exp(-drug_sets[ind].lambda[2]);
			e_state3[3] = e_state3[3] * Math.exp(-drug_sets[ind].lambda[3]);
			e_state3[4] = e_state3[4] * Math.exp(-drug_sets[ind].lambda[4]);

			drug_sets[ind].cpt_rates_real.push(0);
			drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
			drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
			drug_sets[ind].volinf.push(temp_vol);

			if (i%10==0) {
				myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:p_state3[1]+p_state3[2]+p_state3[3]});
				myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:e_state3[1]+e_state3[2]+e_state3[3]+e_state3[4]});
			}
		}

		working_clock = drug_sets[ind].cet_lockdowntime;
		//update e_state2		
		p_state2[1] = p_state3[1];
		p_state2[2] = p_state3[2];
		p_state2[3] = p_state3[3];

		e_state2[1] = e_state3[1];
		e_state2[2] = e_state3[2];
		e_state2[3] = e_state3[3];
		e_state2[4] = e_state3[4];

		console.log("cetlockdown active, paused for "+ remaining);
		drug_sets[ind].cet_bolus = 0; //this is to clear the cet_bolus so that bug will not appear for update()
	}

	/* t6 additions, to make CET in this algorithm analogous to stanpump lines 2002-*/
	temp1e = e_state2[1] ;
	temp2e = e_state2[2] ;
	temp3e = e_state2[3] ;
	temp4e = e_state2[4] ;

	est_ce = e_state2[1]+e_state2[2]+e_state2[3]+e_state2[4];
	est_cp = p_state2[1]+p_state2[2]+p_state2[3];

	//if CET gets very close to desired, it is better to target CPT (STANPUMP 1952)
	if ((Math.abs(drug_sets[ind].desired - est_ce) < drug_sets[ind].desired * 0.05) && (Math.abs(est_ce-est_cp) < est_ce * 0.1) && (working_clock>drug_sets[ind].cet_lockdowntime)) {
		console.log("CET gets too close to Desired; escaped; to CPT -----");
		if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
			drug_sets[ind].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";
		} else {
			drug_sets[ind].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + conc_units + "/ml): " + drug_sets[ind].desired + "</div>";
		}
		
		next_time = working_clock ; 
		if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
			drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);
			deliver_cpt(drug_sets[ind].desired,1,0,ind,1); // continuation flag for fen-wt, CP approximating CE, because p_ and e_states will need upscaling correction
		} else {
			drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].desired]);
			deliver_cpt(drug_sets[ind].desired,1,0,ind,0); 
		}
		
		
	} else { //normal CET mode 
		//set compensation to zero
		compensation = 0;
		/* should the pump be off? until after this drops below Ce*/
		if (est_ce >= drug_sets[ind].desired) {
			/*
			while (est_ce >= drug_sets[ind].desired) {
				p_state2[1] = p_state2[1] * Math.exp(-drug_sets[ind].lambda[1]) ;
				p_state2[2] = p_state2[2] * Math.exp(-drug_sets[ind].lambda[2]) ;
				p_state2[3] = p_state2[3] * Math.exp(-drug_sets[ind].lambda[3]) ;
				e_state2[1] = e_state2[1] * Math.exp(-drug_sets[ind].lambda[1]);
				e_state2[2] = e_state2[2] * Math.exp(-drug_sets[ind].lambda[2]);
				e_state2[3] = e_state2[3] * Math.exp(-drug_sets[ind].lambda[3]);
				e_state2[4] = e_state2[4] * Math.exp(-drug_sets[ind].lambda[4]);

				//temp1e=e_state2[1];
				//temp2e=e_state2[2];
				//temp3e=e_state2[3];
				//temp4e=e_state2[4];
				est_cp = p_state2[1] + p_state2[2] + p_state2[3];
				est_ce = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];

				if (est_cp >= drug_sets[ind].desired) {
					cpt_pause = cpt_pause +1;
				}
				cet_pause = cet_pause +1;
				console.log("est_cp = " + est_cp + ", ----- cpt_pause = " + cpt_pause);
				console.log("est_ce = " + est_ce + ", ----- cet_pause = " + cet_pause);
			}
			*/

			//new find breakpoint code
			//we want cp and ce to drop below desired

			while (est_cp>=drug_sets[ind].desired) {
				cpt_pause = cpt_pause + 1;
				est_cp = virtual_model(p_state2[1],p_state2[2],p_state2[3],0,cpt_pause,0,ind);
			}
			console.log("cpt_pause" + cpt_pause);
			est_ce = virtual_model(e_state2[1],e_state2[2],e_state2[3],e_state2[4],cpt_pause,1,ind);
			cet_pause = cpt_pause;
			while (est_ce>=drug_sets[ind].desired) {
				cet_pause = cet_pause+1;
				est_ce = virtual_model(e_state2[1],e_state2[2],e_state2[3],e_state2[4],cet_pause,1,ind);
			}
			console.log("cet_pause" + cet_pause);
			//optimize breakpoint - if cet_pause is long, allow later start of deliverCPT
			//new formula, see wikipedia - sigmoid curve - use that formula - normalize the curve, center on 300, x axis varies from -6 to +6
			sigmoidx = (cet_pause - 300)/50;
			sigmoid = 1/(1+Math.exp(-sigmoidx));
			sigmoidcorrfactor = 0.5 * sigmoid + 0.3; //this will make sure the corrfactor min = 0.3, max = 0.8
			breakpoint = Math.floor((cet_pause - cpt_pause)*sigmoidcorrfactor + cpt_pause);
			
			console.log("entering breakpoint -- " + breakpoint);
			for (i=0; i<breakpoint; i++) {

				p_state3[1] = p_state3[1] * Math.exp(-drug_sets[ind].lambda[1]);
				p_state3[2] = p_state3[2] * Math.exp(-drug_sets[ind].lambda[2]);
				p_state3[3] = p_state3[3] * Math.exp(-drug_sets[ind].lambda[3]);
				e_state3[1] = e_state3[1] * Math.exp(-drug_sets[ind].lambda[1]);
				e_state3[2] = e_state3[2] * Math.exp(-drug_sets[ind].lambda[2]);
				e_state3[3] = e_state3[3] * Math.exp(-drug_sets[ind].lambda[3]);
				e_state3[4] = e_state3[4] * Math.exp(-drug_sets[ind].lambda[4]);

				drug_sets[ind].cpt_rates_real.push(0);
				drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
				drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
				drug_sets[ind].volinf.push(temp_vol);

				if (i%10==0) {
					myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:p_state3[1]+p_state3[2]+p_state3[3]});
					myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:e_state3[1]+e_state3[2]+e_state3[3]+e_state3[4]});
				}


			}

			est_cp = p_state3[1] + p_state3[2] + p_state3[3];
			var compensation = (drug_sets[ind].desired*1.01 - est_cp)/drug_sets[ind].p_udf[1];

			console.log("compensation, over 1secs, " + compensation);

			//myChart.data.datasets[2].hidden = false;
			//myChart.data.datasets[3].hidden = false;
			myChart.update();

			
			if (remaining>0) {
				if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
					drug_sets[ind].historytext = "<div class='schemecet' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Ce target (" + conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";
				} else {
					drug_sets[ind].historytext = "<div class='schemecet' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Ce target (" + conc_units + "/ml): " + drug_sets[ind].desired + "</div>";
				}
				drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemepause' data-time='" + Math.floor(time_in_s) + "'>" + "<div class='timespan'>" + converttime(Math.floor(time_in_s)) + "</div>Paused for " + converttime(remaining+breakpoint) + "</div>");
				drug_sets[ind].historyarray.push([Math.floor(time_in_s),0]); 
				if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
					drug_sets[ind].historyarrays.push([2,0,Math.floor(time_in_s),drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);
				} else {
					drug_sets[ind].historyarrays.push([2,0,Math.floor(time_in_s),drug_sets[ind].desired]);
				}
				drug_sets[ind].historyarrays.push([2,3,Math.floor(time_in_s),remaining+breakpoint]);
			} else {
				if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
					drug_sets[ind].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";	
				} else {
					drug_sets[ind].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].desired + "</div>";	
				}
				drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemepause' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Paused for " + converttime(breakpoint) + "</div>");
				//this line is necessary for scheme display
				drug_sets[ind].historyarray.push([Math.floor(working_clock),0]); 
				if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
					drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);
				} else {
					drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].desired]);
				}
				drug_sets[ind].historyarrays.push([2,3,working_clock,breakpoint]);
			}
			
			next_time = working_clock + breakpoint;
			deliver_cpt(drug_sets[ind].desired,1,compensation,ind);
			drug_sets[ind].cet_bolus = 0; //to avoid bug
		} else {	//for est CE not higher than desired
			/* Initial settings */

			//if (temp_peak <= delta_seconds) temp_peak = delta_seconds + 1;
			console.log(drug_sets[ind].desired);
			console.log(temp1e);
			console.log(temp2e);
			console.log(temp3e);
			console.log(temp4e);
			console.log(temp_peak);
			console.log(drug_sets[ind].e_udf[temp_peak]);
			trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind)) / drug_sets[ind].e_udf[temp_peak];
			console.log(trial_rate);
			temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
			console.log(temp_peak);
			current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind) + drug_sets[ind].e_udf[temp_peak] * trial_rate;
			console.log(current);

			/* Iterate until solution is found [ln 2009] */
			while (Math.abs(current - drug_sets[ind].desired) > min_dif)
				{
				trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind)) / drug_sets[ind].e_udf[temp_peak];
				temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
				current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind) + drug_sets[ind].e_udf[temp_peak] * trial_rate;
				}
			drug_sets[ind].prior_peak_time = temp_peak;
			next_time = working_clock + temp_peak;

			if (drug_sets[ind].cpt_rates_real.length > 0) {
				drug_sets[ind].cet_bolus = trial_rate;
			}
			if (mass>15)  {
				drug_sets[ind].cet_bolus = Math.ceil(drug_sets[ind].cet_bolus/5)*5
			} else {
				drug_sets[ind].cet_bolus = Math.ceil(drug_sets[ind].cet_bolus)
			}; // round up to the next 5mg bolus if bw big 

			//console.log(temp1e + " " + temp2e + " " + temp3e + " " + temp4e);
			//console.log("debug cet, virtualmodel = " + virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind));
			//console.log("debug cet, trialrate= " + trial_rate);
			//console.log("debug cet, cet_bolus= " + drug_sets[ind].cet_bolus);
			//console.log("debug cet, temp_peak= " + temp_peak);
			//console.log("debug cet, current= " + current);

			scheme_bolusadmin(drug_sets[ind].cet_bolus,ind);
			bolusadmin(drug_sets[ind].cet_bolus,ind);

			if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
				drug_sets[ind].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";
			} else {
				drug_sets[ind].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].desired + "</div>";
			}
			if (drug_sets[ind].cet_bolus > 0) {
				drug_sets[ind].cet_lockdowntime = working_clock + temp_peak -1;
				drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeboluscet' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Bolus: " + drug_sets[ind].cet_bolus + drug_sets[ind].infused_units + "</div>");
				drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemepausecet' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Paused for " + converttime(temp_peak) + "</div>");
				if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
					drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);	
				} else {
					drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].desired]);	
				}
				
				drug_sets[ind].historyarrays.push([2,1,working_clock,drug_sets[ind].cet_bolus]);
				drug_sets[ind].historyarrays.push([2,3,temp_peak]);
			}


			//real delivery
			var look_l1 = Math.exp(-drug_sets[ind].lambda[1] ); 
			var look_l2 = Math.exp(-drug_sets[ind].lambda[2] );
			var look_l3 = Math.exp(-drug_sets[ind].lambda[3] );
			var look_l4 = Math.exp(-drug_sets[ind].lambda[4] );
			var temp_result, temp_result_e;

			for (j=0; j<temp_peak; j++) {

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
				drug_sets[ind].cpt_rates_real.push(0);
				drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
				drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);

				//write to VI
				if ((j==0) && (drug_sets[ind].cet_bolus>0)) {
					temp_vol += drug_sets[ind].cet_bolus/drug_sets[ind].infusate_concentration;
					drug_sets[ind].volinf.push(temp_vol);
				} else {
					drug_sets[ind].volinf.push(temp_vol);
				}

				//if (j%60 ==0) {console.log(j + "real rate " + test_rate*3600/10 + " real Cp " + result);}
				if (j%10==0) {
					myChart.data.datasets[ind*2+2].data.push({x:(working_clock+j)/60, y:temp_result});
					myChart.data.datasets[ind*2+3].data.push({x:(working_clock+j)/60, y:temp_result_e});
				}
			}
			//try off the following lines to improve performance
			//myChart.data.datasets[ind*2+2].hidden = false;
			//myChart.data.datasets[ind*2+3].hidden = false;
			//myChart.update();
			document.getElementById("historywrapper").innerHTML = drug_sets[ind].historytext;
			//you've got to deliver the real bolus at this point too
			
			drug_sets[ind].cet_priordesired = drug_sets[ind].desired;
			//this line is necessary for scheme display
			drug_sets[ind].historyarray.push([working_clock,0]); //write 0,0 first as I don't know what to write
			
				deliver_cpt(drug_sets[ind].desired, 1, 0, ind);
			
		}
	}//end else of NORMAL CET algorithm
	if (parseloading == 0) savefile_data();
	
	if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
		
			apply_fentanyl_correction(ind);
		
	}
	if (parseloading == 0) ptol_generate_margins(ind,0.9,0.5);
	//ticker_active = 0;
	//document.getElementById('ticker').style.display='none';
}

function apply_fentanyl_correction(ind) {
	console.log("entering apply fentanyl correction function...");
	working_clock = Math.floor(time_in_s);
	for (counterfen=working_clock; counterfen<drug_sets[ind].cpt_rates_real.length; counterfen++) {
		drug_sets[ind].cpt_cp[counterfen][0] *= drug_sets[ind].fentanyl_weightadjusted_factor;
		drug_sets[ind].cpt_cp[counterfen][1] *= drug_sets[ind].fentanyl_weightadjusted_factor;
		drug_sets[ind].cpt_cp[counterfen][2] *= drug_sets[ind].fentanyl_weightadjusted_factor;
		drug_sets[ind].cpt_ce[counterfen][0] *= drug_sets[ind].fentanyl_weightadjusted_factor;
		drug_sets[ind].cpt_ce[counterfen][1] *= drug_sets[ind].fentanyl_weightadjusted_factor;
		drug_sets[ind].cpt_ce[counterfen][2] *= drug_sets[ind].fentanyl_weightadjusted_factor;
		drug_sets[ind].cpt_ce[counterfen][3] *= drug_sets[ind].fentanyl_weightadjusted_factor;
		//myChart.data.datasets[2].data[counterfen].y = cpt_cp[counterfen][0] + cpt_cp[counterfen][1] + cpt_cp[counterfen][2];
		//myChart.data.datasets[3].data[counterfen].y = cpt_ce[counterfen][0] + cpt_ce[counterfen][1] + cpt_ce[counterfen][2] + cpt_ce[counterfen][3];
	}
	//find beginning of elem of chart of working clock
	chartBeginIndex = myChart.data.datasets[ind*2+2].data.findIndex((element)=>element.x>=working_clock/60) ;

	for (counterfen=chartBeginIndex; counterfen<myChart.data.datasets[ind*2+2].data.length; counterfen++) {
		myChart.data.datasets[ind*2+2].data[counterfen].y = getcp(Math.floor(myChart.data.datasets[ind*2+2].data[counterfen].x * 60),ind);
		myChart.data.datasets[ind*2+3].data[counterfen].y = getce(Math.floor(myChart.data.datasets[ind*2+2].data[counterfen].x * 60),ind);
		//myChart.data.datasets[ind*2+2].data[counterfen].y *= drug_sets[ind].fentanyl_weightadjusted_factor;
		//myChart.data.datasets[ind*2+3].data[counterfen].y *= drug_sets[ind].fentanyl_weightadjusted_factor;;
	}
	myChart.update();
}

function deliver_cet_alt(x) {
	drug_sets[active_drug_set_index].cet_active = 1;
	drug_sets[active_drug_set_index].desired = x;
	desired = x;

	//fentanyl weight adjusted code
	if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
		drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected = drug_sets[active_drug_set_index].desired;
		drug_sets[active_drug_set_index].desired = drug_sets[active_drug_set_index].desired * 1/drug_sets[active_drug_set_index].fentanyl_weightadjusted_factor;
	}

	var working_clock = Math.floor(time_in_s);

	var temp_vol = 0;
	//backup current P state and E state s

	if (drug_sets[active_drug_set_index].cpt_cp.length>0) {
		p_state[1] = drug_sets[active_drug_set_index].cpt_cp[working_clock-1][0];
		p_state[2] = drug_sets[active_drug_set_index].cpt_cp[working_clock-1][1];
		p_state[3] = drug_sets[active_drug_set_index].cpt_cp[working_clock-1][2];

		e_state[1] = drug_sets[active_drug_set_index].cpt_ce[working_clock-1][0];
		e_state[2] = drug_sets[active_drug_set_index].cpt_ce[working_clock-1][1];
		e_state[3] = drug_sets[active_drug_set_index].cpt_ce[working_clock-1][2];
		e_state[4] = drug_sets[active_drug_set_index].cpt_ce[working_clock-1][3];
		// for VI calculation - truncate back to prev


		if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag==1) {
			p_state[1] *= 1/drug_sets[active_drug_set_index].fentanyl_weightadjusted_factor;
			p_state[2] *= 1/drug_sets[active_drug_set_index].fentanyl_weightadjusted_factor;
			p_state[3] *= 1/drug_sets[active_drug_set_index].fentanyl_weightadjusted_factor;
			e_state[1] *= 1/drug_sets[active_drug_set_index].fentanyl_weightadjusted_factor;
			e_state[2] *= 1/drug_sets[active_drug_set_index].fentanyl_weightadjusted_factor;
			e_state[3] *= 1/drug_sets[active_drug_set_index].fentanyl_weightadjusted_factor;
			e_state[4] *= 1/drug_sets[active_drug_set_index].fentanyl_weightadjusted_factor;
		}

		temp_vol = drug_sets[active_drug_set_index].volinf[working_clock-1];
		myChart.data.datasets[active_drug_set_index*2+2].data.length = myChart.data.datasets[active_drug_set_index*2+2].data.findIndex((element)=>element.x>time_in_s/60);
		myChart.data.datasets[active_drug_set_index*2+3].data.length = myChart.data.datasets[active_drug_set_index*2+3].data.findIndex((element)=>element.x>time_in_s/60);
	} else {
				myChart.data.datasets[active_drug_set_index*2+2].data.push({x:(working_clock)/60, y:0});
				myChart.data.datasets[active_drug_set_index*2+3].data.push({x:(working_clock)/60, y:0});		
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

	var test_rate;
	var temp1, temp2, temp3, temp1e, temp2e, temp3e, temp4e;
	var firstrun = -1;
	var trial_rate; //future rate
	var trial_cp; //future CP
	var est_cp; //last available CP
	var est_ce; //last available CE
	var cet_pause =0; //if Ce goes down, needs a pause
	var cpt_pause =0; //CPT pause is less than CET pause
	var breakpoint =0; //this determines the time of restarting infusion
	var remaining=0;

	next_time = 0;

	//process history to storage
	processhistory();

	//pop the arrays
	drug_sets[active_drug_set_index].cpt_rates.length = 0;
	drug_sets[active_drug_set_index].cpt_times.length = 0;
	drug_sets[active_drug_set_index].historyarray.length = 0;
	//set the real rates delivery array to current length in time_in_s
	drug_sets[active_drug_set_index].cpt_rates_real.length = working_clock;
	drug_sets[active_drug_set_index].cpt_cp.length = working_clock;
	drug_sets[active_drug_set_index].cpt_ce.length = working_clock;
	drug_sets[active_drug_set_index].volinf.length = working_clock;




	//debug: log current state
	console.log("--debug-- CET delivery");
	console.log("time is " + working_clock);
	console.log("pstate1 - " + p_state2[1]);
	console.log("pstate2 - " + p_state2[2]);
	console.log("pstate3 - " + p_state2[3]);
	console.log("estate1 - " + e_state2[1]);
	console.log("estate2 - " + e_state2[2]);
	console.log("estate3 - " + e_state2[3]);
	console.log("estate4 - " + e_state2[4]);
	console.log("infratemls - " + drug_sets[active_drug_set_index].inf_rate_mls);

	if (drug_sets[active_drug_set_index].running == 1) {
		test_rate = drug_sets[active_drug_set_index].cpt_rates_real[working_clock-1];
		console.log("cpt_rates_real retrieved to be" + test_rate*3600/10);
	}

	if (p_state[1] == 0) {
		drug_sets[active_drug_set_index].prior_peak_time = drug_sets[active_drug_set_index].peak_time;
		drug_sets[active_drug_set_index].cet_bolus = drug_sets[active_drug_set_index].desired / drug_sets[active_drug_set_index].e_udf[drug_sets[active_drug_set_index].peak_time];
	}

	temp_peak = drug_sets[active_drug_set_index].prior_peak_time;
	var min_dif = drug_sets[active_drug_set_index].desired *0.0001;

	console.log("###");
	console.log(drug_sets[active_drug_set_index].cpt_rates_real.length);
	console.log(temp_peak);

	//first check if previous cet_lockdowntime is active , write CP and CE until CETpeak 
	if ((drug_sets[active_drug_set_index].cet_lockdowntime>working_clock) && (drug_sets[active_drug_set_index].desired<=drug_sets[active_drug_set_index].cet_priordesired)) {
		remaining = drug_sets[active_drug_set_index].cet_lockdowntime-working_clock;
		for (i=0; i<remaining; i++) {
			p_state3[1] = p_state3[1] * Math.exp(-drug_sets[active_drug_set_index].lambda[1]);
			p_state3[2] = p_state3[2] * Math.exp(-drug_sets[active_drug_set_index].lambda[2]);
			p_state3[3] = p_state3[3] * Math.exp(-drug_sets[active_drug_set_index].lambda[3]);
			e_state3[1] = e_state3[1] * Math.exp(-drug_sets[active_drug_set_index].lambda[1]);
			e_state3[2] = e_state3[2] * Math.exp(-drug_sets[active_drug_set_index].lambda[2]);
			e_state3[3] = e_state3[3] * Math.exp(-drug_sets[active_drug_set_index].lambda[3]);
			e_state3[4] = e_state3[4] * Math.exp(-drug_sets[active_drug_set_index].lambda[4]);

			drug_sets[active_drug_set_index].cpt_rates_real.push(0);
			drug_sets[active_drug_set_index].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
			drug_sets[active_drug_set_index].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
			drug_sets[active_drug_set_index].volinf.push(temp_vol);

			if (i%10==0) {
				myChart.data.datasets[active_drug_set_index*2+2].data.push({x:(working_clock+i)/60, y:p_state3[1]+p_state3[2]+p_state3[3]});
				myChart.data.datasets[active_drug_set_index*2+3].data.push({x:(working_clock+i)/60, y:e_state3[1]+e_state3[2]+e_state3[3]+e_state3[4]});
			}
		}



		working_clock = drug_sets[active_drug_set_index].cet_lockdowntime;
		//update e_state2		
		p_state2[1] = p_state3[1];
		p_state2[2] = p_state3[2];
		p_state2[3] = p_state3[3];

		e_state2[1] = e_state3[1];
		e_state2[2] = e_state3[2];
		e_state2[3] = e_state3[3];
		e_state2[4] = e_state3[4];

		console.log("cetlockdown active, paused for "+ remaining);
		drug_sets[active_drug_set_index].cet_bolus = 0; //this is to clear the cet_bolus so that bug will not appear for update()
	}

	/* t6 additions, to make CET in this algorithm analogous to stanpump lines 2002-*/
	temp1e = e_state2[1];
	temp2e = e_state2[2];
	temp3e = e_state2[3];
	temp4e = e_state2[4];

	est_ce = e_state2[1]+e_state2[2]+e_state2[3]+e_state2[4];
	est_cp = p_state2[1]+p_state2[2]+p_state2[3];

	//if CET gets very close to desired, it is better to target CPT (STANPUMP 1952)
	//let's omit this part for CET IB mode


	//if ((Math.abs(desired - est_ce) < desired * 0.05) && (Math.abs(est_ce-est_cp) < est_ce * 0.1) && (working_clock>cet_lockdowntime)) {
	//	console.log("CET gets too close to Desired; escaped; to CPT -----");
	//	historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + conc_units + "/ml): " + desired + "</div>";
	//	next_time = working_clock ; 
	//	historyarrays.push([2,0,working_clock,desired]);
	//	bolusconversion();
	//	//deliver_cpt(desired,1,0);
	//} else { //normal CET mode 

		/* should the pump be off? until after this drops below Ce*/
		if (est_ce >= drug_sets[active_drug_set_index].desired) {
			while (est_ce >= drug_sets[active_drug_set_index].desired) {
				p_state2[1] = p_state2[1] * Math.exp(-drug_sets[active_drug_set_index].lambda[1]) ;
				p_state2[2] = p_state2[2] * Math.exp(-drug_sets[active_drug_set_index].lambda[2]) ;
				p_state2[3] = p_state2[3] * Math.exp(-drug_sets[active_drug_set_index].lambda[3]) ;
				e_state2[1] = e_state2[1] * Math.exp(-drug_sets[active_drug_set_index].lambda[1]);
				e_state2[2] = e_state2[2] * Math.exp(-drug_sets[active_drug_set_index].lambda[2]);
				e_state2[3] = e_state2[3] * Math.exp(-drug_sets[active_drug_set_index].lambda[3]);
				e_state2[4] = e_state2[4] * Math.exp(-drug_sets[active_drug_set_index].lambda[4]);

				//temp1e=e_state2[1];
				//temp2e=e_state2[2];
				//temp3e=e_state2[3];
				//temp4e=e_state2[4];
				est_cp = p_state2[1] + p_state2[2] +p_state2[3];
				est_ce = e_state2[1] +e_state2[2]+e_state2[3]+e_state2[4];

				if (est_cp >= drug_sets[active_drug_set_index].desired) {
					cpt_pause = cpt_pause +1;
				}
				cet_pause = cet_pause +1;
				console.log("est_cp = " + est_cp + ", ----- cpt_pause = " + cpt_pause);
				console.log("est_ce = " + est_ce + ", ----- cet_pause = " + cet_pause);
			}

			//breakpoint = Math.floor((cet_pause - cpt_pause)*0.2 + cpt_pause);
			breakpoint=cet_pause;
			console.log("entering breakpoint -- " + breakpoint);
			for (i=0; i<breakpoint; i++) {

				p_state3[1] = p_state3[1] * Math.exp(-drug_sets[active_drug_set_index].lambda[1]);
				p_state3[2] = p_state3[2] * Math.exp(-drug_sets[active_drug_set_index].lambda[2]);
				p_state3[3] = p_state3[3] * Math.exp(-drug_sets[active_drug_set_index].lambda[3]);
				e_state3[1] = e_state3[1] * Math.exp(-drug_sets[active_drug_set_index].lambda[1]);
				e_state3[2] = e_state3[2] * Math.exp(-drug_sets[active_drug_set_index].lambda[2]);
				e_state3[3] = e_state3[3] * Math.exp(-drug_sets[active_drug_set_index].lambda[3]);
				e_state3[4] = e_state3[4] * Math.exp(-drug_sets[active_drug_set_index].lambda[4]);

				drug_sets[active_drug_set_index].cpt_rates_real.push(0);
				drug_sets[active_drug_set_index].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
				drug_sets[active_drug_set_index].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
				drug_sets[active_drug_set_index].volinf.push(temp_vol);

				if (i%10==0) {
					myChart.data.datasets[active_drug_set_index*2+2].data.push({x:(working_clock+i)/60, y:p_state3[1]+p_state3[2]+p_state3[3]});
					myChart.data.datasets[active_drug_set_index*2+3].data.push({x:(working_clock+i)/60, y:e_state3[1]+e_state3[2]+e_state3[3]+e_state3[4]});
				}


			}


			//est_cp = p_state3[1] + p_state3[2] + p_state3[3];
			//var compensation = (desired*1.01 - est_cp)/p_udf[1];

			//console.log("compensation, over 1secs, " + compensation);

			//myChart.data.datasets[active_drug_set_index*2+2].hidden = false;
			//myChart.data.datasets[active_drug_set_index*2+3].hidden = false;
			//myChart.update();

			if (remaining>0) {
				if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
					drug_sets[active_drug_set_index].historytext = "<div class='schemecet' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Ce target (" + drug_sets[active_drug_set_index].conc_units + "/ml): " + drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected + "</div>";
				} else {
					drug_sets[active_drug_set_index].historytext = "<div class='schemecet' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Ce target (" + drug_sets[active_drug_set_index].conc_units + "/ml): " + drug_sets[active_drug_set_index].desired + "</div>";
				}
				drug_sets[active_drug_set_index].historytext = drug_sets[active_drug_set_index].historytext.concat("<div class='schemepause' data-time='" + Math.floor(time_in_s) + "'>" + "<div class='timespan'>" + converttime(Math.floor(time_in_s)) + "</div>Paused for " + converttime(remaining+breakpoint) + "</div>");
				drug_sets[active_drug_set_index].historyarray.push([Math.floor(time_in_s),0]); 
				if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
					drug_sets[active_drug_set_index].historyarrays.push([2,0,Math.floor(time_in_s),drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected,1,drug_sets[active_drug_set_index].IB_swing]);
				} else {
					drug_sets[active_drug_set_index].historyarrays.push([2,0,Math.floor(time_in_s),drug_sets[active_drug_set_index].desired,1,drug_sets[active_drug_set_index].IB_swing]);
				}
				drug_sets[active_drug_set_index].historyarrays.push([2,3,Math.floor(time_in_s),remaining+breakpoint]);
			} else {
				if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
					drug_sets[active_drug_set_index].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[active_drug_set_index].conc_units + "/ml): " + drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected + "</div>";
				} else {
					
					drug_sets[active_drug_set_index].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[active_drug_set_index].conc_units + "/ml): " + drug_sets[active_drug_set_index].desired + "</div>";
				}

				drug_sets[active_drug_set_index].historytext = drug_sets[active_drug_set_index].historytext.concat("<div class='schemepause' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Paused for " + converttime(breakpoint) + "</div>");
				drug_sets[active_drug_set_index].historyarray.push([Math.floor(working_clock),0]); 
				if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
					drug_sets[active_drug_set_index].historyarrays.push([2,0,working_clock,drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected,1,drug_sets[active_drug_set_index].IB_swing]);
				} else {
					drug_sets[active_drug_set_index].historyarrays.push([2,0,working_clock,drug_sets[active_drug_set_index].desired,1,drug_sets[active_drug_set_index].IB_swing]);
				}
				drug_sets[active_drug_set_index].historyarrays.push([2,3,working_clock,breakpoint]);
			}
			next_time = working_clock + breakpoint;
			var look_l1 = Math.exp(-drug_sets[active_drug_set_index].lambda[1] ); 
			var look_l2 = Math.exp(-drug_sets[active_drug_set_index].lambda[2] );
			var look_l3 = Math.exp(-drug_sets[active_drug_set_index].lambda[3] );
			var look_l4 = Math.exp(-drug_sets[active_drug_set_index].lambda[4] );
			drug_sets[active_drug_set_index].cet_bolus = 0; //to avoid bug
			bolusconversion(next_time);
			document.getElementById("historywrapper").innerHTML = drug_sets[active_drug_set_index].historytext;
			
		} else {	//for est CE not higher than desired
			/* Initial settings */

			//if (temp_peak <= delta_seconds) temp_peak = delta_seconds + 1;
			trial_rate = (drug_sets[active_drug_set_index].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index)) / drug_sets[active_drug_set_index].e_udf[temp_peak];
			temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, active_drug_set_index);
			current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index) + drug_sets[active_drug_set_index].e_udf[temp_peak] * trial_rate;

			/* Iterate until solution is found [ln 2009] */
			while (Math.abs(current - drug_sets[active_drug_set_index].desired) > min_dif)
				{
				trial_rate = (drug_sets[active_drug_set_index].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index)) / drug_sets[active_drug_set_index].e_udf[temp_peak];
				temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, active_drug_set_index);
				current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index) + drug_sets[active_drug_set_index].e_udf[temp_peak] * trial_rate;
				}
			drug_sets[active_drug_set_index].prior_peak_time = temp_peak;
			next_time = working_clock + temp_peak;

			if (drug_sets[active_drug_set_index].cpt_rates_real.length > 0) {
				drug_sets[active_drug_set_index].cet_bolus = trial_rate;
			}
			if (mass>15)  {
				drug_sets[active_drug_set_index].cet_bolus = Math.ceil(drug_sets[active_drug_set_index].cet_bolus/5)*5
			} else {
				drug_sets[active_drug_set_index].cet_bolus = Math.ceil(drug_sets[active_drug_set_index].cet_bolus)
			}; // round up to the next 5mg bolus if bw big 

			console.log(temp1e + " " + temp2e + " " + temp3e + " " + temp4e);
			console.log("debug cet, virtualmodel = " + virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index));
			console.log("debug cet, trialrate= " + trial_rate);
			console.log("debug cet, cet_bolus= " + drug_sets[active_drug_set_index].cet_bolus);
			console.log("debug cet, temp_peak= " + temp_peak);
			console.log("debug cet, current= " + current);

			scheme_bolusadmin(drug_sets[active_drug_set_index].cet_bolus, active_drug_set_index);
			bolusadmin(drug_sets[active_drug_set_index].cet_bolus, active_drug_set_index);

			if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
				drug_sets[active_drug_set_index].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[active_drug_set_index].conc_units + "/ml): " + drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected + "</div>";
			} else {
				drug_sets[active_drug_set_index].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[active_drug_set_index].conc_units + "/ml): " + drug_sets[active_drug_set_index].desired + "</div>";
			}

			if (drug_sets[active_drug_set_index].cet_bolus > 0) {
				drug_sets[active_drug_set_index].cet_lockdowntime = working_clock + temp_peak -1;
				drug_sets[active_drug_set_index].historytext = drug_sets[active_drug_set_index].historytext.concat("<div class='schemeboluscet' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Bolus: " + drug_sets[active_drug_set_index].cet_bolus + drug_sets[active_drug_set_index].infused_units + "</div>");
				//historytext = historytext.concat("<div class='schemepausecet' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Paused for " + converttime(temp_peak) + "</div>");
				//the above line is wrong for IB mode
				if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
					drug_sets[active_drug_set_index].historyarrays.push([2,0,working_clock,drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected,1,drug_sets[active_drug_set_index].IB_swing]);
				} else {
					drug_sets[active_drug_set_index].historyarrays.push([2,0,working_clock,drug_sets[active_drug_set_index].desired,1,drug_sets[active_drug_set_index].IB_swing]);
				}
				drug_sets[active_drug_set_index].historyarrays.push([2,1,working_clock,drug_sets[active_drug_set_index].cet_bolus]);
				
				//historyarrays.push([2,3,working_clock,temp_peak]);
				//the above line is wrong for IB mode
			}


			//real delivery
			var look_l1 = Math.exp(-drug_sets[active_drug_set_index].lambda[1] ); 
			var look_l2 = Math.exp(-drug_sets[active_drug_set_index].lambda[2] );
			var look_l3 = Math.exp(-drug_sets[active_drug_set_index].lambda[3] );
			var look_l4 = Math.exp(-drug_sets[active_drug_set_index].lambda[4] );
			var temp_result, temp_result_e;

			for (j=0; j<temp_peak; j++) {

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
				drug_sets[active_drug_set_index].cpt_rates_real.push(0);
				drug_sets[active_drug_set_index].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
				drug_sets[active_drug_set_index].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);

				//write to VI
				if ((j==0) && (drug_sets[active_drug_set_index].cet_bolus>0)) {
					temp_vol += drug_sets[active_drug_set_index].cet_bolus/drug_sets[active_drug_set_index].infusate_concentration;
					drug_sets[active_drug_set_index].volinf.push(temp_vol);
				} else {
					drug_sets[active_drug_set_index].volinf.push(temp_vol);
				}

				//if (j%60 ==0) {console.log(j + "real rate " + test_rate*3600/10 + " real Cp " + result);}
				if (j%10==0) {
					myChart.data.datasets[active_drug_set_index*2+2].data.push({x:(working_clock+j)/60, y:temp_result});
					myChart.data.datasets[active_drug_set_index*2+3].data.push({x:(working_clock+j)/60, y:temp_result_e});
				}
			}
			//myChart.data.datasets[active_drug_set_index*2+2].hidden = false;
			//myChart.data.datasets[active_drug_set_index*2+3].hidden = false;
			//myChart.update();
			
			//you've got to deliver the real bolus at this point too
			
			drug_sets[active_drug_set_index].cet_priordesired = drug_sets[active_drug_set_index].desired;
			drug_sets[active_drug_set_index].historyarray.push([working_clock,0,drug_sets[active_drug_set_index].cet_bolus]); //for IB, record the cet_bolus as well, to avoid v=0 historytext bug
			
			//deliver_cpt(desired, 1, 0);
			//old deliver CPT code is truncated

			bolusconversion(next_time);

			document.getElementById("historywrapper").innerHTML = drug_sets[active_drug_set_index].historytext;
	}//end else of NORMAL CET algorithm
	//}//end normal CET algorithm
	if (parseloading == 0) savefile_data();
	
	//ticker_active = 0;
	//document.getElementById('ticker').style.display='none';


	function bolusconversion(arg) {
			//new code inserted here
			var tempArray = new Array();
			next_cet = drug_sets[active_drug_set_index].desired * (1+drug_sets[active_drug_set_index].IB_swing);
			console.log("next_cet = " + next_cet);


			for (v=0; v<20; v++) {
				//test_rate = 0;
				if (v==0) {
					if (arg != undefined) {
						//for breakpoint use, arg will take in next_time

					} else {
						next_time = drug_sets[active_drug_set_index].prior_peak_time;
					}
				} else {
					next_time = trough_time;
				}
				min_dif = drug_sets[active_drug_set_index].desired *0.0001; 
				temp1e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][0] * Math.exp(-drug_sets[active_drug_set_index].lambda[1]) ;
				temp2e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][1] * Math.exp(-drug_sets[active_drug_set_index].lambda[2]) ;
				temp3e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][2] * Math.exp(-drug_sets[active_drug_set_index].lambda[3]) ;
				temp4e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][3] * Math.exp(-drug_sets[active_drug_set_index].lambda[4]) ;
				console.log(temp1e+temp2e+temp3e+temp4e);
						trial_rate = (next_cet - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index)) / drug_sets[active_drug_set_index].e_udf[temp_peak];
						temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, active_drug_set_index);
						current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index) + drug_sets[active_drug_set_index].e_udf[temp_peak] * trial_rate;

						while (Math.abs(current - next_cet) > min_dif)
							{
							trial_rate = (next_cet - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index)) / drug_sets[active_drug_set_index].e_udf[temp_peak];
							temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, active_drug_set_index);
							current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, active_drug_set_index) + drug_sets[active_drug_set_index].e_udf[temp_peak] * trial_rate;
							}

				next_cetbolus = Math.ceil(trial_rate);
				
				if ((next_cetbolus<5) && (v==0)) {
					next_cetbolus = 0;
				} 



				scheme_bolusadmin(next_cetbolus, active_drug_set_index);
				console.log(next_cetbolus + "entered into virtualstate at time " + next_time);

			//push to arrays
				drug_sets[active_drug_set_index].cpt_rates_real.push(next_cetbolus);
				drug_sets[active_drug_set_index].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
				drug_sets[active_drug_set_index].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
				temp_vol += next_cetbolus/drug_sets[active_drug_set_index].infusate_concentration;
				drug_sets[active_drug_set_index].volinf.push(temp_vol);
				trough_time = find_trough(drug_sets[active_drug_set_index].desired*(1-drug_sets[active_drug_set_index].IB_swing),next_time,temp_peak);

				for (j=0; j<trough_time-next_time-1; j++) {

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
					drug_sets[active_drug_set_index].cpt_rates_real.push(0);
					drug_sets[active_drug_set_index].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
					drug_sets[active_drug_set_index].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);

					//write to VI
					drug_sets[active_drug_set_index].volinf.push(temp_vol);
					working_clock = next_time;
					//if (j%60 ==0) {console.log(j + "real rate " + test_rate*3600/10 + " real Cp " + result);}
					if (j%10==0) {
						myChart.data.datasets[active_drug_set_index*2+2].data.push({x:(working_clock+j)/60, y:temp_result});
						myChart.data.datasets[active_drug_set_index*2+3].data.push({x:(working_clock+j)/60, y:temp_result_e});
					}
				} // end inner for loop to write CPCE till next trough time

				//the following is because the CET pause is now not temp_peak, but needs to consider the drop in CE to trough level before starting a new bolus. hence the duration of this so-called "cet pause" is to be written here.
				if ((v==0) && (drug_sets[active_drug_set_index].cet_bolus>0)) { //if cet_bolus = 0 it means desired is < CE (CET targeting downwards, then can skip the following lines)
					//correct versions of history arrays writing
					if (next_cetbolus==0) {
					drug_sets[active_drug_set_index].historytext = drug_sets[active_drug_set_index].historytext.concat("<div class='schemepausecet' data-time='" + drug_sets[active_drug_set_index].historyarray[0][0] + "'>" + "<div class='timespan'>" + converttime(drug_sets[active_drug_set_index].historyarray[0][0]) + "</div>Paused for " + converttime(trough_time-drug_sets[active_drug_set_index].historyarray[0][0]) + "</div>");
					drug_sets[active_drug_set_index].historyarrays.push([2,3,drug_sets[active_drug_set_index].historyarray[0][0],trough_time-drug_sets[active_drug_set_index].historyarray[0][0]]);
					} else if (next_cetbolus>0) {
					drug_sets[active_drug_set_index].historytext = drug_sets[active_drug_set_index].historytext.concat("<div class='schemepausecet' data-time='" + drug_sets[active_drug_set_index].historyarray[0][0] + "'>" + "<div class='timespan'>" + converttime(drug_sets[active_drug_set_index].historyarray[0][0]) + "</div>Paused for " + converttime(drug_sets[active_drug_set_index].prior_peak_time) + "</div>");
					drug_sets[active_drug_set_index].historyarrays.push([2,3,drug_sets[active_drug_set_index].historyarray[0][0],drug_sets[active_drug_set_index].prior_peak_time]);						
					}
				}

				if (next_cetbolus > 0) {
					//cet_lockdowntime = working_clock + temp_peak -1;
					tempArray.push([next_time,,next_cetbolus]);
					drug_sets[active_drug_set_index].historyarray.push([working_clock,0,next_cetbolus])
					drug_sets[active_drug_set_index].historytext = drug_sets[active_drug_set_index].historytext.concat("<div class='schemeboluscet' data-time='" + next_time + "'>" + "<div class='timespan'>" + converttime(next_time) + "</div>Bolus: " + next_cetbolus + drug_sets[active_drug_set_index].infused_units + "</div>");
					drug_sets[active_drug_set_index].historytext = drug_sets[active_drug_set_index].historytext.concat("<div class='schemepausecet' data-time='" + next_time + "'>" + "<div class='timespan'>" + converttime(next_time) + "</div>Paused for " + converttime(trough_time-next_time) + "</div>");
					//historyarrays.push([2,0,working_clock,desired]);
					//historyarrays.push([2,4,working_clock,temp_peak]);
				}


				//break for loop if takes longer than approx 120min
				if (next_time - drug_sets[active_drug_set_index].historyarray[0][0] > 7000) {break;}

			//console.log("debug: trough time is " + trough_time);
			//console.log("cptcp length is " + cpt_cp.length);
		}//end outer for loop for re-iterations of CETboluses
		drug_sets[active_drug_set_index].historyarrays.push([2,4,drug_sets[active_drug_set_index].historyarray[0][0],tempArray]);
		//myChart.update();
	}


	//UI changes
	if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag==1) {
		apply_fentanyl_correction(active_drug_set_index);
	} else {
		myChart.update();
	}
	if (parseloading == 0) ptol_generate_margins(active_drug_set_index,0.9,0.5);
	document.getElementById("warningdescriptor").innerHTML = "REMINDER - Next bolus in ";
	temp_interval1 = Math.round((drug_sets[active_drug_set_index].historyarray[3][0]-drug_sets[active_drug_set_index].historyarray[2][0])/60*10)/10;
	if (drug_sets[active_drug_set_index].historyarray.length>13) {
		temp_interval2_index = 13;
	} else {
		temp_interval2_index = drug_sets[active_drug_set_index].historyarray.length - 1;
	}
	temp_interval2 = Math.round((drug_sets[active_drug_set_index].historyarray[temp_interval2_index][0]-drug_sets[active_drug_set_index].historyarray[temp_interval2_index-1][0])/60*10)/10;
	document.getElementById("IB_interval" + active_drug_set_index).innerHTML = temp_interval1 + "-" + temp_interval2 + "min";
	document.getElementById("top_infrate").classList.add("bolus");

}

function find_peak(current_time, rate, temp1e, temp2e, temp3e, temp4e, ind) {
	var current, earlier, later;

	/* set up initial values */
	current = virtual_model(temp1e, temp2e, temp3e, temp4e, current_time, 1, ind) + drug_sets[ind].e_udf[current_time] * rate;
	earlier = virtual_model(temp1e, temp2e, temp3e, temp4e, current_time - 1, 1, ind) + drug_sets[ind].e_udf[current_time - 1] * rate;
	later = virtual_model(temp1e, temp2e, temp3e, temp4e, current_time + 1, 1, ind) + drug_sets[ind].e_udf[current_time + 1] * rate;

	while ((current < earlier) || (current < later))
		{
		if (current < earlier)
			{
			if (current_time == delta_seconds)
					{
					return current_time;
					}
			current_time--;
			later = current;
			current = earlier;
			earlier = virtual_model(temp1e, temp2e, temp3e, temp4e, 
				current_time, 1, ind) + drug_sets[ind].e_udf[current_time] * rate;
			}
		else
			{
			current_time++;
			earlier = current;
			current = later;
			later = virtual_model(temp1e, temp2e, temp3e, temp4e, 
				current_time + 1, 1, ind) + drug_sets[ind].e_udf[current_time + 1] * rate;
			}
		}
	return current_time;
}

function find_trough(temp_trough,temp_time,temp_peak) {
    temp1e = drug_sets[active_drug_set_index].cpt_ce[temp_time][0];
    temp2e = drug_sets[active_drug_set_index].cpt_ce[temp_time][1];
    temp3e = drug_sets[active_drug_set_index].cpt_ce[temp_time][2];
    temp4e = drug_sets[active_drug_set_index].cpt_ce[temp_time][3];
    value = temp1e+temp2e+temp3e+temp4e;
		console.log("entering find_trough; CE" + value+  "temp_time now is " + temp_time + "temp_peak is " + temp_peak);
		var i;
		for (i=temp_peak-10; i<=temp_peak+10*60; i++) {

		    test_trough = virtual_model(temp1e,temp2e,temp3e,temp4e,i,1,active_drug_set_index);
		    //console.log(test_trough);
		    //console.log(temp_time+i);
		    if (test_trough<temp_trough) {
		        console.log(">>found trough" + test_trough);
		        break;
		    }
		}
		return temp_time+i;
}

function scheme_bolusadmin(x, ind) {

	l1 = Math.exp(-drug_sets[ind].lambda[1]);
	l2 = Math.exp(-drug_sets[ind].lambda[2]);
	l3 = Math.exp(-drug_sets[ind].lambda[3]);
	l4 = Math.exp(-drug_sets[ind].lambda[4]);

	p_state3[1] = p_state3[1] * l1 + drug_sets[ind].p_coef[1] * x * (1 - l1);
	p_state3[2] = p_state3[2] * l2 + drug_sets[ind].p_coef[2] * x * (1 - l2);
	p_state3[3] = p_state3[3] * l3 + drug_sets[ind].p_coef[3] * x * (1 - l3);

	e_state3[1] = e_state3[1] * l1 + drug_sets[ind].e_coef[1] * x * (1 - l1);
	e_state3[2] = e_state3[2] * l2 + drug_sets[ind].e_coef[2] * x * (1 - l2);
	e_state3[3] = e_state3[3] * l3 + drug_sets[ind].e_coef[3] * x * (1 - l3);
	e_state3[4] = e_state3[4] * l4 + drug_sets[ind].e_coef[4] * x * (1 - l4);

	trial_result = p_state3[1]+ p_state3[2]+ p_state3[3];
	trial_result_e = e_state3[1]+ e_state3[2]+ e_state3[3]+ e_state3[4];
	//volume_infused += x/infusate_concentration;
	//historytext = historytext.concat("<br>" + "Time: " + time_in_s + "s - Bolus: " + x + "mg");
	//displayresult(result, result_e);
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
	lookahead(0,7200,ind);
	document.getElementById("iconplay").classList.add("stop");
	document.getElementById("iconplay").innerHTML="<i class='fas fa-pause fa-lg'></i>";
	document.getElementById("status").innerHTML="Paused";
}
function pauseCpt(ind) {
	drug_sets[ind].desired = 0;
	document.getElementById("inputDesired" + ind).value = "0";
	document.getElementById("inputDesiredCe" + ind).value = "0";
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

	for (j=0; j<7200; j++) {

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
		if ((j>=1800) && (j%60==0)) {
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
		if (complex_mode == 1) ptol_generate_margins(ind,0.9,0.5);
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

/*
			if (time_in_s<cet_lockdowntime) {
				if (cet_bolus>0) {
					document.getElementById("prompt_msg2").innerHTML = "Last bolus given: " + cet_bolus + infused_units + " at " + converttime(document.querySelector(".schemecet").getAttribute("data-time")*1);
				} else { //otherwise bug if desired CET goes down
					document.getElementById("prompt_msg2").innerHTML = "Current target: " + desired + conc_units + "/ml";
				}
			}
			document.getElementById("infusiondescriptor").innerHTML = "Infusion temporarily paused";	
		
*/
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


	//add ticker code here
	/*
	if (ticker_active == 1) {
		workingclock = Math.floor(time_in_s);
		if (workingclock < PP_next) {
			temp = Math.round(cpt_rates_real_chunks[PP_next/PP_interval][0]);
			PP_tickertime = PP_next - workingclock;
			document.getElementById("PP_time_display").innerHTML = converttime(PP_tickertime);
			document.getElementById("PP_bolus_display").innerHTML = temp;
			document.getElementById("PP_lastbolus_display").innerHTML = PP_temp_bolus_store;
			document.getElementById("PP_lasttime_display").innerHTML = converttime(PP_temp_bolustime_store);
			ratio = (PP_tickertime / (PP_next-PP_start))*100;
			document.getElementById("progressinside").style.width = ratio + "%";
		} else {
			counter = Math.ceil(workingclock / PP_interval);
			temp = Math.round(cpt_rates_real_chunks[counter][0]);
			document.getElementById("PP_lastbolus_display").innerHTML = Math.round(cpt_rates_real_chunks[counter-1][0]);
			document.getElementById("PP_lasttime_display").innerHTML = converttime(PP_interval * (counter-1));
			document.getElementById("PP_bolus_display").innerHTML = temp;
			PP_tickertime = PP_interval - (workingclock % PP_interval);
			document.getElementById("PP_time_display").innerHTML = converttime(PP_tickertime);
			ratio = (PP_tickertime / PP_interval)*100;
			document.getElementById("progressinside").style.width = ratio + "%";
		}
	}
	*/

	//copy historywrapper text to another wrapper for widescreen
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
				if (temp_time<60) { //1min near next infusion rate
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
				} else if (historydivs[j].getAttribute("data-time")*1<prior) { //past history
					historydivs[j].classList.add("past");
					historydivs[j].classList.remove("grey");
				} else {
					historydivs[j].classList.add("next");
					historydivs[j].classList.remove("grey");
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

var timeoutptol = null;
function ptol_generate_margins(ind,param1,param2) {
	//this is resource intensive
	//Need to breakup tasks into smaller parts
	//for CET mode, the delivercet can take >250ms. So ptol function need to be after that.
	console.log("ptol generate margins fired");
	clearTimeout(timeoutptol);
	if (complex_mode == 1) {
		//debounce

		timeoutptol = setTimeout(function(){
		if ((drug_sets[0].firstrun>-1) && (drug_sets[1].firstrun>-1)) {
			if (ind == 0) {
				BIS_charting();

				//ind 0 means the active set is propofol, but need data from CEremi to fill it up
				//but actually we need to update the alternative drug sets margins as well because now it's been changed
				setTimeout(function(){
					ptol_generate_data_r(param1,param2);
				},1000);
		
				//see if propofol effect margins have never been generated before
				if (myChart.data.datasets[6].data.length==1) {
					ptol_generate_data_p(param1,param2);
					if (PD_mode == 2) {
						myChart.data.datasets[6].hidden = false;
						myChart.data.datasets[7].hidden = false;
						myChart.data.datasets[8].hidden = true;
						myChart.data.datasets[9].hidden = true;
						myChart.data.datasets[10].hidden = true;
						myChart.data.datasets[11].hidden = true;
					} else if (PD_mode == 1) {
						myChart.data.datasets[6].hidden = true;
						myChart.data.datasets[7].hidden = true;
						myChart.data.datasets[8].hidden = true;
						myChart.data.datasets[9].hidden = true;
						myChart.data.datasets[10].hidden = false;
						myChart.data.datasets[11].hidden = false;
					}

				}

			} else {
				setTimeout(function(){
					ptol_generate_data_p(param1,param2);
				},1000);
				//see if opioid effect margins have never been generated before
				if (myChart.data.datasets[8].data.length==1) {
					ptol_generate_data_r(param1,param2);
					if (PD_mode == 2) {
						myChart.data.datasets[6].hidden = true;
						myChart.data.datasets[7].hidden = true;
						myChart.data.datasets[8].hidden = false;
						myChart.data.datasets[9].hidden = false;
						myChart.data.datasets[10].hidden = true;
						myChart.data.datasets[11].hidden = true;
					}
				}
			}
		}
			
			//call another timeout function to break up long task
			setTimeout(function(){
					ptol_generate_ptol_based_on_couples();
					myChart2.update();
				},250);
			setTimeout(function(){
				updatechart3(1);
				},500);
		},500);//end debounce
	} else { // end if complex mode, start simple mode
		if (drug_sets[0].model_name == "Eleveld") {
			if (isEffectEstimationOn.checked == true) {
				if (select_effect_measure.value == "bis") {
					BIS_charting();
					if (updateBIS == null) BIS_update(1000);
				}
			}
		}
	}
}

function ptol_calculate(clock) {
	//let 0 be propofol, 1 be remifentanil
	CeProp = getce(clock,0);
	if (CeProp == undefined) CeProp = 0;
	//convert fentanyl CE to remi CE using potency ratio, vuyk, P1561
	if (drug_sets[1].model_name == "Shafer") {
		CeRemi = getce(clock,1);
		if (CeRemi == undefined) {
			CeRemi = 0;
		} else {
			CeRemi = CeRemi*2.3;
		}
	} else if (drug_sets[1].model_name == "Maitre") {
		CeRemi = getce(clock,1);
		if (CeRemi == undefined) {
			CeRemi = 0;
		} else {
			CeRemi = CeRemi/70*2.3;
		}
	} else {
		CeRemi = getce(clock,1);
		if (CeRemi == undefined) {CeRemi = 0;}
	}
	PTOL_U = CeProp/8.48 * (1+CeRemi/1.16);
	PTOL_gamma = 3.46;
	PTOL = Math.pow(PTOL_U,PTOL_gamma) / (1+ Math.pow(PTOL_U, PTOL_gamma));
	return Math.round(PTOL*100)/100;
}

function nsri_calculate(clock) {
	//anesthesiology 2010
	//formulas modified by me. original form : N/R-lar 
  CeProp = getce(clock,0);
  if (CeProp == undefined) CeProp = 0;
  if (drug_sets[1].model_name == "Shafer") {
		CeRemi = getce(clock,1);
		if (CeRemi == undefined) {
			CeRemi = 0;
		} else {
			CeRemi = CeRemi*2.3;
		}
	} else if (drug_sets[1].model_name == "Maitre") {
		CeRemi = getce(clock,1);
		if (CeRemi == undefined) {
			CeRemi = 0;
		} else {
			CeRemi = CeRemi/70*2.3;
		}
	} else {
		CeRemi = getce(clock,1);
		if (CeRemi == undefined) {CeRemi = 0;}
	}
  NSRI_U = CeProp/8.48 * (1+CeRemi/1.16);
  NSRI_gamma = 2.18; //slope "sl" given by paper
    
  NSRI = 100 * (1 - (Math.pow(NSRI_U,NSRI_gamma) / (1+Math.pow(NSRI_U,NSRI_gamma))));
  return Math.round(NSRI);
}

function ptol_calculate_pair(CeProp, CeRemi) {
	if (drug_sets[1].model_name == "Shafer") {
		CeRemi_eq = CeRemi*2.3;
	} else if (drug_sets[1].model_name == "Maitre") {
		CeRemi_eq = CeRemi/70*2.3;
	} else {
		CeRemi_eq = CeRemi;
	}
	PTOL_U = CeProp/8.48 * (1+CeRemi/1.16);
	PTOL_gamma = 3.46;
	PTOL = Math.pow(PTOL_U,PTOL_gamma) / (1+ Math.pow(PTOL_U, PTOL_gamma));
	return Math.round(PTOL*100)/100;
}

function update_ptol() {
	clock = Math.round(time_in_s);
	document.getElementById("ptolcard_right").innerHTML = Math.round(ptol_calculate(clock)*100);
}

function update_nsri() {
	clock = Math.round(time_in_s);
	document.getElementById("ptolcard_right").innerHTML = nsri_calculate(clock);
}

// P = U^gamma / (1 + U^gamma)
// can be expressed as gamma log U = log ( P / (1-P) )
// where U = CEpropo / CE50propo * (1 + CEremi / CE50remi)
// where CE50propo is 8.48, CE50remi is 1.16, gamma is 3.46
//const ptol_U90 = Math.exp(Math.log(9)/3.46); // 9 is ratio of 0.9:0.1 probability
//const ptol_U90xCP50xCR50 = ptol_U90 * 8.48 * 1.16;
//const ptol_U50 = Math.exp(Math.log(1)/3.46); // 1 is ratio of 0.5:0.5 probability
//const ptol_U50xCP50xCR50 = ptol_U50 * 8.48 * 1.16;
//const ptol_U10 = Math.exp(Math.log(0.1/0.9)/3.46); // ratio is 0.1/0.9 probability
//const ptol_U10xCP50xCR50 = ptol_U10 * 8.48 * 1.16;

function ptol_function_solve_p(CeRemi, probability) {
	//probability is 0 to 1;
	//convert fen to remi
	if (drug_sets[1].model_name == "Shafer") {
		CeRemi_eq = CeRemi*2.3;
	} else if (drug_sets[1].model_name == "Maitre") {
		CeRemi_eq = CeRemi/70*2.3;
	} else	{
		CeRemi_eq = CeRemi;
	}
	let solve_U = Math.exp(Math.log(probability / (1-probability))/3.46);
	let solve_U_product = solve_U * 8.48 * 1.16;
	return solve_U_product / (1.16 + CeRemi_eq);
}

function ptol_function_solve_r(CeProp, probability) {
	let solve_U = Math.exp(Math.log(probability / (1-probability))/3.46);
	let solve_U_product = solve_U * 8.48 * 1.16;
	result_CeRemi = (solve_U_product - (1.16 * CeProp)) / CeProp;
	//convert remi to fen
	if (drug_sets[1].model_name == "Shafer") {
		result_CeRemi_eq = result_CeRemi / 2.3;
	} else if (drug_sets[1].model_name == "Maitre") {
		result_CeRemi_eq = result_CeRemi * 70 / 2.3;
	} else {
		result_CeRemi_eq = result_CeRemi;
	}
	return result_CeRemi_eq;
}

function ptol_generate_data_based_on_P(probability) { // this creates P-R couples
	//obsolete??
	temp_data = new Array();
	temp_data.push({x:0.1, y:ptol_function_solve_p(0.1,probability)});
	for (temp_integer = 1; temp_integer<=50; temp_integer++) {
		temp_data.push(
			{x:temp_integer/5, y:ptol_function_solve_p(temp_integer/5,probability)}
			)
	}
	return temp_data;
}

/*
function ptol90_function_solve_p(CeRemi) {
	return ptol_U90xCP50xCR50 / (1.16 + CeRemi);
}

function ptol50_function_solve_p(CeRemi) {
	return ptol_U50xCP50xCR50 / (1.16 + CeRemi);
}

function ptol10_function_solve_p(CeRemi) {
	return ptol_U10xCP50xCR50 / (1.16 + CeRemi);
}
*/

function ptol_generate_data_p(probability1,probability2) { // this creates CEprop for PTOL(P) over time (effect boundaries)
	if (parseloading == 0) {
		working_clock_min = time_in_s/60;
	} else {
		working_clock_min = 0; //begin at zero if this is loading from file
	}
	ppcount = 0;

	//truncate the chart data
	if (myChart.data.datasets[6].data.length>1) {
		myChart.data.datasets[6].data.length = myChart.data.datasets[6].data.findIndex((element)=>element.x>working_clock_min) - 1;
		myChart.data.datasets[7].data.length = myChart.data.datasets[7].data.findIndex((element)=>element.x>working_clock_min) - 1;
	} else {
		//fill null because no ptol data prior to this point
		myChart.data.datasets[6].data.length = 0;
		myChart.data.datasets[7].data.length = 0;
	}

	/*
	if (myChart.data.datasets[5].data.length>1) {
		//convert working clock min into correct count number
		ppcount = myChart.data.datasets[5].data.findIndex((element)=>element.x>working_clock_min) + 1;
	}
	*/

	console.log("** ptol generate PROPO margins, working clock minutes is" + working_clock_min );
	console.log("** myChart dataset 6 length = " + myChart.data.datasets[6].data.length );
	//console.log("** converted count is" +ppcount);
	var newData = new Array();
	var resolution = 0.25;
	for (ppcount = 0; ppcount<16; ppcount++) {
		CeRemi = getce(working_clock_min*60,1);
		if (CeRemi == undefined) CeRemi = 0;
		y1 = ptol_function_solve_p(CeRemi, probability1);
		y2 = ptol_function_solve_p(CeRemi, probability2);
		newData.push([
			{x:working_clock_min, y:y1},
			{x:working_clock_min, y:y2}
		]);
		working_clock_min = working_clock_min + resolution;
	}
	resolution = 2;
	for (working_clock_min; working_clock_min<drug_sets[1].cpt_cp.length/60; working_clock_min = working_clock_min + resolution) {
		CeRemi = getce(working_clock_min*60,1);
		if (CeRemi == undefined) CeRemi = 0;
		y1 = ptol_function_solve_p(CeRemi, probability1);
		y2 = ptol_function_solve_p(CeRemi, probability2);
		newData.push([
			{x:working_clock_min, y:y1},
			{x:working_clock_min, y:y2}
		]);
		
	}
	/*old code
	for (ppcount; ppcount<myChart.data.datasets[5].data.length; ppcount++) {
		//decimate by factor of 2 and 6
		if ((ppcount % 2 == 0) && (ppcount < 10)) {
			ppcount_time 	= myChart.data.datasets[5].data[ppcount].x;
			CeRemi 			= myChart.data.datasets[5].data[ppcount].y;
			if (CeRemi == undefined) CeRemi = 0;
			y1 = ptol_function_solve_p(CeRemi, probability1);
			y2 = ptol_function_solve_p(CeRemi, probability2);
			newData.push(
				[
					{x:ppcount_time, y:y1},
					{x:ppcount_time, y:y2}
				]);
		}
		if ((ppcount % 6 == 0) && (ppcount >= 10)) {
			ppcount_time 	= myChart.data.datasets[5].data[ppcount].x;
			CeRemi 			= myChart.data.datasets[5].data[ppcount].y;
			if (CeRemi == undefined) CeRemi = 0;
			y1 = ptol_function_solve_p(CeRemi, probability1);
			y2 = ptol_function_solve_p(CeRemi, probability2);
			newData.push(
				[
					{x:ppcount_time, y:y1},
					{x:ppcount_time, y:y2}
				]);
		}
	}
	end old code */
	for (ppcount = 0; ppcount<newData.length; ppcount++) {
		myChart.data.datasets[6].data.push(newData[ppcount][0]);
		myChart.data.datasets[7].data.push(newData[ppcount][1]);
	}
}

function ptol_generate_data_r(probability1,probability2) { // this creates CEremi for PTOL(R) over time (effect boundaries)
	if (parseloading == 0) {
		working_clock_min = time_in_s/60;
	} else {
		working_clock_min = 0; //begin at zero if this is loading from file
	}
	prcount = 0;

	if (myChart.data.datasets[8].data.length>1) {
		myChart.data.datasets[8].data.length = myChart.data.datasets[8].data.findIndex((element)=>element.x>working_clock_min) - 1;
		myChart.data.datasets[9].data.length = myChart.data.datasets[9].data.findIndex((element)=>element.x>working_clock_min) - 1;
	} else {
		//fill null because no ptol data prior to this point
		myChart.data.datasets[8].data.length=0;
		myChart.data.datasets[9].data.length=0;
	}
	
	/*
	if (myChart.data.datasets[3].data.length>1) {
		//convert working clock min into correct count number
		prcount = myChart.data.datasets[3].data.findIndex((element)=>element.x>working_clock_min) + 1;
	}
	*/

	console.log("** ptol generate REMI margins, working clock minutes is" + working_clock_min );
	var newDataPR = new Array();
	var resolution = 0.25;
	for (prcount = 0; prcount < 16; prcount++) {
		CeProp = getce(working_clock_min*60,0);
		if (CeProp == undefined) CeProp = 0;
		y1 = ptol_function_solve_r(CeProp, probability1);
		y2 = ptol_function_solve_r(CeProp, probability2);
		newDataPR.push(
			[
				{x:working_clock_min,y:y1},
				{x:working_clock_min,y:y2}
			]
		);
		working_clock_min = working_clock_min + resolution;
	}
	resolution = 2;
	for (working_clock_min; working_clock_min < drug_sets[0].cpt_cp.length/60; working_clock_min = working_clock_min + resolution) {
		
		CeProp = getce(working_clock_min*60,0);
		if (CeProp == undefined) CeProp = 0;
		y1 = ptol_function_solve_r(CeProp, probability1);
		y2 = ptol_function_solve_r(CeProp, probability2);
		newDataPR.push(
			[
				{x:working_clock_min,y:y1},
				{x:working_clock_min,y:y2}
			]
		);
		
	}
	/*
	for (prcount; prcount<myChart.data.datasets[3].data.length; prcount++) {
		if ((prcount % 2 == 0) && (prcount < 10)) {
			prcount_time 	= myChart.data.datasets[3].data[prcount].x;
			CeProp 			= myChart.data.datasets[3].data[prcount].y;
			if (CeProp == undefined) CeProp = 0;
			y1 = ptol_function_solve_r(CeProp, probability1);
			y2 = ptol_function_solve_r(CeProp, probability2);
			newDataPR.push(
				[
					{x:prcount_time, y:y1},
					{x:prcount_time, y:y2}
				]
			);
		}
		if ((prcount % 6 == 0) && (prcount >= 10)) {
			prcount_time 	= myChart.data.datasets[3].data[prcount].x;
			CeProp 			= myChart.data.datasets[3].data[prcount].y;
			if (CeProp == undefined) CeProp = 0;
			y1 = ptol_function_solve_r(CeProp, probability1);
			y2 = ptol_function_solve_r(CeProp, probability2);
			newDataPR.push(
				[
					{x:prcount_time, y:y1},
					{x:prcount_time, y:y2}
				]
			);
		}
	}
	*/
	for (prcount = 0; prcount<newDataPR.length; prcount++) {
		myChart.data.datasets[8].data.push(newDataPR[prcount][0]);
		myChart.data.datasets[9].data.push(newDataPR[prcount][1]);
	}
	
}

function ptol_generate_ptol_based_on_couples() { //this creates ptol over time curve based on PR couples over time for use in "fill history future dots"
	if (parseloading == 0) {
		half_minute_counter = Math.floor(time_in_s/30);
	} else {
		half_minute_counter = 0;
	}
	ptolcouplesarray.length = half_minute_counter;
	for (half_minute_counter; half_minute_counter<drug_sets[0].cpt_rates_real.length/30; half_minute_counter++) {
		yvalue = getce(half_minute_counter*30,0);
		if (yvalue == undefined) yvalue = 0;
		xvalue = getce(half_minute_counter*30,1);
		if (xvalue == undefined) xvalue = 0;
		temp_ptol = ptol_calculate(half_minute_counter*30);

		ptolcouplesarray.push(
		{
			x: xvalue,
			y: yvalue,
			meta_ptol: temp_ptol,
		})

	}
}

var prior_half_minute_clock = 0;

function ptol_fill_history_future_dots(force_redraw) {
	var half_minute_clock = Math.floor(time_in_s/30);
	//dataset 10 is trendline
	//dataset 5 is red dot, current
	myChart2.data.datasets[5].data = [ptolcouplesarray[half_minute_clock]];

	if ((force_redraw == 1) || (half_minute_clock>prior_half_minute_clock)) {
		console.log('redraw myChart2 fired');
		if (half_minute_clock<=40) {
			start = ptolcouplesarray.findIndex(arg => arg != null) // this corrects for special scenario which one of drug is delayed start. this will return first non-null index
		} else {
			start = half_minute_clock-40
		};
		myChart2.data.datasets[10].data = ptolcouplesarray.slice(start,half_minute_clock+40);
		for (desc_count = 4; desc_count >= 1; desc_count--) {
			if (half_minute_clock - desc_count*2 >= 0) {
				myChart2.data.datasets[5-desc_count].data = [ptolcouplesarray[half_minute_clock-desc_count*2]];
			}
		}
		for (asc_count = 1; asc_count<=4; asc_count++) {
			myChart2.data.datasets[asc_count+5].data = [ptolcouplesarray[half_minute_clock+asc_count*2]];
		}
		if (myChart2.data.datasets[10].data.length<80) {
			origdata = myChart2.data.datasets[10].data[0];
			num = 80-myChart2.data.datasets[10].data.length;
			for (zcount = 0; zcount<num; zcount++) {
				myChart2.data.datasets[10].data.unshift(origdata);
			}
		}
		
		y2=myChart2.data.datasets[10].data[myChart2.data.datasets[10].data.length-1].y;
		y1=myChart2.data.datasets[10].data[myChart2.data.datasets[10].data.length-4].y;
		x2=myChart2.data.datasets[10].data[myChart2.data.datasets[10].data.length-1].x;
		x1=myChart2.data.datasets[10].data[myChart2.data.datasets[10].data.length-4].x;
		calc_angle = Math.atan2(y2-y1,x2-x1);
		//atan returns value in radian from -pi to +pi
		if ( calc_angle < 0 ) 
		    {
		         calc_angle += Math.PI * 2;
		    }
		calc_angle = calc_angle * ( 180 / Math.PI );
		calc_angle = 360 - calc_angle + 90;

		myChart2.data.datasets[10].pointRotation = calc_angle;
		prior_half_minute_clock = half_minute_clock;
	}
	myChart2.update();
}

/*
function ptol_dot_animation() {
	aniCount = 1
	function hidedots() {
    for (count = 1; count<=9; count++) {
        myChart2.data.datasets[count].hidden = true;
    }
	}
	hidedots();
	loopX = setInterval( function() {
    if (aniCount<=9) {
        myChart2.data.datasets[aniCount].hidden = false;
        aniCount ++;
        myChart.update();
        console.log(aniCount);
    }
	},1000);
	setTimeout(hidedots,11*1000);
	//setTimeout(clearInterval(loopX),11*1000);
}
*/

/*
function ptol50_generate_data_p() {
	let data = new Array();
	for (second_counter = 0; second_counter<drug_sets[0].cpt_rates_real.length; second_counter++) {
		if (second_counter % 30 == 0) { //resolution of 30s
			CeRemi = getce(second_counter,1);
			
			if (CeRemi == undefined) CeRemi = 0;
			x = second_counter/60;
			y = ptol50_function_solve_p(CeRemi);
			data.push(
				{x:x,
				y:y}
			);
		}	
	}
	return data;
}
*/

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

xprior=0;
yprior=0;
function updatechart(chart) {
	corX = time_in_s/60;
	corY = result;
	corY_e = result_e;
	//corX = Math.round(time_in_s/60*100)/100;
	//corY = Math.round(result*100)/100;
	//corY_e = Math.round(result_e*100)/100;

	/*
	if (arg == "updatescale") {

	} else {
		chartAddData(chart, {x:corX, y:corY}, {x:corX, y:corY_e}); 
	}
	*/
	
	xprior0 = chart.options.scales.x.min;
	xprior1 = chart.options.scales.x.max;
	yprior = chart.options.scales.y.max;
	

	if (chartprofile == 0) { // 0 is full view
		if (corX>0 && corX<=7) {
			chart.options.scales.x.min = 0;
			chart.options.scales.x.max = 20;
			chart.options.scales.x.ticks.stepSize = 5;		
		} else if (corX>7 && corX<=25) {
			chart.options.scales.x.min = 0;
			chart.options.scales.x.max = 30;
			chart.options.scales.x.ticks.stepSize = 5;		
		} else if (corX>25 && corX<=45) {
			chart.options.scales.x.min = 0;
			chart.options.scales.x.ticks.stepSize = 5;		
			chart.options.scales.x.max = 60;
		} else if (corX>45 && corX<=100) {
			chart.options.scales.x.min = 0;
			chart.options.scales.x.max = 120;
			chart.options.scales.x.ticks.stepSize = 10;		
		} else if (corX>100 && corX<=210) {
			chart.options.scales.x.min = 0;
			chart.options.scales.x.max = 240;
			chart.options.scales.x.ticks.stepSize = 20;		
		} else if (corX>210 && corX<=400) {
			chart.options.scales.x.min = 0;
			chart.options.scales.x.max = 480;
			chart.options.scales.x.ticks.stepSize = 30;
		} else if (corX>400 && corX<=700) {
			chart.options.scales.x.min = 0;
			chart.options.scales.x.max = 720;
			chart.options.scales.x.ticks.stepSize = 60;
		} else if (corX>700 && corX<100000) {
			chart.options.scales.x.min = 0;
			chart.options.scales.x.max = 1440; // max 24h
			chart.options.scales.x.ticks.stepSize = 60;
		}
		if (corY>0.1 && corY<=1.6) {
			if (drug_sets[active_drug_set_index].drug_name == "Propofol" || drug_sets[active_drug_set_index].drug_name == "Remifentanil") {
				chart.options.scales.y.max = 5;
				chart.options.scales.y.ticks.stepSize = 0.5;
			} else {
				chart.options.scales.y.max = 3;
				chart.options.scales.y.ticks.stepSize = 0.5;
			}
		} else if (corY>1.6 && corY<=4) {
			chart.options.scales.y.max = 5;
			chart.options.scales.y.ticks.stepSize = 0.5;
		} else if (corY>4 && corY<=7) {
			chart.options.scales.y.max = 8;
			chart.options.scales.y.ticks.stepSize = 1;		
		} else if (corY>7 && corY<=11) {
			chart.options.scales.y.max = 12;
			chart.options.scales.y.ticks.stepSize = 1;		
		} else if (corY>11) {
			chart.options.scales.y.max = 15;
			chart.options.scales.y.ticks.stepSize = 1;				
		} 
		if (drug_sets[active_drug_set_index].drug_name == "Alfentanil") {
			if (corY<=70) {
				chart.options.scales.y.max = 100;
				chart.options.scales.y.ticks.stepSize = 20;
			} else if (corY>70 && corY<=120) {
				chart.options.scales.y.max = 160;
				chart.options.scales.y.ticks.stepSize = 20;
			} else if (corY>120 && corY<=180) {
				chart.options.scales.y.max = 200;
				chart.options.scales.y.ticks.stepSize = 20;
			} else if (corY>180 && corY<=280) {
				chart.options.scales.y.max = 300;
				chart.options.scales.y.ticks.stepSize = 50;
			} else if (corY>280 && corY<400) {
				chart.options.scales.y.max = 500;
				chart.options.scales.y.ticks.stepSize = 50;
			} else {
				chart.options.scales.y.max = 600;
				chart.options.scales.y.ticks.stepSize = 50;
			}
		}

	} else if (chartprofile == 1) { // zoom view

		if (corX>7 && corX<=25) {
			chart.options.scales.x.min = 0;
			chart.options.scales.x.max = 30;
			chart.options.scales.x.ticks.stepSize = 5;
		} else if (corX>25 && corX<=45) {
			chart.options.scales.x.min = 20;
			chart.options.scales.x.max = 60;
			chart.options.scales.x.ticks.stepSize = 5;
		} else if (corX>45 && corX<=75) {
			chart.options.scales.x.min = 30;
			chart.options.scales.x.max = 90;
			chart.options.scales.x.ticks.stepSize = 10;
 		} else if (corX>75 && corX<=105) {
			chart.options.scales.x.min = 60;
			chart.options.scales.x.max = 120;
			chart.options.scales.x.ticks.stepSize = 10;
		} else if (corX>105 && corX<=135) {
			chart.options.scales.x.min = 90;
			chart.options.scales.x.max = 150;
			chart.options.scales.x.ticks.stepSize = 10;		
		} else if (corX>135 && corX<=165) {
			chart.options.scales.x.min = 120;
			chart.options.scales.x.max = 180;
			chart.options.scales.x.ticks.stepSize = 10;		
		} else if (corX>165 && corX<=195) {
			chart.options.scales.x.min = 150;
			chart.options.scales.x.max = 210;
			chart.options.scales.x.ticks.stepSize = 10;		
		} else if (corX>195 && corX<=225) {
			chart.options.scales.x.min = 180;
			chart.options.scales.x.max = 240;
			chart.options.scales.x.ticks.stepSize = 10;		
		} else if (corX>225 && corX<=255) {
			chart.options.scales.x.min = 210;
			chart.options.scales.x.max = 270;
			chart.options.scales.x.ticks.stepSize = 10;		
		} else if (corX>255 && corX<=285) {
			chart.options.scales.x.min = 240;
			chart.options.scales.x.max = 300;
			chart.options.scales.x.ticks.stepSize = 10;
		} else if (corX>285 && corX<=315) {
			chart.options.scales.x.min = 270;
			chart.options.scales.x.max = 330;
			chart.options.scales.x.ticks.stepSize = 10;
		} else if (corX>315 && corX<=345) {
			chart.options.scales.x.min = 300;
			chart.options.scales.x.max = 360;
			chart.options.scales.x.ticks.stepSize = 10;
		} else if (corX>345 && corX<=375) {
			chart.options.scales.x.min = 330;
			chart.options.scales.x.max = 390;
			chart.options.scales.x.ticks.stepSize = 10;
		} else if (corX>375 && corX<=430) {
			chart.options.scales.x.min = 360;
			chart.options.scales.x.max = 450;
			chart.options.scales.x.ticks.stepSize = 10;
		} else if (corX>430 && corX<=520) {
			chart.options.scales.x.min = 420;
			chart.options.scales.x.max = 540;
			chart.options.scales.x.ticks.stepSize = 10;
		} else if (corX>520 && corX<=610) {
			chart.options.scales.x.min = 510;
			chart.options.scales.x.max = 630;
			chart.options.scales.x.ticks.stepSize = 10;
		} else if (corX>610 && corX<=700) {
			chart.options.scales.x.min = 600;
			chart.options.scales.x.max = 720;
			chart.options.scales.x.ticks.stepSize = 10;
		} else if (corX>700 && corX<=790) {
			chart.options.scales.x.min = 690;
			chart.options.scales.x.max = 810;
			chart.options.scales.x.ticks.stepSize = 10;
		} else if (corX>790 && corX<=10000) {
			chart.options.scales.x.min = 720;
			chart.options.scales.x.max = 1440;
			chart.options.scales.x.ticks.stepSize = 20;
		}
		if (corY>0.1 && corY<=1.6) {
			if (drug_sets[active_drug_set_index].drug_name == "Propofol") {
				chart.options.scales.y.max = 5;
				chart.options.scales.y.ticks.stepSize = 0.5;
			} else {
				chart.options.scales.y.max = 3;
				chart.options.scales.y.ticks.stepSize = 0.5;
			}
		} else if (corY>1.6 && corY<=4) {
			chart.options.scales.y.max = 5;
			chart.options.scales.y.ticks.stepSize = 0.5;
		} else if (corY>4 && corY<=7) {
			chart.options.scales.y.max = 8;
			chart.options.scales.y.ticks.stepSize = 1;		
		} else if (corY>7 && corY<=11) {
			chart.options.scales.y.max = 12;
			chart.options.scales.y.ticks.stepSize = 1;		
		} else if (corY>11) {
			chart.options.scales.y.max = 15;
			chart.options.scales.y.ticks.stepSize = 1;				
		}
		if (drug_sets[active_drug_set_index].drug_name == "Alfentanil") {
			if (corY<=70) {
				chart.options.scales.y.max = 100;
				chart.options.scales.y.ticks.stepSize = 20;
			} else if (corY>70 && corY<=120) {
				chart.options.scales.y.max = 160;
				chart.options.scales.y.ticks.stepSize = 20;
			} else if (corY>120 && corY<=180) {
				chart.options.scales.y.max = 200;
				chart.options.scales.y.ticks.stepSize = 20;
			} else if (corY>180 && corY<=280) {
				chart.options.scales.y.max = 300;
				chart.options.scales.y.ticks.stepSize = 50;
			} else if (corY>280 && corY<400) {
				chart.options.scales.y.max = 500;
				chart.options.scales.y.ticks.stepSize = 50;
			} else {
				chart.options.scales.y.max = 600;
				chart.options.scales.y.ticks.stepSize = 50;
			}
		}

	} else if (chartprofile == 2) { //custom view

		if (corY>0.1 && corY<=1.6) {
			if (drug_sets[active_drug_set_index].drug_name == "Propofol") {
				chart.options.scales.y.max = 5;
				chart.options.scales.y.ticks.stepSize = 0.5;
			} else {
				chart.options.scales.y.max = 3;
				chart.options.scales.y.ticks.stepSize = 0.5;
			}
		} else if (corY>1.6 && corY<=4) {
			chart.options.scales.y.max = 5;
			chart.options.scales.y.ticks.stepSize = 0.5;
		} else if (corY>4 && corY<=7) {
			chart.options.scales.y.max = 8;
			chart.options.scales.y.ticks.stepSize = 1;		
		} else if (corY>7 && corY<=11) {
			chart.options.scales.y.max = 12;
			chart.options.scales.y.ticks.stepSize = 1;		
		} else if (corY>11) {
			chart.options.scales.y.max = 15;
			chart.options.scales.y.ticks.stepSize = 1;				
		}

		if (drug_sets[active_drug_set_index].drug_name == "Alfentanil") {
			if (corY<=70) {
				chart.options.scales.y.max = 100;
				chart.options.scales.y.ticks.stepSize = 20;
			} else if (corY>70 && corY<=120) {
				chart.options.scales.y.max = 160;
				chart.options.scales.y.ticks.stepSize = 20;
			} else if (corY>120 && corY<=180) {
				chart.options.scales.y.max = 200;
				chart.options.scales.y.ticks.stepSize = 20;
			} else if (corY>180 && corY<=280) {
				chart.options.scales.y.max = 300;
				chart.options.scales.y.ticks.stepSize = 50;
			} else if (corY>280 && corY<400) {
				chart.options.scales.y.max = 500;
				chart.options.scales.y.ticks.stepSize = 50;
			} else {
				chart.options.scales.y.max = 600;
				chart.options.scales.y.ticks.stepSize = 50;
			}
		}
	}



	//new addition to save file
	//savefile_data();
	chart.update();
	savefile_time();

	//detect scale change
	if (eventArray.length>0){
		if ((chart.scales.x.min != xprior0) || (chart.scales.x.max != xprior1) || (chart.scales.y.max != yprior)) {
			alignEvents();
		}
	}

}

var chartviewarray = [0,30,10];
function updatechartview(chart) {
	chart.options.scales.x.min = chartviewarray[0];
	chart.options.scales.x.max = chartviewarray[1];
	if (chartviewarray[1]-chartviewarray[0] <= 20) {
		chart.options.scales.x.ticks.stepSize = 1;
	} else if (chartviewarray[1]-chartviewarray[0] <= 30) {
		chart.options.scales.x.ticks.stepSize = 5;
	} else if (chartviewarray[1]-chartviewarray[0] <= 60) {
		chart.options.scales.x.ticks.stepSize = 10;
	} else if (chartviewarray[1]-chartviewarray[0] <= 120) {
		chart.options.scales.x.ticks.stepSize = 15;
	}
}

function updatechartview2() {
	//read current values, we don't actually want to change them
	if (popupon == true) {
		tempchart = popupchart;
	} else {
		tempchart = myChart;
	}
	xmin = tempchart.options.scales.x.min;
	xmax = tempchart.options.scales.x.max;
	chartviewarray[0] = xmin;
	chartviewarray[1] = xmax+1;
	updatechartview(tempchart);
	tempchart.update("none");
	setTimeout(function() {
		chartviewarray[1] = xmax; 
		updatechartview(tempchart)
		tempchart.update("none")
	},1000);
}

function chartAddData(chart, data, data_e) {
	chart.data.datasets[0].data.push(data);
	chart.data.datasets[1].data.push(data_e);
	chart.update();
}

function chartZoomToggle(x) {
	chartprofile = x;
	document.getElementById('chartoverlay').classList.add('show');
	updatechart(myChart);
	alignEvents();
	myChart.update();
	setTimeout(function() {document.getElementById("chartoverlay").classList.remove("show"); }, 1500);
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



var ringbell2active = 0;
var ringbell2timeout = null;
var alert_sound_2 = null;
var alert_vibrate_2 = null;

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


function updatechart2() {
		//update myChart2
		if (active_drug_set_index == 0) {
			CeProp_value = result_e;
			CeRemi_value = alt_result_e;
		} else {
			CeProp_value = alt_result_e;
			CeRemi_value = result_e;
		}
		//document.getElementById("isobole_chart_current").innerHTML = "CeProp " + CeProp_value + ", CeRemi " + CeRemi_value + ", PTOL: " + ptol_calculate_pair(CeProp_value,CeRemi_value);
		if (popupon == false) {
			myChart2.data.datasets[0].data[0] = {x:CeRemi_value, y:CeProp_value};
			myChart2.update();
		}
}

function updatechart3(force_update_arg) {
	
	//change ptolcard_right display based on PD_mode
	if (PD_mode == 2) {
		document.getElementById("ptolcard_right").innerHTML = Math.round(ptolcouplesarray[Math.round(time_in_s/30)].meta_ptol*100);
	} else if (PD_mode == 3) {
		document.getElementById("ptolcard_right").innerHTML = nsri_calculate(Math.floor(time_in_s));
	}

	//ptolcouples is already generated from ptol_generate_margins function call
	if (popupon == false) {
		if ((force_update_arg == 1) || (Math.floor(time_in_s)%3 == 0)) {
			ptol_fill_history_future_dots(force_update_arg);
		}
	}
}

function runinfusion_fentanyl() {
	inf_rate_mls = getinfusionrate(time_in_s);

	inf_rate_permass = inf_rate_mls*infusate_concentration*inf_rate_permass_factor/mass;


	result = Math.round(getcp(time_in_s)*correction*100)/100;
	result_e = Math.round(getce(time_in_s)*correction*100)/100;

	displayresult(result, result_e);
}

function runinfusion() {
	//inf_rate_mgperkg = inf_rate_mls*10/mass;
	//getcp/getce updated to include ind = 0
	result = Math.round(getcp(time_in_s,0)*100)/100;
	result_e = Math.round(getce(time_in_s,0)*100)/100;
	displayresult(result, result_e);
	savefile_data();
	//if (Math.floor(time_in_s)%10 == 0) {
	//	var corX = Math.round(Math.floor(time_in_s)/60*100)/100;
	//	chartAddData(myChart, {x:corX, y:result}, {x:corX, y:result_e});
	//}
}

function runinfusion_old() { //this will be obsolete
	var temp1, temp2, temp3;
	
	infuse_time = offset;
	//console.log(infuse_time);
	if (prior_infuse_time == -1) {
		interval = 0; //t6: interval in this app is in ms, interval in stanpump is sec
	} else {
		interval = (infuse_time - prior_infuse_time)*simspeed;
	};
	//t6: own additions start
	delta_volume_infused = inf_rate_mls / 3600 /1000 * interval;
	delta_amount_infused = delta_volume_infused * infusate_concentration;
	volume_infused = volume_infused + delta_volume_infused;
	interval_in_s = interval/1000;
	rate_amount = inf_rate_mls * infusate_concentration /60; //rate in amount of drug per minute
	rate_amount_in_s = rate_amount /60;
	//old code
	/********************************************************/
	/* bring model forward 									*/
	/********************************************************/
	
	if (interval == 0)
		{
		/* state_a1 += delta_amount_infused */
		}
	else
		{
			pump_rate_in_amt = delta_amount_infused / interval_in_s;
			l1 = Math.exp(-lambda[1] * interval_in_s);
			l2 = Math.exp(-lambda[2] * interval_in_s);
			l3 = Math.exp(-lambda[3] * interval_in_s);
			l4 = Math.exp(-lambda[4] * interval_in_s);

			p_state[1] = p_state[1] * l1 + p_coef[1] * pump_rate_in_amt * (1 - l1);
			p_state[2] = p_state[2] * l2 + p_coef[2] * pump_rate_in_amt * (1 - l2);
			p_state[3] = p_state[3] * l3 + p_coef[3] * pump_rate_in_amt * (1 - l3);
			//if (effect_data)
			//	{
				e_state[1] = e_state[1] * l1 + e_coef[1] * pump_rate_in_amt * (1 - l1);
				e_state[2] = e_state[2] * l2 + e_coef[2] * pump_rate_in_amt * (1 - l2);
				e_state[3] = e_state[3] * l3 + e_coef[3] * pump_rate_in_amt * (1 - l3);
				e_state[4] = e_state[4] * l4 + e_coef[4] * pump_rate_in_amt * (1 - l4);
			//	}

		}

	// t6 these are derived and edited from model(...)
	// t6 I think this line is to estimate Cp
	
	//temp1 = p_state[1];
	//temp2 = p_state[2];
	//temp3 = p_state[3];
	//console.log(delta_amount_infused, interval_in_s);
	//console.log(temp1, temp2, temp3);
	result = virtual_model(p_state[1], p_state[2], p_state[3], 0, delta_seconds, 0);
	result_e = virtual_model(e_state[1], e_state[2], e_state[3], e_state[4], delta_seconds, 0); //set flag to 0 first.

	//new code
	//p_state[1] += p_coef[1] * rate_amount_in_s * (1 - Math.exp(-lambda[1] * T)) * Math.exp(-lambda[1] * I_stop60)
	displayresult(result, result_e);
	prior_infuse_time = infuse_time; // last sentence
}
function custombolus(arg) {
	return document.getElementById("inputBolus" + arg).value*1;
}

function bolusadmin(x, ind) {
	var working_clock = Math.floor(time_in_s);
	l1 = Math.exp(-drug_sets[ind].lambda[1]);
	l2 = Math.exp(-drug_sets[ind].lambda[2]);
	l3 = Math.exp(-drug_sets[ind].lambda[3]);
	l4 = Math.exp(-drug_sets[ind].lambda[4]);
	if (drug_sets[ind].manualmode_active == 1) {
		document.getElementById("prompt_msg2").innerHTML = "Current rate";
		if ((drug_sets[ind].cpt_cp.length>0) && (drug_sets[ind].cpt_cp[drug_sets[ind].cpt_cp.length-1][0]>0)) {
			p_state[1] = drug_sets[ind].cpt_cp[working_clock-1][0];
			p_state[2] = drug_sets[ind].cpt_cp[working_clock-1][1];
			p_state[3] = drug_sets[ind].cpt_cp[working_clock-1][2];
			e_state[1] = drug_sets[ind].cpt_ce[working_clock-1][0];
			e_state[2] = drug_sets[ind].cpt_ce[working_clock-1][1];
			e_state[3] = drug_sets[ind].cpt_ce[working_clock-1][2];
			e_state[4] = drug_sets[ind].cpt_ce[working_clock-1][3];

			if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
				p_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				p_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				p_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				e_state[4] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
			}

			drug_sets[ind].cpt_cp.length = working_clock;
			drug_sets[ind].cpt_ce.length = working_clock;
			drug_sets[ind].volinf.length = working_clock;
			drug_sets[ind].cpt_rates_real.length = working_clock;	

			drug_sets[ind].cpt_rates_real.push(drug_sets[ind].cpt_rates_real[working_clock-1]);

			
				myChart.data.datasets[ind*2+2].data.length = myChart.data.datasets[ind*2+2].data.findIndex((element)=>element.x>time_in_s/60);
				myChart.data.datasets[ind*2+3].data.length = myChart.data.datasets[ind*2+3].data.findIndex((element)=>element.x>time_in_s/60);
			
			

			temp_vol = drug_sets[ind].volinf[working_clock-1];
		} else {
			temp_vol = 0;
			drug_sets[ind].cpt_rates_real.push(0);
		}
	}

	p_state[1] = p_state[1] * l1 + drug_sets[ind].p_coef[1] * x * (1 - l1);
	p_state[2] = p_state[2] * l2 + drug_sets[ind].p_coef[2] * x * (1 - l2);
	p_state[3] = p_state[3] * l3 + drug_sets[ind].p_coef[3] * x * (1 - l3);

	e_state[1] = e_state[1] * l1 + drug_sets[ind].e_coef[1] * x * (1 - l1);
	e_state[2] = e_state[2] * l2 + drug_sets[ind].e_coef[2] * x * (1 - l2);
	e_state[3] = e_state[3] * l3 + drug_sets[ind].e_coef[3] * x * (1 - l3);
	e_state[4] = e_state[4] * l4 + drug_sets[ind].e_coef[4] * x * (1 - l4);


	if (drug_sets[ind].manualmode_active == 1) {
		drug_sets[ind].cpt_cp.push([p_state[1],p_state[2],p_state[3]]);
		drug_sets[ind].cpt_ce.push([e_state[1],e_state[2],e_state[3],e_state[4]]);
		drug_sets[ind].volinf.push(temp_vol+x/drug_sets[ind].infusate_concentration);
		drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div><div class='timespan'>" + converttime(working_clock) + "</div> Bolus: " + x + drug_sets[ind].infused_units + "</div>");
		drug_sets[ind].historyarrays.push([0,1,working_clock,x]);
		lookahead(1,7200,ind);
		document.getElementById("historywrapper").innerHTML = drug_sets[ind].historytext;
	}
	//result = p_state[1] + p_state[2] + p_state[3];
	//result_e = e_state[1] + e_state[2] + e_state[3] + e_state[4];
	
	//if ((cpt_active == 0) && (cet_active ==0)) {
	//	historytext = historytext.concat("<br>" + "Time: " + time_in_s + "s - Bolus: " + x + "mg");
	//}
	//displayresult(result, result_e);
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

function model(temp1, temp2, temp3, temp1e, temp2e, temp3e, temp4e) { //process rate based on patient states, result is units/sec
	if (temp1 == 0) { //first pass
		return desired/p_udf[delta_seconds]
	} else {
		result = virtual_model(temp1, temp2, temp3, 0, delta_seconds, 0);
		if (desired > result) {
			return (desired - result)/p_udf[delta_seconds];
		} else { return 0;}
	}
}

function cpt(x) {
	desired = x;
	next_rate = model(
			p_state[1] * l1 + p_coef[1] * pump_rate_in_amt * (1 - l1),
			p_state[2] * l2 + p_coef[2] * pump_rate_in_amt * (1 - l2),
			p_state[3] * l3 + p_coef[3] * pump_rate_in_amt * (1 - l3),
			e_state[1] * l1 + e_coef[1] * pump_rate_in_amt * (1 - l1),
			e_state[2] * l2 + e_coef[2] * pump_rate_in_amt * (1 - l2),
			e_state[3] * l3 + e_coef[3] * pump_rate_in_amt * (1 - l3),
			e_state[4] * l4 + e_coef[4] * pump_rate_in_amt * (1 - l4));
}


function virtual_model(vm1, vm2, vm3, vm4, t, flag, ind) {
	//t6 vm4 is for effect site, flag =1 for effect mode
	//virtual_model returns a certain concentration given certain patient states over time t
	var vmf1, vmf2, vmf3, vmf4;
	var temp;
	if ((drug_sets[ind].lambda[1] * t) > 100.0)
		{vmf1 = 0;}
	else
		{vmf1 = Math.exp(-drug_sets[ind].lambda[1] * t);}

	if ((drug_sets[ind].lambda[2] * t) > 100.0)
		{vmf2 = 0;}
	else
		{vmf2 = Math.exp(-drug_sets[ind].lambda[2] * t);}

	if ((drug_sets[ind].lambda[3] * t) > 100.0)
		{vmf3 = 0;}
	else
		{vmf3 = Math.exp(-drug_sets[ind].lambda[3] * t);}

	if ((drug_sets[ind].lambda[4] * t) > 100.0)
		{vmf4 = 0;}
	else
		{vmf4 = Math.exp(-drug_sets[ind].lambda[4] * t);}

	temp = vm1 * vmf1 + vm2 * vmf2 + vm3 * vmf3 + vm4 * vmf4;
	return temp;
	//if ((lambda[4] * t) > 100.0)
	//	{vmf4 = 0;}
	//else
	//	{vmf4 = exp(-lambda[4] * t);}
}
function calculate_udfs(drug_sets_index) {
	drug_sets[drug_sets_index].k10 = drug_sets[drug_sets_index].k10/60; // per second rate constant
	drug_sets[drug_sets_index].k12 = drug_sets[drug_sets_index].k12/60;
	drug_sets[drug_sets_index].k13 = drug_sets[drug_sets_index].k13/60;
	drug_sets[drug_sets_index].k21 = drug_sets[drug_sets_index].k21/60;
	drug_sets[drug_sets_index].k31 = drug_sets[drug_sets_index].k31/60;
	drug_sets[drug_sets_index].k41 = drug_sets[drug_sets_index].k41/60;
	drug_sets[drug_sets_index].p_coef = new Array();
	drug_sets[drug_sets_index].e_coef = new Array();
	drug_sets[drug_sets_index].lambda = new Array();
	cube(drug_sets[drug_sets_index].k10, drug_sets[drug_sets_index].k12, drug_sets[drug_sets_index].k21, drug_sets[drug_sets_index].k13, drug_sets[drug_sets_index].k31, drug_sets[drug_sets_index].lambda);
	drug_sets[drug_sets_index].p_coef[4]=0;
	drug_sets[drug_sets_index].lambda[4] = drug_sets[drug_sets_index].k41;

		drug_sets[drug_sets_index].p_coef[1] = (drug_sets[drug_sets_index].k21 - drug_sets[drug_sets_index].lambda[1]) * (drug_sets[drug_sets_index].k31 - drug_sets[drug_sets_index].lambda[1]) / 
			(drug_sets[drug_sets_index].lambda[1] - drug_sets[drug_sets_index].lambda[2]) / 
			(drug_sets[drug_sets_index].lambda[1] - drug_sets[drug_sets_index].lambda[3]) / 
			drug_sets[drug_sets_index].vc / drug_sets[drug_sets_index].lambda[1];
		drug_sets[drug_sets_index].p_coef[2] = (drug_sets[drug_sets_index].k21 - drug_sets[drug_sets_index].lambda[2]) * (drug_sets[drug_sets_index].k31 - drug_sets[drug_sets_index].lambda[2]) / 
			(drug_sets[drug_sets_index].lambda[2] - drug_sets[drug_sets_index].lambda[1]) / 
			(drug_sets[drug_sets_index].lambda[2] - drug_sets[drug_sets_index].lambda[3]) / 
			drug_sets[drug_sets_index].vc / drug_sets[drug_sets_index].lambda[2];
		drug_sets[drug_sets_index].p_coef[3] = (drug_sets[drug_sets_index].k21 - drug_sets[drug_sets_index].lambda[3]) * (drug_sets[drug_sets_index].k31 - drug_sets[drug_sets_index].lambda[3]) / 
			(drug_sets[drug_sets_index].lambda[3] - drug_sets[drug_sets_index].lambda[2]) / 
			(drug_sets[drug_sets_index].lambda[3] - drug_sets[drug_sets_index].lambda[1]) / 
			drug_sets[drug_sets_index].vc / drug_sets[drug_sets_index].lambda[3];

		drug_sets[drug_sets_index].e_coef[1] = drug_sets[drug_sets_index].p_coef[1] / (drug_sets[drug_sets_index].k41 - drug_sets[drug_sets_index].lambda[1]) * drug_sets[drug_sets_index].k41;
		drug_sets[drug_sets_index].e_coef[2] = drug_sets[drug_sets_index].p_coef[2] / (drug_sets[drug_sets_index].k41 - drug_sets[drug_sets_index].lambda[2]) * drug_sets[drug_sets_index].k41;
		drug_sets[drug_sets_index].e_coef[3] = drug_sets[drug_sets_index].p_coef[3] / (drug_sets[drug_sets_index].k41 - drug_sets[drug_sets_index].lambda[3]) * drug_sets[drug_sets_index].k41;
		drug_sets[drug_sets_index].e_coef[4] = (drug_sets[drug_sets_index].k41 - drug_sets[drug_sets_index].k21) * (drug_sets[drug_sets_index].k41 - drug_sets[drug_sets_index].k31) / 
			(drug_sets[drug_sets_index].lambda[1] - drug_sets[drug_sets_index].k41) / 
			(drug_sets[drug_sets_index].lambda[2] - drug_sets[drug_sets_index].k41) / 
			(drug_sets[drug_sets_index].lambda[3] - drug_sets[drug_sets_index].k41) / drug_sets[drug_sets_index].vc;
		

	temp1 = 0;
	temp2 = 0;
	temp3 = 0;
	temp4 = 0;

	l1 = Math.exp(-drug_sets[drug_sets_index].lambda[1]);
	l2 = Math.exp(-drug_sets[drug_sets_index].lambda[2]);
	l3 = Math.exp(-drug_sets[drug_sets_index].lambda[3]);
	l4 = Math.exp(-drug_sets[drug_sets_index].lambda[4]);

	drug_sets[drug_sets_index].p_udf = new Array();
	drug_sets[drug_sets_index].e_udf = new Array();

    /* calculate udf, plasma concentration, for an infusion of 1/second */
	drug_sets[drug_sets_index].p_udf[0] = 0;
	for (i = 1;  i < 199;  i++)
		{
		temp1 = temp1 * l1 + drug_sets[drug_sets_index].p_coef[1] * (1 - l1);
		temp2 = temp2 * l2 + drug_sets[drug_sets_index].p_coef[2] * (1 - l2);
		temp3 = temp3 * l3 + drug_sets[drug_sets_index].p_coef[3] * (1 - l3);
		drug_sets[drug_sets_index].p_udf[i] = temp1 + temp2 + temp3;
		}

	/* now calculate udf, effect site, until peak.  Note peak as peak_time */
	temp1 = 0;
	temp2 = 0;
	temp3 = 0;
	temp4 = 0;
	drug_sets[drug_sets_index].e_udf[0] = 0;

	for (i = 1;  i <= delta_seconds;  i++)
		{
		temp1 = temp1 * l1 + drug_sets[drug_sets_index].e_coef[1] * (1 - l1);
		temp2 = temp2 * l2 + drug_sets[drug_sets_index].e_coef[2] * (1 - l2);
		temp3 = temp3 * l3 + drug_sets[drug_sets_index].e_coef[3] * (1 - l3);
		temp4 = temp4 * l4 + drug_sets[drug_sets_index].e_coef[4] * (1 - l4);
		drug_sets[drug_sets_index].e_udf[i] = temp1 + temp2 + temp3 + temp4;
		}

	var prior = drug_sets[drug_sets_index].e_udf[i-1];

	INNERLOOPe: for (i = delta_seconds; i<1000; i++) {
		temp1 = temp1 * l1;
		temp2 = temp2 * l2;
		temp3 = temp3 * l3;
		temp4 = temp4 * l4;
		drug_sets[drug_sets_index].e_udf[i] = temp1 + temp2 + temp3 + temp4;
		if (prior >= drug_sets[drug_sets_index].e_udf[i]) {
			drug_sets[drug_sets_index].peak_time = i-1;
			drug_sets[drug_sets_index].prior_peak_time = peak_time;
			break INNERLOOPe;
		}
		prior = drug_sets[drug_sets_index].e_udf[i];
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

			

		}
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
		paedi_mode = 1;
	}

	//clear the confirm buttons
		El4 = document.getElementById("checkConfirm");
		El5 = document.getElementById("checkDisclaim");
		El6 = document.getElementById("btn_initProceed");
		El4.checked = "";
		El5.checked = "";
		El4.parentElement.style.borderBottomColor = "transparent";
		El5.parentElement.style.borderBottomColor = "transparent";
		El6.classList.add("disabled");
		El6.removeEventListener("click", toPageTwo);
}


function readmodel(x, drug_set_index) {
	drug_sets[drug_set_index] = {};
	drug_sets[drug_set_index].model_name = x;
	if (x == "Marsh") {
		drug_sets[drug_set_index].vc = 0.228 * mass;
		drug_sets[drug_set_index].k10 = 0.119;
		drug_sets[drug_set_index].k12 = 0.112;
		drug_sets[drug_set_index].k13 = 0.0419;
		drug_sets[drug_set_index].k21 = 0.055;
		drug_sets[drug_set_index].k31 = 0.0033;
		drug_sets[drug_set_index].k41 = 1.21;
		drug_sets[drug_set_index].modeltext = "Marsh model (BJA 1991;67:41-8), 'fast' ke0 (Anesthesiology 2000;92:399-406)" + "<br>" +
		"vc = " + drug_sets[drug_set_index].vc + "<br>" +
		"k10 = " + drug_sets[drug_set_index].k10 + "<br>" +
		"k12 = " + drug_sets[drug_set_index].k12 + "<br>" +
		"k13 = " + drug_sets[drug_set_index].k13 + "<br>" +
		"k21 = " + drug_sets[drug_set_index].k21 + "<br>" +
		"k31 = " + drug_sets[drug_set_index].k31 + "<br>" +
		"ke0 = 1.21";

		drug_sets[drug_set_index].drug_name = "Propofol";
		drug_sets[drug_set_index].conc_units = "mcg";
		drug_sets[drug_set_index].infused_units = "mg";
		drug_sets[drug_set_index].inf_rate_permass = 0;
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;
	}
	if (x == "Schnider") {
		drug_sets[drug_set_index].vc = 4.27;
		var v2 = 18.9-0.391*(age-53);
		var v3 = 238;
		var cl1 = 1.89+0.0456*(mass-77)-0.0681*(lbm-59)+0.0264*(height-177);
		var cl2 = 1.29-0.024*(age-53); 
		var cl3 = 0.836;
		drug_sets[drug_set_index].k10 = cl1 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k12 = cl2 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k13 = cl3 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k21 = cl2 / v2;
		drug_sets[drug_set_index].k31 = cl3 / v3;
		drug_sets[drug_set_index].k41 = 0.456; //ke0
		drug_sets[drug_set_index].modeltext = "Schnider model (Anesthesiology 1998;88:1170-82)" + "<br>" +
		"vc = 4.27"+ "<br>" +
		"v2 = " + v2 + "<br>" +
		"v3 = " + v3 + "<br>" +
		"k10 = " + drug_sets[drug_set_index].k10 + "<br>" +
		"k12 = " + drug_sets[drug_set_index].k12 + "<br>" +
		"k13 = " + drug_sets[drug_set_index].k13 + "<br>" +
		"k21 = " + drug_sets[drug_set_index].k21 + "<br>" +
		"k31 = " + drug_sets[drug_set_index].k31 + "<br>" +
		"ke0 = 0.456";

		drug_sets[drug_set_index].drug_name = "Propofol";
		drug_sets[drug_set_index].conc_units = "mcg";
		drug_sets[drug_set_index].infused_units = "mg";
		drug_sets[drug_set_index].inf_rate_permass = 0;
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;
	} 
	if (x == "Paedfusor") {
		drug_sets[drug_set_index].k12 = 0.114;
		drug_sets[drug_set_index].k13 = 0.0419;
		drug_sets[drug_set_index].k21 = 0.055;
		drug_sets[drug_set_index].k31 = 0.0033;
		drug_sets[drug_set_index].k41 = 1.03*Math.exp(-0.12*age); //Pharmacodynamic modelling of the bispectral index response to propofol-based anaesthesia during general surgery in children C. Jeleazcov, H. Ihmsen, J. Schmidt, C. Ammon, H. Schwilden, J. Schüttler, J. Fechner Author Notes BJA: British Journal of Anaesthesia, Volume 100, Issue 4, April 2008, Pages 509–516, https://doi.org/10.1093/bja/aem408
		if (age<13) {
			drug_sets[drug_set_index].vc = 0.458 * mass;
			drug_sets[drug_set_index].k10 = 0.153 * Math.pow(mass, -0.3);
		} else if (age>=13 && age<14) {
			drug_sets[drug_set_index].vc = 0.4 * mass;
			drug_sets[drug_set_index].k10 = 0.0678;	
		} else if (age>=14 && age<15) {
			drug_sets[drug_set_index].vc = 0.342 * mass;
			drug_sets[drug_set_index].k10 = 0.0792;		
		} else if (age>=15 && age<16) {
			drug_sets[drug_set_index].vc = 0.284 * mass;
			drug_sets[drug_set_index].k10 = 0.0954;	
		} else if (age>=16) {
			drug_sets[drug_set_index].vc = 0.229 * mass;
			drug_sets[drug_set_index].k10 = 0.119;		
		}
		drug_sets[drug_set_index].modeltext = "Paedfusor model (BJA 2003;91(4)507-513)" + "<br>" +
		"vc = " + drug_sets[drug_set_index].vc + "<br>" +
		"k10 = " + drug_sets[drug_set_index].k10 + "<br>" +
		"k12 = " + drug_sets[drug_set_index].k12 + "<br>" +
		"k13 = " + drug_sets[drug_set_index].k13 + "<br>" +
		"k21 = " + drug_sets[drug_set_index].k21 + "<br>" +
		"k31 = " + drug_sets[drug_set_index].k31 + "<br>" +
		"ke0 = " + drug_sets[drug_set_index].k41 + "<br>" +
		"ke0 calculated by Tpeak method (age-dependent: 0.91min-1 at 1y to 0.15min-1 at 16y) (BJA 2008;100(4):509-516)";

		drug_sets[drug_set_index].drug_name = "Propofol";
		drug_sets[drug_set_index].conc_units = "mcg";
		drug_sets[drug_set_index].infused_units = "mg";
		drug_sets[drug_set_index].inf_rate_permass = 0;
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;
	}
	if (x == "Eleveld") {

		var opioid = 1; // arbitralily set YES to intraop opioids;
		const toweeks = 52.1429;
		if (paedi_mode == 0) {
			PMA = age*toweeks+40; //arbitrarily set PMA 40 weeks +age	
		} else {
			if (document.getElementById("inputPMA").value*1 > 0) {
				PMA = document.getElementById("inputPMA").value *1;
			} else {
				PMA = age*toweeks+40;
			}
			
		}
		
		drug_sets[drug_set_index].vc = 6.28 * fcentral(mass)/fcentral(70) ;
		var v2 = 25.5 * mass/70 * fageing(-0.0156);
		var v2ref = 25.5 ;
		var ffmref = (0.88 + (1-0.88)/(1 + Math.pow((35/13.4),-12.7))) * ((9270 * 70)/(6680+216*24.22145));
		if (opioid == 1) {
			var v3 = 273 * fffm()/ffmref*Math.exp(-0.0138*age);
		} else {
			var v3 = 273 * fffm()/ffmref;
		}
		var v3ref = 273; //just use this from the table
		if (gender == 0) { 
			var cl1 = 1.79 * Math.pow(mass/70,0.75) * (fclmaturation(PMA)/fclmaturation(35*toweeks+40))* Math.exp(-0.00286*age) ;
			//maturation valid for ~<5months according to Eleveld 2018
		} else {
			var cl1 = 2.1 * Math.pow(mass/70,0.75) * (fclmaturation(PMA)/fclmaturation(35*toweeks+40))* Math.exp(-0.00286*age) ;
		}
		var cl2 = 1.75 * Math.pow(v2/v2ref,0.75)* (1 + 1.3*(1-fq3maturation(age*toweeks)));
		var cl3 = 1.11 * Math.pow(v3/v3ref,0.75)*(fq3maturation(age*toweeks)/fq3maturation(35*toweeks));
		drug_sets[drug_set_index].k41 = 0.146 * Math.pow(mass/70,-0.25); 
		drug_sets[drug_set_index].k10 = cl1 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k12 = cl2 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k13 = cl3 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k21 = cl2 / v2;
		drug_sets[drug_set_index].k31 = cl3 / v3;
		drug_sets[drug_set_index].modeltext = "Eleveld model (BJA 2018;120:942-959)" + "<br>" +
		"Assume: presence of opioids" + "<br>" +
		"vc = " + drug_sets[drug_set_index].vc + "<br>" +
		"v2 = " + v2 + "<br>" + 
		"v3 = " + v3 + "<br>" + 
		"k10 = " + drug_sets[drug_set_index].k10 + "<br>" + 
		"k12 = " + drug_sets[drug_set_index].k12 + "<br>" +
		"k13 = " + drug_sets[drug_set_index].k13 + "<br>" +
		"k21 = " + drug_sets[drug_set_index].k21 + "<br>" +
		"k31 = " + drug_sets[drug_set_index].k31 + "<br>" +
		"ke0 = " + drug_sets[drug_set_index].k41 + "<br>";
		//"use of the Eleveld model in this app limited to >6 months old as the app did not account for CLmaturation, which requires PMA as covariate";

		drug_sets[drug_set_index].drug_name = "Propofol";
		drug_sets[drug_set_index].conc_units = "mcg";
		drug_sets[drug_set_index].infused_units = "mg";
		drug_sets[drug_set_index].inf_rate_permass = 0;
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;
	}
	if (x == "Minto") {
		//k41 = 0.693/1.2;
		drug_sets[drug_set_index].vc = 5.1-0.0201*(age-40)+0.072*(lbm-55);
		v2=9.82-0.0811*(age-40)+0.108*(lbm-55);
		v3=5.42;
		cl1=2.6-0.0162*(age-40)+0.0191*(lbm-55);
		cl2=2.05-0.0301*(age-40);
		cl3=0.076-0.00113*(age-40);
		

		drug_sets[drug_set_index].k10 = cl1 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k12 = cl2 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k13 = cl3 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k21 = cl2 / v2;
		drug_sets[drug_set_index].k31 = cl3 / v3;

		drug_sets[drug_set_index].k41 = 0.595-0.007*(age-40);
		drug_sets[drug_set_index].drug_name = "Remifentanil";
		
		drug_sets[drug_set_index].conc_units = "ng";
		drug_sets[drug_set_index].infused_units = "mcg";
		drug_sets[drug_set_index].inf_rate_permass_factor = 1/60;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mcg/kg/m";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;

		drug_sets[drug_set_index].modeltext = "Minto model (Anesthesiology 1997;86:10-23)" + "<br>" +
		"vc = " + drug_sets[drug_set_index].vc + "<br>" +
		"v2 = " + v2 + "<br>" + 
		"v3 = " + v3 + "<br>" + 
		"k10 = " + drug_sets[drug_set_index].k10 + "<br>" + 
		"k12 = " + drug_sets[drug_set_index].k12 + "<br>" +
		"k13 = " + drug_sets[drug_set_index].k13 + "<br>" +
		"k21 = " + drug_sets[drug_set_index].k21 + "<br>" +
		"k31 = " + drug_sets[drug_set_index].k31 + "<br>" +
		"ke0 = " + drug_sets[drug_set_index].k41 + "<br>";
	}
	if (x == "Eleveld-Remifentanil") {
		var ffmref = (0.88 + (1-0.88)/(1 + Math.pow((35/13.4),-12.7))) * ((9270 * 70)/(6680+216*24.22145));
		var size = fffm()/ffmref;
		if (gender == 0) {
			var ksex = 1;
		} else {
			var ksex = 1 + 0.47 * fsigmoid(age,12,6) * (1 - fsigmoid(age,45,6));
		}
		drug_sets[drug_set_index].vc = 5.81 * size * fageing(-0.00554);
		v2 = 8.82 * size * fageing(-0.00327) * ksex;
		v3 = 5.03 * size * fageing(-0.0315) * Math.exp((-0.026)*(mass-70));
		cl1 = 2.58 * Math.pow(size,0.75) * (fsigmoid(mass,2.88,2)/fsigmoid(70,2.88,2)) * ksex * fageing(-0.00327);
		cl2 = 1.72 * Math.pow(v2/8.82,0.75) * fageing(-0.00554) * ksex;
		cl3 = 0.124 * Math.pow(v3/5.03,0.75) * fageing(-0.00554);

		if (age<=16) {
			drug_sets[drug_set_index].k41 = 0.71; // pharmacodynamic modelling of bispectral index response to propofol-based anaesthesia during general surgery in children Jeleazcov 2008 BJA
		} else {
			drug_sets[drug_set_index].k41 = 1.09 * fageing(-0.0289);
		}

		drug_sets[drug_set_index].k10 = cl1 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k12 = cl2 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k13 = cl3 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k21 = cl2 / v2;
		drug_sets[drug_set_index].k31 = cl3 / v3;
		drug_sets[drug_set_index].drug_name = "Remifentanil";
		
		drug_sets[drug_set_index].conc_units = "ng";
		drug_sets[drug_set_index].infused_units = "mcg";
		drug_sets[drug_set_index].inf_rate_permass_factor = 1/60;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mcg/kg/m";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;

		drug_sets[drug_set_index].modeltext = "Eleveld model (Remifentanil) (Anesthesiology 2017;126:1005-18)" + "<br>" +
		"vc = " + drug_sets[drug_set_index].vc + "<br>" +
		"v2 = " + v2 + "<br>" + 
		"v3 = " + v3 + "<br>" + 
		"k10 = " + drug_sets[drug_set_index].k10 + "<br>" + 
		"k12 = " + drug_sets[drug_set_index].k12 + "<br>" +
		"k13 = " + drug_sets[drug_set_index].k13 + "<br>" +
		"k21 = " + drug_sets[drug_set_index].k21 + "<br>" +
		"k31 = " + drug_sets[drug_set_index].k31 + "<br>" +
		"ke0 = " + drug_sets[drug_set_index].k41 + "<br>";

		if (age<=16) {
			drug_sets[drug_set_index].modeltext = drug_sets[drug_set_index].modeltext + 
			"ke0 in children 1-16y is 0.71min-1 and t1/2ke0 is 1.0min, according to Jeleazcov (BJA 2008;100:509-516)";
		}
	}
	if (x == "Shafer") {
		drug_sets[drug_set_index].vc = 6.09;
		drug_sets[drug_set_index].k10 = 0.0827;
		drug_sets[drug_set_index].k12 = 0.471;
		drug_sets[drug_set_index].k13 = 0.225;
		drug_sets[drug_set_index].k21 = 0.102;
		drug_sets[drug_set_index].k31 = 0.006;
		drug_sets[drug_set_index].k41 = Math.log(2)/6.6; //scott 1991, PD fentanyl vs sufentanil 
		//k41 = 0.147; //scott and stanski model JPET 1987;240:159-66
		drug_sets[drug_set_index].drug_name = "Fentanyl";
		
		drug_sets[drug_set_index].conc_units = "ng";
		drug_sets[drug_set_index].infused_units = "mcg";
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mcg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;

	}
	if (x == "Maitre") {

		if (gender == 1)
			{
				drug_sets[drug_set_index].vc = 0.111 * mass;
			}
		else
			{
				drug_sets[drug_set_index].vc = 0.111 * 1.15 * mass;
			}
		if (age <= 40)
			{
				drug_sets[drug_set_index].k10 = 0.356 / drug_sets[drug_set_index].vc;
				drug_sets[drug_set_index].k31 = 0.0126;
			}
		else
			{
				drug_sets[drug_set_index].k10 = (0.356 - (.00269 * (age - 40.0))) / drug_sets[drug_set_index].vc;
				drug_sets[drug_set_index].k31 = 0.0126 - (.000113 * (age - 40.0));
			}
		drug_sets[drug_set_index].k12 = 0.104;
		drug_sets[drug_set_index].k13 = 0.0170;
		drug_sets[drug_set_index].k21 = 0.0673;
		drug_sets[drug_set_index].k41 = Math.log(2)/0.9; //scott stanski 1987 Decreased fentanyl and alfentanil dose requirements with age. A simultaneous pharmacokinetic and pharmacodynamic evaluation
		drug_sets[drug_set_index].drug_name = "Alfentanil";

		drug_sets[drug_set_index].conc_units = "ng";
		drug_sets[drug_set_index].infused_units = "mcg";
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mcg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 1;
		drug_sets[drug_set_index].modeltext = "Maitre model (Anesthesiology 1987;66:3-12)" + "<br>" +
		"vc = " + drug_sets[drug_set_index].vc + "<br>" +
		"k10 = " + drug_sets[drug_set_index].k10 + "<br>" + 
		"k12 = " + drug_sets[drug_set_index].k12 + "<br>" +
		"k13 = " + drug_sets[drug_set_index].k13 + "<br>" +
		"k21 = " + drug_sets[drug_set_index].k21 + "<br>" +
		"k31 = " + drug_sets[drug_set_index].k31 + "<br>" +
		"ke0 = " + drug_sets[drug_set_index].k41 + ";<br>" +
		"ke0 derived from Scott & Stanski (J Pharmacol Exp Ther 1987;240:159-166)";
	}
	/*
	if (x == "Shafer (Weight adjusted)") {
		// need to correct CP and CE based on Shibutani 2004 
		// for BW > 
		vc = 6.09;
		k10 = 0.0827;
		k12 = 0.471;
		k13 = 0.225;
		k21 = 0.102;
		k31 = 0.006;
		k41 = Math.log(2)/6.6; //scott 1991, PD fentanyl vs sufentanil 
		//k41 = 0.147; //scott and stanski model
		drug_name = "Fentanyl";
		
		conc_units = "ng";
		infused_units = "mcg";
		inf_rate_permass_factor = 1;
		inf_rate_permass_unit = "mcg/kg/h";
		inf_rate_permass_dp = 100;
	}
	*/
	/*
	if (x == "Shafer") {
		vc = 6.09;
		k10 = 0.0827;
		k12 = 0.471;
		k13 = 0.225;
		k21 = 0.102;
		k31 = 0.006;
		k41 = 0.147;
		drug_name = "Fentanyl";
		infusate_concentration = 10;
		conc_units = "ng";
		infused_units = "mcg";
		inf_rate_permass_factor = 1;
		inf_rate_permass_unit = "mcg/kg/h";
	}
	*/

	//interface changes only for non-first entry
	if (document.getElementById("drugname").innerHTML == "") {
		document.getElementById("drugname").innerHTML = drug_sets[drug_set_index].drug_name;
		if (x == "Eleveld-Remifentanil") x = "Eleveld";
		document.getElementById("modelname").innerHTML = x;
		document.getElementById("modeldescription").innerHTML = drug_sets[drug_set_index].modeltext;
	} else {
	}
}

//bis functions
function BIS_Ce50() {
	return 3.08 * (fageing(-0.00635));
}

function BIS_effect(Ceinput) {
	Ce50 = BIS_Ce50();
	gamma = BIS_gamma(Ceinput);
	drugeffect = Math.pow(Ceinput,gamma) / (Math.pow(Ce50,gamma) + Math.pow(Ceinput,gamma));
	return drugeffect;
}

function BIS_Ce_for_effect(effectinput) {
	Ce50 = BIS_Ce50();
	if (effectinput > 0.5) {
		gamma = 1.47;
	} else {
		gamma = 1.89;
	}
	Ceoutput = Math.pow(effectinput * Math.pow(Ce50,gamma) / (1-effectinput), 1/gamma); 
	return Ceoutput;
}

function BIS_Ce_for_BIS(bisinput) {
	effect = (93 - bisinput) / 93;
	return BIS_Ce_for_effect(effect);
}

function BIS_gamma(Ceinput) {
	Ce50 = BIS_Ce50();
	if (Ceinput <= Ce50) {
		gamma = 1.89; //different theta values for manuscript text vs table - check mmc
	} else {
		gamma = 1.47;
	}
	return gamma;
}

function BIS_estimated(Ceinput) {
	return 93 * (1-BIS_effect(Ceinput));
	// don't know what the residual error +8.03 * epsilon is about, omit
}

BIS_array = new Array();

function BIS_solve_eBIS(paramfrom, paramto) {
	BIS_array.length = 0;
	for (biscounter = 0; biscounter < drug_sets[0].cpt_cp.length; biscounter++) {
		BIS_array.push(Math.round(BIS_estimated(getce(biscounter,0))));
	}
}

function BIS_charting() {
	BIS_solve_eBIS();
	BIS40 = BIS_Ce_for_BIS(40);
	BIS60 = BIS_Ce_for_BIS(60);
	length = drug_sets[0].cpt_cp.length;
	myChart.data.datasets[11].data = [{x:0, y:BIS60},{x:length, y:BIS60}];
	myChart.data.datasets[10].data = [{x:0, y:BIS40},{x:length, y:BIS40}];

}

var updateBIS = null;

function BIS_update(interval) {
	updateBIS = setInterval(function() {
		document.getElementById("ptolcard_right").innerHTML = BIS_array[Math.floor(time_in_s)]
	},interval)
}

function proceedComplex() {
	complex_mode = 1;
	//add chart options PD overlay box
	document.getElementById("chartoverlayoptionscontent").classList.add("PDoptions");
	PD_mode = 2; // PD mode set to PTOL by default
	document.getElementById("select_effect_measure").value = "ptol";

	let model0 = document.getElementById("model_propofol").value;
	let model1 = document.getElementById("model_opioid").value;
	let mode0 = document.getElementById("mode_propofol").value *1;
	let mode1 = document.getElementById("mode_opioid").value *1;

	//propofol code
	//validate first
	
	let validateText = "";
		if (age<12 && (model0=="Marsh" || model0=="Schnider" || model1=="Minto" || model1=="Shafer" || model1=="Maitre")) {
			validateText = validateText.concat("Invalid model: not suitable for children." + "<br>");
		}
		if (mass>=80 && model1=="Shafer") {
			if (select_fen_weightadjusted1.value == "0") {
				validateText = validateText.concat("Warning: Original Shafer model not adjusted to body weight and not recommended for obese. Please select Weight Adjusted model." + "<br>");
				
			}
		}
		if (age>15 && model0=="Paedfusor") {
			validateText = validateText.concat("Invalid model: Paedfusor not suitable for adults." + "<br>");
		}

		if (document.getElementById("select_opioiddilution").value == "custom") {

			temp = document.getElementById("opioiddilution").innerHTML * 1 ;
			if (temp > 500 || temp < 0.1) {
				validateText = validateText.concat("Invalid opioid dilution: must be within 0.1-500mcg/ml" + "<br>");
				document.getElementById("select_opioiddilution").value = "10";
				document.getElementById("custom_opioiddilution").style.display = "none";
			}

		}

	if (validateText != "") {
		displayWarning("Invalid input", validateText);
	} else {

		readmodel(model0,0);
		drug_sets[0].infusate_concentration = 10; //defaults 10 for propofol
		if (mode0 == 0) {
			initcpt();
		} else if (mode0 == 1) {
			initcet();
		} else if (mode0 == 2) {
			initmanual(0);
		} else if (mode0 == 3) {
			initcetbolus(0);
		}

	//opioid code
		readmodel(model1,1);

		if (document.getElementById("select_opioiddilution").value == "custom") {
			drug_sets[1].infusate_concentration=document.getElementById("opioiddilution").innerHTML *1;	
		} else {
			drug_sets[1].infusate_concentration=document.getElementById("select_opioiddilution").value *1;	
		}

		
		if (document.getElementById("model_opioid").value === "Shafer") {
			if (select_fen_weightadjusted1.value == "0") {
	  		drug_sets[1].fentanyl_weightadjusted_flag = 0;
				drug_sets[1].modeltext = `
				Shafer (no coparameters) (Anesthesiology 1990;73(6):1091-1102) <br>
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
				`
	  	} else {
	  		drug_sets[1].fentanyl_weightadjusted_factor = (1+(196.4*Math.exp(-0.025*mass)-53.66)/100);
	  		drug_sets[1].fentanyl_weightadjusted_flag = 1;
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
				`
	  	}
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
	  } // end shafer block
	  if (document.getElementById("model_opioid").value == "Maitre") {
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
	  add_ptol_label(90);
	  add_ptol_label(50);
	  add_ptol_label(10);
	  setTimeout(alignPtolLabels,600);
		if (mode1 == 0) {
			initcpt_complex(1);
		} else if (mode1 == 1) {
			initcet_complex(1);
		} else if (mode1 == 2) {
			initmanual(1);
		} else if (mode1 == 3) {
			initcetbolus(1);
		}

	applyoptions();
	complexinterface_init();
	guessInfusionUnit();
	modal = document.getElementById("modalScreen2");
	hideallmodal();
	} // end of validation success block
}

function complexinterface_init() {
	//assume the following
	//hypnotic_drug_set = 0;
	//analgesic_drug_set = 1;
	//active_drug_set_index = 0;
	//alt_drug_set_index = 1;

	//document.querySelector("#parallaxtop .parallax_drug_name1").innerHTML = drug_sets[active_drug_set_index].drug_name;
	//document.querySelector("#parallaxtop .parallax_drug_model_name").innerHTML = drug_sets[active_drug_set_index].model_name;
	//document.querySelector("#parallaxtop .parallax_drug_conc").innerHTML = "<b>" + drug_sets[active_drug_set_index].infusate_concentration + "</b>" + drug_sets[active_drug_set_index].infused_units + "/ml";
	//document.querySelector("#parallaxbottom .parallax_drug_name1").innerHTML = drug_sets[alt_drug_set_index].drug_name;
	//document.querySelector("#parallaxbottom .parallax_drug_model_name").innerHTML = drug_sets[alt_drug_set_index].model_name;
	//document.querySelector("#parallaxbottom .parallax_drug_conc").innerHTML = "<b>" + drug_sets[alt_drug_set_index].infusate_concentration + "</b>" + drug_sets[alt_drug_set_index].infused_units + "/ml";
	document.querySelector(".leftbar").classList.remove("hide");
	document.getElementById("parallax3").classList.add("hide");
	document.getElementById("bodywrapper").classList.add("narrowbodywrapper");
	if (parseloading == 0) {
		document.getElementById("installbutton").classList.add("complex");
		document.getElementById("sharebutton").classList.add("complex");
		document.getElementById("darkmodebutton").classList.add("complex");
	}


	//chart line border change
	myChart.data.datasets[2].borderDash = [2,2];
	myChart.data.datasets[4].borderDash = [2,2];
	myChart.data.datasets[2].borderColor = yellowSec;
	myChart.data.datasets[3].borderColor = yellowPri50,
	myChart.data.datasets[2].segment = {
	    			borderColor: ctx => behindPosition(ctx, yellowSecDark),
	    			borderWidth: ctx => behindPosition2(ctx, 6)
	    		}
	myChart.data.datasets[3].segment = {
			    	borderColor: ctx => behindPosition(ctx, yellowDark),
	    			borderWidth: ctx => behindPosition2(ctx, 8)
	}
	
	

	//chart fill change

	myChart.data.datasets[2].fill = false;
	myChart.data.datasets[3].backgroundColor = context => {
	    			const chart = context.chart;
	    			const { ctx, chartArea, scales } = chart;
	    			if (!chartArea) {
	    				return null ;
	    			}
	    			return getGradientYellow(ctx, chartArea, scales);
	    		}
	//myChart.data.datasets[5].backgroundColor = context => {
	//    			const chart = context.chart;
	//    			const { ctx, chartArea, scales } = chart;
	//    			if (!chartArea) {
	//    				return null ;
	//    			}
	//    			return getGradientBlue(ctx, chartArea, scales);
	//    		}
	//myChart.data.datasets[2].fill = false;
	//myChart.data.datasets[4].fill = false;


	document.getElementById("cp_propo").innerHTML = "0";
	document.getElementById("ce_propo").innerHTML = "0";
	document.getElementById("inf_propo").innerHTML = "0";
	document.getElementById("cp_opioid").innerHTML = "0";
	document.getElementById("ce_opioid").innerHTML = "0";
	document.getElementById("inf_opioid").innerHTML = "0";

	var conc_units_fields = document.getElementsByClassName("conc_units");
	for (i=0; i<conc_units_fields.length; i++) {
		conc_units_fields[i].innerHTML = drug_sets[active_drug_set_index].conc_units;
	}
	var infused_units_fields = document.getElementsByClassName("infused_units");
	for (i=0; i<infused_units_fields.length; i++) {
		infused_units_fields[i].innerHTML = drug_sets[active_drug_set_index].infused_units;
	}
}

function fclmaturation(x) {
	return fsigmoid(x,42.3,9.06);
}
function fq3maturation(x) { //age already converted to weeks
	return fsigmoid(x+40, 68.3, 1);
}
function fffm() {
	bmi = mass / Math.pow((height/100),2);
	if (gender == 0) {
		return (0.88 + (1-0.88)/(1 + Math.pow((age/13.4),-12.7))) * ((9270 * mass)/(6680+216*bmi));
	} else {
		return (1.11 + (1-1.11)/(1 + Math.pow((age/7.1),-1.1))) * ((9270 * mass)/(8780+244*bmi));
	}
}
function fageing(x) {
	return Math.exp(x*(age-35));
}
function fcentral(x) {
	return fsigmoid(x,33.6,1);
}
function fsigmoid(x,y,z) {
	return Math.pow(x,z) / (Math.pow(x,z) + Math.pow(y,z));
}

function cube(k10, k12, k21, k13, k31, r) {
	//taken from cube.c
	var a0, a1, a2;
	var p, q;
	var phi;
	var r1;
	var toradian;

	toradian = Math.asin(1.0) * 2.0 / 180.0;
	/* first take roots of X^3 + a2X^2 + a1X^1 + a0 = 0 */
    /* where the coefficients are : */
	a0 = k10 * k21 * k31;
	a1 = k10 * k31 + k21 * k31 + k21 * k13 + k10 * k21 + k31 * k12;
	a2 = k10 + k12 + k13 + k21 + k31;

    /* now transform to x^3 + px + q = 0 */
	p = a1 - (a2 * a2 / 3.0);
	q = (2 * a2 * a2 * a2 / 27.0) - (a1 * a2 / 3.0) + a0;
	r1 = Math.sqrt(-(p * p * p) / 27.0);
	phi = (-q / 2.0) / r1;
	if (phi > 1)
		phi = 1;
	else if (phi < -1)
		phi = -1;
	phi = (Math.acos(phi) / 3.0);
	r1 = 2.0 * Math.exp(Math.log(r1) / 3.0);
	r[0] = -(Math.cos(phi) * r1 - a2 / 3.0);
	r[1] = -(Math.cos(phi + 120.0 * toradian) * r1 - a2 / 3.0);
	r[2] = -(Math.cos(phi + 240.0 * toradian) * r1 - a2 / 3.0);	

	r.sort(function(a, b){return a-b});

	r[3] = r[2];
	r[2] = r[1];
	r[1] = r[0];

	//console.log(r[1], r[2], r[3]);
}

function lookahead(bolusgiven, duration, ind) {

	if (duration>0) {
		//this turns arg into a limit for 7200 iterations
	} else {
		duration = 7200;
	}

	if (bolusgiven == 1) {
		var working_clock = Math.floor(time_in_s) + 1;
		drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div>" + "<div class='timespan'>" + converttime(working_clock-1) + "</div> Rate: " + drug_sets[ind].inf_rate_mls + "ml/h</div>");
		drug_sets[ind].historyarrays.push([0,2,working_clock-1,drug_sets[ind].inf_rate_mls]);
	} else {
		var working_clock = Math.floor(time_in_s);
		drug_sets[ind].cpt_cp.length = working_clock;
		drug_sets[ind].cpt_ce.length = working_clock;
		drug_sets[ind].volinf.length = working_clock;	
		drug_sets[ind].cpt_rates_real.length = working_clock;

		drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div>" + "<div class='timespan'>" + converttime(working_clock) + "</div> Rate: " + drug_sets[ind].inf_rate_mls + "ml/h</div>");
		drug_sets[ind].historyarrays.push([0,2,working_clock,drug_sets[ind].inf_rate_mls]);
		document.getElementById("historywrapper").innerHTML = drug_sets[ind].historytext;

		var crosscheck = myChart.data.datasets[ind*2+3].data[myChart.data.datasets[ind*2+3].data.length - 1].y;
		//this is to prevent a very specific error -> in dual mode, if only start inf and not bolus, will hang
		if ((drug_sets[ind].cpt_cp.length>0) && (drug_sets[ind].firstrun>-1) && (crosscheck>0)) {
			myChart.data.datasets[ind*2+2].data.length = myChart.data.datasets[ind*2+2].data.findIndex((element)=>element.x>time_in_s/60);
			myChart.data.datasets[ind*2+3].data.length = myChart.data.datasets[ind*2+3].data.findIndex((element)=>element.x>time_in_s/60);
		} 
	}

	if (drug_sets[ind].firstrun > -1) {
		if (drug_sets[ind].cpt_cp.length>0) {
			p_state[1] = drug_sets[ind].cpt_cp[working_clock-1][0];
			p_state[2] = drug_sets[ind].cpt_cp[working_clock-1][1];
			p_state[3] = drug_sets[ind].cpt_cp[working_clock-1][2];

			e_state[1] = drug_sets[ind].cpt_ce[working_clock-1][0];
			e_state[2] = drug_sets[ind].cpt_ce[working_clock-1][1];
			e_state[3] = drug_sets[ind].cpt_ce[working_clock-1][2];
			e_state[4] = drug_sets[ind].cpt_ce[working_clock-1][3];

			if ((bolusgiven == 0) && (drug_sets[ind].fentanyl_weightadjusted_flag==1)) {
				
					p_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
					p_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
					p_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
					e_state[1] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
					e_state[2] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
					e_state[3] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
					e_state[4] *= 1/drug_sets[ind].fentanyl_weightadjusted_factor;
				
			}
		}
	}
	
	p_state2[1] = p_state[1];
	p_state2[2] = p_state[2];
	p_state2[3] = p_state[3];
	e_state2[1] = e_state[1];
	e_state2[2] = e_state[2];
	e_state2[3] = e_state[3];
	e_state2[4] = e_state[4];

	var look_l1 = Math.exp(-drug_sets[ind].lambda[1]); 
	var look_l2 = Math.exp(-drug_sets[ind].lambda[2]);
	var look_l3 = Math.exp(-drug_sets[ind].lambda[3]);
	var look_l4 = Math.exp(-drug_sets[ind].lambda[4]);
	var look_pump_rate_in_amt = drug_sets[ind].inf_rate_mls * drug_sets[ind].infusate_concentration / 3600;
	var est_cp;
	var est_ce;
	var temp_vol;

	if (drug_sets[ind].volinf.length==0) {
		temp_vol = 0;
	} else {
		temp_vol = drug_sets[ind].volinf[working_clock-1];
	};


	for (i=0; i<duration; i++) {
		temp_vol = temp_vol+look_pump_rate_in_amt/drug_sets[ind].infusate_concentration;
		p_state2[1] = p_state2[1] * look_l1 + drug_sets[ind].p_coef[1] * look_pump_rate_in_amt * (1 - look_l1);
		p_state2[2] = p_state2[2] * look_l2 + drug_sets[ind].p_coef[2] * look_pump_rate_in_amt * (1 - look_l2);
		p_state2[3] = p_state2[3] * look_l3 + drug_sets[ind].p_coef[3] * look_pump_rate_in_amt * (1 - look_l3);
		//if (effect_data)
		//	{
		e_state2[1] = e_state2[1] * look_l1 + drug_sets[ind].e_coef[1] * look_pump_rate_in_amt * (1 - look_l1);
		e_state2[2] = e_state2[2] * look_l2 + drug_sets[ind].e_coef[2] * look_pump_rate_in_amt * (1 - look_l2);
		e_state2[3] = e_state2[3] * look_l3 + drug_sets[ind].e_coef[3] * look_pump_rate_in_amt * (1 - look_l3);
		e_state2[4] = e_state2[4] * look_l4 + drug_sets[ind].e_coef[4] * look_pump_rate_in_amt * (1 - look_l4);

		est_cp = p_state2[1]+p_state2[2]+p_state2[3];
		est_ce = e_state2[1]+e_state2[2]+e_state2[3]+e_state2[4];

		drug_sets[ind].cpt_rates_real.push(look_pump_rate_in_amt);
		drug_sets[ind].cpt_cp.push([p_state2[1],p_state2[2],p_state2[3]]);
		drug_sets[ind].cpt_ce.push([e_state2[1],e_state2[2],e_state2[3],e_state2[4]]);
		drug_sets[ind].volinf.push(temp_vol);
		//charting engine: initially has higher resolution
		if ((i<3*60) && (i%15==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:est_ce});
		}
		if ((i>=3*60) && (i<12*60) && (i%20==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:est_ce});			
		}
		if ((i>=12*60) && (i<39*60) && (i%30==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:est_ce});
		}
		if ((i>=39*60) && (i%60==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:est_ce});
		}

	}
	
	//myChart.data.datasets[ind*2+2].hidden = false;
	//myChart.data.datasets[ind*2+3].hidden = false;
	//myChart.update();
	if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
		apply_fentanyl_correction(ind);
	} else {
		myChart.update();
	}
	if (parseloading == 0) {
		savefile_data();
		ptol_generate_margins(ind,0.9,0.5);
	}
	
}

function sendtowakeup(conc) {
	
	if (result_e>conc) {
		var temp = lookaheadwakeup(conc);
		if (temp<7200) {
			document.getElementById("wakeuptime").innerHTML = converttime(temp);
		} else {
			document.getElementById("wakeuptime").innerHTML = "More than 2h!";
		}
	} else {
		document.getElementById("wakeuptime").innerHTML = "Error";
	}
}

function lookaheadwakeup(conc) {
	var temptime = 7200;
	
	
	if (drug_sets[0].cpt_cp.length>0) {
		//p_state[1] = cpt_cp[Math.floor(time_in_s)-1][0];
		//p_state[2] = cpt_cp[Math.floor(time_in_s)-1][1];
		//p_state[3] = cpt_cp[Math.floor(time_in_s)-1][2];

		e_state[1] = drug_sets[0].cpt_ce[Math.floor(time_in_s)-1][0];
		e_state[2] = drug_sets[0].cpt_ce[Math.floor(time_in_s)-1][1];
		e_state[3] = drug_sets[0].cpt_ce[Math.floor(time_in_s)-1][2];
		e_state[4] = drug_sets[0].cpt_ce[Math.floor(time_in_s)-1][3];
	}

	//p_state2[1] = p_state[1];
	//p_state2[2] = p_state[2];
	//p_state2[3] = p_state[3];
	e_state2[1] = e_state[1];
	e_state2[2] = e_state[2];
	e_state2[3] = e_state[3];
	e_state2[4] = e_state[4];

	for (i=0; i<7200; i++) {
		//p_state2[1] = p_state2[1] * Math.exp(-drug_sets[0].lambda[1]) ;
		//p_state2[2] = p_state2[2] * Math.exp(-drug_sets[0].lambda[2]) ;
		//p_state2[3] = p_state2[3] * Math.exp(-drug_sets[0].lambda[3]) ;
		//if (effect_data)
		//	{
		e_state2[1] = e_state2[1] * Math.exp(-drug_sets[0].lambda[1]);
		e_state2[2] = e_state2[2] * Math.exp(-drug_sets[0].lambda[2]);
		e_state2[3] = e_state2[3] * Math.exp(-drug_sets[0].lambda[3]);
		e_state2[4] = e_state2[4] * Math.exp(-drug_sets[0].lambda[4]);

		est_ce = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];

		if (est_ce < conc) {
			temptime = i;
			break;
		}
	}
	
	return temptime;
}

function retrospective(Tminus, r_bolus, r_infratemls, ind) {
	var working_clock = Math.floor(time_in_s) - Math.ceil(Tminus*60); //go backwards in time, in seconds
	console.log(working_clock);
	//pop the arrays
	drug_sets[ind].cpt_rates.length = 0;
	drug_sets[ind].cpt_times.length = 0;
	drug_sets[ind].historyarray.length = 0;

	drug_sets[ind].cpt_cp.length = working_clock;
	drug_sets[ind].cpt_ce.length = working_clock;

	if (drug_sets[ind].cpt_rates_real.length>0) {
		drug_sets[ind].cpt_rates_real.length = working_clock;
		//add more code here
	}
	drug_sets[ind].volinf.length = working_clock;

	var temp_vol = drug_sets[ind].volinf[working_clock-1];	

	//truncate chart data to working_clock using new algorithm
	//myChart.data.datasets[0].data.length = myChart.data.datasets[0].data.findIndex((element)=>element.x>working_clock/60);
	//myChart.data.datasets[1].data.length = myChart.data.datasets[1].data.findIndex((element)=>element.x>working_clock/60);
	myChart.data.datasets[2+ind*2].data.length = myChart.data.datasets[2+ind*2].data.findIndex((element)=>element.x>working_clock/60);
	myChart.data.datasets[3+ind*2].data.length = myChart.data.datasets[3+ind*2].data.findIndex((element)=>element.x>working_clock/60);

	processhistory();
	
	if ((drug_sets[ind].cpt_active>0) || (drug_sets[ind].cet_active>0)) drug_sets[ind].historytext="";
	drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeretro' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Data was retrospectively filled for " + converttime(Math.ceil(Tminus*60)) + " from " + converttime(working_clock) + " to " + converttime(Math.floor(time_in_s)) + "</div>");
	drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemebolus' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + "Bolus: " + r_bolus + drug_sets[ind].infused_units  + "</div>");
	drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + "Rate: " + r_infratemls + "ml/h"  + "</div>");
	drug_sets[ind].historyarrays.push([4,,Math.floor(time_in_s),"Data retrospectively filled from " + working_clock + "s to " + Math.floor(time_in_s) + "s with bolus (" + drug_sets[ind].infused_units + ") " + r_bolus + " and infusion rate (ml/h) " + r_infratemls]);
	document.getElementById("historywrapper").innerHTML = drug_sets[ind].historytext;
	historydivs = document.getElementById("historywrapper").querySelectorAll("[data-time]"); // need to self-write history divs because of update() will not function

	p_state[1] = drug_sets[ind].cpt_cp[working_clock-1][0];
	p_state[2] = drug_sets[ind].cpt_cp[working_clock-1][1];
	p_state[3] = drug_sets[ind].cpt_cp[working_clock-1][2];
	e_state[1] = drug_sets[ind].cpt_ce[working_clock-1][0];
	e_state[2] = drug_sets[ind].cpt_ce[working_clock-1][1];
	e_state[3] = drug_sets[ind].cpt_ce[working_clock-1][2];
	e_state[4] = drug_sets[ind].cpt_ce[working_clock-1][3];

	p_state2[1] = p_state[1];
	p_state2[2] = p_state[2];
	p_state2[3] = p_state[3];
	e_state2[1] = e_state[1];
	e_state2[2] = e_state[2];
	e_state2[3] = e_state[3];
	e_state2[4] = e_state[4];

	var look_l1 = Math.exp(-drug_sets[ind].lambda[1] ); 
	var look_l2 = Math.exp(-drug_sets[ind].lambda[2] );
	var look_l3 = Math.exp(-drug_sets[ind].lambda[3] );
	var look_l4 = Math.exp(-drug_sets[ind].lambda[4] );
	var look_pump_rate_in_amt = r_infratemls * drug_sets[ind].infusate_concentration / 3600;
	var est_cp;
	var est_ce;

	if (r_bolus>0) {
		p_state2[1] = p_state2[1] * look_l1 + drug_sets[ind].p_coef[1] * r_bolus * (1 - look_l1);
		p_state2[2] = p_state2[2] * look_l2 + drug_sets[ind].p_coef[2] * r_bolus * (1 - look_l2);
		p_state2[3] = p_state2[3] * look_l3 + drug_sets[ind].p_coef[3] * r_bolus * (1 - look_l3);

		e_state2[1] = e_state2[1] * look_l1 + drug_sets[ind].e_coef[1] * r_bolus * (1 - look_l1);
		e_state2[2] = e_state2[2] * look_l2 + drug_sets[ind].e_coef[2] * r_bolus * (1 - look_l2);
		e_state2[3] = e_state2[3] * look_l3 + drug_sets[ind].e_coef[3] * r_bolus * (1 - look_l3);
		e_state2[4] = e_state2[4] * look_l4 + drug_sets[ind].e_coef[4] * r_bolus * (1 - look_l4);


		drug_sets[ind].cpt_cp.push([p_state2[1],p_state2[2],p_state2[3]]);
		drug_sets[ind].cpt_ce.push([e_state2[1],e_state2[2],e_state2[3],e_state2[4]]);
		temp_vol = temp_vol+r_bolus/drug_sets[ind].infusate_concentration;
		drug_sets[ind].volinf.push(temp_vol);
		
		drug_sets[ind].cpt_rates_real.push(0);
		
	}

	for (i=0; i<7200; i++) {
		temp_vol = temp_vol+look_pump_rate_in_amt/drug_sets[0].infusate_concentration;
		p_state2[1] = p_state2[1] * look_l1 + drug_sets[ind].p_coef[1] * look_pump_rate_in_amt * (1 - look_l1);
		p_state2[2] = p_state2[2] * look_l2 + drug_sets[ind].p_coef[2] * look_pump_rate_in_amt * (1 - look_l2);
		p_state2[3] = p_state2[3] * look_l3 + drug_sets[ind].p_coef[3] * look_pump_rate_in_amt * (1 - look_l3);
		//if (effect_data)
		//	{
		e_state2[1] = e_state2[1] * look_l1 + drug_sets[ind].e_coef[1] * look_pump_rate_in_amt * (1 - look_l1);
		e_state2[2] = e_state2[2] * look_l2 + drug_sets[ind].e_coef[2] * look_pump_rate_in_amt * (1 - look_l2);
		e_state2[3] = e_state2[3] * look_l3 + drug_sets[ind].e_coef[3] * look_pump_rate_in_amt * (1 - look_l3);
		e_state2[4] = e_state2[4] * look_l4 + drug_sets[ind].e_coef[4] * look_pump_rate_in_amt * (1 - look_l4);

		est_cp = p_state2[1]+p_state2[2]+p_state2[3];
		est_ce = e_state2[1]+e_state2[2]+e_state2[3]+e_state2[4];

		drug_sets[ind].cpt_cp.push([p_state2[1],p_state2[2],p_state2[3]]);
		drug_sets[ind].cpt_ce.push([e_state2[1],e_state2[2],e_state2[3],e_state2[4]]);
		drug_sets[ind].volinf.push(temp_vol);	
		
		drug_sets[ind].cpt_rates_real.push(look_pump_rate_in_amt);
		
		
		/*
		if ((i%5 == 0) && (working_clock+i < time_in_s)) {
			myChart.data.datasets[0].data.push({x:(working_clock+i)/60, y:est_cp});
			myChart.data.datasets[1].data.push({x:(working_clock+i)/60, y:est_ce});
		}
		*/
		if ((i<1800) && (i%10==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:est_ce});
		}
		if ((i>=1800) && (i%60==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:est_ce});			
		}
	}
	


	//cpt_active = 0;
	//cet_active = 0;
	//manualmode_active = 1;
	//document.getElementById("status").innerHTML="Running";
	//inf_rate_mls = r_infratemls;
	//inf_rate_mgperkg = inf_rate_mls*10/mass;
	//myChart.data.datasets[2].hidden = false;
	//myChart.data.datasets[3].hidden = false;
	myChart.update();

	//UI changes
	if (drug_sets[ind].cpt_active == 1) drug_sets[ind].cpt_active = 0.5;
	if (drug_sets[ind].cet_active == 1) drug_sets[ind].cet_active = 0.5;
	rate2 = Math.round(r_infratemls*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;
	document.getElementById("prompt_msg2").innerHTML = "Retrospective data entry performed!";
	document.getElementById("infusiondescriptor").innerHTML = "Running at " + r_infratemls + "ml/h (" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")";
	document.getElementById("warning").style.display = "none";
	alert_api(0);
}



//who growth validation

//z score calculated by : ((BMI/M)^L - 1) / (S * L)

var timeoutVal = null;


function sendToValidate(arg) {
	El1 = document.getElementById("valRightContainer1");
	El2 = document.getElementById("valRightContainer2");
	El3 = document.getElementById("valCard");
	El4 = document.getElementById("checkConfirm");
	El5 = document.getElementById("checkDisclaim");
	El7 = document.getElementById("valLeft");
	El8 = document.getElementById("patientLeft");
	El9 = document.getElementById("patientRight");
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
	if (paedi_mode == 0) {
		if ((document.getElementById("select_model").value === "Minto") || (document.getElementById("select_model").value === "Eleveld-Remifentanil")) {
			document.getElementById("row_remidilution").style.display = "table-row";
		} else {
			document.getElementById("row_remidilution").style.display = "none";
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
		El4.parentElement.style.visibility = "hidden";
		El5.parentElement.style.visibility = "hidden";
		El3.classList.remove("active");
		El3.classList.add("translate");
		El7.innerHTML = "";
		El8.innerHTML = "";
		El9.innerHTML = "";
	} else {
		clearTimeout(timeoutVal);
		El1.classList.add("valClose");
		El2.classList.remove("valClose");
		El4.parentElement.style.visibility = "visible";
		El5.parentElement.style.visibility = "visible";
		El3.classList.add("active");
		El3.classList.remove("translate");
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

function checkChecked() {
	El4 = document.getElementById("checkConfirm");
	El5 = document.getElementById("checkDisclaim");
	El6 = document.getElementById("btn_initProceed");
	checked = El4.checked && El5.checked;
	if (El4.checked) {
		El4.parentElement.style.borderBottomColor = "rgb(155, 201, 157)";
	} else {
		El4.parentElement.style.borderBottomColor = "transparent";
	}
	if (El5.checked) {
		El5.parentElement.style.borderBottomColor = "rgb(155, 201, 157)";
	} else {
		El5.parentElement.style.borderBottomColor = "transparent";
	}
	if (checked) {
		El6.classList.remove("disabled");
		El6.addEventListener("click", toPageTwo);
	} else {
		El6.classList.add("disabled");
		El6.removeEventListener("click", toPageTwo);
	}
}

function toPageOne() {
  setTimeout(function(){setmodal("modalInitial")},200);
  document.getElementById("modalScreen2").classList.remove("fadein");
  document.getElementById("modalScreen2content").classList.remove("open");
		El4 = document.getElementById("checkConfirm");
		El5 = document.getElementById("checkDisclaim");
		El6 = document.getElementById("btn_initProceed");
		El4.checked = "";
		El5.checked = "";
		El4.parentElement.style.borderBottomColor = "transparent";
		El5.parentElement.style.borderBottomColor = "transparent";
		El6.classList.add("disabled");
		El6.removeEventListener("click", toPageTwo);
}

function toPageTwo() {
	if (initsubmit()==0) {
		//alter the age thing here:
		El9 = document.getElementById("patientRight");
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
		El9.innerHTML = El9.innerHTML.concat("<div style='font-size:70%; border-top:1px solid rgb(167 203 168); padding-top:3px; margin-top:3px; margin-right:5px'>" + document.getElementById("valRightContainer2").innerHTML + "</div>");

		toPageTwoTransition();
		loadoptions();
		if (complex_mode==0) applyoptions();
		document.getElementById("rescuebuttons").style.display="none";
	} else {
		El4 = document.getElementById("checkConfirm");
		El5 = document.getElementById("checkDisclaim");
		El6 = document.getElementById("btn_initProceed");
		El4.checked = "";
		El5.checked = "";
		El4.parentElement.style.borderBottomColor = "transparent";
		El5.parentElement.style.borderBottomColor = "transparent";
		El6.classList.add("disabled");
		El6.removeEventListener("click", toPageTwo);
	}
}

function toPageTwoTransition() {
  setTimeout(function(){setmodal("modalScreen2")},200);
  document.getElementById("modalInitial").classList.remove("fadein");
  document.getElementById("modalInitialcontent").classList.remove("open");
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
	text = "<h1>SimTIVA is a computer simulation program to simulate delivery of total intravenous anaesthesia (TIVA) using a target-controlled infusion (TCI) pump. This progressive web app (PWA) is designed for use on smartphones, tablets and computers.</h1><br><b>Written by Terence Luk, 2023</b>. This work is licensed under GNU General Public License v3.0. Read more about the project <a href='https://simtiva.blogspot.com/2021/10/welcome.html' target='_blank'>here</a>, or contact me on <a href='https://twitter.com/simtiva_app' target='_blank'>Twitter/X</a> for ideas, suggestions or comments. Your advice is greatly appreciated!<br><br>This is an open source project and the source code is published on <a href='https://github.com/luktinghin/simtiva/' target='_blank'>GitHub</a>.<br>Last updated 17/12/2023 (V4.4) Build 95.<br><br>The purposes are: (1) <i> To simulate TCI/TIVA for educational purposes</i>, and (2) <i>Potentially, to help deliver TCI/TIVA in a low resource setting with no TCI pumps available.</i><br>Coding is done in Javascript. The code to the mathematical calculations are based on 'STANPUMP', which is freely available from the link below. The pharmacokinetic models available in this program are Marsh, Schnider, Paedfusor and Eleveld for propofol, and Minto and Eleveld for remifentanil. For instructions on using this app, visit the 'Help' page. For documentation of the pharmacological details, visit the 'Documentation' page.<br><br>Contact us via our <a href='https://simtiva.blogspot.com/p/feedback.html' target='_blank'>blog</a> page; or get in touch on <a href='https://twitter.com/simtiva_app' target='_blank'>Twitter/X</a>.<div class='' style='width:100%; margin-top:2rem; margin-bottom:1rem; background:rgba(128,128,128,0.4); border-bottom:1px solid #198964; font-weight:bold'>Licenses & Legal</div><div class=''>Acknowledgments: this project is made possible with the following-<br><br><b>STANPUMP by Steven L. Shafer</b><br>Freely available at <a href='http://opentci.org/code/stanpump' target='_blank'>OpenTCI-STANPUMP</a><br><br><b>Chart.js</b><br><a href='http://chartjs.org'  target='_blank'>Chart.js</a> is open source and available under the MIT license.<br><br><b>Font Awesome Free</b><br>SIL OFL 1.1 license applies to all icons packaged as font files. <a href='https://github.com/FortAwesome/Font-Awesome' target='_blank'>Source/License</a><br><br><b>WHO Child Growth Standards</b><br>Copyright World Health Organization (WHO), 2021; all rights reserved. Growth chart data (weight & length for age and BMI) from <a href='https://www.who.int/tools/child-growth-standards/standards' target='_blank'>WHO website</a> used for data validation. Computational method using LMS method described <a href='https://www.who.int/growthref/computation.pdf' target='_blank'>here</a>.<br><br><b>LZ-String</b><br>Copyright Pieroxy (2013) under MIT license, from <a href='https://pieroxy.net/blog/pages/lz-string/index.html' target='_blank'>pieroxy.net</a>, used for Javascript string compression.<br><br><span style='color:#ccc'>Source Sans font: Copyright 2010, 2012 Adobe Systems Incorporated (http://www.adobe.com/), with Reserved Font Name 'Source'. All Rights Reserved. Source is a trademark of Adobe Systems Incorporated in the United States and/or other countries, licensed under the SIL Open Font License, Version 1.1 (http://scripts.sil.org/OFL).</span></div><div style='padding-top:1rem;'></div>";
	displayWarning("About", text);
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
				isAbnormal = 1;
				isAbnormalText = "Patient is underweight.";
			} else if ((bmi>=25) && (bmi<29.9)) {
				document.getElementById("bmiForAgeDisplay").innerHTML = " (overweight)";
				isAbnormal = 1;
				isAbnormalText = "Patient is overweight.";
			} else if (bmi>30) {
				document.getElementById("bmiForAgeDisplay").innerHTML = " (obese)";
				isAbnormal = 1;
				isAbnormalText = "Patient is obese.";
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
		displayWarning("Warning", isAbnormalText);
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

function senddataretrospective() {
	temp1 = document.getElementById("retrospectiveTime").value *1;
	temp2 = document.getElementById("retrospectiveBolus").value *1;
	temp3 = document.getElementById("retrospectiveInfusion").value *1;
	temp4 = Math.floor(time_in_s) - temp1*60;
	document.getElementById("minsago").innerHTML = temp1;
	document.getElementById("timeXago").innerHTML = converttime(temp4);
	document.getElementById("displayRetroBolus").innerHTML = temp2;
	document.getElementById("displayRetroInfusion").innerHTML = temp3;
	if (temp4>0) setmodal('modalRetrospective');
}

function confirmretrospective() {
	temp1 = document.getElementById("retrospectiveTime").value *1;
	temp2 = document.getElementById("retrospectiveBolus").value *1;
	temp3 = document.getElementById("retrospectiveInfusion").value *1;
	retrospective(temp1, temp2, temp3, active_drug_set_index);
	drug_sets[active_drug_set_index].desired = 0;
	document.getElementById("inputDesiredCe" + active_drug_set_index).value = "";
	document.getElementById("inputDesired" + active_drug_set_index).value = "";
	window.scrollTo(0,0);
	hideallmodal();
}

function init_rescue(input_uid,external_flag) {

	hideallmodal();
	hidemodal("modalInitial");
	hidemodal("modalLoad");
	document.getElementById("card_cpt0").classList.add("hide");
	document.getElementById("card_cet0").classList.add("hide");
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

function sendtoreanimate(inputtime) {
	duration = inputtime + time_in_s;
	document.getElementById("timestamp_toberesumed").innerHTML = converttime(duration);
}

function submit_reanimate(mode) {
	duration = document.getElementById("reanimate_select").value * 60 + time_in_s;
	
	document.getElementById("top_subtitle").classList.add("topClose");
	document.getElementById("top_title").classList.add("topOpen");
	document.getElementById("card_reanimate").style.display = "none";
	document.getElementById("status").innerHTML = "";

	loadoptions();
	reanimate(duration);

	if (complex_mode == 0) {
			//change the units
			var conc_units_fields = document.getElementsByClassName("conc_units");
			for (i=0; i<conc_units_fields.length; i++) {
				conc_units_fields[i].innerHTML = drug_sets[0].conc_units;
			}
			var infused_units_fields = document.getElementsByClassName("infused_units");
			for (i=0; i<infused_units_fields.length; i++) {
				infused_units_fields[i].innerHTML = drug_sets[0].infused_units;
			}
		}
}

//don't know how useful this is: a promise, vs just parseobject and settimeout
function prepare_environment(input_uid) {
	
	const parsePromise = new Promise(function(myResolve, myReject) {parseobject(input_uid)});
	parsePromise.then(
		function() {
			displayWarning("Success","Data successfully loaded.");
			document.getElementById("card_reanimate").style.display = "block";
			document.getElementById("timestamp_lastdata").innerHTML = object.P_d;
		},
		function() {
			displayWarning("Success","Data successfully loaded.");
			document.getElementById("card_reanimate").style.display = "block";
			document.getElementById("timestamp_lastdata").innerHTML = object.P_d;
			console.log("parse promise reject");
		})

	
}

function displayModalOptions() {
	loadoptions();
	temp_unit = document.getElementById("select_defaultrateunit").options[1].textContent;
	text = `
		<table class="table-control">
					<tr class="fr" id=""><td>Unit <i class="far fa-question-circle tooltip2"><span class="tooltiptext">Preferred secondary unit for propofol infusion.</span></i></td>
						<td>
							<select id="" onchange="document.getElementById('select_unit').value=this.value">
								<option value="mgh" ${(optionsarray[0][0]==1) ? 'selected':''}>mg/kg/h</option>
								<option value="mcgmin" ${(optionsarray[0][1]==1) ? 'selected':''}>mcg/kg/m</option>
							</select>
						</td>
					<tr class="" id=""><td>Default rate unit</td>
						<td>
							<select id="" onchange="document.getElementById('select_defaultrateunit').value=this.value">
								<option value="mlh" ${(optionsarray_infusionunit[0][0]==1) ? 'selected':''}>ml/h</option>
								<option value="unitkgtime" ${(optionsarray_infusionunit[0][0]!=1) ? 'selected':''}>${temp_unit}</option>
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
				<div>&nbsp;</div>
				<a class="button invert" id="" onclick="applyoptions();hidewarningmodal();">Apply</a>
				<a class="button right muted" id="" onclick="loadoptions('default');displayModalOptions();loadoptions();applyoptions();">Reset settings</a>
	`
	displayWarning("Options", text);

}

function reanimate(arg_time) {

	if (arg_time > 0) {
		time_in_s = arg_time;
		time = time_in_s * 1000;
		offset = Date.now();
	} else {
		time = time_in_s * 1000;
		offset = Date.now();
	}

	//start by doing drug_sets[0] first
	//load result // this will affect deliver_cpt to avoid inadvertant bolus
	result = getcp(Math.floor(time_in_s),0);
	result_e = getce(Math.floor(time_in_s),0);

	//copy from common start calls
	document.getElementById("top_subtitle").classList.add("topClose");
	document.getElementById("top_title").classList.add("topOpen");
	document.getElementById("expandbutton").style.display = "block";
	if (complex_mode == 0) {
		var argument = object.P_hx[0][0];
		// 0 is manual
		// 1 is cpt
		// 2 is cet
		loop1 = setInterval(update, 500);
		loop2 = setInterval(runinfusion2, refresh_interval);
		loop3 = setInterval(updatechart, 5000, myChart);
	} else {
		var argument = object.P_hx[0][0][0];
		var argument1 = object.P_hx[1][0][0];
		loop1 = setInterval(update, 500);
		loop2 = setInterval(runinfusion_complex, refresh_interval);
		loop3 = setInterval(updatechart, 5000, myChart);
	}

	if (complex_mode == 1) {
		orig_drug_set_index = active_drug_set_index;
	} else {
		orig_drug_set_index = 0;
	}

	if (argument == 0) {
		active_drug_set_index = 0;
		document.getElementById("card_infusion0").style.display = "";
		
		//document.getElementById("card_bolus" + ind).style.display = "none"; -->no need this, otherwise tabswitch bug
		document.getElementById("card_bolus0").style.display = "";
		if (orig_drug_set_index == 0) {
			document.getElementById("card_bolus0").classList.remove("hide");
			document.getElementById("card_infusion0").classList.remove("hide");
		} else {
			document.getElementById("card_bolus0").classList.add("hide");
			document.getElementById("card_infusion0").classList.add("hide");
		}

		document.getElementById("schemecopytitle").innerHTML = "HISTORY";
		document.getElementById("pastschemeCOPY").style.display = "none";


		document.getElementById('card_cpt0').style.display = 'none';
		document.getElementById('card_cet0').style.display = 'none';
		document.getElementById('card_reanimate').style.display = 'none';
		document.getElementById('card_TimeEstimation').style.display = 'none';
		document.getElementById('card_VolumeEstimation').style.display = 'none';
		drug_sets[0].firstrun = 0;
		drug_sets[0].running = 1;
		/*
	if (document.getElementById("inputBolus_initial").value>0) {
		bolusadmin(document.getElementById("inputBolus_initial").value * 1);
	} else {
		lookahead(0);
	}
	firstrun = 0;
	running = 1;
	*/
	//UI code goes here
	document.getElementById("btn_start0").innerHTML = "Update Rate";
	document.getElementById("tableInitialBolus0").style.display = "none";
	document.getElementById("tableInfusionRate0").classList.remove("line");

	
	document.getElementById("status").innerHTML="Running";
	document.getElementById("iconplay").classList.remove("stop");
	document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
	//document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
	}
	if (argument == 1) {
		document.getElementById("card_infusion0").style.display = "none";
		document.getElementById("card_cet0").style.display = "none";
		document.getElementById("card_cpt0").style.display = "";
		if (orig_drug_set_index == 0) {
			document.getElementById("card_cpt0").classList.remove("hide");
		} else {
			document.getElementById("card_cpt0").classList.add("hide");
		}
		document.getElementById("btn_displayhistory").innerHTML = "Scheme";
		drug_sets[0].cpt_active = 1;
		if (drug_sets[0].fentanyl_weightadjusted_flag == 1) {
			desired = drug_sets[0].fentanyl_weightadjusted_target_uncorrected;
			drug_sets[0].desired = 0;
			deliver_cpt(desired,0,0,0);
		} else {
			deliver_cpt(drug_sets[0].desired,0,0,0);	
		}
		drug_sets[0].running = 1;
	}
	if (argument == 2) {
		if (drug_sets[0].IB_active == 1) { //intermittent bolus active
			drug_sets[0].cet_active = 1;
					document.getElementById("btn_displayhistory").innerHTML = "Scheme";
					document.getElementById("progressbar").style.display = "block";
					//UI change
					document.getElementById("card_cet0").querySelector(".cardtitle").innerHTML = "INTERMITTENT BOLUS";
					document.getElementById("btn_startCet0").setAttribute("onclick", "start_cet_bolus()");
					document.getElementById("IB_about_btn0").style.display = "block";
					document.getElementById("progressbar").style.display = "block";
					document.getElementById("IB_swing_select_row0").style.display = "table-row";
					document.getElementById("IB_interval_row0").style.display = "table-row";
				
		//var tempmodel = document.getElementById("modelname").innerText;
		/*
		if (drug_name=="Propofol") {
			if (tempmodel=="Marsh") {
				document.getElementById("IB_interval").innerText = "1.5-2min";
			}
			if (tempmodel=="Schnider") {
				document.getElementById("IB_interval").innerText = "1.5-2min";
			}
			if (tempmodel=="Eleveld") {
				document.getElementById("IB_interval").innerText = "3.5-4min";	
			}
			if (tempmodel=="Paedfusor") {
				document.getElementById("IB_interval").innerText = "2.5-3.5min";		
			}
		}
		*/
			document.getElementById("IB_swing_select0").value = drug_sets[0].IB_swing;

			//deliver_cet_alt(drug_sets[0].desired);
			//UI code goes here
			//document.getElementById("status").innerHTML="";
			document.getElementById("card_cpt0").style.display = "none";
			document.getElementById("card_infusion0").style.display = "none";
			document.getElementById("card_cet0").style.display = "";
			if (orig_drug_set_index == 0) {
				document.getElementById("card_cet0").classList.remove("hide");
			} else {
				document.getElementById("card_cet0").classList.add("hide");
			}
			document.getElementById("btn_displayhistory").innerHTML = "Scheme";
			document.getElementById("btn_startCet0").innerHTML = "Update Cet";
			
			//document.getElementById("iconplay").classList.remove("stop");
			//document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			//document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			//document.getElementById("pastscheme").classList.add("show");
			drug_sets[0].running = 1;
		} else {
			document.getElementById("card_cpt0").style.display = "none";
			document.getElementById("card_infusion0").style.display = "none";
			document.getElementById("card_cet0").style.display = "";
			if (orig_drug_set_index == 0) {
				document.getElementById("card_cet0").classList.remove("hide");
			} else {
				document.getElementById("card_cet0").classList.add("hide");
			}
			document.getElementById("btn_displayhistory").innerHTML = "Scheme";
			drug_sets[0].cet_active = 1;
			if (drug_sets[0].fentanyl_weightadjusted_flag == 1) {
				alert("uncorrected is 1");
				desired = drug_sets[0].fentanyl_weightadjusted_target_uncorrected;
				drug_sets[0].desired = 0;
				deliver_cet(1,0);
			} else {
				deliver_cet(drug_sets[0].desired,0);	
			}
			drug_sets[0].running = 1;
		}
		if (complex_mode == 0) parseloading = 0;
	}// end of simple mode block
	ptol_generate_margins(0,0.9,0.5);

	if (complex_mode == 1) {
		
		//otherwise this will cause problems in cet/cpt engines
		active_drug_set_index = 1;

		//load result // this will affect deliver_cpt to avoid inadvertant bolus
		result = getcp(Math.floor(time_in_s),1);
		result_e = getce(Math.floor(time_in_s),1);

		//start of complex mode reanimation		
		if (argument1 == 0) {
			document.getElementById('card_cpt1').style.display = 'none';
			document.getElementById('card_cet1').style.display = 'none';
			document.getElementById('card_reanimate').style.display = 'none';
			document.getElementById('card_TimeEstimation').style.display = 'none';
			document.getElementById('card_VolumeEstimation').style.display = 'none';
			drug_sets[1].firstrun = 0;
			drug_sets[1].running = 1;
			/*
		if (document.getElementById("inputBolus_initial").value>0) {
			bolusadmin(document.getElementById("inputBolus_initial").value * 1);
		} else {
			lookahead(0);
		}
		firstrun = 0;
		running = 1;
		*/
		//UI code goes here
		document.getElementById("btn_start1").innerHTML = "Update Rate";
		document.getElementById("tableInitialBolus1").style.display = "none";
		document.getElementById("tableInfusionRate1").classList.remove("line");
		document.getElementById("card_bolus1").style.display ="";
		document.getElementById("card_infusion1").style.display ="";
		
			if (orig_drug_set_index == 1) {
				document.getElementById("status").innerHTML="Running";
				document.getElementById("card_bolus1").classList.remove("hide");
				document.getElementById("card_infusion1").classList.remove("hide");
				document.getElementById("iconplay").classList.remove("stop");
				document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			} else {
				document.getElementById("card_bolus1").classList.add("hide");
				document.getElementById("card_infusion1").classList.add("hide");
			}
		}
		if (argument1 == 1) {
			document.getElementById("card_infusion1").style.display = "none";
			document.getElementById("card_cet1").style.display = "none";
			document.getElementById("card_cpt1").style.display = "";
			
			drug_sets[1].cpt_active = 1;
			if (drug_sets[1].fentanyl_weightadjusted_flag == 1) {
				desired = drug_sets[1].fentanyl_weightadjusted_target_uncorrected;
				drug_sets[1].desired = 0;
				deliver_cpt(desired,0,0,1);
			} else {
				deliver_cpt(drug_sets[1].desired,0,0,1);
			}
			drug_sets[1].running = 1;
			if (orig_drug_set_index == 1) {
				document.getElementById("card_cpt1").classList.remove("hide");
			} else {
				document.getElementById("card_cpt1").classList.add("hide");
			}
		}
		if (argument1 == 2) {
			if (drug_sets[1].IB_active == 1) { //intermittent bolus active
				drug_sets[1].cet_active = 1;
					document.getElementById("btn_displayhistory").innerHTML = "Scheme";
					document.getElementById("progressbar").style.display = "block";
					//UI change
					document.getElementById("card_cet1").querySelector(".cardtitle").innerHTML = "INTERMITTENT BOLUS";
					document.getElementById("btn_startCet1").setAttribute("onclick", "start_cet_bolus()");
					document.getElementById("IB_about_btn1").style.display = "block";
					document.getElementById("progressbar").style.display = "block";
					document.getElementById("IB_swing_select_row1").style.display = "table-row";
					document.getElementById("IB_interval_row1").style.display = "table-row";
					document.getElementById("IB_swing_select1").value = drug_sets[1].IB_swing;
				//deliver_cet_alt(drug_sets[1].desired);
				//UI code goes here
				//document.getElementById("status").innerHTML="";
				document.getElementById("card_cpt1").style.display = "none";
				document.getElementById("card_infusion1").style.display = "none";
				document.getElementById("card_cet1").style.display = "";
				
				if (orig_drug_set_index == 1) {
					document.getElementById("card_cet1").classList.remove("hide");
					document.getElementById("btn_displayhistory").innerHTML = "Scheme";
				} else {
					document.getElementById("card_cet1").classList.add("hide");
				}
				document.getElementById("btn_startCet1").innerHTML = "Update Cet";
				//document.getElementById("iconplay").classList.remove("stop");
				//document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
				//document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
				//document.getElementById("pastscheme").classList.add("show");
				drug_sets[1].running = 1;
			} else {
				document.getElementById("card_cpt1").style.display = "none";
				document.getElementById("card_infusion1").style.display = "none";
				document.getElementById("card_cet1").style.display = "";
				if (orig_drug_set_index == 1) {
					document.getElementById("card_cet1").classList.remove("hide");
					document.getElementById("btn_displayhistory").innerHTML = "Scheme";
				} else {
					document.getElementById("card_cet1").classList.add("hide");
				}
				drug_sets[1].cet_active = 1;
				if (drug_sets[1].fentanyl_weightadjusted_flag == 1) {
					desired = drug_sets[0].fentanyl_weightadjusted_target_uncorrected;
					drug_sets[0].desired = 0;
					deliver_cet(desired,1);
				} else {
					deliver_cet(drug_sets[1].desired,1);
				}
				drug_sets[1].running = 1;
			}

		} // end mode 2
		ptol_generate_margins(1,0.9,0.5);

		setTimeout(function() {
			loop4 = setInterval(updatechart2, 5000);
			loop5 = setInterval(updatechart3, 1000);
		},750);
		parseloading = 0;
		tabswitch(orig_drug_set_index);
		
	} //end complex mode block
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

function hide_prompts(object) {
	object.style.display="none";
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
			cpt_threshold = 0.08;
			cpt_avgfactor = 0.667;
			document.getElementById("select_threshold").value = 0;
		} else if (optionsarray[2].indexOf(1) == 1) {
			cpt_threshold_auto = 0;
			cpt_threshold = 0.13;
			cpt_avgfactor = 0.55;		
			document.getElementById("select_threshold").value = 1;
		} else if (optionsarray[2].indexOf(1) == 2) {
			cpt_threshold_auto = 0;
			cpt_threshold = 0.08;
			cpt_avgfactor = 0.667;
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
	if ((localStorage.getItem("OPTIONSINFUSIONUNIT")==null) || (reset == "default")) {
		optionsarray_infusionunit[0] = [1,0];
	} else {
		optionsarray_infusionunit = JSON.parse(localStorage.getItem("OPTIONSINFUSIONUNIT"));
		//make a guess for infusion unit
		guessInfusionUnit();
	}	
}

function guessInfusionUnit() {
	let temp_unit = "mg/kg/h";
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
			if (document.getElementById("select_unit").value == "mcgmin") temp_unit = "mcg/kg/m";
		} else if (paedi_mode == 0 && document.getElementById("select_model").value == "Shafer") {
			temp_unit = "mcg/kg/h";
		} else if ((paedi_mode == 0 && document.getElementById("select_model").value == "Complex") ||
				   (paedi_mode == 1 && document.getElementById("select_model_paedi").value == "Complex")) {
			//this is complex mode
			//assume this is like propofol
			if (document.getElementById("select_unit").value == "mcgmin") {
				temp_unit = "mcg/kg/m";
			} else {
				temp_unit = "mg/kg/h";
			}
		} else {
			//all others is mcg/kg/m
			temp_unit = "mcg/kg/m";
		}
	} else {
		//this has already been initiated.
		temp_unit = drug_sets[0].inf_rate_permass_unit;
	}
	//if there's complex mode and see if it's been initiated.
	if (complex_mode == 1 && drug_sets.length>0) {
		temp_unit1 = drug_sets[1].inf_rate_permass_unit;	
	} else if (complex_mode == 1 && drug_sets.length==0) {
		temp_unit1 = "mcg/kg/m";
	}
	//get whether mode is ml/h or unit/kg/time mode.
	//write temp_unit to (1) infusion0 box and infusion1 box descriptions, (2) option item of options dialog
	if (optionsarray_infusionunit[0][0] == 1) {
		document.getElementById("select_defaultrateunit").value = "mlh";
		if (complex_mode == 0) {
			document.getElementById("infusionratedescription0").innerHTML = "Infusion rate (ml/h)";
			document.getElementById("select_defaultrateunit").options[1].textContent = temp_unit;	
		} else {
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
			document.getElementById("infusionratedescription1").innerHTML = "Infusion rate (" + temp_unit1 + ")";
			if (active_drug_set_index == 0) {
				document.getElementById("select_defaultrateunit").options[1].textContent = temp_unit;	
			} else {
				document.getElementById("select_defaultrateunit").options[1].textContent = temp_unit1;	
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
		cpt_threshold = 0.08;
		cpt_avgfactor = 0.667;
		optionsarray.push([1,0,0]);
	} else if (x==1) {
		cpt_threshold_auto = 0;
		cpt_threshold = 0.13;
		cpt_avgfactor = 0.55;		
		optionsarray.push([0,1,0]);
	} else if (x==2) {
		cpt_threshold_auto = 0;
		cpt_threshold = 0.08;
		cpt_avgfactor = 0.667;
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


var ringtimeout = null;
var ringactive = 0;

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


function output(resolution, duration) {
	//processhistory();
	var title1 = new Array();
	arrTEMP.length=0;
	var arrTABLE = new Array();
	var temp = 0;
	var counter = 0; //index bottom for manual
	var counter_next = 999; //index top for manual

	//validate duration
	if ((duration>0) && (duration<cpt_cp.length)) {
		var working_clock = duration;
	} else {
		var working_clock = Math.floor(time_in_s);
	}

	if (historyarrays[0][0] == 0) title1.push(["","------------------- manual mode -------------------","","","",""]);
	if (historyarrays[0][0] == 1) title1.push(["","------------------- CPT mode -------------------","","","",""]);
	if (historyarrays[0][0] == 2) title1.push(["","------------------- CET mode -------------------","","","",""]);

	
	var string = "BW: " + mass + "kg; BH: " + height + "cm; Age: " + age + "y; Gender: " + document.getElementById('gender').innerHTML + "; Model: " + document.getElementById('modelname').innerHTML + "; Last active threshold mode: " + document.getElementById('select_threshold').options[document.getElementById('select_threshold').selectedIndex].text;
	title1.push(["",string,"","","","",""]);
	title1.push(["","--------------------------------","","","","",""]);
	

	title1.push(["Time","Remarks","Rate","Cp","Ce","Vol. infused"]);

	for (i=0; i<historyarrays.length; i++) {
		//every CPT scheme is finished with an infusion scheme [i][2]
		//every CET shceme is finished with an infusion scheme [i][2] too
		if (historyarrays[i][1] == 0) {
			arrTEMP.push([historyarrays[i][2],"Target (" + conc_units + "/ml): " + historyarrays[i][3],"","","",""]);
		} 
		if (historyarrays[i][1] == 1) arrTEMP.push([historyarrays[i][2],"Bolus (" + infused_units + "): " + historyarrays[i][3],"","","",""]);
		if (historyarrays[i][1] == 3) arrTEMP.push([historyarrays[i][2],"Pause for (s): " + historyarrays[i][3],"", "", "",""]);
		if (historyarrays[0][0] == 0) { //if manual mode
			if (historyarrays[i][1] == 2) arrTEMP.push([historyarrays[i][2],"Infusion rate (ml/h): " + historyarrays[i][3], "", "", "",""]);
		} else {
			if (historyarrays[i][1] == 2) {
				//need to check if the next one has a time point less than this one, and if so, omit this one, this is for CET when the inf regimen is later than "current"
				//first, if this is not the last one
				if (i<historyarrays.length-1) {
					if (historyarrays[i+1][2]>historyarrays[i][2]) arrTEMP.push([historyarrays[i][2],"Infusion scheme: " + outputformathistory(historyarrays[i][3]), "", "", "",""]);	
				} else { //just push if this is the last one
					arrTEMP.push([historyarrays[i][2],"Infusion scheme: " + outputformathistory(historyarrays[i][3]), "", "", "",""]);
				}
			}
		}
		if (historyarrays[i][0] == 4) arrTEMP.push([historyarrays[i][2],historyarrays[i][3],, "", "", "",""]);		
		//historyarrays[i][0] == 4 means retrospective
	}
	
	for (i=0; i<working_clock; i++) {
		if (i == temp) {
			INNERLOOPo: for (j=0; j<arrTEMP.length; j++) {
				if (arrTEMP[j][0] == i)	{
					arrTABLE.push(arrTEMP[j])
				} else if (arrTEMP[j][0]>temp) {
					temp = arrTEMP[j][0];
					//console.log(temp);
					break INNERLOOPo;
				};
			}
		}
		if (i%resolution == 0){
			arrTABLE.push([i,"",cpt_rates_real[i],cpt_cp[i][0]+cpt_cp[i][1]+cpt_cp[i][2],cpt_ce[i][0]+cpt_ce[i][1]+cpt_ce[i][2]+cpt_ce[i][3],volinf[i]]);
		}
	}
	//console.log(title1);
	var outputarray = title1.concat(arrTABLE);

const csv = outputarray.map(row => row.map(item => (typeof item === 'string' && item.indexOf(',') >= 0) ? `"${item}"`: String(item)).join(',')).join('\n');







const blob = new Blob([csv], {type: 'text/csv'});
if(window.navigator.msSaveOrOpenBlob) {
	window.navigator.msSaveBlob(blob, 'export.csv');
} else {
	var elem = document.getElementById('downloadfile');
	elem.href = window.URL.createObjectURL(blob);
	elem.download = 'export.csv';
	//document.body.appendChild(elem);
	elem.click();
	//document.body.removeChild(elem);
}


/* old save code

// Format the CSV string
const data = encodeURI('data:text/csv;charset=utf-8,' + csv);

// Create a virtual Anchor tag
const link = document.createElement('a');
link.setAttribute('href', data);
link.setAttribute('download', 'export.csv');

// Append the Anchor tag in the actual web page or application
document.body.appendChild(link);

// Trigger the click event of the Anchor link
link.click();

// Remove the Anchor link form the web page or application
document.body.removeChild(link);

*/


}

function outputformathistory(tempArray) {
	var text = "";
	for (j=0; j<tempArray.length; j++) {
		text = text.concat(converttime(tempArray[j][0]) + ": " + Math.round(tempArray[j][1]*3600)/10 + "ml/h");
		if (j<tempArray.length-1) text = text.concat("; ");
	}
	return text;
}

function outputscheme(arg1, arg2) {
	//arg1 and arg2 for date display. because in viewer app the date object is lost (not an object)

	currenttime = Math.floor(time_in_s);

	var content = new Array();
	content[0] = new Array();

	if (complex_mode == 1) { //check if there is something in drug_sets1
		if (drug_sets[1].cpt_cp.length>1) content[1] = new Array();
	}


	//first line content 0
	content[0].push("Started at " + d.toLocaleDateString() + " " + d.toLocaleTimeString() + ", time elapsed: " + converttime(Math.floor(time_in_s)));
	//second line content 0
	var string = "Patient: " + mass + "kg/" + height + "cm; " + age + "years; " + document.getElementById('gender').innerHTML; 
	content[0].push(string);

	/* ??not sure what arg1 and arg2 does (Jun 11)

	if (arg1 == 1) { //receives argument 1 to escape date problem in viewer app
		content.push("Started at " + arg2 + ", time elapsed: " + converttime(Math.floor(time_in_s)));
	}
	else {
		content.push("Started at " + d.toLocaleDateString() + " " + d.toLocaleTimeString() + ", time elapsed: " + converttime(Math.floor(time_in_s)));
	}
	*/

	if (drug_sets[0].cpt_cp.length>1) {
		for (z=0; z<content.length; z++) {

			if (drug_sets[z].historyarrays[0][0] == 0) content[z].push(drug_sets[z].drug_name + " (" + drug_sets[z].infusate_concentration + drug_sets[z].infused_units + "/ml) - " + drug_sets[z].model_name + " (Manual mode)");
			if (drug_sets[z].historyarrays[0][0] == 1) content[z].push(drug_sets[z].drug_name + " (" + drug_sets[z].infusate_concentration + drug_sets[z].infused_units + "/ml) - " + drug_sets[z].model_name + " (CPT mode)");
			if (drug_sets[z].historyarrays[0][0] == 2) content[z].push(drug_sets[z].drug_name + " (" + drug_sets[z].infusate_concentration + drug_sets[z].infused_units + "/ml) - " + drug_sets[z].model_name + " (CET mode)");


			for (i=0; i<drug_sets[z].historyarrays.length; i++) {
				//every CPT scheme is finished with an infusion scheme [i][2]
				//every CET shceme is finished with an infusion scheme [i][2] too
				if (drug_sets[z].historyarrays[i][1] == 0) {
					content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Target: (" + drug_sets[z].conc_units + "/ml): " + drug_sets[z].historyarrays[i][3]);
				} 
				if (drug_sets[z].historyarrays[i][1] == 1) content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Bolus (" + drug_sets[z].infused_units + "): " + drug_sets[z].historyarrays[i][3]);
				if (drug_sets[z].historyarrays[i][1] == 3) content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Pause for (s): " + drug_sets[z].historyarrays[i][2]);
				if (drug_sets[z].historyarrays[0][0] == 0) { //if manual mode
					if (drug_sets[z].historyarrays[i][1] == 2) content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Infusion rate (ml/h): " + drug_sets[z].historyarrays[i][3]);
				} else {
					if (drug_sets[z].historyarrays[i][1] == 2) {
						//an infusion scheme for example in cpt mode
						//need to check if the next one has a time point less than this one, and if so, omit this one, this is for CET when the inf regimen is later than "current"
						//first, if this is not the last one
						if (i<drug_sets[z].historyarrays.length-1) {
							if (drug_sets[z].historyarrays[i+1][2]>drug_sets[z].historyarrays[i][2]) content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Infusion scheme: ");
							for (j=0; j<drug_sets[z].historyarrays[i][3].length; j++) {
								if ((drug_sets[z].historyarrays[i][3][j][0]<currenttime) && (drug_sets[z].historyarrays[i][3][j][1]>0)) content[z].push("     -  " + converttime(drug_sets[z].historyarrays[i][3][j][0]) + ": " + Math.round(drug_sets[z].historyarrays[i][3][j][1]*3600/drug_sets[z].infusate_concentration*10)/10 + "ml/h");
							}
						} else { //just push if this is the last one
							content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Infusion scheme:");
							for (j=0; j<drug_sets[z].historyarrays[i][3].length; j++) {
								if (drug_sets[z].historyarrays[i][3][j][1]>0) content[z].push("     -  " + converttime(drug_sets[z].historyarrays[i][3][j][0]) + ": " + Math.round(drug_sets[z].historyarrays[i][3][j][1]*3600/drug_sets[z].infusate_concentration*10)/10 + "ml/h");
							}
						}
					}
				}
				if (drug_sets[z].historyarrays[i][0] == 4) content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + drug_sets[z].historyarrays[i][3]);
			}

		}
	} else {
			z=1;
			if (drug_sets[z].historyarrays[0][0] == 0) content[z].push(drug_sets[z].drug_name + " (" + drug_sets[z].infusate_concentration + drug_sets[z].infused_units + "/ml) - " + drug_sets[z].model_name + " (Manual mode)");
			if (drug_sets[z].historyarrays[0][0] == 1) content[z].push(drug_sets[z].drug_name + " (" + drug_sets[z].infusate_concentration + drug_sets[z].infused_units + "/ml) - " + drug_sets[z].model_name + " (CPT mode)");
			if (drug_sets[z].historyarrays[0][0] == 2) content[z].push(drug_sets[z].drug_name + " (" + drug_sets[z].infusate_concentration + drug_sets[z].infused_units + "/ml) - " + drug_sets[z].model_name + " (CET mode)");


			for (i=0; i<drug_sets[z].historyarrays.length; i++) {
				//every CPT scheme is finished with an infusion scheme [i][2]
				//every CET shceme is finished with an infusion scheme [i][2] too
				if (drug_sets[z].historyarrays[i][1] == 0) {
					content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Target: (" + drug_sets[z].conc_units + "/ml): " + drug_sets[z].historyarrays[i][3]);
				} 
				if (drug_sets[z].historyarrays[i][1] == 1) content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Bolus (" + drug_sets[z].infused_units + "): " + drug_sets[z].historyarrays[i][3]);
				if (drug_sets[z].historyarrays[i][1] == 3) content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Pause for (s): " + drug_sets[z].historyarrays[i][2]);
				if (drug_sets[z].historyarrays[0][0] == 0) { //if manual mode
					if (drug_sets[z].historyarrays[i][1] == 2) content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Infusion rate (ml/h): " + drug_sets[z].historyarrays[i][3]);
				} else {
					if (drug_sets[z].historyarrays[i][1] == 2) {
						//an infusion scheme for example in cpt mode
						//need to check if the next one has a time point less than this one, and if so, omit this one, this is for CET when the inf regimen is later than "current"
						//first, if this is not the last one
						if (i<drug_sets[z].historyarrays.length-1) {
							if (drug_sets[z].historyarrays[i+1][2]>drug_sets[z].historyarrays[i][2]) content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Infusion scheme: ");
							for (j=0; j<drug_sets[z].historyarrays[i][3].length; j++) {
								if ((drug_sets[z].historyarrays[i][3][j][0]<currenttime) && (drug_sets[z].historyarrays[i][3][j][1]>0)) content[z].push("     -  " + converttime(drug_sets[z].historyarrays[i][3][j][0]) + ": " + Math.round(drug_sets[z].historyarrays[i][3][j][1]*3600/drug_sets[z].infusate_concentration*10)/10 + "ml/h");
							}
						} else { //just push if this is the last one
							content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Infusion scheme:");
							for (j=0; j<drug_sets[z].historyarrays[i][3].length; j++) {
								if (drug_sets[z].historyarrays[i][3][j][1]>0) content[z].push("     -  " + converttime(drug_sets[z].historyarrays[i][3][j][0]) + ": " + Math.round(drug_sets[z].historyarrays[i][3][j][1]*3600/drug_sets[z].infusate_concentration*10)/10 + "ml/h");
							}
						}
					}
				}
				if (drug_sets[z].historyarrays[i][0] == 4) content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + drug_sets[z].historyarrays[i][3]);
			}
		}



	
	
	return content;
}

function outputstring() {
	//declare all variables and shorten to Param values
	var P_time = Math.floor(time_in_s);
	
	//no matter simple vs complex, it is still using same P_patient variable
	//use P_patient.length>11 to differentiate simple vs complex, or use P_hx type number vs array
	var P_patient = outputpatientstring();
 	var dataobject = outputdataobject();

	

	
	var P_d = d.toLocaleDateString() + " " + d.toLocaleTimeString();
	
	var name = document.getElementById("inputFileName").value;
	if ((name == undefined) || (name.length == 0)) name = "";
	let outputobject = {
		name: name,
		P_time: P_time,
		P_patient: P_patient,
		P_d: P_d,
		...dataobject
	};
	return JSON.stringify(outputobject);
}

function outputdataobject() {
	var P_ev = eventArray;
	//need differentiate simple vs complex
	//modify and shorten history arrays to remove infusion scheme and IB schemes - for CPT or CET algorithm
	if (complex_mode == 0) {
		if ((drug_sets[0].historyarrays[0][0]==1) || (drug_sets[0].historyarrays[0][0]==2)) {
			var P_hx = new Array();
			for (qq=0; qq<drug_sets[0].historyarrays.length; qq++) {
				if (drug_sets[0].historyarrays[qq][1]==0) { //this is desired
					P_hx.push(drug_sets[0].historyarrays[qq]);
				}
			}
		} else {
			var P_hx = drug_sets[0].historyarrays;	
		}

		var P_length = drug_sets[0].cpt_rates_real.length;
	} else {
		//complex mode, code it twice , for P_hx
		P_hx = new Array();
		P_hx_0 = new Array();
		P_hx_1 =  new Array();
		if (drug_sets[0].firstrun>-1) {
			if ((drug_sets[0].historyarrays[0][0]==1) || (drug_sets[0].historyarrays[0][0]==2)) {
				for (qq=0; qq<drug_sets[0].historyarrays.length; qq++) {
					if (drug_sets[0].historyarrays[qq][1]==0) { //this is desired
						P_hx_0.push(drug_sets[0].historyarrays[qq]);
					}
				}
			} else {
				var P_hx_0 = drug_sets[0].historyarrays;	
			}
		}
		if (drug_sets[1].firstrun>-1) {
			if ((drug_sets[1].historyarrays[0][0]==1) || (drug_sets[1].historyarrays[0][0]==2)) {
				for (qq=0; qq<drug_sets[1].historyarrays.length; qq++) {
					if (drug_sets[1].historyarrays[qq][1]==0) { //this is desired
						P_hx_1.push(drug_sets[1].historyarrays[qq]);
					}
				}
			} else {
				var P_hx_1 = drug_sets[1].historyarrays;	
			}
		}
		P_hx.push(P_hx_0);
		P_hx.push(P_hx_1);

		P_length = new Array();
		P_length.push(drug_sets[0].cpt_rates_real.length);
		P_length.push(drug_sets[1].cpt_rates_real.length);
	}
	let outputobject = {
		P_ev : P_ev,
		P_hx: P_hx,
		P_length: P_length
	}
	return outputobject;
}

function outputpatientstring() {
	P_patient = new Array();
	if (complex_mode == 0) {
		
		P_patient.push(drug_sets[0].model_name);
		P_patient.push(drug_sets[0].drug_name);
		P_patient.push(drug_sets[0].infusate_concentration);
		P_patient.push(drug_sets[0].conc_units);
		P_patient.push(mass);
		P_patient.push(height);
		//array pos 6 is age. if array -> paedi mode is ON.
		if (paedi_mode == 0) {
			P_patient.push(age);
		} else {
			P_patient.push([document.getElementById("inputAgePaedi").value*1,ageunit,document.getElementById("inputPMA").value*1]);
		}
		P_patient.push(document.getElementById('gender').innerHTML);
		P_patient.push(drug_sets[0].infused_units);
		P_patient.push(drug_sets[0].infusate_concentration); //useless but for legacy
		if (P_patient[0]=="Shafer") {
			if (drug_sets[0].fentanyl_weightadjusted_flag == 0) {
				P_patient.push(0); // P_patient[10] is now fentanyl_weightadjusted_flag
			} else {
				P_patient.push(1);
				P_patient.push(drug_sets[0].fentanyl_weightadjusted_factor);
			}
		}

		//simple mode, P_patient.length would not be more than 11
	} else {
		//complex mode
		P_patient.push(drug_sets[0].model_name);
		P_patient.push(drug_sets[0].drug_name);
		P_patient.push(drug_sets[0].infusate_concentration);
		P_patient.push(drug_sets[0].conc_units);
		P_patient.push(mass);
		P_patient.push(height);
		//array pos 6 is age. if array -> paedi mode is ON.
		if (paedi_mode == 0) {
			P_patient.push(age);
		} else {
			P_patient.push([document.getElementById("inputAgePaedi").value*1,ageunit,document.getElementById("inputPMA").value*1]);
		}
		P_patient.push(document.getElementById('gender').innerHTML);
		P_patient.push(drug_sets[0].infused_units);
		P_patient.push(drug_sets[0].infusate_concentration); //useless but for legacy

		P_patient[10] = drug_sets[1].model_name;
		P_patient[11] = drug_sets[1].drug_name;
		P_patient[12] = drug_sets[1].infusate_concentration;
		P_patient[13] = drug_sets[1].conc_units;
		P_patient[14] = drug_sets[1].infused_units;
		//P_patient[15] = drug_sets[1].infusate_concentration;  //useless

		if (P_patient[10]=="Shafer") {
			if (drug_sets[1].fentanyl_weightadjusted_flag == 0) {
				P_patient.push(0); // P_patient[10] is now fentanyl_weightadjusted_flag
			} else {
				P_patient.push(1);
				P_patient.push(drug_sets[1].fentanyl_weightadjusted_factor);
			}
		}
	}
	return P_patient;
}

function readURL() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const inputString = LZString.decompressFromEncodedURIComponent(urlParams.get("P"));
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

function savefile_patient() {
	//copy from outputstring
	//P_time = Math.floor(time_in_s);
	var P_patient = outputpatientstring();
	var P_d = d.toLocaleDateString() + " " + d.toLocaleTimeString();
	var name = document.getElementById("inputFileName").value;
	if ((name == undefined) || (name.length == 0)) name = "";
	let outputobject = {
		name: name,
		P_patient: P_patient,
		P_d: P_d
	};
	localStorage.setItem(uid + "PATIENT",JSON.stringify(outputobject));
}

function savefile_data() {
	let outputobject = outputdataobject();
	localStorage.setItem(uid + "DATA",JSON.stringify(outputobject));
}

function savefile_time() {
	localStorage.setItem(uid + "TIME", Math.round(time_in_s));
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
								<div class="file_content_line3">${tempObject.P_patient[7]}/${tempAgeString}, BW:${tempObject.P_patient[4]}kg, BH: ${tempObject.P_patient[5]}cm</div>
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

/*
async function downloadExcel() {
    const cvrt = await import('../csv/src/Csv2Xlsx.js');

    // Meta-Data of the xlsx
    const metaData = {
        title: 'My Demo Spreadsheet',
        subject: 'A Demo for CSV to XLSX',
        
        
        
       
        
    };

    // download the csv and convert it to a excel file
    const aTag = await cvrt.Csv2Xlsx.convertCsv(testkeys(), 'mynewfilename.xlsx', metaData);

    // return value is a <a> element, add it to the DOM to start the download
    document.body.appendChild(aTag);

    // start the download automatically
    aTag.click();
}
*/

var inputname = "";

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

var importDataArray = new Array();

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
	mass = object.P_patient[4];
	
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
						deliver_cpt(parse_historyarray[count][3],0,0,0); //for cpt mode effect flag is 0, third param is for compen, 4th param is drug_set
					} else {
						pauseCpt(0);
					}
				} else {
					if (parse_historyarray[count][3]>0) {
						deliver_cpt(parse_historyarray[count][3],0,0,0); //for cpt mode effect flag is 0
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
							deliver_cet(parse_historyarray[count][3],0); 
						} else {
							pauseCpt(0);
						}
					} else {
						if (parse_historyarray[count][3]>0) {
							deliver_cet(parse_historyarray[count][3],0); 
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
					duration = parse_historyarray[count][2] + 7200;
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
						duration = parse_historyarray[count][2] + 7200;
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
						duration = parse_historyarray[count][2] + 7200;
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
							if (parse_historyarray1[count][3]) {
								deliver_cpt(parse_historyarray1[count][3],0,0,1); //for cpt mode effect flag is 0, third param is for compen, 4th param is drug_set
							} else {
								pauseCpt(1);
							}
						} else {
							if (parse_historyarray1[count][3]) {
								deliver_cpt(parse_historyarray1[count][3],0,0,1); //for cpt mode effect flag is 0
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
									deliver_cet(parse_historyarray1[count][3],1); 
								} else {
									pauseCpt(1);
								}
							} else {
								if (parse_historyarray1[count][3]>0) {
									deliver_cet(parse_historyarray1[count][3],1); 
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
					duration = parse_historyarray1[count][2] + 7200;
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
						duration = parse_historyarray1[count][2] + 7200;
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
						duration = parse_historyarray1[count][2] + 7200;
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
	document.getElementById("bw").innerHTML = mass + "kg";
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
				myChart.options.scales.x.grid.color = "rgba(255,255,255,0.2)";
				myChart.options.scales.y.grid.color = "rgba(255,255,255,0.2)";
				myChart.options.scales.x.grid.borderColor = "rgba(255,255,255,0.6)";
				myChart.options.scales.y.grid.borderColor = "rgba(255,255,255,0.6)";
				myChart.options.scales.x.ticks.color = "rgba(255,255,255,0.6)";
				myChart.options.scales.y.ticks.color = "rgba(255,255,255,0.6)";
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
			myChart.update();
			myChart2.update();
			isDark = true;
	} else {
		var metaThemeColor = document.querySelector("meta[name=theme-color]");
		metaThemeColor.setAttribute("content", "#7B8092");
		document.getElementById("darkmodebutton").innerHTML = "<i class='fas fa-moon fa-fw'></i>";
		document.getElementById("windowbody").classList.remove("dark");
				myChart.options.scales.x.grid.color = "rgba(0,0,0,0.1)";
				myChart.options.scales.y.grid.color = "rgba(0,0,0,0.1)";
				myChart.options.scales.x.grid.borderColor = "rgba(0,0,0,0.25)";
				myChart.options.scales.y.grid.borderColor = "rgba(0,0,0,0.25)";
				myChart.options.scales.x.ticks.color = "rgba(102,102,102,1)";
				myChart.options.scales.y.ticks.color = "rgba(102,102,102,1)";
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
				myChart.update();
				myChart2.update();
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
		/*
		if (complex_mode == 1) {
			setTimeout(function() {
				//reset chart datasets
				if (active_drug_set_index == 0) {
					  myChart.data.datasets[2].hidden=false;
	    			myChart.data.datasets[3].hidden=false;
	    			//myChart.data.datasets[6].hidden=false;
	    			//myChart.data.datasets[7].hidden=false;
	    			myChart.data.datasets[4].hidden=true;
	    			myChart.data.datasets[5].hidden=true;
	    			//myChart.data.datasets[8].hidden=true;
	    			//myChart.data.datasets[9].hidden=true;
	    			//updatechart();
				} else {
					  myChart.data.datasets[2].hidden=true;
	    			myChart.data.datasets[3].hidden=true;
	    			//myChart.data.datasets[6].hidden=true;
	    			//myChart.data.datasets[7].hidden=true;
	    			myChart.data.datasets[4].hidden=false;
	    			myChart.data.datasets[5].hidden=false;
	    			//myChart.data.datasets[8].hidden=false;
	    			//myChart.data.datasets[9].hidden=false;
	    			//updatechart();
				}
				toggleEffectEst();
				updatechart();
			},1000);
		}
		*/
	
	

	
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

/*obsolete as new code for tooltip destruction for event listener touchend is successful
function hidetooltip() {
	myChart.options.plugins.tooltip.backgroundColor = "#0000";
	myChart.options.plugins.tooltip.bodyColor = "#0000";
	myChart.options.plugins.tooltip.footerColor = "#0000";
	myChart.options.plugins.tooltip.displayColors = false;
}

function showtooltip() {
	myChart.options.plugins.tooltip.backgroundColor = "#0008";
	myChart.options.plugins.tooltip.bodyColor = "#fff";
	myChart.options.plugins.tooltip.footerColor = "#fff";
	myChart.options.plugins.tooltip.displayColors = true;
}

*/
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

canvasUpdateInterval = null;
var textheight = 0;
var newCanvas = document.createElement('canvas');
var newCanvasReady = 0;

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

// event creation 

function createEvent2(arg_isEdit) {
	var relativetime;
	if (validateTime() == -1) { // -1 is escape code for error
		setnow(Math.floor(time_in_s));
		displayWarning("Error", "Time of event invalid.");
		setTimeout(setmodal("modalAnnotate"),100);
	} else {
		console.log('converted time is (s)' + relativetime);
		createEvent(
		relativetime,
		document.getElementById("addeventtext").value,
		arg_isEdit
		)
		savefile_data();
		document.getElementById("addeventtext").value = "";
		hideallmodal();
	}

	function validateTime() {
		relativetime = 
			document.getElementById("hh").value * 3600 +
			document.getElementById("mm").value * 60 +
			document.getElementById("ss").value * 1;
		if (relativetime > time_in_s) {
			return -1
		} else {
			return relativetime;
		}
	}
}

function createEvent(inputtime, inputtext, isEdit) {
	//isEdit = -1 is escape, that means create
	//isEdit has index param that means it is editing and not creating

	if (isEdit == -1) {
		var number = eventArray.length+1;
		if (number<10) number = "0" + number;
		xcoor = myChart.scales.x.getPixelForValue(inputtime/60) - 15;
		ycoor = myChart.scales.y.getPixelForValue(myChart.scales.y.max);
		eventArray.push([inputtime, inputtext]);
		console.log(eventArray);
		console.log("x-axis: " + xcoor);
		console.log("y-axis: " + ycoor);
		let El1 = document.getElementById("chartwrapper");

		let El2 = document.createElement("div");
		El2.setAttribute('class', 'charteventicon');
		El2.setAttribute('id', 'chartevent' + inputtime);
		El2.setAttribute('data-eventtimestamp', inputtime);
		El2.setAttribute('onclick', 'editevent(' + inputtime + ')');
		El2.setAttribute('style', 'transform: translate(' + xcoor + 'px, ' + ycoor + 'px)')
		El2.innerHTML = `
			<div class="eventnumber">${number}</div>
			<i class="fas fa-angle-down fa-fw" style="transform:translateY(-9px)"></i>
		`
		El1.appendChild(El2);

		let El3 = document.getElementById("eventscontainer");
		let El4 = document.createElement("div");
		El4.setAttribute('class', 'eventitem');
		El4.setAttribute('id', 'labelevent'+inputtime);
		El4.setAttribute('data-eventtimestamp', inputtime);
		El4.setAttribute('onclick', 'editevent(' + inputtime + ')');
		outputtime = converttime(inputtime);
		El4.innerHTML = `
			<div class='eventmarker'>${number}</div>
			<div class='eventtime'>${outputtime}</div>
			${inputtext}
		`
		El3.appendChild(El4);
	} else { 
		//this is edit mode
		console.log("old time is " + isEdit);
		console.log("new time is " + inputtime);
		ElChart = document.getElementById("chartevent" + isEdit);
		ElLabel = document.getElementById("labelevent" + isEdit);
		number = ElLabel.querySelector(".eventmarker").innerHTML;
		tempIndex = number * 1 - 1;
		eventArray[tempIndex] = [inputtime, inputtext];
		xcoor = myChart.scales.x.getPixelForValue(inputtime/60) - 15;
		ycoor = myChart.scales.y.getPixelForValue(myChart.scales.y.max);
		
		ElChart.setAttribute('data-eventtimestamp', inputtime);
		ElChart.setAttribute('onclick', 'editevent(' + inputtime + ')');
		ElChart.setAttribute('style', 'transform: translate(' + xcoor + 'px, ' + ycoor + 'px)')
		ElChart.setAttribute('id', 'chartevent' + inputtime);
		
		outputtime = converttime(inputtime);
		ElLabel.setAttribute('data-eventtimestamp', inputtime);
		ElLabel.setAttribute('onclick', 'editevent(' + inputtime + ')');
		ElLabel.innerHTML = `
			<div class='eventmarker'>${number}</div>
			<div class='eventtime'>${outputtime}</div>
			${inputtext}
		`
		ElLabel.setAttribute('id', 'labelevent'+inputtime);

	}

}

function editevent(time_id) {
	tempIndex = 0;
	temp = 0;
	for (j=0; j<eventArray.length; j++) {
		if (eventArray[j][0] == time_id) tempIndex = j;
	}
	temp = tempIndex+1;
	if (temp<10) temp = "0" + temp;
	document.getElementById("modalAnnotatetitle").innerHTML = "EDIT EVENT " + temp;
	setnow(eventArray[tempIndex][0]);
	document.getElementById("btn_submitevent").setAttribute('onclick','createEvent2(' + time_id + ')');
	document.getElementById("btn_deleteevent").setAttribute('onclick','deleteevent(' + tempIndex + ')');
	document.getElementById("btn_deleteevent").style.display = "block";
	document.getElementById("addeventtext").value = eventArray[tempIndex][1];
	setmodal('modalAnnotate');
}

function deleteevent(input__index) {
	document.getElementById("chartevent" + eventArray[input__index][0]).style.display = "none";
	document.getElementById("labelevent" + eventArray[input__index][0]).style.display = "none";
	eventArray.splice(input__index,1);
	for (w=0; w<eventArray.length; w++) {
		number = w+1;
		if (number<10) number = "0" + number;
		document.getElementById("chartevent" + eventArray[w][0]).querySelector(".eventnumber").innerHTML = number;
		document.getElementById("labelevent" + eventArray[w][0]).querySelector(".eventmarker").innerHTML = number;
	}
	hideallmodal();
	hidemodal('modalAnnotate');
}

function setnow(input__time) {
	var hours = Math.floor(input__time/(60*60));
	var minutes = Math.floor(input__time%(60*60)/60);
	var seconds = Math.floor(input__time%60);
	document.getElementById("mm").value = minutes;
	document.getElementById("ss").value = seconds;

	if (input__time<=3600) {
		ElToHide = document.getElementsByClassName("hidehours");
		for (k=0; k<ElToHide.length; k++) {
			ElToHide[k].style.display = "none";
		} 

	} else {
		ElToHide = document.getElementsByClassName("hidehours");
		for (k=0; k<ElToHide.length; k++) {
			ElToHide[k].style.display = "table-cell";
		} 
		document.getElementById("hh").value = hours;
	}
}

function deltahours(param) {
	var param1 = document.getElementById("hh").value * 1;
	var param2 = (param1 + param + 1000) % 10;
	document.getElementById("hh").value = param2;
}
function deltaminutes(param) {
	var param1 = document.getElementById("mm").value * 1;
	var param2 = (param1 + param + 6000) % 60;
	document.getElementById("mm").value = param2;
}
function deltaseconds(param) {
	var param1 = document.getElementById("ss").value * 1;
	var param2 = (param1 + param + 6000) % 60;
	document.getElementById("ss").value = param2;
}
function alignEvents() {
	if (eventArray.length>0) {
		for (i=0; i<eventArray.length; i++) {
			id = "chartevent" + eventArray[i][0];
			xcoor = myChart.scales.x.getPixelForValue(eventArray[i][0]/60) - 15;
			ycoor = myChart.scales.y.getPixelForValue(myChart.scales.y.max);
			document.getElementById(id).style = "transform: translate(" + xcoor + "px, " + ycoor + "px)";
		}
	}
}

//PD chart functions

function add_ptol_label(ptolvalue) {
	datasetid = 20-ptolvalue/10;
	//arbitrarily get the 32nd data, approx remi of 8 out of a max of 10
	
	xvalue = myChart2.scales.x.getPixelForValue(myChart2.options.scales.x.max * 0.8);
	yvalue = myChart2.scales.y.getPixelForValue(ptol_function_solve_p(myChart2.options.scales.x.max * 0.8,ptolvalue/100));

	let El1 = document.getElementById("chart2wrapper");
	let El2 = document.createElement("div");
	El2.setAttribute('class','chart2label');
	El2.setAttribute('id','ptollabel' + ptolvalue);
	El2.setAttribute('style', 'transform: translate(' + xvalue + 'px, ' + yvalue + 'px) rotate(' + ptolvalue/10 + 'deg)');
	El2.innerHTML = `
		<div>PTOL${ptolvalue}</div>
	`
	El1.appendChild(El2);
}

function alignPtolLabels() {
	let labelArray = document.getElementsByClassName("chart2label");
	if (labelArray.length>0) {
		for (counteral=0;counteral<labelArray.length;counteral++) {
			tempname = labelArray[counteral].id.slice(-2);
			datasetid = 20-tempname/10;
	xvalue = myChart2.scales.x.getPixelForValue(myChart2.options.scales.x.max * 0.8);
	yvalue = myChart2.scales.y.getPixelForValue(ptol_function_solve_p(myChart2.options.scales.x.max * 0.8,tempname/100));
			document.getElementById('ptollabel' + tempname).style = 'transform: translate(' + xvalue + 'px, ' + yvalue + 'px) rotate(' + tempname/10 + 'deg)';	
		}
	}
}

function resetPtolLabels() {
	//this function amends myChart2 to reflect either PTOL or NSRI mode
	El1 = document.getElementById("ptollabel90");
	El2 = document.getElementById("ptollabel50");
	El3 = document.getElementById("ptollabel10");
	if (PD_mode == 2) {
		if (El1.innerText == 'NSRI20') El1.innerText = "PTOL90";
		if (El2.innerText == 'NSRI50') El2.innerText = "PTOL50";
		if (El3.innerText == 'NSRI80') El3.innerText = "PTOL10";
		myChart2.data.datasets[18].borderWidth = 1;
		myChart2.data.datasets[17].borderWidth = 1;
		myChart2.data.datasets[16].borderWidth = 1;
		myChart2.data.datasets[14].borderWidth = 1;
		myChart2.data.datasets[13].borderWidth = 1;
		myChart2.data.datasets[12].borderWidth = 1;
	} else if (PD_mode == 3) {
		if (El1.innerText == 'PTOL90') El1.innerText = "NSRI20";
		if (El2.innerText == 'PTOL50') El2.innerText = "NSRI50";
		if (El3.innerText == 'PTOL10') El3.innerText = "NSRI80";
		myChart2.data.datasets[18].borderWidth = 0;
		myChart2.data.datasets[17].borderWidth = 0;
		myChart2.data.datasets[16].borderWidth = 0;
		myChart2.data.datasets[14].borderWidth = 0;
		myChart2.data.datasets[13].borderWidth = 0;
		myChart2.data.datasets[12].borderWidth = 0;
	}
	myChart2.update();

}

// complex mode functions

function tabswitch(index) {

	if (index == undefined) index = 1-active_drug_set_index;

	if (index == 0) {
		//switch to 0
		active_drug_set_index = 0;
		alt_drug_set_index = 1;
		document.getElementById("drugname").innerHTML = "Propofol";
		document.getElementById("modelname").innerHTML = drug_sets[0].model_name;
		document.getElementById("historywrapper").innerHTML = drug_sets[0].historytext;
		document.getElementById("historywrapperCOPY").innerHTML = drug_sets[0].historytext;
		document.querySelector(".leftbar").classList.remove("opioid");
		document.querySelector(".leftbar").classList.add("propofol");
		document.querySelector(".druglabelcontainer.propofol").classList.add("active");
		document.querySelector(".druglabeltext.propofol").classList.add("active");
		document.querySelector(".druglabelcontainer.opioid").classList.remove("active");
		document.querySelector(".druglabeltext.opioid").classList.remove("active");
		document.getElementById("modeldescription").innerHTML = drug_sets[0].modeltext;

		myChart.data.datasets[2].hidden = false;
		myChart.data.datasets[3].hidden = false;
		if ((PD_mode == 2)||(PD_mode == 3)) {
			myChart.data.datasets[6].hidden = false;
			myChart.data.datasets[7].hidden = false;
			myChart.data.datasets[8].hidden = true;
			myChart.data.datasets[9].hidden = true;
			myChart.data.datasets[10].hidden = true;
			myChart.data.datasets[11].hidden = true;
		} else if (PD_mode == 1) {
			myChart.data.datasets[6].hidden = true;
			myChart.data.datasets[7].hidden = true;
			myChart.data.datasets[8].hidden = true;
			myChart.data.datasets[9].hidden = true;
			myChart.data.datasets[10].hidden = false;
			myChart.data.datasets[11].hidden = false;
		} else {
			myChart.data.datasets[6].hidden = true;
			myChart.data.datasets[7].hidden = true;
			myChart.data.datasets[8].hidden = true;
			myChart.data.datasets[9].hidden = true;
			myChart.data.datasets[10].hidden = true;
			myChart.data.datasets[11].hidden = true;
		}
		myChart.data.datasets[4].hidden = true;
		myChart.data.datasets[5].hidden = true;




		if (parseloading == 0) {
			document.getElementById("card_cpt0").classList.remove("hide");
			document.getElementById("card_cet0").classList.remove("hide");
			document.getElementById("card_bolus0").classList.remove("hide");
			document.getElementById("card_infusion0").classList.remove("hide");
			document.getElementById("card_cpt1").classList.add("hide");
			document.getElementById("card_cet1").classList.add("hide");
			document.getElementById("card_bolus1").classList.add("hide");
			document.getElementById("card_infusion1").classList.add("hide");
			document.getElementById("card_wakeup").classList.remove("hide");
		}
		//unfinished
		/*
		if (drug_sets[active_drug_set_index].manualmode_active == 1) {
			if (drug_sets[active_drug_set_index].firstrun>0) {

			} else {

			}
		} else if (drug_sets[active_drug_set_index].cpt_active>0) {

		} else if (drug_sets[active_drug_set_index].cet_active>0) {

		}
		*/
	} else {
		//switch to 1
		active_drug_set_index = 1;
		alt_drug_set_index = 0;
		document.getElementById("drugname").innerHTML = drug_sets[1].drug_name + "<span style='opacity:0.5'>(" + drug_sets[1].infusate_concentration + "mcg/ml)</span>";
		if (drug_sets[1].model_name == "Eleveld-Remifentanil") {
			document.getElementById("modelname").innerHTML = "Eleveld";	
		} else {
			document.getElementById("modelname").innerHTML = drug_sets[1].model_name;
		}
		
		document.getElementById("historywrapper").innerHTML = drug_sets[1].historytext;
		document.getElementById("historywrapperCOPY").innerHTML = drug_sets[1].historytext;
		document.querySelector(".leftbar").classList.remove("propofol");
		document.querySelector(".leftbar").classList.add("opioid");
		document.querySelector(".druglabelcontainer.propofol").classList.remove("active");
		document.querySelector(".druglabeltext.propofol").classList.remove("active");
		document.querySelector(".druglabelcontainer.opioid").classList.add("active");
		document.querySelector(".druglabeltext.opioid").classList.add("active");
		document.getElementById("modeldescription").innerHTML = drug_sets[1].modeltext;

		myChart.data.datasets[2].hidden = true;
		myChart.data.datasets[3].hidden = true;
		if ((PD_mode == 3)||(PD_mode == 2)) {
			myChart.data.datasets[6].hidden = true;
			myChart.data.datasets[7].hidden = true;
			myChart.data.datasets[8].hidden = false;
			myChart.data.datasets[9].hidden = false;
			myChart.data.datasets[10].hidden = true;
			myChart.data.datasets[11].hidden = true;
		} else {
			myChart.data.datasets[6].hidden = true;
			myChart.data.datasets[7].hidden = true;
			myChart.data.datasets[8].hidden = true;
			myChart.data.datasets[9].hidden = true;
			myChart.data.datasets[10].hidden = true;
			myChart.data.datasets[11].hidden = true;
		}
		myChart.data.datasets[4].hidden = false;
		myChart.data.datasets[5].hidden = false;



		if (parseloading == 0) {
			document.getElementById("card_cpt0").classList.add("hide");
			document.getElementById("card_cet0").classList.add("hide");
			document.getElementById("card_bolus0").classList.add("hide");
			document.getElementById("card_infusion0").classList.add("hide");
			document.getElementById("card_cpt1").classList.remove("hide");
			document.getElementById("card_cet1").classList.remove("hide");
			document.getElementById("card_bolus1").classList.remove("hide");
			document.getElementById("card_infusion1").classList.remove("hide");
			document.getElementById("card_wakeup").classList.add("hide");
		}
	}
	//update() design changes
	if (drug_sets[active_drug_set_index].manualmode_active == 1) {
		guessInfusionUnit();
		//on the infusion unit option row
		document.getElementById("option_defaultrateunit").style.display = "table-row";
		document.getElementById("warning").style.display = "none";
		if (parseloading == 0) document.getElementById("progressbar").style.display = "none";
		document.getElementById("top_infrate").classList.remove("bolus");
		document.getElementById("schemecopytitle").innerHTML = "HISTORY";
		document.getElementById("btn_displayhistory").innerHTML = "History";
		document.getElementById("pastscheme").classList.remove("show");
		document.getElementById("pastschemeCOPY").style.display = "none";
		document.getElementById("top_infrate").classList.remove("warningborder");

		if (drug_sets[active_drug_set_index].inf_rate_mls>0) {
			if (parseloading == 0) {
				document.getElementById("status").innerHTML = "Running";
				document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			}
		} else if (parseloading == 0) {
				if (drug_sets[active_drug_set_index].firstrun>-1) {
					document.getElementById("status").innerHTML = "Paused";
				} else {
					document.getElementById("status").innerHTML = "";
				}
		}

	} else {
		//off the infusion unit option row
		document.getElementById("option_defaultrateunit").style.display = "none";
		document.getElementById("schemecopytitle").innerHTML = "SCHEME";
		document.getElementById("btn_displayhistory").innerHTML = "Scheme";
		document.getElementById("pastscheme").classList.add("show");
		document.getElementById("pastschemeCOPY").style.display = "block";
	}

	if ((drug_sets[active_drug_set_index].running == 1) && ((drug_sets[active_drug_set_index].cpt_active == 1) || (drug_sets[active_drug_set_index].IB_active == 0))) {
		
		document.getElementById("top_infrate").classList.remove("bolus");
		if (parseloading == 0) {
			document.getElementById("status").innerHTML="";
			document.getElementById("progressbar").style.display = "none";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
		}

	}

	if ((drug_sets[active_drug_set_index].running == 1) && (drug_sets[active_drug_set_index].IB_active == 1)) {
		
		document.getElementById("top_infrate").style.display = "none";
		document.getElementById("top_infrate").classList.add("bolus");
		if (parseloading == 0) {
			document.getElementById("status").innerHTML="";
			document.getElementById("progressbar").style.display = "block";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
		}

	}



	if (parseloading != 0) {
		if (active_drug_set_index == 0) {
			document.getElementById("status").innerHTML = mode + ": data loaded";
		} else {
			document.getElementById("status").innerHTML = mode1 + ": data loaded";
		}
	}

	//reset ringtimeout
	if (ringactive == 1) {
		ringtimeoutcallback();
	}
	if (ringbell2active == 1) {
		ringbell2timeoutcallback();
	}

	// set zero if not yet start
	if (drug_sets[active_drug_set_index].firstrun == -1) {
		p_state[1] = 0;
		p_state[2] = 0;
		p_state[3] = 0;
		e_state[1] = 0;
		e_state[2] = 0;
		e_state[3] = 0;
		e_state[4] = 0;
	}

	//detect CPT or CET pause
	if ((drug_sets[active_drug_set_index].firstrun>-1) && (drug_sets[active_drug_set_index].running == 0)) {
		document.getElementById("iconplay").classList.add("stop");
		document.getElementById("iconplay").innerHTML="<i class='fas fa-pause fa-lg'></i>";
		document.getElementById("status").innerHTML="Paused";
		document.getElementById("prompt_msg2").innerHTML = "Current target: 0";
		document.getElementById("warning").style.display = "none";
		document.getElementById("infusiondescriptor").innerHTML="";
		document.getElementById("top_infrate").style.display = "none";
	}
		
	runinfusion_complex();

	//interface changes

	//change the units
	var conc_units_fields = document.getElementsByClassName("conc_units");
	for (i=0; i<conc_units_fields.length; i++) {
		conc_units_fields[i].innerHTML = drug_sets[active_drug_set_index].conc_units;
	}
	var infused_units_fields = document.getElementsByClassName("infused_units");
	for (i=0; i<infused_units_fields.length; i++) {
		infused_units_fields[i].innerHTML = drug_sets[active_drug_set_index].infused_units;
	}

	if (drug_sets[active_drug_set_index].drug_name == "Propofol") {
		myChart.options.scales.y.title.text = "Concentration (mcg/ml)";
	} else {
		myChart.options.scales.y.title.text = "Concentration (ng/ml)";
	}

	updatechart(myChart);

}

function toggleshowPTOLmargins() {
	showPTOLmargins = 1-showPTOLmargins;
	if (showPTOLmargins == 1) {
		ptol_generate_margins(active_drug_set_index,0.9,0.5);
		myChart.update();
	} else {
		myChart.data.datasets[6].hidden = true;
		myChart.data.datasets[7].hidden = true;
		myChart.data.datasets[8].hidden = true;
		myChart.data.datasets[9].hidden = true;
		myChart.update();
	}
}
function toggleshowtabinfo() {
	if (document.getElementById("isTabInfo").checked) {
		testarg = 0; 
		loop6 = setInterval(cycletabinfo,5000);
	} else {
		clearInterval(loop6);
		loop6 = null;
		tabaltdisplaycycle(1);
	}
}
function cycletabinfo() {
	tabaltupdate();
	tabaltdisplaycycle(testarg);
	if (testarg==0) {testarg = 1} else {testarg = 0};
}
function tabaltupdate() {
	if (alt_drug_set_index == 0) {
		document.getElementById("cp_propo").innerHTML = alt_result;
		document.getElementById("ce_propo").innerHTML = alt_result_e;
		document.getElementById("inf_propo").innerHTML = getinfusionrate(time_in_s,0);
	} else {
		document.getElementById("cp_opioid").innerHTML = alt_result;
		document.getElementById("ce_opioid").innerHTML = alt_result_e;
		document.getElementById("inf_opioid").innerHTML = getinfusionrate(time_in_s,1);
	}
}
function tabaltdisplaycycle(inputArg) {
	if (alt_drug_set_index == 0) {
		document.querySelector(".druglabeltext.opioid > .line1").style.display = "block";
		document.querySelector(".druglabeltext.opioid > .line2").style.display = "none";
		if (inputArg == 0) {
			document.querySelector(".druglabeltext.propofol > .line1").style.display = "none";
			document.querySelector(".druglabeltext.propofol > .line2").style.display = "block";
		} else {
			document.querySelector(".druglabeltext.propofol > .line1").style.display = "block";
			document.querySelector(".druglabeltext.propofol > .line2").style.display = "none";
		}
	} else {
		document.querySelector(".druglabeltext.propofol > .line1").style.display = "block";
		document.querySelector(".druglabeltext.propofol > .line2").style.display = "none";
		if (inputArg == 0) {
			document.querySelector(".druglabeltext.opioid > .line1").style.display = "none";
			document.querySelector(".druglabeltext.opioid > .line2").style.display = "block";
		} else {
			document.querySelector(".druglabeltext.opioid > .line1").style.display = "block";
			document.querySelector(".druglabeltext.opioid > .line2").style.display = "none";
		}
	}
}

var popupon = false;

function preparerange() {
	var corX = time_in_s/60;

	//get current time in min
	current_time = Math.floor(time_in_s/60);
	max_time = Math.floor(drug_sets[active_drug_set_index].cpt_rates_real.length/60);


	//check popup chart on or off
	if (document.getElementById("popupchartdiv").style.display == "block") {
		popupon = true;
	} else {
		popupon = false;
	}

	//modify from chartprofile 1
		if (corX>0 && corX<=7) {  						//new
			xmin = 0;														//new
			xmax = 20;													//new
		} else if (corX>7 && corX<=25) {
			xmin = Math.floor(current_time/5)*5;									//new
			xmax = 30;
			
		} else if (corX>25 && corX<=45) {
			xmin = 20;
			xmax = 60;
			
		} else if (corX>45 && corX<=75) {
			xmin = 30;
			xmax = 90;
			
 		} else if (corX>75 && corX<=105) {
			xmin = 60;
			xmax = 120;
			
		} else if (corX>105 && corX<=135) {
			xmin = 90;
			xmax = 150;
			
		} else if (corX>135 && corX<=165) {
			xmin = 120;
			xmax = 180;
			
		} else if (corX>165 && corX<=195) {
			xmin = 150;
			xmax = 210;
				
		} else if (corX>195 && corX<=225) {
			xmin = 180;
			xmax = 240;
			
		} else if (corX>225 && corX<=255) {
			xmin = 210;
			xmax = 270;
				
		} else if (corX>255 && corX<=285) {
			xmin = 240;
			xmax = 300;
			
		} else if (corX>285 && corX<=315) {
			xmin = 270;
			xmax = 330;
			
		} else if (corX>315 && corX<=345) {
			xmin = 300;
			xmax = 360;
			
		} else if (corX>345 && corX<=375) {
			xmin = 330;
			xmax = 390;
			
		} else if (corX>375 && corX<=430) {
			xmin = 360;
			xmax = 450;
			
		} else if (corX>430 && corX<=520) {
			xmin = 420;
			xmax = 540;
			
		} else if (corX>520 && corX<=610) {
			xmin = 510;
			xmax = 630;
			
		} else if (corX>610 && corX<=700) {
			xmin = 600;
			xmax = 720;
			
		} else if (corX>700 && corX<=790) {
			xmin = 690;
			xmax = 810;
			
		} else if (corX>790 && corX<=10000) {
			xmin = 720;
			xmax = 1440;
			
		}
	//set range0 max to current and true allowable max after validation to be xmin + 5
	//and range1 min to current and true allowable min after validation to be xmax - 5

	if (popupon == false) {
		El0 = document.getElementById("range0");
		El1 = document.getElementById("range1");
		ElLeft = document.getElementById("leftslidercontainer");
		ElRight = document.getElementById("rightslidercontainer");
	} else {
		El0 = document.getElementById("range0copy");
		El1 = document.getElementById("range1copy");
		ElLeft = document.getElementById("leftslidercontainer2");
		ElRight = document.getElementById("rightslidercontainer2");
	}
	El0.min = 0;
	if (current_time<5) {
		El0.max = 5;
		El0.step = 1;
	} else {
		El0.max = current_time;
		El0.step = 5;
	}
	
	El1.min = Math.floor(current_time/5)*5; //round down to nearest 5
	El1.max = Math.floor(max_time/10)*10 - 10;

	El0.dataMax = xmin+5;
	El1.dataMin = xmax-10;
	El0.value = myChart.scales.x.min;
	El1.value = myChart.scales.x.max;

	//express leftslidercontainer width as proportion from 10% to 60% depending on current_time / max time
	if (current_time/max_time < 0.1) {
		ElLeft.style.flexBasis = "10%";
		ElRight.style.flexBasis = "90%";
	} else if (current_time/max_time < 0.4) {
		ElLeft.style.flexBasis = "20%";
		ElRight.style.flexBasis = "80%";
	} else if (current_time/max_time < 0.6) {
		ElLeft.style.flexBasis = "30%";
		ElRight.style.flexBasis = "70%";
	} else if (current_time/max_time < 0.7) {
		ElLeft.style.flexBasis = "40%";
		ElRight.style.flexBasis = "60%";
	} else if (current_time/max_time < 0.8) {
		ElLeft.style.flexBasis = "50%";
		ElRight.style.flexBasis = "50%";
	}

	sliderValue = (El0.value-El0.min) / (El0.max - El0.min) * 100;
	El0.style.background = `linear-gradient(to right, #CCC ${sliderValue}%, #4CAF50 ${sliderValue}%)`;
		if (popupon == false) {
			textEl = document.getElementById("rangetext0");	
		} else {
			textEl = document.getElementById("rangetext0copy");	
		}
		
		textEl.innerHTML = El0.value;
		distance = sliderValue/100 * El0.offsetWidth - 20*(sliderValue/100); //thumb has width, need to account for deviation
		textEl.style.transform = `translateX(${distance}px`;

	sliderValue = (El1.value-El1.min) / (El1.max - El1.min) * 100;
	El1.style.background = `linear-gradient(to right, #4CAF50 ${sliderValue}%, #CCC ${sliderValue}%)`;
		if (popupon == false) {
			textEl = document.getElementById("rangetext1");	
		} else {
			textEl = document.getElementById("rangetext1copy");
		}
		
		textEl.innerHTML = El1.value;
		distance = sliderValue/100 * El1.offsetWidth - 20*(sliderValue/100); //thumb has width, need to account for deviation
		textEl.style.transform = `translateX(${distance}px`;

}
function processrange(rangenum) {

	if (popupon == false) {
		var sliderEl = document.getElementById("range" + rangenum);
		var textEl = document.getElementById("rangetext" + rangenum);
	} else {
		var sliderEl = document.getElementById("range" + rangenum + "copy");
		var textEl = document.getElementById("rangetext" + rangenum + "copy");
	}
	//validate
	if (rangenum == 0) {
		if (sliderEl.value*1 > sliderEl.dataMax) {
			sliderEl.value = sliderEl.dataMax;
		}
	} else {
		if (sliderEl.value*1 < sliderEl.dataMin) {
			sliderEl.value = sliderEl.dataMin;
		}
	}
	var sliderValue = (sliderEl.value - sliderEl.min) / (sliderEl.max - sliderEl.min) * 100;
	
	if (rangenum == 0) {
		sliderEl.style.background = `linear-gradient(to right, #CCC ${sliderValue}%, #4CAF50 ${sliderValue}%)`;
		textEl.innerHTML = sliderEl.value;
		distance = sliderValue/100 * sliderEl.offsetWidth - 20*(sliderValue/100); //thumb has width, need to account for deviation
		textEl.style.transform = `translateX(${distance}px`;
	} else {
		sliderEl.style.background = `linear-gradient(to right, #4CAF50 ${sliderValue}%, #CCC ${sliderValue}%)`;
		textEl.innerHTML = sliderEl.value;
		distance = sliderValue/100 * sliderEl.offsetWidth - 20*(sliderValue/100);
		textEl.style.transform = `translateX(${distance}px`;
	}
	if (popupon == false) {
		chartviewarray[0] = document.getElementById("range0").value*1;
		chartviewarray[1] = document.getElementById("range1").value*1;
		chartprofile = 2;
		document.getElementById("isTimeAutomatic").checked = false;
		document.getElementById("isTimeAutomatic2").checked = false;
		updatechartview(myChart);
		updatechart(myChart);
	} else {
		chartviewarray[0] = document.getElementById("range0copy").value*1;
		chartviewarray[1] = document.getElementById("range1copy").value*1;
		chartprofile = 2;
		document.getElementById("isTimeAutomatic").checked = false;
		document.getElementById("isTimeAutomatic2").checked = false;
		updatechartview(popupchart);
		updatechart(popupchart);
	}

	alignEvents();
}

function chartOptionsToggle() {
	if (time_in_s > 0) {
	ElOptions = document.getElementById("chartoverlayoptions");
	if (ElOptions.classList.contains("show")) {
		ElOptions.classList.remove("show");
		
	} else {
		if (chartprofile == 2) {
			document.getElementById("isTimeAutomatic").checked = false;
		} else {
			document.getElementById("isTimeAutomatic").checked = true;
		}
		preparerange(); 
		ElOptions.classList.add("show");
	}
	}
}

function togglepopupoptions() {
	if (time_in_s > 0) {
		ElOptions = document.getElementById("chartoverlayoptions2");
		if (ElOptions.classList.contains("show")) {
			ElOptions.classList.remove("show");
		} else {
			if (chartprofile == 2) {
				document.getElementById("isTimeAutomatic2").checked = false;
			} else {
				document.getElementById("isTimeAutomatic2").checked = true;
			}
			preparerange();
			ElOptions.classList.add("show");
		}
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
	ElTarget = document.getElementById(targetid);
	if (targetname == "fentanyl") {
		targetnamecaps = "Fentanyl";
	} else if (targetname == "remifentanil") {
		targetnamecaps = "Remifentanil";
	} else {
		targetnamecaps = "Alfentanil";
	}
	displayWarning(`Custom ${targetname} dilution`,
		`
			<table style='width:70%'>
				<tr class='fr'>
					<td>${targetnamecaps} dilution (mcg/ml)</td>
					<td><input type='number' step='0.001' oninput='ElTarget.innerHTML=(this.value)'></td>
				</tr>
			</table>
			<div style='text-align:right'>
			<a class='button muted' onclick='hideallmodal()'>OK</a>
			</div>
		`)
}

var popupchart;
var boxesArray = new Array();

function generateBoxes() {
	if (drug_sets[active_drug_set_index].manualmode_active == 1) {
		if (drug_sets[active_drug_set_index].running > 0) {
			boxesArray.length = 0;
			btime = -1;
			for (bcount = 0; bcount<drug_sets[active_drug_set_index].historyarrays.length; bcount++) {
				if (drug_sets[active_drug_set_index].historyarrays[bcount][1] == 2) {
					//this identifies infus rate
					if (bcount>0) {
						//not first
						if (drug_sets[active_drug_set_index].historyarrays[bcount-1][1] == 1) {
							//infusing after bolus, did the rate change then?
							if (bcount>=2) {
								if (drug_sets[active_drug_set_index].historyarrays[bcount-2][1] == 2) {
									//compare this rate with previous saved inf rate
									if (drug_sets[active_drug_set_index].historyarrays[bcount-2][3] != drug_sets[active_drug_set_index].historyarrays[bcount][3]) {
										boxesArray.push([drug_sets[active_drug_set_index].historyarrays[bcount][2],drug_sets[active_drug_set_index].historyarrays[bcount][3]]);
									}
								}
							} else {
								//means that bcount is now 1, just push the rate
								boxesArray.push([drug_sets[active_drug_set_index].historyarrays[bcount][2],drug_sets[active_drug_set_index].historyarrays[bcount][3]]);
							}
						} else {
							//this is really rate change, not inf after bolus
							boxesArray.push([drug_sets[active_drug_set_index].historyarrays[bcount][2],drug_sets[active_drug_set_index].historyarrays[bcount][3]]);
						}
					} else {
						//bcount is now zero
						if (drug_sets[active_drug_set_index].historyarrays[bcount][1] == 2) {
							boxesArray.push([drug_sets[active_drug_set_index].historyarrays[bcount][2],drug_sets[active_drug_set_index].historyarrays[bcount][3]]);
						}
					}				
				}
			}
			// now append the boxes into [start,infrate,end];
			
			// convert rate back to original form
			for (ccount = 0; ccount<boxesArray.length-1; ccount++) {
				boxesArray[ccount][1] = boxesArray[ccount][1] * drug_sets[active_drug_set_index].infusate_concentration / 3600;
				boxesArray[ccount][2] = boxesArray[ccount+1][0];	
			}
			boxesArray[boxesArray.length-1][1] = boxesArray[boxesArray.length-1][1] * drug_sets[active_drug_set_index].infusate_concentration / 3600;
			boxesArray[boxesArray.length-1][2] = drug_sets[active_drug_set_index].cpt_rates_real.length-1;
		}
	} else {
		//non manual mode
		//this converts all infusion rates into 3 values - start time, end time, and rate scalar
		//pop boxes
		//first check if set zero (paused)
		if (drug_sets[active_drug_set_index].running > 0) { 
			boxesArray.length = 0;
			btime = -1;
			for (bcount = 0; bcount<drug_sets[active_drug_set_index].historyarrays.length; bcount++) {
				if (drug_sets[active_drug_set_index].historyarrays[bcount][1] == 0) {
					//this is desired, capture the time point
					btime = drug_sets[active_drug_set_index].historyarrays[bcount][2];
					
					if (bcount>0) {
						//remove the pre-existing items that went beyond this btime instant
						for (ccount = boxesArray.length-1; ccount>=0; ccount--) {
							if (Array.isArray(boxesArray[ccount])) {
								if (boxesArray[ccount][0] > btime) boxesArray.length = boxesArray.length - 1;
							}
						}
					}
					boxesArray.push(btime);
				}
				if (drug_sets[active_drug_set_index].historyarrays[bcount][1] == 2) {
					//this identifies an infusion scheme
					btime = drug_sets[active_drug_set_index].historyarrays[bcount][2];
					boxesArray.push(btime);
					//deep clone and concat
					tempArrayText = JSON.stringify(drug_sets[active_drug_set_index].historyarrays[bcount][3])
					boxesArray = boxesArray.concat(JSON.parse(tempArrayText));
				}
			}
			//edit the merged array
			//remove the btime and the zero infusion rates
			for (ccount = boxesArray.length-1; ccount>0; ccount--) {
				if (Array.isArray(boxesArray[ccount])) {
					if (boxesArray[ccount][1] == 0) {
						//zero rate
						boxesArray.splice(ccount,1);
					} else {
						if (Array.isArray(boxesArray[ccount-1])) {
							boxesArray[ccount-1].push(boxesArray[ccount][0]);
						}
					}
				} else {
					//is not array, hence it is a time marker
					if (Array.isArray(boxesArray[ccount-1])) {
						boxesArray[ccount-1].push(boxesArray[ccount]);
						boxesArray.splice(ccount,1);
					} else {
						boxesArray.splice(ccount,1);
					}
				}
			}
			//remove first elem
			boxesArray.shift();
			//add final time to last array elem
			boxesArray[boxesArray.length-1].push(drug_sets[active_drug_set_index].cpt_rates_real.length-1);
		} else { // end running > 0 check
			//this is running = 0
			
			boxesArray.length = 0;
			btime = -1;
			endtime = -1;

			//capture the endtime
			if (drug_sets[active_drug_set_index].historyarrays[drug_sets[active_drug_set_index].historyarrays.length-1][3] == 0 && drug_sets[active_drug_set_index].historyarrays[drug_sets[active_drug_set_index].historyarrays.length-1][1] == 0) {
				//this identifies a CET or CPT scheme pause
				endtime = drug_sets[active_drug_set_index].historyarrays[drug_sets[active_drug_set_index].historyarrays.length-1][2];
			}
			
			for (bcount = 0; bcount<drug_sets[active_drug_set_index].historyarrays.length; bcount++) {
				if (drug_sets[active_drug_set_index].historyarrays[bcount][1] == 0) {
					//this is desired, capture the time point
					btime = drug_sets[active_drug_set_index].historyarrays[bcount][2];
					
					if (bcount>0) {
						//remove the pre-existing items that went beyond this btime instant
						for (ccount = boxesArray.length-1; ccount>=0; ccount--) {
							if (Array.isArray(boxesArray[ccount])) {
								if (boxesArray[ccount][0] > btime) boxesArray.length = boxesArray.length - 1;
							}
						}
					}
					boxesArray.push(btime);
				}
				if (drug_sets[active_drug_set_index].historyarrays[bcount][1] == 2) {
					//this identifies an infusion scheme
					btime = drug_sets[active_drug_set_index].historyarrays[bcount][2];
					boxesArray.push(btime);
					//deep clone and concat
					tempArrayText = JSON.stringify(drug_sets[active_drug_set_index].historyarrays[bcount][3])
					boxesArray = boxesArray.concat(JSON.parse(tempArrayText));
				}
			}
			//edit the merged array
			//remove the btime and the zero infusion rates
			for (ccount = boxesArray.length-1; ccount>0; ccount--) {
				if (Array.isArray(boxesArray[ccount])) {
					if (boxesArray[ccount][1] == 0) {
						//zero rate
						boxesArray.splice(ccount,1);
					} else {
						if (Array.isArray(boxesArray[ccount-1])) {
							boxesArray[ccount-1].push(boxesArray[ccount][0]);
						}
					}
				} else {
					//is not array, hence it is a time marker
					if (Array.isArray(boxesArray[ccount-1])) {
						boxesArray[ccount-1].push(boxesArray[ccount]);
						boxesArray.splice(ccount,1);
					} else {
						boxesArray.splice(ccount,1);
					}
				}
			}
			//since running = 0, remove the unnecessary scheme items
			if (endtime>-1) {
				for (ccount = boxesArray.length-1; ccount>0; ccount--) {
					if (boxesArray[ccount][0] > endtime) {
						boxesArray.splice(ccount,1);
					}
				}
				//remove first elem
				boxesArray.shift();
				//add final time to last array elem, by using end time
				if (boxesArray.length>0) boxesArray[boxesArray.length-1][2] = endtime;
			}
			
			
		} // end of running = 0 block
	} // end else: not manual mode
}

const chartInfRateLayer = {
	id: 'chartInfRateLayer',
	afterDraw(chart, args, options) {
		if (suitableForBoxes && boxesArray.length>0) {
			const {ctx, chartArea: {top, right, bottom, left, width, height }, scales} = chart;
			//load history array
			//define corr_factor for y scale as % of cp scale
			if (drug_sets[active_drug_set_index].drug_name == "Fentanyl") {
				ymax = 3;
			} else if (drug_sets[active_drug_set_index].drug_name == "Alfentanil") {
				ymax = 90;
			} else {
				ymax = 5;
			}
			corr_factor = 1 * 3600 / drug_sets[active_drug_set_index].infusate_concentration / 200 * ymax;
			xmargin = scales.x.getPixelForValue(scales.x.min);

			//determine text size
			textsize = 16 * (width / popupchart.width);

			/*
			x0 = scales.x.getPixelForValue(0);
			x1 = scales.x.getPixelForValue(5) - x0;
			y0 = scales.y.getPixelForValue(3);
			y1 = scales.y.getPixelForValue(0) - y0;

			console.log("***");
			console.log(scales.x.getPixelForValue(scales.x.max));
			console.log(scales.x.getPixelForValue(scales.x.min));
			console.log(scales.x.getPixelForValue(5));
			console.log(scales.x.getPixelForValue(10));
			console.log(scales.x.getPixelForValue(15));
			console.log(scales.x.getPixelForValue(20));
			console.log("###");
			console.log(scales.y.getPixelForValue(scales.y.max));
			console.log(scales.y.getPixelForValue(scales.y.min));
			*/
			
			ctx.save();
			

			for (icount = 0; icount < boxesArray.length; icount++) {
				if (boxesArray[icount][1] > 0) {
					ctx.fillStyle = 'rgba(128,128,128,0.5)';

						x0 = scales.x.getPixelForValue(boxesArray[icount][0] / 60) + 2;
						y0 = scales.y.getPixelForValue(boxesArray[icount][1] * corr_factor);
						x1 = scales.x.getPixelForValue(boxesArray[icount][2] / 60) - x0 - 2;
						y1 = scales.y.getPixelForValue(scales.y.min) - y0;
						ctx.fillRect(x0,y0,x1,y1);
					
					if (!isDark) {
						ctx.fillStyle = "black";
					} else {
						ctx.fillStyle = "white";
					}
						ctx.font = "bold " + textsize + "px SourceSans";
						ctx.fillText(Math.round(boxesArray[icount][1]*3600/drug_sets[active_drug_set_index].infusate_concentration*10)/10 + "ml/h", x0, y0 - textsize/3);
				
				}

			}
			// bolus
			bolustext = "";
			bolustime = -1;
			bolusArray = new Array();
			textheight = 0;
			if ((drug_sets[active_drug_set_index].manualmode_active > 0) || (drug_sets[active_drug_set_index].cpt_active > 0) || ((drug_sets[active_drug_set_index].cet_active > 0) && (drug_sets[active_drug_set_index].IB_active == 0))) {
				for (icount = 0; icount<drug_sets[active_drug_set_index].historyarrays.length; icount++) {
					if (drug_sets[active_drug_set_index].historyarrays[icount][1] == 1) {
						bolustime = drug_sets[active_drug_set_index].historyarrays[icount][2]; 
						if (drug_sets[active_drug_set_index].historyarrays[icount][3]>0) {
							bolustext = drug_sets[active_drug_set_index].historyarrays[icount][3] + drug_sets[active_drug_set_index].infused_units;
						} else {
							bolustext = "";
						}

						if (bolustext != "") {
							bolusArray.push(bolustime);
							x0 = scales.x.getPixelForValue(bolustime/60);
							ctx.font = "bold " + textsize + "px SourceSans";
							if (!isDark) {
								ctx.fillStyle = "black";
							} else {
								ctx.fillStyle = "white";
							}
							
							if (bolusArray.length>1) {
								//if this is 10mins close to previous
								if (bolusArray[bolusArray.length-1] - bolusArray[bolusArray.length-2] < 600) {
									if (textheight < textsize * 6) {
										textheight = textheight + textsize * 1.33;
										ctx.fillText(bolustext, x0+10, 50+textheight);	
										ctx.font = 'normal 900 ' + textsize + 'px "Font Awesome 5 Free"';
										ctx.fillText("\uf063", x0-5, 50+textheight);	
									} else {
										textheight = 0;
										ctx.fillText(bolustext, x0+10, 50);
										ctx.font = 'normal 900 ' + textsize + 'px "Font Awesome 5 Free"';
										ctx.fillText("\uf063", x0-5, 50);	
									}
								} else {
									ctx.fillText(bolustext, x0+10, 50);
									textheight = 0;
									ctx.font = 'normal 900 ' + textsize + 'px "Font Awesome 5 Free"';
									ctx.fillText("\uf063", x0-5, 50);	
								}
							} else {
								ctx.fillText(bolustext, x0+10, 50);
								ctx.font = 'normal 900 ' + textsize + 'px "Font Awesome 5 Free"';
								ctx.fillText("\uf063", x0-5, 50);	
							}
						}
					} else {
						bolustext = "";
					}
				} // end for loop
			} // end if manual/cpt/cet block
		//end "suitableForBoxes"  check
		} else {
			if ((drug_sets[active_drug_set_index].cet_active > 0) && (drug_sets[active_drug_set_index].IB_active == 1)) {
				//load chart context
				const {ctx, chartArea: {width}, scales} = chart;

				//determine text size
				textsize = 14 * (width / popupchart.width);
			
				ctx.save();

				// bolus
				bolustext = "";
				bolustime = -1;
				bolusArray = new Array();
				textheight = 0;
				for (icount = 0; icount<drug_sets[active_drug_set_index].historyarray.length; icount++) {
						bolustime = drug_sets[active_drug_set_index].historyarray[icount][0]; 
						if (drug_sets[active_drug_set_index].historyarray[icount][2]>0) {
							bolustext = drug_sets[active_drug_set_index].historyarray[icount][2] + drug_sets[active_drug_set_index].infused_units;
						} else {
							bolustext = "";
						}

						if (bolustext != "") {
							bolusArray.push(bolustime);
							x0 = scales.x.getPixelForValue(bolustime/60);
							ctx.font = "bold " + textsize + "px SourceSans";
							if (!isDark) {
								ctx.fillStyle = "rgba(0,0,0,0.7)";
							} else {
								ctx.fillStyle = "rgba(255,255,255,0.7)";
							}
							if (bolusArray.length>1) {
								//if this is 10mins close to previous
								if (bolusArray[bolusArray.length-1] - bolusArray[bolusArray.length-2] < 660) {
									if (textheight < textsize * 7) {
										textheight = textheight + textsize * 1.33;
										ctx.fillText(bolustext, x0+10, 50+textheight);		
										ctx.font = 'normal 900 ' + textsize + 'px "Font Awesome 5 Free"';
										ctx.fillText("\uf063", x0-5, 50+textheight);	
									} else {
										textheight = 0;
										ctx.fillText(bolustext, x0+10, 50);
										ctx.font = 'normal 900 ' + textsize + 'px "Font Awesome 5 Free"';
										ctx.fillText("\uf063", x0-5, 50);	
									}
								} else {
									ctx.fillText(bolustext, x0+10, 50);
									textheight = 0;
									ctx.font = 'normal 900 ' + textsize + 'px "Font Awesome 5 Free"';
									ctx.fillText("\uf063", x0-5, 50);	
								}
							} else {
								ctx.fillText(bolustext, x0+10, 50);
								ctx.font = 'normal 900 ' + textsize + 'px "Font Awesome 5 Free"';
								ctx.fillText("\uf063", x0-5, 50);	
							}
						}
				} // end for loop
			} // end if IB block
		} 
	}
};

suitableForBoxes = false;

isFullscreen = false;

function openpopupchart() {
	
	//check if it's really running first
	if (drug_sets[active_drug_set_index].cpt_rates_real.length>0) {
		document.getElementById("chartinfooverlay").classList.remove("open");
		/*
		docEl = document.documentElement;
		var requestFullScreen = 
			docEl.requestFullscreen ||
			docEl.mozRequestFullScreen ||
			docEl.webkitRequestFullScreen ||
			docEl.msRequestFullscreen;
			*/
		if (document.documentElement.requestFullscreen != undefined) {
			document.documentElement.requestFullscreen()
				.then(() => {
					isFullscreen = true;
					console.log("fullscreen activated")
					if (isFullscreen) {
						console.log("try and lock landscape");
						screen.orientation.lock("landscape")
						.then(() => {})
						.catch((err) => console.error(err));
					}
				})
				.catch((err) => console.error(err));
		}
		document.getElementById("windowbody").style.background = "#000";
		if (!isDark) {
			var metaThemeColor = document.querySelector("meta[name=theme-color]");
			metaThemeColor.setAttribute("content", "#000");
		}
		/*
		if (!window.document.fullscreenElement &&
			  !window.document.mozFullScreenElement &&
			  !window.document.webkitFullscreenElement &&
			  !window.document.msFullscreenElement) {
			console.log("is NOT fullscreen");
			isFullscreen = false;
		} else {
			console.log("is fullscreen");
			isFullscreen = true;
		}
		*/
			
		document.getElementById("popupchartdiv").style.display = "block";
		popupon = true;

		//reset edit boxes and display edit cp or ce button
		//only if not in viewer mode
		if (parseloading == 0) {
			document.getElementById("pop_right_edit_cp").style.display = "none";
			document.getElementById("pop_right_edit_ce").style.display = "none";
			document.getElementById("pop_cp").classList.remove("shadow");
			document.getElementById("pop_ce").classList.remove("shadow");
			document.getElementById("pop_cp").classList.remove("active");
			document.getElementById("pop_ce").classList.remove("active");
			if (active_drug_set_index == 0 && drug_sets[0].cpt_active > 0) {
				document.getElementById("pop_right_edit_cp").style.display = "block";
				document.getElementById("pop_cp").classList.add("shadow");
				document.getElementById("pop_right_edit_cp").setAttribute('onclick','displayNumpad("cp")');
				document.getElementById('btn_confirm_numpad').setAttribute('onclick','confirmNumpad("inputDesired0")');
			}
			if (active_drug_set_index == 0 && drug_sets[0].cet_active > 0 && drug_sets[0].IB_active == 0) {
				document.getElementById("pop_right_edit_ce").style.display = "block";
				document.getElementById("pop_ce").classList.add("shadow");
				document.getElementById("pop_right_edit_ce").setAttribute('onclick','displayNumpad("ce")');
				document.getElementById('btn_confirm_numpad').setAttribute('onclick','confirmNumpad("inputDesiredCe0")');
			}
			if (active_drug_set_index == 1 && drug_sets[1].cpt_active > 0) {
				document.getElementById("pop_right_edit_cp").style.display = "block";
				document.getElementById("pop_cp").classList.add("shadow");
				document.getElementById("pop_right_edit_cp").setAttribute('onclick','displayNumpad("cp")');
				document.getElementById('btn_confirm_numpad').setAttribute('onclick','confirmNumpad("inputDesired1")');
			}
			if (active_drug_set_index == 1 && drug_sets[1].cet_active > 0 && drug_sets[1].IB_active == 0) {
				document.getElementById("pop_right_edit_ce").style.display = "block";
				document.getElementById("pop_ce").classList.add("shadow");
				document.getElementById("pop_right_edit_ce").setAttribute('onclick','displayNumpad("ce")');
				document.getElementById('btn_confirm_numpad').setAttribute('onclick','confirmNumpad("inputDesiredCe1")');
			}
		}
		if (!isDark) {
			document.getElementById("popupchartcontainer").style.background = "white";
			//document.getElementById("popupchartcontainer").style.border = "0px solid transparent";
		} else {
			document.getElementById("popupchartcontainer").style.background = "#222";
		}
		document.body.style.overflow = "hidden";
		setTimeout(function() {
			Chart.defaults.font.size *= 1.5;
			var ctx_new;
			ctx_new = document.getElementById("popupchart");
			popupchart = new Chart(ctx_new,{
	    	type: myChart.config.type,
	    	data: myChart.config.data,
	    	options: myChart.config.options,
	    	plugins: [chartInfRateLayer]
			});
			if ((drug_sets[active_drug_set_index].manualmode_active > 0) || (drug_sets[active_drug_set_index].cpt_active > 0) || ((drug_sets[active_drug_set_index].cet_active > 0) && (drug_sets[active_drug_set_index].IB_active == 0))) {
				generateBoxes();
				suitableForBoxes = true;	
			} else {
				//this is IB mode
				//hide ml/h box
				suitableForBoxes = false;	
				boxesArray.length = 0;
				document.getElementById("pop_infrate").style.display = "none";
			}
			populatepopupinfo();
			mirrorpopup();
			updatechart(popupchart);
			setTimeout(function() {document.getElementById("chartinfooverlay").classList.add("open");}, 1000);
		}, 300);

		document.getElementById("controlpanel").style.opacity = 0;

		if (document.getElementById("chartoverlayoptionscontent").classList.contains("PDoptions")) {
			document.getElementById("chartoverlayoptions2content").classList.add("PDoptions");
			document.getElementById("isEffectEstimationOn2").checked = document.getElementById("isEffectEstimationOn").checked;
			document.getElementById("select_effect_measure2").value = document.getElementById("select_effect_measure").value;
			if (complex_mode == 0) document.getElementById("select_effect_measure2").disabled = true;
		} else {

		}
		popupUpdateFunction(1000);

	} else {
		displayWarning("Failure to load fullscreen","Please start current infusion regimen first.");
	}
}

function togglePopupInfo() {
	if (document.getElementById("chartinfooverlay").classList.contains("open")) {
		document.getElementById("chartinfooverlay").classList.remove("open");
	} else {
		document.getElementById("chartinfooverlay").classList.add("open");
	}
}
function populatepopupinfo() {
	document.getElementById("drugnamecopy").innerHTML = drug_sets[active_drug_set_index].drug_name;
	document.getElementById("modelnamecopy").innerHTML = drug_sets[active_drug_set_index].model_name;
	document.getElementById("conccopy").innerHTML = "(" + drug_sets[active_drug_set_index].infusate_concentration + drug_sets[active_drug_set_index].infused_units + "/ml)";
	if (drug_sets[active_drug_set_index].drug_name == "Propofol") {
		document.getElementById("chartinfooverlay").classList.remove("opioid");
		if (drug_sets[active_drug_set_index].model_name == "Eleveld") {
			document.getElementById("chartinfooverlay").classList.add("complex");
		}
	} else {
		document.getElementById("chartinfooverlay").classList.add("opioid");
	}
	if (complex_mode == 1) {
		document.getElementById("chartinfooverlay").classList.add("complex");
	}
	if (drug_sets[active_drug_set_index].drug_name == "Remifentanil" && drug_sets[active_drug_set_index].model_name == "Eleveld-Remifentanil") {
		document.getElementById("modelnamecopy").innerHTML = "Eleveld";
	}
	if (drug_sets[active_drug_set_index].cet_active > 0 && drug_sets[active_drug_set_index].IB_active == 0) {
		tempModeP = "CET mode";
	}
	if (drug_sets[active_drug_set_index].cet_active > 0 && drug_sets[active_drug_set_index].IB_active == 1) {
		tempModeP = "Intermittent Bolus";
	}
	if (drug_sets[active_drug_set_index].manualmode_active > 0) {
		tempModeP = "Manual mode";
	}
	if (drug_sets[active_drug_set_index].cpt_active > 0) {
		tempModeP = "CPT mode";
	}
	if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
		tempDesired = drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected;
	} else {
		tempDesired = drug_sets[active_drug_set_index].desired;
	}
	if (tempModeP != "Manual mode") {
		if (tempDesired > 0) {
			document.getElementById("chartinfodrugline2").innerHTML = tempModeP + " - Target " + tempDesired + drug_sets[active_drug_set_index].conc_units + "/ml";	
		} else {
			document.getElementById("chartinfodrugline2").innerHTML = tempModeP + " - Paused";
		}
	} else {
		document.getElementById("chartinfodrugline2").innerHTML = tempModeP;
	}
	
}

function destroypopup() {

	if (!isDark) {
		var metaThemeColor = document.querySelector("meta[name=theme-color]");
		metaThemeColor.setAttribute("content", "#7B8092");
	}
	document.body.style.overflow = "auto";
	document.getElementById("controlpanel").style.opacity = 1;
	document.getElementById("chartoverlayoptions2").classList.remove("show");
	document.getElementById('select_effect_measure').value=document.getElementById('select_effect_measure2').value;
	document.getElementById("isEffectEstimationOn").checked = document.getElementById("isEffectEstimationOn2").checked;
	clearInterval(popupUpdateInterval);
	popupUpdateInterval = null;
/*	
	var doc = window.document;
	var cancelFullScreen = 
		doc.exitFullscreen ||
		doc.mozCancalFullScreen ||
		doc.webkitExitFullscreen ||
		doc.msExitFullscreen;
		*/
	document.getElementById("windowbody").style.background = "";
	if (document.exitFullscreen != undefined) {
		document.exitFullscreen()
			.then(() => {
				if (isFullscreen) {
					screen.orientation.unlock();
					console.log("orientation unlocked");
				}
				isFullscreen = false;
				console.log("fullscreen deactivated")
			})
			.catch((err) => console.error(err));
		}
/*
	if (!doc.fullscreenElement &&
		  !doc.mozFullScreenElement &&
		  !doc.webkitFullscreenElement &&
		  !doc.msFullscreenElement) {

	} else {
		cancelFullScreen.call(doc);
	}
	*/
		/*
	screen.orientation.unlock()
		.then()
		.catch((err) => console.error(err));
	*/
	Chart.defaults.font.size /= 1.5;
	
	setTimeout(function() {
		popupchart.destroy();
		document.getElementById("popupchartdiv").style.display = "none";
		popupon = false;
	},200);

	cancelNumpad();
}

function mirrorpopup() {
	if (document.getElementById("top_infrate").style.display == "none") {
		document.getElementById("infrate_copy").innerHTML = "-";	
	} else {
		document.getElementById("infrate_copy").innerHTML = document.getElementById("infrate").innerHTML;	
	}
	if (drug_sets[active_drug_set_index].running == 1) {
		if (suitableForBoxes && drug_sets[active_drug_set_index].manualmode_active != 1) {
			var found_in = boxesArray.findIndex((element)=>element[0]>time_in_s);
			if (found_in > -1) {
				document.getElementById("nextratedescriptor").innerHTML = "Next rate change: ";
				document.getElementById("nextratepreposition").innerHTML = " in ";
				var time_remain = converttime(boxesArray[found_in][0]- Math.round(time_in_s));
				document.getElementById("timeremaincopy").innerHTML = time_remain;
				var next_rate = boxesArray[found_in][1] * 3600 / drug_sets[active_drug_set_index].infusate_concentration;
				document.getElementById("nextratecopy").innerHTML = Math.round(next_rate*10)/10 + "ml/h";
			} else {
				document.getElementById("nextratedescriptor").innerHTML = "No scheme info available";
				document.getElementById("nextratepreposition").innerHTML = "";
				document.getElementById("timeremaincopy").innerHTML = "";
				document.getElementById("nextratecopy").innerHTML = "";
			}
		} else if (drug_sets[active_drug_set_index].manualmode_active > 0) {
				document.getElementById("nextratedescriptor").innerHTML = "Vol infused: ";
				document.getElementById("nextratepreposition").innerHTML = "";
				document.getElementById("timeremaincopy").innerHTML = "";
				document.getElementById("nextratecopy").innerHTML = Math.round(drug_sets[active_drug_set_index].volinf[Math.round(time_in_s)]*10)/10 + "ml";		
		} else if (drug_sets[active_drug_set_index].cet_active>0 && drug_sets[active_drug_set_index].IB_active == 1) {
			
			
				document.getElementById("nextratedescriptor").innerHTML = document.getElementById("infusiondescriptor").innerHTML;
				document.getElementById("nextratepreposition").innerHTML = "";
				document.getElementById("timeremaincopy").innerHTML = "";
				document.getElementById("nextratecopy").innerHTML = "";
			
		}
		if (PD_mode != 0) {
			document.getElementById("chartinfoptol").innerHTML = document.getElementById("ptoltitle").innerText + ": " + document.getElementById("ptolcard_right").innerText;
		}
	} else {
				document.getElementById("nextratedescriptor").innerHTML = "Waiting to start";
				document.getElementById("nextratepreposition").innerHTML = "";
				document.getElementById("timeremaincopy").innerHTML = "";
				document.getElementById("nextratecopy").innerHTML = "";		

	}
	document.getElementById("timecopy").innerHTML = converttime(Math.round(time_in_s));
	document.getElementById("cp_copy").innerHTML = document.getElementById("cp").innerHTML;
	document.getElementById("ce_copy").innerHTML = document.getElementById("ce").innerHTML;
	if (document.getElementById("pop_infrate").style.display == "inline-block") {
		document.getElementById("top_infrate").style.display = "block";
	} 

}

var popupUpdateInterval;

function popupUpdateFunction(dur) {
	clearInterval(popupUpdateInterval);
	popupUpdateInterval = setInterval(function() {
		if (dur%2 == 0) updatechart(popupchart);
		mirrorpopup();
	}, dur);
}

//numpad code goes here

var numpadValue = 0;
var numpadOrig;

function keypress(num) {
	let numString = document.getElementById("numpadOutputDisplay").innerHTML;
	//case: check preceding zero
	if (numString == "0") {
		if (num == "0") {
			//do nothing, don't add more zeroes
		} else {
			//delete this digit, i.e. the zero
			numString = num;
		}
	} else {
		numString = numString + num;	
	}

	//write to values
	document.getElementById("numpadOutputDisplay").innerHTML = numString;
	numpadValue = numString * 1;

	//compute displaypreview
	mirrorPreview();
}

function backspace() {
	let numString = document.getElementById("numpadOutputDisplay").innerHTML;
	//case: only digit
	if (numString.length == 1) {
		if (numString == "0") {
			//no change if already zero
		} else {
			numString = "0";	
		}
	} else {
		//case: 2nd last digit is dot	
		if (numString[numString.length-2] == ".") {
			numString = numString.slice(0,-2);
		} else {
			numString = numString.slice(0,-1);
		}
	}

	//write to values
	document.getElementById("numpadOutputDisplay").innerHTML = numString;
	numpadValue = numString * 1;

	//compute displaypreview
	mirrorPreview();
}

function decimal() {
	let numString = document.getElementById("numpadOutputDisplay").innerHTML;
	//case: see if there's a decimal point first
	if (numString.indexOf(".") == -1) {
		//dot not found
		numString = numString + ".";
	} else {
		//dot found, do nothing
	}

	//write to values
	document.getElementById("numpadOutputDisplay").innerHTML = numString;
	numpadValue = numString * 1;

	//compute displaypreview
	mirrorPreview();
}

function step(parameter) {
	let numString = document.getElementById("numpadOutputDisplay").innerHTML;
	//determine step size
	let stepSize = 0.1;
	if (drug_sets[active_drug_set_index].drug_name == "Alfentanil") {
		stepSize = 1;
	}
	if (parameter == "numpadOutputDisplayMinus") {
		//for step minus
		numpadValue = numpadValue - stepSize;
		if (numpadValue < 0) numpadValue = 0;
	} else {
		//for step plus
		numpadValue = numpadValue + stepSize;
	}
	numpadValue = Math.round(numpadValue * 10)/10;
	//write to values
	document.getElementById("numpadOutputDisplay").innerHTML = numpadValue;

	//compute displaypreview
	mirrorPreview();
}

function displayNumpad(parameter) {
	document.getElementById("popupchartcontainer").style.background = "#222";
	document.getElementById("numpadPreview").style.display = "block";
	document.getElementById("numpadBackground").style.display = "block";
	document.getElementById("numpadContainer").style.display = "block";
	document.getElementById("chartinfooverlay").classList.remove("open");
	document.getElementById("numpad_preview_msg").innerHTML = "Waiting for user input";
	if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
		numpadValue = Math.round(drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected*10)/10;
	} else {
		numpadValue = Math.round(drug_sets[active_drug_set_index].desired*10)/10;
	}
	if (parameter == "ce") {
		document.getElementById("pop_ce").classList.add("active");
		document.getElementById("numpadOutputDisplay").innerHTML = numpadValue;
		document.getElementById("numpadLine").classList.add("ce");
		document.getElementById("numpadTitle").innerHTML = "Quick Edit CE Target";
	} else if (parameter == "cp") {
		document.getElementById("pop_cp").classList.add("active");
		document.getElementById("numpadOutputDisplay").innerHTML = numpadValue;
		document.getElementById("numpadLine").classList.add("cp");
		document.getElementById("numpadTitle").innerHTML = "Quick Edit CP Target";
	}
	numpadOrig = numpadValue;
}

function resetNumpad() {
	numpadValue = numpadOrig;
	document.getElementById("numpadOutputDisplay").innerHTML = numpadValue;
	document.getElementById("numpad_preview_msg").innerHTML = "Waiting for user input";
}

function confirmNumpad(parameter) {
	document.getElementById(parameter).value = numpadValue;
	//first see if zero
	if (numpadValue == 0) {
		if (parameter == "inputDesiredCe0") {
			pauseCpt(0);
		} else if (parameter == "inputDesiredCe1") {
			pauseCpt(1);
		} else if (parameter == "inputDesired0") {
			pauseCpt(0);
		} else if (parameter == "inputDesired1") {
			pauseCpt(1);
		}
	} else {
		if (parameter == "inputDesiredCe0") {
			start_cet();
		} else if (parameter == "inputDesiredCe1") {
			start_cet_complex(numpadValue,1);
		} else if (parameter == "inputDesired0") {
			start_cpt();
		} else if (parameter == "inputDesired1") {
			start_cpt_complex(numpadValue,1);
		}
	}
	if (parameter == "inputDesiredCe0" || parameter == "inputDesiredCe1") {
		document.getElementById("chartinfodrugline2").innerHTML = "CET mode - Target " + numpadValue + drug_sets[active_drug_set_index].conc_units + "/ml"; 
	} else {
		document.getElementById("chartinfodrugline2").innerHTML = "CPT mode - Target " + numpadValue + drug_sets[active_drug_set_index].conc_units + "/ml"; 
	}

	//update numpadOrig
	numpadOrig = numpadValue;
	
	generateBoxes();
	hideNumpad();
}

function cancelNumpad() {
	//need to reset original desired conc too to prevent error
	if (drug_sets[active_drug_set_index].fentanyl_weightadjusted_flag == 1) {
		drug_sets[active_drug_set_index].fentanyl_weightadjusted_target_uncorrected = numpadOrig;
	} else {
		drug_sets[active_drug_set_index].desired = numpadOrig;
	}

	hideNumpad();
}
function hideNumpad() { // 
	
	document.getElementById("numpadPreview").style.display = "none";
	document.getElementById("numpadBackground").style.display = "none";
	document.getElementById("numpadContainer").style.display = "none";
	document.getElementById("chartinfooverlay").classList.add("open");
	
		document.getElementById("numpadLine").classList.remove("ce");
		document.getElementById("numpadLine").classList.remove("cp");
		document.getElementById("pop_cp").classList.remove("active");
		document.getElementById("pop_ce").classList.remove("active");
		//reset popup bg
		if (!isDark) {
			document.getElementById("popupchartcontainer").style.background = "white";
			//document.getElementById("popupchartcontainer").style.border = "0px solid transparent";
		} else {
			document.getElementById("popupchartcontainer").style.background = "#222";
		}
	
}

function mirrorPreview() {
	displaypreview2(numpadValue,active_drug_set_index);
	//need timeout?
	setTimeout(function() {
		document.getElementById("numpad_preview_msg").innerHTML = document.getElementById("preview_msg").innerHTML;
	},500);
}

//custom select dropdown code

function dropdownshow(ind) {
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

function dropdownhide() {
	document.getElementById("infusionrateselector0").classList.remove("active");
    document.getElementById("infusionratedropdown0").style.display = "none";
    if (complex_mode == 1) {
		document.getElementById("infusionrateselector1").classList.remove("active");
    	document.getElementById("infusionratedropdown1").style.display = "none";
    }		
    document.getElementById("infusionrateselector0").setAttribute("onclick", "dropdownshow(0)");
    document.getElementById("infusionrateselector1").setAttribute("onclick", "dropdownshow(1)");
}

function setInfusionUnit(parameter) {
	//parameter is ml/h vs unit/kg/time
	//optionsarray_infusionunit[0] is [1,0] when ml/h

	//only perform the change if the param is different from existing param
	if (optionsarray_infusionunit[0][parameter] != 1) {

		
		

		//set the option
		optionsarray_infusionunit[0] = (parameter == 0) ? [1,0] : [0,1];

		//get drug_sets infusion unit, if available, if not, get it from the option value
		if (drug_sets.length>0) {
			temp_unit = drug_sets[active_drug_set_index].inf_rate_permass_unit;	
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

/* failed code below 

let arrLines = new Array();
arrLines = [5,10];
let arrLables = new Array();
arrLabels = ["testline1", "testline2"];

function getEventLine(arg) {
	
	return arrLines[arg];
}

function getEventLabel(arg) {
	
	return arrLabels[arg];
}

*/


/*


function outputscheme_obsolete() {
	html2canvas(document.getElementById("historywrapper"), {
		width:600,
		height:600,
		useCORS:true
	}).then(function(canvas) {
		document.body.appendChild(canvas);
		const link = document.createElement('a');
	  link.download = 'download.png';
	  link.href = canvas.toDataURL();
	  link.click();
	  link.delete;
	});

}

*/


/*
function showMessage(message) {
  if (!("Notification" in window)) {
    // Code to run if notifications are not
    // supported by the visitor's browser
  } else {
    if (Notification.permission === "granted") {
      var notification = new Notification(message);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          var notification = new Notification(message);
        }
  });
    }
  }
}
*/
