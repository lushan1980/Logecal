/****** Script for SelectTopNRows command from SSMS  ******/

delete from VASSurvey
delete from VASUser

SELECT * FROM [dbo].[Survey] order by [SurveyID]
SELECT * FROM [dbo].[VASUser] order by [SurveyID], [UserID]
SELECT * FROM [dbo].[LumendiUser] order by [SurveyID], [UserID]
--SELECT * FROM [dbo].[VASSurvey] order by SubjID, VisitNo
SELECT * FROM [dbo].[Study2Demog] order by SubjID
SELECT * FROM [dbo].[Study2Assessment] order by SubjID, VisitNo
SELECT * FROM [dbo].[Study2AE] order by SubjID, VisitNo

DBCC CHECKIDENT ('VASUser', reseed, 12)

SELECT * FROM [dbo].[LumendiUser]
SELECT * FROM [dbo].[LumendiDemog] order by UserID, SubjID
SELECT * FROM [dbo].[LumendiProcedure] order by SubjID
select * from LumendiSatification order by SubjID
SELECT * FROM [dbo].[LumendiAE] order by SubjID, VisitNo
SELECT Age, Gender FROM CoronaVirus.dbo.LumendiDemog

delete from LumendiAE
delete from LumendiProcedure
delete from LumendiDemog
delete from LumendiSatification

select count(*) from LumendiDemog_Random
update LumendiUser
set Email = 's.lu@logecal.com'

update LumendiDemog
set Anemia = 'Yes'
where SubjID = '08-001'

update LumendiProcedure
set Successful = 'Yes'
where SubjID = '08-001'

update LumendiSatification
set UserID = 2

update LumendiAE
set UserID = 4 
where UserID is null

insert into LumendiDemog values(2, '01-777', 50, 'Male', 'Asian')
insert into LumendiSatification values('08-001', 7.5)
insert into LumendiAE values('03-001', 1, 'Headache', 'Mild')
delete from LumendiUser where UserID = 6
delete from LumendiDemog where SubjID = '02-214' 
delete from LumendiProcedure where SubjID = '02-214' 
delete from LumendiSatification
delete from LumendiAE where SubjID='08-001' and VisitNo=2
update Survey set InviteCode = '1111' where SurveyID = 1
update Survey set InviteCode = '2222' where SurveyID = 2
update VASUser set SurveyUserID = 1;
update VASUser set SubjID = '01-001';

	update VASSurvey 
	set VisitNo = Null
	where VisitNo = 4

exec InsertASurvey @UserID=1,@Age=45,@Gender='Male',@F1=6,@F2=6 

	update VASSurvey 
	set VisitNo = 4
	where VisitNo is Null

	delete from VASSurvey where VisitNo=1

	delete from VASUser where UserID=4
	delete from VASUser where SurveyID=2

	select top 1 SurveyUserID from VASUser where SurveyID = 2 order by SurveyUserID Desc


DECLARE @number1 INT, @number2 INT
SET @number1 = 1
SET @number2 = 867
SELECT RIGHT('000' + RTRIM(CAST(@number1 AS NCHAR(3))),3) AS NUMBER_CONVERTED

delete from VASUser where SubjID='02-002'
delete from Study2AE where SubjID='02-002'
delete from Study2Assessment where SubjID='02-002'
delete from Study2Demog where SubjID='02-002'

delete from Study2AE where VisitNo = 4
delete from Study2Assessment where VisitNo = 4

declare @nowtime datetime;
set @nowtime = (SELECT CONVERT(DATETIME,GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'Eastern Standard Time'))

insert into Study2Assessment 
values('02-001', 2, 6, @nowtime)

select top 1 VisitNo  from Study2Assessment where SubjID='02-001' order by VisitNo desc

update Study2Assessment 
set Assessment = 10
where VisitNo = 3

update VASUser
set Email='e@gmail.com'
where SubjID='02-005'

insert into Survey
values('Lumendi', 'llll')

select * from LumendiDemog_Random

	CREATE View AgebyTreatment AS
		(select UserID, Randomization, cast(AVG(CAST(Age AS DECIMAL(4,1))) as decimal(4,1)) as Total from LumendiDemog_Random group by UserID, Randomization)	
		union
		(select UserID, 'Overall' as Randomization, cast(AVG(CAST(Age AS DECIMAL(4,1))) as decimal(4,1)) from LumendiDemog_Random group by UserID)

CREATE VIEW GenderbyTreatment AS
select UserID, Randomization, Gender, count(*) as Total from LumendiDemog_Random group by UserID, Gender, Randomization
union
select UserID, 'Overall' as Randomization, Gender, count(*) as Total from LumendiDemog_Random group by UserID, Gender

CREATE VIEW RaceEthnibyTreatment AS
select UserID, Randomization, RaceEthni, count(*) as Total from LumendiDemog_Random group by UserID, RaceEthni, Randomization
union
select UserID, 'Overall' as Randomization, RaceEthni, count(*) as Total from LumendiDemog_Random group by UserID, RaceEthni