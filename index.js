//section: ringbell


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

//section: show-hide various components

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



//section: various display modals and options and menu

function displayDisclaimer() {
	text = "<span style='font-size:85%'>SimTIVA is a simulation program for educational purposes only. The information presented is not medical advice. All reasonable precautions have been taken to verify the calculations in this app. However, the accuracy cannot be guaranteed and the information is provided without warranty of any kind, either express or implied. The responsibility for the use and interpretation of the information provided lies with the user. In no event shall the author be liable for damages arising from using this app. Do not proceed if you do not agree to this disclaimer.</span>"
	displayWarning("Disclaimer", text);
}

function displayAbout() {
	//obsolete
	text = "<h1>SimTIVA is a computer simulation program to simulate delivery of total intravenous anaesthesia (TIVA) using a target-controlled infusion (TCI) pump. This progressive web app (PWA) is designed for use on smartphones, tablets and computers.</h1><br><b>Written by Terence Luk</b>. This work is licensed under GNU General Public License v3.0. Read more about the project <a href='https://simtiva.blogspot.com/2021/10/welcome.html' target='_blank'>here</a>. Please contact <a href='https://github.com/luktinghin/simtiva' target='_blank'>me</a> for any feedback. Your suggestions and ideas are greatly appreciated!<br><br>This is an open source project and the source code is published on <a href='https://github.com/luktinghin/simtiva/' target='_blank'>GitHub</a>.<br>Last updated 4/9/2025 (V5.5) Build 171.<br><br>The purposes are: (1) <i> To simulate TCI/TIVA for educational purposes</i>, and (2) <i>Potentially, to help deliver TCI/TIVA in a low resource setting with no TCI pumps available.</i><br>Coding is done in Javascript. The code to the mathematical calculations are based on 'STANPUMP', which is freely available from the link below. The pharmacokinetic models available in this program are Marsh, Schnider, Paedfusor and Eleveld for propofol, and Minto and Eleveld for remifentanil. For instructions on using this app, visit the 'Help' page. For documentation of the pharmacological details, visit the 'Documentation' page.<br><br>Contact us via our <a href='https://simtiva.blogspot.com/p/feedback.html' target='_blank'>blog</a> page; or get in touch on <a href='https://twitter.com/simtiva_app' target='_blank'>Twitter/X</a>.<div class='' style='width:100%; margin-top:2rem; margin-bottom:1rem; background:rgba(128,128,128,0.4); border-bottom:1px solid #198964; font-weight:bold'>Licenses & Legal</div><div class=''>Acknowledgments: this project is made possible with the following-<br><br><b>STANPUMP by Steven L. Shafer</b><br>Freely available at <a href='http://opentci.org/code/stanpump' target='_blank'>OpenTCI-STANPUMP</a><br><br><b>Chart.js</b><br><a href='http://chartjs.org'  target='_blank'>Chart.js</a> is open source and available under the MIT license.<br><br><b>Font Awesome Free</b><br>SIL OFL 1.1 license applies to all icons packaged as font files. <a href='https://github.com/FortAwesome/Font-Awesome' target='_blank'>Source/License</a><br><br><b>WHO Child Growth Standards</b><br>Copyright World Health Organization (WHO), 2021; all rights reserved. Growth chart data (weight & length for age and BMI) from <a href='https://www.who.int/tools/child-growth-standards/standards' target='_blank'>WHO website</a> used for data validation. Computational method using LMS method described <a href='https://www.who.int/growthref/computation.pdf' target='_blank'>here</a>.<br><br><b>LZ-String</b><br>Copyright Pieroxy (2013) under MIT license, from <a href='https://pieroxy.net/blog/pages/lz-string/index.html' target='_blank'>pieroxy.net</a>, used for Javascript string compression.<br><br><span style='color:#ccc'>Source Sans font: Copyright 2010, 2012 Adobe Systems Incorporated (http://www.adobe.com/), with Reserved Font Name 'Source'. All Rights Reserved. Source is a trademark of Adobe Systems Incorporated in the United States and/or other countries, licensed under the SIL Open Font License, Version 1.1 (http://scripts.sil.org/OFL).</span></div><div style='padding-top:1rem;'></div>";
	displayWarning("About", text);
}

function displayAbout2(aboutparam) {
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
		<br><b>Written by Terence Luk</b>. This work is licensed under GNU General Public License v3.0. Read more about the project <a href='https://simtiva.blogspot.com/2021/10/welcome.html' target='_blank'>here</a>.
		<br><br>Contributed by:
		<br> - George Zhong (@propofoldream)
		<br> - Eric Ng 
		<br> - David Lam
		<br><br>This is an open source project and the source code is published on <a href='https://github.com/luktinghin/simtiva/' target='_blank'>GitHub</a>.
		<br>Last updated 4/9/2025 (V5.5) Build 171.
		<br><br>The purposes are: (1) <i> To simulate TCI/TIVA for educational purposes</i>, and (2) <i>Potentially, to help deliver TCI/TIVA in a low resource setting with no TCI pumps available.</i>
		<br>Coding is done in Javascript. The code to the mathematical calculations are based on 'STANPUMP', which is freely available from the link below. The pharmacokinetic models available in this program are Marsh, Schnider, Paedfusor and Eleveld for propofol, Minto and Eleveld for remifentanil, Shafer for fentanyl, Maitre for alfentanil, Hannivoort for dexmedetomidine and Kamp for ketamine. For instructions on using this app, visit the 'Help' page. For documentation of the pharmacological details, visit the 'Documentation' page.
		<br><br>Contact us via our <a href='https://simtiva.blogspot.com/p/feedback.html' target='_blank'>blog</a> page; or get in touch on the Social Links listed <a href='https://github.com/luktinghin/simtiva' target='_blank'>here</a>.<div class='' style='width:100%; margin-top:2rem; margin-bottom:1rem; background:rgba(128,128,128,0.4); border-bottom:1px solid #198964; font-weight:bold'>Licenses & Legal</div><div class=''>Acknowledgments: this project is made possible with the following-<br><br><b>STANPUMP by Steven L. Shafer</b><br>Freely available at <a href='http://opentci.org/code/stanpump' target='_blank'>OpenTCI-STANPUMP</a><br><br><b>Chart.js</b><br><a href='http://chartjs.org'  target='_blank'>Chart.js</a> is open source and available under the MIT license.<br><br><b>Font Awesome Free</b><br>SIL OFL 1.1 license applies to all icons packaged as font files. <a href='https://github.com/FortAwesome/Font-Awesome' target='_blank'>Source/License</a><br><br><b>WHO Child Growth Standards</b><br>Copyright World Health Organization (WHO), 2021; all rights reserved. Growth chart data (weight & length for age and BMI) from <a href='https://www.who.int/tools/child-growth-standards/standards' target='_blank'>WHO website</a> used for data validation. Computational method using LMS method described <a href='https://www.who.int/growthref/computation.pdf' target='_blank'>here</a>.<br><br><b>LZ-String</b><br>Copyright Pieroxy (2013) under MIT license, from <a href='https://pieroxy.net/blog/pages/lz-string/index.html' target='_blank'>pieroxy.net</a>, used for Javascript string compression.<br><br><span style='color:#ccc'>Source Sans font: Copyright 2010, 2012 Adobe Systems Incorporated (http://www.adobe.com/), with Reserved Font Name 'Source'. All Rights Reserved. Source is a trademark of Adobe Systems Incorporated in the United States and/or other countries, licensed under the SIL Open Font License, Version 1.1 (http://scripts.sil.org/OFL).</span></div><div style='padding-top:1rem;'></div>`;
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
						<div class='bannertextinner1'><b>2420</b> Monthly Users</div>
						<div class='bannertextinner2'>Total 2717 simulations performed in June 2025</div>
					</div>
		</div>
	`
	if ((aboutparam == undefined) || (aboutparam == 1)) {
		El0.appendChild(El1);
		El0.appendChild(ElAbout);
		El0.appendChild(ElQuickGuide);
		El0.appendChild(ElBanner);
		displayWarning("Help", El0.innerHTML);
	} else if (aboutparam == 0) {
		displayWarning("About", ElAbout.innerHTML);
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


function displayModalOptions() {
	if (initiated == false) dynamicLoad();
	loadoptions();
	temp_unit = document.getElementById("select_defaultrateunit").options[1].textContent;
	temp_unit_bolus = document.getElementById("select_defaultbolusunit").options[0].textContent;
	text = `
		<table class="table-control">
					<tr class="fr" id=""><td>Unit <i class="fas fa-question ring tooltip2"><span class="tooltiptext">Preferred secondary unit for propofol infusion.</span></i></td>
						<td>
							<select id="" onchange="document.getElementById('select_unit').value=this.value;unitlinkage(1);">
								<option value="mgh" ${(optionsarray[0][0]==1) ? 'selected':''}>mg/kg/h</option>
								<option value="mcgmin" ${(optionsarray[0][1]==1) ? 'selected':''}>mcg/kg/m</option>
							</select>
						</td>
					<tr class="" id=""><td>Default rate unit  <i class="fas fa-question ring tooltip background"><span class="tooltiptext" style="width:160px">Unit for entering manual mode infusion rate, e.g. "ml/h" vs "mg/kg/h" (or appropriate units)</span></i></td>
						<td>
							<select id="select_defaultrateunit1" onchange="document.getElementById('select_defaultrateunit').value=this.value">
								<option value="mlh" ${(optionsarray_infusionunit[0][0]==1) ? 'selected':''}>ml/h</option>
								<option value="unitkgtime" ${(optionsarray_infusionunit[0][0]!=1) ? 'selected':''}>${temp_unit}</option>
							</select>
						</td>
					</tr>
					<tr class="" id=""><td>Default bolus unit  <i class="fas fa-question ring tooltip background"><span class="tooltiptext" style="width:160px">Unit for entering manual mode bolus, e.g. "mg" vs "mg/kg" vs "ml" (or appropriate units)</span></i></td>
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

					<tr id=""><td>Threshold <i class="fas fa-question ring tooltip2"><span class="tooltiptext">Accurate mode: more frequent rate changes for CPT/CET schemes.</span></i></td>
						<td>
							<select id="" onchange="document.getElementById('select_threshold').value=this.value">
								<option value="0" ${(optionsarray[2][0]==1) ? 'selected':''}>Auto</option>
								<option value="1" ${(optionsarray[2][1]==1) ? 'selected':''}>Lazy</option>
								<option value="2" ${(optionsarray[2][2]==1) ? 'selected':''}>Accurate</option> <!--0.13, 0.565-->
							</select>
						</td>
					</tr>
					<tr><td>Wakelock <i class="fas fa-question ring tooltip2"><span class="tooltiptext">Keeps screen on. Android/some desktop devices only.</span></i></td>
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
    jumpEnd();
  } else {
    document.getElementById("menu").classList.remove("open");
    jumpRestore();
  }

}

//section: components for swapping

