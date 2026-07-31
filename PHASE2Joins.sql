-- Visitor (parent table)
-- ├── id
-- ├── visitorCode
-- ├── firstSeenAt
-- ├── lastSeenAt
-- ├── userAgent
-- ├── deviceType
-- ├── browser
-- ├── os
-- └── locations → Location table ke saath connect hai
-- Location (child table)
-- ├── id
-- ├── visitorId  ← Ye Visitor.id ko point karta hai
-- ├── source
-- ├── latitude
-- ├── longitude
-- ├── city
-- ├── region
-- ├── country
-- └── capturedAt
-- 1️⃣ INNER JOIN — Sirf matching rows
-- Kya hai: Dono tables mein wahi rows lata hai jo match karte hain.
-- Kyun use hota hai: Jab tum chahte ho ke sirf wahi data aaye jo dono tables mein exist kare.
-- Kaha lagta hai: FROM ke baad.
-- Example: Har location ke saath uske visitor ka naam bhi chahiye
select
    v.name v.email
from
    visitor v
    inner join location l on l.visitorId = v.id
    --- output getting user name and email which is matching
    -- FROM Visitor v — Visitor table se data le rahe hain, usko short name v de rahe hain
    -- INNER JOIN Location l — Location table bhi add kar rahe hain, short name l
    -- ON l.visitorId = v.id — Ye condition batata hai ke kaun se rows match karenge
    -- Example: Har visitor ka naam dikhao, agar uske locations hai toh city bhi dikhao
    -- Agar kisi visitor ka koi location nahi hai, toh city NULL dikhega
SELECT
    v.name,
    v.email,
    v.deviceType,
    l.city,
    l.country
FROM
    Visitor v
    LEFT JOIN Location l ON l.visitorId = v.id;

-- 3️⃣ RIGHT JOIN — Opposite of LEFT (rare)
-- Kya hai: Right table ke saare rows laata hai.
-- Kyun use hota hai: Bilkul same LEFT, bas side opposite.
-- Real mein kitna use: Bilkum kaam nahi aata. 95% cases mein LEFT JOIN kaafi hai.
SELECT
    v.name,
    l.city
FROM
    Location l
    RIGHT JOIN Visitor v ON l.visitorId = v.id;

-- Ye LEFT JOIN ke barabar hai
-- 4️⃣ FULL JOIN — Dono sides ka sara data
-- Kya hai: Dono tables ke saare rows laata hai, match nahi karta.
-- Kyun use hota hai: Rare case. Jab dono tables ke unmatched data bhi chahiye.
-- Real mein kitna use: Bahut rare.
SELECT
    v.name,
    v.email,
    l.city,
    l.country
FROM
    visitor v
    FULL OUTER JOIN Location l ON l.visitorId = v.id;

-- 5️⃣ Self Join — Table ko khud se join karna
-- Kya hai: Ek hi table ko do baar join karna.
-- Kyun use hota hai: Jab table ke andar relationship ho, jaise manager-employee.
-- Visitor ki Previous Location aur Current Location ko compare karna
select
    emp.name as employee,
    mng.name as manager
from
    employees emp
    left join employees mng on emp.employee_id = mng.id;

select
    current.location as location,
    prev.location as prevLocation
from
    Location current
    left join Location prev on current.Location_id = prev.id
    -- Query A — Har visitor ka total locations count:
select
    v.name,
    v.email,
    count(l.id) as total_locations
from
    visitor v
    left join Location l on l.visitorId = v.id;

-- Query B — Har location ke saath visitor info:
select
    l.city,
    l.location,
    l.capturedAt,
    v.name as visitor_name,
    v.email,
    v.deviceType,
    v.os
from
    Location l
    left join Visitor v on l.visitorId = v.id
order by
    l.capturedAt desc;