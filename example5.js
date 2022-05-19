/*
DECLARE
l_emp_name VARCHAR2(250);
l_emp_no NUMBER;
l_salary NUMBER; 
l_manager VARCHAR2(250);
BEGIN	
INSERT INTO emp(emp_name,emp_no,salary,manager) 
VALUES(‘BBB’,1000,25000,’AAA’);
INSERT INTO emp(emp_name,emp_no,salary,manager)
VALUES('XXX',1001,10000,’BBB);
INSERT INTO emp(emp_name,emp_no,salary,managed 
VALUES(‘YYY',1002,10000,'BBB');
INSERT INTO emp(emp_name,emp_no,salary,manager) 
VALUES(‘ZZZ',1003,7500,'BBB'):‭
COMMIT;
Dbms_output.put_line(‘Values Inserted');
UPDATE EMP
SET salary=15000
WHERE emp_name='XXX';
COMMIT;
Dbms_output.put_line(‘Values Updated');
DELETE emp WHERE emp_name='ZZZ';
COMMIT:
Dbms_output.put_line('Values Deleted );
SELECT emp_name,emp_no,salary,manager INTO l_emp_name,l_emp_no,l_salary,l_manager FROM emp WHERE emp_name='XXX';

Dbms output.put line(‘Employee Detail’);
Dbms_output.put_line(‘Employee Name:‘||l_emp_name);
Dbms_output.put_line(‘Employee Number:‘||l_emp_no);
Dbms_output.put_line(‘Employee Salary:‘||l_salary);
Dbms output.put line(‘Emplovee Manager Name:‘||l_manager):
END;
 */

function salaryupdate(){
var l_emp_name;
var l_emp_no=0;
var l_salary=0;
var l_manager;

var querybegin=BEGIN WORK;
querybegin.close();
var insertquery = INSERT INTO test.testscope.emp VALUES (uuid(),{"emp_name":"BBB","emp_no":"1000","salary":"25000","manager":"AAA"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp VALUES (uuid(),{"emp_name":"XXX","emp_no":"1001","salary":"10000","manager":"BBB"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp VALUES (uuid(),{"emp_name":"YYY","emp_no":"1002","salary":"10000","manager":"BBB"});
insertquery.close();
var insertquery = INSERT INTO test.testscope.emp VALUES (uuid(),{"emp_name":"ZZZ","emp_no":"1003","salary":"7500","manager":"BBB"});
insertquery.close();
var query = COMMIT WORK;
query.close();


var querybegin=BEGIN WORK;
querybegin.close();
var updatequery = UPDATE test.testscope.emp SET salary=15000 WHERE emp_name='XXX';
var query = COMMIT WORK;
query.close();

var querybegin=BEGIN WORK;
querybegin.close();
var updatequery = DELETE from test.testscope.emp WHERE emp_name='ZZZ';
var query = COMMIT WORK;
query.close();

var selectquery =SELECT emp_name,emp_no,salary,manager FROM test.testscope.emp WHERE emp_name='XXX';
var rs = [];
for (const row of selectquery) {
    rs.push(row);
    }
return rs
}
