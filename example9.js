/*
Recursive N1QL UDF example 
==========================

Corresponding PL/SQL
--------------------

DECLARE 
   num number; 
   factorial number;  
   
FUNCTION fact(x number) 
RETURN number  
IS 
   f number; 
BEGIN 
   IF x=0 THEN 
      f := 1; 
   ELSE 
      f := x * fact(x-1); 
   END IF; 
RETURN f; 
END;  

BEGIN 
   num:= 6; 
   factorial := fact(num); 
   dbms_output.put_line(' Factorial '|| num || ' is ' || factorial); 
END;

N1QL definition
---------------

CREATE FUNCTION fact(x) LANGUAGE javascript AS "fact" at "libfact"

JS library
----------

curl -v -X POST http://localhost:8093/evaluator/v1/libraries/libfact -u Administrator:password –data-binary '@example9.js'

Synopsis
--------

Demonstrates nested or recursive javascript function calls and some error handling

*/

function fact(x) {
	if (typeof(x) != "number" && typeof(x) != "bigint") {
		throw "not a number";
	}
	if (x<0) {
		throw "gamma and complex factorials not supported";
	}
	if (x==0) {
		return 1;
	}

	/*
	you don't need to use N1QL to recursevely execute fact(), eg

	var f = EXECUTE FUNCTION fact($x - 1);
	for (const x1 of f) {
		return x * x1;
	}

	just call it directly
	*/
	return x * fact(x - 1);
}
