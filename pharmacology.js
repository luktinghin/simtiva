//section: core pharmacology functions

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
			if (!TSon) {
				document.getElementById("card_infusion" + ind).classList.remove("hide");
			}
		}
		//off bolus for dexmedetomidine
		if (drug_sets[0].drug_name == "Dexmedetomidine") {
			document.getElementById("card_bolus0").style.display = "none";
			document.getElementById("tableInitialBolus" + ind).style.display = "none";
			document.getElementById("tableInfusionRate" + ind).classList.remove("line");
		}

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
		if (document.getElementById("inputDesiredCe0_new").value>0) {
			drug_sets[active_drug_set_index].desired = 0;
			drug_sets[active_drug_set_index].firstrun = 0;
			drug_sets[active_drug_set_index].running = 1;

			offset = Date.now();
			if (document.getElementById("inputDesiredCe0_new").value>0) {
				desired = document.getElementById("inputDesiredCe0_new").value *1;
			}
			drug_sets[active_drug_set_index].cet_active = 1;

			deliver_cet(desired, active_drug_set_index);
			
			//UI code goes here
			drug_sets[active_drug_set_index].running = 1;
			document.getElementById("status").innerHTML="";
			document.getElementById("btn_startCet0_new").innerHTML = `<div class="icon"><i class="fas fa-play fa-fw"></i></div><div class="input-button-text">Enter</div></a>`;
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("pastscheme").classList.add("show");
		} else {
			displayWarning("Warning","CE Target Invalid.");
			document.getElementById("inputDesiredCe0_new").value = "";
		}
	} else {
		if (document.getElementById("inputDesiredCe0_new").value>0) {
			desired = document.getElementById("inputDesiredCe0_new").value *1;
			drug_sets[active_drug_set_index].running = 1;
			document.getElementById("status").innerHTML="";
			document.getElementById("iconplay").classList.remove("stop");
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			document.getElementById("iconplay").innerHTML="<i class='fas fa-play fa-lg'></i>";
			drug_sets[active_drug_set_index].cet_active = 1;
			deliver_cet(desired,0);
		} else {
			displayWarning("Warning","CE Target Invalid.");
			document.getElementById("inputDesiredCe0_new").value = "";
		}
	}
	alert_api(0);
	displaypreview_hide_onsubmit();
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
			document.getElementById("btn_startCpt1_new").innerHTML = `<div class="icon"><i class="fas fa-play fa-fw"></i></div><div class="input-button-text">Enter</div></a>`;
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
	displaypreview_hide_onsubmit();

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
			document.getElementById("inputDesiredCe1_new").value = "";
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
			document.getElementById("inputDesiredCe1_new").value = "";
		}
	}
	displaypreview_hide_onsubmit();
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

function start_manual(ind) { //this is new	

	if (complex_mode == 1) {
		if ((drug_sets[active_drug_set_index].firstrun == -1) && (drug_sets[alt_drug_set_index].firstrun == -1)) {
			common_start_calls();
		}
	} else if (drug_sets[ind].firstrun == -1) {
		common_start_calls();
	}

	lookaheadpreviewhide();

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
		if (drug_sets[ind].drug_name != "Dexmedetomidine") {
			document.getElementById("tableInitialBolus" + ind).style.display = "none";
			document.getElementById("tableInfusionRate" + ind).classList.remove("line");
			document.getElementById("card_bolus" + ind).style.display ="";
			document.getElementById("card_bolus" + ind).classList.remove("hide");
		}

		
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
		
			desired = document.getElementById("inputDesired0").value * 1;
		
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

function runinfusion2() {
	drug_sets[0].inf_rate_mls = getinfusionrate(time_in_s,0);
	drug_sets[0].inf_rate_permass = drug_sets[0].inf_rate_mls*drug_sets[0].infusate_concentration*drug_sets[0].inf_rate_permass_factor/mass;
	result = Math.round(getcp(time_in_s,0)*100)/100;
	result_e = Math.round(getce(time_in_s,0)*100)/100;
	displayresult(result, result_e);
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



function preview_cpt(x,ind) {
	drug_sets[ind].desired = x;
	drug_sets[ind].preview_bolus = 0;
	drug_sets[ind].cpt_bolus = 0;
	drug_sets[ind].preview_rate = 0;
	drug_sets[ind].previewhistorytext = "";
		max_rate_input = drug_sets[ind].max_rate;
		bolus_duration = 0;
	if (drug_sets[ind].previewhistoryarray == undefined) drug_sets[ind].previewhistoryarray = new Array();
	//new code
	drug_sets[ind].previewhistoryarray.length = 0;
	if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
		drug_sets[ind].fentanyl_weightadjusted_target_uncorrected = drug_sets[ind].desired;
		drug_sets[ind].desired = drug_sets[ind].desired * 1/drug_sets[ind].fentanyl_weightadjusted_factor;
	}
	working_clock = Math.floor(time_in_s); //backup the time at this point, in S
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
	p_state3[1] = p_state[1];
	p_state3[2] = p_state[2];
	p_state3[3] = p_state[3];

	var test_rate; //real rate entered into virtual state
	var trial_rate; //future rate
	var trial_cp; //future CP
	var est_cp; //last available CP

	est_cp = p_state2[1]+p_state2[2]+p_state2[3];

	if (drug_sets[active_drug_set_index].running == 1) {
		test_rate = drug_sets[ind].cpt_rates_real[working_clock-1];
		console.log("cpt_rates_real retrieved to be" + test_rate*3600/10);
	}


		if (max_rate_input == 0) {
			//if (drug_sets[ind].cpt_rates_real.length == 0) {
			//	drug_sets[ind].cpt_bolus = (drug_sets[ind].desired-(p_state[1]+p_state[2]+p_state[3])) * drug_sets[ind].vc;  //bolus round up to 10mg
			//} else {
				drug_sets[ind].cpt_bolus = (drug_sets[ind].desired-(p_state[1]+p_state[2]+p_state[3]))/drug_sets[ind].p_udf[1];
			//}
			if (drug_sets[ind].cpt_bolus>=90) {
				drug_sets[ind].cpt_bolus = Math.round(drug_sets[ind].cpt_bolus/10)*10;
			} else if (drug_sets[ind].cpt_bolus>1) {
					if ((mass>30) && (drug_sets[ind].cpt_bolus>=30)) {
						drug_sets[ind].cpt_bolus = Math.ceil(drug_sets[ind].cpt_bolus/5)*5; //round up to nearest 5mg
					} else {
						drug_sets[ind].cpt_bolus = Math.ceil(drug_sets[ind].cpt_bolus);
					}
			} else {
				drug_sets[ind].cpt_bolus = 0;
			}
		} else {
			temp_difference = (drug_sets[ind].desired-(p_state[1]+p_state[2]+p_state[3]));
			max_rate_input_persec = max_rate_input * drug_sets[ind].infusate_concentration/60/60;
			for (counter_rate = 1; counter_rate<302; counter_rate++) {
				if (temp_difference/drug_sets[ind].p_udf[counter_rate] < max_rate_input_persec) break;
			}
			counter_rate = counter_rate -2;
			if (counter_rate<=0) counter_rate = 0;
			console.log(counter_rate);
			drug_sets[ind].cpt_bolus = counter_rate * max_rate_input_persec;
			console.log(drug_sets[ind].cpt_bolus);
		}

//new first pass

	//new code
	//if (effect_flag == 0) {


		if (drug_sets[ind].cpt_bolus > 0) scheme_bolusadmin(drug_sets[ind].cpt_bolus, ind, max_rate_input);
		if (bolus_duration>0) {
			test_rate = max_rate_input * infusate_concentration/60/60;
			//need normalize p_state
			p_state3[1] = p_state2[1];
			p_state3[2] = p_state2[2];
			p_state3[3] = p_state2[3];
		}
		//if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
			//drug_sets[ind].historytext = "<div class='schemecpt' data-time='" + working_clock + "'>" + "Preview scheme at " + converttime(working_clock) + " - <br>Cp target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";
		//} else {
			//drug_sets[ind].historytext = "<div class='schemecpt' data-time='" + working_clock + "'>" + "Preview scheme at " + converttime(working_clock) + " - <br>Cp target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].desired + "</div>";
		//}
		if (drug_sets[ind].cpt_bolus > 0) {
			if (bolus_duration>0) {
				drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemebolus' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Bolus: " + drug_sets[ind].cpt_bolus + drug_sets[ind].infused_units + " <span style='opacity:0.5'>(" + Math.round(drug_sets[ind].cpt_bolus/drug_sets[ind].infusate_concentration*10)/10 + "ml)</span> over " + converttime(bolus_duration) + "</div>");
				working_clock += bolus_duration;
			} else {
				drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemebolus' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Bolus: " + drug_sets[ind].cpt_bolus + drug_sets[ind].infused_units + " <span style='opacity:0.5'>(" + Math.round(drug_sets[ind].cpt_bolus/drug_sets[ind].infusate_concentration*10)/10 + "ml)</span></div>");
			}
		}

		//if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
			//drug_sets[ind].historyarrays.push([1,0,working_clock,drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);
		//} else {
			//drug_sets[ind].historyarrays.push([1,0,working_clock,drug_sets[ind].desired]);
		//}
		//drug_sets[ind].historyarrays.push([1,1,working_clock,drug_sets[ind].cpt_bolus]);
	//}
	//

	cpt_pause = 0;
	if (est_cp >= drug_sets[ind].desired) {
		while (est_cp>=drug_sets[ind].desired) {
			cpt_pause = cpt_pause + 1;
			est_cp = virtual_model(p_state3[1],p_state3[2],p_state3[3],0,cpt_pause,0,ind);
		}
		console.log("cpt_pause" + cpt_pause);
		for (i=0; i<cpt_pause; i++) {

			p_state3[1] = p_state3[1] * Math.exp(-drug_sets[ind].lambda[1]);
			p_state3[2] = p_state3[2] * Math.exp(-drug_sets[ind].lambda[2]);
			p_state3[3] = p_state3[3] * Math.exp(-drug_sets[ind].lambda[3]);


			//drug_sets[ind].cpt_rates_real.push(0);
			//drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
			//drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
			//drug_sets[ind].volinf.push(temp_vol);

			//if (i%10==0) {
			//	myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:p_state3[1]+p_state3[2]+p_state3[3]});
			//	myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:e_state3[1]+e_state3[2]+e_state3[3]+e_state3[4]});
			//}
		}
		drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemepause' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Paused for " + converttime(cpt_pause) + "</div>");
		//drug_sets[ind].historyarray.push([Math.floor(working_clock),0]); 
		working_clock = working_clock + cpt_pause;
		console.log('working clock is now' + working_clock);

	}

	cpt_interval = 120; //set to 120seconds

	var look_l1 = Math.exp(-drug_sets[ind].lambda[1] * cpt_interval); 
	var look_l2 = Math.exp(-drug_sets[ind].lambda[2] * cpt_interval);
	var look_l3 = Math.exp(-drug_sets[ind].lambda[3] * cpt_interval);
	var look_l4 = Math.exp(-drug_sets[ind].lambda[4] * cpt_interval);

	//pop the arrays
	drug_sets[ind].cpt_rates.length = 0;
	drug_sets[ind].cpt_times.length = 0;

	for (i=0; i<60; i++) {
		//if ((p_state2[1] == 0) || (skip == 1)) {
			console.log(i*120);
		if (p_state3[1] == 0) {
				test_rate = drug_sets[ind].desired / drug_sets[ind].p_udf[cpt_interval];
				drug_sets[ind].cpt_rates.push(test_rate);
				console.log("testrate" + test_rate);
		} else { // taken from line 1970, double model(...
			
				est_cp = p_state3[1] + p_state3[2] + p_state3[3];

				console.log("-----" + converttime(i*120) + "------");

				trial_cp = virtual_model( //need real lambda
				 p_state3[1] * Math.exp(-drug_sets[ind].lambda[1]) + drug_sets[ind].p_coef[1] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[1])),
				 p_state3[2] * Math.exp(-drug_sets[ind].lambda[2]) + drug_sets[ind].p_coef[2] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[2])),
				 p_state3[3] * Math.exp(-drug_sets[ind].lambda[3]) + drug_sets[ind].p_coef[3] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[3])),0,cpt_interval,0,ind);

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

			p_state3[1] = p_state3[1] * look_l1 + drug_sets[ind].p_coef[1] * test_rate * (1 - look_l1);
			p_state3[2] = p_state3[2] * look_l2 + drug_sets[ind].p_coef[2] * test_rate * (1 - look_l2);
			p_state3[3] = p_state3[3] * look_l3 + drug_sets[ind].p_coef[3] * test_rate * (1 - look_l3);
			//est_cp = p_state2[1] + p_state2[2] + p_state2[3];
			//console.log("est cp" + est_cp);
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
			}
		}
	} else if (drug_sets[ind].drug_name == "Dexmedetomidine") {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 > 10) {
				cpt_threshold = 0.25;
				cpt_avgfactor = 0.5;
			} else {
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.75;
			}
		} else if (optionsarray[2][1] == 1) { //lazy
				cpt_threshold = 0.25;
				cpt_avgfactor = 0.5;
		} else if (optionsarray[2][2] == 1) { //accurate
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.75;
		}
	} else if (drug_sets[ind].drug_name == "Ketamine") {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 > 5) {
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.52;
			} else {
				cpt_threshold = 0.1;
				cpt_avgfactor = 0.65;
			}
		} else if (optionsarray[2][1] == 1) { //lazy
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.52;
		} else if (optionsarray[2][2] == 1) { //accurate
				cpt_threshold = 0.1;
				cpt_avgfactor = 0.65;
		}
	} else {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 >= 30) {
				cpt_threshold = 0.08;
				cpt_avgfactor = 0.667;
			} else {
				cpt_threshold = 0.05;
				cpt_avgfactor = 0.62;
			}
		}
	}

	//second pass

	//automatically determine high or low rounding factor (3600->round to 0.1, 360->round to 1)
	if ((paedi_mode == 1) || (drug_sets[ind].cpt_rates[5]<40/360)) {
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
	var wait_pause = 1;
	var wait_peak = 0;
	var wait_cpt_avg = 0;


		for (j=0; j<60; j++) {
			
			//temp_test_rate = cpt_rates[j/60];
			if (firstcycle == -1) {
				if ((drug_sets[ind].cpt_rates[0] > 0) && (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1]) || ((bolus_duration > 0) && (drug_sets[ind].cpt_bolus > 0))) { //this is a type of decremental infusion rates - can use normal algorithm
					wait_peak = 0; //reset wait peak to zero to avoid bug
					prior_test_rate = drug_sets[ind].cpt_rates[1];
					drug_sets[ind].cpt_times.push(1);
				} else if ((drug_sets[ind].cpt_rates[0] > 0) && (drug_sets[ind].cpt_rates[1]>drug_sets[ind].cpt_rates[0]) && (bolus_duration == 0)) { //special scenario where there is slow rise in inf rate to peak then falls
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
						//for (k=0; k<breakpoint*120; k++) {
						//	drug_sets[ind].cpt_rates_real.push(wait_rate_avg_begin);
						//}
						//for (k=breakpoint; k<wait_peak*120; k++) {
						//	drug_sets[ind].cpt_rates_real.push(wait_rate_avg_end);
						//}

						prior_test_rate = drug_sets[ind].cpt_rates[wait_peak];
						drug_sets[ind].cpt_times.push(wait_peak);
						
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + Math.round(wait_rate_avg_begin*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_rate_avg_begin*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].previewhistoryarray.push([working_clock, wait_rate_avg_begin]);
						

						if (wait_rate_avg_end > wait_rate_avg_begin) {
							relativetime = working_clock + breakpoint*120;
							drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + Math.round(wait_rate_avg_end*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_rate_avg_end*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
							drug_sets[ind].previewhistoryarray.push([relativetime, wait_rate_avg_end]);
						}

					} else { // so this is then wait_peak <=5
						// take average and round to nearest 0.5
						wait_temp1 = Math.round((drug_sets[ind].cpt_rates[wait_peak] + drug_sets[ind].cpt_rates[1])/2*roundingfactor)/roundingfactor;
						console.log("enter short wait peak mode-------------");
						//console.log("wait_temp1 = " + wait_temp1*360);

						//for (k=0; k<wait_peak*120; k++) {
						//	drug_sets[ind].cpt_rates_real.push(wait_temp1);
						//}
						prior_test_rate = drug_sets[ind].cpt_rates[wait_peak];
						drug_sets[ind].cpt_times.push(wait_peak);
						
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + Math.round(wait_temp1*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_temp1*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].previewhistoryarray.push([working_clock, wait_temp1]);
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
						//for (k=0; k<wait_pause*120; k++) {
						//	drug_sets[ind].cpt_rates_real.push(0);
						//}
						//for (k=wait_pause; k<breakpoint*120; k++) {
						//	drug_sets[ind].cpt_rates_real.push(wait_rate_avg_begin);
						//}
						//for (k=breakpoint; k<wait_peak*120; k++) {
						//	drug_sets[ind].cpt_rates_real.push(wait_rate_avg_end);
						//}

						prior_test_rate = cpt_rates[wait_peak];
						drug_sets[ind].cpt_times.push(wait_peak);
						relativetime = working_clock + wait_pause*120;
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Paused for " + wait_pause*2 + " mins </div>");
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + Math.round(wait_rate_avg_begin*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_rate_avg_begin*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].previewhistoryarray.push([working_clock, 0]);
						drug_sets[ind].previewhistoryarray.push([relativetime, wait_rate_avg_begin]);

						if (wait_rate_avg_end > wait_rate_avg_begin) {
							relativetime = working_clock + breakpoint*120;
							drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" +  converttime(relativetime) + "</div>" + Math.round(wait_rate_avg_end*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_rate_avg_end*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
							drug_sets[ind].previewhistoryarray.push([relativetime, wait_rate_avg_end]);
						}

					} else { // so this is then wait_peak <=5
						// take average and round to nearest 0.5
						wait_temp1 = Math.round((drug_sets[ind].cpt_rates[wait_peak] + drug_sets[ind].cpt_rates[wait_pause+1])/2*roundingfactor)/roundingfactor;
						console.log("enter short wait peak mode-------------");
						//console.log("wait_temp1 = " + wait_temp1*360);
						//for (k=0; k<wait_pause*120; k++) {
						//	drug_sets[ind].cpt_rates_real.push(0);
						//}
						//for (k=wait_pause; k<wait_peak*120; k++) {
						//	drug_sets[ind].cpt_rates_real.push(wait_temp1);
						//}
						prior_test_rate = drug_sets[ind].cpt_rates[wait_peak];
						drug_sets[ind].cpt_times.push(wait_peak);
						relativetime = working_clock + wait_pause*120;
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" +  converttime(working_clock) + "</div>Paused for " + wait_pause*2 + " mins </div>");
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" +  converttime(relativetime) + "</div>" + Math.round(wait_temp1*3600/drug_sets[ind].infusate_concentration*10)/10 + "ml/h " + "<span style='opacity:0.5'>(" + Math.round(wait_temp1*3600*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].previewhistoryarray.push([working_clock, 0]);
						drug_sets[ind].previewhistoryarray.push([relativetime, wait_temp1]);
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
					//if ((drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1) && (drug_sets[ind].cpt_rates[0]>0) && (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1])) {
					//	for (k=0; k<120; k++) {drug_sets[ind].cpt_rates_real.push(test_rate);}
					//}
					//for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<j*120; k++) {
					//		drug_sets[ind].cpt_rates_real.push(test_rate);
					//}
					console.log(test_rate*3600/10 + " - from " + drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120 + " to " + j*120 + "s");

					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;

					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;
					if ((bolus_duration > 0) && (drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1)) {
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
						drug_sets[ind].previewhistoryarray.push([working_clock, test_rate]);
					} else {
						if ((drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1) && (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1])) {
							drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
							drug_sets[ind].previewhistoryarray.push([working_clock, test_rate]);
						} else {
							drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
							drug_sets[ind].previewhistoryarray.push([relativetime, test_rate]);
						}
					}

					drug_sets[ind].cpt_times.push(j);
					prior_test_rate = drug_sets[ind].cpt_rates[j];
				}

				if (j==59) {
					test_rate = Math.round(((drug_sets[ind].cpt_rates[drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]]-drug_sets[ind].cpt_rates[j])*cpt_avgfactor+drug_sets[ind].cpt_rates[j])*roundingfactor)/roundingfactor;
					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;
					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;
					drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
					drug_sets[ind].previewhistoryarray.push([relativetime, test_rate]);
					//for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<7200; k++) {
					//		drug_sets[ind].cpt_rates_real.push(test_rate);
					//}

					//var tempArray = new Array();
					//for (i=0; i<drug_sets[ind].historyarray.length; i++) {
					//	tempArray.push(drug_sets[ind].historyarray[i]);
					//}
					//drug_sets[ind].historyarrays.push([1,2,working_clock,tempArray]);
				}
			}
		}//end for 1-60


	drug_sets[ind].preview_bolus = drug_sets[ind].cpt_bolus;
	if (cpt_pause > 0) {
		drug_sets[ind].preview_rate = 0;	
	} else {
		drug_sets[ind].preview_rate = Math.round(drug_sets[ind].previewhistoryarray[0][1]*3600/drug_sets[ind].infusate_concentration*10)/10;
	}
	drug_sets[ind].preview_downtrend = (drug_sets[ind].cpt_rates_real[working_clock-1] > test_rate);
}

