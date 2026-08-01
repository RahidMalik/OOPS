-- 📘 PHASE 4: Subqueries & CTEs
-- Real projects mein usage: ~70% — har non-trivial query mein use hota hai.

-- 1️⃣ Subquery — Query ke andar Query
-- Kya hai: Ek query ke andar doosri query likhna.
-- Kyun use hota hai: Kyunki ek baar mein step-by-step filter/process karna padta hai.
-- Kaha lagta hai: WHERE, FROM, ya SELECT ke andar.

Example 1 — Subquery in WHERE
-- "Wahi visitors chahiye jinke paas 5 se zyada locations hain"
SELECT name, email
FROM Visitor
WHERE id IN (
    SELECT visitorId
    FROM Location
    GROUP BY visitorId
    HAVING COUNT(*) > 5
);
-- 💡 Example 2: Subquery in FROM (Derived Table)
-- Task: "Pehle har visitor ki total locations gino, phir un sabka Average nikalo ke aam tor par ek visitor ki kitni locations hoti hain."

select AVG(total_location) as average_locations_per_user
from (
    -- Inner Query (Pehle har visitor ki count nikalegi)
    SELECT visitorId count(*) AS total_location
    from location
    group by visitorId
) AS visitor_count;

-- 💡 Example 3: Subquery in SELECT (Scalar Subquery)
-- Task: "Har visitor ka naam dikhao, aur uske aage uski total locations ki count bhi lao."
SELECT 
    v.name,
    v.email,
    (
        SELECT COUNT(*) 
        FROM Location l 
        WHERE l.visitorId = v.id
    ) AS total_locations
FROM Visitor v;

-- 2. CTE — Common Table Expression (WITH Clause)
-- Jab subquery bohot bari hone lage, toh modern SQL mein WITH clause (CTE) use kiya jata hai. Yeh query ko tukdon mein tor kar clean aur readable banata hai.
-- ❌ Subquery Approach (Nesting se code messy ho jata hai)
SELECT name, email FROM Visitor
WHERE id IN (
    SELECT visitorId FROM Location GROUP BY visitorId HAVING COUNT(*) > 5
);

-- ✅ Modern CTE / WITH Approach (Bilkul clean aur easy to read)
WITH FrequentVisitors AS (
    SELECT visitorId 
    FROM Location 
    GROUP BY visitorId 
    HAVING COUNT(*) > 5
)
SELECT v.name, v.email 
FROM Visitor v
JOIN FrequentVisitors f ON v.id = f.visitorId;

    -- 3️⃣ Multiple CTEs — Ek saath kai steps
WITH 
-- Step 1: Har visitor ka total locations
visitor_locations AS (
    SELECT visitorId, COUNT(*) AS total_locations
    FROM Location
    GROUP BY visitorId
),
-- Step 2: Unko filter karo jinke paas 5+ locations hain
high_activity_visitors AS (
    SELECT visitorId, total_locations
    FROM visitor_locations
    WHERE total_locations > 5
)
-- Step 3: Final result
SELECT v.name, v.email, h.total_locations
FROM Visitor v
JOIN high_activity_visitors h ON h.visitorId = v.id
ORDER BY h.total_locations DESC;

-- Code readable ho gaya — har step ka naam hai
-- Debug easy — visitor_locations ka result akela dekh sakte ho
-- Reusable — visitor_locations ko baar baar use kar sakte ho
-- "Har visitor ke liye uska last location ka city chahiye"
SELECT 
    v.name,
    (
        SELECT l.city 
        FROM Location l 
        WHERE l.visitorId = v.id 
        ORDER BY l.capturedAt DESC 
        LIMIT 1
    ) AS last_city
FROM Visitor v;

-- 🎯 Real Queries for Your GpsTracker Project
-- Query 1 — CTE se top countries (where locations > 50):
WITH country_stats AS (
    SELECT country, COUNT(*) AS total_locations
    FROM Location
    GROUP BY country
)
SELECT country, total_locations
FROM country_stats
WHERE total_locations > 50
ORDER BY total_locations DESC;

-- Query 2 — Har visitor ka last seen city (correlated subquery):
SELECT 
    v.name,
    v.email,
    (
        SELECT l.city 
        FROM Location l 
        WHERE l.visitorId = v.id 
        ORDER BY l.capturedAt DESC 
        LIMIT 1
    ) AS last_seen_city,
    (
        SELECT l.country 
        FROM Location l 
        WHERE l.visitorId = v.id 
        ORDER BY l.capturedAt DESC 
        LIMIT 1
    ) AS last_seen_country
FROM Visitor v;

-- Query 3 — Multiple CTEs — Step by step:
WITH 
-- Step 1: Har visitor ke total locations
visitor_stats AS (
    SELECT 
        visitorId, 
        COUNT(*) AS total_locations,
        AVG(accuracy) AS avg_accuracy
    FROM Location
    GROUP BY visitorId
),
-- Step 2: High activity visitors filter
active_visitors AS (
    SELECT visitorId, total_locations, avg_accuracy
    FROM visitor_stats
    WHERE total_locations > 5
)
-- Step 3: Final result with details
SELECT 
    v.name, 
    v.email, 
    v.deviceType,
    a.total_locations, 
    ROUND(a.avg_accuracy, 2) AS avg_accuracy
FROM Visitor v
JOIN active_visitors a ON a.visitorId = v.id
ORDER BY a.total_locations DESC;