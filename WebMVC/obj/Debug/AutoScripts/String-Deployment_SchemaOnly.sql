SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cases_sample](
	[date] [date] NULL,
	[actual_cases] [int] NULL,
	[new_cases] [int] NULL,
	[projected] [float] NULL,
	[projected_lower] [float] NULL,
	[projected_upper] [float] NULL
)

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[coronavirus_data](
	[type] [char](20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[plot] [char](20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[date] [date] NULL,
	[dcases] [float] NULL,
	[death] [float] NULL,
	[day] [float] NULL,
	[proj] [float] NULL,
	[proj_death] [float] NULL,
	[text] [char](20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[proj_death_upper] [float] NULL,
	[proj_death_lower] [float] NULL,
	[proj_upper] [float] NULL,
	[proj_lower] [float] NULL,
	[inflection] [float] NULL,
	[dotted_proj] [float] NULL,
	[dotted_proj_death] [float] NULL,
	[death_proj_date] [date] NULL,
	[death_proj_total] [float] NULL,
	[dcases_spline] [float] NULL,
	[death_spline] [float] NULL,
	[inflection_flag] [float] NULL
)

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Message](
	[Name] [char](30) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Email] [varchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Phone] [char](13) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Company] [varchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[How] [varchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Questions] [varchar](150) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[countPlots]
	@type char(20)
AS
	select count(plot) from (select plot from coronavirus_data where type = @type group by plot) AS Plots
RETURN 0

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[countSample]
@type char(20),
@plot char(20)
AS

	SELECT COUNT(*) from coronavirus_data 
	where type = @type and plot like @plot

RETURN 0

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getPlots]
	@type char(20)
AS
	select plot from coronavirus_data where type = @type group by plot order by plot
RETURN 0

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getSample]
@type char(20),
@plot char(20)
AS

	SELECT * from coronavirus_data 
	where type = @type and plot like @plot
	order by type, plot, Date

RETURN 0

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertMsg]
(  
@Name char(30),
@Email nvarchar(50),
@Phone char(13),  
@Company varchar(50),  
@How nvarchar(50),
@Questions nvarchar(150)
)  
as  
begin  
insert into Message(Name,Email,Phone,Company,How,Questions)  
values(@Name,@Email,@Phone,@Company,@How,@Questions)  
end
GO
