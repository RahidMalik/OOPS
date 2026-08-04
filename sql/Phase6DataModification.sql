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
    🗑️ 2. DELETE FROM ... WHERE (Data ko Hataana)
    Simple Definition:  
-- -- "Excel sheet se kisi specific row ko hataana – jaise spam email delete karna. Lekin WHERE nahi lagaya toh poori table gayab!" 
-- Tumhare GpsTracker Project ke liye Example (Waqi Situation):
-- Socha: 90 dino pehle ka GPS data hata do (kyunki bas 30 days ka chahiye live tracking ke liye – baaki archive/archive karo).

delete from gps_tracker where timestamp - now() > INTERVAL  '90 days'
-- - WHERE timestamp < NOW() - INTERVAL '90 days' = Konsi rows delete karni hain (bas purane logs – jo 90 din purane hain).

- Agar WHERE na likho: DELETE FROM gps_locations; → Poori table gayab! (agar backup nahi ho toh tumhara saara location history gaya – client gussa ho jayega!). 


  WHERE timestamp < '2024-01-01'  // ✅ Theek hai (YYYY-MM-DD)
  WHERE timestamp < '01/01/2024'  // ❌ Error! Postgres samjhega nahi!

3. Case sensitivity (agar column case-sensitive ho – kam hai lekin hota hai):  
   
SQL
   WHERE status = 'Active'  // ❌ Agar db me 'active' small letter hai to nahi milega! Use ILIKE ya lower()


Delete from user
 where name= 'rahid' AND email = 'test@gmail.com';

 Delete from gps_locations where timestamp - now() > INTERVAL '30 days';  // Last 30 ka data delete
 SELECT COUNT(*) FROM gps_locations WHERE timestamp < NOW() - INTERVAL '90 days';  // 0 hona chahiye!
   

 💡 Pro Tip: Har delete se pehle SELECT ... WHERE chalao – confirm karo ki kis ko delete kar rahe ho! Agar production data hai, toh pehle staging database par hoye.
------------------------------------------------------------------------------------------------------------------------------------
🔄 3. UPSERT: INSERT ... ON CONFLICT DO UPDATE (Postgres ka Jadu!)
Simple Definition:  
"Agar data nahi hai to insert karo, agar hai to update karo – ek hi query mein! Jaise 'naya user signup karo, ya purane ka profile update karo' (email duplicate hone par)." 
Jab use karo: Jab tum nahin jaante ki record pehle se hai ya nahi (jaise user signup me email already exist ho sakta hai – tumhe pata nahi).

INSERT INTO table_name (column1, column2, ...) 
VALUES (value1, value2, ...) 
ON CONFLICT (conflict_target)  // ✅ Yahan batayenge kis column pe conflict check karna hai (UNIQUE index hona chahiye!)
DO UPDATE SET 
    column1 = EXCLUDED.column1,  // EXCLUDED = nehi insert ki gayi value (jo tumne VALUES mein di thi)
    column2 = EXCLUDED.column2;
--!
Socha: Naya user signup ho raha hai – agar email pehle sewa hi exist karta hai (jaise kahi se Google login se aaya) to uska name/update time update karo, nahi to naya user banao.  
insert into users(name, email,created_at,updated_At)
values ('Rahid','test@gmail.com',now(),now())
on CONFLICT (email) // ✅ Email unique hai – agar conflict ho (email pehle se hai) to...
DO UPDATE SET 
 name = EXCLUDED.name,  // Naya name set karo (jaise 'Rahid Malik' – agar Google se aaya to update ho)
 updated_At = now()    // Aur update time bhi badhao (jaise last_login)

Samjho:  
- ON CONFLICT (email) = Agar email column me duplicate aaye (kyunki unique index hai – tumhare schema mein zarur hoga) to...  
- DO UPDATE SET ... = ...to insert nahi karo, bas yeh columns update karo (insert ka waqt barbaad nahi hota).  
- EXCLUDED.name = Wo value jo tumne VALUES mein di thi ('Rahid Malik') – matlab "naya value use karo" (nahi ki purani value rakho).
- Agar email column par unique index nahi hai (jaise tumne bhool gaye banane), to ON CONFLICT (email) kaam nahi karega!  
- Tumhare liye: Supabase me jab tum table banate ho, toh email UNIQUE zaroor set karo – warna yeh kaam nahi karega.

3. DO NOTHING bhi option hai (jab tum chahe ho ke conflict pe insert nahi karna): 

ON CONFLICT do NOTHING; // agr email already hai.

------------------------------------------------------------------------------------------------------------------------------------
💳 4. Transactions: BEGIN, COMMIT, ROLLBACK (Paisa Transfer Jaise!)
Simple Definition:  
"Do ya zyada kaam ko ek saath success ya failure mein karna – jaise bank transfer: ek account se paisa niklo, doosre me jodo. Ek bhi fail hua to wapas le aao (jaise koi hi change nahi hua)!"
Jab use karo: Jab multiple steps ek saath succeed hone chahiye (jaise paisa transfer, order place karna, ya wallet balance update).

🔑 Syntax (Asaan Tarika – Jahan log bhoolte hain ki ROLLBACK bhi likhna hai):

BEGIN;  // Transaction shuru – ab se sab commands ek saath honge

