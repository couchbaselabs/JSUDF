/*
PL/SQL Block
-- available online in file 'sample3'
DECLARE
   x NUMBER := 0;
   counter NUMBER := 0;
BEGIN
   FOR i IN 1..4 LOOP
      x := x + 1000;
      counter := counter + 1;
      INSERT INTO temp VALUES (x, counter, 'in OUTER loop');
       start an inner block 
      DECLARE
         x NUMBER := 0;  -- this is a local version of x
      BEGIN
         FOR i IN 1..4 LOOP
            x := x + 1;  -- this increments the local x
            counter := counter + 1;
            INSERT INTO temp VALUES (x, counter, 'inner loop');
         END LOOP;
      END;
   END LOOP;
   COMMIT;
END;
*/
/* There is no scoping. If you directly translate , it wont work as expected */

function scoping(){
var x = 0;
var counter = 0;
for (i=0;i<4;i++){
    x = x+1000;
    counter = counter + 1;
    params = [x,counter];
    var insertquery =N1QL('INSERT INTO exam3 VALUES (uuid(),{"x":$1,"counter":$2,"desc":"in OUTER loop"})',params);
    insertquery.close();
    var x = 0;
    for (j=0;j<4;j++){
        x=x+1;
        counter = counter+1;
        params = [x,counter];
        var insertquery =N1QL('INSERT INTO exam3 VALUES (uuid(),{"x":$1,"counter":$2,"desc":"in INNER loop"})',params); 
        insertquery.close();
        }
    }
}
