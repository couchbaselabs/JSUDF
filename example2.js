/* PL/SQL example with cursors 
DECLARE
   CURSOR c1 is
      SELECT ename, empno, sal FROM emp
         ORDER BY sal DESC;   -- start with highest paid employee
   my_ename VARCHAR2(10);
   my_empno NUMBER(4);
   my_sal   NUMBER(7,2);
BEGIN
   OPEN c1;
   FOR i IN 1..5 LOOP
      FETCH c1 INTO my_ename, my_empno, my_sal;
      EXIT WHEN c1%NOTFOUND;  
      INSERT INTO emp VALUES (my_sal, my_empno, my_ename);
      COMMIT;
   END LOOP;
   CLOSE c1;
END;
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


function alternatetocursor(){
var querybegin=BEGIN WORK;
for (var i = 0;i <5;i++){
    var selectquery = SELECT ENAME, EMPNO, SAL from emp order by SAL desc limit 1 offset $i;
    var rs = [];
    for (const row of selectquery) {
         rs.push(row);
             }
    var e_name=rs[0]['ENAME'];
    var e_mpno=rs[0]['EMPNO'];
    var e_sal=rs[0]['SAL'];
    params = [e_name,e_mpno,e_sal];

    var query= N1QL('insert into temp values(uuid(),{"ENAME":$1,"EMPNO":$2,"SAL":$3})',params);
}
var query = COMMIT WORK;
}