const socialHTML = `
        	<a href="https://simtiva.blogspot.com" target="_blank" class="item"><svg class="socialicon" viewBox="0 0 448 512"><path d="M162.4 196c4.8-4.9 6.2-5.1 36.4-5.1 27.2 0 28.1 .1 32.1 2.1 5.8 2.9 8.3 7 8.3 13.6 0 5.9-2.4 10-7.6 13.4-2.8 1.8-4.5 1.9-31.1 2.1-16.4 .1-29.5-.2-31.5-.8-10.3-2.9-14.1-17.7-6.6-25.3zm61.4 94.5c-53.9 0-55.8 .2-60.2 4.1-3.5 3.1-5.7 9.4-5.1 13.9 .7 4.7 4.8 10.1 9.2 12 2.2 1 14.1 1.7 56.3 1.2l47.9-.6 9.2-1.5c9-5.1 10.5-17.4 3.1-24.4-5.3-4.7-5-4.7-60.4-4.7zm223.4 130.1c-3.5 28.4-23 50.4-51.1 57.5-7.2 1.8-9.7 1.9-172.9 1.8-157.8 0-165.9-.1-172-1.8-8.4-2.2-15.6-5.5-22.3-10-5.6-3.8-13.9-11.8-17-16.4-3.8-5.6-8.2-15.3-10-22C.1 423 0 420.3 0 256.3 0 93.2 0 89.7 1.8 82.6 8.1 57.9 27.7 39 53 33.4c7.3-1.6 332.1-1.9 340-.3 21.2 4.3 37.9 17.1 47.6 36.4 7.7 15.3 7-1.5 7.3 180.6 .2 115.8 0 164.5-.7 170.5zm-85.4-185.2c-1.1-5-4.2-9.6-7.7-11.5-1.1-.6-8-1.3-15.5-1.7-12.4-.6-13.8-.8-17.8-3.1-6.2-3.6-7.9-7.6-8-18.3 0-20.4-8.5-39.4-25.3-56.5-12-12.2-25.3-20.5-40.6-25.1-3.6-1.1-11.8-1.5-39.2-1.8-42.9-.5-52.5 .4-67.1 6.2-27 10.7-46.3 33.4-53.4 62.4-1.3 5.4-1.6 14.2-1.9 64.3-.4 62.8 0 72.1 4 84.5 9.7 30.7 37.1 53.4 64.6 58.4 9.2 1.7 122.2 2.1 133.7 .5 20.1-2.7 35.9-10.8 50.7-25.9 10.7-10.9 17.4-22.8 21.8-38.5 3.2-10.9 2.9-88.4 1.7-93.9z"/></svg></a>
        	<a href="https://twitter.com/simtiva_app/" target="_blank" class="item"><svg class="socialicon" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM351.3 199.3v0c0 86.7-66 186.6-186.6 186.6c-37.2 0-71.7-10.8-100.7-29.4c5.3 .6 10.4 .8 15.8 .8c30.7 0 58.9-10.4 81.4-28c-28.8-.6-53-19.5-61.3-45.5c10.1 1.5 19.2 1.5 29.6-1.2c-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3c-9-6-16.4-14.1-21.5-23.6s-7.8-20.2-7.7-31c0-12.2 3.2-23.4 8.9-33.1c32.3 39.8 80.8 65.8 135.2 68.6c-9.3-44.5 24-80.6 64-80.6c18.9 0 35.9 7.9 47.9 20.7c14.8-2.8 29-8.3 41.6-15.8c-4.9 15.2-15.2 28-28.8 36.1c13.2-1.4 26-5.1 37.8-10.2c-8.9 13.1-20.1 24.7-32.9 34c.2 2.8 .2 5.7 .2 8.5z"/></svg></a>
        	<a href="https://bsky.app/profile/simtiva.app" target="_blank" class="item"><svg class="socialicon" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM224 247.4c14.5-30 54-85.8 90.7-113.3c26.5-19.9 69.3-35.2 69.3 13.7c0 9.8-5.6 82.1-8.9 93.8c-11.4 40.8-53 51.2-90 44.9c64.7 11 81.2 47.5 45.6 84c-67.5 69.3-97-17.4-104.6-39.6c0 0 0 0 0 0l-.3-.9c-.9-2.6-1.4-4.1-1.8-4.1s-.9 1.5-1.8 4.1c-.1 .3-.2 .6-.3 .9c0 0 0 0 0 0c-7.6 22.2-37.1 108.8-104.6 39.6c-35.5-36.5-19.1-73 45.6-84c-37 6.3-78.6-4.1-90-44.9c-3.3-11.7-8.9-84-8.9-93.8c0-48.9 42.9-33.5 69.3-13.7c36.7 27.5 76.2 83.4 90.7 113.3z"/></svg></a>
        	<a href="https://hk.linkedin.com/in/terence-luk-3b89392b5" target="_blank" class="item"><svg class="socialicon" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></a>`;

const parallax2HTML = `
			<div class="top-bar-container">
				<div class="topleft stop" id="iconplay" onclick="window.scrollTo(0,0);"><i class="fas fa-pause fa-lg"></i></div><!--
				--><div class="topright">
					<div class="top_subtitle " id="top_subtitle"><b>SimTIVA</b> - <span style="opacity: 50%; white-space:nowrap;" id="top_subtitle2">Simple TIVA simulator</span></div> 
					<div class="top_title " id="top_title">
						<div class="top_title_box cp" id="top_cp"><span id="cp">-</span></div>
						<div class="top_title_box ce" id="top_ce"><span id="ce">-</span></div>
						<div class="top_title_box infrate" id="top_infrate"><span id="infrate">-</span></div>
					</div>
				</div>
			</div>`;