function displaypreview(x,ind) {
	clearTimeout(timeout2);
	timeout2 = setTimeout(function(){displaypreview2(x,ind);},600);
}

function displaypreview2(x,ind) {
	//check if expanded first
	var object = document.getElementById("preview");
	ableToExpand = ((drug_sets[ind].cpt_active > 0) || ((drug_sets[ind].cet_active > 0) && (drug_sets[ind].IB_active==0)));
	if (ableToExpand) {
		document.getElementById("preview-expand-button").style.display = "block";
		if (!object.classList.contains("expand")) {
			if (previewtimeout != null) {clearTimeout(previewtimeout);}
			object.style.display="flex";
			if (object.classList.contains('animate')) {object.classList.remove('animate');}
			if (document.getElementById("preview-expand-button").classList.contains("animate2")) document.getElementById("preview-expand-button").classList.remove("animate2");
			setTimeout(function() {
				object.classList.add('animate');
				document.getElementById("preview-expand-button").classList.add('animate2');
			},400);
			previewtimeout = setTimeout(function(){
				object.style.display="none";
				document.getElementById("preview-expand-button").style.display = "none";
			},11500);
		}  
	} else {
		if (previewtimeout != null) {clearTimeout(previewtimeout);}
		object.style.display="flex";
		if (object.classList.contains('animate')) {object.classList.remove('animate');}
		setTimeout(function() {
			object.classList.add('animate');
		},400);
		previewtimeout = setTimeout(function(){
			object.style.display="none";
		},11500);
	}
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
			if (object.classList.contains("expand")) {
				document.getElementById("preview-expand-box").innerHTML = drug_sets[active_drug_set_index].previewhistorytext;
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
			if (object.classList.contains("expand")) {
				document.getElementById("preview-expand-box").innerHTML = drug_sets[active_drug_set_index].previewhistorytext;
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

function displaypreview_expand() {
	document.getElementById("preview-expand-box").innerHTML = drug_sets[active_drug_set_index].previewhistorytext;
	document.getElementById("prompts_container").classList.add("expand");
	document.getElementById("preview").classList.remove("animate");
	document.getElementById("preview-expand-button").classList.remove("animate2");
	document.getElementById("preview").style.display = "flex";
	document.getElementById("preview").classList.add("expand");
	clearTimeout(previewtimeout);
	previewtimeout = null;
	setTimeout(function() {
		document.getElementById("preview-expand-box").classList.add("expand");
		document.getElementById("preview-expand-button").innerHTML = `<i class="fas fa-angle-double-up"></i> &nbsp; <span>HIDE</span>`;
		document.getElementById("preview-expand-button").setAttribute("onclick","displaypreview_hide()");
	},200);
}

function displaypreview_hide() {	
	document.getElementById("preview-expand-box").classList.remove("expand");
	document.getElementById("preview").classList.add("animate");
	document.getElementById("preview-expand-button").classList.add("animate2");
	//document.getElementById("preview").style.display = "flex";
	document.getElementById("preview").classList.remove("expand");
	setTimeout(function() {
		document.getElementById("prompts_container").classList.remove("expand");
	},300);
	setTimeout(function() {
		document.getElementById("preview-expand-button").innerHTML = `<i class="fas fa-angle-double-down"></i> &nbsp; <span>EXPAND</span>`;
		document.getElementById("preview-expand-button").setAttribute("onclick","displaypreview_expand()");
	},500);
	if (document.getElementById("preview").classList.contains('animate')) {document.getElementById("preview").classList.remove('animate');}
	if (document.getElementById("preview-expand-button").classList.contains("animate2")) document.getElementById("preview-expand-button").classList.remove("animate2");
	setTimeout(function() {
				document.getElementById("preview").classList.add('animate');
				document.getElementById("preview-expand-button").classList.add('animate2');
			},400);
	previewtimeout = setTimeout(function() {
		document.getElementById("preview").style.display = "none";
		document.getElementById("preview-expand-button").style.display = "none";
	},11500);
}

function displaypreview_hide_onsubmit() {
	if (parseloading == 0) {
		document.getElementById("preview-expand-box").classList.remove("expand");
		document.getElementById("preview").classList.remove("expand");
			document.getElementById("prompts_container").classList.remove("expand");
			document.getElementById("preview-expand-button").innerHTML = `<i class="fas fa-angle-double-down"></i> &nbsp; <span>EXPAND</span>`;
			document.getElementById("preview-expand-button").setAttribute("onclick","displaypreview_expand()");	
			document.getElementById("preview-expand-button").style.display = "none";
		if (!document.getElementById("preview").classList.contains("animate"))	{
			//situation where preview animation fade is NOT active, i.e. the hiding of preview is not yet active
			document.getElementById("preview").classList.add("animate");
			previewtimeout = null;
			clearTimeout(previewtimeout);
			previewtimeout = setTimeout(function() {
				document.getElementById("preview").style.display = "none";
			},11500);
		} else {

		}
	}


}
	

function displaypreview_close() {

}

function hidepreview() {
	document.getElementById("preview").style.display="none";
}
function deliver_cpt(x, effect_flag, compensation, ind, continuation_fen_weightadj_flag) {
	max_rate_input = drug_sets[ind].max_rate;
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
		p_state[1] = drug_sets[ind].cpt_cp[drug_sets[ind].cpt_cp.length-1][0];
		p_state[2] = drug_sets[ind].cpt_cp[drug_sets[ind].cpt_cp.length-1][1];
		p_state[3] = drug_sets[ind].cpt_cp[drug_sets[ind].cpt_cp.length-1][2];

		e_state[1] = drug_sets[ind].cpt_ce[drug_sets[ind].cpt_ce.length-1][0];
		e_state[2] = drug_sets[ind].cpt_ce[drug_sets[ind].cpt_ce.length-1][1];
		e_state[3] = drug_sets[ind].cpt_ce[drug_sets[ind].cpt_ce.length-1][2];
		e_state[4] = drug_sets[ind].cpt_ce[drug_sets[ind].cpt_ce.length-1][3];
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
		console.log(p_state2[1]+ p_state2[2] + p_state2[3]);
		console.log(e_state2[1]+ e_state2[2] + e_state2[3] + e_state2[4]);
	}
	

	if (drug_sets[active_drug_set_index].running == 1) {
		test_rate = drug_sets[ind].cpt_rates_real[working_clock-1];
		console.log("cpt_rates_real retrieved to be" + test_rate*3600/10);
	}




	//if (drug_sets[ind].firstrun == -1) { //sample bolus code
		//scheme_bolusadmin(Math.ceil(desired * vc /10)*10); // round up to the next 10mg for bolus
		drug_sets[0].cpt_bolus = 0;
		bolus_duration = 0;
		if (effect_flag == 0) {
			if (max_rate_input == 0) {
				//if (drug_sets[ind].cpt_rates_real.length == 0) {
					//drug_sets[ind].cpt_bolus = (drug_sets[ind].desired-(p_state[1]+p_state[2]+p_state[3])) * drug_sets[ind].vc;  //old code. not compatible with ketamine. delete.
					drug_sets[ind].cpt_bolus = (drug_sets[ind].desired-(p_state[1]+p_state[2]+p_state[3]))/drug_sets[ind].p_udf[1];
				//} else {
				//	drug_sets[ind].cpt_bolus = (drug_sets[ind].desired-(p_state[1]+p_state[2]+p_state[3]))/drug_sets[ind].p_udf[1];
				//}
					if (drug_sets[ind].cpt_bolus>=90) {
						drug_sets[ind].cpt_bolus = Math.round(drug_sets[ind].cpt_bolus/10)*10;
					} else if (drug_sets[ind].cpt_bolus>1) {
						if ((mass>30) && (drug_sets[ind].cpt_bolus>=30)) {
							drug_sets[ind].cpt_bolus = Math.ceil(drug_sets[ind].cpt_bolus/5)*5; //round up to nearest 5mg
						} else {
							drug_sets[ind].cpt_bolus = Math.ceil(drug_sets[ind].cpt_bolus) ;
						}
					} else {
						drug_sets[ind].cpt_bolus = 0;
					}
			} else {
				temp_difference = (drug_sets[ind].desired-(p_state[1]+p_state[2]+p_state[3]));
				max_rate_input_persec = max_rate_input * drug_sets[ind].infusate_concentration/60/60;
				for (counter_rate = 1; counter_rate<302; counter_rate++) {
					if (temp_difference/drug_sets[ind].p_udf[counter_rate] < max_rate_input_persec) break;
				}
				counter_rate = counter_rate -2;
				if (counter_rate<=0) counter_rate = 0;
				drug_sets[ind].cpt_bolus = counter_rate * max_rate_input_persec;
			}
			console.log("bolus mg " + drug_sets[ind].cpt_bolus + "entered into virtualstate");
		}
		//drug_sets[ind].firstrun = 0;
		//myChart.data.datasets[2].data.push({x:working_clock/60, y:trial_result});
	//}

	if (effect_flag == 0) {
		if (drug_sets[ind].cpt_bolus > 0) {
			bolus_duration = 0;
			bolusadmin(drug_sets[ind].cpt_bolus, ind, max_rate_input);
			if (bolus_duration>0) {
				working_clock += bolus_duration;
				p_state2[1] = p_state3[1];
				p_state2[2] = p_state3[2];
				p_state2[3] = p_state3[3];
				e_state2[1] = e_state3[1];
				e_state2[2] = e_state3[2];
				e_state2[3] = e_state3[3];
				e_state2[4] = e_state3[4];
				drug_sets[ind].historyarray.push([Math.floor(time_in_s),0]);
				let bolus_array = new Array();
				bolus_array.push(drug_sets[ind].cpt_bolus);
				bolus_array.push(max_rate_input);
				bolus_array.push(bolus_duration);
				drug_sets[ind].historyarray.push([Math.floor(time_in_s),bolus_array]); 
				test_rate = drug_sets[ind].cpt_rates_real[working_clock-1];
			} else {
				drug_sets[ind].historyarray.push([Math.floor(time_in_s),0]);
			}

		}

		if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
			drug_sets[ind].historytext = "<div class='schemecpt' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Cp target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";
		} else {
			drug_sets[ind].historytext = "<div class='schemecpt' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Cp target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].desired + "</div>";
		}
		if (drug_sets[ind].cpt_bolus > 0) {
			drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemebolus nobolus' data-time='" + Math.floor(time_in_s) + "'>" + "<div class='timespan'>" + converttime(Math.floor(time_in_s)) + "</div>Bolus: " + drug_sets[ind].cpt_bolus + drug_sets[ind].infused_units + " <span style='opacity:0.7;font-weight:normal'>(" + Math.round(drug_sets[ind].cpt_bolus/drug_sets[ind].infusate_concentration*10)/10 + "ml)</span></div>");
			if (bolus_duration > 0) drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeboluscptduration' data-time='" + Math.floor(time_in_s) + "''>" + "<div class='timespan'>" + converttime(Math.floor(time_in_s)) + "</div>Given over " + converttime(bolus_duration) + " at " + max_rate_input + "ml/h </div>");
		}


		if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
			if (drug_sets[ind].max_rate > 0) {
				drug_sets[ind].historyarrays.push([1,0,Math.floor(time_in_s),drug_sets[ind].fentanyl_weightadjusted_target_uncorrected,drug_sets[ind].max_rate]);	
			} else {
				drug_sets[ind].historyarrays.push([1,0,Math.floor(time_in_s),drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);	
			}
		} else {
			if (drug_sets[ind].max_rate > 0) {
				drug_sets[ind].historyarrays.push([1,0,Math.floor(time_in_s),drug_sets[ind].desired,drug_sets[ind].max_rate]);	
			} else {
				drug_sets[ind].historyarrays.push([1,0,Math.floor(time_in_s),drug_sets[ind].desired]);
			}
		}
		if (bolus_duration>0) {
			drug_sets[ind].historyarrays.push([1,1,Math.floor(time_in_s),drug_sets[ind].cpt_bolus,max_rate_input,bolus_duration]);
		} else {
			drug_sets[ind].historyarrays.push([1,1,working_clock,drug_sets[ind].cpt_bolus]);	
		}
		
	}

	//new first pass
	est_cp = p_state2[1] + p_state2[2] + p_state2[3];
	if (working_clock==0) {
		temp_vol = 0;
	} else {
		temp_vol = drug_sets[ind].volinf[working_clock-1];
	};
	cpt_pause = 0;
	if ((effect_flag == 0) && (est_cp >= drug_sets[ind].desired) && (bolus_duration == 0)) {
		while (est_cp>=drug_sets[ind].desired) {
			cpt_pause = cpt_pause + 1;
			est_cp = virtual_model(p_state2[1],p_state2[2],p_state2[3],0,cpt_pause,0,ind);
		}
		console.log("cpt_pause" + cpt_pause);
		for (i=0; i<cpt_pause; i++) {

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
		drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemepause' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Paused for " + converttime(cpt_pause) + "</div>");
		drug_sets[ind].historyarray.push([Math.floor(working_clock),0]); 
		working_clock = working_clock + cpt_pause;
		console.log('working clock is now' + working_clock);

		//normalize p and e states
		p_state2[1] = p_state3[1];
		p_state2[2] = p_state3[2];
		p_state2[3] = p_state3[3];
		e_state2[1] = e_state3[1];
		e_state2[2] = e_state3[2];
		e_state2[3] = e_state3[3];
		e_state2[4] = e_state3[4];
	}

	//first pass
	for (i=0; i<180; i++) {
		//if ((p_state2[1] == 0) || (skip == 1)) {
		if (p_state2[1] == 0) {
				test_rate = drug_sets[ind].desired / drug_sets[ind].p_udf[cpt_interval];
				drug_sets[ind].cpt_rates.push(test_rate);
		//	if (skip == 1) {
		//		test_rate = cpt_rates_real[Math.floor(working_clock)-1];
		//		cpt_times.push(i);
		//		cpt_rates.push(test_rate);
		//		skip = 0;
		//		alert(test_rate);
		//	}
		} else { // taken from line 1970, double model(...
			
				est_cp = p_state2[1] + p_state2[2] + p_state2[3];

				//console.log("-----" + converttime(i*120) + "------");

				trial_cp = virtual_model( //need real lambda
				 p_state2[1] * Math.exp(-drug_sets[ind].lambda[1]) + drug_sets[ind].p_coef[1] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[1])),
				 p_state2[2] * Math.exp(-drug_sets[ind].lambda[2]) + drug_sets[ind].p_coef[2] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[2])),
				 p_state2[3] * Math.exp(-drug_sets[ind].lambda[3]) + drug_sets[ind].p_coef[3] * test_rate * (1 - Math.exp(-drug_sets[ind].lambda[3])),0,cpt_interval,0,ind);

				if (drug_sets[ind].desired > trial_cp) {
					trial_rate = (drug_sets[ind].desired - trial_cp)/drug_sets[ind].p_udf[cpt_interval];
				} else { trial_rate = 0;}

				
				//console.log("estCp" + est_cp);
				//console.log("trialcp" + trial_cp);
				//console.log("testrate" + test_rate);
				//console.log("trialrate" + trial_rate);

				
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
			}
		}
	} else if (drug_sets[ind].drug_name == "Dexmedetomidine") {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 > 10) {
				cpt_threshold = 0.25;
				cpt_avgfactor = 0.5;
			} else {
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.75;
			}
		} else if (optionsarray[2][1] == 1) { //lazy
				cpt_threshold = 0.25;
				cpt_avgfactor = 0.5;
		} else if (optionsarray[2][2] == 1) { //accurate
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.75;
		}
	} else if (drug_sets[ind].drug_name == "Ketamine") {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 > 5) {
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.52;
			} else {
				cpt_threshold = 0.1;
				cpt_avgfactor = 0.65;
			}
		} else if (optionsarray[2][1] == 1) { //lazy
				cpt_threshold = 0.15;
				cpt_avgfactor = 0.52;
		} else if (optionsarray[2][2] == 1) { //accurate
				cpt_threshold = 0.1;
				cpt_avgfactor = 0.65;
		}
	} else {
		if (cpt_threshold_auto == 1) {
			if (drug_sets[ind].cpt_rates[5]*360 >= 30) {
				cpt_threshold = 0.08;
				cpt_avgfactor = 0.667;
			} else {
				cpt_threshold = 0.05;
				cpt_avgfactor = 0.62;
			}
		}
	}

	//new second pass (downsample infusion rates from cpt_rates and write to cpt_rates_real)
	
	//automatically determine high or low rounding factor (3600->round to 0.1, 360->round to 1)
	if ((paedi_mode == 1) || (drug_sets[ind].cpt_rates[5]<30/360)) {
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
		for (j=0; j<180; j++) {
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

				if (j==179) {
					test_rate = Math.round((drug_sets[ind].cpt_rates[drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]]+drug_sets[ind].cpt_rates[j])/2*roundingfactor)/roundingfactor;
					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;
					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;
					if ((drug_sets[ind].cpt_times.length == 1) && (drug_sets[ind].cpt_times[0] == 1)) { //special scenario for 1 rate till the end, need to fill up first 2mins
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].historyarray.push([working_clock, test_rate]);
						for (k=0; k<21600; k++) {
								drug_sets[ind].cpt_rates_real.push(test_rate);
						}
					} else {
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].historyarray.push([relativetime, test_rate]);
						for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<21600; k++) {
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
		
		for (j=0; j<180; j++) {
			
			//temp_test_rate = cpt_rates[j/60];
			if (firstcycle == -1) {
				if (((drug_sets[ind].cpt_rates[0] > 0) && (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1])) || ((bolus_duration > 0) && (drug_sets[ind].cpt_bolus > 0))) { //this is a type of decremental infusion rates - can use normal algorithm
					wait_peak = 0; //reset wait peak to zero to avoid bug
					prior_test_rate = drug_sets[ind].cpt_rates[1];
					drug_sets[ind].cpt_times.push(1);
				} else if ((drug_sets[ind].cpt_rates[0] > 0) && (drug_sets[ind].cpt_rates[1]>drug_sets[ind].cpt_rates[0]) && (bolus_duration == 0)) { //special scenario where there is slow rise in inf rate to peak then falls
					prior_test_rate = drug_sets[ind].cpt_rates[1];
					console.log('enter special WAIT-PEAK cycle as cpt_rates fall into inc-peak-dec pattern');
					INNER_LOOP: for (k=1; k<180; k++) {
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
					console.log("cpt rates [0] algorithm pause for 2 mins at least");
					prior_test_rate = 0;
					// determine how long is the pause and determine the time of peak
					INNER_LOOP: for (k=1; k<180; k++) {
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
					
					cond1 = (((drug_sets[ind].cpt_rates[0] > 0) && (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1])) || ((bolus_duration > 0) && (drug_sets[ind].cpt_bolus > 0)));
					if ((drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1) && cond1) {
						for (k=0; k<120; k++) {drug_sets[ind].cpt_rates_real.push(test_rate);}
					}
					for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<j*120; k++) {
							drug_sets[ind].cpt_rates_real.push(test_rate);
					}

					//console.log(test_rate*3600/10 + " - from " + drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120 + " to " + j*120 + "s");

					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;

					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;

					if ((bolus_duration>0) && (drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1)) {
							drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
							drug_sets[ind].historyarray.push([working_clock, test_rate]);
					} else {
						if ((drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1) && (drug_sets[ind].cpt_rates[0]>drug_sets[ind].cpt_rates[1])) {
							drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
							drug_sets[ind].historyarray.push([working_clock, test_rate]);
						} else {
							drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
							drug_sets[ind].historyarray.push([relativetime, test_rate]);
						}
					}


					drug_sets[ind].cpt_times.push(j);
					prior_test_rate = drug_sets[ind].cpt_rates[j];
				}

				if (j==179) {
					test_rate = Math.round(((drug_sets[ind].cpt_rates[drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]]-drug_sets[ind].cpt_rates[j])*cpt_avgfactor+drug_sets[ind].cpt_rates[j])*roundingfactor)/roundingfactor;
					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;
					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;
					drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
					drug_sets[ind].historyarray.push([relativetime, test_rate]);
					for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<21600; k++) {
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
	var temp_result, temp_result_e;

	if (working_clock==0) {
		temp_vol = 0;
	} else {
		temp_vol = drug_sets[ind].volinf[working_clock-1];
	};

	//you've got to deliver the real bolus at this point too
	if ((max_rate_input == 0) && (drug_sets[ind].cpt_bolus > 0)) {
		temp_vol = temp_vol + drug_sets[ind].cpt_bolus/drug_sets[ind].infusate_concentration;
	}
	for (j=0; j<21600; j++) {

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
		drug_sets[ind].volinf.push(temp_vol);
		
		//charting engine: if before first 15mins then higher resolution
		if ((j<15*60) && (j%10==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+j)/60, y:temp_result});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+j)/60, y:temp_result_e});
		}
		if ((j>=15*60) && (j<120*60) && (j%60==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+j)/60, y:temp_result});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+j)/60, y:temp_result_e});			
		}
		if ((j>=120*60) && (j%120==0)) {
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
	max_rate_input = drug_sets[ind].max_rate;
	bolus_duration = 0;
	remaining = 0;
	if (drug_sets[ind].previewhistoryarray == undefined) drug_sets[ind].previewhistoryarray = new Array();
	drug_sets[ind].previewhistorytext = "";
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
	
	temp_peak = drug_sets[ind].prior_peak_time;
	var min_dif = drug_sets[ind].desired *0.0001;

	if ((drug_sets[ind].cet_lockdowntime>working_clock) && (drug_sets[ind].desired<=drug_sets[ind].cet_priordesired) && (drug_sets[ind].cpt_rates_real[working_clock-1]==0)) {
		//in lockdown phase
		drug_sets[ind].preview_bolus = 0;
		drug_sets[ind].preview_rate = 0;
		//write CP CE till peak
		remaining = drug_sets[ind].cet_lockdowntime-working_clock;
		for (i=0; i<remaining; i++) {
			p_state3[1] = p_state3[1] * Math.exp(-drug_sets[ind].lambda[1]);
			p_state3[2] = p_state3[2] * Math.exp(-drug_sets[ind].lambda[2]);
			p_state3[3] = p_state3[3] * Math.exp(-drug_sets[ind].lambda[3]);
			e_state3[1] = e_state3[1] * Math.exp(-drug_sets[ind].lambda[1]);
			e_state3[2] = e_state3[2] * Math.exp(-drug_sets[ind].lambda[2]);
			e_state3[3] = e_state3[3] * Math.exp(-drug_sets[ind].lambda[3]);
			e_state3[4] = e_state3[4] * Math.exp(-drug_sets[ind].lambda[4]);

			//drug_sets[ind].cpt_rates_real.push(0);
			//drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
			//drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
			//drug_sets[ind].volinf.push(temp_vol);

			//if (i%10==0) {
			//	myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:p_state3[1]+p_state3[2]+p_state3[3]});
			//	myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:e_state3[1]+e_state3[2]+e_state3[3]+e_state3[4]});
			//}
		}

		working_clock = drug_sets[ind].cet_lockdowntime;
		drug_sets[ind].preview_bolus = 0;
		//update e_state2		
		p_state2[1] = p_state3[1];
		p_state2[2] = p_state3[2];
		p_state2[3] = p_state3[3];

		e_state2[1] = e_state3[1];
		e_state2[2] = e_state3[2];
		e_state2[3] = e_state3[3];
		e_state2[4] = e_state3[4];
	}

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
			drug_sets[ind].preview_rate = 0;
			drug_sets[ind].preview_bolus = 0;
			drug_sets[ind].previewhistorytext = "";
			drug_sets[ind].previewhistoryarray.length = 0;
		//next_time = working_clock;
		deliver_cpt_alt(drug_sets[ind].desired);
		test_rate = drug_sets[ind].previewhistoryarray[0][1];
		drug_sets[ind].preview_rate = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
		drug_sets[ind].preview_downtrend = (drug_sets[ind].cpt_rates_real[working_clock-1] > test_rate);
	} else {
		//normal CET algorithm
		if (est_ce >= drug_sets[ind].desired) {
			drug_sets[ind].preview_rate = 0;
			drug_sets[ind].preview_bolus = 0;
			drug_sets[ind].previewhistorytext = "";
			drug_sets[ind].previewhistoryarray.length = 0;
			//preview_cetpause = 0;
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

				//drug_sets[ind].cpt_rates_real.push(0);
				//drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
				//drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
				//drug_sets[ind].volinf.push(temp_vol);

				//if (i%10==0) {
				//	myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:p_state3[1]+p_state3[2]+p_state3[3]});
				//	myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:e_state3[1]+e_state3[2]+e_state3[3]+e_state3[4]});
				//}


			}

			est_cp = p_state3[1] + p_state3[2] + p_state3[3];
			compensation = 0;
			//var compensation = (drug_sets[ind].desired*1.01 - est_cp)/drug_sets[ind].p_udf[1];

			//console.log("compensation, over 1secs, " + compensation);

			//myChart.data.datasets[2].hidden = false;
			//myChart.data.datasets[3].hidden = false;
			//myChart.update();

			
			if (remaining>0) {
				//if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
				//	drug_sets[ind].historytext = "<div class='schemecet' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Ce target (" + conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";
				//} else {
				//	drug_sets[ind].historytext = "<div class='schemecet' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Ce target (" + conc_units + "/ml): " + drug_sets[ind].desired + "</div>";
				//}
				drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemepause' data-time='" + Math.floor(time_in_s) + "'>" + "<div class='timespan'>" + converttime(Math.floor(time_in_s)) + "</div>Paused for " + converttime(remaining+breakpoint) + "</div>");
				drug_sets[ind].previewhistoryarray.push([Math.floor(time_in_s),0]); 
				//if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
				//	drug_sets[ind].historyarrays.push([2,0,Math.floor(time_in_s),drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);
				//} else {
				//	drug_sets[ind].historyarrays.push([2,0,Math.floor(time_in_s),drug_sets[ind].desired]);
				//}
				//drug_sets[ind].historyarrays.push([2,3,Math.floor(time_in_s),remaining+breakpoint]);
			} else {
				//if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
				//	drug_sets[ind].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";	
				//} else {
				//	drug_sets[ind].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].desired + "</div>";	
				//}
				drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemepause' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Paused for " + converttime(breakpoint) + "</div>");
				//this line is necessary for scheme display
				drug_sets[ind].previewhistoryarray.push([Math.floor(working_clock),0]); 
				//if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
				//	drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);
				//} else {
				//	drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].desired]);
				//}
				//drug_sets[ind].historyarrays.push([2,3,working_clock,breakpoint]);
			}
			
			next_time = working_clock + breakpoint;
			console.log("CE >= desired ");
			deliver_cpt_alt();
			
		} else {
			if (remaining==0) {
				// this is for est_ce not higher than desired
				//if (temp_peak <= delta_seconds) temp_peak = delta_seconds + 1;
				trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind)) / drug_sets[ind].e_udf[temp_peak];
				temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
				current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind) + drug_sets[ind].e_udf[temp_peak] * trial_rate;
				console.log(trial_rate);
				console.log(temp_peak);
				console.log(current);
				/* Iterate until solution is found [ln 2009] */

				if (RSI_mode == true) {
					working_clock = 0;
					preview_chart[0].length = 0;
					preview_chart[1].length = 0;
					preview_chart[2].length = 0;
					document.getElementById("RSI_preview").innerHTML = "";
					//first check if peak time is less than interval time, in which case RSI mode is not necessary
					if (temp_peak <= RSI_interval) {
						//revert normal CE mode
						console.log("RSI mode deemed unnecessary");
						while (Math.abs(current - drug_sets[ind].desired) > min_dif)
							{
							trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind)) / drug_sets[ind].e_udf[temp_peak];
							temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
							current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind) + drug_sets[ind].e_udf[temp_peak] * trial_rate;
							}
					} else {
						console.log("enter RSI bolus determination");
						if (max_rate_input == 0) max_rate_input = 7200;
						//store real peak
						real_peak = temp_peak;
						trial_rate = RSIfunction(drug_sets[0].desired,RSI_interval);
						temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
						drug_sets[ind].preview_bolus = trial_rate;				
						temp1 = drug_sets[0].p_coef[1] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[1]));
						temp2 = drug_sets[0].p_coef[2] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[2]));
						temp3 = drug_sets[0].p_coef[3] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[3]));
						temp1e = drug_sets[0].e_coef[1] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[1]));
						temp2e = drug_sets[0].e_coef[2] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[2]));
						temp3e = drug_sets[0].e_coef[3] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[3]));
						temp4e = drug_sets[0].e_coef[4] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[4]));
						est_cp = temp1+temp2+temp3;
						est_ce = temp1e+temp2e+temp3e+temp4e;
						//iterate till cp/ce drop
						cpt_pause = 0;
						cet_pause = 0;
						while (est_cp>=drug_sets[0].desired) {
							cpt_pause = cpt_pause + 1;
							est_cp = virtual_model(temp1,temp2,temp3,0,cpt_pause,0,0);
						}
						console.log("cpt_pause" + cpt_pause);
						est_ce = virtual_model(temp1e,temp2e,temp3e,temp4e,cpt_pause,1,0);
						cet_pause = cpt_pause;
						while (est_ce>=drug_sets[0].desired) {
							cet_pause = cet_pause+1;
							est_ce = virtual_model(temp1e,temp2e,temp3e,temp4e,cet_pause,1,0);
						}
						console.log("cet_pause" + cet_pause);
						sigmoidx = (cet_pause - 300)/50;
						sigmoid = 1/(1+Math.exp(-sigmoidx));
						sigmoidcorrfactor = 0.5 * sigmoid; //this will make sure the corrfactor max = 0.5
						breakpoint = Math.floor((cet_pause - cpt_pause)*sigmoidcorrfactor + cpt_pause);
						console.log("entering breakpoint -- " + breakpoint);
						temp_peak = breakpoint;
					}
				} else {
					while (Math.abs(current - drug_sets[ind].desired) > min_dif)
						{
						trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind)) / drug_sets[ind].e_udf[temp_peak];
						temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
						current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1,ind) + e_udf[temp_peak] * trial_rate;
						}
				}


				if (drug_sets[ind].cpt_rates_real.length > 0) {
					drug_sets[ind].preview_bolus = trial_rate;
				}
				//if (mass>15)  {
				//	drug_sets[ind].preview_bolus = Math.ceil(drug_sets[ind].preview_bolus/5)*5
				//} else {
					drug_sets[ind].preview_bolus = Math.ceil(drug_sets[ind].preview_bolus);
				//}; // round up to the next 5mg bolus if bw big 

				preview_cetpause = temp_peak;
				console.log(temp1e + " " + temp2e + " " + temp3e + " " + temp4e);
				console.log("debug cet, virtualmodel = " + virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1,ind));
				console.log("debug cet, trialrate= " + trial_rate);
				console.log("debug cet, cet_bolus= " + drug_sets[ind].preview_bolus);
				console.log("debug cet, temp_peak= " + temp_peak);
				console.log("debug cet, current= " + current);
				if (drug_sets[ind].drug_name == "Dexmedetomidine") {
					real_peak = temp_peak;
				}
				if (drug_sets[ind].preview_bolus > 0) scheme_bolusadmin(drug_sets[ind].preview_bolus,ind,max_rate_input);
				if (drug_sets[ind].drug_name == "Dexmedetomidine") {
					//set pause time to zero
					temp_peak = bolus_duration;
				}
				p_state3[1] = p_state2[1];
				p_state3[2] = p_state2[2];
				p_state3[3] = p_state2[3];
				console.log("current CP ", p_state3[1] + p_state3[2] + p_state3[3]);
				e_state3[1] = e_state2[1];
				e_state3[2] = e_state2[2];
				e_state3[3] = e_state2[3];
				e_state3[4] = e_state2[4];
				drug_sets[ind].prior_peak_time = temp_peak;
				next_time = working_clock + temp_peak;

				drug_sets[ind].previewhistorytext = "";
				drug_sets[ind].previewhistoryarray.length = 0;

				if (drug_sets[ind].preview_bolus > 0) {
					//drug_sets[ind].cet_lockdowntime = working_clock + temp_peak -1;
					drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeboluscet nobolus' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Bolus: " + drug_sets[ind].preview_bolus + drug_sets[ind].infused_units + "</div>");
					if (bolus_duration>0) drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeboluscetduration' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Given over " + converttime(bolus_duration) + " at " + max_rate_input + "ml/h</div>");
					temp_time_bolus = working_clock + bolus_duration ;
					if (temp_peak > bolus_duration) {
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemepausecet' data-time='" + temp_time_bolus + "'>" + "<div class='timespan'>" + converttime(temp_time_bolus) + "</div>Paused for " + converttime(temp_peak - temp_time_bolus) + "</div>");
					}
					//if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
					//	drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);	
					//} else {
					//	drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].desired]);	
					//}
					
					//drug_sets[ind].historyarrays.push([2,1,working_clock,drug_sets[ind].cet_bolus]);
					//drug_sets[ind].historyarrays.push([2,3,temp_peak]);
				}

				//real delivery
				var look_l1 = Math.exp(-drug_sets[ind].lambda[1] ); 
				var look_l2 = Math.exp(-drug_sets[ind].lambda[2] );
				var look_l3 = Math.exp(-drug_sets[ind].lambda[3] );
				var look_l4 = Math.exp(-drug_sets[ind].lambda[4] );
				var temp_result, temp_result_e;


				if (temp_peak>bolus_duration) {
					for (j=0; j<temp_peak-bolus_duration; j++) {

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
						if (RSI_mode == true) {
							if (j%10==0) {
								preview_chart[0].push({x:(working_clock+bolus_duration+j)/60, y:temp_result});
								preview_chart[1].push({x:(working_clock+bolus_duration+j)/60, y:temp_result_e});
							}
						}
					}
				
				}
				//try off the following lines to improve performance
				//myChart.data.datasets[ind*2+2].hidden = false;
				//myChart.data.datasets[ind*2+3].hidden = false;
				//myChart.update();
				//document.getElementById("historywrapper").innerHTML = drug_sets[ind].historytext;
				//you've got to deliver the real bolus at this point too
				
				//drug_sets[ind].cet_priordesired = drug_sets[ind].desired;
				//this line is necessary for scheme display
				drug_sets[ind].previewhistoryarray.push([working_clock,0]); //write 0,0 first as I don't know what to write
			} else {
				next_time = working_clock;
				drug_sets[ind].previewhistorytext = "";
				drug_sets[ind].previewhistoryarray.length = 0;
				//display data until up to cet_lockdown point
				//for remaining > 0
				if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
					drug_sets[ind].previewhistorytext = "<div class='schemecet' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Ce target (" + conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";
				} else {
					drug_sets[ind].previewhistorytext = "<div class='schemecet' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Ce target (" + conc_units + "/ml): " + drug_sets[ind].desired + "</div>";
				}
				drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemepause' data-time='" + Math.floor(time_in_s) + "'>" + "<div class='timespan'>" + converttime(Math.floor(time_in_s)) + "</div>Paused for " + converttime(remaining) + "</div>");
				drug_sets[ind].previewhistoryarray.push([Math.floor(time_in_s),0]); 
			}

			//insert deliverCPT code at this point
			//pass on states to deliverCPT

			compensation = 0;
			//reset temp_peak
			if (RSI_mode == true) temp_peak = real_peak;
			if (drug_sets[ind].drug_name == "Dexmedetomidine") {
					temp_peak = real_peak;
					drug_sets[ind].prior_peak_time = temp_peak;
			}
			console.log("current CP ", p_state3[1] + p_state3[2] + p_state3[3]);
			deliver_cpt_alt();
		}//end normal CET algorithm
	}// end desired higher than CE part else


	function deliver_cpt_alt() {
			console.log("next time in preview CET : " + next_time);
			p_state2[1] = p_state3[1];
			p_state2[2] = p_state3[2];
			p_state2[3] = p_state3[3];
			working_clock = next_time;
			drug_sets[ind].cpt_rates.length = 0;
			drug_sets[ind].cpt_times.length = 0;
			test_rate = 0;

			//copied from CPT PREVIEW
			cpt_interval = 120; //set to 120seconds

			var look_l1 = Math.exp(-drug_sets[ind].lambda[1] * cpt_interval); 
			var look_l2 = Math.exp(-drug_sets[ind].lambda[2] * cpt_interval);
			var look_l3 = Math.exp(-drug_sets[ind].lambda[3] * cpt_interval);
			var look_l4 = Math.exp(-drug_sets[ind].lambda[4] * cpt_interval);
			console.log("current CP ", p_state2[1] + p_state2[2] + p_state2[3]);
			//first pass
			for (i=0; i<60; i++) {

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

				p_state2[1] = p_state2[1] * look_l1 + drug_sets[ind].p_coef[1] * test_rate * (1 - look_l1);
				p_state2[2] = p_state2[2] * look_l2 + drug_sets[ind].p_coef[2] * test_rate * (1 - look_l2);
				p_state2[3] = p_state2[3] * look_l3 + drug_sets[ind].p_coef[3] * test_rate * (1 - look_l3);

			}//end for

			//determine threshold
			if (drug_sets[ind].drug_name == "Alfentanil") {
				if (cpt_threshold_auto == 1) {
					if (drug_sets[ind].cpt_rates[5]*360 > 100) {
						cpt_threshold = 0.15;
						cpt_avgfactor = 0.63;
					} else {
						cpt_threshold = 0.25;
						cpt_avgfactor = 0.44;
					}
				}
			} else if (drug_sets[ind].drug_name == "Dexmedetomidine") {
				if (cpt_threshold_auto == 1) {
					if (drug_sets[ind].cpt_rates[5]*360 > 10) {
						cpt_threshold = 0.25;
						cpt_avgfactor = 0.5;
					} else {
						cpt_threshold = 0.15;
						cpt_avgfactor = 0.75;
					}
				} else if (optionsarray[2][1] == 1) { //lazy
						cpt_threshold = 0.25;
						cpt_avgfactor = 0.5;
				} else if (optionsarray[2][2] == 1) { //accurate
						cpt_threshold = 0.15;
						cpt_avgfactor = 0.75;
				}
			} else if (drug_sets[ind].drug_name == "Ketamine") {
				if (cpt_threshold_auto == 1) {
					if (drug_sets[ind].cpt_rates[5]*360 > 5) {
						cpt_threshold = 0.15;
						cpt_avgfactor = 0.52;
					} else {
						cpt_threshold = 0.1;
						cpt_avgfactor = 0.65;
					}
				} else if (optionsarray[2][1] == 1) { //lazy
						cpt_threshold = 0.15;
						cpt_avgfactor = 0.52;
				} else if (optionsarray[2][2] == 1) { //accurate
						cpt_threshold = 0.1;
						cpt_avgfactor = 0.65;
				}
			} else {
				if (cpt_threshold_auto == 1) {
					if (drug_sets[ind].cpt_rates[5]*360 >= 30) {
						cpt_threshold = 0.08;
						cpt_avgfactor = 0.667;
					} else {
						cpt_threshold = 0.05;
						cpt_avgfactor = 0.62;
					}
				}
			}

			//second pass
			//automatically determine high or low rounding factor (3600->round to 0.1, 360->round to 1)
			if ((paedi_mode == 1) || (drug_sets[ind].cpt_rates[5]<30/360)) {
				var roundingfactor = 3600;
			} else {
				if (drug_sets[ind].drug_name == "Propofol") {
					var roundingfactor = 360;
				} else {
					var roundingfactor = 3600;
				}
			}

			//...
			//secondpass code

			//temporary code init
			firstcycle = -1;
			
			//end temporary code init

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
						//for (k=0; k<120; k++) {drug_sets[ind].cpt_rates_real.push(test_rate);}
					}
					//for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<j*120; k++) {
					//		drug_sets[ind].cpt_rates_real.push(test_rate);
					//}

					console.log(test_rate*3600/10 + " - from " + drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120 + " to " + j*120 + "s");

					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;

					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;
					if ((drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1] == 1)) {
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
						drug_sets[ind].previewhistoryarray.push([working_clock, test_rate]);
					} else {
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].previewhistoryarray.push([relativetime, test_rate]);
					}

					drug_sets[ind].cpt_times.push(j);
					prior_test_rate = drug_sets[ind].cpt_rates[j];
				}

				if (j==59) {
					test_rate = Math.round(((drug_sets[ind].cpt_rates[drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]]-drug_sets[ind].cpt_rates[j])*cpt_avgfactor+drug_sets[ind].cpt_rates[j])*roundingfactor)/roundingfactor;
					relativetime = working_clock+drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120;
					var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
					var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;
					if ((drug_sets[ind].cpt_times.length == 1) && (drug_sets[ind].cpt_times[0] == 1)) { //special scenario for 1 rate till the end, need to fill up first 2mins
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].previewhistoryarray.push([working_clock, test_rate]);
						//for (k=0; k<7200; k++) {
						//		drug_sets[ind].cpt_rates_real.push(test_rate);
						//}
					} else {
						drug_sets[ind].previewhistorytext = drug_sets[ind].previewhistorytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");
						drug_sets[ind].previewhistoryarray.push([relativetime, test_rate]);
						//for (k=drug_sets[ind].cpt_times[drug_sets[ind].cpt_times.length-1]*120; k<7200; k++) {
						//		drug_sets[ind].cpt_rates_real.push(test_rate);
						//}
					}

					//var tempArray = new Array();
					//for (i=0; i<drug_sets[ind].historyarray.length; i++) {
					//	tempArray.push(drug_sets[ind].historyarray[i]);
					//}
					//drug_sets[ind].historyarrays.push([2,2,working_clock,tempArray]);
				}
			} //end else
		} //end for
		//real delivery, for preview chart generation, for RSI
		if (RSI_mode == true) {
			temp1 = p_state3[1];
			temp2 = p_state3[2];
			temp3 = p_state3[3];
			temp1e = e_state3[1];
			temp2e = e_state3[2];
			temp3e = e_state3[3];
			temp4e = e_state3[4];
			tempcp = temp1 + temp2 + temp3;
			tempce = temp1e + temp2e + temp3e + temp4e;
			for (counterp = next_time; counterp<3590; counterp++) {
				foundIndex = drug_sets[0].previewhistoryarray.findIndex((element) => element[0]>=counterp);
				if (foundIndex == -1) {
					foundIndex = drug_sets[0].previewhistoryarray.length - 1;
				} else {
					foundIndex = foundIndex - 1;
				}
				currate = drug_sets[0].previewhistoryarray[foundIndex][1];
				temp1 = temp1 * Math.exp(-drug_sets[ind].lambda[1]) + drug_sets[0].p_coef[1] * currate * (1 - Math.exp(-drug_sets[ind].lambda[1]));
				temp2 = temp2 * Math.exp(-drug_sets[ind].lambda[2]) + drug_sets[0].p_coef[2] * currate * (1 - Math.exp(-drug_sets[ind].lambda[2]));
				temp3 = temp3 * Math.exp(-drug_sets[ind].lambda[3]) + drug_sets[0].p_coef[3] * currate * (1 - Math.exp(-drug_sets[ind].lambda[3]));
				temp1e = temp1e * Math.exp(-drug_sets[ind].lambda[1]) + drug_sets[0].e_coef[1] * currate * (1 - Math.exp(-drug_sets[ind].lambda[1]));
				temp2e = temp2e * Math.exp(-drug_sets[ind].lambda[2]) + drug_sets[0].e_coef[2] * currate * (1 - Math.exp(-drug_sets[ind].lambda[2]));
				temp3e = temp3e * Math.exp(-drug_sets[ind].lambda[3]) + drug_sets[0].e_coef[3] * currate * (1 - Math.exp(-drug_sets[ind].lambda[3]));
				temp4e = temp4e * Math.exp(-drug_sets[ind].lambda[4]) + drug_sets[0].e_coef[4] * currate * (1 - Math.exp(-drug_sets[ind].lambda[4]));
				tempcp = temp1 + temp2 + temp3;
				tempce = temp1e + temp2e + temp3e + temp4e;
				if (counterp % 30 == 0) {
					preview_chart[0].push({x:counterp/60,y:tempcp});
					preview_chart[1].push({x:counterp/60,y:tempce});
				}
			}

			roundup = Math.round(preview_chart[2][0] * 1.25);
			myChart.options.scales.y.max = roundup;
			myChart.data.datasets[12].data = preview_chart[0];
			myChart.data.datasets[13].data = preview_chart[1];
			myChart.data.datasets[12].hidden = false;
			myChart.data.datasets[13].hidden = false;
			myChart.update();	
		}
	} // end private function deliver cpt alt
}

