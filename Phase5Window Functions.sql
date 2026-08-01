-- 🎯 Goal
-- Data ko collapse mat karo, par phir bhi calculation karo across rows.
-- Matlab:
-- GROUP BY data ko ek row mein merge kar deta hai (sum, avg, count)
-- Window Function data ko as-is rakhta hai, par phir bse naye calculation add kar deta hai (running total, rank, previous value)
-- 1️⃣ OVER() — Window ka soul
-- Kya hai: Ye clause batata hai ke calculation kaun si rows ke upar karna hai.
-- Kyun use hota hai: Kyunki GROUP BY se data chhota ho jata hai, lekin window function se original rows rahte hain, naye columns add hote hain.
-- Example: Har location ke saath uske accuracy ka running total dikhao
SELECT
    id,
    country,
    accuracy,
    SUM(accuracy) OVER (
        ORDER BY
            capturedAt
    ) AS running_total
FROM
    Location;

-- Samjhao:
-- SUM(accuracy) OVER (...) — Ye har row ke saath ek naya column add karta hai
-- running_total — ye cumulative sum hai (pehli row ka accuracy + doosri row ka accuracy + ...)
-- Original rows remain — har location ka alag row hai, sirf ek naya column add hua
-- vs GROUP BY:
-- GROUP BY — sirf ek row dega (country-wise sum)
SELECT
    country,
    SUM(accuracy)
FROM
    Location
GROUP BY
    country;

-- Window Function — har row rahega, uske saath running total add hoga
SELECT
    id,
    country,
    SUM(accuracy) OVER (
        PARTITION BY
            country
        ORDER BY
            capturedAt
    )
FROM
    Location;

-- 2️⃣ ROW_NUMBER(), RANK(), DENSE_RANK() — Ranking
-- ROW_NUMBER()
-- • Kya karta hai: Har row ko serial number deta hai (1, 2, 3...)
-- • Example output: No gaps, even if same value
-- RANK()
-- • Kya karta hai: Same values ke baad gap chhodta hai
-- • Example output: 1, 2, 2, 4
-- DENSE_RANK() (1/4)
-- • Kya karta hai: Same values ke baad no gap
-- • Example output: 1, 2, 2, 3
-- Har country ke andar har visitor ko rank karo (unke total locations ke hisaab se)
-- ROW_NUMBER()
-- • Kya karta hai: Har row ko serial number deta hai (1, 2, 3...)
-- • Example output: No gaps, even if same value
-- RANK()
-- • Kya karta hai: Same values ke baad gap chhodta hai
-- • Example output: 1, 2, 2, 4
-- DENSE_RANK() (1/4)
-- • Kya karta hai: Same values ke baad no gap
-- • Example output: 1, 2, 2, 3
SELECT
    v.name,
    l.country,
    COUNT(l.id) AS total_locations,
    RANK() OVER (
        PARTITION BY
            l.country
        ORDER BY
            COUNT(l.id) DESC
    ) AS rank_in_country
FROM
    Visitor v
    INNER JOIN Location l ON l.visitorId = v.id
GROUP BY
    v.name,
    l.country;

--     Output:
-- name    | country   | total_locations | rank_in_country
-- --------|-----------|-----------------|----------------
-- Ali     | Pakistan  | 15              | 1
-- Sara    | Pakistan  | 12              | 2
-- Ahmed   | Pakistan  | 12              | 2  -- RANK gap (2,2,4)
-- Omar    | Pakistan  | 8               | 4
-- 3️⃣ PARTITION BY — Group-wise calculation
-- Kya hai: GROUP BY ki tarah group banata hai, lekin data collapse nahi karta.
-- Kyun use hota hai: Kyunki har group ke andar ranking/running total chahiye, par original rows chahiye.
-- Har country ke andar running total (har country separately)
SELECT
    id,
    country,
    accuracy,
    SUM(accuracy) OVER (
        PARTITION BY
            country
        ORDER BY
            capturedAt
    ) AS country_running_total
FROM
    Location;

-- Samjhao:
-- PARTITION BY country — Har country ke andar calculation restart ho jayega
-- Pakistan ke locations ka running total alag hoga, USA ka alag
-- 4️⃣ LAG() / LEAD() — Previous / Next row value
-- Kya hai: Pehle ya agle row ka value nikalta hai.
-- Kyun use hota hai: Kyunki comparison chahiye — "pehle se kitna increase hua".
--  (2/4)
SELECT
    month_name,
    sales,
    -- LAG(): Pichle mahine ki sales layega
    LAG (sales) OVER (
        ORDER BY
            month_id
    ) AS previous_month_sales,
    -- LEAD(): Agle mahine ki sales layega
    LEAD (sales) OVER (
        ORDER BY
            month_id
    ) AS next_month_sales
FROM
    MonthlySales;

-- name  | capturedAt          | accuracy | prev_accuracy | diff_from_prev
-- ------|---------------------|----------|---------------|---------------
-- Ali   | 2025-01-01 10:00    | 85.5     | NULL          | NULL
-- Ali   | 2025-01-01 10:05    | 90.2     | 85.5          | 4.7
-- Ali   | 2025-01-01 10:10    | 78.3     | 90.2          | -11.9
SELECT
    name,
    department,
    salary,
    RANK() OVER (
        PARTITION BY
            department
        ORDER BY
            salary DESC
    ) AS dept_rank
FROM
    employees;

SELECT
    order_date,
    total,
    SUM(total) OVER (
        ORDER BY
            order_date
    ) AS running_total
FROM
    orders;