# SimTIVA
 Free Web App to Simulate TCI/TIVA
 
 [https://simtiva.app](http://simtiva.app)

### About
SimTIVA is a computer simulation program to simulate the delivery of TCI/TIVA. It is a progressive web app and can be run in desktop and mobile browsers across all platforms. Broad cross platform support based on modern web technology means it can be accessed on a wide range of devices. In addition, a simple installation process enables SimTIVA to be run like a native app on your device, and even without internet access. 

This is an open source project; created by Terence Luk 2024; licensed under GNU General Public License v3.0.

Coding is done in JavaScript. The code to mathematical calculations are based on STANPUMP, created by Dr. Steven Shafer, freely available on [OpenTCI](http://opentci.org/code/stanpump).

The pharmacological models include Marsh, Schnider, Paedfusor and Eleveld for propofol, Minto & Eleveld for remifentanil, Shafer for fentanyl, and Maitre for alfentanil.

Several modes are available on SimTIVA app. CP/CE targeting is useful if you want to emulate the behavior of a TCI pump. An infusion scheme will be generated to guide you to achieve a CP or CE target using any ordinary syringe pump without TCI functionality. Manual mode allows you to input bolus and infusion doses and SimTIVA will calculate the CE/CP in response to these doses and plot the result over time. 

A complex (dual) mode is also available. It explores the PD interaction of propofol-opioid, and the synergistic effect is studied by a parameter called PTOL (probability of tolerance to laryngoscopy). An isobologram is used to visualize the synergistic effect in real time and across various time points.

### Purpose
- To simulate TCI and TIVA pharmacokinetics for educational purpose
- To help deliver TCI in a setting where TCI pumps are not available

### Changelog
 Version 4.5 (Build 97) Current
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
