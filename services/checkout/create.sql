drop table valenca.order;
drop table valenca.course;
create table valenca.course (
	course_id uuid,
	title text,
	amount numeric
);
create table valenca.order (
	order_id uuid,
	course_id uuid,
	name text,
	email text,
	status text,
	amount numeric
);
insert into valenca.course
values (
		'83e88f3a-49a5-43e0-a07a-8dd9e64c0915',
		'Clean Code e Clean Architecture',
		1199
	);