function deliver_cet(x, active_drug_set_index) {
	//provides validation
	if (x>0) deliver_cet_real(x, active_drug_set_index);
}
function deliver_cet_real(x, ind) {
	max_rate_input = drug_sets[ind].max_rate;
	drug_sets[ind].cet_active = 1;
	drug_sets[ind].desired = x;
	//init these two
	bolus_duration = 0;

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
	//the last argument in if statement is to check if currently actively delivering a CET bolus
	if ((drug_sets[ind].cet_lockdowntime>working_clock) && (drug_sets[ind].desired<=drug_sets[ind].cet_priordesired) && (drug_sets[ind].cpt_rates_real[working_clock-1]==0)) {
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

			//var compensation = (drug_sets[ind].desired - est_cp)/drug_sets[ind].p_udf[1];
			compensation = 0;

			console.log("compensation, over 1secs, " + compensation);

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
			if (remaining==0) {
				//branch off into "yes" remaining vs "no" remaining code after no_bolus introduced (oct 2024)
				trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind)) / drug_sets[ind].e_udf[temp_peak];
				console.log(trial_rate);
				temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
				console.log(temp_peak);
				current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind) + drug_sets[ind].e_udf[temp_peak] * trial_rate;
				console.log(current);
				additional_pause_time = 0;
				if (RSI_mode == true) {
					//first check if peak time is less than interval time, in which case RSI mode is not necessary
					if (temp_peak <= RSI_interval) {
						//revert normal CE mode
						console.log("RSI mode deemed unnecessary");
						while (Math.abs(current - drug_sets[ind].desired) > min_dif)
							{
							trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind)) / drug_sets[ind].e_udf[temp_peak];
							temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
							current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind) + drug_sets[ind].e_udf[temp_peak] * trial_rate;
							}
					} else {
						console.log("enter RSI bolus determination");
						if (max_rate_input == 0) max_rate_input = 7200;
						//store real peak
						real_peak = temp_peak;
						trial_rate = RSIfunction(drug_sets[0].desired,RSI_interval);
						temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
						drug_sets[ind].cet_bolus = trial_rate;				
						temp1 = drug_sets[0].p_coef[1] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[1]));
						temp2 = drug_sets[0].p_coef[2] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[2]));
						temp3 = drug_sets[0].p_coef[3] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[3]));
						temp1e = drug_sets[0].e_coef[1] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[1]));
						temp2e = drug_sets[0].e_coef[2] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[2]));
						temp3e = drug_sets[0].e_coef[3] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[3]));
						temp4e = drug_sets[0].e_coef[4] * trial_rate * (1 - Math.exp(-drug_sets[ind].lambda[4]));
						est_cp = temp1+temp2+temp3;
						est_ce = temp1e+temp2e+temp3e+temp4e;
						//iterate till cp/ce drop
						cpt_pause = 0;
						cet_pause = 0;
						while (est_cp>=drug_sets[0].desired) {
							cpt_pause = cpt_pause + 1;
							est_cp = virtual_model(temp1,temp2,temp3,0,cpt_pause,0,0);
						}
						console.log("cpt_pause" + cpt_pause);
						est_ce = virtual_model(temp1e,temp2e,temp3e,temp4e,cpt_pause,1,0);
						cet_pause = cpt_pause;
						while (est_ce>=drug_sets[0].desired) {
							cet_pause = cet_pause+1;
							est_ce = virtual_model(temp1e,temp2e,temp3e,temp4e,cet_pause,1,0);
						}
						console.log("cet_pause" + cet_pause);
						sigmoidx = (cet_pause - 300)/50;
						sigmoid = 1/(1+Math.exp(-sigmoidx));
						sigmoidcorrfactor = 0.5 * sigmoid; //this will make sure the corrfactor max = 0.5
						breakpoint = Math.floor((cet_pause - cpt_pause)*sigmoidcorrfactor + cpt_pause);
						console.log("entering breakpoint -- " + breakpoint);
						temp_peak = breakpoint;
					}

				} else {
					/* Iterate until solution is found [ln 2009] */
					while (Math.abs(current - drug_sets[ind].desired) > min_dif)
						{
						trial_rate = (drug_sets[ind].desired - virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind)) / drug_sets[ind].e_udf[temp_peak];
						temp_peak = find_peak(temp_peak, trial_rate, temp1e, temp2e, temp3e, temp4e, ind);
						current = virtual_model(temp1e, temp2e, temp3e, temp4e, temp_peak, 1, ind) + drug_sets[ind].e_udf[temp_peak] * trial_rate;
						}
				}


				if (drug_sets[ind].cpt_rates_real.length > 0) {
					drug_sets[ind].cet_bolus = trial_rate;
				}
				//if (mass>15)  {
				//	drug_sets[ind].cet_bolus = Math.ceil(drug_sets[ind].cet_bolus/5)*5
				//} else {
					drug_sets[ind].cet_bolus = Math.ceil(drug_sets[ind].cet_bolus);
				//}; // round up to the next 5mg bolus if bw big 
				if (drug_sets[ind].drug_name == "Dexmedetomidine") {
					real_peak = temp_peak;
				}
				bolusadmin(drug_sets[ind].cet_bolus,ind,max_rate_input);
				if (drug_sets[ind].drug_name == "Dexmedetomidine") {
					//set pause time to zero
					temp_peak = bolus_duration;
				}
				drug_sets[ind].prior_peak_time = temp_peak;
				next_time = working_clock + temp_peak;
				console.log("bolusduration" + bolus_duration);

				if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
					drug_sets[ind].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";
				} else {
					drug_sets[ind].historytext = "<div class='schemecet' data-time='" + working_clock + "'>" + "At " + converttime(working_clock) + " - Ce target (" + drug_sets[ind].conc_units + "/ml): " + drug_sets[ind].desired + "</div>";
				}
				if (drug_sets[ind].cet_bolus > 0) {
					drug_sets[ind].cet_lockdowntime = working_clock + temp_peak -1;
					bolus_ml = Math.round(drug_sets[ind].cet_bolus / drug_sets[ind].infusate_concentration * 10)/10;
					drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeboluscet nobolus' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Bolus: " + drug_sets[ind].cet_bolus + drug_sets[ind].infused_units + "<span style='font-weight:normal;opacity:0.7'> (" + bolus_ml + "ml)</span>" + "</div>");
					if (bolus_duration > 0) drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeboluscetduration' data-time='" + working_clock + "'>" + "<div class='timespan'>" + converttime(working_clock) + "</div>Given over " + converttime(bolus_duration) + " at " + max_rate_input + "ml/h</div>");
					temp_time_bolus = working_clock + bolus_duration ;
					if (temp_peak > bolus_duration) {
						drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemepausecet' data-time='" + temp_time_bolus + "'>" + "<div class='timespan'>" + converttime(temp_time_bolus) + "</div>Paused for " + converttime(temp_peak - bolus_duration) + "</div>");
					}
					if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
						if (max_rate_input > 0) {
							drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].fentanyl_weightadjusted_target_uncorrected,max_rate_input]);	
						} else {
							drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);	
						}
					} else {
						if (max_rate_input > 0) {
							if (RSI_mode == true) {
								drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].desired,max_rate_input,RSI_interval]);		
							} else {
								drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].desired,max_rate_input]);		
							}
						} else {
							drug_sets[ind].historyarrays.push([2,0,working_clock,drug_sets[ind].desired]);		
						}
					}
					if (bolus_duration > 0) {
						drug_sets[ind].historyarrays.push([2,1,working_clock,drug_sets[ind].cet_bolus,max_rate_input,bolus_duration]);		
						drug_sets[ind].historyarrays.push([2,3,temp_time_bolus,temp_peak-bolus_duration]);	
					} else {
						drug_sets[ind].historyarrays.push([2,1,working_clock,drug_sets[ind].cet_bolus]);
						drug_sets[ind].historyarrays.push([2,3,temp_peak]);
					}
				}
				//real delivery
				var look_l1 = Math.exp(-drug_sets[ind].lambda[1] ); 
				var look_l2 = Math.exp(-drug_sets[ind].lambda[2] );
				var look_l3 = Math.exp(-drug_sets[ind].lambda[3] );
				var look_l4 = Math.exp(-drug_sets[ind].lambda[4] );
				var temp_result, temp_result_e;

				
				if (temp_peak>bolus_duration) {
					for (j=0; j<temp_peak-bolus_duration; j++) {

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
						if (j%10==0) {
							myChart.data.datasets[ind*2+2].data.push({x:(working_clock+bolus_duration+j)/60, y:temp_result});
							myChart.data.datasets[ind*2+3].data.push({x:(working_clock+bolus_duration+j)/60, y:temp_result_e});
						}
					}
				}
				console.log("before leaving deliver CET, CP is ", temp_result);
				console.log(drug_sets[ind].cpt_cp);
				//try off the following lines to improve performance
				//myChart.data.datasets[ind*2+2].hidden = false;
				//myChart.data.datasets[ind*2+3].hidden = false;
				//myChart.update();
				document.getElementById("historywrapper").innerHTML = drug_sets[ind].historytext;
				//you've got to deliver the real bolus at this point too
				
				drug_sets[ind].cet_priordesired = drug_sets[ind].desired;
				//this line is necessary for scheme display
				if (bolus_duration > 0) {
					drug_sets[ind].historyarray.push([working_clock,0]);
					let bolus_array = new Array();
					bolus_array.push(drug_sets[ind].cet_bolus);
					bolus_array.push(max_rate_input);
					bolus_array.push(bolus_duration);
					drug_sets[ind].historyarray.push([working_clock,bolus_array]);  //write the induction dose as an array
						//need to push a zero state to historyarray for update() grey highlight to work properly
						drug_sets[ind].historyarray.push([temp_time_bolus,0])
				} else {
					drug_sets[ind].historyarray.push([working_clock,0]);
				}
				if (RSI_mode == true) {
					RSI_mode = false;
					temp_peak = real_peak;
					drug_sets[ind].prior_peak_time = temp_peak;
				}
				if (drug_sets[ind].drug_name == "Dexmedetomidine") {
					temp_peak = real_peak;
					drug_sets[ind].prior_peak_time = temp_peak;
				}
			} else {
				next_time = working_clock;
				//display data until up to cet_lockdown point
				//for remaining > 0
				if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
					drug_sets[ind].historytext = "<div class='schemecet' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Ce target (" + conc_units + "/ml): " + drug_sets[ind].fentanyl_weightadjusted_target_uncorrected + "</div>";
				} else {
					drug_sets[ind].historytext = "<div class='schemecet' data-time='" + Math.floor(time_in_s) + "'>" + "At " + converttime(Math.floor(time_in_s)) + " - Ce target (" + conc_units + "/ml): " + drug_sets[ind].desired + "</div>";
				}
				drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemepause' data-time='" + Math.floor(time_in_s) + "'>" + "<div class='timespan'>" + converttime(Math.floor(time_in_s)) + "</div>Paused for " + converttime(remaining) + "</div>");
				drug_sets[ind].historyarray.push([Math.floor(time_in_s),0]); 
				if (drug_sets[ind].fentanyl_weightadjusted_flag == 1) {
					drug_sets[ind].historyarrays.push([2,0,Math.floor(time_in_s),drug_sets[ind].fentanyl_weightadjusted_target_uncorrected]);
				} else {
					drug_sets[ind].historyarrays.push([2,0,Math.floor(time_in_s),drug_sets[ind].desired]);
				}
				drug_sets[ind].historyarrays.push([2,3,Math.floor(time_in_s),remaining]);
			}
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
	for (counterfen=working_clock; counterfen<drug_sets[ind].cpt_rates_real.length-1; counterfen++) {
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

			//scheme_bolusadmin(drug_sets[active_drug_set_index].cet_bolus, active_drug_set_index);
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

			for (j=0; j<temp_peak-1; j++) {

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

			bolusconversion();

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

				p_state2[1] = p_state3[1];
				p_state2[2] = p_state3[2];
				p_state2[3] = p_state3[3];

				e_state2[1] = e_state3[1];
				e_state2[2] = e_state3[2];
				e_state2[3] = e_state3[3];
				e_state2[4] = e_state3[4];

			for (v=0; v<20; v++) {
				//test_rate = 0;
				if (v==0) {
					if (arg != undefined) {
						//for breakpoint use, arg will take in next_time
					} else {
						//
						next_time = working_clock + temp_peak;
						//next_time = drug_sets[active_drug_set_index].prior_peak_time;
					}
				} else {
					next_time = trough_time;
				}
				console.log("******" + v);
				console.log(converttime(next_time));
				min_dif = drug_sets[active_drug_set_index].desired *0.0001; 
				temp1e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][0];
				temp2e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][1];
				temp3e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][2];
				temp4e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][3];
				
				//temp1e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][0] * Math.exp(-drug_sets[active_drug_set_index].lambda[1]) ;
				//temp2e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][1] * Math.exp(-drug_sets[active_drug_set_index].lambda[2]) ;
				//temp3e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][2] * Math.exp(-drug_sets[active_drug_set_index].lambda[3]) ;
				//temp4e = drug_sets[active_drug_set_index].cpt_ce[next_time-1][3] * Math.exp(-drug_sets[active_drug_set_index].lambda[4]) ;
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
				
				if (next_cetbolus<10) {
					next_cetbolus = 0;
				} 

				scheme_bolusadmin(next_cetbolus, active_drug_set_index);
				console.log(next_cetbolus + "entered into virtualstate at time " + next_time);

			//push to arrays
				drug_sets[active_drug_set_index].cpt_rates_real.push(next_cetbolus);
				drug_sets[active_drug_set_index].cpt_cp.push([p_state2[1],p_state2[2],p_state2[3]]);
				drug_sets[active_drug_set_index].cpt_ce.push([e_state2[1],e_state2[2],e_state2[3],e_state2[4]]);
				temp_vol += next_cetbolus/drug_sets[active_drug_set_index].infusate_concentration;
				drug_sets[active_drug_set_index].volinf.push(temp_vol);
				working_clock = next_time;
				trough_time = find_trough(drug_sets[active_drug_set_index].desired*(1-drug_sets[active_drug_set_index].IB_swing),next_time,temp_peak);

				console.log(converttime(trough_time));
				
				for (j=0; j<trough_time-next_time-1; j++) {

					p_state2[1] = p_state2[1] * look_l1 ;
					p_state2[2] = p_state2[2] * look_l2 ;
					p_state2[3] = p_state2[3] * look_l3 ;
					//if (effect_data)
					//	{
					e_state2[1] = e_state2[1] * look_l1 ;
					e_state2[2] = e_state2[2] * look_l2 ;
					e_state2[3] = e_state2[3] * look_l3 ;
					e_state2[4] = e_state2[4] * look_l4 ;
					
					//prior_test_rate = test_rate;
					temp_result = p_state2[1] + p_state2[2] + p_state2[3];
					temp_result_e = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];
					drug_sets[active_drug_set_index].cpt_rates_real.push(0);
					drug_sets[active_drug_set_index].cpt_cp.push([p_state2[1],p_state2[2],p_state2[3]]);
					drug_sets[active_drug_set_index].cpt_ce.push([e_state2[1],e_state2[2],e_state2[3],e_state2[4]]);

					//write to VI
					drug_sets[active_drug_set_index].volinf.push(temp_vol);

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
    console.log(drug_sets[active_drug_set_index].cpt_ce.length);
		console.log("entering find_trough; CE" + value+  "temp_time now is " + temp_time + "temp_peak is " + temp_peak);
		var i;
		for (i=temp_peak; i<=temp_peak+10*60; i++) {
		    test_trough = virtual_model(temp1e,temp2e,temp3e,temp4e,i,1,active_drug_set_index);
		    //console.log(test_trough);
		    //console.log(temp_time+i);
		    if (test_trough<temp_trough) {
		        console.log(">>found trough" + test_trough);
		        break;
		    }
		}
		console.log(converttime(temp_time+i));
		return temp_time+i;
}