-- Yahan saare commands likho jo ek saath hone chahiye (agar ek bhi fail hua to sab wapas)
UPDATE table1 SET ... WHERE ...;
UPDATE table2 SET ... WHERE ...;
INSERT INTO table3 (...) VALUES (...);

COMMIT;  // Agar sab theek ho to save karo (permanent)
-- YA Agar koi galat ho to:
ROLLBACK;  // Sabse wapas le aao (jaise koi hi change nahi hua – safe!)

🌰 Tumhare FreelanceMarketplace Project ke liye Example (Waqi Situation – Payment Processing):
Socha: User ne course kharida – uska wallet balance kam karo, aur uski purchases list me entry add karo. Agar dono mei se ek bhi fail ho jaaye, toh koi bhi change nahi hona chahiye (warna paisa double cut ho jaye ya na katna chahiye!).
-----------
BEGIN;
-- 1. User ka wallet balance kam karo (course ka price 500)
UPDATE wallet SET balance = balance - 500 where user_id = '101' // Agar yeh line fail ho jaaye (jaise column galat), to agla step nahi chalega

-- 2. Purchases table me entry add karo (jisse pata chalega ki user ne course kharida)
INSERT INTO purchases (user_id,course_id,
purchased_at,amount)
values('101','JS_Master',now(),500);

COMMIT;  // Agar dono steps theek ho to save karo ( paisa kat gaya + purchase record bani)
------------
BEGIN;
UPDATE wallet set balance = balance - 500 WHERE user_id = '101'; // ✅ Theek chala (balance 1000 se 500 hua)
-- Ab supposin koi error ho jaaye (jaise table ka naam galat likh diya):
INSERT INTO purchass (user_id, course_id, purchased_at, amount)  // ❌ Typo! purchass nahi purchases 
VALUES (101, 'JS_MASTER', NOW(), 500);
ROLLBACK;  // 🚨 Wapas le aao! Balance wapas 1000 ho jayega, koi purchase record nahi bani!
-------

--! TASK

create wallet (user_id int,PRIMARY key, balance int DEFAULT 1000);
create table purchases (
id SERIAL PRIMARY KEY,
user_id int,
course_id TEXT,
amount int,
purchased_at,
timestamp
) 
INSERT Into wallet values (101,1000),(102,500);

2. Ab transaction start karo (paisa transfer – user 101 se user 102 ko 200 bhej rahe hain):

BEGIN;
UPDATE wallet SET balance = balance - 200 where user_id = '101';
UPDATE wallet SET balance = balance + 200 where user_id = '102';
COMMIT; // agr sab thek ho tab.

// Result Dekho
   SELECT * FROM wallets ORDER BY user_id;
    → User 101: 800, User 102: 700 (theek hai!)
-------------
    BEGIN;
   UPDATE wallets SET balance = balance - 200 WHERE user_id = 101;  // ✅ Chala
   UPDATE walltets SET balance = balance + 200 WHERE user_id = 102;  // ❌ Typo! walltets nahi wallets
   ROLLBACK;  // 🚨 Wapas le aao!

    SELECT * FROM wallets ORDER BY user_id;
    → User 101: 1000, User 102: 500 (waapas original state – safe!)  
    Pro Tip: Har transaction me HAR HAAL COMMIT ya ROLLBACK likho! Agar bhool gaye to transaction open rahega – database ke resources block honge, aur second query nahi chalegi (timeout ho jayega).

    Step 1: Tables banao (agar nahi hain)
    create table wallet (user_id INT PRIMARY KEY,balance int DEFAULT 1000);
    CREATE table purchases (id SERIAL PRIMARY KEY, user_id timestamp, course_id text, amount int, purchased_at timestamp);
    INSERT into wallet values (201,500),(202,200) -- User 201: 500, User 202: 200
------------
    Step 2: Transaction likho (with safety check!)

    BEGIN;
    -- Pehle check karo: kya balance sufficient hai?
    DO $$
    Declare user_balace int;
            course_price int:= 300; // course ka price 300.
            BEGIN
            SELECT balace into user_balace from wallet 
            where user_id = '101';
            if user_balace < course_price then 
            RAISE EXCEPTION 'INSUFFICIENT BALACE! current %, Needed %',user_balace,course_price
            end if 
            end $$;

            -- agr balace sufficient ha to calao
            Update set balace =  balace - 300 where user_id = '101';
            INSERT into purchases values(user_id, course_id, amount,created_at)
            values ('201', 'JS_advanced', 300,now());
            COMMIT;

            Step 4: Verify karo
SQL

-- Case 1 ke baad:
SELECT * FROM wallets WHERE user_id = 201;  -- Balance 200 hona chahiye
SELECT * FROM purchases WHERE user_id = 201; -- Ek record hona chahiye (course_id: 'REACT_ADVANCED')

-- Case 2 ke baad (rollback hone ke baad):
SELECT * FROM wallets WHERE user_id = 202;  -- Balance 200 hona chahiye (waapas original)
SELECT * FROM purchases WHERE user_id = 202; -- Koi record nahi honi chahiye!

last:- Practice queries
INSERT INTO users (name, email) VALUES ('Ali', 'ali@example.com')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;