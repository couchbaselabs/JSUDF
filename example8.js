/*
CREATE OR REPLACE FUNCTION totalEmployees 
RETURN number IS 
   total number(2) := 0; 
BEGIN 
   SELECT count(*) into total 
   FROM test.testscope.emp8; 
    
   RETURN total; 
END; 
/
*/

function insertdata(){
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"KING","EMPNO":"7839","SAL":"5000"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"SCOTT","EMPNO":"7788","SAL":"3000"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"FORD","EMPNO":"7902","SAL":"3000"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"JONES","EMPNO":"7566","SAL":"2975"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"BLAKE","EMPNO":"7698","SAL":"2850"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"CLARK","EMPNO":"7782","SAL":"2450"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"ALLEN","EMPNO":"7499","SAL":"1600"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"TURNER","EMPNO":"7844","SAL":"1500"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"MILLER","EMPNO":"7934","SAL":"1300"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"WARD","EMPNO":"7521","SAL":"1250"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"MARTIN","EMPNO":"7654","SAL":"1250"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"ADAMS","EMPNO":"7876","SAL":"1100"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"JAMES","EMPNO":"7900","SAL":"950"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp8 VALUES (uuid(),{"ENAME":"SMITH","EMPNO":"7369","SAL":"800"});
insertquery.close();
}

function totalEmployees(){

var selectquery = SELECT count(*) FROM test.testscope.emp8;
var rs = [];
for (const row of selectquery) {
    rs.push(row);
    }
return rs;
}
