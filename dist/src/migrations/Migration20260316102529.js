import { Migration } from '@mikro-orm/migrations';
export class Migration20260316102529 extends Migration {
    async up() {
        this.addSql(`alter table \`favorite_city\` drop foreign key \`FK_C35D1B0BA76ED395\`;`);
        this.addSql(`drop table if exists \`doctrine_migration_versions\`;`);
        this.addSql(`drop table if exists \`user\`;`);
        this.addSql(`alter table \`favorite_city\` drop index \`IDX_C35D1B0BA76ED395\`;`);
        this.addSql(`alter table \`favorite_city\` drop column \`temperature\`, drop column \`description\`, drop column \`user_id\`;`);
        this.addSql(`alter table \`favorite_city\` modify \`id\` int unsigned not null auto_increment, modify \`city\` varchar(255) not null, modify \`country\` varchar(255) not null, modify \`latitude\` float not null, modify \`longitude\` float not null;`);
    }
    async down() {
        this.addSql(`create table \`doctrine_migration_versions\` (\`version\` varchar(191) not null, \`executed_at\` datetime null default NULL, \`execution_time\` int null default NULL, primary key (\`version\`)) default character set utf8mb4 engine = InnoDB;`);
        this.addSql(`create table \`user\` (\`id\` int not null auto_increment primary key, \`email\` varchar(180) not null, \`roles\` longtext not null, \`password\` varchar(255) not null, \`is_verified\` tinyint not null, constraint roles check (json_valid(\`roles\`))) default character set utf8mb4 engine = InnoDB;`);
        this.addSql(`alter table \`user\` add unique \`UNIQ_IDENTIFIER_EMAIL\`(\`email\`);`);
        this.addSql(`alter table \`favorite_city\` add \`temperature\` double null default NULL, add \`description\` varchar(255) null default 'NULL', add \`user_id\` int not null;`);
        this.addSql(`alter table \`favorite_city\` modify \`id\` int not null auto_increment, modify \`city\` varchar(100) not null, modify \`country\` varchar(100) not null, modify \`latitude\` double not null, modify \`longitude\` double not null;`);
        this.addSql(`alter table \`favorite_city\` add constraint \`FK_C35D1B0BA76ED395\` foreign key (\`user_id\`) references \`user\` (\`id\`) on update restrict on delete restrict;`);
        this.addSql(`alter table \`favorite_city\` add index \`IDX_C35D1B0BA76ED395\`(\`user_id\`);`);
    }
}
