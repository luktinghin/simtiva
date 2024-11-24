//section: sharing and copying
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

//section: object parsing

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
		createCharts(1);
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

//section: export and output

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
	//add warning banner check here
	if (document.getElementById("warningBanner").style.display != "none") hideWarningBanner();
}

function savefile_time() {
	localStorage.setItem(uid + "TIME", Math.round(time_in_s));
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
				if (drug_sets[z].historyarrays[i][1] == 1) {
					if (drug_sets[z].historyarrays[i].length == 4) {
						content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Bolus (" + drug_sets[z].infused_units + "): " + drug_sets[z].historyarrays[i][3]);
					} else {
						content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Bolus (" + drug_sets[z].infused_units + "): " + drug_sets[z].historyarrays[i][3] + " over " + drug_sets[z].historyarrays[i][5] + "s");
					}
				}
				if (drug_sets[z].historyarrays[i][1] == 3) {
					if (drug_sets[z].historyarrays[i].length == 3) {
						content[z].push(converttime(drug_sets[z].historyarrays[i-1][2]) + " - " + "Pause for (s): " + drug_sets[z].historyarrays[i][2]);
					} else {
						content[z].push(converttime(drug_sets[z].historyarrays[i][2]) + " - " + "Pause for (s): " + drug_sets[z].historyarrays[i][3]);
					}
				}
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
		if (useAdjBW == 0) {
			//mass field uses an Array to store AdjBW if AdjBW is used 
			P_patient.push(mass);	
		} else {
			P_patient.push([mass,AdjBW]);
		}
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
		if (P_patient[0]=="Eleveld") {
			if (opioid == 1) {
				P_patient.push(1); //P_patient[10] for eleveld is opioid = 0 or 1
			} else {
				P_patient.push(0);
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

//section: loading and reanimation

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
		document.getElementById('card_cet0_new').style.display = 'none';
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
		document.getElementById('card_cet0_new').style.display = 'none';
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
					document.getElementById('card_cet0_new').style.display = 'none';
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
			document.getElementById("card_cet0").style.display = "none";
			document.getElementById("card_cet0_new").style.display = "";
			if (orig_drug_set_index == 0) {
				document.getElementById("card_cet0_new").classList.remove("hide");
			} else {
				document.getElementById("card_cet0_new").classList.add("hide");
			}
			document.getElementById("btn_displayhistory").innerHTML = "Scheme";
			drug_sets[0].cet_active = 1;
			if (drug_sets[0].fentanyl_weightadjusted_flag == 1) {
				desired = drug_sets[0].fentanyl_weightadjusted_target_uncorrected;
				drug_sets[0].desired = 0;
				deliver_cet(desired,0);
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
			document.getElementById('card_cet1_new').style.display = 'none';
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
			document.getElementById("card_cet1_new").style.display = "none";
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
					document.getElementById("card_cet1_new").style.display = "none";
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
				document.getElementById("card_cet1").style.display = "none";
				document.getElementById("card_cet1_new").style.display = "";
				if (orig_drug_set_index == 1) {
					document.getElementById("card_cet1_new").classList.remove("hide");
					document.getElementById("btn_displayhistory").innerHTML = "Scheme";
				} else {
					document.getElementById("card_cet1_new").classList.add("hide");
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


//section: BIS functions

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

function BIS_solve_eBIS(paramfrom, paramto) {
	BIS_array.length = 0;
	for (biscounter = 0; biscounter < drug_sets[0].cpt_cp.length; biscounter++) {
		BIS_array.push(Math.round(BIS_estimated(getce(biscounter,0))));
	}
}

function BIS_solve_eBIS2(paramfrom, paramto) {
	//for emulate eleveld
	BIS_array.length = 0;
	for (biscounter = 0; biscounter < drug_sets[2].cpt_cp.length; biscounter++) {
		BIS_array.push(Math.round(BIS_estimated(getce(biscounter,2))));
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


function BIS_update(interval) {
	updateBIS = setInterval(function() {
		document.getElementById("ptolcard_right").innerHTML = BIS_array[Math.floor(time_in_s)]
	},interval)
}

//section: basic chart functions


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
							if (drug_sets[active_drug_set_index].historyarrays[icount].length > 4) {
								bolustext = drug_sets[active_drug_set_index].historyarrays[icount][3] + drug_sets[active_drug_set_index].infused_units + " over " + drug_sets[active_drug_set_index].historyarrays[icount][5] + "s";
							} else {
								bolustext = drug_sets[active_drug_set_index].historyarrays[icount][3] + drug_sets[active_drug_set_index].infused_units;
							}
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



//charting scripts

function createCharts(chartparam) {
	//default
	if ((chartparam == 0) || (chartparam == undefined)) {
		var ctx1 = document.getElementById('myChart').getContext('2d');

		var y = document.getElementById('chartwrapper').offsetHeight*0.6;

		myChart = new Chart(ctx1, {
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


	};
		if (chartparam == 1) {
			var ctx2 = document.getElementById('myChart2').getContext('2d');
			myChart2 = new Chart(ctx2, {
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
				}//end options
			}
			)//end myChart2 creation;


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

		}//end chart param 1 if block

// new chart code, for emulation
		if ((chartparam == 2) && (myChartEmulate == undefined)) {

		var ctx3 = document.getElementById('myChartEmulate').getContext('2d');

		myChartEmulate = new Chart(ctx3, {
	    type: 'line',
	    data: {
	    	datasets: [{
	    		label: 'Cp',
	    		data: [{x: 0, y: 0}],
	    		borderWidth:3,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: 'rgb(231, 50, 39,0.45)',
	    		backgroundColor: 'rgb(0,0,0,0)',
	    		segment: {
	    			borderColor: ctx => behindPosition(ctx, 'rgb(231,50,39,0.65)'),
	    			borderWidth: ctx => behindPosition2(ctx, 7)
	    		},
	    		fill: false,
	    		hidden: false,
	    		parsing: false
	    	},{
	    		label: 'Ce',
	    		data: [{x:0, y:0}],
	    		borderWidth:3,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: 'rgb(48, 163, 7,0.45)',
					segment: {
	    			borderColor: ctx => behindPosition(ctx, 'rgb(48,163,7,0.65)'),
	    			borderWidth: ctx => behindPosition2(ctx, 7)
	    		},
	    		//borderColor: yellowPri50,
	    		//backgroundColor: gradientGreen,//'rgb(90, 100, 90,0.1)',
	    		
	    		backgroundColor: 'rgb(0,0,0,0)',

	    		fill: false,
	    		hidden: false,
	    		parsing: false
	    	},{
	    		label: 'Cp(Emulate)',
	    		data: [{x: 0, y: 0}],
	    		borderWidth:3,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: 'rgb(186, 9, 148,0.6)',
					segment: {
	    			borderColor: ctx => behindPosition(ctx, 'rgb(186,9,148,0.85)'),
	    			borderWidth: ctx => behindPosition2(ctx, 7)
	    		},
	    		borderDash: [3,1.5],
	    		//borderColor: yellowSec,
	    		//backgroundColor: gradientRed,//'rgb(100, 90, 90,0.1)',
	    		
	    		backgroundColor: 'rgb(0,0,0,0)',
	    		
	    		
	    		fill: false,
	    		hidden: false,
	    		parsing: false
	    	},{
	    		label: 'Ce(Emulate)',
	    		data: [{x:0, y:0}],
	    		borderWidth:3,
	    		pointRadius:0,
	    		borderJoinStyle: 'round',
	    		borderColor: 'rgb(26, 159, 163,0.6)',
					segment: {
	    			borderColor: ctx => behindPosition(ctx, 'rgb(26,159,163,0.85)'),
	    			borderWidth: ctx => behindPosition2(ctx, 7)
	    		},
	    		borderDash: [3,1.5],
	    		//borderColor: yellowPri50,
	    		//backgroundColor: gradientGreen,//'rgb(90, 100, 90,0.1)',
	    		
	    		backgroundColor:'rgb(0,0,0,0)',
	    		fill: false,
	    		hidden: false,
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
							text:'Concentration (mcg/ml)'
						},
						ticks: {
							stepSize: 1
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
	        	duration: 0
	        },
	        transitions: {
	        	active: {
	        		animation: {
	        			duration: 0
	        		}
	        	}
	        },

		    plugins: { //start plugins
		    	//shadingArea,
			    legend: {
			    		
				    	labels: {
				    	boxWidth: 9,
				    	font: {
				    		size: 11
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

	                		if (BIS_array.length>0) {
	                			PD_text = "eBIS: " + BIS_array[Math.round(parsedx*60)];
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
	}

	setTimeout(function() {
		//dark mode for chart activation here
		if (!isDark) {
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

			} else {
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
		},1500);
} //end createCharts function

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

var xprior=0;
var yprior=0;
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

	//make changes to emulate too
	if (emulateOn == true) {
		emulatePlotUpdate(1);
	}

	//detect scale change
	if (eventArray.length>0){
		if ((chart.scales.x.min != xprior0) || (chart.scales.x.max != xprior1) || (chart.scales.y.max != yprior)) {
			alignEvents();
		}
	}

}


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


function proceedComplex() {
	createCharts(1);
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


//section: time manipulation functions

function timeFxReset() {
	conditions = ((time_in_s>1) && (drug_sets[0].cpt_rates_real.length > 1));
	if (conditions) {
		document.getElementById("timeFxRowSuspend").classList.remove("hide");
		document.getElementById("timeFxRowResume").classList.add("hide");
		timeFxSuspend();
		if (drug_sets[0].historyarrays[0][0] == 2) {
			document.getElementById("card_cet0_new").style.pointerEvents = "auto";
			document.getElementById("card_cet0_new").style.filter = "saturate(1)";
		} else if (drug_sets[0].historyarrays[0][0] == 1) {
			document.getElementById("card_cpt0").style.pointerEvents = "auto";
			document.getElementById("card_cpt0").style.filter = "saturate(1)";
		} else {
			document.getElementById("card_infusion0").style.pointerEvents = "auto";
			document.getElementById("card_infusion0").style.filter = "saturate(1)";
			document.getElementById("card_bolus0").style.pointerEvents = "auto";
			document.getElementById("card_bolus0").style.filter = "saturate(1)";
		}
		if (drug_sets[0].cet_active>0 && drug_sets[0].IB_active==0) {
			initsubmit();
			initcet();	
			document.getElementById("inputDesiredCe0_new").value = "";
		} else if (drug_sets[0].cet_active>0 && drug_sets[0].IB_active==1) {
			initsubmit();
			initcetbolus();
		} else if (drug_sets[0].manualmode_active>0) {
			initsubmit();
			initmanual(0);
			document.getElementById("tableInitialBolus0").style.display = "table";
			document.getElementById("tableInfusionRate0").classList.add("line");
			document.getElementById("inputInfusion0").value = "";
			document.getElementById("inputBolus_initial0").value = "";
			document.getElementById("btn_start0").innerHTML = "Start";
		} else if (drug_sets[0].cpt_active>0) {
			initsubmit();
			initcpt();
			document.getElementById("inputDesired0").value = "";
		}
		time = 0;
		time_in_s = 0;
		myChart.data.datasets[2].data.length = 0;
		myChart.data.datasets[3].data.length = 0;
		myChart.data.datasets[2].data.push({x:0,y:0});
		myChart.data.datasets[3].data.push({x:0,y:0});
		myChart.update();
		drug_sets[0].firstrun = -1;
		time_of_stop = -1;
		//interface changes
		document.getElementById("iconplay").style.display = "block";
		document.getElementById("iconplay").classList.add("stop");
		document.getElementById("iconplay").innerHTML="<i class='fas fa-pause fa-lg'></i>";
		document.getElementById("top_subtitle").innerHTML = `<b>SimTIVA</b> - <span style='opacity: 50%; white-space:nowrap;' id='top_subtitle2'>Simple TIVA simulator</span>`;
		document.getElementById("top_subtitle").classList.remove("topClose");
		document.getElementById("top_title").classList.remove("topOpen");
		document.getElementById("clock").innerHTML="_";
		document.getElementById("displayvolume").innerHTML="_";
		document.getElementById("infusiondescriptor").innerHTML="";
		document.getElementById("prompt_msg2").innerHTML="Simulation reset";
		document.getElementById("status").innerHTML="Waiting to start";
		document.getElementById("historywrapper").innerHTML="Waiting to start";
		document.getElementById("historywrapperCOPY").innerHTML="Waiting to start";
		document.getElementById("ptolcard_right").innerHTML="-";
		document.getElementById("timeFxRowSuspend").classList.remove("hide");
		document.getElementById("timeFxRowResume").classList.add("hide");
		document.getElementById("suspendBanner").style.display = "none";
	}
}

function timeFxSuspend() {
	conditions = ((time_of_stop == -1) && (time_in_s>1) && (drug_sets[0].cpt_rates_real.length > 1));
	if (conditions) {
	    time_of_stop = Date.now();
		clearInterval(loop1);
		clearInterval(loop2);
		clearInterval(loop3);
		clearInterval(loop7);
		document.getElementById("timeFxRowSuspend").classList.add("hide");
		document.getElementById("timeFxRowResume").classList.remove("hide");
		document.getElementById("suspendBanner").style.display = "flex";
		document.getElementById("iconplay").style.display = "none";
		if (drug_sets[0].historyarrays[0][0] == 2) {
			document.getElementById("card_cet0_new").style.pointerEvents = "none";
			document.getElementById("card_cet0_new").style.filter = "saturate(0)";
		} else if (drug_sets[0].historyarrays[0][0] == 1) {
			document.getElementById("card_cpt0").style.pointerEvents = "none";
			document.getElementById("card_cpt0").style.filter = "saturate(0)";
		} else {
			document.getElementById("card_infusion0").style.pointerEvents = "none";
			document.getElementById("card_infusion0").style.filter = "saturate(0)";
			document.getElementById("card_bolus0").style.pointerEvents = "none";
			document.getElementById("card_bolus0").style.filter = "saturate(0)";
		}
	}
}

function timeFxResume(parametertime) {

	conditions = ((time_in_s + parametertime > 1) && (time_in_s + parametertime < drug_sets[0].cpt_rates_real.length - 300) && (time_in_s>1) && (drug_sets[0].cpt_rates_real.length > 1));

	if (conditions) {
		//clear interval first to prevent loop error
		if (time_of_stop == -1) {
			timeFxSuspend();
		}
		//reset time of stop
		time_of_stop = -1;
		document.getElementById("timeFxRowSuspend").classList.remove("hide");
		document.getElementById("timeFxRowResume").classList.add("hide");
		document.getElementById("suspendBanner").style.display = "none";
		document.getElementById("iconplay").style.display = "block";
	    //parameter is input in ms AFTER current
	    parametertime = parametertime*1000;
	    if (parametertime > 0) {
	    	//this is jump to future, no problem
	    	offset = Date.now() - parametertime;
			loop1 = setInterval(update, 500);
			loop2 = setInterval(runinfusion2, refresh_interval);
			loop3 = setInterval(updatechart, 5000, myChart);
			loop7 = setInterval(displayWarningBanner, 60*2000);
		} else {
			//this is jump back in time, gotta remove inf schemes as necessary
			
			offset = Date.now() - parametertime;
			//read historyarrays, truncate it. also grab the scheme time for grabbing historytext later
			
			if ((drug_sets[0].historyarrays[0][0] == 2) || (drug_sets[0].historyarrays[0][0] == 1)) {
				tempIndex = drug_sets[0].historyarrays.findIndex((element) => (element[2] > (time + parametertime)/1000) && (element[1] == 0));
			} else {
				tempIndex = drug_sets[0].historyarrays.findIndex((element) => element[2] > (time + parametertime)/1000);
			}

			if (tempIndex > -1) {
				//branch off manual mode VS CPT/CET modes
				if (drug_sets[0].manualmode_active>0) {
					tempCutoff = drug_sets[0].historyarrays[tempIndex][2];
					tempRate = drug_sets[0].historyarrays[tempIndex-1][3];
					drug_sets[0].historyarrays.length = tempIndex;
					//truncate important data at cutoff
					drug_sets[0].cpt_cp.length = tempCutoff;
					drug_sets[0].cpt_ce.length = tempCutoff;
					drug_sets[0].cpt_rates_real.length = tempCutoff;
					drug_sets[0].volinf.length = tempCutoff;
					myChart.data.datasets[2].data.length = myChart.data.datasets[2].data.findIndex((element)=>element.x>tempCutoff/60) -1;
					myChart.data.datasets[3].data.length = myChart.data.datasets[3].data.findIndex((element)=>element.x>tempCutoff/60) -1;
					drug_sets[0].inf_rate_mls = tempRate;
					update();
					lookahead(0,21600,0);
					//remove one line of historyarrays
					drug_sets[0].historyarrays.length = drug_sets[0].historyarrays.length - 1;
					//need to process historytext
					drug_sets[0].historytext = "";
					for (counter = 0; counter<drug_sets[0].historyarrays.length; counter++) {
						//1 is bolus, 2 is infusion			
						if (drug_sets[0].historyarrays[counter][1]==1) {
							appendText = "<div><div class='timespan'>" + converttime(Math.floor(drug_sets[0].historyarrays[counter][2])) + "</div>Bolus: " + drug_sets[0].historyarrays[counter][3] + drug_sets[0].infused_units + "</div>";
						}
						if (drug_sets[0].historyarrays[counter][1]==2) {
							appendText = "<div><div class='timespan'>" + converttime(Math.floor(drug_sets[0].historyarrays[counter][2])) + "</div>Rate: " + Math.round(drug_sets[0].historyarrays[counter][3]*100)/100 + "ml/h</div>";
						}
						drug_sets[0].historytext = drug_sets[0].historytext.concat(appendText);
					}
					document.getElementById("historywrapper").innerHTML = drug_sets[0].historytext;
				} else {
					//this is CPT/ CET scheme

					if (drug_sets[0].historyarrays[tempIndex][0] == 1) {
						//this is CPT mode
						tempDesired = 0;
						for (innercounter = 0; innercounter < drug_sets[0].historyarrays.length; innercounter++) {
							if (drug_sets[0].historyarrays[innercounter][2] < (time + parametertime)/1000) {
								if (drug_sets[0].historyarrays[innercounter][1] == 0) {
									tempDesired = drug_sets[0].historyarrays[innercounter][3];
									if (drug_sets[0].fentanyl_weightadjusted_flag == 1) {
										tempDesired = tempDesired * 1/drug_sets[0].fentanyl_weightadjusted_factor;	
									} 
								}
							}
						}

					} else if (drug_sets[0].historyarrays[tempIndex][0] == 2) {
						//this is CET mode
						tempDesired = 0;
						for (innercounter = 0; innercounter < drug_sets[0].historyarrays.length; innercounter++) {
							if (drug_sets[0].historyarrays[innercounter][2] < (time + parametertime)/1000) {
								if (drug_sets[0].historyarrays[innercounter][1] == 0) {
									tempDesired = drug_sets[0].historyarrays[innercounter][3];
									if (drug_sets[0].fentanyl_weightadjusted_flag == 1) {
										tempDesired = tempDesired * 1/drug_sets[0].fentanyl_weightadjusted_factor;	
									} 
								}
							}
						}
						drug_sets[0].cet_priordesired = tempDesired;

					} // end CET mode

					tempCutoff = drug_sets[0].historyarrays[tempIndex][2];

					if (tempCutoff > -1) {
						drug_sets[0].historyarrays.length = tempIndex;	
						
						drug_sets[0].historyarray.length = 0;
						tempArray = JSON.stringify(drug_sets[0].historyarrays[drug_sets[0].historyarrays.length-1][3]);
						drug_sets[0].historyarray = JSON.parse(tempArray);
						//read historytexts, truncate it
						tempIndex = drug_sets[0].historytexts.findIndex((element) => element[0] == tempCutoff);
						drug_sets[0].historytext = drug_sets[0].historytexts[tempIndex][1];
						drug_sets[0].historytexts.length = tempIndex;
						//truncate important data at cutoff
						drug_sets[0].cpt_cp.length = tempCutoff;
						drug_sets[0].cpt_ce.length = tempCutoff;
						drug_sets[0].cpt_rates_real.length = tempCutoff;
						drug_sets[0].volinf.length = tempCutoff;
						myChart.data.datasets[2].data.length = myChart.data.datasets[2].data.findIndex((element)=>element.x>tempCutoff/60) -1;
						myChart.data.datasets[3].data.length = myChart.data.datasets[3].data.findIndex((element)=>element.x>tempCutoff/60) -1;
						//at this point, the historyarrays have been truncated, then for CET mode, update the lockdown time
						if (drug_sets[0].historyarrays[tempIndex][0] == 2) {
							for (innercounter3 = 0; innercounter3<drug_sets[0].historyarrays.length; innercounter3++) {
								//get all CET pause things
								if (drug_sets[0].historyarrays[innercounter3][1] == 3) {
									if (drug_sets[0].historyarrays[innercounter3].length == 3) {
										//this is indeed a lockdown value
										tempWorkingClock = drug_sets[0].historyarrays[innercounter3-1][2];
										tempLockdown = drug_sets[0].historyarrays[innercounter3][2] + tempWorkingClock -1;
										drug_sets[0].cet_lockdowntime = tempLockdown;
									}
								}
							}
						}
						//get correct desired value
						drug_sets[0].desired = tempDesired;

						//attempt to fill the tempcutoff using the scheme
						lookaheadfill(0,tempCutoff,drug_sets[0].historyarray[0][0]+21600);
						if (drug_sets[0].fentanyl_weightadjusted_flag == 0) {
							document.getElementById("inputDesired0").value = tempDesired;
							document.getElementById("inputDesiredCe0_new").value = tempDesired;
						} else {
							tempDesired = Math.round(tempDesired * drug_sets[0].fentanyl_weightadjusted_factor *10)/10;	
							document.getElementById("inputDesired0").value = tempDesired;
							document.getElementById("inputDesiredCe0_new").value = tempDesired;
						}
						//interface update
						document.getElementById("historywrapper").innerHTML = drug_sets[0].historytext;
					}
				} // end CET CPT parts
			} //end tempIndex>-1 part
			
			loop1 = setInterval(update, 500);
			loop2 = setInterval(runinfusion2, refresh_interval);
			loop3 = setInterval(updatechart, 5000, myChart);
			loop7 = setInterval(displayWarningBanner, 60*2000);


		}

		if (drug_sets[0].historyarrays[0][0] == 2) {
			document.getElementById("card_cet0_new").style.pointerEvents = "auto";
			document.getElementById("card_cet0_new").style.filter = "saturate(1)";
		} else if (drug_sets[0].historyarrays[0][0] == 1) {
			document.getElementById("card_cpt0").style.pointerEvents = "auto";
			document.getElementById("card_cpt0").style.filter = "saturate(1)";
		} else {
			document.getElementById("card_infusion0").style.pointerEvents = "auto";
			document.getElementById("card_infusion0").style.filter = "saturate(1)";
			document.getElementById("card_bolus0").style.pointerEvents = "auto";
			document.getElementById("card_bolus0").style.filter = "saturate(1)";
		}
	    update();
	    updatechart(myChart);
	}
}


//section: complex mode functions

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
	if (myChartEmulate == undefined) {
		createCharts(2);
	}
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