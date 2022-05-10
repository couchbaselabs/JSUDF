/*
CREATE OR REPLACE FUNCTION totalEmployees 
RETURN number IS 
   total number(2) := 0; 
BEGIN 
   SELECT count(*) into total 
   FROM emp; 
    
   RETURN total; 
END; 
/
*/

/* To use below functions:
curl -s -k -X POST http://localhost:8093/evaluator/v1/tlib1 -u Administrator:password --data-binary @./example8.js

cbq> CREATE OR REPLACE FUNCTION insertdata() LANGUAGE JAVASCRIPT AS "insertdata" AT "udftestlib1" ;
cbq> CREATE OR REPLACE FUNCTION totalEmployees() LANGUAGE JAVASCRIPT AS "totalEmployees" AT "udftestlib1" ;
cbq> execute function insertdata();
cbq> SELECT count(*) FROM emp;

*/

function insertdata(){
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"KING","EMPNO":"7839","SAL":"5000"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"SCOTT","EMPNO":"7788","SAL":"3000"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"FORD","EMPNO":"7902","SAL":"3000"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"JONES","EMPNO":"7566","SAL":"2975"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"BLAKE","EMPNO":"7698","SAL":"2850"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"CLARK","EMPNO":"7782","SAL":"2450"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"ALLEN","EMPNO":"7499","SAL":"1600"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"TURNER","EMPNO":"7844","SAL":"1500"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"MILLER","EMPNO":"7934","SAL":"1300"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"WARD","EMPNO":"7521","SAL":"1250"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"MARTIN","EMPNO":"7654","SAL":"1250"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"ADAMS","EMPNO":"7876","SAL":"1100"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"JAMES","EMPNO":"7900","SAL":"950"});
var insertquery = INSERT INTO emp VALUES (uuid(),{"ENAME":"SMITH","EMPNO":"7369","SAL":"800"});
}

function totalEmployees(){

var selectquery = SELECT count(*) FROM emp;
var rs = [];
for (const row of selectquery) {
    rs.push(row);
    }
return rs;
}
