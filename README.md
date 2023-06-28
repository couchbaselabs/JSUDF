# Every example has PL/SQL in comments and corresponding JS UDF uncommented.

- With Couchbase Javascript N1QL UDFS, Its a 4 step process: 
1.Write the UDF in Javascript.This UDF can include zero or more N1QL statements. 
2.Register the UDF into a library using curl or UI
3.Create mapping N1QL functions using CREATE FUNCTION in cbq or UI 
4.Execute the N1QL functions.

- Using either UI or REST API
Create a bucket test<br>
`curl -X POST -u Administrator:password -d name=test -d ramQuotaMB=2048 -d authType=none http://127.0.0.1:8091/pools/default/buckets -d threadsNumber=8 -d replicaNumber=0`

- Using either UI query editor or cbq, create scope within the bucket test and then create collections
These collections will be needed in examples.

```sql
create scope test.testscope;
create collection test.testscope.temp;
create collection test.testscope.emp;
create collection test.testscope.temp1;
create collection test.testscope.exam3;
create collection test.testscope.departments;
create collection test.testscope.employees;
create collection test.testscope.emp8;
```

- Create primary indexes in UI or cbq
```sql
CREATE PRIMARY INDEX ON `default`:`test`.`testscope`.`temp`
CREATE PRIMARY INDEX ON `default`:`test`.`testscope`.`emp`;
CREATE PRIMARY INDEX ON `default`:`test`.`testscope`.`temp1`;
CREATE PRIMARY INDEX ON `default`:`test`.`testscope`.`exam3`;
CREATE PRIMARY INDEX ON `default`:`test`.`testscope`.`departments`;
CREATE PRIMARY INDEX ON `default`:`test`.`testscope`.`employees`;
CREATE PRIMARY INDEX ON `default`:`test`.`testscope`.`emp8`;
```

## For example 1:
```sh
curl -s -k -X POST http://localhost:8093/evaluator/v1/libraries/udftestlib -u Administrator:password --data-binary @./example1.js`
```

In cbq:
```sql
CREATE OR REPLACE FUNCTION forloop() LANGUAGE JAVASCRIPT AS "forloop" AT "udftestlib";
execute function forloop();
```

## Example 2:
```sh
curl -s -k -X POST http://localhost:8093/evaluator/v1/libraries/udftestlib2 -u Administrator:password --data-binary @./example2.js`
```

In cbq:
```sql
CREATE OR REPLACE FUNCTION insertdata() LANGUAGE JAVASCRIPT AS "insertdata" AT "udftestlib2";
execute function insertdata();
CREATE OR REPLACE FUNCTION alternatetocursor() LANGUAGE JAVASCRIPT AS "alternatetocursor" AT "udftestlib2";
execute function alternatetocursor();
select * from test.testscope.temp1;
```

## Example 3:
```sh
curl -s -k -X POST http://localhost:8093/evaluator/v1/libraries/udftestlib3 -u Administrator:password --data-binary @./example3.js`
```

In cbq:
```sql
CREATE OR REPLACE FUNCTION scoping() LANGUAGE JAVASCRIPT AS "scoping" AT "udftestlib3";
execute function scoping();
select * from test.testscope.exam3 ;
```

## Example 5:
```sh
curl -s -k -X POST http://localhost:8093/evaluator/v1/libraries/udftestlib5 -u Administrator:password --data-binary @./example5.js`
```

In cbq:
```sql
CREATE OR REPLACE FUNCTION salaryupdate() LANGUAGE JAVASCRIPT AS "salaryupdate" AT "udftestlib5";
execute function salaryupdate();
```

## Example 7:
```sh
curl -s -k -X POST http://localhost:8093/evaluator/v1/libraries/udftestlib7 -u Administrator:password --data-binary @./example7.js`
```

In cbq:
```sql
CREATE OR REPLACE FUNCTION exampleforinnerjoin() LANGUAGE JAVASCRIPT AS "exampleforinnerjoin" AT "udftestlib7";
 execute function exampleforinnerjoin();
```

## Example 8:
```sh
curl -s -k -X POST http://localhost:8093/evaluator/v1/libraries/udftestlib8 -u Administrator:password --data-binary @./example8.js`
```

In cbq:
```sql
CREATE OR REPLACE FUNCTION insertdata() LANGUAGE JAVASCRIPT AS "insertdata" AT "udftestlib8" ;
CREATE OR REPLACE FUNCTION totalEmployees() LANGUAGE JAVASCRIPT AS "totalEmployees" AT "udftestlib8" ;
execute function insertdata();
SELECT count(*) FROM test.testscope.emp8;
```

## Example 9:
`curl -v -X POST http://localhost:8093/evaluator/v1/libraries/libfact -u Administrator:password –data-binary '@example9.js'`

In cbq:
```sql
CREATE FUNCTION fact(x) LANGUAGE javascript AS "fact" at "libfact"
execute function fact(3);
execute function fact(0.5);
```

## Example elapsed_time_calculator:
```sh
curl -v -X POST http://localhost:8093/evaluator/v1/libraries/elapsed_time_calculator -u Administrator:password --data-binary @./elapsed_time_calculator.js`
```

In cbq:
```sql
CREATE OR REPLACE FUNCTION calculate_elapsed_time() LANGUAGE JAVASCRIPT AS "calculate_elapsed_time" AT "elapsed_time_calculator";
EXECUTE FUNCTION calculate_elapsed_time();
```

## Using JS UDF as a utility to perform Recursive Query Processing:
what we are trying to emulate [RecursiveCTE](https://docs.snowflake.com/en/user-guide/queries-cte#recursive-ctes-and-hierarchical-data)
+ argument1: `Anchor Statement: string`<br> produce ***seed or root level documents*** for ***recursive statement*** 
+ argument2: `Recursive Statement: string`<br>  fixed point iteration ***using previous level documents to produce next level documents*** exit on a level that has no documents found 
+ argunment3: `Config: object`<br> 
    + levelLimit:N - exit on reaching levelN
    + anchorArgs/recursiveArgs - positional / named arguments to anchor and recursive stmt 
    + cycleFields - array of fieldnames to do cycle detection on
    + explain - log query plan of anchor and recursive statement 
    + log - view log in results ( for debugging purpose only)

Note that all arguments are mandatory but config object can be passed as `{}` if not used

Add the library:<br>
```sh
curl -v -X POST http://localhost:8093/evaluator/v1/libraries/librcte -u Administrator:password --data-binary @./rcte_using_js_udf.js
```

In cbq:
```sql
CREATE OR REPLACE FUNCTION recursive_cte(anchor, recursive, config) LANGUAGE JAVASCRIPT AS "recursive_cte" AT "librcte";

/* a very naive use case */
SELECT recursive_cte("SELECT 1 AS r", "SELECT m.r+1 AS r FROM $1 m WHERE m.r<5", {}) as counting;


/* employees hierarchy example - assuming you have followed the pl/sql to js udf examples 
we use collection:  test.testscope.emp */
CREATE INDEX e_idx ON `test`.testscope.emp(manager INCLUDE MISSING, emp_name, emp_no, salary, manager); /* for ANSI JOIN */
SELECT recursive_cte("SELECT e.emp_name, e.emp_no, e.salary, 0 as lvl 
                    FROM `test`.testscope.emp AS e 
                    WHERE e.manager IS MISSING", 
            "SELECT e.emp_name, e.emp_no, e.salary,e.manager, m.lvl+1 as lvl 
            FROM $1 AS m JOIN `test`.testscope.emp AS e ON m.emp_name=e.manager",
            {});
```

