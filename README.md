# SimTIVA
 Free Web App to Simulate TCI/TIVA
 
 [https://simtiva.app](http://simtiva.app)

### About
SimTIVA is a computer simulation program to simulate the delivery of TCI/TIVA. It is a progressive web app and can be run in desktop and mobile browsers across all platforms. Broad cross platform support based on modern web technology means it can be accessed on a wide range of devices. In addition, a simple installation process enables SimTIVA to be run like a native app on your device, and even without internet access. 

This is an open source project (released on GitHub since Nov 2023); created by Terence Luk (since [2020](https://www.facebook.com/luktinghin/posts/pfbid0TdPSFNjXcDJWWjFct3oNePPo9WGNZnvn91E8idgDesUB78E2m2dqAuU9sijDVPBYl)); licensed under GNU General Public License v3.0.

Coding is done in JavaScript. The code to mathematical calculations are based on STANPUMP, created by Dr. Steven Shafer, freely available on [OpenTCI](http://opentci.org/code/stanpump).

The pharmacological models include the following:
- Marsh, Schnider, Eleveld and Paefusor (Propofol)
- Shafer (Fentanyl)
- Minto & Eleveld (Remifentanil)
- Maitre (Alfentanil)
- Dexmedetomidine (Hannivoort)
- Kamp (Ketamine)

Several modes are available on SimTIVA app. CP/CE targeting is useful if you want to emulate the behavior of a TCI pump. An infusion scheme will be generated to guide you to achieve a CP or CE target using any ordinary syringe pump without TCI functionality. Manual mode allows you to input bolus and infusion doses and SimTIVA will calculate the CE/CP in response to these doses and plot the result over time. 

A complex (dual) mode is also available. It explores the PD interaction of propofol-opioid, and the synergistic effect is studied by a parameter called PTOL (probability of tolerance to laryngoscopy). An isobologram is used to visualize the synergistic effect in real time and across various time points.

### Purpose
- To simulate TCI and TIVA pharmacokinetics for educational purpose
- To help deliver TCI in a setting where TCI pumps are not available

### Changelog
 Version 5.4 (Build 169) Current
 - Ketamine (Kamp model) added.
 - UI: clicking outside of graph options panel will dismiss options popup
 - UI: clicking outside of manual mode unit selector dropdown (ml/h, mg/kg/h etc) will dismiss dropdown box
 - Bugfix: fixed issue of preview_CPT vs deliver_CPT rate schemes mismatched due to timestamp miscalculation; viewer app: drug concentration properly displayed; fixed issue of failure to proceed to manual mode after extreme body habitus warning popup box dismissed; rounding of model parameters to 2 decimal places; improved initial graph scaling for alfentanil and ketamine
   
 Version 5.3 (Build 160) 
 - Offline access: fully support offline access with "cache first" service worker
 - Bugfix: mcg/kg/m unit in manual mode
   
 Version 5.2 (Build 150) 
 - Propofol concentration: 10mg/ml, 20mg/ml, and custom dilution
 - Bugfix: Visual fixes and data validation on initial page
 - Visual improvements and bugfixes for fullscreen mode

 Version 5.1 (Build 143) 
 - RSI mode: facilitates RSI using TIVA. User entry of CE target, time to reach CE, and bolus speed. Infusion scheme with bolus size, pause time, with display of expected CE overshoot at peak.
 - Dexmedetomidine (Hannivoort model): CP/CE/Manual modes. Safety feature: bolus speed for loading dose (if any) is limited <6mcg/kg/h
 - Fullscreen mode bug fixes and visual improvements
 - CP targeting infusion scheme time delay bug fixed
 - Vertical (Y-axis) scale can now be adjusted
   
 Version 5.0 (Build 125) 
 - UI/UX improvement: status bar with next change prompt for CPT/CET modes
 - UI/UX in iOS: optimized landscape display with compliance to "safe areas"
 - Performance improvements: deleted fontawesome-regular file and optimized loading times; division into smaller sections of CSS/JS files

 Version 4.84 (Build 118)
 - New feature: bolus speed - allow user entry of induction bolus speed in CPT/CET mode, from 300ml/h to 1200ml/h, or flash (instantaneous)
 - Bugfix: scheme generation bug in "share module"
 - Viewer app bugfixes
 - UI changes: options module layout changed

 Version 4.81 (Build 111) 
 - Updated manual (v2.0) to add chapter on Advanced Features & Eleveld Emulation
 - Improved graph dimensions on computer/widescreen devices
 - Corrected minor issues (incorrect reference for pharmacodynamic interaction, arrow symbol in complex mode, bug on loading complex mode simfile)
   
 Version 4.8 (Build 109) 
 - Feature: Emulation of Eleveld model when using Marsh/Schnider model
 - Feature: Adjusted body weight for Marsh & Schnider with information prompt
 - BW validation: only extreme BMI (e.g. BMI>=35) will trigger warning screen
 - UI/UX: Omitted the "I confirm" and "Disclaimer" check on front screen
 - Bugfixes: error in displaying model parameters after re-selecting a model
 
 Version 4.7 (Build 102)
 - Bugfixes: graph options, eBIS after pause
 - Infusion duration increased to 6 hours (previously 2 hours)
 - User Manual: initial release
   
 Version 4.6 (Build 100) 
 - Model: Eleveld "without opioid" is added.
 - Control panel: controls the timeline. Quick reset: reset the infusion data. Pause: pause the simulation at current time instance. Jump: jump forward or backward in time.
   
 Version 4.5 (Build 97) 
 - Updated the UI for CPT and CET modes with more compact interface design
 - Sophisticated "preview box" can be viewed by clicking "expand" - previews the full scheme ahead for CPT/CET modes
 - Corrected the CPT algorithm - previously, increasing CPT will overshoot the CP and decreasing the CPT will cause premature re-start of infusion
 - Improved support for widescreen devices particularly in complex/dual mode
 - Bugfix in Safari browser, MacOS
   
 Version 4.4 (Build 96)
 - Bolus/Infusion unit function: manual mode - can change infusion unit from "ml/h" to "mg/kg/h" (or appropriate units) & change the bolus unit from "mg" to "mg/kg" or "ml" (or appropriate units)
 - Corrected algorithm in decremental infusion rates for reducing target in CET mode
 - Bug fixes
   
 Version 4.3 (Build 94) 
 - Added CeT and CpT quick edit function in Fullscreen mode 
 
 Version 4.2 (Build 91)
 - Export/Import functions: handling of external .CSV database
 - Bolus dose in CPT/CET now includes ML in preview
 - Fentanyl CPT/CET: calculation bugfix
 - Chart: labels for axes
 
 Version 4.1 (Build 89)
 - Fullscreen mode, ability to explore the infusion rates over time
 - Optimization for iOS

 Version 4.0
 - Complex (dual) mode to explore PD interaction using PTOL index (probability of tolerance to laryngoscopy)
 - eBIS for Eleveld model, based on PD modelling of Eleveld model
 - Improved charting (extend beyond 20m, change in chart options)
 - Paediatric mode: allows entry of age in days, weeks, or months; allows entry of postmenstrual age in premature kids (PMA is covariate in Eleveld model)

 Full changelog is available on our [blog](https://simtiva.blogspot.com/p/changelog.html)

 #### Social
 - Blog: http://simtiva.blogspot.com
 - Twitter/X: http://x.com/simtiva_app
 - Bluesky: https://bsky.app/profile/simtiva.app
 - LinkedIn: https://www.linkedin.com/in/terence-luk-3b89392b5
