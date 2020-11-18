data analysis;
set azuresql.analysis;
run;

data anl;
length group $8. gender $8.;
set analysis;
if gender = '1' then gender = 'Male';
if gender = '2' then gender = 'Female';
if group = '1' then group = 'Device';
if group = '0' then group = 'Control';
age1 = input(age, 6.);
run;

proc sgplot data = anl;
vbox SurgeryTime / category = gender;
   xaxis label = "Randomization Group";
   keylegend / title = "Group";
run; 

proc sort data = anl; by gender; run;
proc means data = anl n min q1 mean median q3 max qrange;
 var SurgeryTime; 
 by gender;
 output out = quartiles;
run; 


proc means data = anl;
 var SurgeryTime;
 by gender;
run; 

PROC UNIVARIATE DATA=anl;
 VAR SurgeryTime;
 by gender;
RUN; 