const xInputCardsHTML = `
			<div class="card" id="card_infusion0">
				<div class="cardtitle">INFUSION</div>
			<div class="cardcontents">
				<table class="table-control line" id="tableInfusionRate0">
					<tr class="fr">
						<td>
							<div class="infusionratecontainer" id="infusionratecontainer0"><span id="infusionratedescription0">Infusion rate (ml/h)</span> 
								<span class="infusionrateselector" id="infusionrateselector0" onclick="dropdownshow(0)"><i class="fas fa-chevron-down"></i></span>
								<div class="infusionratedropdown" id="infusionratedropdown0">
									<a class="infusionratedropdownitem" id="infusionrateoption0" onclick="setInfusionUnit(0)"><i class="fas fa-check infusioncheck ring"></i>&nbsp; ml/h</a>
									<a class="infusionratedropdownitem" id="infusionrateoption1" onclick="setInfusionUnit(1)"><i class="fas fa-circle infusioncheck ring blank"></i>&nbsp; mg/kg/h</a>
								</div>
							</div>
						</td>
						<td><input type="number" inputmode="decimal" id="inputInfusion0" min="0" max="1200" step="0.01" placeholder=" " onchange=""></td></tr>
				</table>
				<table class="table-control space" id="tableInitialBolus0">
					<tr class="fr">
						<td>
							<div class="infusionratecontainer" id="boluscontainer0"><span id="bolusdescription0">Initial bolus (<span class="infused_units"></span>)</span>
								<span class="infusionrateselector" id="bolusselector0" onclick="dropdownshowbolus(0,'')"><i class="fas fa-chevron-down"></i></span>
							</div>
								<div class="infusionratedropdown" id="bolusdropdown0">
									<a class="infusionratedropdownitem" id="bolusoption0_0" onclick="setBolusUnit(0)"><i class="fas fa-check infusioncheck ring"></i>&nbsp; <span class="infused_units"></span></a>
									<a class="infusionratedropdownitem" id="bolusoption1_0" onclick="setBolusUnit(1)"><i class="fas fa-circle infusioncheck ring blank"></i>&nbsp; <span class="infused_units"></span>/kg</a>
									<a class="infusionratedropdownitem" id="bolusoption2_0" onclick="setBolusUnit(2)"><i class="fas fa-circle infusioncheck ring blank"></i>&nbsp; ml</a>
								</div>
							</div>
						</td><td><input type="number" inputmode="decimal" id="inputBolus_initial0" min="0" max="2000" step="0.01" placeholder=" " ></td></tr>
				</table>
				<a class="button" id="btn_start0" onclick="start_manual(0);">Start</a>
				<a class="button" id="btn_pause0" onclick="pause(0);">Pause</a>
			</div>
		</div>
			<div class="card" id="card_infusion1" style="display:none;">
				<div class="cardtitle">INFUSION.</div>
			<div class="cardcontents">
				<table class="table-control line" id="tableInfusionRate1">
					<tr class="fr">
						<td>
							<div class="infusionratecontainer" id="infusionratecontainer1"><span id="infusionratedescription1">Infusion rate (ml/h)</span> 
								<span class="infusionrateselector" id="infusionrateselector1" onclick="dropdownshow(1)"><i class="fas fa-chevron-down"></i></span>
								<div class="infusionratedropdown" id="infusionratedropdown1">
									<a class="infusionratedropdownitem" id="infusionrateoptioncopy0" onclick="setInfusionUnit(0)"><i class="fas fa-check infusioncheck ring"></i>&nbsp; ml/h</a>
									<a class="infusionratedropdownitem" id="infusionrateoptioncopy1" onclick="setInfusionUnit(1)"><i class="fas fa-circle infusioncheck ring blank"></i>&nbsp; mg/kg/h</a>
								</div>
							</div>
						</td>
						<td><input type="number" inputmode="decimal" id="inputInfusion1" min="0" max="1200" step="0.01" placeholder=" " onchange=""></td></tr>
				</table>
				<table class="table-control space" id="tableInitialBolus1">
					<tr class="fr">
						<td>
							<div class="infusionratecontainer" id="boluscontainer1"><span id="bolusdescription1">Initial bolus (<span class="infused_units"></span>)</span>
								<span class="infusionrateselector" id="bolusselector1" onclick="dropdownshowbolus(1,'')"><i class="fas fa-chevron-down"></i></span>
							</div>
								<div class="infusionratedropdown" id="bolusdropdown1">
									<a class="infusionratedropdownitem" id="bolusoption0_1" onclick="setBolusUnit(0)"><i class="fas fa-check infusioncheck ring"></i>&nbsp; <span class="infused_units"></span></a>
									<a class="infusionratedropdownitem" id="bolusoption1_1" onclick="setBolusUnit(1)"><i class="fas fa-circle infusioncheck ring blank"></i>&nbsp; <span class="infused_units"></span>/kg</a>
									<a class="infusionratedropdownitem" id="bolusoption2_1" onclick="setBolusUnit(2)"><i class="fas fa-circle infusioncheck ring blank"></i>&nbsp; ml</a>
								</div>
							</div>
						</td>
						<td><input type="number" inputmode="decimal" id="inputBolus_initial1" min="0" max="2000" step="0.01" placeholder=" " ></td></tr>
				</table>
				<a class="button" id="btn_start1" onclick="start_manual(1);">Start</a>
				<a class="button" id="btn_pause1" onclick="pause(1);">Pause</a>
			</div>
		</div>
		<div class="input-container" id="card_cpt0" style="">
			<div class="input-left">
				<div class="input-target-icon"><i class="fas fa-tint fa-fw"></i></div>
				<div class="input-description"><span id="input-description-cp-line1" style="font-size: 1.2rem;font-weight:bold;display:block"><span>Cp Target</span></span>(<span class="conc_units"></span>/ml)</div>
				<div class="input-entry"><input class="input-entry-field" type="number" inputmode="decimal" style="" id="inputDesired0" min="0" max="2000" step="0.1" placeholder=" " onkeyup="displaypreview(this.value,0)"></div>
			</div>
			<div class="input-right">
				<div class="input-button-container"><a class="button input-button newbuttongreen" id="btn_startCpt0_new" onclick="start_cpt();"><div class="icon"><i class="fas fa-play fa-fw"></i></div><div class="input-button-text">Start</div></a></div>
				<div class="input-button-container"><a class="button input-button newbuttongrey" id="btn_pauseCpt0_new" onclick="pauseCpt(0);drug_sets[0].cpt_active=0.5;"><div class="icon"><i class="fas fa-pause fa-fw"></i></div><div class="input-button-text">Pause</div></a></div>
			</div>
		</div>
		<div class="input-container" id="card_cpt1" style="display:none">
			<div class="input-left">
				<div class="input-target-icon"><i class="fas fa-tint fa-fw"></i></div>
				<div class="input-description"><span id="input-description-cp1-line1" style="font-size: 1.2rem;font-weight:bold;display:block"><span>Cp Target</span></span>(<span class="conc_units"></span>/ml)</div>
				<div class="input-entry"><input class="input-entry-field" type="number" inputmode="decimal" style="" id="inputDesired1" min="0" max="2000" step="0.1" placeholder=" " onkeyup="displaypreview(this.value,1)"></div>
			</div>
			<div class="input-right">
				<div class="input-button-container"><a class="button input-button newbuttongreen" id="btn_startCpt1_new" onclick="start_cpt_complex(document.getElementById('inputDesired1').value*1,1)"><div class="icon"><i class="fas fa-play fa-fw"></i></div><div class="input-button-text">Start</div></a></div>
				<div class="input-button-container"><a class="button input-button newbuttongrey" id="btn_pauseCpt1_new" onclick="pauseCpt(1); drug_sets[1].cpt_active=0.5;"><div class="icon"><i class="fas fa-pause fa-fw"></i></div><div class="input-button-text">Pause</div></a></div>
			</div>
		</div>
		<div class="" id="card_RSI">
			<div id="card_RSI_title"><div style="width:35px; height:35px; background: #5c5c5c; border-radius:4rem"><img src="iconintubation.png" style="width:100%;"></div><div style="align-self:center;font-weight:bold;padding-left:10px">RSI mode</div><div style="flex:1"></div><div id="expandRSIbutton" style="" onclick="toggleRSI();"><i class="fas fa-angle-double-up"></i>&nbsp; HIDE</div></div>
			<div style="" id="card_RSI_contents">
				<div style="display:flex; align-items:center;">
					<div style="flex-basis:45%">CE target (mcg/ml):</div><div><input type="number" inputmode="decimal" id="input_RSI_CE" step="0.01" onkeyup="preview_RSI_debounce();"></div>
				</div>
				<div style="display:flex; align-items:center">
					<div style="flex-basis:45%">Bolus speed:</div>
					<div>
						<select id="input_RSI_bolusspeed" onchange="preview_RSI();">
							<option value="0">Manual push (7200ml/h)</option>
							<option value="1500">1500ml/h</option>
							<option value="1200">1200ml/h</option>
						</select>
					</div>
				</div>
				<div style="display:flex; align-items:center">
					<div style="flex-basis:45%">To be achieved at:</div>
					<div>
						<select id="input_RSI_time" onchange="preview_RSI();">
							<option value="60" selected>60s</option>
							<option value="90">90s</option>
						</select>
					</div>
				</div>
				<div id="RSI_preview" style="" class="RSI_box">...</div>
				<div id="RSI_message" style="" class="RSI_box">...</div>
				<div id="RSI_scheme" class="hide"></div>
				<div style="display:flex;justify-content:flex-end">
					<div id="RSI_displayschemebutton" style="float:right" onclick="RSI_togglescheme();"><i class="fas fa-angle-double-down"></i> &nbsp;Show scheme</div>
				</div>
				<div style="display:none" id="proceed_RSI_div">
					<a class="button wide invert" id="proceed_RSI" onclick="deliver_RSI();" style="display:flex;width:50%;align-items:center"><div class="icon"><i class="fas fa-play fa-fw"></i></div><div style="flex:1;text-align:center">Start RSI</div></a>
				</div>
			</div>
		</div>
		<div class="input-container" id="card_cet0_new" style="">
			<div class="input-left">
				<div class="input-target-icon"><i class="fas fa-brain fa-fw"></i></div>
				<div class="input-description"><span id="input-description-ce-line1" style="font-size: 1.2rem;font-weight:bold;display:block"><span>Ce Target</span></span>(<span class="conc_units"></span>/ml)</div>
				<div class="input-entry"><input class="input-entry-field" type="number" inputmode="decimal" style="" id="inputDesiredCe0_new" min="0" max="2000" step="0.1" placeholder=" " onkeyup="displaypreview(this.value,0)"></div>
			</div>
			<div class="input-right">
				<div class="input-button-container"><a class="button input-button newbuttongreen" id="btn_startCet0_new" onclick="start_cet();"><div class="icon"><i class="fas fa-play fa-fw"></i></div><div class="input-button-text">Start</div></a></div>
				<div class="input-button-container"><a class="button input-button newbuttongrey" id="btn_pauseCet0_new" onclick="pauseCpt(0);"><div class="icon"><i class="fas fa-pause fa-fw"></i></div><div class="input-button-text">Pause</div></a></div>
			</div>
		</div>
		<div class="input-container" id="card_cet1_new" style="display:none">
			<div class="input-left">
				<div class="input-target-icon"><i class="fas fa-brain fa-fw"></i></div>
				<div class="input-description"><span id="input-description-ce1-line1" style="font-size: 1.2rem;font-weight:bold;display:block"><span>Ce Target</span></span>(<span class="conc_units"></span>/ml)</div>
				<div class="input-entry"><input class="input-entry-field" type="number" inputmode="decimal" style="" id="inputDesiredCe1_new" min="0" max="2000" step="0.1" placeholder=" " onkeyup="displaypreview(this.value,1)"></div>
			</div>
			<div class="input-right">
				<div class="input-button-container"><a class="button input-button newbuttongreen" id="btn_startCet1_new" onclick="start_cet_complex(document.getElementById('inputDesiredCe1_new').value*1,1);"><div class="icon"><i class="fas fa-play fa-fw"></i></div><div class="input-button-text">Start</div></a></div>
				<div class="input-button-container"><a class="button input-button newbuttongrey" id="btn_pauseCet1_new" onclick="pauseCpt(1);"><div class="icon"><i class="fas fa-pause fa-fw"></i></div><div class="input-button-text">Pause</div></a></div>
			</div>
		</div>
		<!-- end new interface styles -->
		<div class="card" id="card_cet0" style="">
			<div class="cardtitle">Ce TARGETING</div>
			<div class="cardcontents">
				<table class="table-control space" id="tableCet">
					<tr class="fr"><td>Enter Ce (<span class="conc_units"></span>/ml)</td><td><input type="number" inputmode="decimal" style="border-radius:1rem; width:75px; border-width:2px" id="inputDesiredCe0" onfocus="this.nextElementSibling.style.display='inline-block';" min="0.1" max="200" step="0.1" placeholder=" " onkeyup="displaypreview(this.value,0);this.nextElementSibling.style.display='inline-block';" onblur="x=this;setTimeout(function(){x.nextElementSibling.style.display='none';},300)"><button id="" class="closeicon" onclick="clearInput('inputDesiredCe0');"></button></td></tr>
					<tr id="IB_swing_select_row0" class="IB_elements">
						<td>Peak/trough level</td>
						<td>
							<select id="IB_swing_select0" onchange="drug_sets[0].IB_swing=this.value*1">
								<option value="0.025">±2.5%</option>
								<option value="0.05" selected>±5%</option>
								<option value="0.075">±7.5%</option>
								<option value="0.1">±10%</option>
								<option value="0.125">±12.5%</option>
								<option value="0.15">±15%</option>
							</select>
						</td>
					</tr>
					<tr id="IB_interval_row0" class="IB_elements">
						<td>Bolus interval
						</td>
						<td id="IB_interval0">
						</td>
					</tr>
				</table>
				<a class="button" id="btn_startCet0" onclick="start_cet();">Start</a>
				<a class="button" id="btn_pauseCet0" onclick="pauseCpt(0);">Pause</a>
				
				<span id="IB_about_btn0" onclick="displayIBabout();"><i class="fas fa-question-circle"></i></span>
			</div>
		</div>
		<div class="card" id="card_cet1" style="display:none;">
			<div class="cardtitle">Ce TARGETING.</div>
			<div class="cardcontents">
				<table class="table-control space" id="tableCet1">
					<tr class="fr"><td>Enter Ce (<span class="conc_units"></span>/ml)</td><td><input type="number" inputmode="decimal" style="border-radius:1rem; width:75px; border-width:2px" id="inputDesiredCe1" onfocus="this.nextElementSibling.style.display='inline-block';" min="0.1" max="200" step="0.1" placeholder=" " onkeyup="displaypreview(this.value,1);this.nextElementSibling.style.display='inline-block';" onblur="x=this;setTimeout(function(){x.nextElementSibling.style.display='none';},300)"><button id="" class="closeicon" onclick="clearInput('inputDesiredCe1');"></button></td></tr>
					<tr id="IB_swing_select_row1" class="IB_elements">
						<td>Peak/trough level</td>
						<td>
							<select id="IB_swing_select1" onchange="drug_sets[1].IB_swing=this.value*1">
								<option value="0.025">±2.5%</option>
								<option value="0.05" selected>±5%</option>
								<option value="0.075">±7.5%</option>
								<option value="0.1">±10%</option>
								<option value="0.125">±12.5%</option>
								<option value="0.15">±15%</option>
							</select>
						</td>
					</tr>
					<tr id="IB_interval_row1" class="IB_elements">
						<td>Bolus interval
						</td>
						<td id="IB_interval1">
						</td>
					</tr>
				</table>
				<a class="button" id="btn_startCet1" onclick="start_cet_complex(document.getElementById('inputDesiredCe1').value*1,1);">Start</a>
				<a class="button" id="btn_pauseCet1" onclick="pauseCpt(1);">Pause</a>
				<span id="IB_about_btn1" onclick="displayIBabout();"><i class="fas fa-question-circle"></i></span>
			</div>
		</div>
		<div class="card" id="card_bolus0" style="display:none;">
			<div class="cardtitle">BOLUS</div>
			<div class="cardcontents">
				<table class="table-control space">
					<tr class="fr">
						<td>
							<div class="infusionratecontainer" id="boluscontainercopy0"><span id="bolusdescriptioncopy0">Custom bolus (<span class="infused_units"></span>)</span> <span class="infusionrateselector" id="bolusselectorcopy0" onclick="dropdownshowbolus(0,'copy')"><i class="fas fa-chevron-down"></i></span>
							</div>
								<div class="infusionratedropdown" id="bolusdropdowncopy0">
									<a class="infusionratedropdownitem" id="bolusoptioncopy0_0" onclick="setBolusUnit(0)"><i class="fas fa-check infusioncheck ring"></i>&nbsp; <span class="infused_units"></span></a>
									<a class="infusionratedropdownitem" id="bolusoptioncopy1_0" onclick="setBolusUnit(1)"><i class="fas fa-circle infusioncheck ring blank"></i>&nbsp; <span class="infused_units"></span>/kg</a>
									<a class="infusionratedropdownitem" id="bolusoptioncopy2_0" onclick="setBolusUnit(2)"><i class="fas fa-circle infusioncheck ring blank"></i>&nbsp; ml</a>
								</div>
						</td>
						<td width="30px"><input type="number" inputmode="decimal" id="inputBolus0" min="0" max="2000" step="0.01" placeholder=" "></td>
						<td><a class="button custom" id="" onclick="bolusadmin(custombolus(0),0);">Go!</button></a></td>
					</tr></table>
				
				<a class="button bolus" id="bolus3" onclick="bolusadmin(30,0);"><div class="bolus_outside">Bolus</div><div class="bolus_inside">30<span class="infused_units"></span></div></a>
				<a class="button bolus" id="bolus2" onclick="bolusadmin(20,0);"><div class="bolus_outside">Bolus</div><div class="bolus_inside">20<span class="infused_units"></span></div></a>
				<a class="button bolus" id="bolus1" onclick="bolusadmin(10,0);"><div class="bolus_outside">Bolus</div><div class="bolus_inside">10<span class="infused_units"></span></div></a>
			</div>
		</div>
		<div class="card" id="card_bolus1" style="display:none;">
			<div class="cardtitle">BOLUS.</div>
			<div class="cardcontents">
				<table class="table-control space">
					<tr class="fr">
						<td>
							<div class="infusionratecontainer" id="boluscontainercopy1"><span id="bolusdescriptioncopy1">Custom bolus (<span class="infused_units"></span>)</span>
								<span class="infusionrateselector" id="bolusselectorcopy1" onclick="dropdownshowbolus(0,'')"><i class="fas fa-chevron-down"></i></span>
							</div>
								<div class="infusionratedropdown" id="bolusdropdowncopy1">
									<a class="infusionratedropdownitem" id="bolusoptioncopy0_1" onclick="setBolusUnit(0)"><i class="fas fa-check infusioncheck ring"></i>&nbsp; <span class="infused_units"></span></a>
									<a class="infusionratedropdownitem" id="bolusoptioncopy1_1" onclick="setBolusUnit(1)"><i class="fas fa-circle infusioncheck ring blank"></i>&nbsp; <span class="infused_units"></span>/kg</a>
									<a class="infusionratedropdownitem" id="bolusoptioncopy2_1" onclick="setBolusUnit(2)"><i class="fas fa-circle infusioncheck ring blank"></i>&nbsp; ml</a>
								</div>
							</div>
						</td>
						<td width="30px"><input type="number" inputmode="decimal" id="inputBolus1" min="0" max="2000" step="0.01" placeholder=" " ></td>
						<td><a class="button custom" id="" onclick="bolusadmin(custombolus(1),1);">Go!</button></a></td>
					</tr></table>
				
				<a class="button bolus" id="bolus3_1" onclick="bolusadmin(30,1);"><div class="bolus_outside">Bolus</div><div class="bolus_inside">30<span class="infused_units"></span></div></a>
				<a class="button bolus" id="bolus2_1" onclick="bolusadmin(20,1);"><div class="bolus_outside">Bolus</div><div class="bolus_inside">20<span class="infused_units"></span></div></a>
				<a class="button bolus" id="bolus1_1" onclick="bolusadmin(10,1);"><div class="bolus_outside">Bolus</div><div class="bolus_inside">10<span class="infused_units"></span></div></a>
			</div>
		</div>
		<div class="card hide" id="card_reanimate">
			<div class="cardtitle">RESUME SIMULATION</div>
			<div class="cardcontents">
				<div style="color:grey; font-size:90%">The recording of simulation data was suspended at: <br><span id="timestamp_lastdata"></span></div>
				<table class="table-control space">
					<tr class="fr">
						<td>Duration elapsed since simulation suspended:</td>
						<td>
							<select id="reanimate_select" onchange="sendtoreanimate(this.value*60);">
								<option value="0">0min</option>
								<option value="0.5">&lt;1min</option>
								<option value="1">1min</option>
								<option value="2">2mins</option>
								<option value="3">3mins</option>
								<option value="4">4mins</option>
								<option value="5">5mins</option>
								<option value="6">6mins</option>
								<option value="7">7mins</option>
								<option value="8">8mins</option>
								<option value="9">9mins</option>
								<option value="10">10mins</option>
								<option value="11">11mins</option>
								<option value="12">12mins</option>
								<option value="13">13mins</option>
								<option value="14">14mins</option>
								<option value="15">15mins</option>
								<option value="16">16mins</option>
								<option value="17">17mins</option>
								<option value="18">18mins</option>
								<option value="19">19mins</option>
								<option value="20">20mins</option>
								<option value="21">21mins</option>
								<option value="22">22mins</option>
								<option value="23">23mins</option>
								<option value="24">24mins</option>
								<option value="25">25mins</option>
								<option value="26">26mins</option>
								<option value="27">27mins</option>
								<option value="28">28mins</option>
								<option value="29">29mins</option>
								<option value="30">30mins</option>
								<option value="35">35mins</option>
								<option value="40">40mins</option>
								<option value="45">45mins</option>
								<option value="50">50mins</option>
								<option value="55">55mins</option>
								<option value="60">60mins</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Time point for resuming simulation:</td>
						<td><span id="timestamp_toberesumed"></span></td>
				</table>
				<a class="button" id="btn_reanimate" onclick="submit_reanimate();">Resume simulation</a>
			</div>
		</div>
		<div id="outputcontainer">
			<div id="outputselector">
				<a class="outputtab active" id="btn_displaychart" onclick="show_graph();">Graph</a>
				<a class="outputtab" id="btn_displayhistory" onclick="show_history();">History</a>
			</div>
			<div id="chartwrapper">
				<div id="chartoverlay">
					<div id="chartoverlaytext">Updating chart...</div>
				</div>
				<div id="chartbuttons">
					<a id="chartzoomin" onclick="chartZoomToggle(1);"><i class="fas fa-search-plus"></i></a>
					<a id="chartoptions" onclick="chartOptionsToggle();"><i class="fas fa-cog"></i></a>
					<a id="chartzoomout" onclick="chartZoomToggle(0);"><i class="fas fa-search-minus"></i></a>
				</div>
				<div id="chartoverlayoptions">
					<div id="chartoverlayoptionscontent" class="optitem">
						<div id="closeoptions" class="optitem" onclick="chartOptionsToggle();">&times;</div>
						<div id="chartoptionscheckbox" class="optitem">
				      <label class="container labeloptionscontainer optitem" style="margin-top:10px;width:60%">Display events
				          <input type="checkbox" onChange="toggleshowevents();" id="isShowEvents" class="optitem" checked><span class="checkmark optitem"></span>
				      </label>
				      <label class="container labeloptionscontainer optitem" style="margin-top:6px">Auto. concentration scale (y-axis)
				          <input type="checkbox" onChange="toggleautoconc()" id="isConcAutomatic" class="optitem" checked><span class="checkmark optitem"></span>
				      </label>
				      <div style="padding-left:30px" class="optitem">
				      	Custom max concentration:
				      	<select id="customconcselect" style="" onChange="setcustomconc(this.value)" class="optitem">
				      	<option value="15">15mcg/ml</option>
				      	<option value="14">14mcg/ml</option>
				      	<option value="13">13mcg/ml</option>
				      	<option value="12">12mcg/ml</option>
				      	<option value="11">11mcg/ml</option>
				      	<option value="10" selected>10mcg/ml</option>
				      	<option value="9">9mcg/ml</option>
				      	<option value="8">8mcg/ml</option>
				      	<option value="7">7mcg/ml</option>
				      	<option value="6">6mcg/ml</option>
				      	<option value="5">5mcg/ml</option>
				      	<option value="4">4mcg/ml</option>
				      	<option value="3">3mcg/ml</option>
				      	</select>
				      </div>
				      <label class="container labeloptionscontainer optitem" style="margin-top:6px">Auto. time scale (x-axis)
				          <input type="checkbox" id="isTimeAutomatic" onChange="toggleautotime();" class="optitem" checked><span class="checkmark optitem"></span>
				      </label>
						</div>
						<div style="padding-left:30px" class="optitem">Custom time range (min):</div>
						<div id="timerangeslider" class="optitem">
							<div id="leftslidercontainer" class="optitem">
								<input id="range0" value="10" min="0" max="30" step="5" type="range" oninput="processrange(0);" class="optitem">
								<div class="timerangetext optitem" id="rangetext0">0</div>
							</div>
							<div id="rightslidercontainer" class="optitem">
								<input id="range1" value="90" min="30" max="120" step="5" type="range" oninput="processrange(1);" class="optitem">
								<div class="timerangetext optitem" id="rangetext1">30</div>
							</div>		
						</div>
						<div style="margin-top:30px" id="PD_options_group" class="optitem">
				      <label class="container labeloptionscontainer optitem" style="margin-bottom:0px">PD Effect estimation
				          <input type="checkbox" id="isEffectEstimationOn" onChange="toggleEffectEst();" class="optitem" checked><span class="checkmark optitem"></span>
				      </label>
				      <select id="select_effect_measure" style="margin-left:30px;width:calc(100% - 30px)" onChange="toggleEffectEst();" class="optitem">
				      	<option value="bis">BIS 40-60</option>
				      	<option value="ptol">PTOL 50-90</option>
				      	<option value="nsri">NSRI 20-50</option>
				      </select>
						</div>
					</div>
					<div id="chartoverlayoptionscontentarrow"></div>
				</div>
				<div id="annotatebutton" style="display:none" onclick="setnow(Math.floor(time_in_s));document.getElementById('modalAnnotatetitle').innerHTML='ADD EVENT';document.getElementById('addeventtext').value='';document.getElementById('btn_submitevent').setAttribute('onclick','createEvent2(-1)');document.getElementById('btn_deleteevent').style.display='none';setmodal('modalAnnotate')">
					<i class="fas fa-pencil-alt"></i>
				</div>
				<div id="expandbutton" style="display:none" onclick="openpopupchart();">
					<i class="fas fa-expand-alt"></i>
				</div>
				<div id="chartcontainer">
					<canvas id="myChart"></canvas>
				</div>
			</div>
			<div id="historywrapper2">
				<div id="historywrapper">
				</div>
			</div>
				<div id="pastscheme">
					<a id="pastschemebutton" onclick="displaymodalhistory();"><i class="fas fa-history"></i> Past Schemes</a>
				</div>
		</div>
		<div id="eventscontainer" style="display:block">
		</div>
		<div id="ptolcard" class="">
			<div id="ptolcard_left" style="padding:0.5rem;flex-basis:70%">
				<div style="font-size:200%;font-weight:bold;line-height:1" id=""><span id="ptoltitle">PTOL</span><span id="ptoltooltip" onclick="ptolwarning();" style="display:none"><i class="fas fa-question ring"></i></span></div>
				<div style="font-size:80%;opacity:50%" id="ptoldesc">Probability of tolerance to laryngoscopy (%)</div>
			</div><!--
			--><div id="ptolcard_right" style="flex-basis: 25%;text-align:center;font-size:400%;font-weight:bold">
				-
			</div><!--
			--><div id="ptolcard_switch" style="text-align:center;align-self:stretch;padding-top:30px; cursor:pointer" onclick="cycleEffectEst();">
				<div style="line-height:0.5">
					<i class="fas fa-caret-up"></i><br>
					<i class="fas fa-caret-down"></i>
				</div>
			</div>
		</div>
		<div id="emulatecard" class="card" style="display:none">
			<div class="cardtitle">ELEVELD EMULATION</div>
			<div id="emulatetitlecontainer">
				<div id="emulatetitleleft"  style="padding:0.5rem;flex-basis:70%">
					<span style="font-size:200%;font-weight:bold;line-height:1">eBIS</span>
					<div style="font-size:80%;opacity:50%" id="">Estimated BIS from Eleveld PD model</div>
				</div>
				<div style="flex-basis: 25%;text-align:center;font-size:400%;font-weight:bold" id="emulatetitleright">
				</div>
			</div>
			<div id="emulateswitch">
				<a class="button" onclick="document.getElementById('emulateswitch').classList.add('hide');document.getElementById('emulatebox').classList.add('expand');emulatePopulateRatio();">Turn on emulation</a>
			</div>
			<div id="emulatebox">
				<div id="emulatechartbuttons" class="hide"><a id="chartemulatebutton" onclick="emulateDisplayToggle()"><span style="padding-right: 6px"><i class="fas fa-question-circle"></i></span>Details</a></div>
				<div id="emulatecontrols">
					<div>
						<span style="opacity:0.7;font-size:0.8rem;width:85%;margin:9px auto;white-space:normal;display:block">This table estimates the required target to emulate the Eleveld model. Use the induction target for initial 1-3mins then reduce to maintenance target. Ratio to convert <i>Eleveld target</i> to <i><span id="emulateRatioModel3">Marsh</span> target</i> is: <b><span id="emulateRatio" ></span></b></span>
						<div class="customTableRow">
							<span><b>Eleveld CET</b></span><span><b id="emulateRatioModel1">Marsh</b><br><b>Induction</b></span><span><b id="emulateRatioModel2">Marsh</b><br><b>Maintenance</b></span>
						</div>
						<div class="customTableRow">
							<b><span>1</span></b><span id="emulateRatioX1start"></span><span id="emulateRatioX1"></span>
						</div>
						<div class="customTableRow">
							<b><span>2</span></b><span id="emulateRatioX2start"></span><span id="emulateRatioX2"></span>
						</div>
						<div class="customTableRow">
							<b><span>3</span></b><span id="emulateRatioX3start"></span><span id="emulateRatioX3"></span>
						</div>
						<div class="customTableRow">
							<b><span>4</span></b><span id="emulateRatioX4start"></span><span id="emulateRatioX4"></span>
						</div>
						<div class="customTableRow noline">
							<b><span>5</span></b><span id="emulateRatioX5start"></span><span id="emulateRatioX5"></span>
						</div>
						<div class="customTableRow noline">

						</div>
						<span style="opacity:0.7;font-size:0.8rem;width:85%;margin:9px auto;white-space:normal;display:block">Age-adjusted CE50 for Eleveld model is: <b><span id="emulateCE50"></span></b></span>
					</div>
					<div style="display:flex;width:100%;height: 40px;justify-content:center;align-items:center">
						<a class="button invert" id="emulateStartBtn" onclick="emulateEleveldInit();emulateEleveldReal();emulateDisplayToggle();setTimeout(emulatePlot,3000);setTimeout(function() {document.getElementById('emulateStartBtn').setAttribute('onclick','emulateDisplayToggle()');document.getElementById('emulateStartBtn').innerHTML='Show Graph'},250);emulateOn = true;">Start Emulation</a>
					</div>
				</div>
				<div id="emulatechartcontainer">
					<canvas id="myChartEmulate"></canvas>
				</div>
			</div>
		</div>
		<div id="interactionscontainer">
			<div id="interactionstabselector">
				<a class="interactionstab active" id="btn_displayisobologram" onclick="show_isobologram()">Isobologram</a>
				<a class="interactionstab" id="btn_displaylegend" onclick="show_legend();">PD Interaction</a>
			</div>
			<div id="chart2wrapper">
				
					
					<div id="chart2container">
						<canvas id="myChart2"></canvas>
					</div>
			</div> <!-- end chart2wrapper -->
			<div id="legendwrapper">
				<div class="legendtitle">Propofol-Opioid Interaction</div>
				<div class="legendcontent">Propofol and opioids such as remifentanil demonstrate intense synergism. The interaction can be quantified using a hypnotic-analgesic endpoint such as ablating response to laryngoscopy. For example, remifenanil concentration of 4ng/ml may reduce propofol concentration associated with loss of response to laryngoscopy by two-thirds (Bouillon 2004). Probability to tolerate laryngoscopy (PTOL) and its derivative, the noxious stimulation response index (NSRI), have been proposed as measures of potency of propofol-remifentanil drug combination (Hannivoort 2016).</div>
				<div class="legendtitle">Isobologram</div>
				<div class="legendcontent">Using different combinations of CE-propofol and CE-remifentanil (effect-site concentrations of propofol and remifentanil respectively), all yielding the same predicted response (90% probability to tolerate laryngoscopy, PTOL90), a line (isobole) is drawn connecting all the possible combinations of CE-propofol/CE-remifentanil to achieve the same identical effect (van den Berg 2021). In our simulation programme, the same method is repeated for PTOL80, PTOL70... PTOL10 to generate a total of 9 isoboles on the 2-dimensional chart. The contour of the isoboles is typical of synergism, or supradditive interaction.</div>
				<div class="legendtitle">Combinations of CEProp/CERemi for PTOL90</div>
				<div class="legendcontent">Using PTOL90 isobole as an example, the combinations of CE-propofol and CE-remifentanil yielding the identical effect are: {8.6mcg/ml, 1ng/ml}, {5.9mcg/ml, 2ng/ml}, {3.6mcg/ml, 4ng/ml}, {2mcg/ml, 8ng/ml} according to the Bouillon interaction model (van den Berg 2021). Following this, the clinician may decide on using PTOL as a guidance to control different CE of propofol/remifentanil based on haemodynamic, hypnotic, or other consequences while maintaining the same level of pharmacodynamic endpoint.</div>
			</div>
		</div> <!-- end interactions container -->

		<div class="card" id="card_controlpanel">
			<div class="cardtitle">CONTROL PANEL</div>
			<div class="cardcontents">
				<div class="timeFxRow" onclick="popup_reset();">
					<div class="timeFxRowLeft"><a id="btn_timeFxReset" onclick="timeFxReset();" class="timeFxButton"><i class="fas fa-undo-alt"></i></a></div>
					<div class="timeFxRowRight">
						<div class="timeFxLine1">Quick reset</div>
						<div class="timeFxLine2">Keep same patient data & start over</div>
					</div>
				</div>
				<div class="timeFxRow" id="timeFxRowSuspend" onclick="timeFxSuspend();">
					<div class="timeFxRowLeft"><a id="btn_timeFxSuspend" onclick="timeFxSuspend();" class="timeFxButton"><i class="fas fa-pause fa-fw"></i></a></div>
					<div class="timeFxRowRight">
						<div class="timeFxLine1">Pause sim</div>
						<div class="timeFxLine2">Suspend simulation & keep all data</div>
					</div>
				</div>
				<div class="timeFxRow hide" id="timeFxRowResume" onclick="timeFxResume(0);">
					<div class="timeFxRowLeft"><a id="btn_timeFxResume" onclick="timeFxResume(0);" class="timeFxButton"><i class="fas fa-play fa-fw"></i></a></div>
					<div class="timeFxRowRight">
						<div class="timeFxLine1">Resume sim</div>
						<div class="timeFxLine2">Resume running simulation</div>
					</div>
				</div>
				<div class="timeFxRow" onclick="timeFxOpenJump();" >
					<div class="timeFxRowLeft"><a id="btn_timeFxJump" onclick="timeFxOpenJump();" class="timeFxButton"><i class="fas fa-stopwatch fa-fw"></i></a></div>
					<div class="timeFxRowRight">
						<div class="timeFxLine1">Jump to time</div>
						<div class="timeFxLine2">Jump backward/forward in time</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card" id="parameters">
			<div class="cardtitle collapsiblecard">MODEL PARAMETERS</div>
			<div class="cardcontents"><span id="modeldescription"></span></div>
		</div>
`;
const xLeftbarHTML = `
  <div class="leftbar propofol hide">
  	<div class="ptolcontainer">
  		<div id="">&nbsp;
  		</div>
  	</div>
  	<div class="leftbarlabel">
  		<div class="druglabelcontainer propofol active" onclick="tabswitch(0);">
  			<div class="druglabelicon alert hide"><i class="fas fa-bell"></i></div>
  			<div class="druglabelicon propofol">
  				P
  			</div>
  			<div class="druglabeltext propofol active">
  				<div class="line1">PROPOFOL</div>
  				<div class="line2 hide">
  					<div class="line2text"><i class="fas fa-tint fa-fw"></i>&nbsp;<span id="cp_propo"></span>&nbsp;&nbsp;</div>
  					<div class="line2text"><i class="fas fa-brain fa-fw"></i>&nbsp;<span id="ce_propo"></span>&nbsp;&nbsp;</div>
  					<div class="line2text"><i class="fas fa-running fa-fw"></i>&nbsp;<span id="inf_propo"></span></div>
  				</div>
  			</div>
  		</div>
  	</div>
  	<div class="spacer">
  	</div>
  	<div class="leftbarlabel">
  		<div class="druglabelcontainer opioid " onclick="tabswitch(1);">
  			<div class="druglabelicon alert hide"><i class="fas fa-bell"></i></div>
  			<div class="druglabelicon opioid">
  				R
  			</div>
  			<div class="druglabeltext opioid ">
  				<div class="line1">REMIFENTANIL</div>
  				<div class="line2 hide">
  					<div class="line2text"><i class="fas fa-tint fa-fw"></i>&nbsp;<span id="cp_opioid"></span>&nbsp;&nbsp;</div>
  					<div class="line2text"><i class="fas fa-brain fa-fw"></i>&nbsp;<span id="ce_opioid"></span>&nbsp;&nbsp;</div>
  					<div class="line2text"><i class="fas fa-running fa-fw"></i>&nbsp;<span id="inf_opioid"></span></div>
  				</div>
  			</div>

  		</div>
  	</div>
  </div>
`;
const xCardsHTML = `
		<div class="card" id="schemecopy">
			<div class="cardtitle" id="schemecopytitle">SCHEME</div>
			<div class="cardcontents" id="schemecopycontainer">
			

				<div id="historywrapperCOPY">Waiting to start.
				</div>
			
			</div>
				<div id="pastschemeCOPY">
					<a id="pastschemebuttonCOPY" onclick="displaymodalhistory();"><i class="fas fa-history"></i> Past Schemes</a>
				</div>
		</div>

		<div class="card" id="card_retrospective">
			<div class="cardtitle collapsiblecard">RETROSPECTIVE</div>
			<div class="cardcontents">
				<i style="color:grey; font-size:90%; padding-top:10px; padding-bottom:10px; display:block;">If you have given a bolus or changed the infusion rate some time ago but forgot to enter into SimTIVA, you can do retrospective correction here.</i>
				<table class="table-control">
					<tr class="fr"><td style="width:70%">How many mins ago? (Time X)</td>
						<td>
							<select id="retrospectiveTime">
								<option value="0.5">&lt;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
							</select>
						</td>
					</tr>
					<tr><td>Dose of bolus given at X? (<span class="infused_units"></span>)</td>
						<td>
							<input type="number" inputmode="decimal" id="retrospectiveBolus"  min="0" max="400" step="0.1" placeholder=" " >
						</td>
					</tr>
					<tr><td>New infusion rate at X? (ml/h)</td>
						<td>
							<input type="number" inputmode="decimal" id="retrospectiveInfusion"  min="0" max="100" step="0.1" placeholder=" " >
						</td>
					</tr>
				</table>
				<a class="button" id="btn_retrospective" onclick="senddataretrospective();">Apply</a>
			</div>
		</div>
		<div class="card" id="card_TimeEstimation">
			<div class="cardtitle collapsiblecard">TIME ESTIMATION</div>
			<div class="cardcontents">
				<i style="color:grey; font-size:90%; padding-top:10px; padding-bottom:10px; display:block;">You can estimate how long before the infusion ends given a certain volume remaining in the syringe. </i>
				<table class="table-control">
					<tr class="fr"><td style="width:70%">Volume to be infused</td>
						<td>
							<input type="number" inputmode="decimal" id="inputVolume"  min="0" max="200" step="0.1" placeholder=" " onkeyup="displayTimeEstimation();">
						</td>
					</tr>
					<tr>
						<td>Ends in</td>
						<td><span id="timeEstimation_output">___</td>
					</tr>
				</table>
				<a class="button" id="btn_timeEstimation" onclick="displayTimeEstimation();">Apply</a>
			</div>
		</div>
		<div class="card" id="card_VolumeEstimation">
			<div class="cardtitle collapsiblecard">VOLUME ESTIMATION</div>
			<div class="cardcontents">
				<i style="color:grey; font-size:90%; padding-top:10px; padding-bottom:10px; display:block;">You can estimate how much drug volume is required for a certain duration of infusion.</i>
				<table class="table-control">
					<tr class="fr"><td style="width:70%">Duration remaining (mins)</td>
						<td>
							<input type="number" inputmode="decimal" id="inputTime"  min="0" max="200" step="0.1" placeholder=" " onkeyup="displayVolumeEstimation();">
						</td>
					</tr>
					<tr>
						<td>Volume required (mls)</td>
						<td><span id="volumeEstimation_output">___</td>
					</tr>
				</table>
				<a class="button" id="btn_volumeEstimation" onclick="displayVolumeEstimation();">Apply</a>
			</div>
		</div>
		<div class="card" id="card_wakeup">
			<div class="cardtitle collapsiblecard">WAKE-UP TIME</div>
			<div class="cardcontents">
				<i style="color:grey; font-size:90%; padding-top:10px; padding-bottom:10px; display:block;">To predict the wake-up time, or decrement time (time to reach a designated 'wake-up' concentration at the effect site) if the infusion is stopped at the current point. Default is 1mcg/ml.</i>
				<table class="table-control">
					<tr class="fr"><td style="width:70%">Wake-up concentration (mcg/ml)</td>
						<td>
							<select id="wakeupconc" onchange="sendtowakeup(this.value*1)">
								<option value="0.7">0.7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
								<option value="0.8">0.8</option>
								<option value="0.9">0.9</option>
								<option value="1" selected="selected">1</option>
								<option value="1.1">1.1</option>
								<option value="1.2">1.2</option>
								<option value="1.3">1.3</option>
								<option value="1.4">1.4</option>
								<option value="1.5">1.5</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Wake-up time</td>
						<td><span id="wakeuptime">___</td>
					</tr>
				</table>
				<a class="button" id="btn_wakeup" onclick="sendtowakeup(document.getElementById('wakeupconc').value);">Apply</a>
			</div>
		</div>
		<div class="card" id="card_options">
			<div class="cardtitle">OPTIONS</div>
			<div class="cardcontents">

    		<div class="optionscardtitle collapsiblecard">INFUSION SETTINGS</div>
    		<div class="optionscardcontents">
				<div id="ptolcardoptions">
	      			<label class="container labelptolcontainer" style="">Display detailed tab info
	          		<input type="checkbox" onChange="toggleshowtabinfo();" id="isTabInfo"><span class="checkmark"></span>
	      			</label>
	      <!--<label class="container labelptolcontainer" style="">Display effective dose margins <span style='font-size: 80%'>(PTOL50-90)</span>
	          <input type="checkbox" id="" onChange="toggleshowPTOLmargins();" checked><span class="checkmark"></span>
	      </label>
	    -->
	    		</div>
				<table class="table-control">
					<!--options array-->
					<!-- 
					0[0:mg/kg/h, 1:mcg/kg/min],
					1[0:1x, 1:5x, 2:25x, 3:50x],
					2[0:auto, 1:lazy, 2:accurate],
					3[0:wakelockoff, 1:wakelockon],
					4[0:vibrateoff, 1:vibrateon],
					5[0:soundoff, 1:soundon],
					6[0:notifoff, 1:notifon]

					default is:
					[1,0],
					[1,0,0,0],
					[1,0,0],
					[1,0],
					[1,0],
					[1,0],
					[1,0]
					-->
					<!--end options array-->
					<tr id="option_bolusspeed_row" style="display:none" class="fr"><td>Max bolus speed <i class="fas fa-question tooltip background ring"><span class="tooltiptext">Max bolus rate for programmed bolus. Flash means instantaneous bolus.</span></i></td>
						<td>
							<select id="select_bolusspeed" onchange="applybolusspeed();">
											<option value="0" selected>Flash</option>
											<option value="1500">1500ml/h</option>
											<option value="1400">1400ml/h</option>
											<option value="1300">1300ml/h</option>
											<option value="1200">1200ml/h</option>
											<option value="1100">1100ml/h</option>
											<option value="1000">1000ml/h</option>
											<option value="900">900ml/h</option>
											<option value="800">800ml/h</option>
											<option value="700">700ml/h</option>
											<option value="600">600ml/h</option>
											<option value="500">500ml/h</option>
											<option value="400">400ml/h</option>
											<option value="300">300ml/h</option>
							</select>
							<select id="select_bolusspeeddex" onchange="applybolusspeeddex();">
								<option value="6" selected></option>
								<option value="5"></option>
								<option value="4"></option>
								<option value="3"></option>
							</select>
						</td>
					</tr>
					<tr id="option_threshold_row" class="fr"><td style="letter-spacing:-0.5px;font-stretch:90%">Maintenance accuracy <i class="fas fa-question tooltip background ring"><span class="tooltiptext" style="width:170px">Threshold of CPT/CET schemes. Lazy: less frequent rate changes. Accurate: more frequent changes.</span></i></td>
						<td>
							<select id="select_threshold">
								<option value="0">Auto</option>
								<option value="1">Lazy</option>
								<option value="2">Accurate</option> <!--0.13, 0.565-->
							</select>
						</td>
					</tr>
					<tr id="option_unit_row"><td>Unit for propofol <i class="fas fa-question tooltip background ring"><span class="tooltiptext" style="width:160px">Secondary unit for propofol infusion rate apart from ml/h. Refresh your CPT/CET target after change.</span></i></td>
						<td>
							<select id="select_unit" onchange="unitlinkage(0)">
								<option value="mgh">mg/kg/h</option>
								<option value="mcgmin">mcg/kg/m</option>
							</select>
						</td>
					</tr>
					<tr class="" id="option_defaultrateunit"><td>Default rate unit <i class="fas fa-question tooltip background ring"><span class="tooltiptext" style="width:160px">Unit for entering manual mode infusion rate, e.g. "ml/h" vs "mg/kg/h" (or appropriate units)</span></i></td>
						<td>
							<select id="select_defaultrateunit">
								<option value="mlh">ml/h</option>
								<option value="unitkgtime">mg/kg/h</option>
							</select>
						</td>
					</tr>
					<tr class="" id="option_defaultbolusunit"><td>Default bolus unit <i class="fas fa-question tooltip background ring"><span class="tooltiptext" style="width:160px">Unit for entering manual mode bolus, e.g. "mg" vs "mg/kg" vs "ml" (or appropriate units)</span></i></td>
						<td>
							<select id="select_defaultbolusunit">
								<option value="mg">mg</option>
								<option value="mgkg">mg/kg</option>
								<option value="ml">ml</option>
							</select>
						</td>
					</tr>
					<tr id="option_simspeed_row"><td>Simspeed</td>
						<td>
							<select id="select_simspeed">
								<option value="1">1x (Normal)</option>
								<option value="5">5x (Fast)</option>
								<option value="25">25x (Very fast)</option>
								<option value="50">50x (Super fast)</option>
							</select>
						</td>
					</tr>
				</table>
			</div><!-- end infusion settings -->
			<div class="optionscardtitle collapsiblecard">PROGRAM FEATURES</div>
			<div class="optionscardcontents"><!-- start prograam features -->
				<table class="table-control">
					<tr class="fr"><td>Wakelock <i class="fas fa-question tooltip background ring"><span class="tooltiptext">Keeps screen on. Experimental. Android & some desktop devices only.</span></i></td>
						<td>
							<select id="select_wakelock">
								<option value="off">Off</option>
								<option value="on">On</option>
							</select>
						</td>
					</tr>
					<tr><td>Vibrate</td>
						<td>
							<select id="select_vibrate">
								<option value="off">Off</option>
								<option value="on">On</option>
							</select>
						</td>
					</tr>
					<tr><td>Sound</td>
						<td>
							<select id="select_sound">
								<option value="off">Off</option>
								<option value="on">On</option>
							</select>
						</td>
					</tr>

					<tr><td>Notifications</td>
						<td>
							<select id="select_notification">
								<option value="off">Off</option>
								<option value="on">On</option>
							</select>
						</td>
					</tr>
				</table>
			</div>
				<a class="button" id="btn_apply" onclick="applyoptions();">Apply</a>
				<a class="button right muted" id="btn_defaultoptions" onclick="loadoptions('default');loadoptions();applyoptions();">Reset settings</a>
				<!--
				<a class="button" id="btn_test_alert" onclick="testalert();">Test alert</a>
				<a class="button" id="btn_test_alertoff" onclick="testalertoff();">Alert Off</a>
				-->
			</div>
		</div>

`
const xModalsHTML = 
`		<div id="modalReset" class="modal">
			<div class="modal-content" id="modalResetcontent">
				<div class="modal-header">RELOAD</div>
				<div class="modal-body" style="">
					This will remove all patient data and start SimTIVA all over again. Are you sure?
					<div style="padding-top:1rem; text-align:center">
					<a class="button wide" onclick="location.reload();">Yes</a>
					<a class="button wide" onclick="hideallmodal();">No</a>
					</div>
				</div>
			</div>
		</div>
		<div id="modalRetrospective" class="modal">
			<div class="modal-content" id="modalRetrospectivecontent">
				<div class="modal-header">RETROSPECTIVE</div>
				<div class="modal-body" style="">
					<div style="padding:10px 0px">COURSE CORRECTION: 
					<br>This is to confirm that <span id="minsago">_</span> mins ago, i.e. at <span id="timeXago">_</span>...
					<br> - Bolus <span id="displayRetroBolus">_</span>mg was given, and
					<br> - Infusion rate was changed to <span id="displayRetroInfusion">_</span>ml/h.</div>
					<div style="padding:10px 0px">WARNING: 
					<br>Once you have confirmed this action, the CET/CPT targeting scheme will be automatically cleared. You need to enter a new target in CET/CPT mode as soon as possible.</div>
					<div style="padding-top:1rem; text-align:center">
					<a class="button wide invert" onclick="confirmretrospective();">Confirm</a>
					<a class="button" onclick="hideallmodal();hidemodal('modalRetrospective')">Cancel</a>
					</div>
				</div>
			</div>
		</div>
		<div id="modalHistory" class="modal">
			<div class="modal-content" id="modalHistorycontent">
				<div class="modal-header">PAST SCHEMES</div>
				<div class="modal-body" id="modalHistorytext">
				</div>
			</div>
		</div>
		<div id="modalExport" class="modal">
			<div class="modal-content" id="modalExportcontent">
				<div class="modal-header">EXPORT</div>
				<div class="modal-body" id="">
					This will export data to .CSV (comma-separated values): a file that can be opened in any spreadsheet program. The data can be used to plot graphs.
					<br>
					<br>Choose a time resolution (default is 10s) - which is the interval on the x-axis (lower value means more frequent data points). Choose the maximum duration of data capture (default is current time, in seconds); you can set this to up to two hours (7200s) beyond current time.
					
					<table class="table-control" style="border-radius:9px; background:rgba(128,128,128,0.2);margin-top:10px">
						<tr class="fr">
							<td>Time resolution (s)</td>
							<td><input type="number" inputmode="decimal" id="inputResolution" value="10" min="0" max="100000" step="1" placeholder=" " ></td>
						</tr>
						<tr>
							<td>Max duration (s)</td>
							<td><input type="number" inputmode="decimal" id="inputMaxDuration" min="0" max="1000000" step="1" placeholder=" "></td>
					</table>
					<br>
					<div style="padding-top:1rem; text-align:center">
					<a class="button wide invert" onclick="output(document.getElementById('inputResolution').value*1,document.getElementById('inputMaxDuration').value*1);hideallmodal();">Confirm</a><a class="button" onclick="hideallmodal();">Cancel</a>
					<a id="downloadfile" style="display:none;">HERE</a>
					</div>
				</div>
			</div>
		</div>
		<div id="modalDocumentation" class="modal">
			<div class="modal-content" id="modalDocumentationcontent">
				<div class="modal-header">DOCUMENTATION<span class="close" onClick="hidemodal('modalDocumentation')">&times;</span></div>
				<div class="modal-body" style="overflow-y:auto; height:70vh;">
					<b>Principles of TCI</b>
					<br>TCI, or target-controlled infusions, allow an anaesthetist to enter a desired 'target' concentration to be achieved in the patient's plasma or brain into a computer-programmed syringe pump that utilizes pharmacokinetic models which receive covariates such as age and body weight and then the pump will deliver the desired 'target' concentration accurately, via typically a bolus followed by a decreasing infusion rate. In this SIMTIVA app, it only recommends a bolus/infusion regimen that simulates TCI, but it does not function as a syringe pump, so you have to manually adjust the drug dosages.
					<br>
					<br>The principles, practices and explanations for the pharmacokinetic models are available from this resource: Guidelines for the safe practice of total intravenous anaesthesia (TIVA), by the Association of Anaesthetists and the Society for Intravenous Anaesthesia. <a href="https://doi.org/10.1111/anae.14428" target="_blank">https://doi.org/10.1111/anae.14428</a> 
					<br>
					<br>A pharmacokinetic model is a mathematical description of the distribution, metabolism and elimination of a drug in the body. The pharmacokinetic behaviour of most anaesthetic drugs used for TIVA can be predicted with a three‐compartment model. The drug is administered into the central compartment (V1), which represents the initial volume of distribution. The second (V2) and third (V3) compartments are mathematical constructs explaining rapid and slow redistribution of drug from V1 into highly perfused and less well perfused tissues, respectively. Rate constants describe the proportion of drug moving between compartments. A summary of the models used for propofol is available from this resource: Principles of total intravenous anaesthesia: basic pharmacokinetics and model descriptions by Al-Rifai Z et al. <a href="https://doi.org/10.1093/bjaceaccp/mkv021"  target="_blank">https://doi.org/10.1093/bjaceaccp/mkv021</a> In this app, the specific model parameters (vc, v2-3, k10 and other rate constants, ke0) are given in the 'Model parameters' section after initial data entry.
					<br>
					<br>List of references for models:
					<br><b>Marsh (Propofol)</b> - (BJA 1991;67:41-8), 'fast' ke0 (Anesthesiology 2000;92:399-406)
					<br><b>Schnider (Propofol)</b> - (Anesthesiology 1998;88:1170-82)
					<br><b>Paedfusor (Propofol)</b> - (BJA 2003;91(4)507-513), Tpeak method (age-dependent: 0.91min-1 at 1y to 0.15min-1 at 16y) (BJA 2008;100(4):509-516)
					<br><b>Eleveld (Propofol)</b> - (BJA 2018:120:942-959)
					<br><b>Minto (Propofol)</b> - (Anesthesiology 1997;86:10-23)
					<br><b>Eleveld (Remifentanil)</b> - (Anesthesiology 2017;126:1005-18)
					<br><b>Shafer (Fentanyl)</b> - (Original model, no coparameters: Anesthesiology 1990;73(6):1091-1102, Weight-adjusted model: Anesthesiology 2004;101:603-13), derived from t1/2ke0 of 6.6min (Scott & Stanski, Anesthesiology 1991;74:34042)
					<br><b>Maitre (Alfentanil)</b> - (Anesthesiology 1987;66:3-12), ke0 derived from Scott & Stanski (J Pharmacol Exp Ther 1987;240:159-166)
					<br><b>Hannivoort (Dexmedetomidine)</b> - (Anesthesiology 2015;123:357-367), ke0 (MOAA-Sedation scale) from Colin (BJA 2017; 119:200-210)
					<br><b>Kamp (Ketamine)</b> - (Anesthesiology 2020;133(6):1192-1213), ke0 (analgesia nociception index) from Navarette (J Clin Monit Comput 2025;39(2):349-354)
					<div class="collapsible">Model calculations in details</div>
              			<div class="collapsiblecontent">
              				<b>Marsh</b>
              				<div class='modelboxcontainer'>
              				<div class='modelbox'>
              				<b>vc</b> = 0.228 * mass;
							<br><b>k10</b> = 0.119;
							<br><b>k12</b> = 0.112;
							<br><b>k13</b> = 0.0419;
							<br><b>k21</b> = 0.055;
							<br><b>k31</b> = 0.0033;
							<br><b>ke0</b> = 1.21;
							</div>
							</div>
							<br><b>Schnider</b>
							<div class='modelboxcontainer'>
							<div class='modelbox'>
							<b>vc</b> = 4.27;
							<br><b>v2</b> = 18.9-0.391*(age-53);
							<br><b>v3</b> = 238;
							<br><b>cl1</b> = 1.89+0.0456*(mass-77)-0.0681*(lbm-59)+0.0264*(height-177);
							<br><b>cl2</b> = 1.29-0.024*(age-53); 
							<br><b>cl3</b> = 0.836;
							<br><b>ke0</b> = 0.456;
							<br>where rate constants are:
							<br>k10 = cl1 / vc;
							<br>k12 = cl2 / vc;
							<br>k13 = cl3 / vc;
							<br>k21 = cl2 / v2;
							<br>k31 = cl3 / v3;
							</div>
							</div>
							<br><b>Paedfusor</b>
							<div class='modelboxcontainer'>
							<div class='modelbox'>
							<b>k12</b> = 0.114;
							<br><b>k13</b> = 0.0419;
							<br><b>k21</b> = 0.055;
							<br><b>k31</b> = 0.0033;
							<br><b>ke0</b> = 1.03*Math.exp(-0.12*age);
							<br>if (age<13) { vc = 0.458 * mass; k10 = 0.153 * Math.pow(mass, -0.3);}
							<br>&nbsp;&nbsp;else if (age>=13 && age<14) {vc = 0.4 * mass; k10 = 0.0678;}
							<br>&nbsp;&nbsp;else if (age>=14 && age<15) {vc = 0.342 * mass; k10 = 0.0792;}	
							<br>&nbsp;&nbsp;else if (age>=15 && age<16) {vc = 0.284 * mass;	k10 = 0.0954;}
							<br>&nbsp;&nbsp;else if (age>=16) {vc = 0.229 * mass; k10 = 0.119;}
							</div>
							</div>
							<br><b>Eleveld (Propofol)</b>
							<div class='modelboxcontainer wide'>
							<div class='modelbox'>
							<b>vc</b> = 6.28 * fcentral(mass)/fcentral(70);
							<br><b>v2</b> = 25.5 * mass/70 * fageing(-0.0156);
							<br>if (opioid == 1) 
							<br>&nbsp;&nbsp;{<b>v3</b> = 273 * <b>fffm()</b>/ffmref*Math.exp(-0.0138*age)}
							<br>&nbsp;&nbsp;else {<b>v3</b> = 273 * <b>fffm()</b>/ffmref}
							<br>if (male)
							<br>&nbsp;&nbsp;if (opioid == 1)
							<br>&nbsp;&nbsp;&nbsp;&nbsp;{<b>cl1</b> = 1.79 * Math.pow(mass/70,0.75) * (<b>fclmaturation</b>(PMA)/<b>fclmaturation</b>(35*toweeks+40))* Math.exp(-0.00286*age)}
							<br>&nbsp;&nbsp;&nbsp;&nbsp;else {<b>cl1</b> = 1.79 * Math.pow(mass/70,0.75) * (<b>fclmaturation</b>(PMA)/<b>fclmaturation</b>(35*toweeks+40))}
							<br>if (female)
							<br>&nbsp;&nbsp;if (opioid == 1)
							<br>&nbsp;&nbsp;&nbsp;&nbsp;{<b>cl1</b> = 2.1 * Math.pow(mass/70,0.75) * (<b>fclmaturation</b>(PMA)/<b>fclmaturation</b>(35*toweeks+40))* Math.exp(-0.00286*age)}
							<br>&nbsp;&nbsp;&nbsp;&nbsp;else {<b>cl1</b> = 2.1 * Math.pow(mass/70,0.75) * (<b>fclmaturation(PMA)</b>/<b>fclmaturation</b>(35*toweeks+40))}
							<br><b>cl2</b> = 1.75 * Math.pow(v2/v2ref,0.75)* (1 + 1.3*(1-<b>fq3maturation</b>(age*toweeks)));
							<br><b>cl3</b> = 1.11 * Math.pow(v3/v3ref,0.75)*(<b>fq3maturation</b>(age*toweeks)/<b>fq3maturation</b>(35*toweeks));
							<br><b>ke0</b> = 0.146 * Math.pow(mass/70,-0.25); 
							<br>where constants are defined as: v2ref = 25.5; v3ref = 273; ffmref = (0.88 + (1-0.88)/(1 + Math.pow((35/13.4),-12.7))) * ((9270 * 70)/(6680+216*24.22145)); 
							<br>where rate constants are:
							<br>k10 = cl1 / vc;
							<br>k12 = cl2 / vc;
							<br>k13 = cl3 / vc;
							<br>k21 = cl2 / v2;
							<br>k31 = cl3 / v3;
							<br>where the mathematical functions for fcentral, fffm, fageing, fclmaturation and fq3maturation are defined as follows:
							<br>fcentral(x) = fsigmoid(x,33.6,1);
							<br>fffm() = 0.88 + (1-0.88)/(1 + Math.pow((age/13.4),-12.7))) * ((9270 * mass)/(6680+216*bmi) for males;
							<br>fffm() = 1.11 + (1-1.11)/(1 + Math.pow((age/7.1),-1.1))) * ((9270 * mass)/(8780+244*bmi) for females;
							<br>&nbsp;&nbsp;where bmi = mass / Math.pow((height/100),2);
							<br>fageing(x) = Math.exp(x*(age-35));
							<br>fclmaturation(x) = fsigmoid(x,42.3,9.06);
							<br>fq3maturation(x) = fsigmoid(x+40, 68.3, 1);
							<br>where the sigmoid function fsigmoid is defined as:
							<br>fsigmoid(x,y,z) = Math.pow(x,z) / (Math.pow(x,z) + Math.pow(y,z));
							<br>where PMA is post-menstrual age (in weeks) and the constant toweeks is 52.1429 and PMA defaulted to age*toweeks+40 arbitrarily where PMA not specified.
							<br>other notes: 
							<br>v3 and cl1 are dependant on the presence and absence of concomitant opioid, as defined by opioid=1 or opioid=0 respectively. 
							<br>v3 is dependent on ffm, which is in turn dependent on gender. cl1 is dependent on gender.
							</div>
							</div>
							<br><b>Minto</b>
							<div class='modelboxcontainer'>
							<div class='modelbox'>
							<b>vc</b> = 5.1-0.0201*(age-40)+0.072*(lbm-55)
							<br><b>v2</b> = 9.82-0.0811*(age-40)+0.108*(lbm-55)
							<br><b>v3</b> = 5.42
							<br><b>cl1</b> = 2.6-0.0162*(age-40)+0.0191*(lbm-55)
							<br><b>cl2</b> = 2.05-0.0301*(age-40)
							<br><b>cl3</b> = 0.076-0.00113*(age-40)
							<br>where rate constants are:
							<br>k10 = cl1 / vc;
							<br>k12 = cl2 / vc;
							<br>k13 = cl3 / vc;
							<br>k21 = cl2 / v2;
							<br>k31 = cl3 / v3;
							<br><b>ke0</b> = 0.595-0.007*(age-40)
							</div>
							</div>
							<br><b>Eleveld (Remifentanil)</b>
							<div class='modelboxcontainer wide'>
							<div class='modelbox'>
							<b>vc</b> = 5.81 * size * fageing(-0.00554);
							<br><b>v2</b> = 8.82 * size * fageing(-0.00327) * ksex;
							<br><b>v3</b> = 5.03 * size * fageing(-0.0315) * Math.exp((-0.026)*(mass-70));
							<br><b>cl1</b> = 2.58 * Math.pow(size,0.75) * (fsigmoid(mass,2.88,2)/fsigmoid(70,2.88,2)) * ksex * fageing(-0.00327);
							<br><b>cl2</b> = 1.72 * Math.pow(v2/8.82,0.75) * fageing(-0.00554) * ksex;
							<br><b>cl3</b> = 0.124 * Math.pow(v3/5.03,0.75) * fageing(-0.00554);
							<br><b>ke0</b> = 1.09 * fageing(-0.0289);
							<br>where the custom variable size is defined as [fffm()/ffmref] and the custom constant ksex is defined as: 
							<br>if (male) {
							<br>&nbsp;&nbsp;ksex = 1;
							<br>} else {
							<br>&nbsp;&nbsp;ksex = 1 + 0.47 * fsigmoid(age,12,6) * (1 - fsigmoid(age,45,6));
							<br>}
							<br>and where the constant ffmref, and the custom functions: fffm(), fageing, fsigmoid are defined in the same way as the Eleveld-Propofol model above.
							<br>
		}
							</div>
							</div>
              			</div>
					<div style="padding-top:1rem; text-align:center">
					<a class="button wide" onclick="hideallmodal();">Back</a>
					</div>
				</div>
			</div>
		</div>
		<div id="modalShare" class="modal">
			<div class="modal-content" id="modalSharecontent">
				<div class="modal-header">SHARE / SAVE<span class="close" onClick="hidemodal('modalShare')">&times;</span></div>
				<div class="modal-body">
					<div>File Name (Max 32 char.)</div>
					<div><input id="inputFileName" class="shareinput" onkeyup="updatedatatext()" placeholder="(optional)"></div>

					<div id="sharecontainer">

					<div id="shareimagecontainer">
						<div style="margin:0; padding:0; height: calc(35vh + 2rem); text-align: center">
							<span style="font-size:0.8rem; opacity:0.7; letter-spacing: 1px; font-weight: bold">
								IMAGE PREVIEW
							</span>
							<img id="shareimage">
						</div>
						<div style="text-align:center; padding-bottom:10px"><a class="button tinybutton" id="btn_shareimg" onclick="outputimage(1,document.getElementById('inputFileName').value);"><i class="fas fa-share-square fa-fw"></i>Share</a><a class="button tinybutton" id="btn_downloadimg" onclick="outputimage(0,document.getElementById('inputFileName').value);"><i class="fas fa-file-download fa-fw"></i>Download</a></div>
					</div><!--

					--><div id="sharedatacontainer">
						<div style="margin:0; padding:0; height: calc(35vh + 2rem); text-align: center; position: relative; overflow:hidden">
							<span style="font-size:80%; opacity:0.7; letter-spacing: 1px; font-weight: bold">
								DATA/WEB LINK
							</span>
							<textarea readonly id="sharedatatext"></textarea>
							<div id="copycheckmark"><i class="fas fa-check fa-fw"></i>copied</div>
						</div>
						<div style="text-align:center; padding-bottom: 10px"><a class="button tinybutton" id="btn_shareweblink" onclick="shareViewURL();"><i class="fas fa-link fa-fw"></i>Share</a><a class="button tinybutton" id="btn_copydatatext"  onclick="copyfunction();"><i class="fas fa-clipboard fa-fw"></i>Copy</a></div>
					</div>

					</div> <!--end sharecontainer -->
				</div>
			</div>
		</div>
		<div id="modalAnnotate" class="modal">
			<div class="modal-content" id="modalAnnotatecontent">
				<div class="modal-header" id="modalAnnotatetitle">ADD EVENT<span class="close" onClick="hidemodal('modalAnnotate')">&times;</span></div>
				<div class="modal-body">
					<div style="font-weight:bold; font-style:italic">
					Enter time of event:
					</div>
					<table class="time-select-container">
						<tr style="opacity:0.7">
							<td class="hidehours">Hrs</td>
							<td class="hidehours"></td>
							<td>Min</td>
							<td></td>
							<td>Sec</td>
							<td></td>
						</tr>
						<tr>
							<td class="hidehours" style="cursor: pointer" onclick="deltahours(1);"><i class="fas fa-chevron-up"></i></td>
							<td class="hidehours"></td>
							<td style="cursor: pointer" onclick="deltaminutes(1);"><i class="fas fa-chevron-up"></i></td>
							<td></td>
							<td style="cursor: pointer" onclick="deltaseconds(1)"><i class="fas fa-chevron-up"></i></td>
							<td></td>
						</tr>
						<tr>
							<td class="hidehours">
								<select id="hh" class="time-select">
									<option value="0">00</option>
									<option value="1">01</option>
									<option value="2">02</option>
									<option value="3">03</option>
									<option value="4">04</option>
									<option value="5">05</option>
									<option value="6">06</option>
									<option value="7">07</option>
									<option value="8">08</option>
									<option value="9">09</option>
								</select>
							</td>
							<td class="hidehours">&nbsp;:&nbsp;</td>
							<td>
								<select id="mm" class="time-select">
									<option value="0">00</option>
									<option value="1">01</option>
									<option value="2">02</option>
									<option value="3">03</option>
									<option value="4">04</option>
									<option value="5">05</option>
									<option value="6">06</option>
									<option value="7">07</option>
									<option value="8">08</option>
									<option value="9">09</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
									<option value="13">13</option>
									<option value="14">14</option>
									<option value="15">15</option>
									<option value="16">16</option>
									<option value="17">17</option>
									<option value="18">18</option>
									<option value="19">19</option>
									<option value="20">20</option>
									<option value="21">21</option>
									<option value="22">22</option>
									<option value="23">23</option>
									<option value="24">24</option>
									<option value="25">25</option>
									<option value="26">26</option>
									<option value="27">27</option>
									<option value="28">28</option>
									<option value="29">29</option>
									<option value="30">30</option>
									<option value="31">31</option>
									<option value="32">32</option>
									<option value="33">33</option>
									<option value="34">34</option>
									<option value="35">35</option>
									<option value="36">36</option>
									<option value="37">37</option>
									<option value="38">38</option>
									<option value="39">39</option>
									<option value="40">40</option>
									<option value="41">41</option>
									<option value="42">42</option>
									<option value="43">43</option>
									<option value="44">44</option>
									<option value="45">45</option>
									<option value="46">46</option>
									<option value="47">47</option>
									<option value="48">48</option>
									<option value="49">49</option>
									<option value="50">50</option>
									<option value="51">51</option>
									<option value="52">52</option>
									<option value="53">53</option>
									<option value="54">54</option>
									<option value="55">55</option>
									<option value="56">56</option>
									<option value="57">57</option>
									<option value="58">58</option>
									<option value="59">59</option>
								</select>
							</td>
							<td>&nbsp;:&nbsp;</td>
							<td>
								<select id="ss" class="time-select">
									<option value="0">00</option>
									<option value="1">01</option>
									<option value="2">02</option>
									<option value="3">03</option>
									<option value="4">04</option>
									<option value="5">05</option>
									<option value="6">06</option>
									<option value="7">07</option>
									<option value="8">08</option>
									<option value="9">09</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
									<option value="13">13</option>
									<option value="14">14</option>
									<option value="15">15</option>
									<option value="16">16</option>
									<option value="17">17</option>
									<option value="18">18</option>
									<option value="19">19</option>
									<option value="20">20</option>
									<option value="21">21</option>
									<option value="22">22</option>
									<option value="23">23</option>
									<option value="24">24</option>
									<option value="25">25</option>
									<option value="26">26</option>
									<option value="27">27</option>
									<option value="28">28</option>
									<option value="29">29</option>
									<option value="30">30</option>
									<option value="31">31</option>
									<option value="32">32</option>
									<option value="33">33</option>
									<option value="34">34</option>
									<option value="35">35</option>
									<option value="36">36</option>
									<option value="37">37</option>
									<option value="38">38</option>
									<option value="39">39</option>
									<option value="40">40</option>
									<option value="41">41</option>
									<option value="42">42</option>
									<option value="43">43</option>
									<option value="44">44</option>
									<option value="45">45</option>
									<option value="46">46</option>
									<option value="47">47</option>
									<option value="48">48</option>
									<option value="49">49</option>
									<option value="50">50</option>
									<option value="51">51</option>
									<option value="52">52</option>
									<option value="53">53</option>
									<option value="54">54</option>
									<option value="55">55</option>
									<option value="56">56</option>
									<option value="57">57</option>
									<option value="58">58</option>
									<option value="59">59</option>
								</select>
							</td>
							<td><a style = "cursor: pointer" onclick="setnow(Math.floor(time_in_s));">&nbsp; Now</a></td>
						</tr>
						<tr>
							<td class="hidehours" style="cursor: pointer" onclick="deltahours(-1)"><i class="fas fa-chevron-down"></i></td>
							<td class="hidehours"></td>
							<td style="cursor: pointer" onclick="deltaminutes(-1)"><i class="fas fa-chevron-down"></i></td>
							<td></td>
							<td style="cursor: pointer" onclick="deltaseconds(-1)"><i class="fas fa-chevron-down"></i></td>
							<td></td>
						</tr>
					</table>
					<div style="padding-top: 18px; font-weight:bold; font-style:italic">
					Enter event note:
					</div>
					<textarea id="addeventtext"></textarea>
					<div style="padding-top:18px">
						<a class="button invert" id="btn_submitevent" onclick="createEvent2(-1);">SUBMIT</a>
						<a class="button muted right" onclick="modal=document.getElementById('modalAnnotate');hideallmodal()">CANCEL</a>
						<a class="button muted right" onclick="deleteevent();" id="btn_deleteevent" style="display:none">DELETE</a>

					</div>
				</div>
			</div>
		</div>
		<div id="modalJump" class="modal">
			<div class="modal-content" id="modalJumpcontent">
				<div class="modal-header" id="modalJumptitle">Jump to time<span class="close" onClick="hidemodal('modalJump')">&times;</span></div>
				<div class="modal-body">
					<div style="font-weight:bold; font-style:italic">
					Choose an action
					</div>
					<select id="timeFxTimeMode" onchange="setnow2(Math.floor(time_in_s))" style="width:100%">
						<option value="0">Move forward (relative to present)</option>
						<option value="1">Move backward (relative to present)</option>
						<option value="2" selected>Jump to time point</option>
					</select>
					<table class="time-select-container">
						<tr style="opacity:0.7">
							<td class="">Hrs</td>
							<td class=""></td>
							<td>Min</td>
							<td></td>
							<td>Sec</td>
							<td></td>
						</tr>
						<tr>
							<td class="" style="cursor: pointer" onclick="deltahours2(1);"><i class="fas fa-chevron-up"></i></td>
							<td class=""></td>
							<td style="cursor: pointer" onclick="deltaminutes2(1);"><i class="fas fa-chevron-up"></i></td>
							<td></td>
							<td style="cursor: pointer" onclick="deltaseconds2(1)"><i class="fas fa-chevron-up"></i></td>
							<td></td>
						</tr>
						<tr>
							<td class="">
								<select id="hh2" class="time-select">
									<option value="0">00</option>
									<option value="1">01</option>
									<option value="2">02</option>
									<option value="3">03</option>
									<option value="4">04</option>
									<option value="5">05</option>
									<option value="6">06</option>
									<option value="7">07</option>
									<option value="8">08</option>
									<option value="9">09</option>
								</select>
							</td>
							<td class="">&nbsp;:&nbsp;</td>
							<td>
								<select id="mm2" class="time-select">
									<option value="0">00</option>
									<option value="1">01</option>
									<option value="2">02</option>
									<option value="3">03</option>
									<option value="4">04</option>
									<option value="5">05</option>
									<option value="6">06</option>
									<option value="7">07</option>
									<option value="8">08</option>
									<option value="9">09</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
									<option value="13">13</option>
									<option value="14">14</option>
									<option value="15">15</option>
									<option value="16">16</option>
									<option value="17">17</option>
									<option value="18">18</option>
									<option value="19">19</option>
									<option value="20">20</option>
									<option value="21">21</option>
									<option value="22">22</option>
									<option value="23">23</option>
									<option value="24">24</option>
									<option value="25">25</option>
									<option value="26">26</option>
									<option value="27">27</option>
									<option value="28">28</option>
									<option value="29">29</option>
									<option value="30">30</option>
									<option value="31">31</option>
									<option value="32">32</option>
									<option value="33">33</option>
									<option value="34">34</option>
									<option value="35">35</option>
									<option value="36">36</option>
									<option value="37">37</option>
									<option value="38">38</option>
									<option value="39">39</option>
									<option value="40">40</option>
									<option value="41">41</option>
									<option value="42">42</option>
									<option value="43">43</option>
									<option value="44">44</option>
									<option value="45">45</option>
									<option value="46">46</option>
									<option value="47">47</option>
									<option value="48">48</option>
									<option value="49">49</option>
									<option value="50">50</option>
									<option value="51">51</option>
									<option value="52">52</option>
									<option value="53">53</option>
									<option value="54">54</option>
									<option value="55">55</option>
									<option value="56">56</option>
									<option value="57">57</option>
									<option value="58">58</option>
									<option value="59">59</option>
								</select>
							</td>
							<td>&nbsp;:&nbsp;</td>
							<td>
								<select id="ss2" class="time-select">
									<option value="0">00</option>
									<option value="1">01</option>
									<option value="2">02</option>
									<option value="3">03</option>
									<option value="4">04</option>
									<option value="5">05</option>
									<option value="6">06</option>
									<option value="7">07</option>
									<option value="8">08</option>
									<option value="9">09</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
									<option value="13">13</option>
									<option value="14">14</option>
									<option value="15">15</option>
									<option value="16">16</option>
									<option value="17">17</option>
									<option value="18">18</option>
									<option value="19">19</option>
									<option value="20">20</option>
									<option value="21">21</option>
									<option value="22">22</option>
									<option value="23">23</option>
									<option value="24">24</option>
									<option value="25">25</option>
									<option value="26">26</option>
									<option value="27">27</option>
									<option value="28">28</option>
									<option value="29">29</option>
									<option value="30">30</option>
									<option value="31">31</option>
									<option value="32">32</option>
									<option value="33">33</option>
									<option value="34">34</option>
									<option value="35">35</option>
									<option value="36">36</option>
									<option value="37">37</option>
									<option value="38">38</option>
									<option value="39">39</option>
									<option value="40">40</option>
									<option value="41">41</option>
									<option value="42">42</option>
									<option value="43">43</option>
									<option value="44">44</option>
									<option value="45">45</option>
									<option value="46">46</option>
									<option value="47">47</option>
									<option value="48">48</option>
									<option value="49">49</option>
									<option value="50">50</option>
									<option value="51">51</option>
									<option value="52">52</option>
									<option value="53">53</option>
									<option value="54">54</option>
									<option value="55">55</option>
									<option value="56">56</option>
									<option value="57">57</option>
									<option value="58">58</option>
									<option value="59">59</option>
								</select>
							</td>
							<td><a style = "cursor: pointer" onclick="setnow2(Math.floor(time_in_s));">&nbsp; Now</a></td>
						</tr>
						<tr>
							<td class="" style="cursor: pointer" onclick="deltahours2(-1)"><i class="fas fa-chevron-down"></i></td>
							<td class=""></td>
							<td style="cursor: pointer" onclick="deltaminutes2(-1)"><i class="fas fa-chevron-down"></i></td>
							<td></td>
							<td style="cursor: pointer" onclick="deltaseconds2(-1)"><i class="fas fa-chevron-down"></i></td>
							<td></td>
						</tr>
					</table>
					<div id="timeFxMessage"></div>
					<div style="padding-top:18px">
						<a class="button invert" id="btn_submitjump" onclick="timeFxSubmitJump();">SUBMIT</a>
						<a class="button muted right" onclick="modal=document.getElementById('modalJump');hideallmodal()">CANCEL</a>

					</div>
				</div>
			</div>
		</div><!--end modalJump-->
`

