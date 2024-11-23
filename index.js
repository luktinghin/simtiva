const componentsCardsHTML = `
		<div id="ptolcard" class="">
			<div id="ptolcard_left" style="padding:0.5rem;flex-basis:70%">
				<div style="font-size:200%;font-weight:bold;line-height:1" id=""><span id="ptoltitle">PTOL</span><span id="ptoltooltip" onclick="ptolwarning();" style="display:none"><i class="far fa-question-circle"></i></span></div>
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

`
const componentsModalsHTML = 
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
					<br>Marsh - (BJA 1991;67:41-8), 'fast' ke0 (Anesthesiology 2000;92:399-406)
					<br>Schnider - (Anesthesiology 1998;88:1170-82)
					<br>Paedfusor - (BJA 2003;91(4)507-513), Tpeak method (age-dependent: 0.91min-1 at 1y to 0.15min-1 at 16y) (BJA 2008;100(4):509-516)
					<br>Eleveld (Propofol) - (BJA 2018:120:942-959)
					<br>Minto - (Anesthesiology 1997;86:10-23)
					<br>Eleveld (Remifentanil) - (Anesthesiology 2017;126:1005-18)
					<div class="collapsible">Model calculations in details</div>
              			<div class="collapsiblecontent">
              				<b>Marsh</b>
              				<br>vc = 0.228 * mass;
							<br>k10 = 0.119;
							<br>k12 = 0.112;
							<br>k13 = 0.0419;
							<br>k21 = 0.055;
							<br>k31 = 0.0033;
							<br>ke0 = 1.21;
							<br>
							<br><b>Schnider</b>
							<br>vc = 4.27;
							<br>v2 = 18.9-0.391*(age-53);
							<br>v3 = 238;
							<br>cl1 = 1.89+0.0456*(mass-77)-0.0681*(lbm-59)+0.0264*(height-177);
							<br>cl2 = 1.29-0.024*(age-53); 
							<br>cl3 = 0.836;
							<br>k10 = cl1 / vc;
							<br>k12 = cl2 / vc;
							<br>k13 = cl3 / vc;
							<br>k21 = cl2 / v2;
							<br>k31 = cl3 / v3;
							<br>ke0 = 0.456;
							<br>
							<br><b>Paedfusor</b>
							<br>k12 = 0.114;
							<br>k13 = 0.0419;
							<br>k21 = 0.055;
							<br>k31 = 0.0033;
							<br>ke0 = 1.03*Math.exp(-0.12*age);
							<br>if (age<13) { vc = 0.458 * mass; k10 = 0.153 * Math.pow(mass, -0.3);}
							<br>&nbsp;&nbsp;else if (age>=13 && age<14) {vc = 0.4 * mass; k10 = 0.0678;}
							<br>&nbsp;&nbsp;else if (age>=14 && age<15) {vc = 0.342 * mass; k10 = 0.0792;}	
							<br>&nbsp;&nbsp;else if (age>=15 && age<16) {vc = 0.284 * mass;	k10 = 0.0954;}
							<br>&nbsp;&nbsp;else if (age>=16) {vc = 0.229 * mass; k10 = 0.119;}
							<br>
							<br><b>Eleveld (Propofol)</b>
							<div class="imageholder">
								<img src="eleveld1.gif" class="imagecontent" loading="lazy"><img src="eleveld2.gif" class="imagecontent" loading="lazy">
							</div>
							<br>
							<br><b>Minto</b>
							<br>vc = 5.1-0.0201*(age-40)+0.072*(lbm-55)
							<br>v2=9.82-0.0811*(age-40)+0.108*(lbm-55)
							<br>v3=5.42
							<br>cl1=2.6-0.0162*(age-40)+0.0191*(lbm-55)
							<br>cl2=2.05-0.0301*(age-40)
							<br>cl3=0.076-0.00113*(age-40)
							<br>ke0=0.595-0.007*(age-40)
							<br>
							<br><b>Eleveld (Remifentanil)</b>
							<div class="imageholder">
								<img src="eleveld-r.png" class="imagecontent" loading="lazy">
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

window.onLoad = dynamicLoad();

function dynamicLoad() {
	document.getElementById("componentsCards").innerHTML = componentsCardsHTML;
	document.getElementById("componentsModals").innerHTML = componentsModalsHTML;
}

