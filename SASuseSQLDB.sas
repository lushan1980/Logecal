libname anl 'C:\Users\SLu\Logecal\Donna Borgnis - Logcal ALL\SAS-SQL';
libname Lumendi 'C:\Users\SLu\OneDrive - Logecal\Lumendi\USLUM1901\Stats\Data\Analysis';

data anl.Demog;
set sqldb.LumendiDemog;
run;
data anl.Procedure;
set sqldb.LumendiDemog;
run;
data LumendiSatification;
set sqldb.lumendiSatification;
run;
data anl.AE;
set sqldb.LumendiAE;
run;



data Satification;
set Azuresql.lumendiSatification;
run;

proc means data = Satification noprint;
var Satification;
output out = means;
run;

data Means;
set Means;
drop _type_ _freq_;
run;

data Azuresql.Means;
set Means;
run;

data Azuresql.Demog;
set Lumendi.Demog;
run;
data Azuresql.Analysis;
set Lumendi.Analysis;
run;


proc setinit;
run;


DATA azuresql.demog;
set Lumendi.Demog;
run;

DATA azuresql.proc;
set Lumendi.proc;
run;
