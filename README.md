# JSUDF
With Couchbase Javascript N1QL UDFS, Its a 4 step process:
1.Write the UDF in Javascript.This UDF can include zero or more N1QL statements.
2.Register the UDF into a library using curl or UI(Thanks Eben!)
3.Create mapping N1QL functions using CREATE FUNCTION in cbq or UI
4.Execute the N1QL functions.

Register the UDF into a library 
The library here is being called udftestlib with Administrator:password as credentials
curl -s -k -X POST http://localhost:8093/evaluator/v1/libraries/udftestlib -u Administrator:password --data-binary @./n1qludf.js
3.Create mapping N1QL functions using CREATE FUNCTION in cbq or UI
Syntax:
create function myn1qlwrapperfunction(<comma separated params list>) language javascript as "simpleselectclause" at “udftestlib";
In cbq shell:
CREATE OR REPLACE FUNCTION simpsel() language javascript as "simpleselect" at "udftestlib";
CREATE OR REPLACE FUNCTION argsel(type, rowlimit) language javascript as "argsselectclause" at "udftestlib";
CREATE OR REPLACE FUNCTION exec_prepstmt() LANGUAGE JAVASCRIPT AS "exec_prepstmt" AT "udftestlib";
CREATE OR REPLACE FUNCTION exec_prepwithparam(city) LANGUAGE JAVASCRIPT AS "exec_prepwithparam" AT "udftestlib";
CREATE OR REPLACE FUNCTION querytransaction() LANGUAGE JAVASCRIPT AS "querytransaction" AT "udftestlib" 
  4.Execute the N1QL functions.
execute function simpsel() ;
execute function argsel(['airline'], 20);
execute function exec_prepstmt();
execute function exec_prepwithparam("Lyon");
execute function querytransaction();
