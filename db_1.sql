create table meets (
    id int(11) not null auto_increment,
    name varchar(50),
    squat_1 int(11),
    squat_2 int(11),
    squat_3 int(11),
    bench_1 int(11),
    bench_2 int(11),
    bench_3 int(11),
    deadlift_1 int(11),
    deadlift_2 int(11),
    deadlift_3 int(11),
    total int(11)
)

insert into meets (name, squat_1, squat_2, squat_3, bench_1, bench_2, bench_3, deadlift_1, deadlift_2, deadlift_3, total) values 
    (1, 'john doe', 100, 105, 110, 60, 70, 80, 200, 210, 220, 410),
    (2, 'jane doe', 10, 15, 20, 5, 10, 15, 20, 30, 40, 75)