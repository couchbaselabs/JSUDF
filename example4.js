/*
In this example the accounts table is modified according to instructions stored in the action table. Each row in the action table contains an account number, an action to be taken (I, U, or D for insert, update, or delete), an amount by which to update the account, and a time tag used to sequence the transactions.

On an insert, if the account already exists, an update is done instead. On an update, if the account does not exist, it is created by an insert. On a delete, if the row does not exist, no action is taken.
- available online in file 'sample4'
DECLARE
   CURSOR c1 IS
      SELECT account_id, oper_type, new_value FROM action
      ORDER BY time_tag
      FOR UPDATE OF status;
BEGIN
   FOR acct IN c1 LOOP  -- process each row one at a time

   acct.oper_type := upper(acct.oper_type);

   /*----------------------------------------
   /* Process an UPDATE.  If the account to  
   /* be updated doesn't exist, create a new 
   /* account.                               
   /*----------------------------------------
   IF acct.oper_type = 'U' THEN
      UPDATE accounts SET bal = acct.new_value
         WHERE account_id = acct.account_id;

      IF SQL%NOTFOUND THEN  -- account didn't exist. Create it.
         INSERT INTO accounts
            VALUES (acct.account_id, acct.new_value);
         UPDATE action SET status =
            'Update: ID not found. Value inserted.'
            WHERE CURRENT OF c1;
      ELSE
         UPDATE action SET status = 'Update: Success.'
            WHERE CURRENT OF c1;
      END IF;

   /*--------------------------------------------
   /* Process an INSERT.  If the account already 
   /* exists, do an update of the account        
   /* instead.                                  
   /*--------------------------------------------
   ELSIF acct.oper_type = 'I' THEN
      BEGIN
         INSERT INTO accounts
            VALUES (acct.account_id, acct.new_value);
         UPDATE action set status = 'Insert: Success.'
            WHERE CURRENT OF c1;
         EXCEPTION
            WHEN DUP_VAL_ON_INDEX THEN   -- account already exists
               UPDATE accounts SET bal = acct.new_value
                  WHERE account_id = acct.account_id;
               UPDATE action SET status =
                  'Insert: Acct exists. Updated instead.'
                  WHERE CURRENT OF c1;
       END;

   /*--------------------------------------------
   /* Process a DELETE.  If the account doesn't  
   /* exist, set the status field to say that    
   /* the account wasn't found.                  
   /*--------------------------------------------
   ELSIF acct.oper_type = 'D' THEN
      DELETE FROM accounts
         WHERE account_id = acct.account_id;

      IF SQL%NOTFOUND THEN   -- account didn't exist.
         UPDATE action SET status = 'Delete: ID not found.'
            WHERE CURRENT OF c1;
      ELSE
         UPDATE action SET status = 'Delete: Success.'
            WHERE CURRENT OF c1;
      END IF;
  
   The requested operation is invalid.        
   ELSE  -- oper_type is invalid
      UPDATE action SET status =
         'Invalid operation. No action taken.'
         WHERE CURRENT OF c1;

   END IF;

   END LOOP;
   COMMIT;
END;
*/


function insertdata(){
var insertquery = INSERT INTO accounts VALUES (uuid(),{"ACCOUNT_ID":"1","BAL":"1000"});
insertquery.close();
var insertquery = INSERT INTO accounts VALUES (uuid(),{"ACCOUNT_ID":"2","BAL":"2000"});
insertquery.close();
var insertquery = INSERT INTO accounts VALUES (uuid(),{"ACCOUNT_ID":"3","BAL":"1500"});
insertquery.close();
var insertquery = INSERT INTO accounts VALUES (uuid(),{"ACCOUNT_ID":"4","BAL":"6500"});
insertquery.close();
var insertquery = INSERT INTO accounts VALUES (uuid(),{"ACCOUNT_ID":"5","BAL":"500"});
insertquery.close();

var insertquery = INSERT INTO action VALUES (uuid(),{"ACCOUNT_ID":"3","O":"u","NEW_VALUE":"599","STATUS":"","TIME_TAG":"18-NOV-88"});
insertquery.close();
var insertquery = INSERT INTO action VALUES (uuid(),{"ACCOUNT_ID":"6","O":"i","NEW_VALUE":"20099","STATUS":"","TIME_TAG":"18-NOV-88"});
insertquery.close();
var insertquery = INSERT INTO action VALUES (uuid(),{"ACCOUNT_ID":"5","O":"d","NEW_VALUE":"","STATUS":"","TIME_TAG":"18-NOV-88"});
insertquery.close();
var insertquery = INSERT INTO action VALUES (uuid(),{"ACCOUNT_ID":"7","O":"u","NEW_VALUE":"1599","STATUS":"","TIME_TAG":"18-NOV-88"});
insertquery.close();
var insertquery = INSERT INTO action VALUES (uuid(),{"ACCOUNT_ID":"1","O":"i","NEW_VALUE":"399","STATUS":"","TIME_TAG":"18-NOV-88"});
insertquery.close();
var insertquery = INSERT INTO action VALUES (uuid(),{"ACCOUNT_ID":"9","O":"d","NEW_VALUE":"","STATUS":"","TIME_TAG":"18-NOV-88"});
insertquery.close();
var insertquery = INSERT INTO action VALUES (uuid(),{"ACCOUNT_ID":"10","O":"x","NEW_VALUE":"","STATUS":"","TIME_TAG":"18-NOV-88"});
insertquery.close();
}


