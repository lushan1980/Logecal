/****** Script for SelectTopNRows command from SSMS  ******/
delete from LumendiSatification
delete from LumendiProcedure
delete from LumendiDemog
delete from demog where SUBJID is NULL
delete from [proc] where SUBJID is NULL

insert into LumendiDemog ([UserID]
      ,[SubjID]
      ,[Age]
      ,[Gender]
      ,[RaceEthni]
      ,[ColonPolyp]
      ,[BiopsyDone]
      ,[Hemorrhoids]
      ,[Diverticulitis]
      ,[Diabetes]
      ,[Anemia]
      ,[Hysterectomy]
      ,[ASA]
      ,[Kudo]
      ,[Paris] )
SELECT 2 as UserID,
		SUBJID,
		Age,
		Gender,
		RaceEthn,
		Previous,
		PreBiop,
		Hemorrh,
		HX,
		Diabetes,
		Anemia,
		Hysterect,
		ASA,
		KUDO,
		Classification

FROM [dbo].[Demog]


insert into LumendiProcedure ([SubjID]
      ,[Randomization]
      ,[Successful]
      ,[Comment]
      ,[Length]
      ,[Width]
      ,[Location]
      ,[Navigating]
      ,[CleanMargins]
      ,[DProc]
      ,[TBegan]
      ,[TEnded]
      ,[TCeReached]
      ,[TLeReached])

SELECT subjID,
		[Group],
		Success,
		why,
		length,
		width,
		LesLocat,
		Naviate,
		Margins,
		Date,
		BeginTi,
		EndTime,
		InseTime,
		RemoTime

FROM [dbo].[proc]


SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = N'proc'

SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = N'Lumendiprocedure'