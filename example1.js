/*
DECLARE
   x NUMBER := 100;
BEGIN
   FOR i IN 1..10 LOOP
      IF MOD(i,2) = 0 THEN     -- i is even
         INSERT INTO temp VALUES (i, x, 'i is even');
      ELSE
         INSERT INTO temp VALUES (i, x, 'i is odd');
      END IF;
      x := x + 100;
   END LOOP;
   COMMIT;
END;
*/

function forloop(){
var x=100;
var querybegin=BEGIN WORK;
querybegin.close();
for (i=1;i<=10;i++){
    var params = [i,x];
    if (i%2 == 0){
        var query= N1QL('INSERT INTO test.testscope.temp VALUES (uuid(),{\"val1\":$1,\"val2\":$2,\"val3\":"val1 is is even"})',params); 
        query.close();
        }
    else{
        var query= N1QL('INSERT INTO test.testscope.temp VALUES (uuid(),{\"val1\":$1,\"val2\":$2,\"val3\":"val1 is odd"})',params); 
        query.close();
        }
    x = x+100;
    }
var querycommit=COMMIT WORK;
querycommit.close();
}