function scheme_bolusadmin(x, ind, max_rate_input) {
	if (max_rate_input == undefined) max_rate_input = 0;
	//addition to cap max bolus rate
	//max bolus rate capped "max_rate_input"ml/h which is equivalent to:
	max_rate = max_rate_input * drug_sets[ind].infusate_concentration / 60 / 60;
	rate_corr_factor = 1;
	//i.e. approx 3.3mg per sec for propofol for 1200ml/h
	//this is for CET
	if (temp_peak != undefined) {
		if (RSI_mode == true) {
			//no need correction, you want to inc CE as fast as possible
			//but for practical reasons, change max_rate_input = 0 to 7200
			if (max_rate_input == 0) {
				max_rate = 7200 * drug_sets[ind].infusate_concentration / 60 / 60;
			}
			working_clock = 0;
		} else {
			//however, needs to have a correction factor, because if max_rate too slow, will overshoot CE
			min_rate = x / temp_peak; //in mg sec-1
			max_1200 = 1200 * drug_sets[ind].infusate_concentration / 60 / 60;
			//scale to 0.8-1.0
			if (min_rate > max_rate) {
				//bolus duration will exceed temp peak, take discount arbitrarily
				rate_corr_factor = 0.8;
				if (drug_sets[ind].drug_name == "Dexmedetomidine") {
					rate_corr_factor = 1;
				}
			} else if (max_rate_input>1200) {
				rate_corr_factor = 0.97;
			} else {
				rate_corr_factor = 0.97 - (Math.abs(max_1200 - max_rate) / (max_1200 - min_rate))*0.1;	
			}
		}
	}

	l1 = Math.exp(-drug_sets[ind].lambda[1]);
	l2 = Math.exp(-drug_sets[ind].lambda[2]);
	l3 = Math.exp(-drug_sets[ind].lambda[3]);
	l4 = Math.exp(-drug_sets[ind].lambda[4]);

	if (max_rate_input == 0) {
		max_rate = x;
			p_state2[1] = p_state2[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
			p_state2[2] = p_state2[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
			p_state2[3] = p_state2[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

			e_state2[1] = e_state2[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
			e_state2[2] = e_state2[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
			e_state2[3] = e_state2[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
			e_state2[4] = e_state2[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);
	} else {
		bolus_duration = Math.floor(x / max_rate * rate_corr_factor);
		if (temp_peak != undefined) {
			if (bolus_duration >= temp_peak) {
				//extend to bolus duration
				temp_peak = bolus_duration;
			} else {
			}
		}
		real_bolus = Math.round(max_rate * bolus_duration);
		if (drug_sets[ind].cpt_active>0) {
			drug_sets[ind].cpt_bolus = real_bolus;
		} else if (drug_sets[ind].cet_active>0) {
			drug_sets[ind].cet_bolus = real_bolus;
			drug_sets[ind].preview_bolus = real_bolus;	
		}

		for (counter1 = 0; counter1 <= bolus_duration; counter1++) {
			p_state2[1] = p_state2[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
			p_state2[2] = p_state2[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
			p_state2[3] = p_state2[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

			e_state2[1] = e_state2[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
			e_state2[2] = e_state2[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
			e_state2[3] = e_state2[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
			e_state2[4] = e_state2[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);
			if (RSI_mode == true) {
				if (counter1 % 10 == 0) {
					tempcp = p_state2[1] + p_state2[2] + p_state2[3];
					tempce = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];
					preview_chart[0].push({x:(working_clock + counter1)/60, y:tempcp});
					preview_chart[1].push({x:(working_clock + counter1)/60, y:tempce});
				}
			}
		}
		// CPT mode check if can reach CP esp for slow max rate
		
		if (drug_sets[ind].cpt_active > 0) {
			est_cp = p_state2[1] + p_state2[2] + p_state2[3];
			if (est_cp < drug_sets[ind].desired) {
				for (cpec = 0; cpec<600; cpec++) {
					p_state2[1] = p_state2[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
					p_state2[2] = p_state2[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
					p_state2[3] = p_state2[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

					e_state2[1] = e_state2[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
					e_state2[2] = e_state2[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
					e_state2[3] = e_state2[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
					e_state2[4] = e_state2[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);
					est_cp = p_state2[1] + p_state2[2] + p_state2[3];
					est_ce = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];
					bolus_duration += 1;
					real_bolus = Math.round(max_rate * bolus_duration);
					if (est_cp > drug_sets[ind].desired) break;
				}
			}
			drug_sets[ind].cpt_bolus = real_bolus;

		}

		if (RSI_mode == true) {

			//need further bolus to push up CE?
			if (bolus_duration > RSI_interval) {
				est_ce = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];
				if (est_ce <= drug_sets[0].desired) {
					for (rc = 0; rc<100; rc++) {
						
						p_state2[1] = p_state2[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
						p_state2[2] = p_state2[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
						p_state2[3] = p_state2[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

						e_state2[1] = e_state2[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
						e_state2[2] = e_state2[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
						e_state2[3] = e_state2[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
						e_state2[4] = e_state2[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);

						bolus_duration += 1;
						real_bolus = Math.round(max_rate * bolus_duration);
						drug_sets[ind].preview_bolus = real_bolus;	
						est_cp = p_state2[1] + p_state2[2] + p_state2[3];
						est_ce = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];
						if (bolus_duration % 10 == 0) {
							preview_chart[0].push({x:(working_clock + bolus_duration)/60, y:est_cp});
							preview_chart[1].push({x:(working_clock + bolus_duration)/60, y:est_ce});
						}
						if (est_ce >= drug_sets[0].desired) break;
					}
				}
				temptext = "Bolus dose is " + real_bolus + "mg (bolus duration <b>" + converttime(bolus_duration) + "</b>). ";
					//calc alt peak time	
					tempprior = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];
					for (rcc = 1; rcc<1000; rcc++) {
						tempvalue = virtual_model(e_state2[1],e_state2[2],e_state2[3],e_state2[4],rcc,1,0);
						if (tempvalue <= tempprior) {
							//peak achieved
							alt_peak = tempvalue;
							dur = bolus_duration + rcc;
							break;
						} else {
							tempprior = tempvalue;
						}
					}
					temptext = temptext + "Bolus duration has exceeded the interval! ";
					preview_chart[2].push(tempvalue);
					preview_chart[2].push(dur);
					temptext = temptext + "Final peak (overshoot CE) is " + Math.round(tempvalue*100)/100 + "mcg/ml at <b>" + converttime(dur) + "</b>."; 
				document.getElementById("RSI_preview").innerHTML = "PREVIEW: " + temptext;
			} else {
				//check if can reach CE
				//iterate till CE above desired at interval
				difference = RSI_interval - bolus_duration;
				est_ce = virtual_model(e_state2[1],e_state2[2],e_state2[3],e_state2[4],difference,1,0);
				if (est_ce < drug_sets[0].desired) {
					continuation_flag = false;
					for (rc = 0; rc<difference; rc++) {
						distance = difference - rc;
						est_ce = virtual_model(e_state2[1],e_state2[2],e_state2[3],e_state2[4],distance,1,0);
						console.log("---" + distance + "-CE-" + est_ce);
						if (est_ce <= drug_sets[0].desired) {
							p_state2[1] = p_state2[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
							p_state2[2] = p_state2[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
							p_state2[3] = p_state2[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

							e_state2[1] = e_state2[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
							e_state2[2] = e_state2[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
							e_state2[3] = e_state2[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
							e_state2[4] = e_state2[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);

							bolus_duration += 1;
							real_bolus = Math.round(max_rate * bolus_duration);
							drug_sets[ind].preview_bolus = real_bolus;
							if (bolus_duration % 10 == 0) {
								tempcp = p_state2[1] + p_state2[2] + p_state2[3];
								tempce = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];
								preview_chart[0].push({x:(working_clock + bolus_duration)/60, y:tempcp});
								preview_chart[1].push({x:(working_clock + bolus_duration)/60, y:tempce});
							}
							if (distance == 1) {
								continuation_flag = true;
							}	
						} else {
							break;
						}
					}
					if (continuation_flag == true) {
						est_ce = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];
						if (est_ce < drug_sets[0].desired) {
							for (rc = 0; rc<100; rc++) {
								p_state2[1] = p_state2[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
								p_state2[2] = p_state2[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
								p_state2[3] = p_state2[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

								e_state2[1] = e_state2[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
								e_state2[2] = e_state2[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
								e_state2[3] = e_state2[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
								e_state2[4] = e_state2[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);

								bolus_duration += 1;
								real_bolus = Math.round(max_rate * bolus_duration);
								drug_sets[ind].preview_bolus = real_bolus;	
								est_cp = p_state2[1] + p_state2[2] + p_state2[3];
								est_ce = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];
								if (bolus_duration % 10 == 0) {
									preview_chart[0].push({x:(working_clock + bolus_duration)/60, y:est_cp});
									preview_chart[1].push({x:(working_clock + bolus_duration)/60, y:est_ce});
								}
								if (est_ce >= drug_sets[0].desired) break;
							}
						}
					}
				}
				temptext = "RSI bolus dose: " + real_bolus + "mg (bolus duration <b>" + converttime(bolus_duration) + "</b>). ";
				if (bolus_duration>RSI_interval) {
					temptext = temptext + "Bolus duration has exceeded the interval! ";
				}
					//calc alt peak time	
					tempprior = e_state2[1] + e_state2[2] + e_state2[3] + e_state2[4];
					for (rcc = 1; rcc<1000; rcc++) {
						tempvalue = virtual_model(e_state2[1],e_state2[2],e_state2[3],e_state2[4],rcc,1,0);
						if (tempvalue <= tempprior) {
							//peak achieved
							alt_peak = tempvalue;
							dur = bolus_duration + rcc;
							break;
						} else {
							tempprior = tempvalue;
						}
					}
				
				preview_chart[2].push(tempvalue);
				preview_chart[2].push(dur);
				temptext = temptext + "Final peak (overshoot CE) is " + Math.round(tempvalue*100)/100 + "mcg/ml at <b>" + converttime(dur) + "</b>."; 
				document.getElementById("RSI_preview").innerHTML = "PREVIEW: " + temptext;
			}
			//recalculate next time
					cpt_pause = 0;
					cet_pause = 0;
					temp1 = p_state2[1];
					temp2 = p_state2[2];
					temp3 = p_state2[3];
					temp1e = e_state2[1];
					temp2e = e_state2[2];
					temp3e = e_state2[3];
					temp4e = e_state2[4];
					est_cp = temp1+temp2+temp3;
					est_ce = temp1e+temp2e+temp3e+temp4e;
					//iterate till cp/ce drop
					while (est_cp>=drug_sets[0].desired) {
						cpt_pause = cpt_pause + 1;
						est_cp = virtual_model(temp1,temp2,temp3,0,cpt_pause,0,0);
					}
					console.log("new cpt_pause" + cpt_pause);
					est_ce = virtual_model(temp1e,temp2e,temp3e,temp4e,cpt_pause,1,0);
					cet_pause = cpt_pause;
					while (est_ce>=drug_sets[0].desired) {
						cet_pause = cet_pause+1;
						est_ce = virtual_model(temp1e,temp2e,temp3e,temp4e,cet_pause,1,0);
					}
					console.log("new cet_pause" + cet_pause);
					sigmoidx = (cet_pause - 300)/50;
					sigmoid = 1/(1+Math.exp(-sigmoidx));
					sigmoidcorrfactor = 0.5 * sigmoid; //this will make sure the corrfactor max = 0.5
					breakpoint = Math.floor((cet_pause - cpt_pause)*sigmoidcorrfactor + cpt_pause);
					console.log("entering breakpoint -- " + breakpoint);
					temp_peak = breakpoint;
		}
	} //end no bolus block

	//volume_infused += x/infusate_concentration;
	//historytext = historytext.concat("<br>" + "Time: " + time_in_s + "s - Bolus: " + x + "mg");
	//displayresult(result, result_e);
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
	if (optionsarray_infusionunit[1][0] == 1) {
		return document.getElementById("inputBolus" + arg).value * 1;	
	} else if (optionsarray_infusionunit[1][1] == 1) {
		return document.getElementById("inputBolus" + arg).value * mass;	
	} else {
		return document.getElementById("inputBolus" + arg).value * drug_sets[active_drug_set_index].infusate_concentration;	
	}
	
}

function bolusadmin(x, ind, max_rate_input) {
	if (max_rate_input == undefined) max_rate_input = 0;
	//addition to cap max bolus rate
	//max bolus rate capped "max_rate_input"ml/h which is equivalent to:
	max_rate = max_rate_input * drug_sets[ind].infusate_concentration / 60 / 60;
	rate_corr_factor = 1;
	//i.e. approx 3.3mg per sec for propofol for 1200ml/h
	//this is for CET
	if (temp_peak != undefined) {
		if (RSI_mode == true) {
			//no need correction, you want to inc CE as fast as possible
			//but for practical reasons, change max_rate_input = 0 to 7200
			if (max_rate_input == 0) {
				max_rate = 7200 * drug_sets[ind].infusate_concentration / 60 / 60;
			}
		} else {
			//however, needs to have a correction factor, because if max_rate too slow, will overshoot CE
			min_rate = x / temp_peak; //in mg sec-1
			max_1200 = 1200 * drug_sets[ind].infusate_concentration / 60 / 60;
			//scale to 0.8-1.0
			if (min_rate > max_rate) {
				//bolus duration will exceed temp peak, set to 0.8
				rate_corr_factor = 0.8;
				if (drug_sets[ind].drug_name == "Dexmedetomidine") {
					rate_corr_factor = 1;
				}
			} else if (max_rate_input>1200) {
				rate_corr_factor = 0.97;
			} else {
				rate_corr_factor = 0.97 - ((max_1200 - max_rate) / (max_1200 - min_rate))*0.1;
			}
		}
	} 

	var working_clock = Math.floor(time_in_s);
	l1 = Math.exp(-drug_sets[ind].lambda[1]);
	l2 = Math.exp(-drug_sets[ind].lambda[2]);
	l3 = Math.exp(-drug_sets[ind].lambda[3]);
	l4 = Math.exp(-drug_sets[ind].lambda[4]);
	if (drug_sets[ind].manualmode_active == 1) {
		lookaheadpreviewhide();
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
		p_state3[1] = p_state[1];
		p_state3[2] = p_state[2];
		p_state3[3] = p_state[3];
		e_state3[1] = e_state[1];
		e_state3[2] = e_state[2];
		e_state3[3] = e_state[3];
		e_state3[4] = e_state[4];
	}

	//branch off: bolus vs no_bolus
	if (max_rate == 0) {
		if (p_state[1] == 0) {
			temp_vol = 0 
		} else {
			temp_vol = drug_sets[ind].volinf[working_clock-1];
		}
		max_rate = x;
		p_state3[1] = p_state3[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
		p_state3[2] = p_state3[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
		p_state3[3] = p_state3[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

		e_state3[1] = e_state3[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
		e_state3[2] = e_state3[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
		e_state3[3] = e_state3[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
		e_state3[4] = e_state3[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);
		drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
		drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
		temp_vol = temp_vol + max_rate/drug_sets[ind].infusate_concentration;
		drug_sets[ind].volinf.push(temp_vol);
		drug_sets[ind].cpt_rates_real.push(0.0001);
		//fix division by zero bug in deliver cpt
	} else {
		bolus_duration = Math.floor(x / max_rate * rate_corr_factor);
		if (temp_peak != undefined) {
			if (bolus_duration >= temp_peak) {
				//make temp_peak equal to bolus_duration
				temp_peak = bolus_duration;
			} else {
			}
		}
		real_bolus = Math.round(max_rate * bolus_duration);
		if (drug_sets[ind].cpt_active>0) {
			drug_sets[ind].cpt_bolus = real_bolus;
		} else if (drug_sets[ind].cet_active>0) {
			drug_sets[ind].cet_bolus = real_bolus;	
		}

		console.log("corrfac" + rate_corr_factor);
		console.log("bolus duration is" + bolus_duration);
		console.log("real bolus amount is" + max_rate * bolus_duration);
		if (p_state[1] == 0) {
			temp_vol = 0 
		} else {
			temp_vol = drug_sets[ind].volinf[working_clock-1];
		}
		for (counter1 = 0; counter1 <= bolus_duration; counter1++) {
			p_state3[1] = p_state3[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
			p_state3[2] = p_state3[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
			p_state3[3] = p_state3[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

			e_state3[1] = e_state3[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
			e_state3[2] = e_state3[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
			e_state3[3] = e_state3[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
			e_state3[4] = e_state3[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);
			drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
			drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
			temp_vol = temp_vol + max_rate/drug_sets[ind].infusate_concentration;
			drug_sets[ind].volinf.push(temp_vol);
			drug_sets[ind].cpt_rates_real.push(max_rate);

						if (counter1%10==0) {
							temp_result = p_state3[1] + p_state3[2] + p_state3[3];
							temp_result_e = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
							myChart.data.datasets[ind*2+2].data.push({x:(working_clock+counter1)/60, y:temp_result});
							myChart.data.datasets[ind*2+3].data.push({x:(working_clock+counter1)/60, y:temp_result_e});
						}
		}
		// CPT mode check if can reach CP esp for slow max rate
		
		if (drug_sets[ind].cpt_active > 0) {
			est_cp = p_state3[1] + p_state3[2] + p_state3[3];
			if (est_cp < drug_sets[ind].desired) {
				for (cpec = 0; cpec<600; cpec++) {
					p_state3[1] = p_state3[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
					p_state3[2] = p_state3[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
					p_state3[3] = p_state3[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

					e_state3[1] = e_state3[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
					e_state3[2] = e_state3[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
					e_state3[3] = e_state3[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
					e_state3[4] = e_state3[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);
					drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
					drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
					temp_vol = temp_vol + max_rate/drug_sets[ind].infusate_concentration;
					drug_sets[ind].volinf.push(temp_vol);
					drug_sets[ind].cpt_rates_real.push(max_rate);
					est_cp = p_state3[1] + p_state3[2] + p_state3[3];
					est_ce = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
					bolus_duration += 1;
					real_bolus = Math.round(max_rate * bolus_duration);

						if (cpec%10==0) {
							myChart.data.datasets[ind*2+2].data.push({x:(working_clock+bolus_duration)/60, y:est_cp});
							myChart.data.datasets[ind*2+3].data.push({x:(working_clock+bolus_duration)/60, y:est_ce});
						}
					if (est_cp > drug_sets[ind].desired) break;
				}
			}
			drug_sets[ind].cpt_bolus = real_bolus;
		}
		
	
		if (RSI_mode == true) {
			//need further bolus to push up CE?
			if (bolus_duration > RSI_interval) {
				est_ce = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
				if (est_ce <= drug_sets[0].desired) {
					for (rc = 0; rc<100; rc++) {
						
						p_state3[1] = p_state3[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
						p_state3[2] = p_state3[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
						p_state3[3] = p_state3[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

						e_state3[1] = e_state3[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
						e_state3[2] = e_state3[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
						e_state3[3] = e_state3[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
						e_state3[4] = e_state3[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);
						drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
						drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
						temp_vol = temp_vol + max_rate/drug_sets[ind].infusate_concentration;
						drug_sets[ind].volinf.push(temp_vol);
						drug_sets[ind].cpt_rates_real.push(max_rate);

						//if (rc%10==0) {
						//	temp_result = p_state3[1] + p_state3[2] + p_state3[3];
						//	temp_result_e = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
						//	myChart.data.datasets[ind*2+2].data.push({x:(working_clock+rc)/60, y:temp_result});
						//	myChart.data.datasets[ind*2+3].data.push({x:(working_clock+rc)/60, y:temp_result_e});
						//}
						bolus_duration += 1;
						real_bolus = Math.round(max_rate * bolus_duration);
						drug_sets[ind].cet_bolus = real_bolus;	
						est_ce = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
						if (est_ce >= drug_sets[0].desired) break;
					}
				}
				temptext = "Bolus dose is " + real_bolus + "mg (bolus duration <b>" + converttime(bolus_duration) + "</b>). ";
					//calc alt peak time	
					tempprior = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
					for (rcc = 1; rcc<1000; rcc++) {
						tempvalue = virtual_model(e_state3[1],e_state3[2],e_state3[3],e_state3[4],rcc,1,0);
						if (tempvalue <= tempprior) {
							//peak achieved
							alt_peak = tempvalue;
							dur = bolus_duration + rcc;
							break;
						} else {
							tempprior = tempvalue;
						}
					}
					temptext = temptext + "Bolus duration has exceeded the interval! ";
					temptext = temptext + "Final peak (overshoot CE) is " + Math.round(tempvalue*100)/100 + "mcg/ml at <b>" + converttime(dur) + "."; 
				if (parseloading == 0) {
					document.getElementById("RSI_message").innerHTML = temptext;	
				}
			} else {
				//check if can reach CE
				//iterate till CE above desired at interval
				difference = RSI_interval - bolus_duration;
				est_ce = virtual_model(e_state3[1],e_state3[2],e_state3[3],e_state3[4],difference,1,0);
				if (est_ce < drug_sets[0].desired) {
					continuation_flag = false;
					for (rc = 0; rc<difference; rc++) {
						distance = difference - rc;
						est_ce = virtual_model(e_state3[1],e_state3[2],e_state3[3],e_state3[4],distance,1,0);
						console.log("---" + distance + "-CE-" + est_ce);
						if (est_ce <= drug_sets[0].desired) {
							p_state3[1] = p_state3[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
							p_state3[2] = p_state3[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
							p_state3[3] = p_state3[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

							e_state3[1] = e_state3[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
							e_state3[2] = e_state3[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
							e_state3[3] = e_state3[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
							e_state3[4] = e_state3[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);
							drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
							drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
							temp_vol = temp_vol + max_rate/drug_sets[ind].infusate_concentration;
							drug_sets[ind].volinf.push(temp_vol);
							drug_sets[ind].cpt_rates_real.push(max_rate);

							//if (rc%10==0) {
							//	temp_result = p_state3[1] + p_state3[2] + p_state3[3];
							//	temp_result_e = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
							//	myChart.data.datasets[ind*2+2].data.push({x:(working_clock+rc)/60, y:temp_result});
							//	myChart.data.datasets[ind*2+3].data.push({x:(working_clock+rc)/60, y:temp_result_e});
							//}
							bolus_duration += 1;
							real_bolus = Math.round(max_rate * bolus_duration);
							drug_sets[ind].cet_bolus = real_bolus;
							if (distance == 1) {
								continuation_flag = true;
							}	
						} else {
							break;
						}
					}
					if (continuation_flag == true) {
						est_ce = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
						if (est_ce < drug_sets[0].desired) {
							for (rc = 0; rc<100; rc++) {
								p_state3[1] = p_state3[1] * l1 + drug_sets[ind].p_coef[1] * max_rate * (1 - l1);
								p_state3[2] = p_state3[2] * l2 + drug_sets[ind].p_coef[2] * max_rate * (1 - l2);
								p_state3[3] = p_state3[3] * l3 + drug_sets[ind].p_coef[3] * max_rate * (1 - l3);

								e_state3[1] = e_state3[1] * l1 + drug_sets[ind].e_coef[1] * max_rate * (1 - l1);
								e_state3[2] = e_state3[2] * l2 + drug_sets[ind].e_coef[2] * max_rate * (1 - l2);
								e_state3[3] = e_state3[3] * l3 + drug_sets[ind].e_coef[3] * max_rate * (1 - l3);
								e_state3[4] = e_state3[4] * l4 + drug_sets[ind].e_coef[4] * max_rate * (1 - l4);
								drug_sets[ind].cpt_cp.push([p_state3[1],p_state3[2],p_state3[3]]);
								drug_sets[ind].cpt_ce.push([e_state3[1],e_state3[2],e_state3[3],e_state3[4]]);
								temp_vol = temp_vol + max_rate/drug_sets[ind].infusate_concentration;
								drug_sets[ind].volinf.push(temp_vol);
								drug_sets[ind].cpt_rates_real.push(max_rate);

								//if (rc%10==0) {
								//	temp_result = p_state3[1] + p_state3[2] + p_state3[3];
								//	temp_result_e = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
								//	myChart.data.datasets[ind*2+2].data.push({x:(working_clock+rc)/60, y:temp_result});
								//	myChart.data.datasets[ind*2+3].data.push({x:(working_clock+rc)/60, y:temp_result_e});
								//}
								bolus_duration += 1;
								real_bolus = Math.round(max_rate * bolus_duration);
								drug_sets[ind].cet_bolus = real_bolus;	
								est_ce = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
								if (est_ce >= drug_sets[0].desired) break;
							}
						}
					}
				}
				temptext = "RSI bolus dose: " + real_bolus + "mg (bolus duration <b>" + converttime(bolus_duration) + "</b>). ";
				if (bolus_duration>RSI_interval) {
					temptext = temptext + "Bolus duration has exceeded the interval! ";
				} else {
					//calc alt peak time	
					tempprior = e_state3[1] + e_state3[2] + e_state3[3] + e_state3[4];
					for (rcc = 1; rcc<1000; rcc++) {
						tempvalue = virtual_model(e_state3[1],e_state3[2],e_state3[3],e_state3[4],rcc,1,0);
						if (tempvalue <= tempprior) {
							//peak achieved
							alt_peak = tempvalue;
							dur = bolus_duration + rcc;
							break;
						} else {
							tempprior = tempvalue;
						}
					}
				}temptext = temptext + "Final peak (overshoot CE) is " + Math.round(tempvalue*100)/100 + "mcg/ml at <b>" + converttime(dur) + "</b>."; 
				if (parseloading == 0) {
					document.getElementById("RSI_message").innerHTML = temptext;
				}
			}
			//recalculate next time
					cpt_pause = 0;
					cet_pause = 0;
					temp1 = p_state3[1];
					temp2 = p_state3[2];
					temp3 = p_state3[3];
					temp1e = e_state3[1];
					temp2e = e_state3[2];
					temp3e = e_state3[3];
					temp4e = e_state3[4];
					est_cp = temp1+temp2+temp3;
					est_ce = temp1e+temp2e+temp3e+temp4e;
					//iterate till cp/ce drop
					while (est_cp>=drug_sets[0].desired) {
						cpt_pause = cpt_pause + 1;
						est_cp = virtual_model(temp1,temp2,temp3,0,cpt_pause,0,0);
					}
					console.log("new cpt_pause" + cpt_pause);
					est_ce = virtual_model(temp1e,temp2e,temp3e,temp4e,cpt_pause,1,0);
					cet_pause = cpt_pause;
					while (est_ce>=drug_sets[0].desired) {
						cet_pause = cet_pause+1;
						est_ce = virtual_model(temp1e,temp2e,temp3e,temp4e,cet_pause,1,0);
					}
					console.log("new cet_pause" + cet_pause);
					sigmoidx = (cet_pause - 300)/50;
					sigmoid = 1/(1+Math.exp(-sigmoidx));
					sigmoidcorrfactor = 0.5 * sigmoid; //this will make sure the corrfactor max = 0.5
					breakpoint = Math.floor((cet_pause - cpt_pause)*sigmoidcorrfactor + cpt_pause);
					console.log("entering breakpoint -- " + breakpoint);
					temp_peak = breakpoint;
		}
	} //end no-bolus block


	if (drug_sets[ind].manualmode_active == 1) {
		p_state3[1] = p_state[1];
		p_state[2] = p_state3[2];
		p_state[3] = p_state3[3];
		e_state[1] = e_state3[1];
		e_state[2] = e_state3[2];
		e_state[3] = e_state3[3];
		e_state[4] = e_state3[4];
		//drug_sets[ind].cpt_cp.push([p_state[1],p_state[2],p_state[3]]);
		//drug_sets[ind].cpt_ce.push([e_state[1],e_state[2],e_state[3],e_state[4]]);
		//drug_sets[ind].volinf.push(temp_vol+x/drug_sets[ind].infusate_concentration);
		//do not push volinf two times
		drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div><div class='timespan'>" + converttime(working_clock) + "</div> Bolus: " + x + drug_sets[ind].infused_units + "</div>");
		drug_sets[ind].historyarrays.push([0,1,working_clock,x]);
		lookahead(1,21600,ind);
		document.getElementById("historywrapper").innerHTML = drug_sets[ind].historytext;
	}
	//result = p_state[1] + p_state[2] + p_state[3];
	//result_e = e_state[1] + e_state[2] + e_state[3] + e_state[4];
	
	//if ((cpt_active == 0) && (cet_active ==0)) {
	//	historytext = historytext.concat("<br>" + "Time: " + time_in_s + "s - Bolus: " + x + "mg");
	//}
	//displayresult(result, result_e);
}


//section: pharmacology, ref stanpump


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

		if (drug_sets[drug_sets_index].drug_name == "Ketamine") {
			drug_sets[drug_sets_index].p_coef[1] *= 1000;
			drug_sets[drug_sets_index].p_coef[2] *= 1000;
			drug_sets[drug_sets_index].p_coef[3] *= 1000;
			drug_sets[drug_sets_index].e_coef[1] *= 1000;
			drug_sets[drug_sets_index].e_coef[2] *= 1000;
			drug_sets[drug_sets_index].e_coef[3] *= 1000;
			drug_sets[drug_sets_index].e_coef[4] *= 1000;
		}
		

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
	for (i = 1;  i < 301;  i++)
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


function readmodel(x, drug_set_index) {
	drug_sets[drug_set_index] = {};
	drug_sets[drug_set_index].model_name = x;
	if (x == "Marsh") {
		if (useAdjBW == 1) {
			drug_sets[drug_set_index].vc = 0.228 * AdjBW;
		} else {
			drug_sets[drug_set_index].vc = 0.228 * mass;
		}
		
		drug_sets[drug_set_index].k10 = 0.119;
		drug_sets[drug_set_index].k12 = 0.112;
		drug_sets[drug_set_index].k13 = 0.0419;
		drug_sets[drug_set_index].k21 = 0.055;
		drug_sets[drug_set_index].k31 = 0.0033;
		drug_sets[drug_set_index].k41 = 1.21;
		drug_sets[drug_set_index].modeltext = "Marsh model (BJA 1991;67:41-8), 'fast' ke0 (Anesthesiology 2000;92:399-406)" + "<br>" +
		"vc = " + rnd3(drug_sets[drug_set_index].vc) + "<br>" +
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" +
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
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
		if (useAdjBW == 0) {
			var cl1 = 1.89+0.0456*(mass-77)-0.0681*(lbm-59)+0.0264*(height-177);
		} else {
			if (gender == 0) 
				{lbm2 = 1.1 * AdjBW - 128 * (AdjBW/height) * (AdjBW/height);}
			else
				{lbm2 = 1.07 * AdjBW - 148 * (AdjBW/height) * (AdjBW/height);}
			var cl1 = 1.89+0.0456*(AdjBW-77)-0.0681*(lbm2-59)+0.0264*(height-177);
		}
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
		"v2 = " + rnd3(v2) + "<br>" +
		"v3 = " + rnd3(v3) + "<br>" +
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" +
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
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
		//drug_sets[drug_set_index].k41 = 1.03*Math.exp(-0.12*age); 
		//Pharmacodynamic modelling of the bispectral index response to propofol-based anaesthesia during general surgery in children C. Jeleazcov, H. Ihmsen, J. Schmidt, C. Ammon, H. Schwilden, J. Schüttler, J. Fechner Author Notes BJA: British Journal of Anaesthesia, Volume 100, Issue 4, April 2008, Pages 509–516, https://doi.org/10.1093/bja/aem408
		//tpeak formula tpeak = 0.14*age + 2.08
		var_tpeak = converttime(Math.round((0.14*age + 2.08)*60));
		if (age<13) {
			drug_sets[drug_set_index].vc = 0.4584 * mass;
			drug_sets[drug_set_index].k10 = 0.1527 * Math.pow(mass, -0.3);
			var_const = 0.7751*Math.exp(-0.099*age);
			drug_sets[drug_set_index].k41 = 0.0351 * Math.log(mass) + var_const;
			//tpeak figures from study used to generate ke0 values from SimTIVA
			//ke0 0.381 for 11yo 30kg, 0.385 for 35kg, 0.39 for 40kg -> tpeak 217
			//ke0 0.408 for 10yo 30kg, 0.402 for 25kg, 0.411 for 35kg -> tpeak 209
			//ke0 0.438 for 9yo 30kg, 0.434 for 25kg, 0.441 for 35kg -> tpeak 200
			//ke0 0.458 for 8yo 20kg, 0.466 for 25kg, 0.47 for 30kg -> tpeak 192
			//ke0 0.483 for 7yo 15kg,  0.468 for 10kg, 0.489 for 20kg -> tpeak 184
			//ke0 0.525 for 6yo 15kg, 0.51 for 10kg, 0.535 for 20kg -> tpeak 175 
			//ke0 0.565 for 5yo 15kg, 0.550 for 10kg, 0.575 for 20kg -> tpeak 167
			//ke0 0.62 for 4yo 15kg, 0.60 for 10kg, 0.63 for 20kg -> tpeak 158
			//ke0 0.675 for 3yo 15kg, 0.655 for 10kg, 0.685 for 20kg -> tpeak 150
			
		} else if (age>=13 && age<14) {
			drug_sets[drug_set_index].vc = 0.4 * mass;
			drug_sets[drug_set_index].k10 = 0.0678;	
			drug_sets[drug_set_index].k41 = 0.319;
			//ke0 0.319 -> tpeak 234; fixed because k10 fixed
		} else if (age>=14 && age<15) {
			drug_sets[drug_set_index].vc = 0.342 * mass;
			drug_sets[drug_set_index].k10 = 0.0792;	
			drug_sets[drug_set_index].k41 = 0.286;	
			//tpeak 242
		} else if (age>=15 && age<16) {
			drug_sets[drug_set_index].vc = 0.284 * mass;
			drug_sets[drug_set_index].k10 = 0.0954;	
			drug_sets[drug_set_index].k41 = 0.251;
			//tpeak 251	
		} else if (age>=16) {
			drug_sets[drug_set_index].vc = 0.229 * mass;
			drug_sets[drug_set_index].k10 = 0.119;		
			drug_sets[drug_set_index].k41 = 1.21;
			//=modified Marsh
		}
		drug_sets[drug_set_index].modeltext = "Paedfusor model (BJA 2003;91(4)507-513)" + "<br>" +
		"vc = " + rnd3(drug_sets[drug_set_index].vc) + "<br>" +
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" +
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
		"ke0 = " + rnd3(drug_sets[drug_set_index].k41) + " (Tpeak = " + var_tpeak + ")<br>" +
		"ke0 calculated by Tpeak method (age-dependent) and converted for use for Paedfusor model (BJA 2008;100(4):509-516)";

		drug_sets[drug_set_index].drug_name = "Propofol";
		drug_sets[drug_set_index].conc_units = "mcg";
		drug_sets[drug_set_index].infused_units = "mg";
		drug_sets[drug_set_index].inf_rate_permass = 0;
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;
	}
	if (x == "Eleveld") {

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
			if (opioid == 1) {
				var cl1 = 1.79 * Math.pow(mass/70,0.75) * (fclmaturation(PMA)/fclmaturation(35*toweeks+40))* Math.exp(-0.00286*age) ;
			} else {
				var cl1 = 1.79 * Math.pow(mass/70,0.75) * (fclmaturation(PMA)/fclmaturation(35*toweeks+40)) ;
			}
			//maturation valid for ~<5months according to Eleveld 2018
		} else {
			if (opioid == 1) {
				var cl1 = 2.1 * Math.pow(mass/70,0.75) * (fclmaturation(PMA)/fclmaturation(35*toweeks+40))* Math.exp(-0.00286*age) ;
			} else {
				var cl1 = 2.1 * Math.pow(mass/70,0.75) * (fclmaturation(PMA)/fclmaturation(35*toweeks+40)) ;
			}
		}
		var cl2 = 1.75 * Math.pow(v2/v2ref,0.75)* (1 + 1.3*(1-fq3maturation(age*toweeks)));
		var cl3 = 1.11 * Math.pow(v3/v3ref,0.75)*(fq3maturation(age*toweeks)/fq3maturation(35*toweeks));
		drug_sets[drug_set_index].k41 = 0.146 * Math.pow(mass/70,-0.25); 
		drug_sets[drug_set_index].k10 = cl1 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k12 = cl2 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k13 = cl3 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k21 = cl2 / v2;
		drug_sets[drug_set_index].k31 = cl3 / v3;
		if (opioid == 1) {
			opioidtext = "Assume: presence of concomitant opioid";	
		} else {
			opioidtext = "Propofol alone; assume absence of opioid"
		}
		
		drug_sets[drug_set_index].modeltext = "Eleveld model (BJA 2018;120:942-959)" + "<br>" +
		opioidtext + "<br>" +
		"vc = " + rnd3(drug_sets[drug_set_index].vc) + "<br>" +
		"v2 = " + rnd3(v2) + "<br>" + 
		"v3 = " + rnd3(v3) + "<br>" + 
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" + 
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
		"ke0 = " + rnd3(drug_sets[drug_set_index].k41) + "<br>";

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
		"vc = " + rnd3(drug_sets[drug_set_index].vc) + "<br>" +
		"v2 = " + rnd3(v2) + "<br>" + 
		"v3 = " + rnd3(v3) + "<br>" + 
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" + 
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
		"ke0 = " + rnd3(drug_sets[drug_set_index].k41) + "<br>";
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
		drug_sets[drug_set_index].k41 = 1.09 * fageing(-0.0289);

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
		"vc = " + rnd3(drug_sets[drug_set_index].vc) + "<br>" +
		"v2 = " + rnd3(v2) + "<br>" + 
		"v3 = " + rnd3(v3) + "<br>" + 
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" + 
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
		"ke0 = " + rnd3(drug_sets[drug_set_index].k41) + "<br>";
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
		"vc = " + rnd3(drug_sets[drug_set_index].vc) + "<br>" +
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" + 
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
		"ke0 = " + rnd3(drug_sets[drug_set_index].k41) + "<br>" +
		"ke0 derived from Scott & Stanski (J Pharmacol Exp Ther 1987;240:159-166)";
	}
	if (x == "Hannivoort") {
		drug_sets[drug_set_index].vc = 1.78 * (mass/70);
		v2 = 30.3 * (mass/70);
		v3 = 52 * (mass/70);
		cl1 = 0.686 * Math.pow((mass/70),0.75);
		cl2 = 2.98 * Math.pow((v2/30.3),0.75);
		cl3 = 0.602 * Math.pow((v3/52),0.75);
		drug_sets[drug_set_index].k10 = cl1 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k12 = cl2 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k13 = cl3 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k21 = cl2 / v2;
		drug_sets[drug_set_index].k31 = cl3 / v3;

		//custom ke0 prediction tool to apply PD-Navarette-Dyck to Hannivoort
		var_const = 0.036013*Math.log(height) - 0.1103923;
		var_coeff = -0.00003167*height - 0.00083989;
		var_ke0 = var_const + var_coeff * Math.log(mass);
		var_tpeak = -406.5*Math.log(height) + 2804.5;
		drug_sets[drug_set_index].k41 = var_ke0;
		//Colin 2017, for MOAA/S : ke0 = 0.0428 (for Dyck)
		//Colin 2017, for BIS : ke0 = 0.12 (for Dyck)
		//ke0 0.0428 for Navarette-Dyck->
		//Dyck tpeak 768 for height 150
		//Dyck tpeak 741 for height 160
		//Dyck tpeak 717 for height 170
		//Dyck tpeak 693 for height 180
		//Dyck tpeak 672 for height 190
		//height 150 (tpeak 768): ke0 0.05015 for 35kg, ke0 0.04653 for 70kg, 0.04242 for 150kg
		//height 160 (tpeak 741): ke0 0.05125 for 35kg, ke0 0.04738 for 70kg, 0.04305 for 140kg, 0.04828 for 60kg
		//height 170 (tpeak 717): ke0 0.05225 for 35kg, ke0 0.04815 for 70kg, 0.04363 for 140kg, 0.04730 for 80kg
		//height 180 (tpeak 693): ke0 0.05329 for 35kg, ke0 0.04891 for 70kg, 0.04418 for 140kg, 0.04804 for 80kg
		//height 190 (tpeak 672): ke0 0.05419 for 35kg, ke0 0.04960 for 70kg, 0.04470 for 140kg
		var_tpeak = 2804.5 - 406.5*Math.log(height);
		drug_sets[drug_set_index].drug_name = "Dexmedetomidine";
		drug_sets[drug_set_index].conc_units = "ng";
		drug_sets[drug_set_index].infused_units = "mcg";
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mcg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;
		drug_sets[drug_set_index].modeltext = "Hannivoort model (Anesthesiology 2015;123:357-367)" + "<br>" +
		"vc = " + rnd3(drug_sets[drug_set_index].vc) + "<br>" +
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" + 
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
		"ke0 = " + rnd3(drug_sets[drug_set_index].k41) + " (Tpeak " + converttime(var_tpeak) + ")<br>" +
		"ke0 (MOAA-Sedation scale): from Colin et al (BJA 2017; 119:200-210)";

	}
	if (x == "Kamp") {
		//from Kamp, Anaesthesiology 2020; DOI 10.1097/ALN.0000000000003577
		drug_sets[drug_set_index].drug_name = "Ketamine";
		drug_sets[drug_set_index].conc_units = "ng";
		drug_sets[drug_set_index].infused_units = "mg";
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;
		//change model rate unit from h-1 to min-1
		cl1 = 84/60 * Math.pow(mass/70, 0.75);
		cl2 = 161/60 * Math.pow(mass/70, 0.75);
		cl3 = 79/60 * Math.pow(mass/70, 0.75);
		drug_sets[drug_set_index].vc = 25 * mass/70 ;
		v2 = 56 * mass/70 ;
		v3 = 157 * mass/70 ;

		//alternative KE0 testing
		//drug_sets[drug_set_index].k41 = 1.39;
		//ke0 1.39 for bw 70kg
		//drug_sets[drug_set_index].k41 = 1.26;
		//ke0 1.26 for bw 35kg
		//drug_sets[drug_set_index].k41 = 1.52;
		//ke0 1.52 for 140kg
		//ke0 of 1.39 matches peak_time of 96s for KE0-Domino - for 70kg.

		drug_sets[drug_set_index].k41 = 0.1876 * Math.log(mass) + 0.5932;;

		//drug_sets[drug_set_index].k41 = 0.238;
		//ke0 0.238 for domino equals peak time of 1.6

		//from Navarette, JCMC, 2025; doi 10.1007/s10877-024-01240-4 
		drug_sets[drug_set_index].k10 = cl1 / drug_sets[drug_set_index].vc ;
		drug_sets[drug_set_index].k12 = cl2 / drug_sets[drug_set_index].vc ;
		drug_sets[drug_set_index].k13 = cl3 / drug_sets[drug_set_index].vc ;
		drug_sets[drug_set_index].k21 = cl2 / v2 ;
		drug_sets[drug_set_index].k31 = cl3 / v3 ;
		drug_sets[drug_set_index].modeltext = "Kamp model (Anesthesiology 2020;133(6):1192-1213)" + "<br>" +
		"vc = " + rnd3(drug_sets[drug_set_index].vc) + "<br>" +
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" + 
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
		"ke0 = " + rnd3(drug_sets[drug_set_index].k41) + " (Tpeak 1.6min) <br>" +
		"ke0 based on analgesia nociception index from Navarette, applied to Kamp model using Tpeak method (J Clin Monit Comput 2025;39(2):349-354)";
	}
	if (x == "Domino") {
		//from ...
		drug_sets[drug_set_index].drug_name = "Ketamine";
		drug_sets[drug_set_index].conc_units = "ng";
		drug_sets[drug_set_index].infused_units = "mg";
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;
		
		drug_sets[drug_set_index].vc = 0.063 * mass;
		drug_sets[drug_set_index].k10 = 0.4381;
		drug_sets[drug_set_index].k12 = 0.5921;
		drug_sets[drug_set_index].k13 = 0.59;
		drug_sets[drug_set_index].k21 = 0.247;
		drug_sets[drug_set_index].k31 = 0.0146;
		drug_sets[drug_set_index].k41 = 0.238;
		//from Navarette, JCMC, 2025; doi 10.1007/s10877-024-01240-4 

		drug_sets[drug_set_index].modeltext = "Domino model (...)" +
		"vc = " + rnd3(drug_sets[drug_set_index].vc) + "<br>" +
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" + 
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
		"ke0 = " + rnd3(drug_sets[drug_set_index].k41) + "<br>" +
		"ke0 (analgesia nociception index) from Navarette (J Clin Monit Comput 2025;39(2):349-354)";
	}
	if (x == "Dyck") {
		drug_sets[drug_set_index].vc = 7.99;
		v2 = 13.8;
		v3 = 187;
		cl1 = 0.00791*height - 0.927;
		cl2 = 2.26;
		cl3 = 1.99;
		drug_sets[drug_set_index].k10 = cl1 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k12 = cl2 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k13 = cl3 / drug_sets[drug_set_index].vc;
		drug_sets[drug_set_index].k21 = cl2 / v2;
		drug_sets[drug_set_index].k31 = cl3 / v3;
		drug_sets[drug_set_index].k41 = 0.0428;
		//Colin 2017, for MOAA/S : ke0 = 0.0428
		//Colin 2017, for BIS : ke0 = 0.12
		drug_sets[drug_set_index].drug_name = "Dexmedetomidine";
		drug_sets[drug_set_index].conc_units = "ng";
		drug_sets[drug_set_index].infused_units = "mcg";
		drug_sets[drug_set_index].inf_rate_permass_factor = 1;
		drug_sets[drug_set_index].inf_rate_permass_unit = "mcg/kg/h";
		drug_sets[drug_set_index].inf_rate_permass_dp = 100;
		drug_sets[drug_set_index].modeltext = "Dyck model (...)" + "<br>" +
		"vc = " + rnd3(drug_sets[drug_set_index].vc) + "<br>" +
		"k10 = " + rnd3(drug_sets[drug_set_index].k10) + "<br>" + 
		"k12 = " + rnd3(drug_sets[drug_set_index].k12) + "<br>" +
		"k13 = " + rnd3(drug_sets[drug_set_index].k13) + "<br>" +
		"k21 = " + rnd3(drug_sets[drug_set_index].k21) + "<br>" +
		"k31 = " + rnd3(drug_sets[drug_set_index].k31) + "<br>" +
		"ke0 = " + rnd3(drug_sets[drug_set_index].k41) + "<br>" +
		"ke0 (MOAA-Sedation scale): from Colin et al (BJA 2017; 119:200-210)";
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

	if ((parseloading == 0) && (drug_sets.length == 1)) {
		document.getElementById("drugname").innerHTML = drug_sets[drug_set_index].drug_name;
		if (x == "Eleveld-Remifentanil") x = "Eleveld";
		document.getElementById("modelname").innerHTML = x;
		document.getElementById("modeldescription").innerHTML = drug_sets[drug_set_index].modeltext;
	}
	if ((parseloading == 0) && (complex_mode == 1))  {
		document.getElementById("drugname").innerHTML = drug_sets[0].drug_name;
		document.getElementById("modelname").innerHTML = drug_sets[0].model_name;
		document.getElementById("modeldescription").innerHTML = drug_sets[0].modeltext;

	}
}

function rnd3(inputparam) {
	return Math.round(inputparam * 1000)/1000;
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


//section: pharmacology predictions

function lookahead(bolusgiven, duration, ind) {
	if (duration>0) {
		//this turns arg into a limit for 7200 iterations
	} else {
		duration = 21600;
	}

	if (bolusgiven == 1) {
		var working_clock = Math.floor(time_in_s) + 1;
		drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div>" + "<div class='timespan'>" + converttime(working_clock-1) + "</div> Rate: " + Math.round(drug_sets[ind].inf_rate_mls*100)/100 + "ml/h</div>");
		drug_sets[ind].historyarrays.push([0,2,working_clock-1,drug_sets[ind].inf_rate_mls]);
	} else {
		var working_clock = Math.floor(time_in_s);
		drug_sets[ind].cpt_cp.length = working_clock;
		drug_sets[ind].cpt_ce.length = working_clock;
		drug_sets[ind].volinf.length = working_clock;	
		drug_sets[ind].cpt_rates_real.length = working_clock;

		drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div>" + "<div class='timespan'>" + converttime(working_clock) + "</div> Rate: " + Math.round(drug_sets[ind].inf_rate_mls*100)/100 + "ml/h</div>");
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
		if ((i>=39*60) && (i<7200) && (i%60==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:(working_clock+i)/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:(working_clock+i)/60, y:est_ce});
		}
		if ((i>=7200) && (i%120==0)) {
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

function lookaheadfill(ind, inputTime, maxDuration) {
	working_clock = inputTime;
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
	var est_cp;
	var est_ce;
	var temp_vol;

	temp_vol = drug_sets[ind].volinf[working_clock-1];

	for (i=working_clock; i<maxDuration; i++) {
		rateIndex = drug_sets[0].historyarray.findIndex((element) => element[0]>=i);
		if (rateIndex == -1) {
			rateIndex = drug_sets[0].historyarray.length-1;
		} else {
			rateIndex = rateIndex - 1;
		}
		look_pump_rate_in_amt = drug_sets[0].historyarray[rateIndex][1];
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
		if ((i-working_clock<3*60) && (i%15==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:i/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:i/60, y:est_ce});
		}
		if ((i-working_clock>=3*60) && (i-working_clock<12*60) && (i%20==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:i/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:i/60, y:est_ce});			
		}
		if ((i-working_clock>=12*60) && (i-working_clock<39*60) && (i%30==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:i/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:i/60, y:est_ce});
		}
		if ((i-working_clock>=39*60) && (i-working_clock<7200) && (i%60==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:i/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:i/60, y:est_ce});
		}
		if ((i-working_clock>=7200) && (i%120==0)) {
			myChart.data.datasets[ind*2+2].data.push({x:i/60, y:est_cp});
			myChart.data.datasets[ind*2+3].data.push({x:i/60, y:est_ce});
		}

	}

	//updatehistorytext
	for (innercounter = 0; innercounter < drug_sets[0].historyarray.length; innercounter++) {
		if (drug_sets[0].historyarray[innercounter][0] > working_clock) {
			test_rate = drug_sets[0].historyarray[innercounter][1]; 
			var rate1 = Math.round(test_rate*3600/drug_sets[ind].infusate_concentration*10)/10;
			var rate2 = Math.round(rate1*drug_sets[ind].infusate_concentration*drug_sets[ind].inf_rate_permass_factor/mass*drug_sets[ind].inf_rate_permass_dp)/drug_sets[ind].inf_rate_permass_dp;
			relativetime = drug_sets[0].historyarray[innercounter][0];					
			drug_sets[ind].historytext = drug_sets[ind].historytext.concat("<div class='schemeinf' data-time='" + relativetime + "'>" + "<div class='timespan'>" + converttime(relativetime) + "</div>" + rate1 + "ml/h " + "<span style='opacity:0.5'>(" + rate2 + drug_sets[ind].inf_rate_permass_unit + ")</span></div>");	
		}
	}
	document.getElementById("historywrapper").innerHTML = drug_sets[0].historytext;
	
	//myChart.data.datasets[ind*2+2].hidden = false;
	//myChart.data.datasets[ind*2+3].hidden = false;
	//myChart.update();
	if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
		apply_fentanyl_correction(ind);
	} else {
		myChart.update();
	}
	//
	//if (parseloading == 0) {
	//	savefile_data();
	//	ptol_generate_margins(ind,0.9,0.5);
	//}
}

var lookahead_timeout = null;
var lookahead_hide_timeout = null;

function lookaheadpreview_debounce(ind,is_bolus) {
	clearTimeout(lookahead_timeout);
	lookahead_timeout = setTimeout(lookaheadpreview2,700,ind,is_bolus);
	if (drug_sets[ind].firstrun > -1) {
		clearTimeout(lookahead_hide_timeout);
		lookahead_hide_timeout = setTimeout(lookaheadpreviewhide,15*1000);
	}
}

function lookaheadpreviewhide() {
	myChart.data.datasets[12].hidden = true;
	myChart.data.datasets[13].hidden = true;
	myChart.data.datasets[12].data.length = 0;
	myChart.data.datasets[13].data.length = 0;
	clearTimeout(lookahead_timeout);
	clearTimeout(lookahead_hide_timeout);
    lookahead_timeout = null;
    lookahead_hide_timeout = null;
}

function lookaheadpreview2(ind,is_bolus) {
	//determine if started or not
	bolusvalue = 0;
	infvalue = 0;
	if (drug_sets[ind].firstrun == -1) {
		//get bolus
		tempbolus = 0;
		if (document.getElementById("inputBolus_initial" + ind).value > 0) {
			tempbolus = document.getElementById("inputBolus_initial" + ind).value *1;
			if (optionsarray_infusionunit[1][0] == 1) {
				bolusvalue = tempbolus;
			} else if (optionsarray_infusionunit[1][1] == 1) {
				bolusvalue = tempbolus * mass;
			} else {
				bolusvalue = tempbolus * drug_sets[ind].infusate_concentration;
			}
		}
		tempinf = 0;
		if (document.getElementById("inputInfusion" + ind).value > 0) {
			tempinf = document.getElementById("inputInfusion" + ind).value *1;
			if (optionsarray_infusionunit[0][0] == 1) {
				infvalue = tempinf; 
			} else {
				//otherwise convert to ml/h first
				infvalue = tempinf/drug_sets[ind].infusate_concentration/drug_sets[ind].inf_rate_permass_factor*mass;
			}
		}
		if ((tempbolus > 0) || (tempinf > 0)) {
			lookaheadpreview(bolusvalue,infvalue,ind);	
		} else {
			lookaheadpreviewhide();
		}
	} else {
		if (is_bolus) {
			tempbolus = 0;
			if (document.getElementById("inputBolus" + ind).value > 0) {
				tempbolus = document.getElementById("inputBolus" + ind).value *1;
				if (optionsarray_infusionunit[1][0] == 1) {
					bolusvalue = tempbolus;
				} else if (optionsarray_infusionunit[1][1] == 1) {
					bolusvalue = temp_bolus * mass;
				} else {
					bolusvalue = temp_bolus * drug_sets[ind].infusate_concentration;
				}
				//get inf rate
				inf_value = drug_sets[ind].inf_rate_mls;
				lookaheadpreview(bolusvalue,inf_value,ind);
			}
		} else {
			tempinf = 0;
			if (document.getElementById("inputInfusion" + ind).value > 0) {
				tempinf = document.getElementById("inputInfusion" + ind).value *1;
				if (optionsarray_infusionunit[0][0] == 1) {
					infvalue = tempinf; 
				} else {
					//otherwise convert to ml/h first
					infvalue = tempinf/drug_sets[ind].infusate_concentration/drug_sets[ind].inf_rate_permass_factor*mass;
				}
				lookaheadpreview(0,infvalue,ind);
			}
		}
	}
}

function lookaheadpreview(bolusvalue,infvalue,ind) {
	//resets
	preview_chart[0] = new Array();
	preview_chart[1] = new Array();
	myChart.data.datasets[12].data.length = 0;
	myChart.data.datasets[13].data.length = 0;
	duration = 3600;
	working_clock = Math.round(time_in_s);
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
			est_cp = p_state[1]+p_state[2]+p_state[3];
			est_ce = e_state[1]+e_state[2]+e_state[3]+e_state[4];
			preview_chart[0].push({x:(working_clock)/60, y:est_cp});
			preview_chart[1].push({x:(working_clock)/60, y:est_ce});
		}
	} else {
			preview_chart[0].push({x:(working_clock)/60, y:0});
			preview_chart[1].push({x:(working_clock)/60, y:0});
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
	//push current

	startvalue = 1;
	if (bolusvalue > 0) {
		p_state2[1] = p_state2[1] * look_l1 + drug_sets[ind].p_coef[1] * bolusvalue * (1 - look_l1);
		p_state2[2] = p_state2[2] * look_l2 + drug_sets[ind].p_coef[2] * bolusvalue * (1 - look_l2);
		p_state2[3] = p_state2[3] * look_l3 + drug_sets[ind].p_coef[3] * bolusvalue * (1 - look_l3);

		e_state2[1] = e_state2[1] * look_l1 + drug_sets[ind].e_coef[1] * bolusvalue * (1 - look_l1);
		e_state2[2] = e_state2[2] * look_l2 + drug_sets[ind].e_coef[2] * bolusvalue * (1 - look_l2);
		e_state2[3] = e_state2[3] * look_l3 + drug_sets[ind].e_coef[3] * bolusvalue * (1 - look_l3);
		e_state2[4] = e_state2[4] * look_l4 + drug_sets[ind].e_coef[4] * bolusvalue * (1 - look_l4);
		est_cp = p_state2[1]+p_state2[2]+p_state2[3];
		est_ce = e_state2[1]+e_state2[2]+e_state2[3]+e_state2[4];
		preview_chart[0].push({x:(working_clock+1)/60, y:est_cp});
		preview_chart[1].push({x:(working_clock+1)/60, y:est_ce});
		startvalue = 2;
	}
	look_pump_rate_in_amt = infvalue * drug_sets[ind].infusate_concentration / 3600;
	var est_cp;
	var est_ce;
	var temp_vol;
	for (i=startvalue; i<duration; i++) {
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
		if (i%10==0) {
			preview_chart[0].push({x:(working_clock+i)/60, y:est_cp});
			preview_chart[1].push({x:(working_clock+i)/60, y:est_ce});
		}
	}
	//fentanyl correction
	if (drug_sets[ind].fentanyl_weightadjusted_flag==1) {
		for (i=0;i<preview_chart[0].length;i++) {
			preview_chart[0][i].y *= drug_sets[ind].fentanyl_weightadjusted_factor;
			preview_chart[1][i].y *= drug_sets[ind].fentanyl_weightadjusted_factor;
		}
	}
	//visuals
	if (complex_mode == 1) {//ref: behind position, complex interface init
		if (ind==0) {
			myChart.data.datasets[12].borderColor = 'rgba(199,154,0,0.45)';
			myChart.data.datasets[13].borderColor = 'rgba(196,144,0,0.45)';
			myChart.data.datasets[12].borderDash = [2,2];
			myChart.data.datasets[13].borderDash = [0];
			myChart.data.datasets[12].borderWidth = 2;
			myChart.data.datasets[13].borderWidth = 2;
		} else {
			myChart.data.datasets[12].borderColor = 'rgba(94,146,243,0.45)';
			myChart.data.datasets[13].borderColor = 'rgba(3,169,244,0.45)';	
			myChart.data.datasets[12].borderDash = [2,2];
			myChart.data.datasets[13].borderDash = [0];	
			myChart.data.datasets[12].borderWidth = 2;
			myChart.data.datasets[13].borderWidth = 2;	
		}
	}
	myChart.data.datasets[12].data = preview_chart[0];
	myChart.data.datasets[13].data = preview_chart[1];
	myChart.data.datasets[12].hidden = false;
	myChart.data.datasets[13].hidden = false;
	myChart.options.plugins.tooltip.enabled = true;
	myChart.update();	
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
	document.getElementById("inputDesiredCe" + active_drug_set_index + "_new").value = "";
	document.getElementById("inputDesired" + active_drug_set_index).value = "";
	window.scrollTo(0,0);
	hideallmodal();
}

//section: volume and time estimation functions

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


//section: for RSI
function RSIfunction(desired,interval) {
    trialbolus = (desired - virtual_model(0, 0, 0, 0, temp_peak, 1, 0)) / drug_sets[0].e_udf[temp_peak];
    current = trialbolus;
    for (test=0; test<1000; test++) {
        desired_trial = drug_sets[0].e_udf[interval] * current;
        more_trial = drug_sets[0].e_udf[interval] * (current + 1);
        current = current + 1;
        console.log("RSI FUNCTION" + " - bolus size " + current + " est CE " + desired_trial);
        if (more_trial > desired) break;
    }
    return current;
}

function deliver_RSI() {
	myChart.data.datasets[12].data.length = 0;
	myChart.data.datasets[13].data.length = 0;
	myChart.data.datasets[12].hidden = true;
	myChart.data.datasets[13].hidden = true;
	inputCE = document.getElementById("input_RSI_CE").value *1;
	RSI_interval = document.getElementById("input_RSI_time").value *1;
	RSI_mode = true;
	document.getElementById("inputDesiredCe0_new").value = inputCE;
	document.getElementById("RSI_preview").style.display = "none";
	document.getElementById("RSI_message").style.display = "block";
	document.getElementById("input_RSI_CE").disabled = true;
	document.getElementById("input_RSI_CE").style.borderColor = "transparent";
	document.getElementById("input_RSI_bolusspeed").disabled = true;
	document.getElementById("input_RSI_bolusspeed").style.borderColor = "transparent";
	document.getElementById("input_RSI_time").disabled = true;
	document.getElementById("input_RSI_time").style.borderColor = "transparent";
	document.getElementById("proceed_RSI_div").style.display = "none";
	document.getElementById("RSI_displayschemebutton").style.display = "none";
	document.getElementById("card_cet0_new").style.display = "flex";
	document.getElementById("RSI_scheme").classList.add("hide");
	document.getElementById("card_RSI_contents").classList.remove("expandheight");
	document.getElementById("prompts_container").classList.remove("RSImode");
	start_cet();
}

function preview_RSI() {
	inputCE = document.getElementById("input_RSI_CE").value *1;
	if (inputCE>0) {
		bs = document.getElementById("input_RSI_bolusspeed").value;
		document.getElementById("select_bolusspeed").value = bs;
		applybolusspeed();
		document.getElementById("RSI_preview").style.display = "block";
		document.getElementById("proceed_RSI_div").style.display = "block";
		document.getElementById("RSI_displayschemebutton").style.display = "block";
		RSI_interval = document.getElementById("input_RSI_time").value *1;
		RSI_mode = true;
		document.getElementById("inputDesiredCe0_new").value = inputCE;
		displaypreview2(inputCE,0);
		myChart.options.plugins.tooltip.enabled = true;
		temptext = drug_sets[0].previewhistorytext;
		el = document.getElementById("RSI_scheme");
		el.innerHTML = temptext;
	}
}

RSI_debounce = null;

function preview_RSI_debounce() {
	clearTimeout(RSI_debounce);
	RSI_debounce = setTimeout(preview_RSI,500);
}

function RSI_togglescheme() {
	temptext = drug_sets[0].previewhistorytext;
	elself = document.getElementById("RSI_displayschemebutton");
	el = document.getElementById("RSI_scheme");
	el2 = document.getElementById("card_RSI_contents");
	el.innerHTML = temptext;
	if (el.classList.contains("hide")) {
		el.classList.remove("hide");
		el2.classList.add("expandheight");
		elself.innerHTML = `<i class="fas fa-angle-double-up"></i> &nbsp;Hide scheme`;
	} else {
		el.classList.add("hide");
		el2.classList.remove("expandheight");
		elself.innerHTML = `<i class="fas fa-angle-double-down"></i> &nbsp;Show scheme`;
	}
	
}

function RSI_start() {
	cetevent();
	document.getElementById("card_cet0_new").style.display = "none";
	document.getElementById("card_RSI").style.display = "block";
	text = `
		In rapid sequence induction (RSI) mode, you may set an effect site concentration (CE) target to be achieved within 60-90 seconds, as defined by the user. The program will determine a suitable induction dose, depending on the injection speed on induction (more on this below), to achieve the target CE at the target time point. This will cause the effect site concentration to overshoot, meaning that the final peak CE will exceed the predetermined CE target. The program will display the appropriate pause duration, after which the infusion will be continued in order to maintain the CE at the target level.<br>
		<br><i>Note on injection speed on induction:</i> You may set the injection speed to be "Manual bolus", which assumes a rate of 7200ml/h (2ml/second) to simulate a manual fast bolus push, or a syringe pump delivered bolus at a rate of 1200-1500ml/h.
	`;
	displayWarning("RSI mode",text);
	//housekeeping bolus speed
	origbs = document.getElementById("select_bolusspeed").value * 1;
	if ((origbs == 0) || (origbs == 1200) || (origbs == 1500)) {
		document.getElementById("input_RSI_bolusspeed").value = origbs;	
	} else {
		document.getElementById("select_bolusspeed").value = 0;
		document.getElementById("input_RSI_bolusspeed").value = 0;
	}
	document.getElementById("prompts_container").classList.add("RSImode");
	applybolusspeed();
	applyoptions();
}

function toggleRSI() {
	isCollapsed = document.getElementById("card_RSI_contents").classList.contains("collapse");
	if (isCollapsed) {
		document.getElementById("card_RSI_contents").classList.remove("collapse");
		document.getElementById("expandRSIbutton").innerHTML = '<i class="fas fa-angle-double-up"></i>&nbsp; HIDE';
	} else {
		document.getElementById("card_RSI_contents").classList.add("collapse");
		document.getElementById("expandRSIbutton").innerHTML = '<i class="fas fa-angle-double-down"></i>&nbsp; SHOW';
	}
}

//dexmedetomidine functions
function dex_generate_limits() {
	masstable = new Array();
	masstable.push(0);
	masstable.push(Math.round(mass*1/drug_sets[0].infusate_concentration));
	masstable.push(Math.round(mass*2/drug_sets[0].infusate_concentration));
	masstable.push(Math.round(mass*3/drug_sets[0].infusate_concentration));
	masstable.push(Math.round(mass*4/drug_sets[0].infusate_concentration));
	masstable.push(Math.round(mass*5/drug_sets[0].infusate_concentration));
	masstable.push(Math.round(mass*6/drug_sets[0].infusate_concentration));
	return masstable;
}

function dex_populate_speed() {
	El1 = document.getElementById("page2selectmaxratedex");
	El2 = document.getElementById("select_bolusspeeddex");
	ratearray = dex_generate_limits();
	El1.options[0].innerText = ratearray[6] + "ml/h (6mcg/kg/h)";
	El1.options[1].innerText = ratearray[5] + "ml/h (5mcg/kg/h)";
	El1.options[2].innerText = ratearray[4] + "ml/h (4mcg/kg/h)";
	El1.options[3].innerText = ratearray[3] + "ml/h (3mcg/kg/h)";

	El2.options[0].innerText = ratearray[6] + "ml/h (6mcg/kg/h)";
	El2.options[1].innerText = ratearray[5] + "ml/h (5mcg/kg/h)";
	El2.options[2].innerText = ratearray[4] + "ml/h (4mcg/kg/h)";
	El2.options[3].innerText = ratearray[3] + "ml/h (3mcg/kg/h)";

}