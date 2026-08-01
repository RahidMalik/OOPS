-- 1️⃣ SELECT — Kya data chahiye?
-- Kya hai: Ye batata hai ke tumhe table se kaun si columns chahiye.
-- Kyun use hota hai: Kyunki tum specific data chahiye, poora table nahi chahiye.
-- Kaha lagta hai: Har query ke start mein.
SELECT
    name,
    email,
    id
FROM
    users;

-- 2️⃣ WHERE — Row filter karo
-- Kya hai: Condition lagata hai ke kaun si rows chahiye.
-- Kyun use hota hai: Kyunki tum poora data nahi chahiye, kuch specific rows chahiye.
-- Kaha lagta hai: FROM ke baad.
SELECT
    *
FROM
    user
WHERE
    created_at > '2025-01-01';

-- 3️⃣ ORDER BY — Sorting
-- Kya hai: Data ko order mein batata hai.
-- Kyun use hota hai: Kyunki tum data ko a-z, 1-10, ya naye se purane tak sort karna chahiye.
-- Kaha lagta hai: Query ke end mein.
-- Example: Newest users pehle dikhao
SELECT
    *
FROM
    users
ORDER BY
    created_at DESC;

-- ASC = ascending (1,2,3), DESC = descending (9,8,7)
-- 4️⃣ LIMIT / OFFSET — Pagination
-- Kya hai: Kitne rows chahiye, batata hai.
-- Kyun use hota hai: Kyunki 1 million rows ek saath load mat karo, thode thode kar ke dikhao (page 1, page 2...).
-- Kaha lagta hai: Query ke last mein.
-- Example: Pehli 10 users dikhao
SELECT
    *
FROM
    users
LIMIT
    10;

-- Page 2 chahiye? Pehle 10 skip karo, phir 10
SELECT
    *
FROM
    users
LIMIT
    10
OFFSET
    10;

-- 5️⃣ AND, OR, NOT — Multiple conditions
-- Kya hai: Multiple conditions combine karne ke liye.
-- Kyun use hota hai: Kyunki ek se zyada filter apply karna padta hai.
-- Kaha lagta hai: WHERE clause ke andar.
--  (1/3)
-- Example: Pakistan se users jo 2025 banaye
SELECT
    *
FROM
    users
WHERE
    country = 'Pakistan'
    AND created_at > '2025-01-01';

-- OR matlab koi ek condition true honi chahiye
SELECT
    *
FROM
    users
WHERE
    country = 'Pakistan'
    OR country = 'India';

-- NOT matlab ulta
SELECT
    *
FROM
    users
WHERE
    NOT country = 'Pakistan';

-- 6️⃣ BETWEEN — Range ke andar
-- Kya hai: Min aur max ke beech ke values.
-- Kyun use hota hai: Kyunki age > 18 AND age < 60 likhne ke bajaye simple hai.
-- Kaha lagta hai: WHERE ke andar.
SELECT
    *
FROM
    Product
WHERE
    price BETWEEN 100 AND 500;

-- 2.
SELECT
    *
from
    age
Where
    age > 18
    AND agr < 50;

--     7️⃣ IN — Specific list mein se
-- Kya hai: Kuch specific values check karne ke liye.
-- Kyun use hota hai: Kyunki country = 'Pak' OR country = 'India' nahi likhna, simple list mein dedo.
Select
    *
from
    user
where
    country in ('pakistan', 'india', 'usa');

-- 8️⃣ LIKE / ILIKE — Pattern matching
-- Kya hai: Text mein koi specific word dhundna.
-- Kyun use hota hai: Kyunki exact match nahi, partial match chahiye.
-- LIKE = case sensitive
-- ILIKE = case insensitive (Postgres mein best hai!)
Select
    *
from
    product
where
    name LIKE '%phone%';
Select
    *
from
    product
where
    name ILIKE '%Phone%';
-- 9️⃣ IS NULL / IS NOT NULL — Empty value check
-- Kya hai: Koi column empty hai ya nahi.
-- Kyun use hota hai: Kyunki kabhi kabhi data missing hota hai.
Select
    *
from
    users
Where
    phone is null;

select
    *
from
    user
where
    phone is not null;

-- 🔟 DISTINCT — Unique values
-- Kya hai: Repeated values ko hata kar ek baar dikhata hai. (2/3)
-- Kyun use hota hai: Kyunki same country list mein baar baar a raha hai, ek baar chahiye.
Select Distinct
    country
from
    users;

-- outout show only 1 time which repeated.
-- 1️⃣1️⃣ AS — Column/Table ka nickname
-- Kya hai: Column ya table ka temporary naam dena.
-- Kyun use hota hai: Kyunki result readable hona chahiye.
Select
    name As customer_name,
    email as customer_email;

-- 🎯 Practice Queries (Ab tum likh ke dekho)
-- Query 1:    
select
    name,
    email
from
    users
where
    created_at > '2025-01-01'
order by
    created_at desc
limit
    10;

-- id, name, email chahiye → SELECT
-- Sirf 2025 ke baad ke users → WHERE
-- Newest pehle → ORDER BY DESC
-- Sirf 10 → LIMIT

select * from products where price between 100 AND 500 AND name ilike '%phone%';

-- Sara data chahiye → SELECT *
-- Price 100-500 ke beech → BETWEEN
-- Naam mein "phone" ho → ILIKE

select * from location where country = 'pakistan' and deviceType is null order by created_at desc;