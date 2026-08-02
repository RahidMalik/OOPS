-- Phase 6:- Data Modification 
-- Topics to learn
-- • INSERT INTO ... VALUES / INSERT ... SELECT
-- • UPDATE ... SET ... WHERE
-- • DELETE FROM ... WHERE
-- • UPSERT: INSERT ... ON CONFLICT DO UPDATE — very Postgres-specific, used constantly
-- • Transactions: BEGIN, COMMIT, ROLLBACK
--1
-- 🌱 Phase 0: Database ki Pehchan (5 seconds mein)
-- - Database = Ek Excel sheet jaisa (lekin computer ke andar).  
-- - Table = Ek sheet (jaise users sheet, orders sheet).  
-- - Row (Record) = Ek pura entry (jaise ek user ka pura data).  
-- - Column (Field) = Ek specific info ka column (jaise name, email, age).
--2
--  Tumhare users table mein columns ho sakte hain: id, email, password, created_at.  
--  Ek naya user add karna = INSERT ka kaam.  
-- 📝 Step 1: INSERT INTO ... VALUES (Manual Entry)
-- Matlab: "Main khud se values deta hoon – jaise form fill kar raha hoon."
insert into
    table_name (column, column, column)
values
    (value1, value2, value3);

--     🌰 Tumhare GpsTracker Project ke liye Example:
-- Socha: Ek naya GPS tracker device add karna hai. 
insert into
    gps_tracker (device_id, owner_name, status, last_seen)
values
    ('Iphone', 'Rahid', 'active', Now ());

-- task
INSERT INTO
    users (name, email, password, created_at)
values
    ('Rahid', 'rahid@gmail.com', '123458', Now ())
    -- 📥 Step 2: INSERT ... SELECT (Copy-Paste from Another Table)
INSERT INTO
    user_table (id, email, created_at)
SELECT
    id,
    email,
    created_at
from
    users
WHERE
    last_login < '2024-01-01' -- Get old user after the 2024.
    --2
INSERT INTO
    completed_orders (order_id, user_id, total)
SELECT
    id,
    user_id,
    total_amount
FROM
    orders
WHERE
    status = 'delivered';

SERIAL PRIMARY KEY
-- 4. INSERT ... SELECT se doosri table se copy karo (pehle ek dummy table banao
--1 Create table
--First make table
CREATE TABLE
    RealStudentTable (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INT,
        enrolled BOOLEAN DEFAULT FALSE
    );

-- create another table(table no 2)
create table
    student (name Text, age int)
    --2 Add values init
insert into
    student
VALUES
    ('Rahid', 20)
    --3 Now get the values from student and add value into second table
INSERT INTO
    RealStudentTable (name, age)
SELECT
    name,
    age
from
    student
    --check the Result 
SELECT
    *
from
    RealStudentTable;

--    id | name   | age | enrolled
--    ----+--------+-----+----------
--     1 | Ali    |  20 | f
--     2 | Sara   |  22 | f
--     3 | Ahmed  |  19 | f
------------------------------------------------------------------------------------------------------------------------------------
-- 🔧 1. UPDATE ... SET ... WHERE (Data ko Theek Karna) 
UPDATE gps_device
SET
    status = 'offline',
    last_seen = Now ()
WHERE
    device_id = 'TKR1234' -- sirf ya specific device he update ho gi jis ki id di ha ham na. where is must used whenever it update all the table data. 
UPDATE
SET
    email = test@gmail.com WHERE id = '123...'; -- ya error de ga agr '' double quotes ni hon gay to kion ka string hamesha text main he ati ha. 'test@gmail.co'
    --
--@22222222222222
    --
    where status = "active" AND last_seen > now() - INTERVAL '1 day' -- Un sab users ka record nikalo jo pichle 24 ghanton ke andar online aaye hain (yaani Saturday 8:00 PM ke baad dekhe gaye hain)."
---------------------------------------------------------------------------------------------------------------------------------
--     🗑️ 2. DELETE FROM ... WHERE (Data ko Hataana)
--  Simple Definition:  
-- -- "Excel sheet se kisi specific row ko hataana – jaise spam email delete karna. Lekin WHERE nahi lagaya toh poori table gayab!" 
-- Tumhare GpsTracker Project ke liye Example (Waqi Situation):
-- Socha: 90 dino pehle ka GPS data hata do (kyunki bas 30 days ka chahiye live tracking ke liye – baaki archive/archive karo).

delete from gps_tracker where timestamp - now() > INTERVAL  '90 days'
-- - WHERE timestamp < NOW() - INTERVAL '90 days' = Konsi rows delete karni hain (bas purane logs – jo 90 din purane hain).
-- - Agar WHERE na likho: DELETE FROM gps_locations; → Poori table gayab! (agar backup nahi ho toh tumhara saara location history gaya – client gussa ho jayega!). 

