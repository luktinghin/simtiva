//section: popupchart functions

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
				document.getElementById('btn_confirm_numpad').setAttribute('onclick','confirmNumpad("inputDesiredCe0_new")');
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
				document.getElementById('btn_confirm_numpad').setAttribute('onclick','confirmNumpad("inputDesiredCe1_new")');
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


function popupUpdateFunction(dur) {
	clearInterval(popupUpdateInterval);
	popupUpdateInterval = setInterval(function() {
		if (dur%2 == 0) updatechart(popupchart);
		mirrorpopup();
	}, dur);
}

//numpad code goes here




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
		if (parameter == "inputDesiredCe0_new") {
			pauseCpt(0);
		} else if (parameter == "inputDesiredCe1_new") {
			pauseCpt(1);
		} else if (parameter == "inputDesired0") {
			pauseCpt(0);
		} else if (parameter == "inputDesired1") {
			pauseCpt(1);
		}
	} else {
		if (parameter == "inputDesiredCe0_new") {
			start_cet();
		} else if (parameter == "inputDesiredCe1_new") {
			start_cet_complex(numpadValue,1);
		} else if (parameter == "inputDesired0") {
			start_cpt();
		} else if (parameter == "inputDesired1") {
			start_cpt_complex(numpadValue,1);
		}
	}
	if (parameter == "inputDesiredCe0_new" || parameter == "inputDesiredCe1_new") {
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

//section: event and time functions

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
		`;
		let El5 = document.createElement("div");
		El5.style.display = "inline-block";
		El5.textContent = inputtext;
		El4.appendChild(El5);
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
		`;
		let El5 = document.createElement("div");
		El5.style.display = "inline-block";
		El5.textContent = inputtext;
		ElLabel.appendChild(El5);
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

function setnow2(input__time) {
	var hours = Math.floor(input__time/(60*60));
	var minutes = Math.floor(input__time%(60*60)/60);
	var seconds = Math.floor(input__time%60);

	if (document.getElementById("timeFxTimeMode").value == "0") {
		document.getElementById("hh2").value = 0;
		document.getElementById("mm2").value = 0;
		document.getElementById("ss2").value = 0;
	} else if (document.getElementById("timeFxTimeMode").value == "1") {
		document.getElementById("hh2").value = 0;
		document.getElementById("mm2").value = 0;
		document.getElementById("ss2").value = 0;
	} else {
		document.getElementById("hh2").value = hours;
		document.getElementById("mm2").value = minutes;
		document.getElementById("ss2").value = seconds;	
	}
}
function deltahours2(param) {
	var param1 = document.getElementById("hh2").value * 1;
	var param2 = (param1 + param + 1000) % 10;
	document.getElementById("hh2").value = param2;
}
function deltaminutes2(param) {
	var param1 = document.getElementById("mm2").value * 1;
	var param2 = (param1 + param + 6000) % 60;
	document.getElementById("mm2").value = param2;
}
function deltaseconds2(param) {
	var param1 = document.getElementById("ss2").value * 1;
	var param2 = (param1 + param + 6000) % 60;
	document.getElementById("ss2").value = param2;
}
function timeFxSubmitJump() {
	var paramH = document.getElementById("hh2").value * 1;
	var paramM = document.getElementById("mm2").value * 1;
	var paramS = document.getElementById("ss2").value * 1;
	max_duration = drug_sets[0].cpt_rates_real.length-300;
	if (document.getElementById("timeFxTimeMode").value == "0") {
		store_time = paramH * 60 * 60 + paramM * 60 + paramS;
		jump_time = store_time;
	} else if (document.getElementById("timeFxTimeMode").value == "1") {
		store_time = paramH * 60 * 60 + paramM * 60 + paramS;
		jump_time = (-1) * store_time;
	} else {
		store_time = paramH * 60 * 60 + paramM * 60 + paramS;
		jump_time = store_time - Math.floor(time_in_s);
	}
	if (Math.floor(time_in_s) + jump_time >= max_duration) {
		max_duration_string = converttime(max_duration);
		document.getElementById("timeFxMessage").innerHTML = `Entered time point is invalid. Time cannot be set beyond maximum allowable limit of infusion, currently at ${max_duration_string}. Please try again.`;
	} else if (Math.floor(time_in_s) + jump_time <= 1) {
		document.getElementById("timeFxMessage").innerHTML = `Entered time point is invalid. Time cannot be set earlier than time zero. Please try again.`;
	} else {
		timeFxResume(jump_time);
		hidemodal('modalJump');
	}
}
function timeFxOpenJump() {
	document.getElementById("timeFxMessage").innerHTML = "";
	setnow2(Math.floor(time_in_s));
	hideallmodal();
	setmodal('modalJump');
}

//section: advanced charting functions and options

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

//section: complex mode

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
		} else if (document.getElementById("myChartEmulate").style.display == "block") {
			if (drug_sets[2] != undefined) {
				emulateReset();
				setTimeout(emulateEleveldReal,2500);
				setTimeout(emulatePlot,3000);
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

	if (document.getElementById("preview").style.display != "none") {
		displaypreview_hide_onsubmit();
	}

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
			document.getElementById("card_cet0_new").classList.remove("hide");
			document.getElementById("card_bolus0").classList.remove("hide");
			document.getElementById("card_infusion0").classList.remove("hide");
			document.getElementById("card_cpt1").classList.add("hide");
			document.getElementById("card_cet1").classList.add("hide");
			document.getElementById("card_cet1_new").classList.add("hide");
			document.getElementById("card_bolus1").classList.add("hide");
			document.getElementById("card_infusion1").classList.add("hide");
			document.getElementById("card_wakeup").classList.remove("hide");
		}
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
			document.getElementById("card_cet0_new").classList.add("hide");
			document.getElementById("card_bolus0").classList.add("hide");
			document.getElementById("card_infusion0").classList.add("hide");
			document.getElementById("card_cpt1").classList.remove("hide");
			document.getElementById("card_cet1").classList.remove("hide");
			document.getElementById("card_cet1_new").classList.remove("hide");
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
	updateBolusSpeedOptions();
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

//section: emulation code

function emulateDisplayToggle() {
	if (!document.getElementById("emulatechartcontainer").classList.contains("open")) {
		document.getElementById("emulatechartcontainer").classList.add("open");
		document.getElementById("emulatecontrols").classList.add("hide");
		document.getElementById("emulatechartbuttons").classList.remove("hide");
		if (isDark == true) {
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
	} else {
		document.getElementById("emulatechartcontainer").classList.remove("open");
		document.getElementById("emulatecontrols").classList.remove("hide");
		document.getElementById("emulatechartbuttons").classList.add("hide");
	}
}

function emulateEleveldInit() {
	drug_sets[2] = {};
	opioid = 1;
	if (drug_sets[0].model_name == "Marsh") {
		myChartEmulate.data.datasets[0].label = "Cp(Marsh)";
		myChartEmulate.data.datasets[1].label = "Ce(Marsh)";
		myChartEmulate.data.datasets[2].label = "Cp(Eleveld)";
		myChartEmulate.data.datasets[3].label = "Ce(Eleveld)";
	}
	if (drug_sets[0].model_name == "Schnider") {
		myChartEmulate.data.datasets[0].label = "Cp(Schnider)";
		myChartEmulate.data.datasets[1].label = "Ce(Schnider)";
		myChartEmulate.data.datasets[2].label = "Cp(Eleveld)";
		myChartEmulate.data.datasets[3].label = "Ce(Eleveld)";
	}
			readmodel("Eleveld",2);
			calculate_udfs(2);
			drug_sets[2].desired = 0;
			drug_sets[2].cpt_rates = new Array();
			drug_sets[2].cpt_times = new Array();
			drug_sets[2].cpt_cp = new Array();
			drug_sets[2].cpt_ce = new Array();
			drug_sets[2].cpt_rates_real = new Array();
			drug_sets[2].volinf = new Array();
			drug_sets[2].historyarray = new Array();
			drug_sets[2].historyarrays = new Array();
			drug_sets[2].historytexts = new Array();
			drug_sets[2].cpt_bolus = 0;
			drug_sets[2].cet_bolus = 0;
			drug_sets[2].cpt_pause = 0;
			drug_sets[2].cet_pause = 0;
			drug_sets[2].cet_lockdowntime = 0;

}

function emulateEleveldReal() {
	bolusArray = new Array();
	for (i = 0; i<drug_sets[0].historyarrays.length; i++) {
		if (drug_sets[0].historyarrays[i][1] == 1) {
			bolusArray.push([drug_sets[0].historyarrays[i][2],drug_sets[0].historyarrays[i][3]]);
		}
	}
	bolusCursor = 0;
	p_state[1] = 0;
	p_state[2] = 0;
	p_state[3] = 0;
	e_state[1] = 0;
	e_state[2] = 0;
	e_state[3] = 0;
	e_state[4] = 0;
			l1 = Math.exp(-drug_sets[2].lambda[1]);
			l2 = Math.exp(-drug_sets[2].lambda[2]);
			l3 = Math.exp(-drug_sets[2].lambda[3]);
			l4 = Math.exp(-drug_sets[2].lambda[4]);

	for (i = 0; i<drug_sets[0].cpt_rates_real.length; i++) {
		if (bolusArray[bolusCursor] != undefined) {
			if (i == bolusArray[bolusCursor][0]) {
				emulateBolus(bolusArray[bolusCursor][1]);
				bolusCursor = bolusCursor + 1;
			} else {
				emulateBolus(drug_sets[0].cpt_rates_real[i]);
			}
		} else {
			emulateBolus(drug_sets[0].cpt_rates_real[i]);
		}
	}

	BIS_solve_eBIS2();

	function emulateBolus(inputbolus) {
			p_state[1] = p_state[1] * l1 + drug_sets[2].p_coef[1] * inputbolus * (1 - l1);
			p_state[2] = p_state[2] * l2 + drug_sets[2].p_coef[2] * inputbolus * (1 - l2);
			p_state[3] = p_state[3] * l3 + drug_sets[2].p_coef[3] * inputbolus * (1 - l3);

			e_state[1] = e_state[1] * l1 + drug_sets[2].e_coef[1] * inputbolus * (1 - l1);
			e_state[2] = e_state[2] * l2 + drug_sets[2].e_coef[2] * inputbolus * (1 - l2);
			e_state[3] = e_state[3] * l3 + drug_sets[2].e_coef[3] * inputbolus * (1 - l3);
			e_state[4] = e_state[4] * l4 + drug_sets[2].e_coef[4] * inputbolus * (1 - l4);

			drug_sets[2].cpt_cp.push([p_state[1],p_state[2],p_state[3]]);
			drug_sets[2].cpt_ce.push([e_state[1],e_state[2],e_state[3],e_state[4]]);
	}

}

function emulateReset() {
	drug_sets[2].cpt_cp.length = 0;
	drug_sets[2].cpt_ce.length = 0;
	myChartEmulate.data.datasets[2].data.length = 0;
	myChartEmulate.data.datasets[3].data.length = 0;
	BIS_array.length = 0;
}

function emulatePlot(duration) {
	myChartEmulate.data.datasets[0].data = [...myChart.data.datasets[2].data];
	myChartEmulate.data.datasets[1].data = [...myChart.data.datasets[3].data];
	for (i=0; i<myChartEmulate.data.datasets[0].data.length; i++) {
		myChartEmulate.data.datasets[2].data.push({
	    x: myChartEmulate.data.datasets[0].data[i].x,
	    y: getcp(myChartEmulate.data.datasets[0].data[i].x * 60,2)
	             });
		myChartEmulate.data.datasets[3].data.push({
	    x: myChartEmulate.data.datasets[1].data[i].x,
	    y: getce(myChartEmulate.data.datasets[1].data[i].x * 60,2)
	             });
	}
	myChartEmulate.update();
}

function emulatePlotUpdate(auto,scaleX0,scaleX1,scaleY0,scaleY1) {
	if (auto == 1) {
		myChartEmulate.options.scales.x.min = myChart.options.scales.x.min;
		myChartEmulate.options.scales.x.max = myChart.options.scales.x.max;
		myChartEmulate.options.scales.y.min = myChart.options.scales.y.min;
		myChartEmulate.options.scales.y.max = myChart.options.scales.y.max;
	} else {
		myChartEmulate.options.scales.x.min = scaleX0;
		myChartEmulate.options.scales.x.max = scaleX1;
		myChartEmulate.options.scales.y.min = scaleY0;
		myChartEmulate.options.scales.y.max = scaleY1;
	}
	myChartEmulate.update();
	if (BIS_array[Math.floor(time_in_s)] != undefined) {
		document.getElementById("emulatetitleright").innerHTML = BIS_array[Math.floor(time_in_s)];
	}
}

function emulateEstimateRatio() {

	//assume this is CPT mode first
	if (drug_sets[0].cpt_active>0) preview_cpt(3,0);
	if (drug_sets[0].cet_active>0) preview_cet(3,0);

		
	p_state[1] = 0;
	p_state[2] = 0;
	p_state[3] = 0;
	e_state[1] = 0;
	e_state[2] = 0;
	e_state[3] = 0;
	e_state[4] = 0;
	l1 = Math.exp(-drug_sets[2].lambda[1]);
	l2 = Math.exp(-drug_sets[2].lambda[2]);
	l3 = Math.exp(-drug_sets[2].lambda[3]);
	l4 = Math.exp(-drug_sets[2].lambda[4]);

	//set cursor for inf rate;
	cursor = 0;
	//determine bolus;
	test_bolus = drug_sets[0].preview_bolus;
	emulateBolus2(test_bolus);
			
			
			
	for (i=1; i<=2700; i++) {
		//determine rate
		test_rate = drug_sets[0].previewhistoryarray[cursor][1];
		emulateBolus2(test_rate);
		if (cursor+1 == drug_sets[0].previewhistoryarray.length) {

		} else {
			if (i>=drug_sets[0].previewhistoryarray[cursor+1][0]) cursor = cursor + 1;	
		}	
	}

	test_ce = e_state[1] + e_state[2] + e_state[3] + e_state[4];
	console.log("eleveld CE est at 45m is " + test_ce);
	ratio = test_ce/3;
	console.log("ratio is " + ratio);

	//reset stuffs to initial
	drug_sets[0].cpt_bolus = 0;
	drug_sets[0].cet_bolus = 0;
	p_state[1] = 0;
	p_state[2] = 0;
	p_state[3] = 0;
	e_state[1] = 0;
	e_state[2] = 0;
	e_state[3] = 0;
	e_state[4] = 0;
	return ratio;


	function emulateBolus2(inputbolus) {
		
			//p_state[1] = p_state[1] * l1 + drug_sets[2].p_coef[1] * inputbolus * (1 - l1);
			//p_state[2] = p_state[2] * l2 + drug_sets[2].p_coef[2] * inputbolus * (1 - l2);
			//p_state[3] = p_state[3] * l3 + drug_sets[2].p_coef[3] * inputbolus * (1 - l3);
			e_state[1] = e_state[1] * l1 + drug_sets[2].e_coef[1] * inputbolus * (1 - l1);
			e_state[2] = e_state[2] * l2 + drug_sets[2].e_coef[2] * inputbolus * (1 - l2);
			e_state[3] = e_state[3] * l3 + drug_sets[2].e_coef[3] * inputbolus * (1 - l3);
			e_state[4] = e_state[4] * l4 + drug_sets[2].e_coef[4] * inputbolus * (1 - l4);
			
	}
}

function emulatePopulateRatio() {
	if (drug_sets[2] == undefined) emulateEleveldInit();
	ratio = emulateEstimateRatio();
	modelname = drug_sets[0].model_name;
	document.getElementById("emulateRatioModel1").innerHTML = modelname;
	document.getElementById("emulateRatioModel2").innerHTML = modelname;
	document.getElementById("emulateRatioModel3").innerHTML = modelname;
	document.getElementById("emulateRatio").innerHTML = Math.round(1/ratio*100)/100;
	document.getElementById("emulateRatioX1").innerHTML = Math.round(1/ratio*10)/10;
	document.getElementById("emulateRatioX2").innerHTML = Math.round(2/ratio*10)/10;
	document.getElementById("emulateRatioX3").innerHTML = Math.round(3/ratio*10)/10;
	document.getElementById("emulateRatioX4").innerHTML = Math.round(4/ratio*10)/10;
	document.getElementById("emulateRatioX5").innerHTML = Math.round(5/ratio*10)/10;
	document.getElementById("emulateRatioX1start").innerHTML = Math.round(2/ratio*10)/10;
	document.getElementById("emulateRatioX2start").innerHTML = Math.round(4/ratio*10)/10;
	document.getElementById("emulateRatioX3start").innerHTML = Math.round(6/ratio*10)/10;
	document.getElementById("emulateRatioX4start").innerHTML = Math.round(8/ratio*10)/10;
	document.getElementById("emulateRatioX5start").innerHTML = Math.round(10/ratio*10)/10;
	document.getElementById("emulateCE50").innerHTML = Math.round(BIS_Ce50()*10)/10;

}