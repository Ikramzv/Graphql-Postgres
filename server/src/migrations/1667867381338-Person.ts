import { MigrationInterface, QueryRunner } from "typeorm"

export class Person1667867381338 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (1, 'Gipsy', 'Penritt', 'gpenritt0@altervista.org', 'Female', '1996-12-14');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (2, 'Langsdon', 'Davis', 'ldavis1@geocities.jp', 'Male', '2018-03-17');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (3, 'Jayne', 'Killick', 'jkillick2@cnn.com', 'Female', '2020-05-23');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (4, 'Beulah', 'Jewiss', 'bjewiss3@cpanel.net', 'Female', '2011-04-15');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (5, 'Allie', 'Cattini', 'acattini4@linkedin.com', 'Male', '2011-11-13');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (6, 'Karmen', 'Cannings', 'kcannings5@columbia.edu', 'Female', '1993-06-30');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (7, 'Katerina', 'Docharty', 'kdocharty6@dell.com', 'Bigender', '2006-09-27');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (8, 'Mariquilla', 'McMurty', 'mmcmurty7@t.co', 'Female', '1994-07-05');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (9, 'Sumner', 'Livezey', 'slivezey8@google.com.au', 'Male', '2019-07-17');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (10, 'Leontyne', 'Sillick', 'lsillick9@cnn.com', 'Female', '2000-12-21');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (11, 'Clem', 'Carmody', 'ccarmodya@t.co', 'Female', '2010-12-24');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (12, 'Durant', 'Tie', 'dtieb@blogspot.com', 'Male', '1999-08-03');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (13, 'Ricoriki', 'Garside', 'rgarsidec@ca.gov', 'Male', '1992-04-02');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (14, 'Jessamyn', 'Nelius', 'jneliusd@macromedia.com', 'Female', '1992-05-21');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (15, 'Teresina', 'Pennycock', 'tpennycocke@marriott.com', 'Female', '1999-06-25');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (16, 'Tawsha', 'Sleford', 'tslefordf@walmart.com', 'Female', '2010-05-10');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (17, 'Delphinia', 'Hunt', 'dhuntg@instagram.com', 'Agender', '1997-02-07');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (18, 'Lenette', 'Hamber', 'lhamberh@trellian.com', 'Female', '2006-10-03');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (19, 'Cally', 'Bernholt', 'cbernholti@phoca.cz', 'Female', '2012-01-31');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (20, 'Agna', 'Mallison', 'amallisonj@baidu.com', 'Female', '2020-11-03');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (21, 'Corny', 'Seton', 'csetonk@mashable.com', 'Male', '2001-07-20');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (22, 'Evelyn', 'Powelee', 'epoweleel@zimbio.com', 'Male', '2008-07-19');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (23, 'Sonya', 'Authers', 'sauthersm@cornell.edu', 'Female', '2004-07-28');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (24, 'Hartwell', 'Sparrowe', 'hsparrowen@angelfire.com', 'Male', '1993-05-07');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (25, 'Lawry', 'Zuppa', 'lzuppao@mayoclinic.com', 'Male', '2007-01-25');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (26, 'Otha', 'Siviter', 'osiviterp@livejournal.com', 'Female', '2020-04-07');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (27, 'Janenna', 'Reye', 'jreyeq@t-online.de', 'Female', '1999-06-28');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (28, 'Hallie', 'Oswell', 'hoswellr@wiley.com', 'Female', '2003-12-28');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (29, 'Padraig', 'Scholte', 'pscholtes@free.fr', 'Male', '2000-08-29');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (30, 'James', 'Haitlie', 'jhaitliet@narod.ru', 'Male', '1996-01-28');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (31, 'Lauren', 'Restall', 'lrestallu@boston.com', 'Male', '2000-03-07');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (32, 'Inessa', 'Noquet', 'inoquetv@comcast.net', 'Female', '2012-05-01');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (33, 'Mel', 'Pinkard', 'mpinkardw@symantec.com', 'Female', '2021-08-09');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (34, 'Zacharia', 'Ivakhin', 'zivakhinx@squarespace.com', 'Male', '2000-06-29');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (35, 'Kylie', 'Twoohy', 'ktwoohyy@latimes.com', 'Female', '2016-11-08');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (36, 'Karita', 'Alcott', 'kalcottz@creativecommons.org', 'Female', '2016-08-21');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (37, 'Dilan', 'Pinkney', 'dpinkney10@csmonitor.com', 'Male', '2012-12-08');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (38, 'Merilee', 'Hodge', 'mhodge11@prnewswire.com', 'Non-binary', '2021-09-04');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (39, 'Pavla', 'McKeller', 'pmckeller12@ehow.com', 'Female', '1992-01-26');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (40, 'Mollie', 'Shavel', 'mshavel13@tamu.edu', 'Female', '1994-07-24');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (41, 'Steffen', 'Craddy', 'scraddy14@aboutads.info', 'Male', '2017-11-11');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (42, 'Amabel', 'O''Neil', 'aoneil15@theguardian.com', 'Female', '2002-06-16');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (43, 'Will', 'Chase', 'wchase16@rambler.ru', 'Male', '2019-01-22');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (44, 'Bobbi', 'Wastell', 'bwastell17@shareasale.com', 'Female', '2005-06-18');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (45, 'Rutherford', 'Mew', 'rmew18@nba.com', 'Genderqueer', '2016-11-16');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (46, 'Nicky', 'Neiland', 'nneiland19@fc2.com', 'Female', '1996-07-22');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (47, 'Jimmy', 'Ruffle', 'jruffle1a@g.co', 'Male', '2018-05-10');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (48, 'Pattie', 'Bollands', 'pbollands1b@nps.gov', 'Male', '2001-11-14');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (49, 'Dinah', 'Human', 'dhuman1c@a8.net', 'Female', '2018-11-25');
            insert into person (id, first_name, last_name, email, gender, date_of_birth) values (50, 'Julie', 'Dunlap', 'jdunlap1d@seattletimes.com', 'Male', '2016-04-07');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