document.getElementById('inputBW').addEventListener('blur',dynamicLoad);
//triggers dynamic load with 3s delay
if (document.title != "SimTIVA Viewer") {
	//window.onload = setTimeout(dynamicLoad,3000);	
}


function dynamicLoad() {
	if (initiated == false) {
	console.log("initiation. component swaps ready.");
	document.getElementById("parallax2").innerHTML = parallax2HTML;
	document.getElementById("xInputCards").innerHTML = xInputCardsHTML;
	document.getElementById("xLeftbar").innerHTML = xLeftbarHTML;
	document.getElementById("xCards").innerHTML = xCardsHTML;
	document.getElementById("xModals").innerHTML = xModalsHTML;
	document.querySelector(".social").innerHTML = socialHTML;
	collapsiblefunction();
	document.getElementById("hamburger").style.display = "block";
	document.getElementById("bodywrapper").style.opacity = 1;
	document.getElementById("parallax3").style.opacity = 1;
	jumpEnd();
	initiated = true;
	}
}

function dynamicLoadVIEW() {

}

function collapsiblefunction() {
	let collapsibles = document.getElementsByClassName("collapsible");
	let i;

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

	let collapsiblecards = document.getElementsByClassName("collapsiblecard");

	for (i=0; i<collapsiblecards.length; i++) {
		collapsiblecards[i].nextElementSibling.style.display = "none";
		collapsiblecards[i].nextElementSibling.classList.add("collapsed");
		collapsiblecards[i].addEventListener("click", function() {
			toggleCard(this);
		});
	}
}