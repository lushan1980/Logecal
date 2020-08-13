select [type],[plot],[date],COUNT(*) as CNT 
from large_dataset_example 
group by type,plot,date
having COUNT(*) > 1

delete from large_dataset_example where ID not in
(select MAX(ID) from large_dataset_example group by type,plot,date);

WITH cte AS (
    SELECT 
        type, 
        plot, 
		date,
        ROW_NUMBER() OVER (
            PARTITION BY type,plot,date
            ORDER BY type, plot, date) rownum
    FROM 
        large_dataset_example
	where plot = 'Philadelphia'
) 
SELECT 
  * 
FROM 
    cte 
WHERE 
    rownum > 1;