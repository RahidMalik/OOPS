-- 📘 PHASE 3: Aggregation
-- Real projects mein usage: ~80% — dashboards, reports, counts banane ke liye.
-- 🎯 Goal
-- Data ko summarize karna — counts, totals, averages, grouped stats.
-- 1️⃣ GROUP BY — Groups banate hain
-- Kya hai: Similar rows ko ek group mein pack karta hai.
-- Kyun use hota hai: Kyunki tum chahte ho ke har category ka sum/average dekh o.
-- Kaha lagta hai: WHERE ke baad, ORDER BY se pehle.
select
    country,
    count(*) as total_location
from
    location
group by
    country;

-- Output:
-- Pakistan  | 45
-- USA       | 120
-- India     | 30
-- if only want to prevent repeated names 
select distinct
    country
from
    location;

-- 2️⃣ Aggregate Functions — Data summarize karne ke operators
-- COUNT(*)
-- • Kya karta hai: Total rows count
-- • Example: Kitne total visitors hai
-- COUNT(column)
-- • Kya karta hai: Non-NULL values count
-- • Example: Kitne users ka phone hai
-- SUM(column)
-- • Kya karta hai: Total add karta hai
-- • Example: Total revenue kitna hai
-- AVG(column)
-- • Kya karta hai: Average nikalta hai
-- • Example: Average price kya hai
-- MIN(column)
-- • Kya karta hai: Sabse chota value
-- • Example: Sabse purana order kab hua
-- MAX(column)
-- • Kya karta hai: Sabse bada value
-- • Example: Sabse naya visitor kab aya
-- id | user_name | amount | phone_number | payment_date
-- 1  | Ali       | 1000   | 03001234567  | 2026-01-01
-- 2  | Sara      | 2500   | NULL         | 2026-01-15
-- 3  | Sudan     | 1500   | 03129876543  | 2026-02-10
-- 4  | Hamza     | 3500   | NULL         | 2026-03-20
select
    count(*) total_orders,
    count(phone_number) as total_phoneNumber,
    sum(amount) as total_amount,
    avg(amount) as total_average,
    MIN(amount) AS lowest_payment,
    MAX(amount) AS highest_payment,
    min(payment_date) as first_payment_date,
    max(payment_date) as latest_payment_date
from
    Payments;

--     3️⃣ HAVING — Aggregated result par filter
-- Kya hai: GROUP BY ke baad bane groups par filter lagata hai.
-- Kyun use hota hai: Kyunki WHERE raw data par filter lagata hai, lekin HAVING aggregated/summarized data par lagata hai.
-- Most common interview question: WHERE vs HAVING — pata karo!
-- ❌ GALAT — WHERE COUNT(*) ko nahi samajhta
SELECT
    country,
    COUNT(*) AS total_locations
FROM
    Location
WHERE
    COUNT(*) >= 10
GROUP BY
    country;

-- ✅ THEEK — HAVING use karo aggregated result par filter ke liye
SELECT
    country,
    COUNT(*) AS total_locations
FROM
    Location
GROUP BY
    country
HAVING
    COUNT(*) >= 10;

-- 4️⃣ CASE WHEN — Query ke andar if-else
-- Example: Accuracy ke basis par location ka tier label do
SELECT 
    id,
    accuracy,
    CASE 
        WHEN accuracy > 50 THEN 'High'
        WHEN accuracy BETWEEN 20 AND 50 THEN 'Medium'
        ELSE 'Low'
    END AS accuracy_tier
FROM Location;
-- id        | accuracy | accuracy_tier
-- ----------|----------|---------------
-- uuid-1    | 85.5     | High
-- uuid-2    | 35.0     | Medium
-- uuid-3    | 10.2     | Low

-- 🎯 Real Queries for Your GpsTracker Project
-- Query 1 — Har country mein kitne visitors/locations:
SELECT
    l.country,
    COUNT(*) AS total_location,
    COUNT(DISTINCT l.visitorId) AS unique_visitors
FROM location AS l
GROUP BY l.country
ORDER BY total_location DESC;

-- Har country group karo
-- Total locations count karo
-- Unique visitors count karo (DISTINCT — repeat nahi karega)
-- Result ko descending order mein dekho

-- Query 2 — Har visitor ka total locations, sirf unko jinke paas 5+ locations hain:
SELECT
    v.name,
    v.email,
    v.id,
    COUNT(l.id) AS total_location,
    AVG(l.accuracy) AS average_accuracy
FROM visitor AS v
LEFT JOIN location AS l ON l.visitorId = v.id
GROUP BY v.name, v.email, v.id
HAVING COUNT(l.id) >= 5;as total_average
from visitor v

-- Practical task
-- Har month mein kitne naye visitors aaye (firstSeenAt se): (3/4)

-- (Hint: EXTRACT use karo month nikalne ke liye)

-- Query likh ke batao! Main check karun.  (4/4)

select EXTRACT(month from firstSeenAt) as month_number,
count(*) as total_new_visitors 
from visitor 
group by EXTRACT(month from firstSeenAt)
order by month_number;
-- 💡 Pro Tip (Agar Multiple Years Hon)
-- Agar aapke paas ek se zyada saalon (e.g. 2025 aur 2026) ka data ho, toh month ke sath YEAR bhi group karna behtar hota hai taake 2025 ka January aur 2026 ka January aapas mein mix na hon:
SELECT 
    EXTRACT(YEAR FROM firstSeenAt) AS year_number,
    EXTRACT(MONTH FROM firstSeenAt) AS month_number,
    COUNT(*) AS total_new_visitors
FROM Visitor
GROUP BY 
    EXTRACT(YEAR FROM firstSeenAt), 
    EXTRACT(MONTH FROM firstSeenAt)
ORDER BY year_number, month_number;